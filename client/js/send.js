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
            console.log(event);
        },
        async sendInfo(e) {
            e.preventDefault();
            const data = new FormData();
            data.append('image', this.image);
            data.append('email', this.email);
            data.append('password', this.password);
            data.append('name', this.name);
            data.append('surname', this.surname);
            data.append('age', this.age);
            data.append('gender', this.selectedGender);
            data.append('summary', this.summary);
            data.append('age', this.age);
            const response = await fetch("http://localhost:5000/api/registration", {
                method: "POST",
                headers: {"Content-Type": "multipart/form-data"},
                body: data
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
            const data2 = await response.json();
        }
    }
})