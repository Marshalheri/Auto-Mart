
//This section handles the toggle between the admin login form and the user login form...
let userBtn = document.getElementById("toggleUserBtn");
let adminBtn = document.getElementById("toggleAdminBtn");
let userForm = document.getElementById("userLoginForm");
let adminForm = document.getElementById("adminLoginForm");

userBtn.onclick = (e) =>{
	e.preventDefault();
	adminForm.style.display = "none";
	userForm.style.display = "flex";	
}



adminBtn.onclick = (e) =>{
	e.preventDefault();
	userForm.style.display = "none";
	adminForm.style.display = "flex";
}

//The toggle handler ends here........


//This section handles the user login....
let loginUser = document.getElementById("loginUserBtn");

loginUser.addEventListener("click", (e) =>{
	let userEmail = document.getElementById("userEmail").value;
	let userPassword = document.getElementById("userPassword").value;
	if(userEmail == "" || userPassword == ""){
		//add some functions to validate here later...
	}
	else{
	let currentUrl = location;
	let redirectUrl = currentUrl.protocol + currentUrl.host + "/home.html"
	window.location.assign(redirectUrl);}
})

//This section handles the admin login
let loginAdmin = document.getElementById("loginAdminBtn");

loginAdmin.addEventListener("click", (e) =>{
	let adminEmail = document.getElementById("adminEmail").value;
	let adminPassword = document.getElementById("adminPassword").value;
	if(adminEmail == "" || adminPassword == ""){
		//add some functions here later....
	}else{
		let currentUrl = location;
		let redirectUrl = currentUrl.protocol + currentUrl.host + "/admin-dashboard.html"
		
		window.location.assign(redirectUrl);
	}
})