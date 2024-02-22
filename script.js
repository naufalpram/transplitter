// selectors
const bill = document.getElementById('bill');
const numOfPeople = document.getElementById('number_people');
const errorBill = document.getElementById('errbill');
const errorPeople = document.getElementById('errnum');
const submitBtn = document.querySelector('.btn-calculate');
const resetBtn = document.querySelector('.btn-reset');
const tipAmount = document.getElementById('tip-amount');
const totalPay = document.getElementById('total-pay');
const allTips = document.querySelectorAll('.tip-percent');
const allCustom = document.querySelectorAll('.b_input.custom-percent');

let selectedPercentage;

function resetCustomPercent() {
    allCustom.forEach(percent => {
        percent.value = '';
    });
}

// configure all selected percentage click event
allTips.forEach(percent => {
    percent.addEventListener('click', (e) => {
        selectedPercentage = e.target.value
        resetCustomPercent();
    });
});

// configure all custom percentage click event
allCustom.forEach(percent => {
    percent.addEventListener('input', (e) => selectedPercentage = e.target.value / 100)
});

// reset button actions
resetBtn.addEventListener('click', resetForm);
function resetForm(e) {
    if (e.target.className === 'btn-reset') {
        e.preventDefault();
        bill.value = '';
        numOfPeople.value = '';
        errorBill.innerHTML = '';
        errorPeople.innerHTML = '';
        bill.style.borderColor = 'hsl(0, 0%, 86%)';
        numOfPeople.style.borderColor = 'hsl(0, 0%, 86%)';
        selectedPercentage = undefined;
        tipAmount.innerHTML = 'Rp.0';
        totalPay.innerHTML = 'Rp.0';
        resetCustomPercent();
    }
}

// calculate button actions

submitBtn.addEventListener('click', () => {
    const billValue = parseInt(bill.value);
    const numOfPeopleValue = parseInt(numOfPeople.value);
    bill.style.borderColor = 'hsl(0, 0%, 86%)';
    numOfPeople.style.borderColor = 'hsl(0, 0%, 86%)';
    
    errorBill.innerHTML = '';
    errorPeople.innerHTML = '';
    
    const isValidated = validateInputs(billValue, numOfPeopleValue);
    
    if (isValidated) {
        if (selectedPercentage === undefined) {
            tipAmount.innerHTML = "Persen Tip Belum Diisi";
            totalPay.innerHTML = "Persen Tip Belum Diisi";
        } else if (selectedPercentage < 0) {
            tipAmount.innerHTML = "Persen Tip Harus >= 0";
            totalPay.innerHTML = "Persen Tip Harus >= 0";
        } else {
            const tip = (billValue * parseFloat(selectedPercentage)) / numOfPeopleValue;
            const pay = parseFloat(billValue / numOfPeopleValue) + parseFloat(tip) ;
            tipAmount.innerHTML = 'Rp.' + tip.toFixed(2);
            totalPay.innerHTML = 'Rp.' + pay.toFixed(2);
        }
    }
});
function validateInputs(billValue, numOfPeopleValue) {
    let validated = true;
    if (billValue === '' || isNaN(billValue) || billValue <= 0) {
        errorBill.innerHTML = 'Enter Valid Number (> 0)';
        errorBill.style.color = 'crimson';
        bill.style.borderColor = 'crimson';
        validated = false;
    }
    if (numOfPeopleValue === '' || isNaN(numOfPeopleValue) || numOfPeopleValue <= 0) {
        errorPeople.innerHTML = 'Enter Valid Number (> 0)';
        errorPeople.style.color = 'crimson';
        numOfPeople.style.borderColor = 'crimson';
        validated = false;
    }
    return validated;
}