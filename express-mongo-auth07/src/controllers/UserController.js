// src/controllers/UserController.js
import userService from '../services/UserService.js';
import userRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (err) { next(err); }
  }

  async getMe(req, res, next) {
    try {
      const user = await userService.getById(req.userId);
      res.status(200).json(user);
    } catch (err) { next(err); }
  }

  async getById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await userRepository.findById(id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      return res.status(200).json({
        id: user._id, name: user.name, lastName: user.lastName,
        email: user.email, phoneNumber: user.phoneNumber, birthdate: user.birthdate,
        createdAt: user.createdAt, roles: user.roles.map(r => r.name), url_profile: user.url_profile, address: user.address
      });
    } catch (err) { next(err); }
  }

  async updateMe(req, res, next) {
    try {
      const id = req.userId;
      const payload = req.body;
      // si password -> actualizar hash
      if (payload.password) {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
        const hashed = await bcrypt.hash(payload.password, saltRounds);
        await userRepository.updatePassword(id, hashed);
        delete payload.password;
      }
      const updated = await userRepository.updateById(id, payload);
      res.status(200).json({ message: 'Perfil actualizado', user: updated });
    } catch (err) { next(err); }
  }
}

export default new UserController();
