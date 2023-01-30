const pool = require(`./connection`);

const dropTable = `DROP TABLE IF EXISTS "Transactions" ,"Goods", "Companies","Users"`;
const createUsers = `
CREATE TABLE IF NOT EXISTS "Users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(120) NOT NULL,
    "password" VARCHAR(120) NOT NULL
)
`;
const createCompanies = `
CREATE TABLE IF NOT EXISTS "Companies" (
    "id" SERIAL PRIMARY KEY,
    "kode_perusahaan" VARCHAR(120),
    "nama_perusahaan" VARCHAR(120),
    "userId" INTEGER,
            FOREIGN KEY ("userId")
            REFERENCES	"Users"("id")
            ON DELETE CASCADE
)
`;
const createBarang = `
CREATE TABLE IF NOT EXISTS "Goods" (
    "id" SERIAL PRIMARY KEY,
    "nama" VARCHAR(120),
    "harga" INTEGER,
    "stock" INTEGER
)
`;
const createTransaksi = `
CREATE TABLE IF NOT EXISTS "Transactions" (
    "id" SERIAL PRIMARY KEY,
    "nama_perusahaan" VARCHAR(120),
    "nama_barang" VARCHAR(120),
    "total_barang" INTEGER,
    "harga_barang" INTEGER,
    "grand_total" INTEGER,
    "created_at" DATE,
    "sisa_barang" INTEGER,
    "goodsId" INTEGER,
    "companyId" INTEGER,
        FOREIGN KEY ("goodsId") REFERENCES "Goods"("id") ON DELETE SET NULL,
        FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE SET NULL
)
`;
pool.query(dropTable, (err1, res1) => {
  if (err1) {
    console.log(err1);
  } else {
    console.log("Delete table success");
    pool.query(createUsers, (err2, res2) => {
      if (err2) {
        console.log(err2);
      } else {
        console.log("Create user table success");
        pool.query(createCompanies, (err3, res3) => {
          if (err3) {
            console.log(err3);
          } else {
            console.log("Create Company table success");
            pool.query(createBarang, (err4, res4) => {
              if (err4) {
                console.log(err4);
              } else {
                console.log("Create Good table success");
                pool.query(createTransaksi, (err5, res5) => {
                  if (err5) {
                    console.log(err5);
                  } else {
                    console.log("Create Transaction table success");
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});
