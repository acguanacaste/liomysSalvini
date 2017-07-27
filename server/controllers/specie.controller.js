import Specie from '../models/specie';
import Application from '../models/application'
var crypto = require('crypto');

export function getSomething(req, res) {
  return res.status(200).end();
}

//Get all species
export function getSpecies(req, res) {

    Specie.find().exec((err, responseResult) => {
      if (err) {
        res.status(500).send(err);
      }
      var responseHeader = {totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
      res.json({ responseHeader, responseResult });
    });
}//getSpecies

//Get one specie by scientificName
export function getSpecie(req, res) {
  Specie.findOne({ scientificName : req.params.request }).exec((err, responseResult) => {
    if (err) {
      res.status(500).send(err);
    }
    var responseHeader = { totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
    res.json({ responseHeader, responseResult });
  });
}//getSpecie

//Get specie by Token and AppState
export function getSpeciesbyToken(req,res){
  var algorithm = 'aes-256-ctr',
      key = '590790c8ec09149e93b34e1';

  var encrypToken = req.params.token;
  var appName = req.params.appName;
  var decrypToken;

  //var application;
  Application.findOne({name: appName},function cb(err, app){
    if(app != undefined){
      key = app._id;
      const decipher = crypto.createDecipher(algorithm,key);
      decrypToken = decipher.update(encrypToken,'hex','utf8');
      decrypToken += decipher.final('utf8');
      if(decrypToken == app.decrypToken){
        Specie.find().exec((err, responseResult) => {
          if (err || responseResult === null ) {
            res.status(500).send(err);
          }else{
            var responseHeader = {totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
            res.json({ responseHeader, responseResult });
          }
        });
      }else{
        res.send("Application");
      }
    }else{
      res.status(500).send("Application unAuthorized");
    }
  });
}
