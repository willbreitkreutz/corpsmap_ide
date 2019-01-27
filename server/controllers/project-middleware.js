const db = require('../db/db');
const slugs = require('slugs');
const fs = require('fs');
const path = require('path');
const asyncLib = require('async');
const mkdirp = require('mkdirp');

/**
 * These are the project types that we will accept, they have to have a template folder
 * inside `../template-projects` corresponding to their name.
 */
const projectTypes = ['corpsmap-argon','empty','leaflet-basic'];

/**
 * Verifies that a project exists with a given `req.params.slug` by checking the database as
 * well as the file system.
 */
module.exports.verifyProjectExists = (req, res, next) => {
  const previewPath = path.join(__dirname, '../docs', req.params.slug, 'preview');
  fs.exists(previewPath, async (exists) => {
    if(!exists) return res.status(404).send();
    const sql = `select * from projects where slug = $slug`;
    const bindParams = {
      $slug: req.params.slug
    }
    const rows = await db.selectAsync(sql, bindParams);
    if(!rows.length) return res.status(404).send();
    next();
  })
}

/**
 * Selects all available project types and adds them to `req.projectTypes` as an array.
 */
module.exports.selectAllTypes = (req, res, next) => {
  req.projectTypes = projectTypes;
  next();
}

/**
 * Selects all projects from the projects table
 * Returns projects as an array on the request object at `req.projects`
 */
module.exports.selectAll = async (req, res, next) => {
  const sql = `select * from projects`;
  const bindParams = {};
  const rows = await db.selectAsync(sql, bindParams);
  req.projects = rows;
  next();
}

/**
 * Selects a project by id using `req.project.id` and adds the result to `req.project`
 * replacing any existing data there.
 */
module.exports.selectOne = async (req, res, next) => {
  const sql = `select * from projects where id = $id`;
  const bindParams = {
    $id: req.project.id
  };
  const row = await db.getAsync(sql, bindParams);
  req.project = row;
  next();
}

/**
 * Selects a project by slug using `req.params.slug` and adds the result to
 * `req.project` replacing any data there.
 */
module.exports.selectOneBySlug = async (req, res, next) => {
  const sql = `select * from projects where slug = $slug`;
  const bindParams = {
    $slug: req.params.slug
  };
  const row = await db.getAsync(sql, bindParams);
  req.project = row;
  next();
}

/**
 * Creates a new unique slug for the project based on `req.body.projectName`
 * Returns the new slug as a string at `req.slug`
 */
module.exports.createSlug = async (req, res, next) => {
  let slug = slugs(req.body.projectName);
  const likeSlugs = await db.selectAsync(`select id from projects where slug like $slug`, {$slug: `${slug}%`});
  if(likeSlugs.length){
    slug = `${slug}-${likeSlugs.length + 1}`;
  }
  req.slug = slug;
  next();
}

/**
 * Creates a new project record, expects a string for the slug at `req.slug`
 * `projectMiddleware.createSlug` should be called before this method.
 * Adds the new ID for the created project to `req.project.id`
 */
module.exports.saveNew = async (req, res, next) => {
  const sql = `insert into projects (name, slug, last_published) values($name, $slug, $lastPublished)`;
  const bindParams = {
    $name: req.body.projectName,
    $slug: req.slug,
    $lastPublished: new Date()
  };
  const newId = await db.insertAsync(sql, bindParams);
  req.project = {
    id: newId
  }
  next();
}

/**
 * Creates all the files for a new project based on the `req.body.projectType` attribute
 * supplied by the client. Calls next when complete.
 */
module.exports.scaffoldProject = async (req, res, next) => {
  if(projectTypes.indexOf(req.body.projectType) === -1) return next('bad project type');
  const templatePath = path.join(__dirname, '../template-projects', req.body.projectType);
  const previewPath = path.join(__dirname, '../docs', req.slug, 'preview');
  if(!fs.existsSync(previewPath)) mkdirp.sync(previewPath);
  const fns = [];
  fs.readdir(templatePath, (err, files) => {
    if(err) return next(err);
    files.forEach((file) => {
      const out = path.join(previewPath, file)
      fns.push((callback) => {
        fs.copyFile(path.join(templatePath, file), out, callback);
      })
    })
    asyncLib.parallel(fns, (copyerr) => {
      next(copyerr);
    })
  })
}

/**
 * Gets a list of files included in the /preview folder for a project expecting to find
 * the project slug at `req.params.slug` adding the names of the files to `req.files`.
 */
module.exports.selectProjectFiles = async (req, res, next) => {
  const previewPath = path.join(__dirname, '../docs', req.params.slug, 'preview');
  fs.readdir(previewPath, (err, files) => {
    req.files = files;
    next();
  })
}

/**
 * Creates a new file in the preview path of the project at `req.params.slug` with the filename
 * of `req.params.filename`, returns a 500 if the file already exists.
 */
module.exports.createNewFile = (req, res, next) => {
  const previewPath = path.join(__dirname, '../docs', req.params.slug, 'preview');
  const filePath = path.join(previewPath, req.params.filename);
  fs.exists(filePath, (exists) => {
    if(exists) return res.status(500).send('File already exists');
    fs.writeFile(filePath, '', (err) => {
      if(err) res.status(500).send(err);
      return next();
    })
  })
}