/*! FileSaver.js demo script
 *  2016-05-26
 *
 *  By Eli Grey, http://eligrey.com
 *  License: MIT
 *    See LICENSE.md
 */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/demo/demo.js */

/*jshint laxbreak: true, laxcomma: true, smarttabs: true*/
/*global saveAs, self*/



(function(view) {
"use strict";
// The canvas drawing portion of the demo is based off the demo at
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
var
	  document = view.document
	, $ = function(id) {
		return document.getElementById(id);
	}
	, text = $("text")
	, text_options_form = $("text-options")
	, text_filename = $("text-filename")
	, doc_impl = document.implementation
	, main_body = $("MainBody")
;

	text_options_form.addEventListener("submit", function(event){
		event.preventDefault();
		//console.log(text_options_form);
		text.value = "";
		console.log(selected_station);

		//var connect_str ='ws://'+ UpsNetworkInfo[selected_station].ipaddress+':80/echo' ;
		var connect_str ='ws://'+ upsNetworkInfo_local[selected_station].ipaddress+':80/echo' ;
		//var connect_str ='ws://'+ '192.168.0.55'+':80/echo' ;
		console.log(connect_str);
		//webSocket('ws://192.168.0.55:80/echo','UPS_LOG');
		webSocket(connect_str,'UPS_LOG');
		//webSocket('ws://192.168.0.55:80/echo','UPS_LOG');
	
		/*
		var BB = get_blob();
		
		saveAs(
			  new BB(
				  [text.value || text.placeholder]
				, {type: "text/plain;charset=" + document.characterSet}
			)
			, (text_filename.value || text_filename.placeholder) + ".txt"
		);
		*/
	}
	, false);
	/*
	main_body.addEventListener("onload",function(event){
		event.preventDefault();
		console.log("here")
		alert("event");
	},false);
	*/
}(self));
