;(function () {

	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');

	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	$(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
	});


}());



// Event MODALS

// Get the modal
var modal = document.getElementById('modal1');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('divmodal1');
var modalImg = document.getElementById("imgmodal1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];





















// Testimonials START

// vars
"use strict";
var testim = document.getElementById("testim"),
	testimDots = Array.prototype.slice.call(
		document.getElementById("testim-dots").children
	),
	testimContent = Array.prototype.slice.call(
		document.getElementById("testim-content").children
	),
	testimLeftArrow = document.getElementById("left-arrow"),
	testimRightArrow = document.getElementById("right-arrow"),
	testimSpeed = 4500,
	currentSlide = 0,
	currentActive = 0,
	testimTimer,
	touchStartPos,
	touchEndPos,
	touchPosDiff,
	ignoreTouch = 30;
window.onload = function() {
	// Testim Script
	function playSlide(slide) {
		for (var k = 0; k < testimDots.length; k++) {
			testimContent[k].classList.remove("active");
			testimContent[k].classList.remove("inactive");
			testimDots[k].classList.remove("active");
		}

		if (slide < 0) {
			slide = currentSlide = testimContent.length - 1;
		}

		if (slide > testimContent.length - 1) {
			slide = currentSlide = 0;
		}

		if (currentActive != currentSlide) {
			testimContent[currentActive].classList.add("inactive");
		}
		testimContent[slide].classList.add("active");
		testimDots[slide].classList.add("active");

		currentActive = currentSlide;

		clearTimeout(testimTimer);
		testimTimer = setTimeout(function() {
			playSlide((currentSlide += 1));
		}, testimSpeed);
	}

	testimLeftArrow.addEventListener("click", function() {
		playSlide((currentSlide -= 1));
	});

	testimRightArrow.addEventListener("click", function() {
		playSlide((currentSlide += 1));
	});

	for (var l = 0; l < testimDots.length; l++) {
		testimDots[l].addEventListener("click", function() {
			playSlide((currentSlide = testimDots.indexOf(this)));
		});
	}

	playSlide(currentSlide);

	// keyboard shortcuts
	document.addEventListener("keyup", function(e) {
		switch (e.keyCode) {
			case 37:
				testimLeftArrow.click();
				break;

			case 39:
				testimRightArrow.click();
				break;

			case 39:
				testimRightArrow.click();
				break;

			default:
				break;
		}
	});

	testim.addEventListener("touchstart", function(e) {
		touchStartPos = e.changedTouches[0].clientX;
	});

	testim.addEventListener("touchend", function(e) {
		touchEndPos = e.changedTouches[0].clientX;

		touchPosDiff = touchStartPos - touchEndPos;

		console.log(touchPosDiff);
		console.log(touchStartPos);
		console.log(touchEndPos);

		if (touchPosDiff > 0 + ignoreTouch) {
			testimLeftArrow.click();
		} else if (touchPosDiff < 0 - ignoreTouch) {
			testimRightArrow.click();
		} else {
			return;
		}
	});
};


// Testimonials END
