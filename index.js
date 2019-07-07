// TODO list
 // 1. TODO - fix costPerBundle calculation
 // 2. create function for changing steps (active classes?)
 // 5. add css for warnings instead of alerts
 // 6. template literal for top bar?
  // - iso numbers for caluclation on step 3



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

function addCustomerInputsToTop() {
  document.getElementById('input-balance').style.display = "block";
  document.getElementById('input-balance').innerHTML = "Estimated bank account: $" + customerBankAccount;
  document.getElementById('input-spend').style.display = "block";
  document.getElementById('input-spend').innerHTML = "Desired spend limit: $" + customerSpendLimit;
}

document.getElementById('done-step1').onclick = () => {
  customerBankAccount = document.getElementById("bank-account").value;
  customerSpendLimit = document.getElementById("spend-limit").value;

  if(customerBankAccount === "" || customerSpendLimit === "") {
     alert('Please fill out both inputs');
     return;
  } else {
    addCustomerInputsToTop();
    toggleDisplaySteps(step1, step2);

    document.getElementById("bank-account").value = ""; // resets Planning step inputs
    document.getElementById("spend-limit").value = "";
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
  bundleSize= bundleSize.options[bundleSize.selectedIndex].value;

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
  costPerBundle = phoneChoice[0] + accessoryChoice[0] + ((phoneChoice[0] + accessoryChoice[0]) * tax);
  // *** ERROR - not getting costPerBundle accurately
    // likely string related + floating number
  totalSpent = bundleSize * costPerBundle;
  totalSpent = totalSpent.toFixed(2);

  return totalSpent;
}

// TODO - innerHTML for STEP 3  #summary-spend and #summary-bank
function moneyTotalsForSummary() {
    updatedSpendInput = document.getElementById('input-spend').innerHTML;
    const summarySpendTag = document.getElementById('summary-spend');

    // if(money spent is > budget) {
    //   "you spent X dollars more than planned, try again to proceed"
    // } else {
    //   " you planned well! you have X dollars left over!"
    // }
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
    moneyTotalsForSummary(); // TODO - considering approach
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