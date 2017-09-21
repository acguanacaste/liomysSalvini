import Application from '../models/application';
import Specie from '../models/specie';
import jsonChecksum from 'json-checksum';
import checksum from 'checksum';
import sanitizeHtml from 'sanitize-html';
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

export function addApp(req, res) {
  if (!req.body.app.name || !req.body.app.decrypToken || !req.body.app.description) {
    res.status(403).end();
  }

  const newApp = new Application(req.body.app);

  // Let's sanitize inputs
  newApp.name = sanitizeHtml(newApp.name);
  newApp.decrypToken = sanitizeHtml(newApp.decrypToken);
  newApp.description = sanitizeHtml(newApp.description);

  newApp.save().then(function(saved){
    res.json({ app: saved });
  },function(err){
    if(err)
      res.send(err);
  });
}
