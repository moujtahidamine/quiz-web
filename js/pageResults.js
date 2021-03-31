"use strict";

$(document).ready(function(){
	afficher_results();
});


function afficher_results(){
    
	let quizId = getUrlParameter('option');

	const bonneReponseMsg = "(Y) Bravo, vous avez trouvé la bonne réponse !";
	const mauvaiseReponseMsg = "(X) Dommage ! mauvaise réponse. La bonne réponse était : ";

    quizzes[quizId].data.forEach(function(item, i) {
		
		// Stocker l'indice de la i ème réponse dans la variable reponse :
		var liste_reponses = [];
		let reponse = Number(getUrlParameter('r'+i)); // depuis les paramétres ayant le nom  { r0, r1, ..., ri }
		
		
		$('#results').append(
	      $('<p>').text(item.question)
	    );

	    $('#results').append(
	      $('<p>').text("Vous avez répondu : "+item.reponses[reponse])
	    );

	    const repnseMsg = $('<p>');

	    // affichage dans la console :
	    console.log("Vous avez répondu : ", reponse);
	    console.log("La bonne Réponse : ", item.bonneReponses[0]);
	    

	    if(	item.bonneReponses[0] === reponse){
	    	
	    	repnseMsg.text(bonneReponseMsg);
	    	repnseMsg.css('color', 'green');
	    }
	    else{

			repnseMsg.text(mauvaiseReponseMsg+item.reponses[item.bonneReponses]);
	    	repnseMsg.css('color', 'red');		    
	    }

	    $('#results').append(
	      $(repnseMsg)
	    );

	    $('#results').append(
	      $('<hr>')
	    );    
	});
	
}