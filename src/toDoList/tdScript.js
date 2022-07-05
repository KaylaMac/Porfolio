//strike through task and move to completed when they've been checked off
function crossOff(x){
	var contain= document.getElementById("container");
	var contain2= document.getElementById("container2");
	var div = x.parentElement;

	if(x.checked == true && x.nextElementSibling.value != ""){
		x.nextElementSibling.style.textDecoration="line-through";
		contain2.appendChild(div);
	}else if(x.checked != true){
		x.nextElementSibling.style.textDecoration="none";
		contain.appendChild(div);
	}
}

/* create checkbox, text input, trash icon, and delete button and append it to the div holding each task;
then append it to the container div */

function newTask(){
	var contain= document.getElementById("container");
	var div = document.createElement("div");

	var check = document.createElement("INPUT");
	check.setAttribute("type","checkbox");
	check.setAttribute("onclick","crossOff(this)");

	var task= document.createElement("INPUT");
	task.setAttribute("type","text");
	task.setAttribute("placeholder","task");
	task.setAttribute("class","taskInput");
	task.addEventListener("keypress", function(event){
		if(task.value != "" && event.key === "Enter"){
			document.getElementById("addButton").click();
		}
	});

	var trashButton= document.createElement("INPUT");
	trashButton.setAttribute("type","image");
	trashButton.setAttribute("src","trashIcon.png");
	trashButton.setAttribute("onclick","deleteTask(this)");

	var delButton= document.createElement("div");
	delButton.innerHTML="Delete";
	delButton.setAttribute("class","deleteButton");
	delButton.setAttribute("onclick","deleteTask(this)");

	div.appendChild(check);
	div.appendChild(task);
	div.appendChild(trashButton);
	div.appendChild(delButton);

	div.setAttribute("class","taskDiv");
	div.setAttribute("onmouseover","showTrash(this)");
	div.setAttribute("onmouseleave","hideTrash(this)");

	contain.appendChild(div);
	task.focus();	// when new task is created, focus should go on that task
}


var firstTask = document.getElementById("first");
firstTask.addEventListener("keypress", function(event){
	if(firstTask.value != "" && event.key === "Enter"){	//current task should not be empty if user wants to make new task
		document.getElementById("addButton").click();
	}
});

function showTrash(z){
	if(window.innerWidth > 800 && z.children[1].value != "" && z.children[1] != document.activeElement){
	var trash = z.children[2];
	trash.style.display="inline-block";
	}
}


function hideTrash(c){
	var trash = c.children[2];
	trash.style.display="none";
}

function deleteTask(y){
	var div= y.parentElement;
	div.remove();
}