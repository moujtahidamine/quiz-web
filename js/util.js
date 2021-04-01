"use strict";

function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
	    sURLVariables = sPageURL.split('&'),
	    sParameterName,
	    i;

	for (i = 0; i < sURLVariables.length; i++) {
	    sParameterName = sURLVariables[i].split('=');

	    if (sParameterName[0] === sParam) {
	        return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
	    }
	}
	return false;
};

function isEqual(a, b){

  	// if length is not equal
  	if(a.length!=b.length)
	   return false;

  	else{
  		
	  	// comapring each element of array
	   	for(let i=0; i<a.length; i++)
	   		if(a[i] != b[i])
	    		return false;
	    return true;
  	}
}