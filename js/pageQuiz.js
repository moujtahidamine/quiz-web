"use strict";

$(document).ready(function(){

	// cacher "quiz-container" 
	$("#quiz-container").hide();

	let selectedValue = getUrlParameter('option');  

	//Affichage des données du quiz choisi :
	$("#quiz-title").text(quizzes[selectedValue].title)
	$('#quiz-description').text(quizzes[selectedValue].description);

	//Récuperation d'ID
	let quizId = selectedValue;
	console.log("quizId : "+ quizId);
	console.log("------------------");

	afficher_quiz();
	
});

function afficher_quiz() {
    let quizId = getUrlParameter('option');

    quizzes[quizId].data.forEach(function(item, i) {

    	$('#quiz-content').append($('<hr>'));
    	$('#quiz-content').append($('<p>', {text:"Q "+(i+1)}));
    	$('#quiz-content').append($('<img>', {src:"../images/"+item.image, id:"image"}));
    	$('#quiz-content').append($('<h3>', {text:item.question, id:"question"}));
    	
    	item.reponses.forEach(function(resp, index){

		    $('#quiz-content').append(
		      $('<input>').prop({
		        type: 'radio',
		        name: 'response',
		        value: index
		      })
		    ).append(
		      $('<label>').prop({
		        for: 'response'
		      }).html(resp)
		    ).append(
		      $('<br>')
		    );
		
    	})
   	
		console.log(item.question);
	});


}

