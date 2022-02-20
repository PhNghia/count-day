window.onload = init

function init () {
    const form = document.querySelector('form')
    form.onsubmit = (e) => {
        e.preventDefault()
        const inputValues = getValueFromUser()
        const newValueTypeDate = convertToDate(inputValues)
        const date = evaluateDate(newValueTypeDate)
        renderDateInBrowser(date)
        noneHiddenFormButton(date)
    }
}

function getValueFromUser () {
    const labels = document.querySelectorAll('label')
    const inputs = document.querySelectorAll('input')
    let isValid = true
    let valueStore = []
    inputs.forEach((input, index) => {
        if (input.value == '') {
            isValid = false
            alert(`Please enter a value in ${labels[index].innerText}`)
            return
        }
    })
    if (isValid) {
        inputs.forEach(input => {
            valueStore.push(input.value)
        })
        clearInput(inputs)
        return valueStore
    }
}

function clearInput (inputs) {
    inputs.forEach(input => input.value = '')
    inputs[0].focus()
}

function convertToDate (values) {
    let store = []
    values.forEach(value => store.push(new Date(value)))
    return store
}

function evaluateDate (values, status = 'default') {
    const time = values[1].getTime() - values[0].getTime()
    const days = time / (24 * 60 * 60 * 1000)
    if (status == 'default') {
        return days > 1 ? `${days} days` : `${days} day`
    }
}

function renderDateInBrowser (date) {
    const message = document.querySelector('.message')
    message.innerText = date
}

function noneHiddenFormButton (date) {
    const formBtn = document.querySelector('.form-button')
    formBtn.style.visibility = 'visible'
    formBtn.onclick = (e) => {
        if (e.target.matches('button')) 
            changeTypeDateInBrowser(e.target, date)
    }
}

function changeTypeDateInBrowser (button, date) {
    const message = document.querySelector('.message')
    const days = Number(date.split(' ')[0])
    if (button.innerText == 'years') renderDateTypeOfYear(days, message)
    if (button.innerText == 'months') renderDateTypeOfMonth(days, message)
    if (button.innerText == 'days') renderDateTypeOfDay(days, message)
}

function renderDateTypeOfYear (days, message) {
    let years = Math.floor((days / 365))
    let monthsAlso = Math.floor(((days - years * 365) / 30))
    let daysAlso = days - (years * 365 + monthsAlso * 30)
    message.innerText = 
        `${years} ${years > 1 ? `years` : `year`}, ` + 
        `${monthsAlso} ${monthsAlso > 1 ? `months` : `month`} and ` + 
        `${daysAlso} ${daysAlso > 1 ? `days` : `day`}`
}

function renderDateTypeOfMonth (days, message) {
    let months = Math.floor(days / 30)
    let daysAlso = days - months * 30
    message.innerText = 
        `${months} ${months > 1 ? `months` : `month`} and ` + 
        `${daysAlso} ${daysAlso > 1 ? `days` : `day`}`
}

function renderDateTypeOfDay (days, message) {
    message.innerText = `${days} ${days > 1 ? `days` : `day`}`
}