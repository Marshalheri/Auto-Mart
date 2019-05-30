
/** This function is used to get the current year .* */
const currentDate = new Date();
const year = currentDate.getFullYear();

document.getElementById('year').innerHTML = year;
