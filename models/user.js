var mongoose = require('mongoose')
,   validEmail = require('../helpers/validate/email')
,   createdDate = require('../plugins/createdDate');

var schema = mongoose.Schema({
    _id: {type: String, lowercase: true, trim: true, validate: validEmail }
    , name: {first: String, last: String}
    , salt: {type: String, required: true}
    , hash: {type: String, required: true}
    , admin: {type: Boolean, required: true}
});

schema.statics.isAdmin = function (id, callback) {
    return this.model('users').find({_id: id}, {_id: 0, admin: 1});
};

schema.virtual('fullname').get(function () {
    return this.name.first+ ' ' + this.name.last;
});

schema.plugin(createdDate);

module.exports = mongoose.model('User', schema);