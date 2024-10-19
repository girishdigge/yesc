// import { configDotenv } from 'dotenv';
import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import path from 'path';
import multer from 'multer'; // Add multer
import fs from 'fs'; // File system module to handle overwriting files
import indexHTML from './routes/routes.js';
import userRoutes from './routes/userRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from './config/corsOptions.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Setup Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads'); // Ensure this folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const fileTypes =
    /jpeg|jpg|png|webp|pdf|gif|tiff|bmp|ico|docx|odt|rtf|txt|html|json|xml|xlsx|xls|heic|heif|avif|svg|webp|doc|zip|rar/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only images (jpg, jpeg, png, webp) are allowed'));
  }
};

// Initialize multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 12 * 1024 * 1024 }, // 12MB file size limit
});

app.use('/', express.static(path.join(__dirname, 'public', 'dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', indexHTML);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/client', clientRoutes);
// app.use('/project', projectRoutes);
app.use('/todo', todoRoutes);

app.use('/project', upload.single('SBC_File'), projectRoutes);
// Fallback route for handling SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// app.all('*', (req, res) => {
//   res.status(404);
//   if (req.accepts('html')) {
//     res.sendFile(path.join(__dirname, 'views', '404.html'));
//   } else if (req.accepts('json')) {
//     res.json({ message: '404 Not Found' });
//   } else {
//     res.type('txt').send('404 Not Found');
//   }
// });
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
});
