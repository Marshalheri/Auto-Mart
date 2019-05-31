
const getUrl = `${location.protocol}//${location.host}/api/v1/login-api`;

// This section handles the toggle between the admin login form and the user login form...
const userBtn = document.getElementById('toggleUserBtn');
const adminBtn = document.getElementById('toggleAdminBtn');
const userForm = document.getElementById('userLoginForm');
const adminForm = document.getElementById('adminLoginForm');

userBtn.onclick = (e) => {
  e.preventDefault();
  adminForm.style.display = 'none';
  userForm.style.display = 'flex';
};


adminBtn.onclick = (e) => {
  e.preventDefault();
  userForm.style.display = 'none';
  adminForm.style.display = 'flex';
};

// The toggle handler ends here........


// This section handles the user login....
const loginUser = document.getElementById('loginUserBtn');

loginUser.addEventListener('click', (e) => {
  const userEmail = document.getElementById('userEmail').value;
  const userPassword = document.getElementById('userPassword').value;
  if (userEmail == '' || userPassword == '') {
    // add some functions to validate here later...
  } else {
    const currentUrl = location;
    const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}/Auto-Mart/UI/home.html`;
    // fetch(getUrl)
    // 	.then((res)=> {
    // 		console.log(res);
    // 		console.log(res.status);
    // 		return res.json();
    // 	})
    // 	.then((jsonResponse) => {
    // 		console.log(jsonResponse);
    window.location.assign(redirectUrl);
  }
});

// This section handles the admin login
const loginAdmin = document.getElementById('loginAdminBtn');

loginAdmin.addEventListener('click', (e) => {
  const adminEmail = document.getElementById('adminEmail').value;
  const adminPassword = document.getElementById('adminPassword').value;
  if (adminEmail == '' || adminPassword == '') {
    // add some functions here later....
  } else {
    const currentUrl = location;
    const redirectUrl = `${currentUrl.protocol}//${currentUrl.host}/Auto-Mart/UI/admin-dashboard.html`;
    window.location.assign(redirectUrl);
    // fetch(getUrl).then((res)=>{
    // 	var data =  res;
    // 	console.log(res);
    // 	console.log(data);
    // 	console.log(res.url);
    //
    // }).then((data)=>{
    // 	console.log(data);
    // })
    //
  }
});
