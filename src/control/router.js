var scheduler = require('./scheduler');

module.exports = function(app){
    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/crack/', scheduler.crack);
};
