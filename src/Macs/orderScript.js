const food= [
    {image:"./images/menuItems/cfr.jpg", name:"Chicken Fried Rice", price:12.25},
    {image:"./images/menuItems/scampi.jpg", name:"Shrimp Scampi", price:22.15},
    {image:"./images/menuItems/mushroomSauce.jpg", name:"Steak and Mushroom Sauce", price:17.38},
    {image:"./images/menuItems/chickenParmesan.jpg", name:"Chicken Parmigiana", price:13.10},
    {image:"./images/menuItems/guac.jpg", name:"Guacomole", price:10.20},
    {image:"./images/menuItems/meatloaf.jpg", name:"Meatloaf", price:15.75},
    {image:"./images/menuItems/salmon.jpg", name:"Salmon", price:12.10},
    {image:"./images/menuItems/spagh.jpg", name:"Spaghetti and Meatballs", price:11.00},
    {image:"./images/menuItems/macAndCheese.jpg", name:"Mac and Cheese", price:10.30},
    {image:"./images/menuItems/lasagna.jpg", name:"Lasagna", price:23.19},
    {image:"./images/menuItems/chili.jpg", name:"Chili", price:16.55}
];

const drinks=[
    {image:"./images/menuItems/CC.jpg", name:"Coca-Cola"},
    {image:"./images/menuItems/Barqs.jpg", name:"Barq's"},
    {image:"./images/menuItems/brisk.jpg", name:"Brisk"},
    {image:"./images/menuItems/Dew.jpg", name:"Mountain Dew"},
    {image:"./images/menuItems/sprite.jpg", name:"Sprite"},
    {image:"./images/menuItems/pepsi.jpg", name:"Pepsi"},
    {image:"./images/menuItems/JuC.jpg", name:"Ju C"},
    {image:"./images/menuItems/DP.jpg", name:"Dr. Pepper"},
    {image:"./images/menuItems/MinuteMaid.jpg", name:"Lemonade"},
    {image:"./images/menuItems/CanadaDry.jpg", name:"Ginger Ale"},
    {image:"./images/menuItems/PS.jpg", name:"Water"},
    {image:"./images/menuItems/sunnyD.jpg", name:"Sunny D"}
];

var con= document.getElementById("order");
var endOfOrder = document.getElementById("endOfOrder");
var totalPara = document.getElementById("total");
var number = document.getElementById("quantity");
var quantityDiv = document.getElementById("num");
var sizeDiv = document.getElementById("sizes");
var addFoodButton = document.getElementById("addFoodButton");
var numberBadge= document.getElementById("foodItemsNum");

var total = 0;
var quantity = 1;
var numFoodItems = 0;

function addQuantity(){
    quantity++;
    number.innerHTML = quantity;
}

function subtractQuantity(){
    if(quantity > 1){
        quantity--;
    }
    number.innerHTML = quantity;
}

//display UI element to allow user to choose quantity. parameter is to control which food item is added
var arrayNum=0;
function showQuantity(y){
    quantityDiv.classList.remove("numAnim");

    setTimeout(()=> {quantityDiv.classList.add("numAnim");}, 100);
    
    addFoodButton.setAttribute("onclick","addFoodItem()");
    arrayNum = y;

    if(sizeDiv.style.visibility != "hidden"){
        sizeDiv.style.visibility = "hidden";
    }
    sizeDiv.classList.remove("sodaAnim");
}

function showQuantityDrink(y){
    //quantityDiv.style.visibility = "visible";
    quantityDiv.classList.add("numAnim");

    sizeDiv.style.visibility = "visible";
    sizeDiv.classList.add("sodaAnim");
    addFoodButton.setAttribute("onclick","addDrink()");

    arrayNum = y;
}

var small = document.getElementById("small");
var med = document.getElementById("medium");
var large = document.getElementById("large");

function addDrink(){
    var pic=  createImg(arrayNum, drinks);
    var para = createName(arrayNum, drinks);
    var price = 0;
    var pricePara = document.createElement("p");

    if(small.checked){
        price = 2;
    }else if(med.checked){
        price = 2.5;
    }else{
        price = 3;
    }

    pricePara.innerHTML = (price * quantity).toFixed(2);

    appendQualities(pic, para, pricePara);

    total+= price * quantity;
    totalPara.innerHTML = "Total: $"+ total.toFixed(2);

    orderOverflow();
    resetQuantity();

    sizeDiv.style.visibility = "hidden";
    sizeDiv.classList.remove("sodaAnim");

    numFoodItems++;
    numberBadge.innerHTML = numFoodItems;

    if(numberBadge.style.visibility != "visible"){
        numberBadge.style.visibility = "visible";
    }
}

