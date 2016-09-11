import Observacion from '../models/observacion';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';


export function getSomething(req, res) {
  return res.status(200).end();
}


export function getObservacion(req, res) {
    var posts = "";
    console.log("Aqui van las observaciones");
    res.json({ posts });

}
