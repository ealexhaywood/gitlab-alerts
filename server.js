const uWS = require('uWebSockets.js');
const port = 3005;
const util = require('util');
const config = require('./config');

let app;
if (config.ssl.enabled) {
  app = uWS.SSLApp({
    key_file_name: config.ssl.key_file_name,
    cert_file_name: config.ssl.cert_file_name,
    passphrase: config.ssl.passphrase
  });
} else {
  app = uWS.App({});
}

app
  .post('/alerts', (res, req) => {
    /* Note that you cannot read from req after returning from here */
    const url = req.getUrl();

    /* Read the body until done or error */
    readJson(
      res,
      async alerts => {
        console.debug('Posted to ' + url + ': ');
        console.debug(
          util.inspect(alerts, { showHidden: true, depth: null, colors: true })
        );

        /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
        await sendToGitLab(alerts);

        /* If we were aborted, you cannot respond */
        if (!res.aborted) {
          res.end(JSON.stringify(alerts));
        }
      },
      () => {
        /* Request was prematurely aborted or invalid or missing, stop reading */
        res.aborted = true;
        console.error('Invalid JSON or no data at all!');
      }
    );
  })
  .listen(port, token => {
    if (token) {
      console.log('Listening to port ' + port);
    } else {
      console.error('Failed to listen to port ' + port);
    }
  });

/* Helper function for reading a posted JSON body */
const readJson = (res, cb, err) => {
  let buffer;
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab);
    if (!isLast) {
      if (buffer) {
        buffer = Buffer.concat([buffer, chunk]);
      } else {
        buffer = Buffer.concat([chunk]);
      }
    } else {
      let json;
      if (buffer) {
        try {
          json = JSON.parse(Buffer.concat([buffer, chunk]));
        } catch (e) {
          /* res.close calls onAborted */
          res.close();
          return;
        }
        cb(json);
      } else {
        try {
          json = JSON.parse(chunk);
        } catch (e) {
          /* res.close calls onAborted */
          res.close();
          return;
        }
        cb(json);
      }
    }
  });

  /* Register error cb */
  res.onAborted(err);
};

const sendToGitLab = async alerts => {
  const alertsArray = alerts.alerts;
  alertsArray.forEach(alert => {
    // Create issues in gitlab
  });
};
