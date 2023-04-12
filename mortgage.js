// console.log("mortgage");

// Inputs / DOM Elements

const homeValue = document.getElementById("homeValue");
const downPayment = document.getElementById("downPayment");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanDuration = document.getElementById("loanDuration");

const form = document.getElementById("mortgage");

downPayment.addEventListener("keyup",()=>{
    loanAmount.value=homeValue.value - downPayment.value

    let loanAmountValue = loanAmount.value
    return loanAmountValue;
});

function calculateMortgage (loanAmount, interestRate, numberMonthlyPayments)
{
    function percentagetoDecimal(percent) {
        return percent / 12 / 100;
    }
    interestRate = percentagetoDecimal(interestRate);

    function yearsToMonths(year){
        return year * 12;
    }

    numberMonthlyPayments = yearsToMonths(numberMonthlyPayments);

    let mortgage = 
    (interestRate * loanAmount) /
    (1 - Math.pow(1 + interestRate,-numberMonthlyPayments));

    return parseFloat(mortgage.toFixed(2));
}

form.onsubmit = (e) => {
    e.preventDefault();
    validate();
    let loanAmount = homeValue.value - downPayment.value;

   let monthlyPayment = calculateMortgage(loanAmount, interestRate.value, loanDuration.value);

   document.getElementById("monthlyPayment").innerHTML= `$ ${monthlyPayment}`;
};

function validate() {
    if (
        homeValue.value === "" ||
        downPayment.value === "" ||
        interestRate.value === "" ||
        loanDuration.value === ""
        ) {
            // alert("complete all fields");

            let alert = document.createElement("div");
            alert.className = "btn red btn-large";
            alert.innerHTML = `<span>Complete all fields</span>`;
            alert.style.margin = ".5rem 35%";
            form.parentNode.insertBefore (alert, form);
            
            alert.onclick = () => alert.remove();

            setTimeout(() => alert.remove(), "3000");
        }
}