const jwt = require("jsonwebtoken");
const con = require("../db-config");
const jwtconfig = require("../jwt-config");
const queries = require("../queries/user.queries");

exports.getUser = function (req, res) {
  const token = req.headers["auth-token"];

  if (!token) {
    //stop user auth validation
    res.status(401).send({ auth: false, msg: "No token provided." });
  }

  jwt.verify(token, jwtconfig.secret, function (err, decoded) {
    if (err) {
      res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }

    con.query(queries.GET_USER_BY_ID, [decoded.id], function (err, user) {
      if (err) {
        res.status(500).send({ msg: "Could not find the user." });
      }
      if (!user) {
        res.status(400).send({ msg: "User does not exist." });
      }
      res.status(200).send(user);
    });
  });
};