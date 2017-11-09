import Sighting from '../models/sighting';
import Application from '../models/application';
import ApplicationController from './application.controller';
import async from 'async';
import sanitizeHtml from 'sanitize-html';
var crypto = require('crypto');
import procesaCsv from '../../server/csv';

//const encrypToken = '861decbabda7081b2215eb';



export function getSomething(req, res) {
  return res.status(200).end();
}

// Get all sightings
export function getSightings(req, res) {
    //var posts = "";
    //console.log("Aqui van las observaciones");
    Sighting.find().exec((err, responseResult) => {
      if (err || responseResult === null ) {
        res.status(500).send(err);
      }else{
        var responseHeader = {totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
        res.json({ responseHeader, responseResult });
      }
    });
    //res.json({ posts });
}

// Get all sightings with token
export function getSightingsbyToken(req, res){
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
        Sighting.find().exec((err, responseResult) => {
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

// Get one sighting by catalogNumber
export function getSighting(req, res) {
  Sighting.findOne({ catalogNumber : req.params.request }).exec((err, responseResult) => {
    if (err) {
      res.status(500).send(err);
    }
    var responseHeader = { totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
    res.json({ responseHeader, responseResult });
  });
}

// Get sightings by specie
export function getSightingsSpecie(req,res){
  const request = {scientificName : req.params.specie}

  Sighting.find(request).exec((err,responseResult) => {
    if (err || responseResult === null) {
      res.status(500).send(err);
    }else {
      const responseHeader = { totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
      res.json({responseHeader, responseResult});
    }
  });
}

//Get sightings by Genus
export function getSightingsGenus(req,res){
  const request = { genus : req.params.genus }

  Sighting.find(request).exec((err, responseResult) => {
    if(err || responseResult === null){
      res.status(500).send(err);
    }else{
      const responseHeader = { totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
      res.json({responseHeader, responseResult});
    }
  });
}

//Get sightings by family
export function getSightingsFamily(req, res){
  const request = { family : req.params.family }

  Sighting.find(request).exec((err,responseResult)=>{
    if(err || responseResult === null ){
      res.status(500).send(err);
    }else {
      const responseHeader = { totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
      res.json({responseHeader, responseResult});
    }
  });
}

export function runCsv(req,res){
  procesaCsv(req.body.nameCsv,req.bodyappName);
  res.json({ Result: "OK" });
}
