
const createAd = document.getElementById('createAdBtn');

createAd.addEventListener("click", (e) =>{

	let currentUrl = location;
	let redirectUrl = currentUrl.protocol + "//" + currentUrl.host + "/Auto-Mart/UI/home.html";
	window.location.assign(redirectUrl);
})

createAd.addEventListener('click', (e) => {
  const currentUrl = location;
  const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}/Auto-Mart/UI/home.html`;
  window.location.assign(redirectUrl);
});

