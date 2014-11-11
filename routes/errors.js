module.exports = function (app) {
    app.use(function (req, res, next) {
        res.status(404);
        
        if (req.accepts('htlm')) {
            return res.send("<h2>I'm sorry, but you suck. 404</h2>");
        }
        
        if (req.accepts('json')) {
            return res.json({error: 'Not Found: 404'});
        }
        
        res.type('txt');
        res.status(404).send("I'm sorry, but you suck. 404");
    });
    
    app.use(function (err, req, res, next) {
        console.error('error at %\n', req.url, err.stack);
        res.status(500).send('Oops, something went wrong.');
    });
};