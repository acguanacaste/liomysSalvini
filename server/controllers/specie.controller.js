import Specie from '../models/specie';

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
