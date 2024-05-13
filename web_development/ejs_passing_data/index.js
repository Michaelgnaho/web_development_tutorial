import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, ()=> {
	console.log(`server listening on port ${port}`);
});

app.get("/", (req, res)=> {
	res.render("index.ejs");

});
app.post("/submit", (req, res)=>{
	const numberLen = req.body["fName"].length + req.body["lName"].length;
	res.render("index.ejs", {numOfLetter: numberLen} );
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
