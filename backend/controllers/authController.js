const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerPenerima = async (req,res) =>{
    try{
        const {nama_penerima, no_kk, alamat, penghasilan, kontak, username, password} = req.body;
    
        if (!nama_penerima || !no_kk || !alamat || !penghasilan || !kontak || !username || !password) {
            return res.status(400).json({
            status: 'error',
            message: 'Please fill all of the data'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO Penerima (nama_penerima, no_kk, alamat, penghasilan, kontak, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)';

        const [results] = await db.promise().query(sql, [nama_penerima, no_kk, alamat, penghasilan, kontak, username, hashedPassword]);

        res.status(201).json({
            status: 'success',
            message: 'Penerima berhasil dibuat',
            data: {
                id: results.insertId,
                username
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan server'
        });
    }
};

exports.registerPenyedia = async (req, res) =>{
    
    try{
    const {nama_penyedia, no_organisasi, alamat, kontak, username, password} = req.body;

        if (!nama_penyedia || !no_organisasi || !alamat || !kontak || !username || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Semua data harus diisi'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);  
        const sql = 'INSERT INTO Penyedia (nama_penyedia, no_organisasi, alamat, kontak, username, password) VALUES (?, ?, ?, ?, ?, ?)';

        const [results] = await db.promise().query(sql, [nama_penyedia, no_organisasi, alamat, kontak, username, hashedPassword]);
      

        res.status(201).json({
            status: 'success',
            message: 'Penyedia berhasil dibuat',
            data: {
                id: results.insertId,
                username
            }
        });
    
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan server'
        });
    }
};

exports.login = async (req, res) => {
    try {
    const {username, password, role} = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({status: 'error', message: 'Semua field harus diisi'});
        }

        const table = role === 'penerima' ? 'Penerima' : 'Penyedia';
        const idField = role === 'penerima' ? 'id_penerima' : 'id_penyedia';
        const extraCheck = role === 'penerima' ? 'no_kk IS NOT NULL' : 'no_organisasi IS NOT NULL';

        const sql = `
            SELECT * FROM ${table} 
            WHERE username = ? AND ${extraCheck}
            `;
        const [results] = await db.promise().query(sql, [username]);

        if (results.length === 0) {
            return res.status(401).json({status: 'error', message: 'User tidak ditemukan'});
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({status: 'error', message: 'Password salah'});
        }

        const token = jwt.sign({ [idField]: user[idField], role }, 'RAHASIA_KEY', {expiresIn: '1d'});

        res.status(200).json({
            status: 'success',
            message: 'Login berhasil',
            token,
            data: {
                id: user.id,
                username: user.username,
                nama: user.nama 
            }
        });
    
    } catch (error) {
        console.error('Login Error', error);
        res.status(500).json({status: 'error', message: 'Terjadi kesalahan server'});
    }
}; 