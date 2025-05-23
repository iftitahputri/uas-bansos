const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');           // untuk login / register
const penerimaRoutes = require('./routes/penerimaRoutes');
const penyediaRoutes = require('./routes/penyediaRoutes');

app.use(cors());

// middleware
app.use(express.json());

// route groups
app.use('/api', authRoutes);
app.use('/penerima', penerimaRoutes);
app.use('/penyedia', penyediaRoutes);

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server jalan di http://localhost:${PORT}`);
});