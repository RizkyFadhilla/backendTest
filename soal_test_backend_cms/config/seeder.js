const { hashPassword } = require("../helpers/bcrypt");
const pool = require(`./connection`);
let password = hashPassword("123")
// let password = "123";
// console.log(password)
const userQuery = `INSERT INTO "Users" ("username", "password")
VALUES('ucok', '${password}');
`;
const companyQuery = `INSERT INTO "Companies" ("kode_perusahaan","nama_perusahaan", "userId")
VALUES('T001','Company A', '1');
`;
const barangQuery = `INSERT INTO "Goods" ("nama","harga","stock")
VALUES('Barang 1', 10000, 500);
`;
pool.query(userQuery, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("seeding user sukses");
    pool.query(companyQuery, (err2, result2) => {
      if (err2) {
        console.log(err2);
      } else {
        console.log("seeding Company sukses");
        pool.query(barangQuery, (err3, result3) => {
          if (err3) {
            console.log(err3);
          } else {
            console.log("seeding Goods sukses");
          }
        });
      }
    });
  }
});
