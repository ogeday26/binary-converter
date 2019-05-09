const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

app.post('/file', (req, res, next) => {
  fs.writeFile("output.json", JSON.stringify(req.body), 'utf8', (err) => {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    res.status(200).json('writed');
  });
});


const server = app.listen(3000, () => {
  console.log('Binary converter Rest Service listening at port %s', server.address().port);
});