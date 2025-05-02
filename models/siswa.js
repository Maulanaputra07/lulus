const db = require("../utils/db.js");


class siswa{
    static all(){ //get all siswa
        return new Promise((resolve, reject) => {
            let q = "SELECT siswa.nis, siswa.nama, jurusan.akronim, siswa.kelas, jurusan.nama_jurusan FROM `siswa` INNER JOIN jurusan ON siswa.id_jurusan = jurusan.id_jurusan";

            db.query(q, (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static absen(id_jurusan){ // get siswa yang telah absen
        return new Promise((resolve, reject)=> {
            let q = 'SELECT siswa.nis, siswa.nama, siswa.nama_ayah, siswa.nama_ibu, jurusan.akronim, siswa.kelas, jurusan.nama_jurusan FROM `siswa` INNER JOIN jurusan ON siswa.id_jurusan = jurusan.id_jurusan where kehadiran = 1 AND siswa.id_jurusan = ?';

            db.query(q, [id_jurusan], (err, res) => {
                if(err) reject(err);
                else resolve(res);
            })
        })
    }

    static index(nis){ // get data siswa berdasarkan nis
        return new Promise((resolve, reject)=> {
            let q = 'select * from siswa where nis = ?';

            db.query(q, [nis], (err, data) =>{
                if (err) reject(err)
                else resolve(data)
            })
        })
    }


    static update(nis, updatedSiswa){
        return new Promise((resolve, reject) => {
            let q = 'UPDATE siswa set ? where nis = ?';

            db.query(q, [updatedSiswa, nis], (err, data) => {
                if(err) reject(err);
                else resolve(data);
            })
        })
    }

    static store(value){
        return new Promise((resolve, reject) => {
            let q = 'INSERT INTO siswa(`nis`, `nama`, `nama_ayah`, `nama_ibu`, `kelas`, `id_jurusan`, `kehadiran`) values (?)';

            db.query(q, [value], (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    static delete(nis){
        return new Promise((resolve, reject)=>{
            let q = "delete from siswa where nis = (?)";

            db.query(q, [nis], (err, data) => {
                if(err) reject(err);
                resolve(data);
            })
        })
    }
}

module.exports = siswa;