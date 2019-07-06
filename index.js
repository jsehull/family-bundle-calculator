// TODO list
 // 1. TODO - fix costPerBundle calculation
 // 2. create function for changing steps (active classes)?
 // 5. add css for warnings instead of alerts


///
//// STEP 1

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

let customerBankAccount = 0;
let customerSpendLimit = 0;

function toggleShowSteps(hide, show) {
  hide.style.display = "none";
  show.style.display = "block";
}

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
    toggleShowSteps(step1, step2);

    // reset form inputs
    document.getElementById("bank-account").value = "";
    document.getElementById("spend-limit").value = "";
  }
}



///
//// STEP 2

// TODO change phone/accessory to empty array?
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

function moneyTotalsForSummary() {

}


// ******* ERROR with this function
  // not getting costPerBundle accurately
function bundlesPlusTax() {
  // selection data is accurate
  console.log(phoneChoice[0] + "," + phoneChoice[1] + "," + bundleSize )

  costPerBundle = phoneChoice[0] + accessoryChoice[0] + ((phoneChoice[0] + accessoryChoice[0]) * tax);
  console.log('ERROR - costPerBundle -> ' + costPerBundle);


  totalSpent = bundleSize * costPerBundle;

  totalSpent = totalSpent.toFixed(2);
  // both console logs are messed up numbers, string related?
  console.log('WITH fixed -> ' + totalSpent);


  return totalSpent;
}

document.getElementById('done-step2').onclick = () => {
  console.log('click step2');

  collectPhoneData();
  collectAccessoryData();
  collectBundleData();

  if(phoneChoice === "" || accessoryChoice === "" || bundleSize === "") {
    alert('Please select one of each');
    return;
  } else {
    combineDataForSummary();

  // ERROR **************************************************************
    // costPerBundle math incorrect, because string and not number, or floating #??
    // ******************************************
    bundlesPlusTax();
  }
  toggleShowSteps(step2, step3);
}

document.getElementById('back-step2').onclick = () => {
  toggleShowSteps(step2, step1);
}



///
//// STEP 3

document.getElementById('back-step3').onclick = () => {
  toggleShowSteps(step3, step2);
}

/* function remainingBankBalance() {
  let finalSpentAndBundles = "I purchased " +  numBundles + " phone bundles for $" + totalSpent.toFixed(2) + ".";
  let finalBankAccount = "I have $" + (customerBankAccount-totalSpent).toFixed(2) + " remaining in my bank account.";
  // let finalSummary = [finalSpentAndBundles, finalBankAccount];
  // alert(finalSpentAndBundles, finalBankAccount);

  // return finalSummary;
}
// remainingBankBalance(); */
