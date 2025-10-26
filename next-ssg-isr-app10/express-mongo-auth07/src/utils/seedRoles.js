import Role from '../models/Role.js';

export default async function seedRoles() {
    const existing = await Role.find();
    if (existing.length === 0) {
        await Role.create({ name: 'user' });
        await Role.create({ name: 'admin' });
        console.log('Seeded roles: user, admin');
    } else {
        console.log('Roles already exist:', existing);
    }
}
