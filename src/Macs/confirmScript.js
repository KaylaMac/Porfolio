

window.onload = function(){
    const orderNum = document.getElementById("orderNum");
    var randomNum = Math.floor(Math.random()* 89999 + 10000);
    orderNum.innerHTML = randomNum;

    const orderDate = document.getElementById("orderDate");
    let currentDate = new Date();
    orderDate.innerHTML = currentDate.toDateString();  

    const name = document.getElementById("name");
    name.innerHTML = sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName");

    const totalDisplay = document.getElementById("totalDisplay");
    totalDisplay.innerHTML = "$"+ sessionStorage.getItem("total");
}