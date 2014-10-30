var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: String,
    name: String,
    mindate: String,
    maxdate: String,
});

//var locations = mongoose.model('locations'. schema);

//module.exports = locations;