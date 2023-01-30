const pool = require("../config/connection");
const Factory = require("./class");

class ModelBarang {
  static createBarang(nama_barang, harga_barang, total_barang, callback) {
    let error = [];
    if (!nama_barang) {
      error.push("Please fill the nama_barang");
    }
    if (!total_barang) {
      error.push("Please fill the total_barang");
    }
    if (error.length) {
      callback(error);
    } else {
      let query = `INSERT INTO "Goods" ("nama", "harga", "stock")
        VALUES('${nama_barang}', ${harga_barang},'${total_barang}');
        `;
      pool.query(query, (err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, "Barang success add");
        }
      });
    }
  }
  static searchBarang(nama_barang, callback) {
    let error = [];
    if (!nama_barang) {
      error.push("Please fill the nama_barang");
    }
    if (error.length) {
      callback(error);
    } else {
      let query = ` SELECT g."id", g."nama" , g."harga", g."stock"
        FROM "Goods" g
        WHERE g."nama" = '${nama_barang}'
          `;
      pool.query(query, (err, res) => {
        if (err) {
          callback(err);
        } else {
          const goods = res.rows.map((el) => {
            const { id, nama, harga, stock } = el;
            return Factory.readBarang(id, nama, harga, stock);
          });
          callback(null, goods[0]);
        }
      });
    }
  }
  static updatebarang(barangId, nama_barang, harga_barang, stock_barang, callback){
    console.log(barangId, nama_barang, harga_barang, stock_barang, "ini di model")
    let query = `UPDATE public."Goods"
    SET nama='${nama_barang}', harga=${harga_barang}, stock=${stock_barang}
    WHERE id = '${barangId}';
    `
    pool.query(query, (err,res)=>{
        if(err){
            callback(err)
        } else{
            callback(null, "Barang success update");
        }
    })
  }
}
module.exports = ModelBarang;
