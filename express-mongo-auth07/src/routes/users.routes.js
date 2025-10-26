// src/routes/users.routes.js
import express from 'express';
import UserController from '../controllers/UserController.js';
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), UserController.getAll);
router.get('/me', authenticate, authorize([]), UserController.getMe);
router.get('/:id', authenticate, async (req, res, next) => {
  // permitir admin o el propio usuario
  if (req.userRoles.includes('admin') || req.userId === req.params.id) {
    return UserController.getById(req, res, next);
  }
  return res.status(403).json({ message: 'Prohibido' });
});
router.patch('/me', authenticate, authorize([]), UserController.updateMe);

export default router;
