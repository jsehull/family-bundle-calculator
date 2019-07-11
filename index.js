// INDEX
// - Variables
// - Initialize
// - Navigation
// - Step 1
// - Step 2
// - Step 3



const step0 = document.getElementById('step0');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const TAX = 0.08;

let customerBankAccount = 0;
let customerSpendLimit = 0;
let phoneChoice = "";
let accessoryChoice = "";
let bundleSize = "";
let totalSpent = 0;
let costPerBundle = 0;



initialize();

// *** each step gets its own display component for input and/or info ***

function initialize() {
  document.getElementById('done-step0').onclick = () => { showStepOne(); }
  document.getElementById('done-step1').onclick = () => { showStepTwo(); }
  document.getElementById('done-step2').onclick = () => { showStepThree(); }

  document.getElementById('back-step2').onclick = () => { toggleDisplaySteps(step1, step2); }
  document.getElementById('back-step3').onclick = () => { toggleDisplaySteps(step2, step3); }

  showStepZero();
}

function showStepZero() {
  toggleDisplaySteps(step0, step1);
}

function showStepOne() {
  toggleDisplaySteps(step1, step0);
}

function showStepTwo() {
  getCustomerInitialInputs();

  if(customerBankAccount === "" || customerSpendLimit == "") {
     alert('Please fill out both inputs');
     return;
  } else {
    addCustomerInputsToTopBar();
    toggleDisplaySteps(step2, step1);
  }
}

function showStepThree() {
  collectPhoneData();
  collectAccessoryData();
  collectBundleData();

  if(phoneChoice[0] === "" || accessoryChoice[0] === "" || bundleSize === "") {
    alert('Please select one of each');
    return;
  } else {
    combineDataForSummary();
    moneyTotalsForSummary();
    toggleDisplaySteps(step3, step2);
  }
}



///
//// NAVIGATION

function toggleDisplaySteps(show, hide) {
  show.classList.add("active");
  hide.classList.remove("active");
}



///
//// STEP 1

function getCustomerInitialInputs() {
  customerBankAccount = document.getElementById("bank-account").value;
  customerSpendLimit = document.getElementById("spend-limit").value;
}

function addCustomerInputsToTopBar() {
  document.getElementById('top-bar').innerHTML = `
    <p id="input-balance">Estimated bank account:
      <span class="bold">$${customerBankAccount}</span>
    </p>
    <p id="input-spend">Desired spend limit:
      <span class="bold">$${customerSpendLimit}</span>
    </p>`;
}



///
//// STEP 2

function collectPhoneData() {
  phone = document.getElementById("phone-select");
  phoneValue = phone.options[phone.selectedIndex].value;
  phoneName = phone.options[phone.selectedIndex].text;

  phoneChoice = [phoneValue, phoneName];
  return phoneChoice;
}

function collectAccessoryData() {
  accessory = document.getElementById("accessory-select");
  accessoryValue = accessory.options[accessory.selectedIndex].value;
  accessoryName = accessory.options[accessory.selectedIndex].text;

  accessoryChoice = [accessoryValue, accessoryName];
  return accessoryChoice;
}

function collectBundleData() {
  bundleSize = document.getElementById("bundle-select");
  bundleSize = parseInt(bundleSize.options[bundleSize.selectedIndex].value);
  return bundleSize;
}



///
//// STEP 3

function customerInputsToNumbers() {
  customerBankAccount = parseInt(document.getElementById("bank-account").value);
  customerSpendLimit = parseInt(document.getElementById("spend-limit").value);
}

function overUnderForSummary() {
  summarySpendTag = document.getElementById('summary-spent');

  if(totalSpent < customerSpendLimit) {
    summarySpendTag.innerHTML = `
      <p>Great job! You are</p>
      <p class="under">UNDER</p>
      <p>your spend limit by $${(customerSpendLimit - totalSpent).toFixed(2)}!</p>
    `
  } else if(totalSpent === customerSpendLimit) {
    summarySpendTag.innerHTML = `Nice planning, you have spent all of the money you set aside.`;
  } else {
    summarySpendTag.innerHTML = `
      <p>Oh noes, you are</p>
      <p class="over">OVER</p>
      <p>your spend limit by $${(totalSpent - customerSpendLimit).toFixed(2)}!</p>
    `
  }
}

function dataPricesToNumbers() {
  PHONE_PRICE_FILL = parseInt(phoneChoice[0]);
  ACCESSORY_PRICE_FILL = parseInt(accessoryChoice[0]);
}

function combineDataForSummary() {
  const summaryPhoneTag = document.getElementById('summary-phone');
  const PHONE_PRICE_FILL = phoneChoice[0];
  const PHONE_NAME_FILL = phoneChoice[1];
  const summaryAccessoryTag = document.getElementById('summary-accessory');
  const ACCESSORY_PRICE_FILL = accessoryChoice[0];
  const ACCESSORY_NAME_FILL = accessoryChoice[1];
  const summarySizeTag = document.getElementById('summary-size');

  summaryPhoneTag.innerHTML = `
    <p class="bold">${PHONE_NAME_FILL}</p>
    <p> each: </p>
    <p class="bold">$${PHONE_PRICE_FILL}</p>
  `;
  summaryAccessoryTag.innerHTML = `
    <p class="bold">${ACCESSORY_NAME_FILL}</p>
    <p> each: </p>
    <p class="bold">$${ACCESSORY_PRICE_FILL}</p>
  `;
  summarySizeTag.innerHTML = `
    <p>Family member size: </p>
    <p class="bold">${bundleSize}</p>
  `;
}

function getTotalSpent() {
  dataPricesToNumbers();
  costPerBundle = PHONE_PRICE_FILL + ACCESSORY_PRICE_FILL + ((PHONE_PRICE_FILL + ACCESSORY_PRICE_FILL) * TAX);
  totalSpent = bundleSize * costPerBundle;

  return totalSpent;
}

function moneyTotalsForSummary() {
  getTotalSpent();
  customerInputsToNumbers();
  overUnderForSummary();

  document.getElementById('summary-total-spent').innerHTML = `
    <p class="bold"> Total Bundle Cost: $${totalSpent.toFixed(2)}</p>
  `;
  document.getElementById('summary-bank').innerHTML = `
    <p>You will have</p>
    <p class="bold">$${(customerBankAccount - totalSpent).toFixed(2)}</p>
    <p>remaining.</p>
  `;
}
