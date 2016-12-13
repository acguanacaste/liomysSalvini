import Taxonomy from '../models/taxonomy';

export function getSomething(req, res) {
  return res.status(200).end();
}
//Get all taxonomies
export function getTaxonomys(req, res) {

    Taxonomy.find().exec((err, responseResult) => {
      if (err) {
        res.status(500).send(err);
      }
      var responseHeader = {totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
      res.json({ responseHeader, responseResult });
    });
}//getSTaxonomys

//Get one Taxonomy by taxonomyName
export function getTaxonomy(req, res) {
  Taxonomy.findOne({ taxonomyName : req.params.request }).exec((err, responseResult) => {
    if (err) {
      res.status(500).send(err);
    }
    var responseHeader = { totalresults : Object.keys(responseResult).length, start : 0 , end : Object.keys(responseResult).length};
    res.json({ responseHeader, responseResult });
  });
}//getTaxonomy
