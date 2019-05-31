const editOrder = document.getElementsByClassName('editOrderPriceBtn');
const updateOrder = document.getElementsByClassName('updateOrderPriceBtn');
const updateOrderInput = document.getElementsByClassName('.updateOrderPrice');

Array.from(editOrder).forEach((btn) => {
  btn.addEventListener('click', () => {
    // btn.style.display ="none";
    btn.innerHTML = 'Test';
    const updateInput = document.createElement('input');
    updateInput.setAttribute('type', 'number');
    updateInput.style.display = 'block';
  });
});
