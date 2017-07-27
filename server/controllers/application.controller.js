import Application from '../models/application';
import Specie from '../models/specie';
import jsonChecksum from 'json-checksum';
import checksum from 'checksum';
var crypto = require('crypto');

export function getSomething(req, res) {
  return res.status(200).end();
}

export function getApplications(req ,res){
  Application.find().exec((err, apps) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ apps });
  });
}

export function getApplication(req, res){
  Application.findOne({name:req.params.appName}).exec((err, app)=>{
    if(err){
      res.status(500).send(err);
    }
    res.json({app});
  });
}

export function checkAppState(req, res){
  Application.findOne({name:req.params.appName}).exec((err, app)=>{
    if(err){
      res.status(500).send(err);
    }else{
      if(app !== null){
        Specie.find({ applications : {$in: [req.params.appName]} }).exec((err, specie) => {
          if (err) {
            res.status(500).send(err);
          }
          let jsonChecked = jsonChecksum(specie);
          let responseCheck = checksum(jsonChecked);

          res.send(responseCheck);
        });
      }else res.send("unAuthorized App");
    }
  });
}
