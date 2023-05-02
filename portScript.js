function playAnimation(x){
	var parent = x.parentElement;
	var description = parent.nextElementSibling;
	description.classList.remove("anim2");
	description.classList.add("anim");
	setTimeout(()=> {description.classList.add("top")},600);
}

function removeAnimation(y){
	y.classList.add("anim2");
	y.classList.remove("anim");
	setTimeout(()=>{y.classList.remove("top")},600);
}

var visButtons = document.getElementsByClassName("visitButton");
for(var i=0; i<visButtons.length; i++){
	visButtons[i].addEventListener("click",(event) => event.stopPropagation());
}

const flexBox = document.getElementById("projectsFlex");

function scrollRight(){
	flexBox.scrollLeft += 500;
}

function goLeft(){
	flexBox.scrollLeft -= 500;
}