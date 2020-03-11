/* ***********************************************************
PAYMENT OPTIONS FUNCTIONS
*********************************************************** */

document.getElementById("pay-option-c").addEventListener("click", function() {
  payClickEvent(document.getElementById("pay-option-c"));
});
document.getElementById("pay-option-d").addEventListener("click", function() {
  payClickEvent(document.getElementById("pay-option-d"));
});
document.getElementById("pay-option-v").addEventListener("click", function() {
  payClickEvent(document.getElementById("pay-option-v"));
});
document.getElementById("pay-option-a").addEventListener("click", function() {
  payClickEvent(document.getElementById("pay-option-a"));
});

document.getElementById("submit-new-pay").addEventListener("click", function(){
  validateCardInfo();
});

document.getElementById("cred").addEventListener("click", function(){
  creditOrDebit();
});
document.getElementById("deb").addEventListener("click", function(){
  creditOrDebit();
});

const payClickEvent = option => {
  option.setAttribute("selected", true);
  if (option.id == "pay-option-c") {
    document.getElementById("payment-button-text").innerText =
      "Payment: Credit";
  }
  if (option.id == "pay-option-d") {
    document.getElementById("payment-button-text").innerText = "Payment: Debit";
  }
  if (option.id == "pay-option-v") {
    document.getElementById("payment-button-text").innerText = "Payment: Venmo";
  }
  if (option.id == "pay-option-a") {
    document.getElementById("payment-button-text").innerText =
      "Payment: Apple Pay";
  }
  if (option.id == "pay-option-n") {
      if (document.getElementById("deb-box").checked){
          document.getElementById("payment-button-text").innerText =
          "Payment: Debit";
      }
      else{
          document.getElementById("payment-button-text").innerText =
          "Payment: Credit";
      }
  }
};

const addNewPay = () => {
    let cred = document.getElementById("cred-box").checked;
    let deb = document.getElementById("deb-box").checked;
    let cardNum = document.getElementById("c-num").value;
    cardNum = cardNum % 10000;
    if (deb) {
       document.getElementById("pay-option-container").innerHTML += "<button type=button for='' id=pay-option-n selected=false onclick=document.getElementById('pay-pop').style.display='none'><b>Debit</b> <p> XXXX-XXXX-XXXX-" + cardNum + "</p> </button>";
    }
    else{
        document.getElementById("pay-option-container").innerHTML += "<button type=button for='' id=pay-option-n selected=false onclick=document.getElementById('pay-pop').style.display='none'><b>Credit</b> <p> XXXX-XXXX-XXXX-" + cardNum + "</p> </button>";
    }
    //Reattach event listeners to the list
    document.getElementById("pay-option-n").addEventListener("click", function() {
      payClickEvent(document.getElementById("pay-option-n"));
    });
    document.getElementById("pay-option-c").addEventListener("click", function() {
      payClickEvent(document.getElementById("pay-option-c"));
    });
    document.getElementById("pay-option-d").addEventListener("click", function() {
      payClickEvent(document.getElementById("pay-option-d"));
    });
    document.getElementById("pay-option-v").addEventListener("click", function() {
      payClickEvent(document.getElementById("pay-option-v"));
    });
    document.getElementById("pay-option-a").addEventListener("click", function() {
      payClickEvent(document.getElementById("pay-option-a"));
    });
    if (def.checked){
        document.getElementById("option-default").innerText = "Default Method: Credit";
    }
    if (def.checked && deb){
        document.getElementById("option-default").innerText = "Default Method: Debit";
    }
    document.getElementById('new-pay-pop').style.display='none';
}

const creditOrDebit = () => {
    let credit = document.getElementById("cred-box").checked;
    let debit = document.getElementById("deb-box").checked;
    if (credit == true){
        document.getElementById("deb-box").checked = false;
    }
    if (debit == true){
        document.getElementById("cred-box").checked = false;
    }
}

const validateCardInfo = () => {
    let cNum = document.getElementById("c-num").value;
    let name = document.getElementById("name").value;
    let sec = document.getElementById("sec").value;
    let exp = document.getElementById("exp").value;
    let year = parseFloat(exp.substring(0,4));
    console.log(exp);
    if (name == ""){
        alert("Please enter your name.");
    }
    else if (!cNum.match(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/) && !cNum.match(/^(?:5[1-5][0-9]{14})$/)){
        alert("Please enter a valid credit card number.");
    }
    else if(exp == "" || year < 2020 || year > 2050){
        alert("Please enter a valid expiration date.")
    }
    else if (sec < 100 || sec > 999){
        alert("Please enter a valid security code.");
    }
    else{
        addNewPay();
    }
}
