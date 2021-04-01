"use strict";

$(document).ready(function(){
	afficher_results();
});


function afficher_results(){
    
	let quizId = getUrlParameter('option');

	const bonneReponseMsg = "(Y) Bravo, vous avez trouvé la bonne réponse !";
	const mauvaiseReponseMsg = "(X) Dommage ! mauvaise réponse. La bonne réponse était : ";

	if(quizId === "mer" || quizId === "jeux"){

	    quizzes[quizId].data.forEach(function(item, i) {
		
			// Stocker l'indice de la i ème réponse dans la variable reponse :
			var liste_reponses = [];
			let reponse;
			let param = getUrlParameter('r'+i); // depuis les paramétres ayant le nom  { r0, r1, ..., ri }
			
			if(param !== false)
				reponse = Number(param)
			
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
	else{
		if(quizId === "couples" || quizId === "webg2"){
	
		    quizzes[quizId].data.forEach(function(item, i) {
		
				// Stocker l'indice de la i ème réponse dans la variable reponse :
				var liste_reponses = []; // liste des réponses globale 
				var checked = []; // pour stocker les indices des réponses choisis 
				let checked_string = "";// pour stocker les réponses concaténés par ;
				let bonneReponsesList = ""; // pour stocker les bonnes réponses concaténés par ;


				item.reponses.forEach(function(resp, index){
					
					// NB : La fonction getUrlParameter retourne false si "ri-index" n'existe plus dans l'URL. 
					let reponse = getUrlParameter('r'+i+"-"+index); // Lire les paramétres ayant le nom  { r0-0, r0-1, ..., ri-index }
		    		
		    		if(reponse !== false){// Si le paramétre "ri-index" existe dans l'URL, alors on doit le convertir puis le stocker dans la liste "checked"  
		    			let reponse_indice = Number(reponse);
		    			checked.push(reponse_indice);
		    			
		    			checked_string += item.reponses[reponse_indice] +"; ";
		    		}	
		    	})

				liste_reponses.push(checked);// stocker la liste des choix cochés dans la liste globale des réponse.
	 			//console.log(liste_reponses);
				

				$('#results').append(
			      $('<p>').text(item.question)
			    );

			

			    $('#results').append(
			      $('<p>').text("Vous avez répondu : "+ checked_string)
			    );

			    const repnseMsg = $('<p>');

			    // affichage dans la console :
			    console.log("----- Q"+(i+1)+" -----")
			    console.log("Vous avez répondu : ", checked);
			    console.log("La bonne Réponse : ", item.bonneReponses);

			    item.bonneReponses.forEach(function(val){
			    	bonneReponsesList += item.reponses[val]+"; ";
			    })

			    if(	isEqual(item.bonneReponses, checked)){
			    	
			    	repnseMsg.text(bonneReponseMsg);
			    	repnseMsg.css('color', 'green');
			    }
			    else{

					repnseMsg.text(mauvaiseReponseMsg+bonneReponsesList);
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
	}	
}
