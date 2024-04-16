exports.CREATE_DRINKS_TABLE = `CREATE TABLE IF NOT EXISTS drinks(
    id INT NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    name varchar(255) NOT NULL,
    price DECIMAL(8, 2),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

/* DRINKS MENU */
exports.ALL_DRINKS = (userId) =>
  `SELECT * FROM drinks WHERE user_id = ${userId}`;

exports.SINGLE_DRINK = (userId, drinkId) =>
  `SELECT * FROM drinks WHERE user_id = ${userId} AND id = ${drinkId}`;

exports.INSERT_DRINK = (userId, drinkName, drinkPrice) =>
  `INSERT INTO drinks (user_id, name, price) VALUES (${userId}, ${drinkName}, ${drinkPrice})`;

exports.UPDATE_DRINK = (userId, drinkId, newValues) =>
  `UPDATE drinks SET ${newValues} WHERE user_id = ${userId} AND id = ${drinkId}`;

exports.DELETE_DRINK = (userId, drinkId) =>
  `DELETE FROM drinks WHERE user_id = ${userId} AND id = ${drinkId}`;
