var getData = function() {
    alert('hello');
};

var getFromSite = function(){
    var data = {
        dataTypeOne : $(".data1").val(),
        dataTypeTwo : $(".data2").val(),
        dataTypeThree : $(".data3").val()
    }
    $.ajax({
        url: "/getData",
        type: "POST",
        data: data
    }).done(function(response){
       $('#append-here').append('<code>'+JSON.stringify(response)+'</code>'); 
    });
};