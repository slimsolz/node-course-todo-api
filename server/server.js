require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
	let todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) =>{
		res.send(doc);
	}, (err) =>{
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) =>{
	Todo.find().then((todos) =>{
		res.send({todos});
	}, (e) =>{
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) =>{
	let id = req.params.id;

	//validate id using isValid
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	//findById
	Todo.findById(id).then((todo) =>{
		if (!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) =>{
		res.status(400).send();
	});
});

//delete route
app.delete('/todos/:id', (req, res) =>{
	let id = req.params.id; //get id

	//validate id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findByIdAndRemove(id).then((todo) =>{
		if (!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((e) =>{
		return res.status(400).send();
	});

});

//update route
app.patch('/todos/:id', (req, res) =>{
	let id = req.params.id; 
	let body = _.pick(req.body, ['text', 'completed']);

	//validate id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
		if (!todo) {
			return res.status(404).send();
		}

		res.send({todo});

	}).catch((e) => {
		res.status(400).send();
	});
});

app.listen(port, () =>{
	console.log(`Started on port ${port}`);
});

module.exports = {app};



