const { comparePassword } = require("../helpers/bcrypt");
const { signPayloadToToken } = require("../helpers/jwt");
const ModelUser = require("../models/user");
const ModelCompany = require("../models/company");
const ModelBarang = require("../models/barang");
const ModelTransaction = require("../models/transaction");
const {Blob} = require('buffer')

class Controller {
  static async login(req, res) {
    try {
      let { username, password } = req.body;
      ModelUser.searchUserByUsername(username, (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log(user);
          let checkPassword = comparePassword(password, user.password);
          if (!checkPassword) {
            console.log("masuk kemari");
            res.send("Username/password Invalid");
            return;
          }
          const payload = {
            id: user.id,
            username: user.username,
          };
          const access_token = signPayloadToToken(payload);
          console.log(access_token);
          res.status(200).json({ access_token });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(err);
    }
  }
  static async createCompany(req, res) {
    try {
      let { nama_perusahaan, kode_perusahaan } = req.body;
      let { id } = req.user;
      console.log(id);
      ModelCompany.createCompany(
        id,
        kode_perusahaan,
        nama_perusahaan,
        (err, result) => {
          if (err) {
            res.status(500).json(err);
            console.log(err);
          } else {
            let message = result;
            res.status(201).json({ message });
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(err);
    }
  }
  static async createBarang(req, res) {
    try {
      let { nama_barang, total_barang, harga_barang } = req.body;
      ModelBarang.createBarang(
        nama_barang,
        total_barang,
        harga_barang,
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json(err);
          } else {
            let message = result;
            res.status(201).json({ message });
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(err);
    }
  }
  static async createTransaction(req, res) {
    try {
      let { nama_perusahaan, nama_barang, total_barang } = req.body;
      ModelCompany.searchCompanyByName(nama_perusahaan, (err, company) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log(company);
          ModelBarang.searchBarang(nama_barang, (err, good) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);
            } else {
              console.log(good);
              let { id, nama, harga, stock } = good;
              let sisaStock = stock - total_barang;
              ModelBarang.updatebarang(
                id,
                nama,
                harga,
                sisaStock,
                (err, responeBarang) => {
                  if (err) {
                    console.log(err);
                    res.status(500).json(err);
                  } else {
                    let grandTotal = harga * total_barang;
                    let now = new Date();
                    let created_at = now.toISOString().substring(0, 10);
                    ModelTransaction.createTransaksion(
                      nama_perusahaan,
                      nama_barang,
                      total_barang,
                      harga,
                      grandTotal,
                      created_at,
                      sisaStock,
                      id,
                      company.id,
                      (err, transaction) => {
                        if (err) {
                          console.log(err);
                        } else {
                          let message = transaction;
                          res.status(201).json({ message });
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(err);
    }
  }
  static readAllTransaction(req, res) {
    try {
      let userId = req.user.id;
      ModelCompany.searchCompanyByUserId(userId, (err, company) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          ModelTransaction.readAllTransaction(
            company.id,
            (err, transaction) => {
              if (err) {
                console.log(err);
                res.status(500).json(err);
              } else {
                res.status(200).json(transaction);
              }
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(err);
    }
  }
  static downloadCSV(req, res) {
    try {
      let userId = req.user.id;
      ModelCompany.searchCompanyByUserId(userId, (err, company) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          ModelTransaction.readAllTransaction(
            company.id,
            (err, transaction) => {
              if (err) {
                console.log(err);
                res.status(500).json(err);
              } else {
                let data = transaction;

                // let csv =
                //   "Tanggal Input,Nama Perusahaan,Nama Barang,Total Barang,Harga Barang,Grand Total,SisaBarang\n";
                // data.forEach((element) => {
                //   let date = element.created_at.toISOString().substring(0, 10);
                //   csv += `${date},${element.nama_perusahaan},${element.nama_barang},${element.total_barang},${element.harga_barang},${element.grand_total},${element.sisa_barang}\n`;
                // });
                // const blob = new Blob([csv], { type: 'text/csv;charset=utf-8,' })
                // const objUrl = URL.createObjectURL(blob);
                // const link = document.createElement("a");
                // link.setAttribute("href", objUrl);
                // link.setAttribute("download", "File.csv");
                // link.textContent = "Click to Download";

                // document.querySelector("body").append(link);
              }
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
