// var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var tokenImport = require('./NOAAtoken.js');

var getData = function(dataTypeData, callback){
	var dataTypePartial = "";
	for(var key in dataTypeData){
		console.log(typeof(dataTypeData[key]));
		if(dataTypeData[key] !== ""){
			dataTypePartial += '&datatypeid='+dataTypeData[key];
		}
	}
	console.log(dataTypePartial);
	var options = {
		url: 'http://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND'+dataTypePartial+'&locationid=FIPS:48&stationid=GHCND:USW00023044&startdate=2014-01-01&enddate=2014-01-30&limit=1000',
		headers : {
			token : tokenImport.NOAAtoken
		}
	};
	request(options, function(err, res, body){
		var data = JSON.parse(body);
		if(err) console.log(err);
		callback(data);
	});
};

module.exports.getData = getData;