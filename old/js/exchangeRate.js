var rate = 1;

$.ajax({ url: 'http://api.fixer.io/latest?base=USD', success: function(data) { 
    rate = data['rates']['CNY'];
    console.log(data);
} });


function cnyToUsd(){ 
    var cny = document.getElementById('cny_in').value;
    document.getElementById("usd").innerHTML = cny / rate;
}

function usdToCny(){ 
    var usd = document.getElementById('usd_in').value;
    document.getElementById("cny").innerHTML = usd * rate;
}
