
let createAd = document.getElementById("createAdBtn");

createAd.addEventListener("click", (e) =>{

	let currentUrl = location;
	let redirectUrl = currentUrl.protocol + "//" + currentUrl.host + "/Auto-Mart/UI/home.html";
	window.location.assign(redirectUrl);
})