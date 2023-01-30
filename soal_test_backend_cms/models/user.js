const pool = require("../config/connection");
const Factory = require("./class");

class ModelUser {
  static searchUserByUsername(username, callback) {
    let query = `
        SELECT u."id", u."username", u."password" 
        FROM "Users" u
        WHERE u."username" = '${username}'
        `;
    pool.query(query, (err, res) => {
      if (err) {
        callback(err);
      } else {
        const user = res.rows.map((el) => {
          const { id, username, password} = el;
          return Factory.readUser(id, username, password);
        });
        callback(null, user[0]);
      }
    });
  }
}
module.exports = ModelUser;