function addFoodItem(){
    var pic = createImg(arrayNum, food);
    var para = createName(arrayNum, food);

    var price = document.createElement("p");
    price.innerHTML = (food[arrayNum].price * quantity).toFixed(2);

    appendQualities(pic, para, price);
    
    total+= food[arrayNum].price * quantity;
    totalPara.innerHTML = "Total: $"+ total.toFixed(2);

    orderOverflow();
    resetQuantity();

    numFoodItems++;
    numberBadge.innerHTML = numFoodItems;

    if(numberBadge.style.visibility != "visible"){
        numberBadge.style.visibility = "visible";
    }
}

function orderOverflow() {
    if (con.style.height != 0) {
        con.style.height = "auto";
    }

    if (con.style.height != 0) {
        con.style.overflowY = "auto";
    } else {
        con.style.overflowY = "hidden";
    }
}

function createImg(k, arr) {
    var pic = document.createElement("img");
    pic.src = arr[k].image;
    pic.setAttribute("width", "80px");
    pic.setAttribute("height", "60px");
    pic.setAttribute("alt",arr[k].name);
    pic.style.borderRadius = "50%";
    return pic;
}

function createName(x,arr) {
    var para = document.createElement("p");

    if (quantity > 1) {
        para.innerHTML = arr[x].name + " (" + quantity + ")";
    } else {
        para.innerHTML = arr[x].name;
    }
    return para;
}

function appendQualities(picture, label, pricePara) {
    con.insertBefore(picture, endOfOrder);
    con.insertBefore(label, endOfOrder);
    con.insertBefore(pricePara, endOfOrder);
}

function resetQuantity() {
    //quantityDiv.style.visibility = "hidden";
    quantityDiv.classList.remove("numAnim");

    quantity = 1;
    number.innerHTML = quantity;
}

function showOrder(){
    if(con.style.height == 0){
        con.style.height = con.scrollHeight + "px";
        con.style.overflowY = "auto";
    }else{
        con.style.height = null;
        con.style.overflowY = "hidden";
    }
}

/********** left and right buttons ************/
const selections = Array.from(document.getElementsByClassName("selection"));

selections.forEach(selection => {
    selection.addEventListener("scroll", function(){
        var butR = selection.nextElementSibling;
        var butL = selection.previousElementSibling;

        if(selection.scrollLeft >= (selection.scrollWidth - selection.offsetWidth-1)){
            butR.disabled = true;
        }else{
            butR.disabled = false;
        }
          
        if(selection.scrollLeft < 15){
            butL.disabled = true;
        }else{
            butL.disabled = false;
        }
    });
});

function goRight(x){
    var con = x.previousElementSibling;
    con.scrollLeft += con.offsetWidth;
}

function goLeft(y){
    var con = y.nextElementSibling;
    con.scrollLeft -= con.offsetWidth;
}

var promptHolder = document.getElementById("orderPromptHolder");
var totalDisplays = document.getElementsByClassName("totalDisplay");
function checkOut(){
    if(con.children.length > 1){    //if there is food in the cart, display the prompt for order type selection
        sessionStorage.setItem("total",total.toFixed(2));
        promptHolder.style.display="block";
        con.style.height = null;
        con.style.overflowY = "hidden";
        for(var i=0; i < totalDisplays.length; i++){
            totalDisplays[i].outerHTML = "<h2 class='totalDisplay'>Total: <span style='font-weight:normal;'>$" +total.toFixed(2)+ "</span></h2>";   
        }
    }
}

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const editKeys = ["Backspace","ArrowLeft","ArrowRight"];
var cvv = document.getElementsByClassName("cvv");
var zipcode = document.getElementById("zip");
var state = document.getElementById("state");

//if keydown is not a number or an editKey, preventDefault
const keydownListener = function(event){
    var keycode = event.key;
    if((numbers.indexOf(keycode) == -1) && (editKeys.indexOf(keycode) == -1)){
        event.preventDefault();
    }
};

for(var i=0; i < cvv.length; i++){
    cvv[i].addEventListener("keydown", keydownListener);
}

