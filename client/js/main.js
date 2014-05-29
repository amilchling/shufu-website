
Meteor.startup(function(){
	$(window).resize(function(evt){
		Session.set('stars', new Date());
	});

	$(".port-item").mouseenter(function(){
		$(this).find('.gray-background').css("background-color", "white")

		$(this).find('h1').addClass("black");
	});

	$(".port-item").mouseleave(function(){
		$(this).find('.gray-background').css("background-color", "#333");

		$(this).find('h1').removeClass("black");
	});
	$("#services-row").waypoint(function(){
		$(this).find('.hidden').each(function(index){
			$(this).css({"opacity": 0, "visibility": "visible"}).animate({opacity:1}, 1000);
		});
		$(this).waypoint('disable');
	}, {offset: 400});

	$("#bio-text").waypoint(function(){
		$("#contact-li").addClass("active");
	}, {offset: 300});

	$(".process-circle").mouseenter(function(){
		if(!$(this).closest(".process-circle").data("visible")){
			$(this).closest(".process-circle").data("visible", true)
			var el;
			if($(this).hasClass("process-img")){
				el = $(this);
			}
			else{
				el = $(this).find(".process-img");
			}
			var newSrc = "img/" + el.attr('id') + ".gif";
			console.log(newSrc);
			el.attr('src', newSrc);
		}
	});

	$(".resume-header").click(function(event){
		event.preventDefault();
		$(this).siblings(".resume").slideToggle();
		var icon = $(this).find(".general");
		icon.toggleClass("foundicon-plus");
		icon.toggleClass("foundicon-minus");
		
	});

	$(window).bind("load", function(){
		var $f = $("#footer");
		var pos = $f.position();
		var height = $(window).height();
		height -= pos.top;
		height -= $f.height();

		if(height > 0){
			footer.css({'margin-top': height + 'px'});
		}
	});

	$("#email-form").on('invalid', function(){
		var invalid_field = $(this).find(['data-invalid']).first();
		invalid_field.focus();
		console.log("invalid");
	})
	.on('valid', function(event){
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();
		var inputs = $(this).find('input, #email-textarea');
		var vals = [];
		inputs.each(function(index){
			$(this).prop('disabled', true);
			vals.push($(this).val());
		});
		console.log(vals);

		var $alert = $("#email-alert");
		var $button = $(this).find('button');

		$button.prop('disabled', true);
		$alert.slideToggle();

		Meteor.apply("sendEmail", vals, function(result, error){
			if(error){
				console.log(error);
				$alert.text('Error sending email. Please try again');
				$alert.css('background-color','red');
			}
			else{
				$alert.text('Email sent!');
				$alert.addClass("success");
				setTimeout(function(){
					$alert.slideToggle();
					inputs.each(function(indx){
						$(this).prop('disabled', false);
						$(this).val('');
					});

					$button.prop('disabled', false);
					$alert.removeClass("success");

				}, 2000);
			}
		});
		

		console.log("valid");
	});

	$(".scroll").click(function(event){
		event.preventDefault();
		var offset = 150;
		var dest=0;
		if($(this.hash).offset().top > $(document).height()-$(window).height()){
			dest = $(document).height - $(window).height;
		}
		else{
			dest = $(this.hash).offset().top - offset;
		}
		$('html,body').animate({scrollTop:dest}, 1000, 'swing');
	});

	$('html,body').animate({scrollTop:5}, 1000, 'swing');
});

Template.nav.reload = function(){
	Session.get("reload");
	return "";
}

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