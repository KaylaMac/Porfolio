function menuAnim(x){
	x.classList.toggle("change");
}

var menuButton=document.getElementById("menuButton");

var linkCon = document.getElementById("links");
function linksDisplay(){
	if(linkCon.style.display != "block"){
		linkCon.style.display = "block";
		linkCon.style.height = linkCon.scrollHeight + "px";
	}else{
		linkCon.style.height = 0;
		linkCon.style.display = "none";
	}
}

window.onresize = function(){
	if(window.innerWidth > 770){
		linkCon.style.display = "inline-block";
	}else if(window.innerWidth < 770 && menuButton.classList.contains("change")){
		linkCon.style.display = "block";
	}else{
		linkCon.style.display = "none";
	}
}