zipcode.addEventListener("keydown", keydownListener);
state.addEventListener("keydown", function(event){
    var code = event.key;

    if(event.getModifierState("CapsLock")){ //if caps is on, change to lowercase so it is not blocked by checkIfChar()
        code = code.toLowerCase();
        checkIfChar();
    }

    if(event.getModifierState("Shift")){    //if shift being pressed, change to lowercase so it is not blocked by checkIfChar()
        code = code.toLowerCase();
        checkIfChar();
    }

   checkIfChar();   //if key is equal to itself after being capitalized, it is a symbol or integer

    function checkIfChar() {
        if (code == code.toUpperCase()) {
            event.preventDefault();
        }
    }
});

//for credit card formatting
var cleave = new Cleave("#cardNum",{
    creditCard:true
});

var cleave2 = new Cleave("#cardNum2",{
    creditCard:true
});

var dateCleave = new Cleave("#date",{
    date: true,
    datePattern: ['m', 'y']
});

var dateCleave2 = new Cleave("#date2",{
    date: true,
    datePattern: ['m', 'y']
});

var orderTypePrompt = document.getElementById("orderTypePrompt");
var pickup = document.getElementById("pickupOpt");
var pickDiv = document.getElementById("pickupDiv");
var deliver = document.getElementById("delivOpt");
var delDiv = document.getElementById("deliveryDiv");

function cancel(){
    promptHolder.style.display = "none";
    pickDiv.style.display = "none";
    delDiv.style.display = "none";
    orderTypePrompt.style.display = "block";
}

function next(){
    if(pickup.checked){
        orderTypePrompt.style.display = "none";
        pickDiv.style.display = "block";
    }else{
        orderTypePrompt.style.display = "none";
        delDiv.style.display = "block";
    }
}

//save user input into session storage
var pickupFirst = document.getElementById("pickupFirst");
var pickupLast = document.getElementById("pickupLast");

var delFirst = document.getElementById("delFirst");
var delLast = document.getElementById("delLast");

pickupFirst.addEventListener("focusout",function(){
    sessionStorage.setItem("firstName",pickupFirst.value);
});

pickupLast.addEventListener("focusout",function(){
    sessionStorage.setItem("lastName",pickupLast.value);
});

delFirst.addEventListener("focusout",function(){
    sessionStorage.setItem("firstName",delFirst.value);
});

delLast.addEventListener("focusout",function(){
    sessionStorage.setItem("lastName",delLast.value);
});

//input validation
const pickupInputs = pickDiv.getElementsByTagName("input");
const delInputs = delDiv.getElementsByTagName("input");
const pickSubmit = document.getElementById("pickSubmit");
const delSubmit= document.getElementById("delSubmit");

//helper method - see if all input is valid
function checkInput(arr){
    for(var i=0; i < arr.length; i++){
        if(!arr[i].validity.valid){
          return false;
        }
    }

    return true;
}

//executes when "submit" button is pressed
function validate(arr){
    if(checkInput(arr)){   //show confirmation page if everything is ok
        removeEventListener('beforeunload',beforeUnloadListener,{capture:true});
        window.location.href= "confirm.html";
    }else{
        for(var i=0; i < arr.length; i++){
            if(!arr[i].validity.valid){
                arr[i].classList.add("wrong");   //show which inputs are invalid (displays with red shadow)
            }
        }
    }
}

delSubmit.onclick = function(){
    validate(delInputs);
}

pickSubmit.onclick = function(){
    validate(pickupInputs);
}

function back(x){
    var parent = x.parentElement;
    var grand = parent.parentElement;

    grand.style.display = "none";
    orderTypePrompt.style.display = "block";
}

const beforeUnloadListener = (event) => {
    event.returnValue = "you still have food in your cart";
};

//only add event listener if food has actually been added to the cart
addFoodButton.addEventListener("click",function(){
    addEventListener('beforeunload',beforeUnloadListener,{capture:true});
});

var foodButtons = document.getElementsByClassName("foodButton");
window.onresize = function(){
    if(window.innerWidth <= 770){   //food image buttons are enabled in tablet viewport size and below
        for(var i=0; i< foodButtons.length; i++){
            foodButtons[i].disabled=false;
        }
    }
};

window.onload = function(){
    const rightButtons = Array.from(document.getElementsByClassName("rightButton"));

    rightButtons.forEach(rightButton => {
        var con = rightButton.previousElementSibling;
        if(con.scrollWidth == con.clientWidth){ //if container doesn't need to be scrolled, disable the right button
            rightButton.disabled =true;
        }
    });

    if(window.innerWidth <= 770){
        for(var i=0; i< foodButtons.length; i++){
            foodButtons[i].disabled=false;
        }
    }
};