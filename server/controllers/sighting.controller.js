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
    Sighting.find().exec((err, responseResult) => {
      if (err) {
        res.status(500).send(err);
      }
      var responseHeader = {totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
      res.json({ responseHeader , responseResult });
    });
    //res.json({ posts });

}
