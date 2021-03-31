'use strict'

$(document).ready(function(){

	// Initialiser la listes des options avec les valeurs (quizzes)
	for (const key in quizzes) {
		// créer et ajouter des options à l'élement aui a l'ID "main-select"  
	    $('#main-select').append($('<option>', {value:key, text:quizzes[key].title}));

	    //Afficher dans la console
	    console.log(key +" - "+quizzes[key].title);
	}
  
});