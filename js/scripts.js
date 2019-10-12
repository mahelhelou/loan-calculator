/*
  # Knowledge:
  * parseFloat(): The parseFloat() is an inbuilt function in JavaScript which is used to accept the string and convert it into a floating point number.
  * ("2019") -> (2019)
  * parseFloat('2019') + 1 = 2020
  * isFinite(): The isFinite() function returns false if the value is +infinity, -infinity, or NaN, otherwise it returns true.
*/

document.querySelector('#loan-form').addEventListener('submit', e => {
    document.querySelector('#results').style.display = 'none'
    document.querySelector('#loading').style.display = 'block'

    setTimeout(calculationResult, 2000)
    
    e.preventDefault()
})

let calculationResult = () => {
    // console.log('Calculating...')

    // UI VARS
    // Inputs
    const amount = document.querySelector('#amount')
    const interest = document.querySelector('#interest')
    const years = document.querySelector('#years')
    
    const monthlyPayment = document.querySelector('#monthly-payment')
    const totalPayment = document.querySelector('#total-payment')
    const totalInterest = document.querySelector('#total-interest')

    const principal = parseFloat(amount.value)
    // monthly interest, number payments per year
    const calculatedInterest = parseFloat(interest.value) / 100 / 12
    const calculatedPayments = parseFloat(years.value) * 12

    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x - 1)

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
    
        document.querySelector('#results').style.display = 'block'
        document.querySelector('#loading').style.display = 'none'
    
    } else {
        showError('Please fill al fields with numbers.')
    }
}

function showError(error){
    document.querySelector('#results').style.display = 'none'
    document.querySelector('#loading').style.display = 'none'
  
    // Create a div for error
    const errorDiv = document.createElement('div')
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')
  
    errorDiv.className = 'alert alert-danger'
    errorDiv.appendChild(document.createTextNode(error))
  
    // View error
    card.insertBefore(errorDiv, heading)
  
    // Hide error
    setTimeout(clearError, 3000)
}
  
function clearError(){
    document.querySelector('.alert').remove()
}