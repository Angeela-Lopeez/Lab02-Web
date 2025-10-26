// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import viewRoutes from './routes/views.routes.js';

import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';

dotenv.config();

// __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Estáticos (si tienes /src/public; si no, puedes quitar esta línea)
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas EJS (vistas están en /src/views)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Rutas Web (EJS)
app.use('/', viewRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  if (req.originalUrl.startsWith('/api/')) {
    res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
  } else {
    res.status(err.status || 500).render('403', { title: 'Acceso denegado', message: err.message });
  }
});

// Conexión a MongoDB y arranque
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
  .then(async () => {
    console.log('✅ Conectado a MongoDB');
    await seedRoles(); // crea user/admin si faltan
    await seedUsers(); // crea admin si falta
    app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar con MongoDB:', err);
    process.exit(1);
  });
