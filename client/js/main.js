
Meteor.startup(function(){
	$(window).resize(function(evt){
		Session.set('stars', new Date());
	});

	$(window).stellar();

	$(".port-item").mouseenter(function(){
		$(this).find('.gray-background').css("background-color", "white")

		$(this).find('h1').addClass("black");
	});

	$(".port-item").mouseleave(function(){
		$(this).find('.gray-background').css("background-color", "#333");

		$(this).find('h1').removeClass("black");
	});

	$(".process-circle").mouseenter(function(){
		console.log($(this).closest(".process-circle").data("visible"))
		if(!$(this).closest(".process-circle").data("visible")){
			$(this).find('.hidden').css({"opacity": 0, "visibility": "visible"}).animate({opacity:1}, 1000);
			$(this).closest(".process-circle").data("visible", true)
		}
	});
});

Template.mainArea.stars = function(){
	createStars(110, 3);
	return Session.get('stars');
}

Template.mainArea.rendered = function(){
	createStars(110, 3);
}


var stars = [];

function createStars(numStars, maxSize){
	for(var i = 0; i < stars.length; i++){
		stars[i].remove();
	}

	var grays = ['lightgray', 'gray', 'darkgray', '#333', '#e5e5e5e5']
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
		var random_gray = Math.floor((Math.random() * grays.length));

		if((randomX + randomSize) > width){
			randomX -= (randomSize+1)
		}

		var css = {
			"position" : "absolute",
			"left" : randomX+"px",
			"top" : randomY+"px",
			"width" : randomSize+"px",
			"height" : randomSize+"px",
			"-moz-border-radius" : radius+"px",
			"-webkit-border-radius" : radius+"px",
			"border-radius" : radius+"px",
			"background-color" : grays[random_gray],
			"z-index" : "1"
		}
		newEl.css(css);
		
		stars.push(newEl);
		logoEl.append(newEl);
	}
}