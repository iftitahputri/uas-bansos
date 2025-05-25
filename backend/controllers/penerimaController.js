const db = require("../config/db");

exports.getDashboardPenerima = async (req, res) => {

  try{
    const id_penerima = req.user.id_penerima; 
  
    const sql = `
      SELECT
        (SELECT username
        FROM penerima
        WHERE id_penerima = ?)
        AS username,

        (SELECT COUNT(DISTINCT id_paket) 
        FROM paket_bansos
        WHERE is_deleted = 0)
        AS tipeBansos,
        
        (SELECT DATEDIFF(next_pengambilan, last_pengambilan)
        FROM transaksi_bansos 
        WHERE id_penerima = ? 
        ORDER BY last_pengambilan DESC
        LIMIT 1) AS sisaHari
    `;
    const [results] = await db.promise().query(sql, [id_penerima, id_penerima]);
    const row = results[0];

    res.status(200).json({
      status: 'success',
      message: 'Data dashboard berhasil diambil',
      data:{
        username: row.username || 'Unkwon',
        tipeBansos: row.tipeBansos || 0,
        sisaHari: row.sisaHari !== null ? `${row.sisaHari} hari lagi` : "Belum Ada"    
      }
    })

  } catch(err){
    res.status(500).json({
      status: 'error',
      message:"Gagal ambil data dashboard", 
      error:err.message
    });
  } 
};

exports.getDaftarBansos = async (req, res) => {
  try{
    const sql = `
      SELECT id_paket, nama_paket, max_penghasilan, stok, deskripsi 
      FROM paket_bansos
      WHERE is_deleted = 0
      ORDER BY nama_paket ASC
    `;

    const [results] = await db.promise().query(sql);
    res.status(200).json({
      status: 'success',
      message: 'Daftar bansos berhasil diambil',
      data: results
    })
  } catch(err){
    res.status(500).json({
      status: 'error',
      message:"Gagal mengambil data bansos", 
      error:err.message
    });
  }
};


exports.getRiwayatBansos = async(req, res) => {
  try{
    const id_penerima = req.user.id_penerima;
    const sql = `
      SELECT t.id_transaksi, t.id_paket, pb.nama_paket, t.last_pengambilan, t.next_pengambilan
      FROM transaksi_bansos t
      JOIN paket_bansos pb ON t.id_paket = pb.id_paket
      WHERE t.id_penerima = ? AND pb.is_deleted = 0
      ORDER BY t.id_transaksi DESC
    `;
    const[result] = await db.promise().query(sql, [id_penerima]);
    res.status(200).json({
      status:'success',
      message:'Riwayat bansos berhasil diambil',
      data: result
    });

  } catch(err){
    res.status(500).json({
      status: 'error',
      message:"Gagal mengambil riwayat", 
      error:err.message
    });
  }
};

exports.requestBansos = async(req, res) => {
  try{
    const {id_paket} = req.body;
    const id_penerima = req.user.id_penerima;

    if (!id_paket) {
      return res.status(400).json({
        status:'error',
        message: "id_paket tidak boleh kosong"
      });
    }
    
    const cek =`
      SELECT last_pengambilan FROM  transaksi_bansos
      WHERE id_penerima = ? AND id_paket = ?
      ORDER BY last_pengambilan DESC LIMIT 1
      `;
      
    const [transaksiTerakhir] = await db.promise().query(cek, [id_penerima, id_paket]);
      
    if (transaksiTerakhir.length > 0) {
      const lastDate = new Date(transaksiTerakhir[0].last_pengambilan);
      const now = new Date();
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays < 30) {
        return res.status(400).json({
          status: 'error',
          message: "Kamu sudah request paket ini dalam 30 hari terakhir"
        });
      }
    }

    const sql = `
      INSERT INTO transaksi_bansos (id_penerima, id_paket, last_pengambilan, next_pengambilan)
      VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY))
    `;

    await db.promise().query(sql, [id_penerima, id_paket]);

    res.status(201).json({
      status: 'success',
      message: "Berhasil request bansos"
    });
  } catch(err) {
    res.status(500).json({
      status:'error',
      message:"Gagal request bansos", 
      error:err.message
    });
  }
};