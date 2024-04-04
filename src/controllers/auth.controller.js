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
          const token = jwt.sign({ id: user[0].id }, jwtconfig.secret);
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

      //updated fields - deconstruction
      const { username, email, password } = req.body;
      console.log("Username: " + username);
      console.log("Email: " + email);
      console.log("Password: " + password);

      const updates = [];
      if (username) updates.push({ field: "username", value: username });
      if (email) updates.push({ field: "email", value: email });
      if (password) {
        const passwordHash = bcrypt.hashSync(password);
        updates.push({ field: "password", value: passwordHash });
      }
      //this promise waits for the fields to update
      Promise.all(
        updates.map((updated) => {
          return new Promise((resolve, reject) => {
            con.query(
              authQueries.UPDATE_USER,
              [updated.value, updated.value, updated.value, req.user.id],
              function (err, result) {
                if (err) {
                  console.log(err);
                  reject(`Could not update ${updated.field}.`);
                } else {
                  resolve();
                }
              }
            );
          });
        })
      )
        .then(() => {
          res.json({ msg: "Updated successfully!" });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .send({ msg: "An error occurred while updating user." });
        });
    }
  );
};

exports.deleteUser = function (req, res) {
  const userId = req.user.id;
  con.query(authQueries.DELETE_USER, [userId], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Could not delete user." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ msg: "User not found." });
    }
    res.json({ msg: "User deleted successfully!" });
  });
};
