
app = new Vue({
    el: "#app",
    data: {
        email: "",
        password: ""
    },
    methods: {
         async sendLogin (e) {
            e.preventDefault();
            const postLogin = axios.post("http://localhost:5000/api/login", {
                body: {
                    email: this.email,
                    password: this.password
                }
            })
        }
        // async getInfo(token) {
        //     const hui = await fetch("http://localhost:5000/api/profile", {
        //         method: "GET",
        //         headers:  {"Authorization": `Bearer ${token}`}
        //     })
        // },
        // async sendLogin(e) {
        //     e.preventDefault();
        //     const postLogin = await fetch("http://localhost:5000/api/login", {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify({
        //             email: this.email,
        //             password: this.password
        //         })
        //     })
        //     const loginData = await postLogin.json();
        //     console.log(loginData);

        // }
    }
})