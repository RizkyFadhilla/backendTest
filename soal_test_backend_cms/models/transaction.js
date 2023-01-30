const pool = require("../config/connection");
const Factory = require("./class");

class ModelTransaction {
  static createTransaksion(
    nama_perusahaan,
    nama_barang,
    total_barang,
    harga_barang,
    grand_total,
    created_at,
    sisa_barang,
    goodsId,
    companyId,
    callback
  ) {
    let query = `INSERT INTO "Transactions" ("nama_perusahaan","nama_barang", "total_barang", "harga_barang", "grand_total","created_at", "sisa_barang","goodsId","companyId")
    VALUES('${nama_perusahaan}','${nama_barang}',${total_barang}, ${harga_barang}, ${grand_total}, '${created_at}', ${sisa_barang}, ${goodsId},${companyId});
    `;
    pool.query(query, (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, "Transaction success add");
      }
    });
  }
  static readAllTransaction(callback) {
    let query = `SELECT * FROM "Transactions" t`;
    pool.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const transaction = result.rows.map((el) => {
          const {
            id,
            nama_perusahaan,
            nama_barang,
            total_barang,
            harga_barang,
            grand_total,
            created_at,
            sisa_barang,
            goodsId,
            companyId,
          } = el;
          return Factory.readTransaction(
            id,
            nama_perusahaan,
            nama_barang,
            total_barang,
            harga_barang,
            grand_total,
            created_at,
            sisa_barang,
            goodsId,
            companyId
          );
        });
        callback(null, transaction);
      }
    });
  }
}
module.exports = ModelTransaction;
