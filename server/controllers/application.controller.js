import Application from '../models/application';

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
