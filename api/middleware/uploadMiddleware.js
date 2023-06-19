import multer from 'multer';

// Configuratie voor de opslag van bestanden
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Geef de bestemmingsmap aan
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

// Maak de upload-middleware aan
const upload = multer({ storage });

export default upload;
