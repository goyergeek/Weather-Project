// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://janson.dyndns-ip.com:21501/test', function(err, db){
//     if(err) throw err;
//     var query = {'datatype' : 'TMAX'};
//     var projection = {'_id' : 0};
//     db.collection('jason').find(query, projection).toArray(function(err, docs) {
//         if(err) throw err;
//         docs.forEach(function (doc) {
//             console.log(doc.station + " has values for " + doc.datatype + " on date " + doc.date);
//         });
//         db.close();
//     });
// });


// Basic Mongoose usage.  Below creates a connection to the DB, creates a schema, adds a method to the schema, creates a model based on the schema then creates a new instance
// of the model logs it to the console, then saves the document to the DB.

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://janson.dyndns-ip.com:21501/Weather_Project');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//     var dailySummariesSchema = mongoose.Schema({
//         station_id: String,
//         location_id: String,
//         longitude: Number,
//         latitude: Number,
//         max_date: Date,
//         min_date: Date,
//         datatypes: [String]
//     });
//     dailySummariesSchema.methods.docInserted = function() {
//         var logMessage = this.station_id
//             ? "Doc inserted for " + this.station_id
//             : "Doc does not have a station id";
//         console.log(logMessage);
//     };
//     var dailySummary = mongoose.model('dailySummary', dailySummariesSchema);
//     var station_1 = new dailySummary({station_id: 'GHCND:000000000000', location_id: 'FIPS:48', longitude: 189.9, latitude: 90.3, max_date: 2014-10-01, min_date: 1970-01-01, datatypes: ['TMAX','TMIN','PRCP','SNOW']});
//     console.log(station_1);
//     station_1.save(function (err, station_1) {
//         if (err) return console.error(err);
//         station_1.docInserted();
//     });
//     }
// );

var mongoose = require('mongoose')
,   schemas = require('./schemas.js')
,   lifecycle = require('mongoose-lifecycle');

mongoose.connect('mongodb://janson.dyndns-ip.com:21501/Weather_Project');

var db = mongoose.connection
var stationData = mongoose.model('stations');
mongoose.connection.on("open", function() {
    console.log("mongodb is connected!")
    var data = stationData.find({}, function (err, stations){
        var stationMap = {};
        stations.forEach(function(station) {
            stationMap[station.station_id] = station;
        });
        
        console.log(stationMap);
    });
})


//console.log(data);



//console.log(stationData.findStations());