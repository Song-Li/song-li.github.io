function getDecrypt(){ 
    var code = document.getElementById('code').value;
    var key = document.getElementById('key').value;

    var decrypted = CryptoJS.AES.decrypt(code, key);
    ////4d657373616765
    //
    document.getElementById("Message").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
}
