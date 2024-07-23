import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import ejs from "ejs";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000; // Choose an appropriate port

console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), // Convert port to number
});

db.connect().catch((err) => {
  console.error("Error connecting to the database:", err.stack);
});

// Set up middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

// POST route for user registration
app.post("/register", async function (req, res) {
  const { username, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Example query to insert user into a 'clients' table
    const insertQuery =
      "INSERT INTO clients (username, password) VALUES ($1, $2)";
    await db.query(insertQuery, [username, hashedPassword]);
    res.render("secrets"); // Redirect to secrets page after successful registration
  } catch (err) {
    if (err.code === "23505") {
      // Unique violation error code
      console.error("Username already exists");
      res.status(400).send("Username already exists");
    } else {
      console.error("Error registering user:", err);
      res.sendStatus(500); // Server error response
    }
  }
});

// POST route for user login
app.post("/login", async function (req, res) {
  const { username, password } = req.body;

  try {
    // Example query to find user in 'clients' table
    const findUserQuery = "SELECT * FROM clients WHERE username = $1";
    const result = await db.query(findUserQuery, [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Authentication successful, redirect to secret page
        res.render("secrets");
      } else {
        // Authentication failed, redirect back to login page
        res.redirect("/login");
      }
    } else {
      // User not found, redirect back to login page
      res.redirect("/login");
    }
  } catch (err) {
    console.error("Error authenticating user:", err);
    res.sendStatus(500); // Server error response
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
