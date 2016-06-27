function getDecrypt(){ 
    var code = document.getElementById('code').value;
    var key = document.getElementById('key_d').value;

    var decrypted = CryptoJS.AES.decrypt(code, key);
    ////4d657373616765
    //
    document.getElementById("Message").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
}

function getEncrypt(){ 
    var code = document.getElementById('encryption').value;
    var key = document.getElementById('key_e').value;

    var encrypted = CryptoJS.AES.encrypt(code, key);
    ////4d657373616765
    //
    document.getElementById("Result").innerHTML = encrypt;
}
