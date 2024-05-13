import express from "express"

const app = express();

const port = 3000;

app.get("/", (req, res) => {
	const today = new Date("May 4, 2024");
	const day = today.getDay();
	let type = "a week day";
	let adv = "it is time to work hard";

	if (day === 0 || day === 6) {
	type = "a weekend";
	 adv = "it is time to have some fun";

		
	}
	// console.log(day);
	res.render("index.ejs", {
		daytime: type,
		advice : adv
	});
});

app.listen(port, () => {
	console.log(`server is running on ${port}.`);

});