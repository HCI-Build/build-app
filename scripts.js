//MACROS
let billTotal = 59.47;
let paid = 0;
let progress = (paid / billTotal) * 100;
let meals;
let yourTotal;
let tipAmount10 = yourTotal * 0.1;
let tipAmount15 = yourTotal * 0.15;
let tipAmount20 = yourTotal * 0.2;

//Add event listeners to all of the clickable events, call function corresponding
//INITIALIZATION
//
/* ***********************************************************
   ANIMATION FUNCTIONS
   *********************************************************** */

/* ***********************************************************
   SELECTING MEALS
   *********************************************************** */
const attachMealHandler = () => {
  let mealItems = document.querySelectorAll("#unselected");
  for (item of mealItems) {
    item.onclick = addToMeals;
  }
};

const addToMeals = event => {
  let myMeal = event.target;
  while (myMeal.parentNode.id != "meal-list") {
    myMeal = myMeal.parentNode;
  }
  selectMeal(myMeal);
};

const selectMeal = meal => {
  let mealId = meal.id;
  let currentName = document.getElementById(`${mealId}`);
  currentName.outerHTML = `
  <div class="meal-item" id="${mealId}" price="${meal.getAttribute("price")}">
  <i id="selected" class="fas fa-check-square"></i>
  <h3 id="mealName">${mealId}</h3>
  <i class="fas fa-ellipsis-h"></i>
  <h3 id="price">$${meal.getAttribute("price")}</h3>
          </div>`;

  let priceAdjustment =
    parseFloat(document.querySelector(".total-amount").getAttribute("total")) +
    parseFloat(meal.getAttribute("price"));
  priceAdjustment = priceAdjustment.toFixed(2);

  //ADD TO PREVIOUS TOTAL
  let previousTable = parseFloat(
    document.querySelector("#progress-value").textContent.substring(1, 6)
  );
  document.querySelector("#progress-value").outerHTML = `
  <p id="progress-value">$${(
    previousTable + parseFloat(meal.getAttribute("price"))
  ).toFixed(2)}</p>
  `;

  //UPDATE TOTAL VALUE
  //First update tips:
  updateTips();
  attachTipHandler();
  let baseValue = parseFloat(
    document.querySelector("#progress-value").textContent.substring(1, 6)
  );
  console.log(baseValue);
  if (document.querySelectorAll(".tip-selected").length == 0) {
    document.querySelector(".total-amount").outerHTML = `
  <h1 class="total-amount" total="${baseValue}">$${baseValue}</h1>
  `;
  } else {
    newValue =
      baseValue +
      parseFloat(
        document
          .querySelectorAll(".tip-selected")[0]
          .childNodes[3].innerText.substring(1, 6)
      );
    document.querySelector(".total-amount").outerHTML = `
  <h1 class="total-amount" total="${newValue}">$${newValue}</h1>
  `;
    console.log(newValue);
    console.log(
      document
        .querySelectorAll(".tip-selected")[0]
        .childNodes[3].innerText.substring(1, 6)
    );
  }

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
          height: ${(parseFloat(
            document
              .querySelector("#progress-value")
              .textContent.substring(1, 6)
          ) /
            billTotal) *
            100}%;
        }
      }

      @keyframes value-load {
        0% {
          height: 0%;
        }
        100% {
          height: ${(parseFloat(
            document
              .querySelector("#progress-value")
              .textContent.substring(1, 6)
          ) /
            billTotal) *
            100}%;
        }
      }
    </style>
  `;

  updateTips();
  attachTipHandler();
  attachSelectedMealHandler();
};

/* ***********************************************************
   UNSELECT MEALS
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
  let currentName = document.getElementById(`${mealId}`);
  currentName.outerHTML = `
    <div class="meal-item" id="${mealId}" price="${meal.getAttribute("price")}">
    <i id="unselected" class="far fa-square"></i>
    <h3 id="mealName">${mealId}</h3>
    <i class="fas fa-ellipsis-h"></i>
    <h3 id="price">$${meal.getAttribute("price")}</h3>
            </div>`;

  /*let priceAdjustment =
    parseFloat(document.querySelector(".total-amount").getAttribute("total")) -
    parseFloat(meal.getAttribute("price"));
  priceAdjustment = priceAdjustment.toFixed(2); */

  //ADD TO PREVIOUS TOTAL
  console.log(document.querySelector("#progress-value"));
  let previousTable = parseFloat(
    document.querySelector("#progress-value").textContent.substring(1, 6)
  );
  document.querySelector("#progress-value").outerHTML = `
  <p id="progress-value">$${(
    previousTable - parseFloat(meal.getAttribute("price"))
  ).toFixed(2)}</p>
  `;
  console.log(document.querySelector("#progress-value"));

  //UPDATE TOTAL VALUE
  //First update tips:
  updateTips();
  attachTipHandler();
  let baseValue = parseFloat(
    document.querySelector("#progress-value").textContent.substring(1, 6)
  );
  if (document.querySelectorAll(".tip-selected").length == 0) {
    document.querySelector(".total-amount").outerHTML = `
  <h1 class="total-amount" total="${baseValue}">$${baseValue}</h1>
  `;
  } else {
    newValue =
      baseValue +
      parseFloat(
        document
          .querySelectorAll(".tip-selected")[0]
          .childNodes[3].innerText.substring(1, 6)
      );
    document.querySelector(".total-amount").outerHTML = `
  <h1 class="total-amount" total="${newValue}">$${newValue}</h1>
  `;
  }

  //UPDATE TOTAL
  /*
  document.querySelector(".total-amount").outerHTML = `
    <h1 class="total-amount" total="${priceAdjustment}">$${priceAdjustment}</h1>
    `;
    */

  document.querySelector("#keyframes").outerHTML = `
  <style id="keyframes">
      @keyframes load {
        0% {
          height: 0%;
        }
        100% {
          height: ${(parseFloat(
            document
              .querySelector("#progress-value")
              .textContent.substring(1, 6)
          ) /
            billTotal) *
            100}%;
        }
      }

      @keyframes value-load {
        0% {
          height: 0%;
        }
        100% {
          height: ${(parseFloat(
            document
              .querySelector("#progress-value")
              .textContent.substring(1, 6)
          ) /
            billTotal) *
            100}%;
        }
      }
    </style>
  `;
  updateTips();
  attachTipHandler();
  attachMealHandler();
};
/* ***********************************************************
   UPDATE TIPS
   *********************************************************** */
const updateTips = () => {
  let TotalAmount = parseFloat(
    document.querySelector("#progress-value").textContent.substring(1, 6)
  );
  let tenTipTotal = (0.1 * TotalAmount).toFixed(2);
  let fifteenTipTotal = (0.15 * TotalAmount).toFixed(2);
  let twentyTipTotal = (0.2 * TotalAmount).toFixed(2);

  let tenTipHTML = document.getElementById("10-tip-container");
  let fifteenTipHTML = document.getElementById("15-tip-container");
  let twentyTipHTML = document.getElementById("20-tip-container");

  if (document.querySelectorAll(".tip-selected").length != 0) {
    let selectedTip = document.querySelectorAll(".tip-selected")[0];
    if (selectedTip.id == "10-tip-continer") {
      tenTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font-selected">10%</h3>
    </div>
    <div id="amount-container-selected">
      <h3 id="amount-font">$${tenTipTotal}</h3>
    </div>
    `;
      fifteenTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">15%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${fifteenTipTotal}</h3>
    </div>
    `;
      twentyTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">20%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${twentyTipTotal}</h3>
    </div>
    `;
    } else if (selectedTip.id == "15-tip-container") {
      tenTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">10%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${tenTipTotal}</h3>
    </div>
    `;
      fifteenTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font-selected">15%</h3>
    </div>
    <div id="amount-container-selected">
      <h3 id="amount-font">$${fifteenTipTotal}</h3>
    </div>
    `;
      twentyTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">20%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${twentyTipTotal}</h3>
    </div>
    `;
    } else if (selectedTip.id == "20-tip-container") {
      tenTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">10%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${tenTipTotal}</h3>
    </div>
    `;
      fifteenTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">15%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${fifteenTipTotal}</h3>
    </div>
    `;
      twentyTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font-selected">20%</h3>
    </div>
    <div id="amount-container-selected">
      <h3 id="amount-font">$${twentyTipTotal}</h3>
    </div>
    `;
    }
  } else {
    tenTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">10%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${tenTipTotal}</h3>
    </div>
    `;
    fifteenTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">15%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${fifteenTipTotal}</h3>
    </div>
    `;
    twentyTipHTML.innerHTML = `
    <div class="half-container">
      <h3 id="percentage-font">20%</h3>
    </div>
    <div id="amount-container">
      <h3 id="amount-font">$${twentyTipTotal}</h3>
    </div>
    `;
  }
};

