//take values of inputs and put them into array to be saved
function saveTasks(x,y){
	var tasks= document.getElementById(x)
                .getElementsByClassName("taskInput");
	var values=[];

	for(var a=0; a<tasks.length; a++){
		values[a] = tasks[a].value;
	}

	localStorage.setItem(y,JSON.stringify(values));
}

//save number of tasks
function saveTaskNum(a,b){
	var con = document.getElementById(a);
	var taskNum = con.children.length;
	localStorage.setItem(b, taskNum);
}

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

	saveTaskNum("container","numTask");
	saveTaskNum("container2","numComp");
	
	saveTasks("container","tasks");
	saveTasks("container2","completed");
}

/* create checkbox, text input, trash icon, and delete button and append it to the div holding each task;
then append it to the container div */

function newTask(c){
	var contain= document.getElementById(c);
	var div = document.createElement("div");

	var check = document.createElement("INPUT");
	check.setAttribute("type","checkbox");
	check.setAttribute("onclick","crossOff(this)");

	var task= document.createElement("INPUT");
	task.setAttribute("type","text");
	task.setAttribute("placeholder","task");
	task.setAttribute("class","taskInput");
	task.setAttribute("oninput","saveTasks('container','tasks')");
	task.addEventListener("keypress", function(event){
		if(task.value != "" && event.key === "Enter"){
			document.getElementById("addButton").click();
		}
	});

	var trashButton= document.createElement("INPUT");
	trashButton.setAttribute("type","image");
	trashButton.setAttribute("src","trashIcon.png");
	trashButton.setAttribute("alt","trash icon");
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

	saveTaskNum("container","numTask");
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

	saveTaskNum("container","numTask");
	saveTaskNum("container2","numComp");
}

window.onload = function(){
	var number = localStorage.getItem("numTask");
	var number2 = localStorage.getItem("numComp");

	for(var m=0; m<number2-1; m++){
		newTask("container2");
	}
	
	for(var i=0; i<number-1; i++){
		newTask("container");
	}

	var tasks1 = document.getElementById("container").getElementsByClassName("taskInput");
	var tasks2 = document.getElementById("container2").getElementsByClassName("taskInput");

	var storedTasks = localStorage.getItem("tasks");
	var storedCompTasks = localStorage.getItem("completed");

	var change1 = storedTasks.replace("[","");
	var change2 = change1.replace("]","");
	var change3 = change2.replace(/"/g,"");

	var comp3 = " ";
	
	if(storedCompTasks != null){
		var comp1 = storedCompTasks.replace("[","");
		var comp2 = comp1.replace("]","");
		comp3 = comp2.replace(/"/g,"");
	}

	
	var arr2 = comp3.split(",");

	for (var n=0; n<number2-1; n++){
		tasks2[n].value = arr2[n];
		tasks2[n].style.textDecoration = "line-through";
		tasks2[n].previousElementSibling.checked = true;
	}

	var arr = change3.split(",");

	for (var j=0; j<number; j++){
		if((arr[j] == "") || (arr[j] == null)){
			tasks1[j].value = "";
		}else{
			tasks1[j].value = arr[j];
		}		
	}	
}