var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect('mongodb://localhost/playground')

var playgroundSchema = {
    name:String,
    username:String,
    playgroundId:Number,
    html:String,
    css:String,
    js:String
}

var Playground = mongoose.model('Playground', playgroundSchema, 'playground');

// populate db
// var samplePlayground = {
	// username:'kentendo',
    // html:'<h1>hi</h1>',
    // css:'body{background-color:#ccc}',
    // js:'console.log("hi")'
// };
//var sample = new Playground(samplePlayground);
// sample.save(function(err){
	// if(!err) console.log('saved');
// });

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static(__dirname+'/public'));
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.get('/api/:id', function(req, res) {
	Playground.findOne({_id: req.params.id}, function(err, playground){
		if(err) res.json({success:false, message:'error', data:err});
		else res.json({success:true, message:'playground found', data:playground});
	});
});

app.post('/api', function(req, res) {
	var playground = new Playground(req.body);
	playground.save(function(err, playground){
		if(err) res.json({success:false, message:'error', data:err});
		else res.json({success:true, message:'playground created', data:playground._id})
	});
});

app.post('/api/:id', function(req, res) {
	Playground.findOneAndUpdate({_id: req.params.id}, req.body, {}, function(err, playground){
		if(err) res.json({success:false, message:'error', data:err});
		else if(playground == 0) res.json({success:false, message:'no playground found'});
		else if(playground) res.json({success:true, message:'playground updated'});
	});
});

app.get('/embed/:id', function(req, res) {
	Playground.findOne({_id: req.params.id}, function(err, playground){
		if(err) res.json({success:false, message:'error', data:err});
		else res.json({success:true, message:'playground found', data:playground});
	});
});

app.listen(333);
