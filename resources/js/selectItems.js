/* ***********************************************************
   MACRO FUNCTIONS
   *********************************************************** */

const billTotal = 59.47;

const resetTotals = () => {
  let selectedItems = document.querySelectorAll("#selected");
  let selectedMeals = [];
  for (item of selectedItems) {
    selectedMeals.push(item.parentNode);
  }
  let newTableTotal = 0;
  for (item of selectedMeals) {
    newTableTotal = parseFloat(
      (
        parseFloat(newTableTotal) + parseFloat(item.getAttribute("price"))
      ).toFixed(2)
    );
  }
  document.querySelector("#progress-value").outerHTML = `
    <p id="progress-value">$${newTableTotal}</p>
    `;

  //UPDATE OTHERS
  updateTipAmounts();
  updatePersonalTotal();
};

const deselectTips = () => {
  if (isTipSelected() == true) {
    resetSelectedTip();
  }
  reAttachHandlers();
};

const deselectCustomTip = () => {
  let customAmountContainer = document.getElementById(
    "custom-amount-container"
  );
  customAmountContainer.style.display = "none";
};

const setHalfMeal = meal => {
  let newPrice = (parseFloat(meal.getAttribute("price")) / 2).toFixed(2);
  meal.setAttribute("price", newPrice);
  meal.children[3].textContent = `$${newPrice}`;
};

const resetHalfMeal = meal => {
  let newPrice;
  if (meal.id == "Caesar Salad") newPrice = 13.99;
  if (meal.id == "House Salad") newPrice = 12.99;
  if (meal.id == "Cheeseburger") newPrice = 15.99;
  if (meal.id == "Turkey Club") newPrice = 15.0;
  if (meal.id == "Lemonade") newPrice = 1.5;
  meal.setAttribute("price", newPrice);
  meal.children[3].textContent = `$${newPrice}`;
};

const getTableTotal = () => {
  return parseFloat(
    parseFloat(
      document.querySelector("#progress-value").textContent.substring(1, 6)
    ).toFixed(2)
  );
};

const isTipSelected = () => {
  if (document.querySelectorAll(".tip-selected").length == 0) {
    return false;
  } else {
    return true;
  }
};

const selectedTipAmount = () => {
  return parseFloat(
    document
      .querySelectorAll(".tip-selected")[0]
      .childNodes[3].innerText.substring(1, 6)
  ).toFixed(2);
};

const resetSelectedTip = () => {
  let selectedTip = document.querySelectorAll(".tip-selected")[0];
  let tipPercentage = selectedTip.getAttribute("tip") * 100;
  let tipTotal = ((tipPercentage / 100) * getTableTotal()).toFixed(2);
  selectedTip.outerHTML = `
        <div id=${
          selectedTip.id
        } class="tip-unselected" tip=${selectedTip.getAttribute("tip")}>
            <div class="half-container">
              <h3 id="percentage-font">${tipPercentage}%</h3>
            </div>
            <div id="amount-container">
              <h3 id="amount-font">$${tipTotal}</h3>
            </div>
          </div>
        `;
};

const selectTipHTML = (tipId, tipAmount) => {
  let tipTotal = ((tipAmount / 100) * getTableTotal()).toFixed(2);
  return `
    <div id=${tipId} class="tip-selected" tip=${tipAmount}>
    <div class="half-container">
        <h3 id="percentage-font-selected">${tipAmount * 100}%</h3>
    </div>
    <div id="amount-container-selected">
         <h3 id="amount-font">$${tipTotal}</h3>
    </div>
    </div>
    `;
};

const changeBillTotal = amount => {
  document.querySelector(".total-amount").outerHTML = `
  <h1 class="total-amount" total="${amount}">$${amount}</h1>
  `;
};

const updateTableTotal = (type, meal) => {
  let previousTableTotal = getTableTotal();
  let newTableTotal;
  if (type == 0) {
    newTableTotal = (
      previousTableTotal + parseFloat(meal.getAttribute("price"))
    ).toFixed(2);
  } else if (type == 1) {
    newTableTotal = (
      previousTableTotal - parseFloat(meal.getAttribute("price"))
    ).toFixed(2);
  }
  document.querySelector("#progress-value").outerHTML = `
    <p id="progress-value">$${newTableTotal}</p>
    `;
};

