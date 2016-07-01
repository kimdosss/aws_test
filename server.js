var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var index = require('./routes/index');
var app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

var url = 'mongodb://Kim1:MONGO12345job@ds040489.mlab.com:40489/kimdb'

//Schema 
var testSchema = new Schema({
	name: String,
	text: String
});
//Modal
mongoose.model('testModel', testSchema);
var testModel = mongoose.model('testModel');

mongoose.connect(url, function (err, db) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		console.log('Connection established to', url);
	}

	//db.close();
});

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), function () {
	console.log('8000');
});


app.post('/', function (req, res) {
	res.send('Hello World!');
});


app.route('/test')
	.post(function (req, res) {
		
		//Entity
		var test = new testModel();
		
		test.text = req.body.text;
		test.name = req.body.name;
		
		test.save(function(err, post) {
			if (err){
				res.status(500).send(err);
			}
			res.status(200).send('input');
		});

	})

	.get(function (req, res) {
		testModel.find(function(err, feedback){			
			if(err){
				res.status(500).send(err);
			}
			res.status(200).send(feedback);
		});	
	})

app.route('/find')
	.get(function (req, res) {
		testModel.findOne({'name': '333'}, function(err, feedback){

			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(feedback);		    

		});


	})

	.post(function (req, res) {
		findName = req.body.name;
		testModel.find({'name': findName}, function(err, feedback){

			if(err){
				res.status(500).send(err);
			}
			res.status(200).json(feedback);		    

		});


	})


