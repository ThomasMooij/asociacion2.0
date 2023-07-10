import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Upload middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const collectionName = req.body.collectionName;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.locals.rootDir = path.resolve(__dirname, '../');
    const rootDir = app.locals.rootDir;
    const destination = path.join(rootDir, '/assets/uploads', collectionName);

    // if (fs.existsSync(destination)) {
    //   return cb(new Error('Folder with the same name already exists'));
    // }

    // Maak de map aan als deze niet bestaat
    fs.mkdirSync(destination, { recursive: true });

    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage }).array("images", 6);

// Upload controller
export const uploadController = (req, res) => {
  try {
    upload(req, res, (err) => {
      
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to upload images" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files were uploaded" });
      }

      if (req.files.length > 6) {
        return res.status(400).json({ message: "Maximum of 6 files allowed" });
      }

      const fileNames = req.files.map((file) => file.filename);
      const { collectionName } = req.body;

      res.status(200).json({ message: "Upload successful" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload images" });
  }
};
// GET ALL PHOTOCOLLECTIONS
export const photosController = (req, res) => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.locals.rootDir = path.resolve(__dirname, '../assets/uploads');
  const uploadsDir = app.locals.rootDir;

  // Lees alle mappen in de uploads directory
  fs.readdir(uploadsDir, (err, folders) => {
    // console.log("param:", req.params)
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Er is een fout opgetreden bij het ophalen van de collecties' });
    }
    
    // Loop door alle mappen heen en haal de bestanden op
    const collections = folders.map((folder) => {
      const collectionDir = path.join(uploadsDir, folder);
      const collection = {
        title: folder,
        images: [],
      };
      
      // Lees alle bestanden in de map en voeg ze toe aan de collection
      fs.readdirSync(collectionDir).forEach((file) => {
        collection.images.push(`/uploads/${folder}/${file}`);
      });
      
      return collection;
    });
    
    // Stuur de lijst met collecties en afbeeldingen terug naar de frontend
    res.json({collections});
  });
}

export const photoController = (req, res) => {
  const collectionNames = req.params.collectionName.split(","); // Ontvang een lijst van namen gescheiden door een komma

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.locals.rootDir = path.resolve(__dirname, '../assets/uploads');
  const uploadsDir = app.locals.rootDir;

  const collections = [];

  collectionNames.forEach((folderName) => {
    // Check of de map bestaat
    if (!fs.existsSync(path.join(uploadsDir, folderName))) {
      return res.status(404).json({ message: `De map ${folderName} bestaat niet` });
    }

    const collectionDir = path.join(uploadsDir, folderName);
    const collection = {
      title: folderName,
      images: [],
    };
    // Lees alle bestanden in de map en voeg ze toe aan de collection
    fs.readdirSync(collectionDir).forEach((file) => {
      collection.images.push(`/uploads/${folderName}/${file}`);
    });

    collections.push(collection);
  });

  // Stuur de collecties terug naar de frontend
  res.json({ collections });
}

export const titleChecker = (req , res) => {
  console.log("In title check controller")
  
  const { title } = req.body;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.locals.rootDir = path.resolve(__dirname, '../assets/uploads');
  const uploadsDir = app.locals.rootDir;

  console.log(uploadsDir)
  const folderExists = fs.existsSync(path.join(uploadsDir, title));

  if (folderExists) {
    console.log("exists set to true")
    return res.json({ exists: true });
  }

  return res.json({ exists: false });
}