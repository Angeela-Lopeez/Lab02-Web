// src/routes/views.routes.js
import express from 'express';
import ViewController from '../controllers/ViewController.js';

const router = express.Router();

router.get('/', (req, res) => res.redirect('/signIn'));
router.get('/signIn', ViewController.signInPage);
router.get('/signUp', ViewController.signUpPage);
router.get('/dashboard', ViewController.dashboard); // usa ?role=admin|user
router.get('/profile', ViewController.profile);
router.get('/403', ViewController.forbidden);

export default router;
