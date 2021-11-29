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
        password: "",
        name: "",
        surname: "",
        age: "",
        selectedGender: [],
        summary: "",
        image: ""
    },
    methods: {
        uploadFile(event) {
            this.image = event.target.files[0];
        },
        async sendInfo(e) {
            e.preventDefault();
            const userData = new FormData();
            userData.append('image', this.image);
            userData.append('email', this.email);
            userData.append('password', this.password);
            userData.append('name', this.name);
            userData.append('surname', this.surname);
            userData.append('age', this.age);
            userData.append('gender', this.selectedGender);
            userData.append('summary', this.summary);
            const response = await fetch("http://localhost:5000/api/registration", {
                method: "POST",
                // headers: {"Content-Type": "multipart/form-data"},
                body: userData,
                // JSON.stringify({
                //     email: this.email,
                //     password: this.pass,
                //     name: this.name,
                //     surname: this.surname,
                //     age: this.age,
                //     gender: this.selectedGender,
                //     summary: this.summary
                // }),
            })
            const data = await response.json();
        }
    }
})