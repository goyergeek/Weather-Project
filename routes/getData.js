// var MongoClient = require('mongodb').MongoClient;
var request = require('request'),
tokenImport = require('./NOAAtoken.js');

var getData = function(queryString, callback){
	var uri = "http://www.ncdc.noaa.gov/cdo-web/api/v2/"+queryString.urlEndPoint+""+queryString.urlParam+"&limit=100";
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
		if(res.statusCode != 200){
			return callback("Got an error from NOAA on request process.  Was expecting 200, instead got "+res.statusCode);
		}
		var data = JSON.parse(body);
		console.log(data);
		return callback(data);
	});
};

module.exports.getData = getData;