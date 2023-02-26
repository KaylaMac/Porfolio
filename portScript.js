function playAnimation(x){
	var page= x.nextElementSibling;
	page.classList.remove("anim2");
	page.classList.add("anim");
	setTimeout(()=> {page.classList.add("top")},600);
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