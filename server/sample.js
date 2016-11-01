  var csv = require('csv');
  var async = require('async');
  var fs = require('fs');
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/acgnaturalista', function(err, db) {
  	if (err) throw err;

  	var collection = db.collection('sightings');
    var collection2 = db.collection('taxonomies');
  	var queue = async.queue(collection.insert.bind(collection), 1);
    //var queue2 = async.queue(collection.insert.bind(collection2), 1);
    var arrayExisting=[];
    collection2.distinct('family',function(err, res){
      if(err) return cb(err);

      arrayExisting= res;
    });
    var counter = 0;

    csv()
  	.from.path('../server/imports/muestra.csv', {delimiter : ";", columns: true })
  	.transform(function (row, index, cb) {
  		queue.push(row, function (err, res) { //meter en la cola para la bd
  			if (err) return cb(err);
  			cb(null, res[0]);
        var arrayFamilysFind=[];
        function findFamily(arrayExisting){
          return arrayExisting === row.family;
        }
        if (arrayExisting.find(findFamily) === undefined) { //famaly is not in existing array
          collection2.insert({taxonomyType : "family", family : row.family.trim(), description : "example description"});
          arrayExisting.push(row.family);
        }
  		});//push
  	})//transform
  	.on('error', function (err) {
  		console.log('ERROR: ' + err.message);
  	})
  	.on('end', function () {
  		queue.drain = function() {
  			collection.count(function(err, count) {
  				console.log('Number of documents:', count);
          console.log(arrayExisting);
          //console.log(counter);
  				db.close();
  			});
  		};
  	});
  });
