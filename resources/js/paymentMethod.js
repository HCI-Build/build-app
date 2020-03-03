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

const payClickEvent = option => {
  option.setAttribute("selected", true);
  if (option.id != "pay-option-c") {
    document.getElementById("pay-option-c").setAttribute("selected", false);
  } else {
    document.getElementById("payment-button-text").innerHTML =
      "Payment: Credit";
  }
  if (option.id != "pay-option-d") {
    document.getElementById("pay-option-d").setAttribute("selected", false);
  } else {
    document.getElementById("payment-button-text").innerHTML = "Payment: Debit";
  }
  if (option.id != "pay-option-v") {
    document.getElementById("pay-option-v").setAttribute("selected", false);
  } else {
    document.getElementById("payment-button-text").innerHTML = "Payment: Venmo";
  }
  if (option.id != "pay-option-a") {
    document.getElementById("pay-option-a").setAttribute("selected", false);
  } else {
    document.getElementById("payment-button-text").innerHTML =
      "Payment: Apple Pay";
  }
};
