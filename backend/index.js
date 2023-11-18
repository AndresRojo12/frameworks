const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.APP_PORT || 3005;

/* `app.use(express.json());` is a middleware function that parses incoming requests with JSON
payloads. It allows the server to handle JSON data sent in the request body. This middleware adds a
`body` property to the `request` object, containing the parsed JSON data. */
app.use(express.json());

/* This code is setting up CORS (Cross-Origin Resource Sharing) configuration for the Express server. */
const whitelist = (process.env.CORS_WHITELIST || '[]');
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Unauthorized origin"));
    }
  },
}
/* `app.use(cors(options));` is setting up CORS (Cross-Origin Resource Sharing) configuration for the
Express server. CORS is a mechanism that allows resources (e.g., APIs) on a web page to be requested
from another domain outside the domain from which the resource originated. */
app.use(cors(options));
require ("./utils/auth")

routerApi(app);

/* The code `app.use(logErrors); app.use(ormErrorHandler); app.use(boomErrorHandler);
app.use(errorHandler);` is setting up error handling middleware functions for the Express server. */
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


/* `app.listen(port, () => { console.log('Mi puerto' +  port); });` is starting the Express server and
listening for incoming requests on the specified port. */
app.listen(port, () => {
  console.log('Mi puerto' +  port);
});
