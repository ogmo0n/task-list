const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const tasks = require('./routes/tasks');

const port = 3000;

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// homepage
app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
    console.log('Server running on port ' + port);
});