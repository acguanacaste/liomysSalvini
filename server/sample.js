  var csv = require('csv');
  var async = require('async');
  var fs = require('fs');
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect('mongodb://localhost:27017/acgnaturalista', function(err, db) {
  	if (err) throw err;

  	var sightings = db.collection('sightings');
    var taxonomies = db.collection('taxonomies');
  	var queue = async.queue(sightings.insert.bind(sightings), 1);
    var arrayExisting=[];
    //load distinct familiys from db to arrayExisting
    taxonomies.distinct('family',function(err, res){
      if(err) return cb(err);

      arrayExisting= res;
    });

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
          taxonomies.insert({taxonomyType : "family", family : row.family.trim(), description : "example description"});
          arrayExisting.push(row.family);
        }
  		});//push
  	})//transform
  	.on('error', function (err) {
  		console.log('ERROR: ' + err.message);
  	})
  	.on('end', function () {
  		queue.drain = function() {
  			sightings.count(function(err, count) {
  				console.log('Number of documents:', count);
          console.log(arrayExisting);
  				db.close();
  			});
  		};
  	});
  });
