var dataButtons = {
    placeHolderAlert : function() {
        alert('hello');
    },
    showValues : function() {
        //Get and parameterize all input values for the queryString class of form inputs.  .serializeArray() formats the string properly and discards the value of the submit button.
        var fields = $.param($(":input.queryString").serializeArray(), true);
        //alert(fields);
        //Get the value from all input values for the endPoint class of form inputs. (data?/dataset?/locationid?)
        var formEndPoint = $(":input.endPoint").val();
        //Prevent the default event action for the submit button.  This prevents the submit button from attempting to GET/POST and reloading the page.
        event.preventDefault();
        this.ajaxCall(formEndPoint,fields);
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
                $('#append-here').append('<img id="loading" src="/public/img/loading.gif" style="height: 30px; width: 30px"/>');
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
        },
    checkBoxSelection: function(selection){
        if($(selection).prop('checked')){
            $(selection).prop('value', this.radioSelection.stationValues.stationBox1);
        }
    }    
};