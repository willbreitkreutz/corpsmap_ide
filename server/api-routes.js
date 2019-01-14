const express = require('express');
const router = express.Router();
const db = require('./db/db');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const fileController = require('./controllers/file-controller');

router.get('/projects', (req, res) => {
  const sql = 'SELECT * from projects';
  db.select(sql, [], (err, data) => {
    if(err){
      res.status(500).send(err);
    }else{
      res.status(200).json(data);
    }
  })
})

router.post('/projects/:projectId/publish', (req, res) => {
  const previewPath = path.join(__dirname, '/docs', req.params.projectId, 'preview');
  const publishPath = path.join(__dirname, '/docs', req.params.projectId);
  fs.readdir(previewPath, (err, files) => {
    if(err) return res.status(500).send(err);
    files.forEach((file) => {
      fs.copyFileSync(path.join(previewPath, file), path.join(publishPath, file));
    })
    res.status(200).send();
  })
})

router.post('/files/:projectId/:filename', (req, res) => {
  const { projectId, filename } = req.params;
  const folderpath = path.join(__dirname, '/docs', projectId, 'preview');
  const filepath = path.join(__dirname, '/docs', projectId, 'preview', filename);
  if(!fs.existsSync(folderpath)) mkdirp.sync(folderpath);
  const newFile = !fs.existsSync(filepath);
  const content = req.body;
  fs.writeFile(filepath, content, (err) => {
    if(err){
      res.status(500).send(err);
    }else{
      if(newFile){
        fileController.create({
          $projectId: projectId,
          $filename: filename
        }, (err, newId) => {
          return res.status(201).json({
            id: newId
          })
        })
      }else{
        fileController.update({
          $projectId: projectId,
          $filename: filename
        }, (err, newId) => {
          return res.status(200).json({
            id: newId
          })
        })
      }
    }
  })
})


module.exports = router;