const updatePersonalTotal = () => {
  let totalWithoutTip = getTableTotal();
  if (isTipSelected() == false) {
    changeBillTotal(totalWithoutTip);
  } else {
    let totalWithTip = (
      parseFloat(totalWithoutTip) + parseFloat(selectedTipAmount())
    ).toFixed(2);
    changeBillTotal(totalWithTip);
  }
};

const updateTrackerAnimation = () => {
  document.querySelector("#keyframes").outerHTML = `
    <style id="keyframes"></style>
  `;
  document.querySelector("#keyframes").outerHTML = `
  <style id="keyframes">
      @keyframes load {
        0% {
          height: 0%;
        }
        100% {
          height: ${(getTableTotal() / billTotal) * 100}%;
        }
      }

      @keyframes value-load {
        0% {
          height: 0%;
        }
        100% {
            height: ${(getTableTotal() / billTotal) * 100}%;
        }
      }
    </style>
  `;
};

const updateTipAmounts = () => {
  let TableTotal = getTableTotal();

  //TIP AMOUNTS
  let tenPercent = (0.1 * TableTotal).toFixed(2);
  let fifteenPercent = (0.15 * TableTotal).toFixed(2);
  let twentyPercent = (0.2 * TableTotal).toFixed(2);

  //TIP HTML
  let tenTipHTML = document.getElementById("10-tip-container");
  let fifteenTipHTML = document.getElementById("15-tip-container");
  let twentyTipHTML = document.getElementById("20-tip-container");

  if (isTipSelected() == true) {
    let selectedTip = document.querySelectorAll(".tip-selected")[0];
    if (selectedTip.id == "10-tip-container") {
      tenTipHTML.innerHTML = selectedTipHTML("10%", tenPercent);
      fifteenTipHTML.innerHTML = unselectedTipHTML("15%", fifteenPercent);
      twentyTipHTML.innerHTML = unselectedTipHTML("20%", twentyPercent);
    } else if (selectedTip.id == "15-tip-container") {
      tenTipHTML.innerHTML = unselectedTipHTML("10%", tenPercent);
      fifteenTipHTML.innerHTML = selectedTipHTML("15%", fifteenPercent);
      twentyTipHTML.innerHTML = unselectedTipHTML("20%", twentyPercent);
    } else if (selectedTip.id == "20-tip-container") {
      tenTipHTML.innerHTML = unselectedTipHTML("10%", tenPercent);
      fifteenTipHTML.innerHTML = unselectedTipHTML("15%", fifteenPercent);
      twentyTipHTML.innerHTML = selectedTipHTML("20%", twentyPercent);
    }
  } else {
    tenTipHTML.innerHTML = unselectedTipHTML("10%", tenPercent);
    fifteenTipHTML.innerHTML = unselectedTipHTML("15%", fifteenPercent);
    twentyTipHTML.innerHTML = unselectedTipHTML("20%", twentyPercent);
  }
};

const selectedTipHTML = (percentage, amount) => {
  return `
    <div class="half-container">
      <h3 id="percentage-font-selected">${percentage}</h3>
    </div>
    <div id="amount-container-selected">
      <h3 id="amount-font">$${amount}</h3>
    </div>
    `;
};

const unselectedTipHTML = (percentage, amount) => {
  return `
      <div class="half-container">
        <h3 id="percentage-font">${percentage}</h3>
      </div>
      <div id="amount-container">
        <h3 id="amount-font">$${amount}</h3>
      </div>
      `;
};

