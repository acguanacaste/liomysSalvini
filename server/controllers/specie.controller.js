import Specie from '../models/specie';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function getSpecie(req, res) {

    Specie.find().exec((err, species) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ species });
    });

}
