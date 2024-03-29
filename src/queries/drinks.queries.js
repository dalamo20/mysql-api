exports.CREATE_DRINKS_TABLE = `CREATE TABLE IF NOT EXISTS drinks(
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    price DECIMAL(8, 2),
    PRIMARY KEY (id)
)`;

/* DRINKS MENU */
exports.ALL_DRINKS = `SELECT * FROM drinks`;

exports.SINGLE_DRINK = `SELECT * FROM drinks WHERE id = ?`;

exports.INSERT_DRINK = `INSERT INTO drinks (name, price) VALUES (?, ?)`;

exports.UPDATE_DRINK = `UPDATE drinks SET name = ?, price = ? WHERE id = ?`;

exports.DELETE_DRINK = `DELETE FROM drinks WHERE id = ?`;
