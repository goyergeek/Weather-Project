var MongoClient = require('mongodb').MongoClient
,	request = require('request')
,	tokenImport = require('./NOAAtoken.js')
,	mongoose = require('mongoose');
//,	locations = mongoose.model('locations');

var dbConnect = function(callback) {
	MongoClient.connect('mongodb://janson.dyndns-ip.com:21501/test', function(err, db){
		if(err) throw err;
		callback(db);
	});
};

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
		if(res.statusCode != 200){
			return callback("Got an error from NOAA on request process.  Was expecting 200, instead got "+res.statusCode);
		}
		var data = JSON.parse(body);
		console.log(data);
		return callback(data);
	});
};

var getLocationData = function(callback) {
	var uri = "http://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ST&limit=52";
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
		if(res.statusCode !=200){
			return callback("Got an error from NOAA on request process.  Was expecting 200, instead got "+res.statusCode);
		}
		var data = JSON.parse(body);
		console.log(data);
		return callback(data);
	});
};

var testData = function(callback) {
	var testArray = [];
	var query = {};
	var projection = {'_id' : 0};
	dbConnect(function(db) {
		db.collection('optionTest').find(query, projection).toArray(function(err, doc) {
			for(i=0;i<doc.length;i++){
				testArray.push(doc[i]);
				console.log(testArray);
			}
			db.close();
			console.log(testArray);
			return callback(testArray);
		});
	});
};

module.exports.getData = getData;
module.exports.testData = testData;
module.exports.getLocationData = getLocationData;