const TAX = 0.08;
const state = {
  customerBankAccount: 0,
  customerSpendLimit: 0,
  phoneChoice: '',
  accessoryChoice: '',
  bundleSize: '',
  totalSpent: 0,
};

initialize();

function initialize() {
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
    if (state.customerBankAccount === '' || state.customerSpendLimit === '') {
      // TODO - if '' or NaN (has issue if selected then changed back to default = NaN ')')
      alert('Please fill out both inputs');
    } else {
      addCustomerInputsToTopBar();
      toggleDisplaySteps(stepNum, (stepNum - 1));
    }
  } else if (stepNum === 4) {
    if (state.phoneChoice[0] === '' || state.accessoryChoice[0] === '' || state.bundleSize === '') {
      // TODO - if '' or NaN (has issue if selected then changed back to default = NaN ')')
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
// TODO  where to store event listeners?
document.getElementById('bank-account').addEventListener('change', () => {
  state.customerBankAccount = parseInt(document.getElementById('bank-account').value, 10);
});

document.getElementById('spend-limit').addEventListener('change', () => {
  state.customerSpendLimit = parseInt(document.getElementById('spend-limit').value, 10);
});

// TODO - group grab elements?
document.getElementById('phone-select').addEventListener('change', () => {
  const phone = document.getElementById('phone-select');
  const phoneValue = parseInt(phone.options[phone.selectedIndex].value, 10);
  const phoneName = phone.options[phone.selectedIndex].text;

  state.phoneChoice = [phoneValue, phoneName];
});

document.getElementById('accessory-select').addEventListener('change', () => {
  const accessory = document.getElementById('accessory-select');
  const accessoryValue = parseInt(accessory.options[accessory.selectedIndex].value, 10);
  const accessoryName = accessory.options[accessory.selectedIndex].text;

  state.accessoryChoice = [accessoryValue, accessoryName];
});

document.getElementById('bundle-select').addEventListener('change', () => {
  const bundleSelectEl = document.getElementById('bundle-select');
  state.bundleSize = parseInt(bundleSelectEl.options[bundleSelectEl.selectedIndex].value, 10);
});

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

function combineDataForSummary() {
  const summaryPhoneTag = document.getElementById('summary-phone');
  const summaryAccessoryTag = document.getElementById('summary-accessory');
  const summarySizeTag = document.getElementById('summary-size');

  summaryPhoneTag.innerHTML = `
    <p class='bold'>${state.phoneChoice[1]}</p>
    <p> each: </p>
    <p class='bold'>$${state.phoneChoice[0]}</p>
  `;
  summaryAccessoryTag.innerHTML = `
    <p class='bold'>${state.accessoryChoice[1]}</p>
    <p> each: </p>
    <p class='bold'>$${state.accessoryChoice[0]}</p>
  `;
  summarySizeTag.innerHTML = `
    <p>Family member size: </p>
    <p class='bold'>${state.bundleSize}</p>
  `;
}

function getTotalSpent() {
  // TODO - worth creating variables for function legibility?
  const costPerBundle = state.phoneChoice[0] + state.accessoryChoice[0]
    + ((state.phoneChoice[0] + state.accessoryChoice[0]) * TAX);
  state.totalSpent = state.bundleSize * costPerBundle;
}

function moneyTotalsForSummary() {
  getTotalSpent();
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
