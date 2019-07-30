// TODO  put "current step" in state
const TAX = 0.08;
const state = {
  customerBankAccount: 0,
  customerSpendLimit: 0,
  phoneName: null,
  phonePrice: 0,
  accessoryName: null,
  accessoryPrice: 0,
  bundleSize: 0,
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
  } else {
    validateStep(stepNum) && toggleDisplaySteps(stepNum, (stepNum - 1));
  }
}

function validateStep(stepNum) {
  if (stepNum === 3) {
    if (state.customerBankAccount === 0 || state.customerSpendLimit === 0 ||
      isNaN(state.customerBankAccount) || isNaN(state.customerSpendLimit))
    {
      alert('Please fill out both inputs');
    } else {
      document.getElementById('top-bar').classList.add('active');
      return true;
    }
  }
  if (stepNum === 4) {
    if (state.phonePrice === 0 || state.accessoryPrice === 0 || state.bundleSize === 0) {
      alert('Please select one of each');
    } else {
      overUnderForSummary();
      return true;
    }
  }
}

function doneWithStepEl(stepNum) {
  return document.getElementById(`done-step${stepNum}`);
}

function toggleDisplaySteps(showStepNum, hideStepNum) {
  if (hideStepNum === 0) {
    document.getElementById(`step${showStepNum}`).classList.add('active');
  } else {
    document.getElementById(`step${showStepNum}`).classList.add('active');
    document.getElementById(`step${hideStepNum}`).classList.remove('active');
  }
}

function goToPreviousStep(currentStep) {
  toggleDisplaySteps((currentStep - 1), currentStep);
}

document.getElementById('bank-account').addEventListener('change', (e) => {
  state.customerBankAccount = parseInt(e.currentTarget.value, 10);
  document.getElementById('input-balance').innerHTML = state.customerBankAccount;

  showTotalSpentAndRemaining();
});

document.getElementById('spend-limit').addEventListener('change', (e) => {
  state.customerSpendLimit = parseInt(e.currentTarget.value, 10);
  document.getElementById('input-spend').innerHTML = state.customerSpendLimit;

  showTotalSpentAndRemaining();
});

document.getElementById('phone-select').addEventListener('change', (e) => {
  const phone = e.currentTarget;
  state.phonePrice = parseInt(phone.options[phone.selectedIndex].value, 10);
  state.phoneName = phone.options[phone.selectedIndex].text;

  document.getElementById('phone-name').innerHTML = state.phoneName;
  document.getElementById('phone-price').innerHTML = `$${state.phonePrice}`;

  showTotalSpentAndRemaining();
});

document.getElementById('accessory-select').addEventListener('change', (e) => {
  const accessory = e.currentTarget;
  state.accessoryPrice = parseInt(accessory.options[accessory.selectedIndex].value, 10);
  state.accessoryName = accessory.options[accessory.selectedIndex].text;

  document.getElementById('accessory-name').innerHTML = state.accessoryName;
  document.getElementById('accessory-price').innerHTML = `$${state.accessoryPrice}`;

  showTotalSpentAndRemaining();
});

document.getElementById('bundle-select').addEventListener('change', (e) => {
  const bundleSelectEl = e.currentTarget;
  state.bundleSize = parseInt(bundleSelectEl.options[bundleSelectEl.selectedIndex].value, 10);

  document.getElementById('bundle-size').innerHTML = state.bundleSize;

  const costPerBundle = state.phonePrice + state.accessoryPrice
    + ((state.phonePrice + state.accessoryPrice) * TAX);
  state.totalSpent = state.bundleSize * costPerBundle;

  showTotalSpentAndRemaining();
});

function showTotalSpentAndRemaining() {
  const costPerBundle = state.phonePrice + state.accessoryPrice
    + ((state.phonePrice + state.accessoryPrice) * TAX);
  state.totalSpent = state.bundleSize * costPerBundle;

  document.getElementById('summary-total-spent').innerHTML =
    `$${state.totalSpent.toFixed(2)}`;
  document.getElementById('summary-bank').innerHTML =
    `$${(state.customerBankAccount - state.totalSpent).toFixed(2)}`;
}

function overUnderForSummary() {
  const summaryUnderEl = document.getElementById('summary-spent-under');
  const summaryOverEl = document.getElementById('summary-spent-over');
  const summaryNumberEl = document.getElementById('summary-spent-number');

  if (state.totalSpent <= state.customerSpendLimit) {
    summaryOverEl.classList.remove('active');
    summaryUnderEl.classList.add('active');
    summaryNumberEl.innerHTML = (state.customerSpendLimit - state.totalSpent).toFixed(2);
  } else if (state.totalSpent > state.customerSpendLimit) {
    summaryUnderEl.classList.remove('active');
    summaryOverEl.classList.add('active');
    summaryNumberEl.innerHTML = (state.customerSpendLimit - state.totalSpent).toFixed(2);
  }
}

