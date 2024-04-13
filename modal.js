const buttonToggle = document.querySelector('.button-rules');
const modal = document.querySelector('.modal-inactive');
console.log(buttonToggle, modal);
buttonToggle.addEventListener('click', () => {
  console.log('click');
  console.log(modal.className)
  if (modal.className === 'modal-active') {
    modal.classList.remove('modal-active');
    modal.classList.add('modal-inactive');
  } else {
    modal.classList.remove('modal-inactive');
    modal.classList.add('modal-active');
  }
});
