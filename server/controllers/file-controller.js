const db = require('../db/db');

const create = (options, callback) => {
  const sql = `insert into files (project_id, filename, last_saved)
               values($projectId, $filename, $lastsaved)`;
  const bindParams = {
    $projectId: options.$projectId,
    $filename: options.$filename,
    $lastsaved: new Date()
  }
  db.run(sql, bindParams, (err) => {
    return callback(err, this.lastId);
  })
}

//NOT WORKING>>>>
const update = (options, callback) => {
  const sql = `update files set last_saved = $lastsaved
               where project_id = $project_id and filename = $filename`;
  const bindParams = {
    $projectId: options.$projectId,
    $filename: options.$filename,
    $lastsaved: new Date()
  }
  db.run(sql, bindParams, (err) => {
    return callback(err, this.lastId);
  })
}

module.exports.create = create;
module.exports.update = update;