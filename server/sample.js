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
    var arrayFamilysFind=[];
    var counter = 0;
    /*
    collection2.find({}).toArray(function(err,res){
      arrayFamilys = res;
    });
    for (var i = 0; i < arrayFamilys.length; i++) {
      arrayExistentes[i].push(arrayFamilys[i].family);
    }
    console.log(arrayExistentes); */
    csv()
  	.from.path('../server/imports/muestra.csv', {delimiter : ";", columns: true })
  	.transform(function (row, index, cb) {
  		queue.push(row, function (err, res) {
  			if (err) return cb(err);
  			cb(null, res[0]);

        function findFamily(arrayExisting){
          return arrayExisting === row.family;
        }
        if (arrayExisting.find(findFamily) === undefined) {
          console.log(arrayFamilysFind.length);
          collection2.find({family: row.family}).toArray(function(err,res){
            arrayFamilysFind = res;
            console.log(arrayFamilysFind);
            //console.log(arrayFamilysFind.length);
          });
          if (arrayFamilysFind.length >= 1) {
            arrayExisting.push(row.family);
            arrayFamilysFind = [];
          }else {
            if (arrayFamilysFind.length === 0) {
              counter++;
              collection2.insert({taxonomyType : "family", family : row.family.trim(), description : "example description"});
              arrayExisting.push(row.family);
            }
          }

        }
  		});
  	})
  	.on('error', function (err) {
  		console.log('ERROR: ' + err.message);
  	})
  	.on('end', function () {
  		queue.drain = function() {
  			collection.count(function(err, count) {
  				console.log('Number of documents:', count);
          console.log(arrayExisting);
          console.log(counter);
  				db.close();
  			});
  		};
  	});
  });
