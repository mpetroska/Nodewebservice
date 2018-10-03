let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors')


let index = require('./routes/index');
let messages = require('./routes/messages');

let port = 3000;

let app = express();

app.use(cors());

//engine for view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//static folder
app.use(express.static(path.join(__dirname, 'client')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', messages);

app.listen(port, function () {
    console.log('server running on port '+port);
});



