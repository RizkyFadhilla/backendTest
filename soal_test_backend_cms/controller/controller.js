const { comparePassword } = require("../helpers/bcrypt");
const { signPayloadToToken } = require("../helpers/jwt");
const ModelUser = require("../models/user");
const ModelCompany = require("../models/company");
const bcrypt = require("bcryptjs");
const ModelBarang = require("../models/barang");
const ModelTransaction = require("../models/transaction");

class Controller {
  static async login(req, res) {
    try {
      let { username, password } = req.body;
      ModelUser.searchUserByUsername(username, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          //   let checkPassword = comparePassword(password, user.password);
          //   //   if (!checkPassword) {
          //   //     res.send("Username/password Invalid");
          //   //   }
          const payload = {
            id: user.id,
            username: user.username,
          };
          const access_token = signPayloadToToken(payload);
          res.status(200).json({ access_token });
        }
      });
    } catch (error) {
      console.log(error);
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
            res.send(err);
            console.log(err);
          } else {
            let message = result;
            res.status(201).json({ message });
          }
        }
      );
    } catch (error) {
      console.log(error);
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
            res.send(err);
          } else {
            let message = result;
            res.status(201).json({ message });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  static async createTransaction(req, res) {
    try {
      let { nama_perusahaan, nama_barang, total_barang } = req.body;
      ModelCompany.searchCompanyByName(nama_perusahaan, (err, company) => {
        if (err) {
          console.log(err);
        } else {
          console.log(company);
          ModelBarang.searchBarang(nama_barang, (err, good) => {
            if (err) {
              console.log(err);
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
    }
  }
  static readAllTransaction(req, res) {
    try {
      ModelTransaction.readAllTransaction((err, transaction) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(transaction);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
