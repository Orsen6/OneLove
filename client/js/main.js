window.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector(".main-form_registration");
    let pass = form.querySelectorAll("#password, #confirm-password");
    let errorDiv = form.querySelector(".invalid-confirm");
    $('.main-form_btn-continue').on("click",function(e){
        e.preventDefault();
    });
    form.addEventListener("submit", function(e) {
        let err = !(pass[0].value && (pass[0].value == pass[1].value))
        pass[1].setAttribute("title", err ? errorDiv.innerHTML="Перевірте правильність пароля" : "");
        err && e.preventDefault();
    }, false);
    pass[1].addEventListener("input", (e)=>{
        let err = !(pass[0].value == pass[1].value)
        pass[1].setAttribute("title", err ? "err" : "");
    }, false)   
})

document.querySelector(".main-form_btn-continue").addEventListener("click", () => {
    document.querySelector(".registration").classList.add("invise");
    document.querySelector(".main-form_about").classList.add("main-form_about--active");
    document.querySelector(".main-form").classList.add("p0");
});

