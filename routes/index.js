var getData = require('./getData.js')
,   mongoose = require('mongoose');
//,   models = require('./models')
//,   locations = mongoose.model('locations');

module.exports = function(app) {
    
    app.get('/', function (req, res, next) {
        getData.testData(function(layoutData){
            res.render('index.jade', {layoutArray: layoutData});
        });
    });
};
    

// var getLayoutData = function(callback){
//     formOption.testData(function(layoutArray){
//         callback(layoutArray);
//     });
// };


// getData.testData(function(layoutData){
//         layoutData = JSON.stringify(layoutData);
//         res.render('index.jade', {layoutArray: layoutData});
//     });
// };