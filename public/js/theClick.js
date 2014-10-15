var getData = function() {
    alert('hello');
};

var getFromSite = function(){
    var data = {
        datasetid : [$(".data4").val()],
        datatypeid : [$(".data1").val(), $(".data2").val(), $(".data3").val()],
        locationid :[$(".data6").val()],
        stationid : [$(".data7").val(), $(".data8").val(), $(".data9").val()],
        startdate : [$(".data10").val()],
        enddate : [$(".data11").val()],
        limit : [$(".data12").val()],
        offset : [$(".data13").val()],
        includemetadata : [$(".data14").val()]
    };
    var pdata = $.param(data, true);
    $.ajax({
        url: "/getData",
        type: "POST",
        data: {thisData : pdata}
    }).done(function(response){
       $('#append-here').append('<code>'+JSON.stringify(response)+'</code>'); 
    });
};