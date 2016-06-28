$.ajax({ url: 'http://api.fixer.io/latest?base=USD', success: function(data) { 
    console.log(data);
    for (var key in data) {
        $('#origin').append("<div>" + key + "->" + data[key]);
    }
    for (var key in data['rates']) {
        a('#origin').append("<div>" + key + "->" + data['rates'][key]);
    }

} });
