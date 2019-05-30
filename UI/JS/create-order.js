
const orderBtn = document.getElementById('placeOrderBtn');

orderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const url = location;
  const newUrl = `${url.origin} ${url.pathname}`;
  window.alert(newUrl);
});
