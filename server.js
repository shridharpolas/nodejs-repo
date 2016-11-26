var express = require('express');
var bp = require('body-parser');
var _ = require('underscore');

var app = express();
app.use(bp.json());

app.use(express.static('public'));

var mytasks = [
  {
	"id": 1,
    "description": "test post",
    "completed": true
  },
  {
	"id": 2,
    "description": "test post",
    "completed": true
  },
  {
	"id": 3,
    "description": "test post",
    "completed": true
  },
  {
	"id": 4,
    "description": "test post",
    "completed": true
  }
];

app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);

	var matchedTodo = _.findWhere(mytasks, {id:todoId});

	if(matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
}
);

app.get('/getmytasks', function(req, res) {
	res.json(mytasks);
}
);

app.delete('/deletedata/:id', function(req, res) {
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo = _.findWhere(task, {id:todoId});
  if(!matchedTodo) {
    res.status(404).json('error': 'id not found');
  } else {
    task = _.without(task, matchedTodo);
    res.json(matchedTodo);
  }
}
);

var taskid;
app.post('/postmytasks', function(req, res) {
	var data = req.body;
	req.id=taskid++;
	mytasks.push(data);
	res.json(data);
});

app.listen(3000, function() {
		console.log('app is running on port 3000');
});
