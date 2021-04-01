"use strict";

$(document).ready(function(){

	// cacher "quiz-container" 
	$("#quiz-container").hide();

	let selectedValue = getUrlParameter('option');  
	$("#quiz-id").val(selectedValue)

	//Affichage des données du quiz choisi :
	$("#quiz-title").text(quizzes[selectedValue].title)
	$('#quiz-description').text(quizzes[selectedValue].description);

	//Récuperation d'ID
	let quizId = selectedValue;
	console.log("quizId : "+ quizId);
	console.log("------------------");

	afficher_quiz();
	
	console.log("------------------");	
});


function afficher_quiz() {
    let quizId = getUrlParameter('option');
    
    quizzes[quizId].data.forEach(function(item, i) {

    	$('#quiz-content').append($('<hr>'));
    	$('#quiz-content').append($('<img>', {src:"../images/"+item.image, id:"image"}));
    	$('#quiz-content').append($('<h4>', {text:"Question N°"+(i+1)+" :"+item.question, id:"question"}));
    	
    	if(quizId === "mer" || quizId === "jeux"){

			item.reponses.forEach(function(resp, index){

			    $('#quiz-content').append(
			      $('<input>').prop({
			      	id : item.id,
			        type: 'radio',
			        name: 'r'+i, // Chaque groupe de réponse doit avoir le même "name"  
			        value: index
			      })
			    ).append(
			      $('<label>').prop({
			        for: item.id
			      }).html(resp)
			    ).append(
			      $('<br>')
			    );
	    	})	
		}
		else{
			if(quizId === "couples" || quizId === "webg2"){

				item.reponses.forEach(function(resp, index){

				    $('#quiz-content').append(
				      $('<input>').prop({
				      	id : item.id,
				        type: 'checkbox',
				        name: 'r'+i+"-"+index, // Chaque groupe de réponse doit avoir un "name" different  
				        value: index
				      })
				    ).append(
				      $('<label>').prop({
				        for: item.id
				      }).html(resp)
				    ).append(
				      $('<br>')
				    );
		    	})
			}
		}
   	
		console.log(item.question);
        
	});
}