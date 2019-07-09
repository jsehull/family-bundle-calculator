// TODO list
 // 2. create function for changing steps (active classes?)
 // 5. add css for warnings instead of alerts



const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

function toggleDisplaySteps(hide, show) {
  hide.style.display = "none";
  show.style.display = "block";
}



///
//// STEP 1

let customerBankAccount = 0;
let customerSpendLimit = 0;

function addCustomerInputsToTopBar() {
  document.getElementById('top-bar').innerHTML = `
    <p id="input-balance">Estimated bank account: $${customerBankAccount}</p>
    <p id="input-spend">Desired spend limit: $${customerSpendLimit}</p>`;
}

document.getElementById('done-step1').onclick = () => {
  customerBankAccount = document.getElementById("bank-account").value;
  customerSpendLimit = document.getElementById("spend-limit").value;

  if(customerBankAccount == "" || customerSpendLimit == "") {
     alert('Please fill out both inputs');
     return;
  } else {
    addCustomerInputsToTopBar();
    toggleDisplaySteps(step1, step2);
  }
}



///
//// STEP 2

let phoneChoice = "";
let accessoryChoice = "";
let bundleSize = "";
const tax = 0.08;
let totalSpent = 0;
let costPerBundle = 0;

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

function combineDataForSummary() {
  const summaryPhoneTag = document.getElementById('summary-phone');
  let phonePriceFill = phoneChoice[0];
  let phoneNameFill = phoneChoice[1];
  const summaryAccessoryTag = document.getElementById('summary-accessory');
  let accessoryPriceFill = accessoryChoice[0];
  let accessoryNameFill = accessoryChoice[1];
  const summarySizeTag = document.getElementById('summary-size');


  summaryPhoneTag.innerHTML =  phoneNameFill + " each:  $" + phonePriceFill;
  summaryAccessoryTag.innerHTML = accessoryNameFill + " each: $" + accessoryPriceFill;
  summarySizeTag.innerHTML = "Family bundle size: " + bundleSize;
}

function getTotalSpent() {
  dataPricesToNumbers();
  costPerBundle = phonePriceFill + accessoryPriceFill + ((phonePriceFill + accessoryPriceFill) * tax);
  totalSpent = bundleSize * costPerBundle;

  return totalSpent;
}

function moneyTotalsForSummary() {
    getTotalSpent();
    customerInputsToNumbers();
    overUnderForSummary();

    document.getElementById('summary-total-spent').innerHTML = `Total bundle cost: $${totalSpent.toFixed(2)}`;
    document.getElementById('summary-bank').innerHTML = `You will have $${(customerBankAccount - totalSpent).toFixed(2)} remaining in your account.`;
}

document.getElementById('done-step2').onclick = () => {
  collectPhoneData();
  collectAccessoryData();
  collectBundleData();

  if(phoneChoice === "" || accessoryChoice === "" || bundleSize === "") {
    alert('Please select one of each');
    return;
  } else {
    combineDataForSummary();
    moneyTotalsForSummary();
  }
  toggleDisplaySteps(step2, step3);
}

document.getElementById('back-step2').onclick = () => {
  toggleDisplaySteps(step2, step1);
}



///
//// STEP 3

document.getElementById('back-step3').onclick = () => {
  toggleDisplaySteps(step3, step2);
}

function overUnderForSummary() {
  summarySpendTag = document.getElementById('summary-spent');

  if(totalSpent < customerSpendLimit) {
    summarySpendTag.innerHTML = `Great job! You are UNDER your spend limit by $${(customerSpendLimit - totalSpent).toFixed(2)}!`;
  } else if(totalSpent === customerSpendLimit) {
    summarySpendTag.innerHTML = `Nice planning, you have spent all of the money you set aside.`;
  } else {
    summarySpendTag.innerHTML = `Oh noes, you are OVER the spend limit by $${(totalSpent - customerSpendLimit).toFixed(2)}!`;
  }
}

function dataPricesToNumbers() {
  phonePriceFill = parseInt(phoneChoice[0]);
  accessoryPriceFill = parseInt(accessoryChoice[0]);
}

function customerInputsToNumbers() {
  customerBankAccount = parseInt(document.getElementById("bank-account").value);
  customerSpendLimit = parseInt(document.getElementById("spend-limit").value);
}
