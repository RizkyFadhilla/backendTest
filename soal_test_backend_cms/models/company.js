const pool = require("../config/connection");
const Factory = require("./class");

class ModelCompany {
  static createCompany(userId, kode_perusahaan, nama_perusahaan, callback) {
    let error = [];
    if (!kode_perusahaan) {
      error.push("Please fill the Kode_perusahaan");
    }
    if (!nama_perusahaan) {
      error.push("Please fill the nama_perusahaan");
    }
    if (error.length) {
      callback(error);
    } else {
      let query = `INSERT INTO "Companies" ("kode_perusahaan", "nama_perusahaan", "userId")
        VALUES('${kode_perusahaan}', '${nama_perusahaan}', '${userId}');
        `;
      pool.query(query, (err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, "Companies success add");
        }
      });
    }
  }
  static searchCompanyByName(nama_perusahaan, callback) {
    let query = `
        SELECT c."id", c."kode_perusahaan" , c."nama_perusahaan", c."userId"
        FROM "Companies" c
        WHERE c."nama_perusahaan" = '${nama_perusahaan}'
        `;
    pool.query(query, (err, res) => {
      if (err) {
        callback(err);
      } else {
        const company = res.rows.map((el) => {
          const { id, nama_perusahaan, kode_perusahaan, userId } = el;
          return Factory.readCompanies(
            id,
            nama_perusahaan,
            kode_perusahaan,
            userId
          );
        });
        callback(null, company[0]);
      }
    });
  }
  static searchCompanyByUserId(userId, callback) {
    let query = `
    SELECT c."id", c."kode_perusahaan" , c."nama_perusahaan", c."userId"
    FROM "Companies" c
    WHERE c."userId" = '${userId}'
    `;
    pool.query(query, (err, res) => {
      if (err) {
        callback(err);
      } else {
        const company = res.rows.map((el) => {
          const { id, nama_perusahaan, kode_perusahaan, userId } = el;
          return Factory.readCompanies(
            id,
            nama_perusahaan,
            kode_perusahaan,
            userId
          );
        });
        callback(null, company[0]);
      }
    });
  }
}
module.exports = ModelCompany;
