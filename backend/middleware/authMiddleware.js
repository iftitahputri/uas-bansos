const jwt = require('jsonwebtoken');

// cek token login
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  jwt.verify(token, 'RAHASIA_KEY', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token tidak valid' });
    req.user = user;
    next();
  });
}

// penyedia
function penyediaOnly(req, res, next) {
  if (req.user.role !== 'penyedia') {
    return res.status(403).json({ message: 'Akses hanya untuk penyedia' });
  }
  next();
}

// penerima
function penerimaOnly(req, res, next) {
  if (req.user.role !== 'penerima') {
    return res.status(403).json({ message: 'Akses hanya untuk penerima' });
  }
  next();
}

module.exports = {
  verifyToken,
  penyediaOnly,
  penerimaOnly
};
