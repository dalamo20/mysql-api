const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const con = require("../db-config");
const jwtconfig = require("../jwt-config");
const authQueries = require("../queries/auth.queries");
const userQueries = require("../queries/user.queries");

exports.registerUser = function (req, res) {
  const passwordHash = bcrypt.hashSync(req.body.password);
  con.query(
    authQueries.INSERT_NEW_USER,
    [req.body.username, req.body.email, passwordHash],
    function (err, user) {
      //if error - stop registration
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "Could not register user." });
      }

      //perform registration
      con.query(
        userQueries.GET_USER_BY_USERNAME,
        [req.body.username],
        function (err, user) {
          if (err) {
            res.status(500).send({ msg: "Could not retrieve user." });
          }
          console.log(user);
          res.json(user);
        }
      );
    }
  );
};

exports.login = function (req, res) {
  //check user exist
  con.query(
    userQueries.GET_USER_BY_USERNAME_WITH_PASSWORD,
    [req.body.username],
    function (err, user) {
      if (err) {
        console.log(err);
        res.status(500).send({ msg: "Could not register user." });
      }
      console.log(user);
      //validate entered password with saved password in db
      bcrypt
        .compare(req.body.password, user[0].password)
        .then(function (validPass) {
          if (!validPass) {
            res.status(400).send({ msg: "Invalid password!" });
          }
          //create token
          const token = jwt.sign({ id: user[0].user_id }, jwtconfig.secret);
          res
            .header("auth-token", token)
            .send({ auth: true, msg: "Logged in!" });
        })
        .catch(console.log);
    }
  );
};

exports.updateUser = function (req, res) {
  con.query(
    userQueries.GET_USER_BY_ID_WITH_PASSWORD,
    [req.user.id],
    function (err, user) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Could not retrieve user." });
      }

      if (!user) {
        return res.status(404).send({ msg: "User not found." });
      }

      // Extract updated fields from the request body
      const { username, email, password } = req.body;

      // Perform separate update operations for username, email, and password
      const updates = [];
      if (username) updates.push({ field: "username", value: username });
      if (email) updates.push({ field: "email", value: email });
      if (password) {
        const passwordHash = bcrypt.hashSync(password);
        updates.push({ field: "password", value: passwordHash });
      }

      // Execute update queries for each field
      updates.forEach((update) => {
        con.query(
          authQueries.UPDATE_USER_FIELD,
          [update.value, update.field, req.user.id],
          function (err, result) {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send({ msg: `Could not update ${update.field}.` });
            }
          }
        );
      });

      res.json({ msg: "Updated successfully!" });
    }
  );
};

exports.deleteUser = function (req, res) {
  // Extract user ID from request parameters or JWT token
  const userId = req.user.id;

  // Perform delete operation
  con.query(authQueries.DELETE_USER, [userId], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Could not delete user." });
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).send({ msg: "User not found." });
    }

    // Return success message
    res.json({ msg: "User deleted successfully!" });
  });
};
