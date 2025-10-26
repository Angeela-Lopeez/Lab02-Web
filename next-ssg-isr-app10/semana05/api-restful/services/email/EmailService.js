const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,  // 'gmail' como servicio
      auth: {
        user: process.env.MAILER_EMAIL,    // Tu correo de Gmail
        pass: process.env.MAILER_SECRET_KEY,  // Tu contraseña de Gmail
      },
      logger: true,
      debug: true,  // Activa la depuración para ver más detalles en los logs
    });
  }

  sendEmail(options) {
    const { to, subject, htmlBody } = options;

    try {
      this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
      })
      .then((info) => {
        console.log("Email enviado:", info.response);  // Verifica si el correo fue enviado correctamente
      })
      .catch((err) => {
        console.error("Error enviando el email:", err);  // Muestra el error si hay problemas
      });

      return true;
    } catch (error) {
      console.error("Error general:", error);  // Muestra errores generales
      return false;
    }
  }
}

module.exports = EmailService;
