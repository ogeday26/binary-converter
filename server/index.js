const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

app.post('/file', (req, res, next) => {
  res.status(200).json('writed');
});


const server = app.listen(3000, () => {
  console.log('Binary converter Rest Service listening at port %s', server.address().port);
});