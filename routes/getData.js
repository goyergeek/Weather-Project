// var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var tokenImport = require('./NOAAtoken.js');

var getData = function(queryString, callback){
	//console.log(queryString.urlParam);
	//console.log(queryString.urlEndPoint);
	var uri = "http://www.ncdc.noaa.gov/cdo-web/api/v2/"+queryString.urlEndPoint+""+queryString.urlParam+"&limit=1000";
	console.log(uri);
	var options = {
		url: uri,
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