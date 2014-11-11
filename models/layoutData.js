var mongoose = require('mongoose')
,   validEmail = require('../helpers/validate/email');

var schema = mongoose.Schema({
    _id: {type: String, lowercase: true, trim: true}
    , title: {type: String, required: true}
    , header: {type: String, required: true}
    , banner: {type: String, required: true}
    , menu: []
    },
    {
        collection: 'layoutData'
    });

// schema.statics.allLayouts = function (id, callback) {
//     return this.model('layoutData').find();
// };

// schema.virtual('fullname').get(function () {
//     return this.name.first+ ' ' + this.name.last;
// });

module.exports = mongoose.model('layoutData', schema);