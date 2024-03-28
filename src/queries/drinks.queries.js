exports.CREATE_DRINKS_TABLE = `CREATE TABLE IF NOT EXISTS drinks(
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    price DECIMAL(8, 2),
    PRIMARY KEY (id)
)`;

//below the drinks from the 'drinks' table are referenced in the 'orders' table using drink_id, which is the foreign key
exports.CREATE_ORDERS_TABLE = `CREATE TABLE IF NOT EXISTS orders(
    id INT NOT NULL AUTO_INCREMENT,
    drink_id INT,
    quantity INT,
    total_price DECIMAL(8, 2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (id),
    FOREIGN KEY (drink_id) REFERENCES drinks(id)
)`;

/* DRINKS MENU */
exports.ALL_DRINKS = `SELECT * FROM drinks`;

exports.SINGLE_DRINK = `SELECT * FROM drinks WHERE id = ?`;

exports.INSERT_DRINK = `INSERT INTO drinks (name, price) VALUES (?, ?)`;

exports.UPDATE_DRINK = `UPDATE drinks SET name = ?, price = ? WHERE id = ?`;

exports.DELETE_DRINK = `DELETE FROM drinks WHERE id = ?`;

/* CUSTOMER ORDERS */
exports.ALL_ORDERS = `SELECT * FROM orders`;

exports.SINGLE_ORDER = `SELECT * FROM orders WHERE id = ?`;

exports.INSERT_ORDER = `INSERT INTO orders (drink_id, quantity, total_price) VALUES (?, ?, ?)`;

exports.UPDATE_ORDER = `UPDATE orders SET drink_id = ?, quantity =?, total_price = ? WHERE id = ?`;

exports.DELETE_ORDER = `DELETE FROM orders WHERE id = ?`;
