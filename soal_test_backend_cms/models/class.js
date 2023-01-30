class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
class Companies {
  constructor(id, kode_perusahaan, nama_perusahaan, userId) {
    this.id = id;
    this.kode_perusahaan = kode_perusahaan;
    this.nama_perusahaan = nama_perusahaan;
    this.userId = userId;
  }
}
class Barang {
  constructor(id, nama, harga, stock) {
    this.id = id;
    this.nama = nama;
    this.harga = harga;
    this.stock = stock;
  }
}
class Transaction {
  constructor(
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
  ) {
    this.id = id;
    this.nama_perusahaan = nama_perusahaan;
    this.nama_barang = nama_barang;
    this.total_barang = total_barang;
    this.harga_barang = harga_barang;
    this.grand_total = grand_total;
    this.created_at = created_at;
    this.sisa_barang = sisa_barang;
    this.goodsId = goodsId;
    this.companyId = companyId;
  }
}
class Factory {
  static readUser(id, username, password) {
    return new User(id, username, password);
  }
  static readCompanies(id, kode_perusahaan, nama_perusahaan, userId) {
    return new Companies(id, kode_perusahaan, nama_perusahaan, userId);
  }
  static readBarang(id, nama, harga, stock) {
    return new Barang(id, nama, harga, stock);
  }
  static readTransaction(
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
  ) {
    return new Transaction(
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
  }
}
module.exports = Factory;
