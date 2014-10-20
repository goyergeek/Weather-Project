var dataButtons = {
    placeHolderAlert : function() {
        alert('hello');
    },
    //This function is called onsubmit for the form and sends a parameterized sting based on the serialized
    //array returned from all input types within the form, then calls the ajaxCall method which no longer
    //has to parameterize the string built in the massive getValuesFromIndexForm method.
    showValues : function() {
       var fields = $.param($(":input").serializeArray(), true);
       var paramFields = $(":input").serializeArray();
       alert(paramFields);
       event.preventDefault();
       dataButtons.ajaxCall(fields);
    },
    // getValuesFromIndexForm : function(){
        //todo: let's rewrite this as a loop that is smart enough to grab the data elements and inject them into the object.
        // var data = {
        //     datasetid : [$(".data4").val()],
        //     datatypeid : [$(".data1").val(), $(".data2").val(), $(".data3").val()],
        //     locationid :[$(".data6").val()],
        //     stationid : [$(".data7").val(), $(".data8").val(), $(".data9").val()],
        //     startdate : [$(".data10").val()],
        //     enddate : [$(".data11").val()],
            //limit : [$(".data12").val()],
            //offset : [$(".data13").val()],
            //includemetadata : [$(".data14").val()]
    //     };
    //     if(!data.startdate[0] || !data.enddate[0]) {
    //         $('#append-here').append('<h2>Both Start and End Dates are Required, please enter a date and try again</h2></br>');
    //     } else {
    //         this.ajaxCall(data);
    //     }
    // },
    ajaxCall : function(data){
        //Clear div append-here prior to appending data
        $("#append-here").empty();
        //var pdata = $.param(data, true);
        var endPoint = "data?";
        $.ajax({
            url: "/getData",
            type: "POST",
            data: {
                urlParam : data, 
                urlEndPoint: endPoint
            },
            beforeSend : function(){
                $('#append-here').append('<img id="loading" src="/public/img/loading.gif" style="height: 30px; width: 30px" />');
            },
            error : function(err){
                $('#append-here').append(err);
            }
            }).done(function(response){
                $('#loading').remove();
                $('#append-here').append('<code>'+JSON.stringify(response)+'</code>'+'</br>');
            });
    }
};



var formActions = {
    radioSelection: function(selection){
        if(selection == 48) {
            var txStationValues = {stationBox1 : "GHCND:USW00023044", stationBox2 : "GHCND:USW00023080", clearValue: ''}
            $("#stationBox1").prop('value', 'GHCND:USW00023044');
            $("#stationBox2").prop('value', 'GHCND:USW00023080');
            $("label[for='stationBox1']").text("ELP 1");
            $("label[for='stationBox2']").text("ELP 2");
            } else {
                $("#stationBox1").prop('value','GHCND:USW00013928');
                $("label[for='stationBox1']").text("ATL 1");
                $("#stationBox2").prop('value', 'GHCND:USW00013928');
                $("label[for='stationBox2']").text("ATL 2");
            }
        },
    checkBoxSelection: function(selection){
        if($(selection).prop('checked')){
            $(selection).prop('value', this.radioSelection.stationValues.stationBox1);
        }
    }    
    };