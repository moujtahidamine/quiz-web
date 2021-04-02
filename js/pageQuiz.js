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

	// Avant d’envoyer le formulaire, il faut vérifier que l’utilisateur a bien répondu à toutes les questions
	$('#verification-form').submit(function() {
	  	console.log("submiting...");
		return isFormValid();
	});
});


function afficher_quiz() {
    let quizId = getUrlParameter('option');
    
    quizzes[quizId].data.forEach(function(item, i) {

    	$('#quiz-content').append($('<hr>'));
    	$('#quiz-content').append($('<img>', {src:"../images/"+item.image, id:"image-"+i}));
    	$('#quiz-content').append($('<h4>', {text:"Question N°"+(i+1)+" :"+item.question, id:"question-"+item.id}));
    	
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
		}
   	
		console.log(item.question);
        
	});
}


function isFormValid(){

	let quizId = getUrlParameter('option');
	let reponses_choix_unique = [];
	let reponses_choix_multiple = [];

	// Pour chaque element du quiz :
	quizzes[quizId].data.forEach(function(div, i) {

		// Pour le quiz qui a des réponse à choix unique
		if(quizId === "mer" || quizId === "jeux"){
			

			let checked_value = $('input[name=r'+i+']:checked', '#verification-form').val();
			let reponse;


			if(checked_value !== undefined){
				reponses_choix_unique.push(checked_value); // Récuperer les indices des question ayant une réponse
			}else{
				// Si la question n'a pas de réponse alors afficher un message d'erreur!
				let msg =  $('<span>');
				msg.text("Champ obligatoire!");
				msg.css('color', 'red');
				$('#question-'+div.id).after('<br>').after(msg);
			}				
		}
		else{
			// Pour le quiz qui a des réponse à choix multiple
			if(quizId === "couples"){

				// Pour chaque element du quiz, stocker les indices cochés dans une liste "checked_values"
				var checked_values = $("input[name=r"+i+"]:checkbox:checked").map(function(){
			      return $(this).val();
			    }).get(); 

				// si "checked_values" a strictement moins que 2 valeurs, alors la question courante n'a pas de réponse
				if(checked_values.length < 2){
					// affichage d'un message d'erreur!
					let msg =  $('<span>');
					msg.text("Cette question nécessite au moins 2 réponse!");
					msg.css('color', 'red');
					$('#question-'+div.id).after('<br>').after(msg);
					
				}
				else
					// Stocker seulement les questions ayant des réponses (checked_values.length !== 0)
					reponses_choix_multiple.push(checked_values);				    
			}
			else{
				if(quizId === "webg2"){

					// Pour chaque element du quiz, stocker les indices cochés dans une liste "checked_values"
					var checked_values = $("input[name=r"+i+"]:checkbox:checked").map(function(){
				      return $(this).val();
				    }).get(); 

					// si "checked_values" est vide, alors la question courante n'a pas de réponse
					if(checked_values.length === 0){
						// affichage d'un message d'erreur!
						let msg =  $('<span>');
						msg.text("Cette question nécessite au moins UNE réponse!");
						msg.css('color', 'red');
						$('#question-'+div.id).after('<br>').after(msg);
						
					}
					else
						// Stocker seulement les questions ayant des réponses (checked_values.length !== 0)
						reponses_choix_multiple.push(checked_values);	
				}
			}	
		}

	});	

	
	if(quizId === "mer" || quizId === "jeux"){
			
		console.log("IS FORM VALID?", !(reponses_choix_unique.length !== quizzes[quizId].data.length));
		return( !(reponses_choix_unique.length !== quizzes[quizId].data.length))			
					
	}
	else{
		if(quizId === "couples" || quizId === "webg2"){
			console.log("IS FORM VALID?", !(reponses_choix_multiple.length !== quizzes[quizId].data.length));
			return( !(reponses_choix_multiple.length !== quizzes[quizId].data.length))
		}else
			return false;	
	}
	
}