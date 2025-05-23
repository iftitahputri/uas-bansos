const db = require('../config/db');

exports.getDashboardPenyedia = async (req, res) => {
  try{
    const id_penyedia = req.user.id_penyedia; 
  
    const sql = `
      SELECT
        (SELECT SUM(stok) 
          FROM paket_bansos
          WHERE id_penyedia = ? AND is_deleted = 0) 
          AS jumlah_stok,
  
        (SELECT COUNT(DISTINCT tb.id_transaksi)
          FROM transaksi_bansos tb
          JOIN paket_bansos pb ON tb.id_paket = pb.id_paket
          WHERE pb.id_penyedia = ? AND is_deleted = 0) 
          AS telah_terdistribusi;
      `;
    const [results] = await db.promise().query(sql, [id_penyedia, id_penyedia]);
    const row = results[0];
    
      res.json({
        jumlah_stok: row.jumlah_stok || 0,
        telah_terdistribusi: row.telah_terdistribusi || 0,
      });
  } catch(err){
    res.status(500).json({message:"Gagal ambil data dashboard", error:err});
  }
};

exports.getTransaksiBansos = async(req, res) => {
  try{
    const id_penyedia = req.user.id_penyedia;
  
    const sql = `
      SELECT tb.id_transaksi, tb.id_penerima, tb.id_paket, tb.last_pengambilan, tb.next_pengambilan
      FROM transaksi_bansos tb
      JOIN paket_bansos pb ON tb.id_paket = pb.id_paket
      WHERE pb.id_penyedia = ? AND is_deleted = 0
      ORDER BY id_transaksi DESC
    `;
    const [results] = await db.promise().query(sql, [id_penyedia]);

    res.json(results);    
  } catch(err){
    res.status(500).json({message:"Gagal ambil riwayat", error:err});
  }
};

exports.getDatabaseBansos = async(req, res) => {
  try{
    const id_penyedia = req.user.id_penyedia;
  
    const sql = `
      SELECT id_paket, nama_paket, stok, terakhir_diperbarui 
      FROM paket_bansos
      WHERE id_penyedia = ? AND is_deleted = 0 AND stok != 0
      ORDER BY id_paket ASC
    `;
    const [results] = await db.promise().query(sql, [id_penyedia]);

    res.json(results);    
  } catch(err){
    res.status(500).json({message:"Gagal ambil daftar paket", error:err});
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
      return res.status(404).json({ message: 'Paket tidak ditemukan' });
    }
    res.json({ message: 'Paket berhasil dihapus (soft delete)' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus paket', error });
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

    await db.promise().query(sql, [nama_paket, stok, max_penghasilan, deskripsi, id_penyedia]);
    res.json({ message: 'Paket berhasil ditambahkan' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan paket', error });
  }
};

exports.editPaket = async (req, res) => {
  try {
  const {id_paket} = req.params;
  const {nama_paket, stok, deskripsi} = req.body;
  
  const sql = `
    UPDATE paket_bansos SET nama_paket = ?, stok = ?, deskripsi = ? 
    WHERE id_paket = ? AND is_deleted = 0'
  `;

  const [result] = await db.promise().query(sql, [nama_paket, stok, deskripsi, id_paket]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Paket tidak ditemukan atau sudah dihapus' });
  }
  res.json({ message: 'Paket berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui paket', error });
  }
};