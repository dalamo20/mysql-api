exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
)`;

/* AUTHENTICATION Queries */
exports.VIEW_ALL_USERS = `SELECT username, email FROM users`;

exports.INSERT_NEW_USER = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

exports.UPDATE_USER = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;

exports.DELETE_USER = `DELETE FROM users WHERE id = ?`;
