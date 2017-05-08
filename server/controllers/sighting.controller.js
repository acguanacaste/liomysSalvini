import Sighting from '../models/sighting';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto';


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
/*export function getSightingsbyToken(req, res){
  let encrypToken = req.params.token;
  let appName = req.params.appName;
  let decrypToken = crypto.createHmac('sha1', appName).update(text).digest('hex');
}
*/
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
  const request = {scientificname : req.params.specie}

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
