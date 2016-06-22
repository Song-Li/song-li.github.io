var ip_address = "184.73.16.65"

function generateUID(){
    postData = 'GetUID';

    /*
    var f = document.createElement("form");
    f.setAttribute('method',"post");
    f.setAttribute('action',"http://" + ip_address + "/result.py");

    var i = document.createElement("input"); //input element, text
    i.setAttribute('type',"text");
    i.setAttribute('name',"Refresh");

    f.appendChild(i);

    f.submit();
    return ;
    */
    $.ajax({
        url:"http://" + ip_address + "/getid.py",
        dataType:"text",
        type: 'POST',
        data: postData,
        success:function(data) {
            console.log(data);
        }
    });
}
