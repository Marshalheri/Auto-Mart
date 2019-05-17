
let orderBtn = document.getElementById("placeOrderBtn");

orderBtn.addEventListener("click", (e) =>{
	e.preventDefault();
	let url = location;
	let newUrl = url.origin + " " + url.pathname;
	window.alert(newUrl);
})