/* ***********************************************************
   SELECT TIP
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
  let tipAmount = tip.getAttribute("tip");
  let tipId = tip.id;
  let currentTip = document.getElementById(`${tipId}`);

  //CHECK IF ANY TIP IS SELECTED
  console.log(document.querySelectorAll(".tip-selected").length != 0);
  if (document.querySelectorAll(".tip-selected").length != 0) {
    let selectedTip = document.querySelectorAll(".tip-selected")[0];
    let preTipTotal = parseFloat(
      document.querySelector("#progress-value").textContent.substring(1, 6)
    );
    let tipPercentage = selectedTip.getAttribute("tip") * 100;
    let tipTotal = ((tipPercentage / 100) * preTipTotal).toFixed(2);

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

    updateTips();
    let priceAdjustment =
      parseFloat(
        document.querySelector(".total-amount").getAttribute("total")
      ) - tipTotal;
    priceAdjustment = priceAdjustment.toFixed(2);
    document.querySelector(".total-amount").outerHTML = `
     <h1 class="total-amount" total="${priceAdjustment}">$${priceAdjustment}</h1>
    `;
  }

  updateTips();
  let preTipTotal = parseFloat(
    document.querySelector("#progress-value").textContent.substring(1, 6)
  );
  let tipPercentage = tipAmount * 100;
  let tipTotal = ((tipPercentage / 100) * preTipTotal).toFixed(2);

  //UPDATE YOUR TOTAL
  let priceAdjustment =
    parseFloat(document.querySelector(".total-amount").getAttribute("total")) +
    parseFloat(tipTotal);
  priceAdjustment = priceAdjustment.toFixed(2);
  document.querySelector(".total-amount").outerHTML = `
    <h1 class="total-amount" total="${priceAdjustment}">$${priceAdjustment}</h1>
    `;

  currentTip.outerHTML = `
  <div id=${tipId} class="tip-selected" tip=${tipAmount}>
    <div class="half-container">
        <h3 id="percentage-font-selected">${tipAmount * 100}%</h3>
    </div>
    <div id="amount-container-selected">
         <h3 id="amount-font">$${tipTotal}</h3>
    </div>
    </div>
    `;

  attachTipHandler();
};

//END INITIALIZATION

attachMealHandler();
attachSelectedMealHandler();
attachTipHandler();
