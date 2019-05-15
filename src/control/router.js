var scheduler = require('./scheduler');

module.exports = function(app){
    app.get('/', (req, res) => res.send("Hello, I'm Jserver"));
    app.get('/crack/', scheduler.crack);
};
