const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const PORT = process.env.API_PORT;
const apiRoutes = require('./api-routes');
const db = require('./db/db');

const app = express();

app.use(bodyParser.json({
  type:'application/json'
}));
app.use(bodyParser.text({
  type:'text/*'
}))

app.use((req, res, next) => {
  console.log(req.path);
  next();
})

app.use('/ide', express.static(path.join(__dirname, '../', 'client', 'build')));

app.use('/api/data', apiRoutes);
app.use('/api/docs', express.static(path.join(__dirname, '/docs')));

db.init((err) => {
  if(!err){
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
  }else{
    console.log('something went wrong', err)
  }
})
