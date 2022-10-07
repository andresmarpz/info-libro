// user:        eljose1960@mail.com
// password:    pepe1960


document.getElementById("login-form").addEventListener("submit", function (e) {
		e.preventDefault();
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;

		if(!email || !password) return;
		
		localStorage.setItem('login', JSON.stringify({
			email, password
		}))
		window.location.href = "index.html";
})