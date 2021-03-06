const TAX = 0.08;
const state = {
  stepNumber: 0,
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
  goNextStep();

  let count = 1;
  while (count <= 4) {
    nextButtonEl(count).onclick = () => { goNextStep(); };
    count += 1;
  }

  backButtonEl(3).onclick = () => { goToPreviousStep(); };
  backButtonEl(4).onclick = () => { goToPreviousStep(); };
}

function goNextStep() {
  if (state.stepNumber <= 1) {
    toggleDisplaySteps();
  } else {
    validateStep() && toggleDisplaySteps();
  }
}

function validateStep() {
  if (state.stepNumber === 2) {
    if (!state.customerBankAccount || !state.customerSpendLimit) {
      checkStepTwoErrors();
    } else {
      removeStepTwoErrors();
      document.getElementById('top-bar').classList.add('active');

      return true;
    }
  }
  if (state.stepNumber === 3) {
    if (!state.phonePrice || !state.accessoryPrice || !state.bundleSize) {
      checkStepThreeErrors();
    } else {
      removeStepThreeErrors();
      overUnderForSummary();

      return true;
    }
  }
}

function checkStepTwoErrors() {
  if (!state.customerBankAccount) {
    document.getElementById('bank-box').classList.add('error');
  } else if (state.customerBankAccount >= 1) {
    document.getElementById('bank-box').classList.remove('error');
  }
  if (!state.customerSpendLimit) {
    document.getElementById('spend-box').classList.add('error');
  } else if (state.customerSpendLimit >= 1) {
    document.getElementById('spend-box').classList.remove('error');
  }
}

function removeStepTwoErrors() {
  document.getElementById('bank-box').classList.remove('error');
  document.getElementById('spend-box').classList.remove('error');
}

function checkStepThreeErrors() {
  if (state.phonePrice === 0) {
    document.getElementById('phone-box').classList.add('error');
  } else if (state.phonePrice >= 1) {
    document.getElementById('phone-box').classList.remove('error');
  }
  if (state.accessoryPrice === 0) {
    document.getElementById('accessory-box').classList.add('error');
  } else if (state.accessoryPrice >= 1) {
    document.getElementById('accessory-box').classList.remove('error');
  }
  if (state.bundleSize === 0) {
    document.getElementById('bundle-box').classList.add('error');
  } else if (state.bundleSize >= 2) {
    document.getElementById('bundle-box').classList.remove('error');
  }
}

function removeStepThreeErrors() {
  document.getElementById('phone-box').classList.remove('error');
  document.getElementById('accessory-box').classList.remove('error');
  document.getElementById('bundle-box').classList.remove('error');
}


function nextButtonEl(stepNum) {
  return document.getElementById(`done-step${stepNum}`);
}

function backButtonEl(stepNum) {
  return document.getElementById(`back-step${stepNum}`);
}

function toggleDisplaySteps() {
  state.stepNumber += 1;
  document.getElementById(`step${state.stepNumber}`).classList.add('active');

  if (state.stepNumber >= 2) {
    const lastStep = state.stepNumber - 1;
    document.getElementById(`step${state.stepNumber}`).classList.add('active');
    document.getElementById(`step${lastStep}`).classList.remove('active');
  }
}

function goToPreviousStep() {
  const currentStep = state.stepNumber;
  state.stepNumber = currentStep - 1;

  document.getElementById(`step${currentStep}`).classList.remove('active');
  document.getElementById(`step${state.stepNumber}`).classList.add('active');
}

document.getElementById('bank-account').addEventListener('change', (e) => {
  state.customerBankAccount = parseInt(e.currentTarget.value, 10);

  if (!state.customerBankAccount) {
    document.getElementById('input-balance').innerHTML = '';
  } else {
    document.getElementById('input-balance').innerHTML = state.customerBankAccount;
  }

  showTotalSpentAndRemaining();
});

document.getElementById('spend-limit').addEventListener('change', (e) => {
  state.customerSpendLimit = parseInt(e.currentTarget.value, 10);

  if (!state.customerBankAccount) {
    document.getElementById('input-spend').innerHTML = '';
  } else {
    document.getElementById('input-spend').innerHTML = state.customerSpendLimit;
  }

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
