var swiper = new Swiper(".mySwiper", {
	effect: "coverflow",
	loop:"true",
	centeredSlides: false,
	slidesPerView: "1.5",
	breakpoints: {
		430: {
			slidesPerView: 3,
			centeredSlides: true
		},

		2500: {
			slidesPerView: 4,
			centeredSlides: true
		}
	},

	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: false,
	},

	pagination: {
		el: ".swiper-pagination",
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

function movePic(x){   
	var parent= x.parentElement; 
	if(window.innerWidth > 1310){
		parent.previousElementSibling.classList.toggle("imageReposition");
	}else{
		parent.previousElementSibling.classList.toggle("disappear");
	}
}

function moveTwo(y){
	if(window.innerWidth < 770 && y.classList.contains("swiper-slide-active")){
		var child = y.children[1];
		child.classList.toggle("disappear");
	}
}

swiper.on('slideChange', function(){
	var currImg= swiper.slides[swiper.previousIndex].children[1];

	if(window.innerWidth > 1310){
		if(currImg.classList.contains("imageReposition")){
			currImg.classList.toggle("imageReposition");
		}
	}else{
		if(currImg.classList.contains("disappear")){
			currImg.classList.toggle("disappear");
		}
	}
});