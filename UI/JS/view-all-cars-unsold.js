// Get the modal
const modal = document.getElementById('unsoldCarModalAdmin');

// Get the button class that opens the modal
const buttons = document.getElementsByClassName('adminViewMore');


// determines the particular button that opens the modal by iterating
// through the Array-like object returned by the css class selector.
Array.from(buttons).forEach((btn) => {
  btn.addEventListener('click',
    () => {
      modal.style.display = 'block';
    });
});

// Get the <span> element that closes the modal
const closeModalBtn = document.getElementById('closeModal');


// When the user clicks on <span> (x), close the modal
closeModalBtn.onclick = () => {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'block';
  }
};

// when user clicks the update ad button
const updateAdBtn = document.getElementById('updateAdBtn');

updateAdBtn.onclick = (e) => {
  e.preventDefault();
  modal.style.display = 'none';
};

// when user clicks on the mark as sold button...
const markAsSoldBtns = document.getElementsByClassName('markAsSoldBtn');

Array.from(markAsSoldBtns).forEach((markAsSold) => {
  markAsSold.addEventListener('click', () => {

  });
});
