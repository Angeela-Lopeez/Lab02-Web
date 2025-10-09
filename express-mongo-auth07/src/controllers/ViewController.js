import fetch from 'node-fetch';
class ViewController {
  signInPage(req, res) { res.render('signIn', { title: 'Iniciar sesión' }); }
  signUpPage(req, res) { res.render('signUp', { title: 'Registro' }); }
  dashboard(req, res) { res.render('dashboard_user', { title: 'Dashboard' }); }
  profile(req, res) { res.render('profile', { title: 'Mi cuenta' }); }
  forbidden(req, res) { res.status(403).render('403', { title: '403 - Acceso denegado', message: 'Acceso denegado' }); }
}

export default new ViewController();
