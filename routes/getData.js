// var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var tokenImport = require('./NOAAtoken.js');

var getData = function(dataTypeData, callback){
	console.log(dataTypeData.thisData);
	var uri = "http://www.ncdc.noaa.gov/cdo-web/api/v2/data?"+dataTypeData.thisData+"&startdate=2014-01-01&enddate=2014-01-30&limit=1000";
	var options = {
		url: uri,
		headers : {
			token : tokenImport.NOAAtoken
		}
	};
	console.log(options);
	request(options, function(err, res, body){
		var data = JSON.parse(body);
		if(err) console.log(err);
		callback(data);
	});
};

module.exports.getData = getData;