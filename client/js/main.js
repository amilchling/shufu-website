
Template.mainArea.stars = function(){

}

Template.mainArea.rendered = function(){
	createStars(500, 5);
}

function createStars(numStars, maxSize){
	var MINSIZE = 1;
	var logoEl = $("#logo-columns");
	var width = $(window).width();
	var height = $(window).height() * .75;

	for(var i = 0; i < numStars; i++){
		
		var newEl = $(document.createElement("div"));
		var randomX = Math.floor((Math.random() * width) + 1);
		var randomY = Math.floor((Math.random() * height) + 1);
		var randomSize = Math.floor((Math.random() * maxSize) + MINSIZE);

		randomSize += Math.random() * 2;
		var radius = Math.ceil(randomSize/2);

		var css = {
			"position" : "absolute",
			"left" : randomX+"px",
			"top" : randomY+"px",
			"width" : randomSize+"px",
			"height" : randomSize+"px",
			"-moz-border-radius" : radius+"px",
			"-webkit-border-radius" : radius+"px",
			"border-radius" : radius+"px",
			"background-color" : "white",
			"z-index" : "1"
		}
		newEl.css(css);

		if(Math.random() > .65){
			newEl.addClass("twinkle");
		}
		logoEl.append(newEl);
	}
}