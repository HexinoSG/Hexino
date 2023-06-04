let submitForm = document.getElementById("submitForm");
let submitButton = document.getElementById("submitButton");
let overlay = document.getElementById("overlay");
let infoAlert = document.getElementById("infoAlert");
let successMessage = document.getElementById("successMessage");
let loader = document.getElementById("loader");
let submitState = false;

$(window).scroll(function(){
	$('nav').toggleClass('scrolled', $(this).scrollTop() > 50);
});

function getData(form) {
	var formData = new FormData(form);
	for (var pair of formData.entries()) {
		console.log(pair[0] + ": " + pair[1]);
	}
	return Object.fromEntries(formData);
}

async function postJSON(URL, data) {
	try {
		const response = await fetch(URL, {
			method: "POST", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Error:", error);
	}
}

function toggleSubmitState(){
	if(submitState == false){
		submitButton.disabled = true;
		overlay.style.display = "block";
		submitState = true;
	}
	else{
		submitButton.disabled = false;
		overlay.style.display = "none";
		submitState = false;
	}
}

function handleAlert(response){
	infoAlert.innerHTML = response.message;
	infoAlert.style.display = "block";
}

submitForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	toggleSubmitState();
	formData = getData(e.target);
	response = await postJSON("https://support.hexino.tech/contact", formData);
	if(response.status == false){
		toggleSubmitState();
		handleAlert(response);
		return;
	}
	loader.style.display = "none";
	successMessage.style.display = "block";
	setTimeout(function(){
		window.location.reload();
	 }, 3000);

});