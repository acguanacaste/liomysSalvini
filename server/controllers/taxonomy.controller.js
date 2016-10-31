import Taxonomy from '../models/taxonomy';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function getTaxonomy(req, res) {

    Taxonomy.find().exec((err, taxonomys) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ taxonomys });
    });
    
}
