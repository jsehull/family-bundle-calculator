const TAX = 0.08;
const state = {
  customerBankAccount: 0,
  customerSpendLimit: 0,
  phoneChoice: '',
  accessoryChoice: '',
  bundleSize: '',
  costPerBundle: 0,
  totalSpent: 0,
  phonePriceFill: null,
  phoneNameFill: null,
  accessoryPriceFill: null,
  accessoryNameFill: null,
};

initialize();

// function doneWithStepEl(stepNum) {
//   document.getElementById(`done-step${stepNum}`);
// }

function initialize() {
  // TODO - undefined, will need alternative setup
  // doneWithStepEl(1).onclick = () => { showStep(2); };
  document.getElementById('done-step1').onclick = () => { showStep(2); };
  document.getElementById('done-step2').onclick = () => { showStep(3); };
  document.getElementById('done-step3').onclick = () => { showStep(4); };

  document.getElementById('back-step3').onclick = () => { goToPreviousStep(3); };
  document.getElementById('back-step4').onclick = () => { goToPreviousStep(4); };

  showStep(1);
}

function showStep(stepNum) {
  if (stepNum === 1 || stepNum === 2) {
    toggleDisplaySteps(stepNum, (stepNum - 1));
  } else if (stepNum === 3) {
    getCustomerInitialInputs();

    if (state.customerBankAccount === '' || state.customerSpendLimit === '') {
      alert('Please fill out both inputs');
    } else {
      addCustomerInputsToTopBar();
      toggleDisplaySteps(stepNum, (stepNum - 1));
    }
  } else if (stepNum === 4) {
    // TODO - set state to collect data
    collectPhoneData();
    collectAccessoryData();
    collectBundleData();

    if (state.phoneChoice[0] === '' || state.accessoryChoice[0] === '' || state.bundleSize === '') {
      alert('Please select one of each');
    } else {
      combineDataForSummary();
      moneyTotalsForSummary();
      toggleDisplaySteps(stepNum, (stepNum - 1));
    }
  }
}

function toggleDisplaySteps(showStepNum, hideStepNum) {
  if (hideStepNum === 0) {
    document.getElementById(`step${showStepNum}`).classList.add('active');

    return;
  }
  document.getElementById(`step${showStepNum}`).classList.add('active');
  document.getElementById(`step${hideStepNum}`).classList.remove('active');
}

function goToPreviousStep(currentStep) {
  toggleDisplaySteps((currentStep - 1), currentStep);
}

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
    // TODO - need to recheck validation since multiple refactors...
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
  state.phonePriceFill = state.phoneChoice[0];
  state.phoneNameFill = state.phoneChoice[1];
  const summaryAccessoryTag = document.getElementById('summary-accessory');
  state.accessoryPriceFill = state.accessoryChoice[0];
  state.accessoryNameFill = state.accessoryChoice[1];
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
