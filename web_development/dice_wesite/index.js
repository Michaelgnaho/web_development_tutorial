var randNumber1 = Math.floor((Math.random() * 6) + 1 );
// console.log(randNumber);

var randNum1 = "images/dice" + randNumber1 + ".png";
// console.log(randNum1);
var image1 = document.querySelectorAll("img")[0];
// console.log(image1);
image1.setAttribute("src", randNum1);

var randNumber2 = Math.floor((Math.random() * 6) + 1 );
var randNum2 = "images/dice" + randNumber2 + ".png";
var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src", randNum2);

if (randNum1 > randNum2) {
	var p1 = document.querySelector(".container h1");
	p1.textContent= "Player 1 is the winner";
}
 else if (randNum2 > randNum1) {
	var p1 = document.querySelector(".container h1");
	p1.textContent= "Player 2 is the winner";	
}
else {
	var p1 = document.querySelector(".container h1");
	p1.textContent= "It is a draw";

}