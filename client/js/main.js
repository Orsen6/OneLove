const login = document.getElementById("form-login");

login.addEventListener("blur", function(event) {
    let value = this.value;

    if (value = '' || value >= 32) {
        login.classList.add('false-class')
    } else {
        login.classList.remove('false-class')
    }
});