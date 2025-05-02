const siswa = require('../models/siswa.js');

module.exports = {
    /**
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */

    async all(req, res){ //menampilkan semua data siswa 
        const data = await siswa.all();

        return res.status(200).json({ data });
    },

    /**
     * @param {request} req
     * @param {response} res
     */

    async show(req, res){ //hanya menampilkan semua siswa yang telah hadir
        const id_jurusan = req.query.id_jurusan; 
        console.log(id_jurusan);

        const data = await siswa.absen(id_jurusan);

        return res.status(200).json({data});
    },


    async index(req, res){ //mendapatkan data siswa berdasarkan nis
        const nis = req.query.nis; 
        console.log(nis);

        const data = await siswa.index(nis);

        return res.status(200).json({data});
    },


    async store(req, res){
        const {nis, nama, nama_ayah, nama_ibu, kelas, id_jurusan, kehadiran} = req.body;
        const data = await siswa.store([nis, nama, nama_ayah, nama_ibu, kelas, id_jurusan, kehadiran]);

        return res.status(200).json({
            message:"berhasil insert",
            data: {
                insertID: data.insertID
            },
            status: 201
        })

    },

    async update(req, res){
        const nis = req.query.nis;
        const {kehadiran} = req.body;
        const updateSiswa = {
            kehadiran: kehadiran
        }

        const siswaData = await siswa.index(nis);
        if(siswaData[0]?.kehadiran === 1){
            return res.status(200).json({
                message: "Siswa sudah absen",
                data: {
                    nis: siswaData[0]?.nis,
                    kehadiran: siswaData[0]?.kehadiran
                },
                status: 200
            })
        }

        const data = await siswa.update(nis, updateSiswa);

        return res.status(200).json({
            message: 'berhasil update',
            data: {
                nis: nis,
                kehadiran: updateSiswa.kehadiran,
            },
            status: 200
        })
    },

    async delete(req, res){
        const {nis} = req.params;
        
        const data = await siswa.delete(nis);

        return res.status(200).json({
            message: "berhasil delete",
            status: 201,
        })
    }
}