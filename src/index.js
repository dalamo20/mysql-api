const express = require("express");
const logger = require("morgan");
const parser = require("body-parser");
const ordersRoutes = require("./routes/orders.routes");
const drinksRoutes = require("./routes/drinks.routes");
const midware = require("./middleware/errors.middleware");

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || "dev";

//middleware to log server reqs to console
app.use(logger(logLevel));

//middleware - parses incoming reqs data (https://github.com/express.js/body-parser)
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

//handle routes for the bar
app.use("/drinks", drinksRoutes); //http://localhost/3000/drinks
app.use("/orders", ordersRoutes); //http://localhost/3000/orders

//handle 404 reqs
app.use(midware.error404);

//handle 500 reqs - applies to live services
app.use(midware.error500);

//listen on server port
app.listen(port, () => {
  console.log(`Running on port: ${port} ...`);
});
