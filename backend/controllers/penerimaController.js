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
        username: row.username || 'Unknown',
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
      SELECT t.id_transaksi, t.id_paket, pb.nama_paket, DATE_FORMAT(t.last_pengambilan, '%d/%m/%Y %H:%i') 
      AS last_pengambilan, DATE_FORMAT(t.next_pengambilan, '%d/%m/%Y %H:%i') AS next_pengambilan
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

    if (!id_paket || isNaN(id_paket)) {
      return res.status(400).json({
        status:'error',
        message: "id_paket tidak valid"
      });
    }

    const [dataPenerima] = await db.promise().query(
      'SELECT penghasilan FROM penerima WHERE id_penerima = ?',
      [id_penerima]
    );
    const [dataPaket] = await db.promise().query(
      'SELECT max_penghasilan FROM paket_bansos WHERE id_paket = ?',
      [id_paket]
    );

    if (dataPenerima.length === 0 || dataPaket.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Data penerima atau paket tidak ditemukan'
      });
    }

    const stokPaket= `SELECT stok
      FROM paket_bansos
      WHERE id_paket = ?
      `;

    const [cekStok] = await db.promise().query(stokPaket, [id_paket]);

      if (cekStok[0].stok <= 0) {
      return res.status(403).json({
        status: 'error',
        message: `Stok tidak cukup`
      });
    }

    const gaji = Number(dataPenerima[0].penghasilan);
    const maksGaji = Number(dataPaket[0].max_penghasilan);

    if (gaji > maksGaji) {
      return res.status(403).json({
        status: 'error',
        message: `Gaji kamu (${gaji}) melebihi batas maksimal (${maksGaji}) untuk paket ini`
      });
    }

    const cek = `
      SELECT next_pengambilan
      FROM transaksi_bansos
      WHERE id_penerima = ?
      ORDER BY last_pengambilan DESC LIMIT 1
      `;

    const [transaksiTerakhir] = await db.promise().query(cek, [id_penerima]);
      
    if (transaksiTerakhir.length > 0) {
      const next_pengambilan = new Date(transaksiTerakhir[0].next_pengambilan);
      const now = new Date();
      if (now < next_pengambilan) {
        return res.status(400).json({
          status: 'error',
          message: "Kamu sudah request paket dalam 30 hari terakhir"
        });
      }
    }

    const sql = `
      INSERT INTO transaksi_bansos (id_penerima, id_paket, last_pengambilan, next_pengambilan)
      VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY))
    `;

    await db.promise().query(sql, [id_penerima, id_paket]);

    await db.promise().query(
      'UPDATE paket_bansos SET stok = stok - 1 WHERE id_paket = ?',
      [id_paket]
    );

    res.status(201).json({
      status: 'success',
      message: "Anda telah berhasil mengklaim bantuan sosial."
    });
  } catch(err) {
    res.status(500).json({
      status:'error',
      message:"Gagal klaim bansos", 
      error:err.message
    });
  }
};