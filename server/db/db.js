const Sqlite = require('sqlite3');
const db = new Sqlite.Database('ide_data.sqlite');
const fs = require('fs');
const path = require('path');

const bootstrap = fs.readFileSync(path.join(__dirname, '/bootstrap.sql'), 'utf8');

module.exports.init = (callback) => {
  db.run('SELECT * from projects', [], (err) => {
    if(err){
      console.log('Scaffolding new database');
      db.exec(bootstrap, (err2) => {
        if(!err2) return callback(null);
        return callback(err2);
      })
    }else{
      console.log('Database found, lets go!');
      return callback(null);
    }
  })
}

module.exports.run = (sql, bindParams, callback) => {
  db.run(sql, bindParams, callback);
}

module.exports.select = (sql, bindParams, callback) => {
  db.all(sql, bindParams, callback);
}