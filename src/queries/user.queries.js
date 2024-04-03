exports.GET_USER_BY_ID = `SELECT id, username, email FROM users WHERE id = ?`;

exports.GET_USER_BY_USERNAME = `SELECT id, username, email FROM users WHERE username = ?`;

exports.GET_USER_BY_ID_WITH_PASSWORD = `SELECT * FROM users WHERE id = ?`;

exports.GET_USER_BY_USERNAME_WITH_PASSWORD = `SELECT * FROM users WHERE username = ?`;
