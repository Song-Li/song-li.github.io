$.ajax({ url: 'http://api.fixer.io/latest?base=USD', success: function(data) { 
    console.log(data);
    for (var key in data['rates']) {
        $('#origin').append("<div>" + key + "->" + data['rates'][key]);
    }

} });
