const fs = require('fs');
const path = require('path');

/**
 * Makes sure the file exists at 
 * /docs/:`req.params.slug`/preview/:`req.params.filename`
 * and returns an error if not
 */
module.exports.verifyFileExists = (req, res, next) => {
  const { slug, filename } = req.params;
  const filePath = path.join(__dirname, '../docs', slug, 'preview', filename);
  fs.exists(filePath, (exists) => {
    if(!exists) return res.status(404).send();
    next();
  })
}

/**
 * Takes the content at `req.body` and replaces the content of the file
 * at /docs/:`req.params.slug`/preview/:`req.params.filename`
 */
module.exports.updateFile = (req, res, next) => {
  const { slug, filename } = req.params;
  const content = req.body;
  const filePath = path.join(__dirname, '../docs', slug, 'preview', filename);
  fs.writeFile(filePath, content, (err) => {
    if(err) return res.status(500).send(err);
    next();
  })
}