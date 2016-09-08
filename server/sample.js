  var csv = require('csv');
  var async = require('async');
  var fs = require('fs');
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect('mongodb://localhost:27017/acgnaturalista', function(err, db) {
  	if (err) throw err;

  	var collection = db.collection('observaciones');
  	var queue = async.queue(collection.insert.bind(collection), 1);


    csv()
  	.from.path('C:/Users/Charlie/Desktop/muestra.csv', {delimiter : ";", columns: true })
  	.transform(function (row, index, cb) {
  		queue.push(row, function (err, res) {
  			if (err) return cb(err);
  			cb(null, res[0]);
  		});
  	})
  	.on('error', function (err) {
  		console.log('ERROR: ' + err.message);
  	})
  	.on('end', function () {
  		queue.drain = function() {
  			collection.count(function(err, count) {
  				console.log('Number of documents:', count);
  				db.close();
  			});
  		};
  	});
  });
