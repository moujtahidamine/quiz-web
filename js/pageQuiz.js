"use strict";

$(document).ready(function(){

	let selectedValue = getUrlParameter('option');  

	$("#quiz-title").text(quizzes[selectedValue].title)
	$('#quiz-description').text(quizzes[selectedValue].description);

	console.log("quizId : "+ selectedValue);
	
});