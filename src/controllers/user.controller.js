const bcrypt = require("bcryptjs");

const connection = require("../db-config");
const query = require("../utils/query");
const {
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_PASSWORD,
  UPDATE_USER,
} = require("../queries/user.queries");

exports.getUser = async (req, res) => {
  // verify valid token
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (decoded.id) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const user = await query(con, GET_USER_BY_ID, [decoded.id]).catch((err) => {
      res.status(500).send({ msg: "Could not find the user." });
    });

    if (!user.length) {
      res.status(400).send({ msg: "No user found." });
    }
    res.status(200).send(user);
  }
};

exports.updateUser = async function (req, res) {
  // establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check for existing user first
  const user = await query(con, GET_USER_BY_ID_WITH_PASSWORD, [
    req.user.id,
  ]).catch((err) => {
    res.status(500);
    res.send({ msg: "Could not retrieve user." });
  });

  // checked for password changed
  // SAME LOGIC AS CHECKING FOR A VALID PASSWORD
  const passwordUnchanged = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch((err) => {
      res.json(500).json({ msg: "Invalid password!" });
    });

  if (!passwordUnchanged) {
    const passwordHash = bcrypt.hashSync(req.body.password);

    // perform update
    const result = await query(con, UPDATE_USER, [
      req.body.username,
      req.body.email,
      passwordHash,
      user[0].id,
    ]).catch((err) => {
      res.status(500).send({ msg: "Could not update user settings." });
    });

    if (result.affectedRows === 1) {
      res.json({ msg: "Updated succesfully!" });
    }
    res.json({ msg: "Nothing to update..." });
  }
};
//* IN PROGRESS: THIS IS DELETE BY ID (WHAT IF USER DELETES PROFILE?) */
exports.deleteUser = async function (req, res) {
  const con = await connection().catch((err) => {
    throw err;
  });
  //using delete by id here....BUT I am deleting by id
  const result = await query(con, DELETE_USER, [req.user.id]).catch((err) => {
    res.status(500).send({ msg: "Could not delete user." });
  });

  if (result.affectedRows === 1) {
    res.json({ msg: "User deleted successfully!" });
  } else {
    res.status(200).json({ msg: "User not found." });
  }
};
