## Setup Database
```
npm run setup
```
## menjalankan aplikasi

```
npm run start

```

# Apabila menggunakan link deployment 
https://backendtestcms-production.up.railway.app/

## POST https://backendtestcms-production.up.railway.app/login Login User 
username bisa digunakan sesuai dibawah
# body :

```
{
    username : "ucok"
    password : "123"
}
```

output :

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1Y29rIiwiaWF0IjoxNjc1MTM3NTMwfQ.3DVf1-JBpa0_rdV8Xijh--20ezOb0ZX1Vpi0XITbvtM"
}
```

## POST https://backendtestcms-production.up.railway.app/company ADD a Company

input :
```
{
    "nama_perusahaan" : "Testing 2"
    "kode_perusahaan" : "T001"
}
```

headers:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1Y29rIiwiaWF0IjoxNjc1MTM3NTMwfQ.3DVf1-JBpa0_rdV8Xijh--20ezOb0ZX1Vpi0XITbvtM"
}
```


output :
```
{
    "message": "Companies success add"
}
```


## POST https://backendtestcms-production.up.railway.app/barang add a goods
input :
```
{
    "harga_barang" : 50000
    "nama_barang" : "barang tes 2"
    "total_barang" : 500
}
```

headers:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1Y29rIiwiaWF0IjoxNjc1MTM3NTMwfQ.3DVf1-JBpa0_rdV8Xijh--20ezOb0ZX1Vpi0XITbvtM"
}
```

output :

```
{
    "message": "Barang success add"
}
```

## POST https://backendtestcms-production.up.railway.app/transaction add a Transaction

input :
```
{
    "nama_perusahaan" : Company A
    "nama_barang" : "Barang 1"
    "total_barang" : 100
}
```

headers:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1Y29rIiwiaWF0IjoxNjc1MTM3NTMwfQ.3DVf1-JBpa0_rdV8Xijh--20ezOb0ZX1Vpi0XITbvtM"
}
```

output : 

```
{
    "message": "Transaction success add"
}
```

## GET https://backendtestcms-production.up.railway.app/transaction get All transaction depend on User Login

headers:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1Y29rIiwiaWF0IjoxNjc1MTM3NTMwfQ.3DVf1-JBpa0_rdV8Xijh--20ezOb0ZX1Vpi0XITbvtM"
}
```

output : 

```
[
    {
        "id": 1,
        "nama_perusahaan": "Company A",
        "nama_barang": "Barang 1",
        "total_barang": 100,
        "harga_barang": 10000,
        "grand_total": 1000000,
        "created_at": "2023-01-31T00:00:00.000Z",
        "sisa_barang": 400,
        "goodsId": 1,
        "companyId": 1
    }
]
```
