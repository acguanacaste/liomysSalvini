import Sighting from '../models/sighting';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';


export function getSomething(req, res) {
  return res.status(200).end();
}


export function getSighting(req, res) {
    //var posts = "";
    //console.log("Aqui van las observaciones");
    Sighting.find().exec((err, sightings) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ sightings });
    });
    //res.json({ posts });

}
