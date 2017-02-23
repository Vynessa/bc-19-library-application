var express = require("express"),
bodyParser = require('body-parser'),
router = express.Router(),
app = express();
var config = require('dotenv').config();
var ctrl = require('./controllers/auth.js');

var port = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('./routes/library.routes.js'));

app.listen(port, function(req, res){
	console.log("Magic happens on Port " + port);
})