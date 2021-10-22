import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import https from 'https';
import fs from 'fs';
import { config } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { categoriesRoutes } from './routes/categories.js';
import { productsRoutes } from './routes/products.js';
import { usersRoutes } from './routes/users.js';
import { mongoConnect } from './utils/database.js';

config()
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    const fileName = `${new Date().getTime()}-${file.originalname}`
    cb(null, fileName)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const privateKey = fs.readFileSync('server.key')
// const certificate = fs.readFileSync('server.cert')

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

app.use(cors({
  // // for local test
  // "origin": "http://localhost:8080",
  // "origin": "*",
  // FOR PRODUCTION
  "origin": "https://bqla.github.io/",
  "methods": "GET,PUT,POST,DELETE",
  "preflightContinue": false,
}));

app.use('/', categoriesRoutes);
app.use('/', productsRoutes);
app.use('/', usersRoutes);

mongoConnect(() => {
  // https.createServer({
  //   key: privateKey,
  //   cert: certificate,
  // }, app).listen(process.env.PORT || 3000);
  app.listen(process.env.PORT || 3000);
})