let app = new Vue({
    el: "#app",
    data: {
        email: null
    },
    methods: {
       async sendMailToRecover(e) {
            e.preventDefault();
            const response = await fetch("http://localhost:5000/api/sendmail", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email
                })
            });
            return response.json();
        }
    }
})