// src/controllers/ViewController.js
class ViewController {
  signInPage(req, res) { res.render('signIn', { title: 'Iniciar sesión' }); }
  signUpPage(req, res) { res.render('signUp', { title: 'Registro' }); }

  // Render según query ?role=admin|user
  dashboard(req, res) {
    const role = (req.query.role || 'user').toLowerCase();
    const view = role === 'admin' ? 'dashboard_admin' : 'dashboard_user';
    res.render(view, { title: 'Dashboard' });
  }

  profile(req, res) { res.render('profile', { title: 'Mi cuenta' }); }

  forbidden(req, res) {
    res.status(403).render('403', { title: '403 - Acceso denegado', message: 'Acceso denegado' });
  }
}

export default new ViewController();
