const express = require("express");
const logger = require("morgan");
const parser = require("body-parser");
const barRoutes = require("./routes/drinks.routes");
const midware = require("./middleware/errors.middleware");

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";

//middleware to log server reqs to console
app.use(logger(logLevel));

//middleware - parses incoming reqs data (https://github.com/express.js/body-parser)
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

//Route Handling Middleware Fx's

//handle routes for tasks
app.use("/bar", barRoutes); //http://localhost/3000/bar

//handle 404 reqs
app.use(midware.error404);

//handle 500 reqs - applies to live services
app.use(midware.error500);

//listen on server port
app.listen(port, () => {
  console.log(`Running on port: ${port} ...`);
});
