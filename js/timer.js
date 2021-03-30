"use strict";

$(document).ready(function(){

	var timeleft = 3;
	var downloadTimer = setInterval(function(){
	  if(timeleft <= 0){
	    clearInterval(downloadTimer);
		    
		// aprés 3s : cacher le compteur et afficher le quiz    
	    $("#countdown").hide();		    
	    $("#quiz-container").show();

	  } else {
	    $("#countdown").text(timeleft);
	  }
	  timeleft -= 1;
	}, 1000);
  
});