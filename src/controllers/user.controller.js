const bcrypt = require("bcryptjs");
const mysql = require("mysql");

const connection = require("../db-config");
const query = require("../utils/query");
const {
  GET_USER_BY_ID,
  GET_USER_BY_ID_WITH_PASSWORD,
  UPDATE_USER,
  DELETE_USER,
} = require("../queries/user.queries");
const { serverError } = require("../utils/handlers");

exports.getUser = async (req, res) => {
  // verify valid token
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  // take result of middleware check
  if (decoded.id) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const user = await query(con, GET_USER_BY_ID(decoded.id)).catch(
      serverError(res)
    );

    if (!user.length) {
      res.status(400).send({ msg: "No user found." });
    }
    res.json(user);
  }
};

const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    // [name, status].map()
    (key) => `${key} = ${mysql.escape(body[key])}` // 'New 1 drink name'
  );

  // values.push(`created_date = NOW()`); // update current date and time
  values.join(", "); // make into a string
  return values;
};

// THIS NEEDS WORK IN THE FUTURE
exports.updateUser = async function (req, res) {
  // establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });

  const values = _buildValuesString(req);

  console.log("req.user: " + req.user.id);

  const eUserName = mysql.escape(req.user.id);

  // Check for existing user first
  const user = await query(
    con,
    GET_USER_BY_ID_WITH_PASSWORD(req.user.id)
  ).catch(serverError(res));

  console.log("USER : " + user[0]);
  console.log("USER 2: " + eUserName);

  const passwordUnchanged = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch((err) => {
      res.json(500).json({ msg: "Invalid password!" });
    });

  if (!passwordUnchanged) {
    const passwordHash = bcrypt.hashSync(req.body.password);
    console.log("USER ID???: " + user[0].id);

    // Perform update
    const result = await query(
      con,
      UPDATE_USER(values, passwordHash, user[0].id)
    ).catch(serverError(res));

    if (result.affectedRows === 1) {
      res.json({ msg: "Updated succesfully!" });
    }
    res.json({ msg: "Nothing to update..." });
  }
};

// NEEDS WORK
exports.deleteUser = async function (req, res) {
  // verify valid token
  const decoded = req.user; // {id: 1, iat: wlenfwekl, expiredIn: 9174323 }

  console.log("THIS IS DECODED: " + decoded);
  // console.log("THIS IS userId: " + req.user.id);
  console.log("THIS IS req: " + req.user.id);

  // take result of middleware check
  if (decoded.id) {
    // establish a connection
    const con = await connection().catch((err) => {
      throw err;
    });

    const user = await query(con, DELETE_USER(decoded.id)).catch(
      serverError(res)
    );

    if (!user.length) {
      res.status(400).send({ msg: "No user found." });
    }
    res.json(user);
  }
};
