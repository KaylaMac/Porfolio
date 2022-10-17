var errorMessage = document.getElementById("errorMessage");
var pw = document.getElementById("passwordIn");
var confirmHolder = document.getElementById("confirmHolder");

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const symbols = ['!','@','#','$','%','&','*','?'];

const inputs = document.getElementsByTagName("input");

function containsUppercase(){
    var pwInput = pw.value;
    var chars= [...pwInput];
    for(var i=0; i < chars.length; i++){
        if(chars[i] == (chars[i]).toUpperCase()){
            return true;
        }
    }
    return false;
}

function hasNumOrSymbol(arr){
    var pwInput = pw.value;
    var chars= [...pwInput];
    for(var i=0; i < arr.length; i++){
        if(chars.indexOf(arr[i]) !=-1){
            return true;
        }
    }

    return false;
}

//if user leaves the password input, check if all requirements are satisfied
pw.addEventListener("focusout", function(){
    if(pw.validity.tooShort){
        errorMessage.innerHTML = "password is too short";
    }else if(!containsUppercase()){
        errorMessage.innerHTML = "password must contain capital letter";
    }else if(!hasNumOrSymbol(numbers)){
        errorMessage.innerHTML = "password must contain number";
    }else if(!hasNumOrSymbol(symbols)){
        errorMessage.innerHTML = "password must contain one of listed symbols";
    }else{
        errorMessage.innerHTML = "";
    }
});

function closeConfirm(){
    confirmHolder.style.display = "none";
}

//helper method - see if all input is valid
function checkInput(){
    for(var i=0; i < inputs.length; i++){
        if(!inputs[i].validity.valid){
          return false;
        }
    }

    return true;
}

//executes when "sign up" button is pressed
function validate(){
    if(checkInput() && errorMessage.innerHTML == ""){   //show confirmation message if everything is ok
        confirmHolder.style.display = "block";
    }else{
        for(var i=0; i < inputs.length; i++){
            if(!inputs[i].validity.valid){
                inputs[i].classList.add("wrong");   //show which inputs are invalid (displays with red shadow)
            }
        }
    }
}