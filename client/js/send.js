let http = new XMLHttpRequest();
let url = 'http://localhost:5000/api/registration';
let params = 'orem=ipsum&name=binny';
http.open('POST', url, true);

//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'multipart/form-data');
http.send(params);

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
    }
}