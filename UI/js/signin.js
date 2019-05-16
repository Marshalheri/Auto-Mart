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