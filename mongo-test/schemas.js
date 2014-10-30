var mongoose = require('mongoose')
,   lifecycle = require('mongoose-lifecycle');

var stationsSchema = mongoose.Schema({
         station_id: String,
         elevation: Number,
         elavation_unit: Number,
         name: String,
         location_id: String,
         longitude: Number,
         latitude: Number,
         max_date: Date,
         min_date: Date,
         datatypes: Array
}, {collection : 'dailysummaries'});

stationsSchema.statics.findStations = function (callback) {
    return this.model('stations').find({}, callback);
};

var stationData = mongoose.model('stations', stationsSchema);

module.exports = stationData;