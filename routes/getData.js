// var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var tokenImport = require('./NOAAtoken.js');

var getData = function(callback){
	var options = {
		url: 'http://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TMAX&datatypeid=TMIN&locationid=FIPS:48&stationid=GHCND:USW00023044&startdate=2014-01-01&enddate=2014-01-30&limit=1000',
		headers : {
			token : tokenImport.NOAAtoken
		}
	}
	console.log(options.headers);
	request(options, function(err, res, body){
		var data = JSON.parse(body);
		if(err) console.log(err);
		callback(data);
	});
};

module.exports.getData = getData;