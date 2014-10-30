var dataButtons = {
    placeHolderAlert : function() {
        alert('hello');
    },
    dataQuery : function() {
        var fields = $.param($(":input.queryString").serializeArray(), true);
        var formEndPoint = $(":input.endPoint").val();
        event.preventDefault();
        this.ajaxCall(formEndPoint,fields);
    },
    locationsQuery : function() {
        var fields = "&locationcategoryid=ST&limit=52";
        var formEndPoint = "locations?";
        this.ajaxCall(formEndPoint, fields);
    },
    
    ajaxCall : function(formEndPoint,fields){
        $("#append-here").empty();
        //alert(fields);
        $.ajax({
            url: "/getData",
            type: "POST",
            data: {
                urlParam : fields, 
                urlEndPoint: formEndPoint
            },
            beforeSend : function(){
                $('#append-here').append('<img class="loading" src="/public/img/loading.gif"/>');
            },
            error : function(err){
                $('#append-here').append(err);
            }
            }).done(function(response){
                $('#loading').remove();
                $('#append-here').empty();
                $('#append-here').append('<code>'+JSON.stringify(response.results)+'</code>'+'</br>');
            });
    },
    getFromLayoutArray: function(data){
        $('#append-here').empty();
        for(i=0;i<data[0].datasets.length;i++) {
            tempVar = data[0].datasets[i];
            $('#append-here').append('<code>'+JSON.stringify(tempVar)+'</code>'+'</br>');
        }
        //return a value from the layoutArray to #append-here
        //$('#append-here').append('<code>'+JSON.stringify(data)+'</code>');
    }
};



var formActions = {
    radioSelection: function(selection){
        if(selection == 48) {
            //var txStationValues = {stationBox1 : "GHCND:USW00023044", stationBox2 : "GHCND:USC00412794", clearValue: ''};
            $("#stationBox1").prop('value', 'GHCND:USW00023044');
            $("#stationBox2").prop('value', 'GHCND:USC00412794');
            $("label[for='stationBox1']").text("ELP 1");
            $("label[for='stationBox2']").text("ELP 2");
            } else {
                $("#stationBox1").prop('value','GHCND:USW00013928');
                $("label[for='stationBox1']").text("ATL 1");
                $("#stationBox2").prop('value', 'GHCND:USW00013928');
                $("label[for='stationBox2']").text("ATL 2");
            }
        }
};