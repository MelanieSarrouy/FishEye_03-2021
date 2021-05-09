// DOM pour modale ______________________________________________
const main = document.getElementById('main2')
let body = document.querySelector('.bodyPhotographer')

const modalBg = document.querySelector('.modal-background')
const modal = document.querySelector('.modal')
const contact = document.querySelector('.button__contact')
const closeContact = document.querySelector('#closeModal')
const pErrorFirstName = document.getElementById('message-firstname') // creation du p error FirstName
const pErrorLastName = document.getElementById('message-lastname') // creation du p error LastName
const pErrorEmail = document.getElementById('message-email') // creation du p error Email
const pErrorMessage = document.getElementById('message-message') // creation du p error Message
const formData = document.getElementsByClassName('modal__form__formData') // Toutes les div formData avec input
const firstName = document.getElementById('firstname') // ajout input firstname dans le DOM
const lastName = document.getElementById('lastname') // ajout input lastname dans le DOM
const eMail = document.getElementById('email') // ajout input email dans le DOM
const message = document.getElementById('message')
const submit = document.getElementById('button')
formData[0].appendChild(pErrorFirstName)
formData[1].appendChild(pErrorLastName)
formData[2].appendChild(pErrorEmail)
formData[3].appendChild(pErrorMessage)

// Ouverture de la modale
contact.addEventListener('click', () => launchModal())

function launchModal() {
  modalBg.style.display = 'block'
  modalBg.setAttribute('aria-hidden', 'false')
  contact.style.display = 'none'
  main.setAttribute('aria-hidden', 'true')
  body.classList.add('no-scroll')
  firstName.focus()
  modal.setAttribute('tabindex', '0')
}

// Fermeture de la modale (souris et clavier)

closeContact.addEventListener('click', () => closeModal())
modal.addEventListener('keydown', (e) => onKey(e))

function onKey(e) {
  let keynum = e.key
  if (keynum == 'Escape') {
    closeModal()
  }
}

function closeModal() {
  modalBg.style.display = 'none'
  modalBg.setAttribute('aria-hidden', 'true')
  contact.style.display = 'block'
  main.setAttribute('aria-hidden', 'false')
  body.classList.remove('no-scroll')
  modal.setAttribute('tabindex', '-1')
  contact.focus()
  modal.removeEventListener('keydown', onKey)
}

// function testFirstName ______________________________________________
let regexName = /^[a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ]+([ \-'][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ][a-zA-ZéèêëîïÈÉÊËÎÏÀÁÂ]+)?$/

firstName.addEventListener('blur', testFirstName)

function testFirstName() {
  if ((firstName.value.length < 2) || 
     (firstName.value.length >= 30) ||
     (!regexName.test(firstName.value)) || 
     (firstName.value == '')) {
    firstName.classList.add('inputError') // attribution de la classe "inputError" à firstName(input)
    pErrorFirstName.classList.remove('sr-only')
    firstName.addEventListener('input', testFirstName)
    return false
  } else {
    firstName.classList.remove('inputError')
    pErrorFirstName.classList.add('sr-only')
    return true
  }
}
// function testLastName _______________________________________________
lastName.addEventListener('blur', testLastName)

function testLastName() {
  if ((lastName.value.length < 2) || 
     (lastName.value.length >= 30) ||
     (!regexName.test(lastName.value)) || 
     (lastName.value == '')) {
    lastName.classList.add('inputError') // attribution de la classe "inputError" à firstName(input)
    pErrorLastName.classList.remove('sr-only')
    lastName.addEventListener('input', testLastName)
    return false
  } else {
    lastName.classList.remove('inputError')
    pErrorLastName.classList.add('sr-only')
    return true
  }
}
// function testEmail __________________________________________________
let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eMail.addEventListener('blur', testEmail)

function testEmail() {
  if ((eMail.value.length < 5) || 
     (eMail.value.length >= 30) ||
     (!regexEmail.test(eMail.value)) || 
     (eMail.value == '')) {
    eMail.classList.add('inputError') // attribution de la classe "inputError" à firstName(input)
    pErrorEmail.classList.remove('sr-only')
    eMail.addEventListener('input', testEmail)
    return false
  } else {
    eMail.classList.remove('inputError')
    pErrorEmail.classList.add('sr-only')
    return true
  }
}
// function testMessage __________________________________________________
message.addEventListener('blur', testMessage)
let regexMessage = /[a-z]/
function testMessage() {
  if (((message.value) == '') ||
      (!regexMessage.test(message.value))) {
    message.classList.add('inputError') // attribution de la classe "inputError" à firstName(input)
    pErrorMessage.classList.remove('sr-only')
    message.addEventListener('input', testMessage)
    
    return false
  } else {
    message.classList.remove('inputError')
    pErrorMessage.classList.add('sr-only')
    return true
  }
}
// function submit __________________________________________________

submit.addEventListener('click', (event) => {
  validate(event)
})

function validate(event) {
  event.preventDefault()
  if ((testFirstName() === true) && 
      (testLastName() === true) && 
      (testEmail() === true) && 
      (testMessage() === true)) {
    console.log('Prénom : ' + firstName.value)
    console.log('Nom : ' + lastName.value)
    console.log('email : ' + eMail.value)
    console.log('message : ' + message.value)
    closeModal()
    return false
  } else {
    testFirstName()
    testLastName()
    testEmail()
    testMessage()
  }
}

//____________________________________________________________________________________________
export { launchModal }
