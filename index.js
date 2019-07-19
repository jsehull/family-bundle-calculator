const TAX = 0.08;
const state = {
  customerBankAccount: 0,
  customerSpendLimit: 0,
  phoneName: '',
  phonePrice: '',
  accessoryName: '',
  accessoryPrice: '',
  bundleSize: '',
  totalSpent: 0,
};

initialize();

function initialize() {
  doneWithStepEl(1).onclick = () => { goToStep(2); };
  doneWithStepEl(2).onclick = () => { goToStep(3); };
  doneWithStepEl(3).onclick = () => { goToStep(4); };

  document.getElementById('back-step3').onclick = () => { goToPreviousStep(3); };
  document.getElementById('back-step4').onclick = () => { goToPreviousStep(4); };

  goToStep(1);
}

function goToStep(stepNum) {
  if (stepNum === 1 || stepNum === 2) {
    toggleDisplaySteps(stepNum, (stepNum - 1));
  } else if (stepNum === 3) {
    if (state.customerBankAccount === '' || state.customerSpendLimit === '') {
      alert('Please fill out both inputs');
    } else {
      // TODO - dated - will live input
      addCustomerInputsToTopBar();
      toggleDisplaySteps(stepNum, (stepNum - 1));
    }
  } else if (stepNum === 4) {
    if (state.phonePrice === '' || state.accessoryPrice === '' || state.bundleSize === '') {
      // TODO - if '' or NaN (has issue if changed back to default ')')
      alert('Please select one of each');
    } else {
      showDataForSummary();
      showTotalsForSummary();
      toggleDisplaySteps(stepNum, (stepNum - 1));
    }
  }
}

function doneWithStepEl(stepNum) {
  return document.getElementById(`done-step${stepNum}`);
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

document.getElementById('bank-account').addEventListener('change', (e) => {
  state.customerBankAccount = parseInt(e.currentTarget.value, 10);
});

document.getElementById('spend-limit').addEventListener('change', (e) => {
  state.customerSpendLimit = parseInt(e.currentTarget.value, 10);
});

document.getElementById('phone-select').addEventListener('change', (e) => {
  const phone = e.currentTarget;
  state.phonePrice = parseInt(phone.options[phone.selectedIndex].value, 10);
  state.phoneName = phone.options[phone.selectedIndex].text;
});

document.getElementById('accessory-select').addEventListener('change', (e) => {
  const accessory = e.currentTarget;
  state.accessoryPrice = parseInt(accessory.options[accessory.selectedIndex].value, 10);
  state.accessoryName = accessory.options[accessory.selectedIndex].text;
});

document.getElementById('bundle-select').addEventListener('change', (e) => {
  const bundleSelectEl = e.currentTarget;
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

function showDataForSummary() {
  const summaryPhoneTag = document.getElementById('summary-phone');
  const summaryAccessoryTag = document.getElementById('summary-accessory');
  const summarySizeTag = document.getElementById('summary-size');

  summaryPhoneTag.innerHTML = `
    <p class='bold'>${state.phoneName}</p>
    <p> each: </p>
    <p class='bold'>$${state.phonePrice}</p>
  `;
  summaryAccessoryTag.innerHTML = `
    <p class='bold'>${state.accessoryName}</p>
    <p> each: </p>
    <p class='bold'>$${state.accessoryPrice}</p>
  `;
  summarySizeTag.innerHTML = `
    <p>Family member size: </p>
    <p class='bold'>${state.bundleSize}</p>
  `;
}

function getTotalSpent() {
  const costPerBundle = state.phonePrice + state.accessoryPrice
    + ((state.phonePrice + state.accessoryPrice) * TAX);
  state.totalSpent = state.bundleSize * costPerBundle;
}

function showTotalsForSummary() {
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
