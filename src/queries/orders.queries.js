//below the drink id from the 'drinks' table is referenced in the 'orders' table using drink_id, which is the foreign key
exports.CREATE_ORDERS_TABLE = `CREATE TABLE IF NOT EXISTS orders(
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  drink_id INT,
  quantity INT,
  total_price DECIMAL(8, 2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (id),
  FOREIGN KEY (drink_id) REFERENCES drinks(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
)`;

/* CUSTOMER ORDERS */
exports.ALL_ORDERS = (userId) =>
  `SELECT * FROM orders WHERE user_id = ${userId}`;

exports.SINGLE_ORDER = (userId, orderId) =>
  `SELECT * FROM orders WHERE user_id = ${userId} AND id = ${orderId}`;

exports.INSERT_ORDER = (userId, drinkId, quant, total) =>
  `INSERT INTO orders (user_id, drink_id, quantity, total_price) VALUES (${userId}, ${drinkId}, ${quant}, ${total})`;

exports.UPDATE_ORDER = (userId, orderId, newValues, totalPrice) =>
  `UPDATE orders SET ${newValues}, total_price = ${totalPrice} WHERE user_id = ${userId} AND id = ${orderId}`;

exports.DELETE_ORDER = (userId, orderId) =>
  `DELETE FROM orders WHERE user_id = ${userId} AND id = ${orderId}`;
