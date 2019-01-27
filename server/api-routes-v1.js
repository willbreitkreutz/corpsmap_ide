const express = require('express');
const router = express.Router();
const projectMiddleware = require('./controllers/project-middleware');
const fileMiddleware = require('./controllers/file-middleware');

/**
 * Gets a list of all projects
 */
router.get('/projects', 
  projectMiddleware.selectAll,
  (req, res) => {
    res.status(200).json(req.projects);
  }
)

/**
 * Gets a list of available project types
 */
router.get('/projects/types',
  projectMiddleware.selectAllTypes,
  (req, res) => {
    res.status(200).json(req.projectTypes);
  }
)

/**
 * Saves a new Project, requires `req.body.projectType` and `req.body.projectName`
 */
router.post('/projects',
  projectMiddleware.createSlug,
  projectMiddleware.saveNew,
  projectMiddleware.scaffoldProject,
  projectMiddleware.selectOne,
  (req, res) => {
    res.status(200).json(req.project);
  }
)

/**
 * Gets the project information including a list of files for a specific project by slug
 */
router.get('/projects/:slug',
  projectMiddleware.selectOneBySlug,
  projectMiddleware.selectProjectFiles,
  (req, res) => {
    req.project.files = req.files;
    res.status(200).json(req.project);
  }
)

/**
 * Get a list of files for a given project slug
 */
router.get('/projects/:slug/files',
  projectMiddleware.selectProjectFiles,
  (req, res) => {
    res.status(200).json(req.files);
  }
)

/**
 * Creates a new file for a project with a filename at `req.params.filename`
 */
router.post('/projects/:slug/:filename', 
  projectMiddleware.verifyProjectExists,
  projectMiddleware.createNewFile,
  (req, res) => {
    res.status(200).send();
  }
)

/**
 * Update content of a file with content provided as `req.body`
 */
router.put('/projects/:slug/:filename',
  projectMiddleware.verifyProjectExists,
  fileMiddleware.verifyFileExists,
  fileMiddleware.updateFile,
  (req, res) => {
    res.status(201).send();
  }
)

module.exports = router;