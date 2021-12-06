app = new Vue({
    el: "#app",
    data: {
        email: null,
        password: null,
        info: null
    },
    methods: {
        sendLogin (e) {
            e.preventDefault();
            this.login()
                .then((data) => {
                    if (data.status) {
                        this.getInfo(data.userData.accessToken)
                            .then((data) => {
                                if (data.status) {
                                    console.log(data);
                                    info = data.userData;
                                } else {
                                    
                                }
                            });
                    } else {
                        console.log('Ти даун');
                    }
                })
        },
        async login () {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });
            return response.json();
        },
        async getInfo (access) {
            const response = await fetch('http://127.0.0.1:5000/api/profile', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`
                }
            });
            return response.json();
        }
    }
})

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