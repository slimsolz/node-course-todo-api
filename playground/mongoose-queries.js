const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
/*
var id = '5acdf24ecff6e32fecaf3663';

if (!ObjectID.isValid(id)) {
	console.log('Id not Valid');
}*/

/*Todo.find({
	_id: id
}).then((todos) =>{
	console.log('Todos', todos);
});

Todo.findOne({
	_id: id
}).then((todo) =>{
	console.log('Todo', todo);
});*/

/*Todo.findById(id).then((todo) =>{
	if (!todos) {
		return console.log('Id not found');
	}
	console.log('Todo By Id', todo);
}).catch((err) => console.log(err));*/

let id = "5acc4f8f1ad3ef18e42cac97";

User.findById(id).then((user) =>{
	if (!User) {
		return console.log('User not found');
	}

	console.log(JSON.stringify(user, undefined, 4));
}, (err) =>{
	console.log(err);
})