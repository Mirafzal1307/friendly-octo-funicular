const optionMenu = document.querySelector('.dropdown-menu'),
  selectBtn = optionMenu.querySelector('.dropdown-btn'),
  options = optionMenu.querySelectorAll('.dropdown-option'),
  sBtnText = optionMenu.querySelector('.dBtn-text')

selectBtn.addEventListener('click', () => {
  console.log('Select button clicked')
  optionMenu.classList.toggle('active')
})
options.forEach((option) => {
  option.addEventListener('click', () => {
    let selectedOption = option.querySelector('.option-text').innerText
    console.log(selectedOption);
    sBtnText.innerText = selectedOption
    optionMenu.classList.toggle('active')
  })
})



