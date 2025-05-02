const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/jurusan', require('./routes/jurusan.js'));
app.use('/siswa', require('./routes/sisiwa.js'));

app.listen(port, () => {
    console.log(
    "[server] server berhasil dijalankan di http://127.0.0.1:" + port
    );
});
