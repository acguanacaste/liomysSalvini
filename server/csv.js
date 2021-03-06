var csv = require('csv');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

function procesaCsv(nameCsv,appName) {
  MongoClient.connect('mongodb://localhost:27017/acgnaturalista', function(err, db) {
  	if (err) throw err;
    var sightings = db.collection('sightings');
    var taxonomies = db.collection('taxonomies');
    var species = db.collection('species');
  	var queue = async.queue(sightings.insert.bind(sightings), 1);
    var arrayExisting=[];
    var arrayExistingScientificName = [];
    var jsonTaxonomies =[];
    const applicationName = appName;
    var appArray = new Array();
    appArray.push(appName);

    //load distinct familiys from db to arrayExisting
    taxonomies.distinct('taxonomyName',function(err, res){
      if(err) return cb(err);

      arrayExisting= res;
    });

    species.distinct('scientificName',function(err,res){
      if(err) return cb(err);
      arrayExistingScientificName = res;
    });

    taxonomies.find().toArray(function(err,res){
      if (err) {
        console.log(err);
      }
      jsonTaxonomies = res;
    });

    var url = './server/imports/'+nameCsv;

    csv()
  	.from.path(url, {delimiter : ";", columns: true })
  	.transform(function (row, index, cb) {

      var protocol = "http";
      var host = 'localhost';
      var port = "8000";
      var dir = "images/";

      var urlPhoto = protocol + "://" + host + ":" + port + "/" + dir + row.fotografia;
      row.urlPhoto = urlPhoto;

      //change , by . in latitude and longitude

      var longitude = row.decimalLongitude;
      var latitude = row.decimalLatitude;

      var newLongitude = longitude.replace(",",".");
      var newLatitude = latitude.replace(",",".");
      row.decimalLatitude = newLatitude;
      row.decimalLongitude = newLongitude;

      row.applications= appArray || [];

  		queue.push(row, function (err, res) { //meter en la cola para la bd
  			if (err) return cb(err);
  			cb(null, res[0]);
        //finds

        function findFamily(arrayExisting){
          return arrayExisting === row.family;
        }

        function findOrder(arrayExisting){
          return arrayExisting === row.order;
        }

        function findPhylum(arrayExisting){
          return arrayExisting === row.phylum;
        }

        function findGenus(arrayExisting){
          return arrayExisting === row.genus;
        }

        function findKingdom(arrayExisting){
          return arrayExisting === row.kingdom;
        }

        function findClass(arrayExisting){
          return arrayExisting === row.class;
        }

        function findscientificName(arrayExistingScientificName){
          return arrayExistingScientificName === row.scientificName;
        }

        function findIDTaxonomy(jsonTaxonomies){
          return jsonTaxonomies.taxonomyName === row.genus;
        }

        if (arrayExisting.find(findFamily) === undefined) { //taxonimy is not in existing array
          taxonomies.insert({taxonomyType : "family", taxonomyName : row.family.trim(), description : "example description", taxonomyPadre : row.order, urlPhoto : row.urlPhoto });
          arrayExisting.push(row.family);
          taxonomies.find().toArray(function(err,res){
            if (err) {
              console.log(err);
            }
            jsonTaxonomies = res;
          });
        }

        if (arrayExisting.find(findOrder) === undefined) { //family is not in existing array
          taxonomies.insert({taxonomyType : "order", taxonomyName : row.order.trim(), description : "example description", taxonomyPadre : row.class, urlPhoto : row.urlPhoto});
          arrayExisting.push(row.order);
        }

        if (arrayExisting.find(findPhylum) === undefined) { //family is not in existing array
          taxonomies.insert({taxonomyType : "phylum", taxonomyName : row.phylum.trim(), description : "example description", taxonomyPadre : row.kingdom, urlPhoto : row.urlPhoto});
          arrayExisting.push(row.phylum);
        }

        if (arrayExisting.find(findGenus) === undefined) { //family is not in existing array
          taxonomies.insert({taxonomyType : "genus", taxonomyName : row.genus.trim(), description : "example description", taxonomyPadre: row.family, urlPhoto : row.urlPhoto });
          arrayExisting.push(row.genus);
        }

        if (arrayExisting.find(findKingdom) === undefined) { //family is not in existing array
          taxonomies.insert({taxonomyType : "kingdom", taxonomyName : row.kingdom.trim(), description : "example description", taxonomyPadre : 0, urlPhoto : row.urlPhoto});
          arrayExisting.push(row.kingdom);
        }

       if (arrayExisting.find(findClass) === undefined) { //family is not in existing array
          taxonomies.insert({taxonomyType : "class", taxonomyName : row.class.trim(), description : "example description", taxonomyPadre : row.phylum, urlPhoto : row.urlPhoto});
          arrayExisting.push(row.class);
        }

        if (arrayExistingScientificName.find(findscientificName) === undefined ) {
          if (jsonTaxonomies.find(findIDTaxonomy) !== undefined) {
            species.insert({ idPadre: jsonTaxonomies.find(findIDTaxonomy).taxonomyName ,scientificName : row.scientificName, description : "example description", urlPhoto : row.urlPhoto, applications: [applicationName]});
            arrayExistingScientificName.push(row.scientificName);
          }
        }
  		});//push
  	})//transform
  	.on('error', function (err) {
  		console.log('ERROR: ' + err.message);
  	})
  	.on('end', function (count) {
  		console.log('Number of documents: '+count);
  	});
  });
}
export default procesaCsv;
