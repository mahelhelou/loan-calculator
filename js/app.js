/**
 * Features & UX
 * Show an error message when the user submit the form without numbers
 * Create an array for each error
    - Loop each error and create list item (li) for each error
 */

/*
 * Knowledge:
 * parseFloat(): Accept the string and convert it into a floating point number
 * ("2019") -> (2019)
 * parseFloat('2019') + 1 = 2020
 * isFinite(): The isFinite() Returns false if the value is +infinity, -infinity, or NaN, otherwise it returns true.
 */

// UIs elements
const loanForm = document.querySelector('#loan-form')
const results = document.querySelector('#results')
const resultsLoader = document.querySelector('#loader')

const amount = document.querySelector('#amount')
const interestRate = document.querySelector('#interest')
const years = document.querySelector('#years')

loadEventListeners()
function loadEventListeners() {
	loanForm.addEventListener('submit', showLoader)
}

/**
 * Show the loader for 2 seconds
 * After that, hide the loader and view the calculation result
 */
function showLoader(e) {
	e.preventDefault() // prevent from submit refresh

	if (amount.value && interestRate.value && years.value) {
		results.style.display = 'none'
		resultsLoader.style.display = 'block'
	} else {
		showError('Please fill the fields with numbers.')
	}

	setTimeout(calculationResult, 2000)
}

// Calculation result for monthly payment, total payment and total interest
function calculationResult() {
	const monthlyPayment = document.querySelector('#monthly-payment')
	const totalPayment = document.querySelector('#total-payment')
	const totalInterest = document.querySelector('#total-interest')

	const principal = parseFloat(amount.value)
	const calculatedInterest = parseFloat(interest.value) / 100 / 12
	const calculatedPayments = parseFloat(years.value) * 12

	// Compute monthly payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayments)
	const monthly = (principal * x * calculatedInterest) / (x - 1)

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2)
		totalPayment.value = (monthly * calculatedPayments).toFixed(2)
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2)

		results.style.display = 'block'
		resultsLoader.style.display = 'none'
	}
}

function showError(error) {
	const submitBtn = document.querySelector('.submit-btn')

	submitBtn.insertAdjacentHTML(
		'beforebegin',
		`
  <span class="alert alert-danger">${error}</span>
  `
	)

	// Hide error in 3 seconds
	setTimeout(() => document.querySelector('.alert').remove(), 3000)
}
