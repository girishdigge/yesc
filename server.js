// import { configDotenv } from 'dotenv';
import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import path from 'path';
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
console.log(process.env.NODE_ENV);
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public', 'dist')));
app.use('/', indexHTML);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);
app.use('/todo', todoRoutes);

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