const selectedMealHTML = meal => {
  let mealId = meal.id;
  if (meal.children[2].getAttribute("class") == "selected-halfmeal") {
    return `
    <div class="meal-item" id="${mealId}" price="${meal.getAttribute("price")}">
      <i id="selected" class="fas fa-check-square"></i>
      <h3 id="mealName">${mealId}</h3>
      <div id="half-meal" class="selected-halfmeal">
    <i class="fas fa-thermometer-half"></i>
    <p>Half Meal</p>
  </div>
      <h3 id="price">$${meal.getAttribute("price")}</h3>
    </div>
       `;
  } else {
    return `
    <div class="meal-item" id="${mealId}" price="${meal.getAttribute("price")}">
      <i id="selected" class="fas fa-check-square"></i>
      <h3 id="mealName">${mealId}</h3>
      <div id="half-meal" class="unselected-halfmeal">
    <i class="fas fa-thermometer-half"></i>
    <p>Half Meal</p>
  </div>
      <h3 id="price">$${meal.getAttribute("price")}</h3>
    </div>
       `;
  }
};

const unselectedMealHTML = meal => {
  let mealId = meal.id;
  if (meal.children[2].getAttribute("class") == "selected-halfmeal") {
    return `
    <div class="meal-item" id="${mealId}" price="${meal.getAttribute("price")}">
      <i id="unselected" class="far fa-square"></i>
      <h3 id="mealName">${mealId}</h3>
      <div id="half-meal" class="selected-halfmeal">
    <i class="fas fa-thermometer-half"></i>
    <p>Half Meal</p>
  </div>
      <h3 id="price">$${meal.getAttribute("price")}</h3>
    </div>
         `;
  } else {
    return `
    <div class="meal-item" id="${mealId}" price="${meal.getAttribute("price")}">
      <i id="unselected" class="far fa-square"></i>
      <h3 id="mealName">${mealId}</h3>
      <div id="half-meal" class="unselected-halfmeal">
    <i class="fas fa-thermometer-half"></i>
    <p>Half Meal</p>
  </div>
      <h3 id="price">$${meal.getAttribute("price")}</h3>
    </div>
         `;
  }
};

const selectedHalfMealHTML = meal => {
  let mealId = meal.id;
  return `
    <div id="half-meal" class="selected-halfmeal">
    <i class="fas fa-thermometer-half"></i>
    <p>Half Meal</p>
  </div>
         `;
};

const unselectedHalfMealHTML = meal => {
  let mealId = meal.id;
  return `
    <div id="half-meal" class="unselected-halfmeal">
    <i class="fas fa-thermometer-half"></i>
    <p>Half Meal</p>
  </div>
           `;
};

const reAttachHandlers = () => {
  attachMealHandler();
  attachTipHandler();
  attachSelectedMealHandler();
  attachHalfMealHandler();
  attachSelectedHalfMealHandler();
};

/* ***********************************************************
   SELECT A MEAL
   *********************************************************** */

const attachMealHandler = () => {
  let mealItems = document.querySelectorAll("#unselected");
  for (item of mealItems) {
    item.onclick = addToUnselected;
  }
};

const addToUnselected = event => {
  let myMeal = event.target;
  while (myMeal.parentNode.id != "meal-list") {
    myMeal = myMeal.parentNode;
  }
  selectMeal(myMeal);
};

const selectMeal = meal => {
  let mealId = meal.id;
  let selectedItem = document.getElementById(`${mealId}`);
  selectedItem.outerHTML = selectedMealHTML(meal);

  //Type 0: Select
  updateTableTotal(0, meal);
  updateTipAmounts();
  updatePersonalTotal();
  updateTrackerAnimation();
  reAttachHandlers();
};

/* ***********************************************************
   UNSELECT A MEAL
   *********************************************************** */

const attachSelectedMealHandler = () => {
  let mealItems = document.querySelectorAll("#selected");
  for (item of mealItems) {
    item.onclick = addToSelectedMeals;
  }
};

const addToSelectedMeals = event => {
  let myMeal = event.target;
  while (myMeal.parentNode.id != "meal-list") {
    myMeal = myMeal.parentNode;
  }
  unselectMeal(myMeal);
};

