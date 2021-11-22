let formData = new FormData(document.forms.form1);
let xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:5000/api/registration");
xhr.send(formData);
xhr.onload = () => alert(xhr.response);