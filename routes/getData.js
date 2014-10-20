// var MongoClient = require('mongodb').MongoClient;
var request = require('request'),
tokenImport = require('./NOAAtoken.js');

var getData = function(queryString, callback){
	var uri = "http://www.ncdc.noaa.gov/cdo-web/api/v2/"+queryString.urlEndPoint+""+queryString.urlParam+"&limit=1000";
	console.log(uri);
	var options = {
		url: uri,
		headers : {
			token : tokenImport.NOAAtoken
		}
	};
	request(options, function(err, res, body){
		if(err){
			console.log(err);
			return err;	
		} 
		var data = JSON.parse(body);
		console.log(data);
		callback(data);
	});
};

module.exports.getData = getData;