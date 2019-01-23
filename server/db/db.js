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

module.exports.insertAsync = function(sql, bindParams){
  const _this = this;
  return new Promise(function(resolve, reject){
    _this.run(sql, bindParams, function(err){
      if(err){
        reject(err);
      }else{
        resolve(this.lastID);
      }
    })
  })
}

module.exports.runAsync = function(sql, bindParams){
  const _this = this;
  return new Promise(function(resolve, reject){
    _this.run(sql, bindParams, function(err, result){
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  })
}

module.exports.select = (sql, bindParams, callback) => {
  db.all(sql, bindParams, callback);
}

module.exports.selectAsync = function(sql, bindParams){
  var that = this;
  return new Promise(function(resolve, reject){
    that.select(sql, bindParams, function(err, rows){
      if(err){
        reject(err);
      }else{
        resolve(rows);
      }
    })
  })
}

module.exports.get = (sql, bindParams, callback) => {
  db.get(sql, bindParams, callback);
}

module.exports.getAsync = function(sql, bindParams){
  var that = this;
  return new Promise(function(resolve, reject){
    that.get(sql, bindParams, function(err, row){
      if(err){
        reject(err);
      }else{
        resolve(row);
      }
    })
  })
}