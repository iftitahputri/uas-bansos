const db = require('../config/db');

exports.getDashboardPenyedia = async (req, res) => {
  try{
    const id_penyedia = req.user.id_penyedia; 
  
    const sql = `
      SELECT
        (SELECT username
          FROM penyedia
          WHERE id_penyedia = ?)
          AS username,

        (SELECT SUM(stok) 
          FROM paket_bansos
          WHERE id_penyedia = ? AND is_deleted = 0) 
          AS stokBansos,
  
        (SELECT COUNT(DISTINCT tb.id_transaksi)
          FROM transaksi_bansos tb
          JOIN paket_bansos pb ON tb.id_paket = pb.id_paket
          WHERE pb.id_penyedia = ?) 
          AS terdistribusi;
      `;
    const [results] = await db.promise().query(sql, [id_penyedia, id_penyedia, id_penyedia]);
    const row = results[0];
    
      res.status(200).json({
        status:'success',
        message:'Data dashboard berhasil diambil',
        data:{
          username: row.username || 'Unkwon',      
          stokBansos: row.stokBansos || 0,
          terdistribusi: row.terdistribusi || 0,
        },
      });
  } catch(err){
      res.status(500).json({
        status:"error",
        message:"Gagal ambil data dashboard", 
        error:err.message
      });
    }
};

exports.getTransaksiBansos = async(req, res) => {
  try{
    const id_penyedia = req.user.id_penyedia;
  
    const sql = `
      SELECT tb.id_transaksi, tb.id_penerima, tb.id_paket, DATE_FORMAT(tb.last_pengambilan, '%d/%m/%Y %H:%i') AS last_pengambilan, DATE_FORMAT(tb.next_pengambilan, '%d/%m/%Y %H:%i') AS next_pengambilan
      FROM transaksi_bansos tb
      JOIN paket_bansos pb ON tb.id_paket = pb.id_paket
      WHERE pb.id_penyedia = ? AND is_deleted = 0
      ORDER BY id_transaksi DESC
    `;
    const [results] = await db.promise().query(sql, [id_penyedia]);

    res.status(200).json({
      status:'success',
      message:'Riwayat berhasil diambil',
      data:results
    });    
  } catch(err){
      res.status(500).json({
        status:'success',
        message:"Gagal ambil riwayat", 
        error:err.message
      });
    }
};

exports.getDatabaseBansos = async(req, res) => {
  try{
    const id_penyedia = req.user.id_penyedia;
  
    const sql = `
      SELECT id_paket, nama_paket, stok,  DATE_FORMAT(terakhir_diperbarui, '%d/%m/%Y %H:%i') AS terakhir_diperbarui
      FROM paket_bansos
      WHERE id_penyedia = ? AND is_deleted = 0
      ORDER BY id_paket ASC
    `;
    const [results] = await db.promise().query(sql, [id_penyedia]);

    res.status(200).json({
      status:'success',
      message:'Data paket bansos berhasil diambil',
      data:results,
    });    
  } catch(err){
      res.status(500).json({
        status:'success',
        message:"Gagal ambil daftar paket", 
        error:err.message
      });
    }
};

exports.deletePaket = async (req, res) => {
  try {
  const {id_paket} = req.params;

    const sql = `
      UPDATE paket_bansos SET is_deleted = 1 
      WHERE id_paket = ?
    `;
    const [results] = await db.promise().query(sql, [id_paket]);

    if (results.affectedRows === 0) {
      return res.status(404).json({
        status:'error',
        message: 'Paket tidak ditemukan',
      });
    }

    res.status(200).json({ 
      status:'success',
      message: 'Paket berhasil dihapus (soft delete)'
    });
  } catch (err) {
      res.status(500).json({
      status:'success',
      message:"Gagal menghapus paket", 
      error:err.message
    });
  }
};

exports.addPaket = async (req, res) => {
  try {
    const {nama_paket, stok, max_penghasilan, deskripsi} = req.body;
    const id_penyedia = req.user.id_penyedia;

    const sql = `
      INSERT INTO paket_bansos (nama_paket, stok, max_penghasilan, deskripsi, id_penyedia)
      VALUES (?, ?, ?, ?, ?)
    `; 

    const [results] = await db.promise().query(sql, [nama_paket, stok, max_penghasilan, deskripsi, id_penyedia]);

    res.status(200).json({
      data:'success',
      message: 'Paket berhasil ditambahkan',
      data:{
        id_paket: results.insertId,
      },
    });
  } catch (err) {
      res.status(500).json({
      status:'success',
      message:"Gagal menambahkan paket", 
      error:err.message
    });
  }
};
 
exports.editPaket = async (req, res) => {
  try {
  const {id_paket} = req.params;
  const {nama_paket, stok, deskripsi} = req.body;
  
  const sql = `
    UPDATE paket_bansos SET nama_paket = ?, stok = ?, deskripsi = ? 
    WHERE id_paket = ? AND is_deleted = 0
  `;

  const [results] = await db.promise().query(sql, [nama_paket, stok, deskripsi, id_paket]);

  if (results.affectedRows === 0) {
    return res.status(404).json({
      status:'error',
      message: 'Paket tidak ditemukan atau sudah dihapus',
    });
  }

  res.status(200).json({
    status:'success',
    message: 'Paket berhasil diperbarui'
  });
  } catch (err) {
      res.status(500).json({
      status:'success',
      message:"Gagal memperbarui paket", 
      error:err.message
    });
  }
};