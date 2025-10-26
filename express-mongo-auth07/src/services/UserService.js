// src/services/UserService.js
import userRepository from '../repositories/UserRepository.js';

class UserService {
  async getAll() {
    const users = await userRepository.getAll();
    return users.map(u => ({
      id: u._id, name: u.name, lastName: u.lastName, email: u.email,
      phoneNumber: u.phoneNumber, createdAt: u.createdAt, roles: u.roles.map(r => r.name)
    }));
  }

  async getById(id) {
    const user = await userRepository.findById(id);
    if (!user) { const err = new Error('Usuario no encontrado'); err.status = 404; throw err; }
    return {
      id: user._id, email: user.email, name: user.name, lastName: user.lastName,
      phoneNumber: user.phoneNumber, birthdate: user.birthdate, address: user.address, url_profile: user.url_profile,
      roles: user.roles.map(r => r.name), createdAt: user.createdAt, age: user.age
    };
  }
}

export default new UserService();
