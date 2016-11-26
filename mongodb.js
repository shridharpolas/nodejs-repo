var express = require('express');
var bp = require('body-parser');
var _ = require('underscore');

var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(bp.json());

app.use(express.static('public'));

var db;
var dburi = 'mongodb://admin:admin@ds111178.mlab.com:11178/ssp_db';

MongoClient.connect(dburi, (err, database) => {
  if(err) return console.log(err);
  db = database;
});

var taskid;
app.post('/addmydata', (req, res) => {
	db.collection('usertable').save(req.body, (err, result) => {
    if(err) return console.log(err)
    console.log('save to database');
  })
});

app.delete('/deletedata', (req, res) => {
  db.collection('usertable').findOneAndDelete({name:req.body.name}, (err, result) => {
    if(err) return res.send(500, err)
    res.send('record deleted');
  })
});

app.put('/updatedata', (req, res) => {
  db.collection('usertable').findOneAndUpdate({name:req.body.description}, {
    $set: {
      description: "updated post"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if(err) return res.send(err);
    res.send(result);
  }
)
});

app.listen(3000, function() {
		console.log('app is running on port 3000');
}); 
