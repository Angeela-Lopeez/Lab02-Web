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

// Configuración de __dirname (porque usamos módulos ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear instancia de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (Materialize, CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// Configuración del motor de vistas (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// -------------------
// RUTAS API
// -------------------
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// -------------------
// RUTAS WEB (Frontend EJS)
// -------------------
app.use('/', viewRoutes);

// -------------------
// PÁGINAS DE ERROR
// -------------------
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// Manejador global de errores
app.use((err, req, res, next) => {
    console.error('🔥 Error:', err);
    if (req.originalUrl.startsWith('/api/')) {
        res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
    } else {
        res.status(err.status || 500).render('403', { title: 'Acceso denegado', message: err.message });
    }
});

// -------------------
// CONEXIÓN A MONGODB
// -------------------
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
    .then(async () => {
        console.log('✅ Conectado a MongoDB');
        await seedRoles();   // Crea roles por defecto (user, admin)
        await seedUsers();   // Crea un usuario admin si no existe
        app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('❌ Error al conectar con MongoDB:', err);
        process.exit(1);
    });
