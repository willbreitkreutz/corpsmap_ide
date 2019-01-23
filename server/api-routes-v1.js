const express = require('express');
const router = express.Router();
const projectMiddleware = require('./controllers/project-middleware');

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
 * Creates a new file for a project with a filename at `req.body.filename`
 */
router.put('/projects/:slug/:filename', 
  projectMiddleware.verifyProjectExists,
  projectMiddleware.createNewFile,
  (req, res) => {
    res.status(200).send();
  }
)

module.exports = router;