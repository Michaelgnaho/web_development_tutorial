import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	const data = {
		title : "Ejs Tags",
		seconds: new Date().getSeconds(),
		items: ["apple", "banana", "cherry"],
		htmlcontent: "<strong>This is a strong text</strong>",
	}
	res.render("index.ejs", data);
});

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});