const { v4: uuidv4 } = require("uuid");
const NotificationRepository = require("../repositories/NotificationRepository");
const EmailService = require("./email/EmailService");

class NotificationService {
  constructor() {
    this.repo = new NotificationRepository();
    this.emailService = new EmailService(); // Instancia de EmailService
  }

  // Crear notificación
  create(type, message, ticketId) {
    const notification = {
      id: uuidv4(),
      type,
      message,
      status: "pending",
      ticketId
    };

    if (type === "email") {
      this.emailService.sendEmail({
        to: "angela.lopez@tecsup.edu.pe",  // Tu correo para recibir la notificación
        subject: "API RESTful - Alertas del sistema de Tickets",
        htmlBody: `<h1>${message}</h1>`  // El cuerpo del mensaje
      });
    }

    return this.repo.save(notification);
  }

  list() {
    return this.repo.findAll();
  }

  // Obtener notificaciones por ticketId
  getNotificationsByTicket(ticketId) {
    return this.repo.findByTicketId(ticketId);
  }
}

module.exports = NotificationService;
