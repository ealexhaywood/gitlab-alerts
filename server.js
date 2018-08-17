const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3005;

app.use(bodyParser.json())

app.post('/alerts', (req, res) => {
  let alerts = req.body;
  // Do stuff with alerts

  res.status(200).send(alerts);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