const unselectMeal = meal => {
  let mealId = meal.id;
  let unselectedItem = document.getElementById(`${mealId}`);
  unselectedItem.outerHTML = unselectedMealHTML(meal);

  // Type 1: Unselect
  updateTableTotal(1, meal);
  updateTipAmounts();
  updatePersonalTotal();
  updateTrackerAnimation();
  reAttachHandlers();
};

/* ***********************************************************
   SELECT A TIP
   *********************************************************** */

const attachTipHandler = () => {
  let tipAmounts = document.querySelectorAll(".tip-unselected");
  for (item of tipAmounts) {
    item.onclick = addToTotal;
  }
};

const addToTotal = event => {
  let myTip = event.target;
  while (myTip.parentNode.id != "tip-total") {
    myTip = myTip.parentNode;
  }
  selectTip(myTip);
};

const selectTip = tip => {
  deselectCustomTip();
  let tipAmount = tip.getAttribute("tip");
  let tipId = tip.id;
  let currentTip = document.getElementById(`${tipId}`);

  if (isTipSelected() == true) {
    resetSelectedTip();
  }
  currentTip.outerHTML = selectTipHTML(tipId, tipAmount);
  updateTipAmounts();
  updatePersonalTotal();
  reAttachHandlers();
};

/* ***********************************************************
   HALF MEAL SELECT
   *********************************************************** */
const attachHalfMealHandler = () => {
  let halfMeals = document.querySelectorAll(".unselected-halfmeal");
  for (item of halfMeals) {
    item.onclick = addToHalf;
  }
};

const addToHalf = event => {
  let myHalf = event.target;
  while (myHalf.parentNode.id != "meal-list") {
    myHalf = myHalf.parentNode;
  }
  selectHalf(myHalf);
};

const selectHalf = meal => {
  let mealId = meal.id;
  let selectedItem = document.getElementById(`${mealId}`);
  selectedItem.children[2].outerHTML = selectedHalfMealHTML(meal);

  setHalfMeal(meal);
  resetTotals();
  updateTrackerAnimation();
  reAttachHandlers();
};

/* ***********************************************************
   HALF MEAL UNSELECT
   *********************************************************** */
const attachSelectedHalfMealHandler = () => {
  let halfMeals = document.querySelectorAll(".selected-halfmeal");
  for (item of halfMeals) {
    item.onclick = addToSelectedHalf;
  }
};

const addToSelectedHalf = event => {
  let myHalf = event.target;
  while (myHalf.parentNode.id != "meal-list") {
    myHalf = myHalf.parentNode;
  }
  resetHalf(myHalf);
};

const resetHalf = meal => {
  let mealId = meal.id;
  let selectedItem = document.getElementById(`${mealId}`);
  selectedItem.children[2].outerHTML = unselectedHalfMealHTML(meal);

  resetHalfMeal(meal);
  resetTotals();
  updateTrackerAnimation();
  reAttachHandlers();
};

/* ***********************************************************
   INITIALIZATION
   *********************************************************** */

reAttachHandlers();

/* ***********************************************************
   Custom Tip
   *********************************************************** */

let customHalfContainer = document.getElementsByClassName(
  "custom-half-container"
)[0];
let customAmountContainer = document.getElementById("custom-amount-container");
document
  .getElementById("customTipAmount")
  .addEventListener("keydown", function(x) {
    if (x.keyCode == 13) {
      customInput();
    }
  });

customHalfContainer.addEventListener("click", function() {
  customAmountContainer.style.display = "flex";
});

const customInput = () => {
  deselectTips();
  let input = document.getElementById("customTipAmount").value;
  if (input.length != 0) {
    let previousTotal = getTableTotal();
    let total = (parseFloat(input) + parseFloat(previousTotal)).toFixed(2);
    document.querySelector(".total-amount").outerHTML = `
        <h1 class="total-amount" total="${total}">$${total}</h1>
        `;
  } else {
    input = 0;
    let previousTotal = getTableTotal();
    let total = parseFloat(input) + parseFloat(previousTotal);
    document.querySelector(".total-amount").outerHTML = `
        <h1 class="total-amount" total="${total}">$${total}</h1>
        `;
  }
};
