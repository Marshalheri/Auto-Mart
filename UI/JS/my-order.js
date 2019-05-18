let editOrder = document.getElementsByClassName("editOrderPriceBtn");
let updateOrder = document.getElementsByClassName("updateOrderPriceBtn");
let updateOrderInput = document.getElementsByClassName(".updateOrderPrice");

Array.from(editOrder).forEach((btn) =>{
	btn.addEventListener("click", ()=>{
		//btn.style.display ="none";
		btn.innerHTML = "Test";
		let updateInput = document.createElement("input");
		updateInput.setAttribute("type", "number");
		updateInput.style.display = "block"
	})
})