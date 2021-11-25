// document.querySelector("#form1").addEventListener("submit", () => {
//     let formData = new FormData(document.forms.form1);
//     console.log(formData);
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost:5000/api/registration");
//     xhr.send(formData);
//     xhr.onload = () => alert(xhr.response);
// })
let app = new Vue({
    el: "#app",
    data: {
        email: "",
        pass: "",
        name: "",
        surname: "",
        age: "",
        gender: "",
        summary: "",
        image: null
    },
    methods: {
        async sendInfo() {
            const request = await fetch("http://localhost:5000/api/registration", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: this.email,
                    pass: this.pass,
                    name: this.name,
                    surname: this.surname,
                    age: this.age,
                    gender: this.gender,
                    summary: this.summary
                }),
                
            }),
            
        }
    }
})