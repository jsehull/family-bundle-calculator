// INDEX
// - Variables
// - Initialize
// - Navigation
// - Step 1
// - Step 2
// - Step 3


// *** each step gets its own display component for input and/or info ***
const step0 = document.getElementById('step0');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const TAX = 0.08;
const state = {
  customerBankAccount: 0,
  customerSpendLimit: 0,
  phoneChoice: '',
  accessoryChoice: '',
  bundleSize: '',
  totalSpent: 0,
  costPerBundle: 0,
  phonePriceFill: null,
  phoneNameFill: null,
  accessoryPriceFill: null,
  accessoryNameFill: null,
};

function toggleDisplaySteps(show, hide) {
  show.classList.add('active');
  hide.classList.remove('active');
}

function showStepZero() {
  toggleDisplaySteps(step0, step1);
}

function showStepOne() {
  toggleDisplaySteps(step1, step0);
}

// STEP 1

function getCustomerInitialInputs() {
  state.customerBankAccount = document.getElementById('bank-account').value;
  state.customerSpendLimit = document.getElementById('spend-limit').value;
}

function addCustomerInputsToTopBar() {
  document.getElementById('top-bar').innerHTML = `
    <p id='input-balance'>Estimated bank account:
      <span class='bold'>$${state.customerBankAccount}</span>
    </p>
    <p id='input-spend'>Desired spend limit:
      <span class='bold'>$${state.customerSpendLimit}</span>
    </p>
  `;
}

// STEP 2

function collectPhoneData() {
  const phone = document.getElementById('phone-select');
  const phoneValue = phone.options[phone.selectedIndex].value;
  const phoneName = phone.options[phone.selectedIndex].text;

  state.phoneChoice = [phoneValue, phoneName];
  return state.phoneChoice;
}

function collectAccessoryData() {
  const accessory = document.getElementById('accessory-select');
  const accessoryValue = accessory.options[accessory.selectedIndex].value;
  const accessoryName = accessory.options[accessory.selectedIndex].text;

  state.accessoryChoice = [accessoryValue, accessoryName];
  return state.accessoryChoice;
}

function collectBundleData() {
  const bundleSelectEl = document.getElementById('bundle-select');
  state.bundleSize = bundleSelectEl.options[bundleSelectEl.selectedIndex].value;

  return state.bundleSize;
}

// STEP 3

function customerInputsToNumbers() {
  state.customerBankAccount = parseInt(document.getElementById('bank-account').value, 10);
  state.customerSpendLimit = parseInt(document.getElementById('spend-limit').value, 10);
}

function overUnderForSummary() {
  const summarySpendTag = document.getElementById('summary-spent');

  if (state.totalSpent < state.customerSpendLimit) {
    summarySpendTag.innerHTML = `
      <p>Great job! You are</p>
      <p class='under'>UNDER</p>
      <p>your spend limit by $${(state.customerSpendLimit - state.totalSpent).toFixed(2)}!</p>
    `;
  } else if (state.totalSpent === state.customerSpendLimit) {
    // TODO - need to recheck since multiple refactors...
    summarySpendTag.innerHTML = 'Nice planning, you have spent all of the money you set aside.';
  } else {
    summarySpendTag.innerHTML = `
      <p>Oh noes, you are</p>
      <p class='over'>OVER</p>
      <p>your spend limit by $${(state.totalSpent - state.customerSpendLimit).toFixed(2)}!</p>
    `;
  }
}

function dataPricesToNumbers() {
  state.phonePriceFill = parseInt(state.phoneChoice[0], 10);
  state.accessoryPriceFill = parseInt(state.accessoryChoice[0], 10);
}

function combineDataForSummary() {
  const summaryPhoneTag = document.getElementById('summary-phone');
  [state.phonePriceFill, state.phoneNameFill] = [state.phoneChoice[0], state.phoneChoice[1]];
  // TODO array destructuring
  // state.phonePriceFill = state.phoneChoice[0];
  // state.phoneNameFill =  state.phoneChoice[1];
  const summaryAccessoryTag = document.getElementById('summary-accessory');
  [state.accessoryPriceFill, state.accessoryNameFill] = [state.accessoryChoice[0], state.accessoryChoice[1]];
  const summarySizeTag = document.getElementById('summary-size');

  summaryPhoneTag.innerHTML = `
    <p class='bold'>${state.phoneNameFill}</p>
    <p> each: </p>
    <p class='bold'>$${state.phonePriceFill}</p>
  `;
  summaryAccessoryTag.innerHTML = `
    <p class='bold'>${state.accessoryNameFill}</p>
    <p> each: </p>
    <p class='bold'>$${state.accessoryPriceFill}</p>
  `;
  summarySizeTag.innerHTML = `
    <p>Family member size: </p>
    <p class='bold'>${state.bundleSize}</p>
  `;
}

function getTotalSpent() {
  dataPricesToNumbers();
  state.costPerBundle = state.phonePriceFill + state.accessoryPriceFill
    + ((state.phonePriceFill + state.accessoryPriceFill) * TAX);
  state.totalSpent = state.bundleSize * state.costPerBundle;

  return state.totalSpent;
}

function moneyTotalsForSummary() {
  getTotalSpent();
  customerInputsToNumbers();
  overUnderForSummary();

  document.getElementById('summary-total-spent').innerHTML = `
    <p class='bold'> Total Bundle Cost: $${state.totalSpent.toFixed(2)}</p>
  `;
  document.getElementById('summary-bank').innerHTML = `
    <p>You will have</p>
    <p class='bold'>$${(state.customerBankAccount - state.totalSpent).toFixed(2)}</p>
    <p>remaining.</p>
  `;
}

function showStepTwo() {
  getCustomerInitialInputs();

  if (state.customerBankAccount === '' || state.customerSpendLimit === '') {
    alert('Please fill out both inputs');
  } else {
    addCustomerInputsToTopBar();
    toggleDisplaySteps(step2, step1);
  }
}

function showStepThree() {
  collectPhoneData();
  collectAccessoryData();
  collectBundleData();

  if (state.phoneChoice[0] === '' || state.accessoryChoice[0] === '' || state.bundleSize === '') {
    alert('Please select one of each');
  } else {
    combineDataForSummary();
    moneyTotalsForSummary();
    toggleDisplaySteps(step3, step2);
  }
}

function initialize() {
  document.getElementById('done-step0').onclick = () => { showStepOne(); };
  document.getElementById('done-step1').onclick = () => { showStepTwo(); };
  document.getElementById('done-step2').onclick = () => { showStepThree(); };

  document.getElementById('back-step2').onclick = () => { toggleDisplaySteps(step1, step2); };
  document.getElementById('back-step3').onclick = () => { toggleDisplaySteps(step2, step3); };

  showStepZero();
}

initialize();
