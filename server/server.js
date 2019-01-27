const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = process.env.API_PORT;
const apiRoutes = require('./api-routes-v1');
const db = require('./db/db');

const app = express();

app.use(cors());
app.use(bodyParser.json({
  type:'application/json'
}));
app.use(bodyParser.text({
  type:'text/*'
}))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} from ${req.ip}`);
  next();
})

app.use('/ide', express.static(path.join(__dirname, '../', 'client', 'build')));

app.use('/api/v1', apiRoutes)
app.use('/apps', express.static(path.join(__dirname, '/docs')));

db.init((err) => {
  if(!err){
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
  }else{
    console.log('something went wrong', err)
  }
})
