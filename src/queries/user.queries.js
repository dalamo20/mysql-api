exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
)`;

exports.GET_USER_BY_ID = `SELECT id, username, email FROM users WHERE id = ?`;

exports.GET_USER_BY_USERNAME = `SELECT id, username, email FROM users WHERE username = ?`;

exports.GET_USER_BY_ID_WITH_PASSWORD = `SELECT * FROM users WHERE id = ?`;

exports.GET_USER_BY_USERNAME_WITH_PASSWORD = `SELECT * FROM users WHERE username = ?`;

exports.INSERT_NEW_USER = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

exports.UPDATE_USER = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;

exports.VIEW_ALL_USERS = `SELECT id, username, email FROM users`;

exports.DELETE_USER = `DELETE FROM users WHERE id = ?`;
