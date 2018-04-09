const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//findOneAndUpdate
	/*db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID("5acbba2358ddc87c3770440b")
	},{
		$set: {
			completed: true
		}
	},{
		returnOriginal: false
	}).then((result) =>{
		console.log(result);
	});
*/

	db.collection('Users').findOneAndUpdate({
		_id: 123
	},{
		$set: {
			name: 'Solomon'
		},
		$inc:{
			age: 1
		}
	},{
		returnOriginal: false
	}).then((result) =>{
		console.log(result);
	});

//	db.close();
});