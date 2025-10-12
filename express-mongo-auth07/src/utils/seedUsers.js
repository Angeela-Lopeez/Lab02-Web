// src/utils/seedUsers.js
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Role from '../models/Role.js';

/**
 * Crea un usuario admin si no existe.
 * IMPORTANTE: El server ya está conectado a Mongo cuando se llama a esta función.
 */
export default async function seedUsers() {
  const email = 'admin@example.com';

  // ¿ya existe?
  const existing = await User.findOne({ email }).exec();
  if (existing) {
    console.log('⚠️  Admin ya existe');
    return;
  }

  // buscar rol admin (si no existe, créalo por si acaso)
  let adminRole = await Role.findOne({ name: 'admin' }).exec();
  if (!adminRole) adminRole = await Role.create({ name: 'admin' });

  const hashed = await bcrypt.hash('Admin123#', 10);

  await User.create({
    name: 'Administrador',
    lastName: 'Principal',
    email,
    password: hashed,
    phoneNumber: '999999999',
    birthdate: new Date('1990-01-01'),
    address: 'Oficina Central',
    url_profile: 'https://via.placeholder.com/150',
    roles: [adminRole._id]  // <- OJO: tu esquema espera array de ObjectId
  });

  console.log('✅ Usuario admin creado correctamente');
}
