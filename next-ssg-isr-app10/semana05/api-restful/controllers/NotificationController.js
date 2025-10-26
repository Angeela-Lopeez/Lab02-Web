const NotificationService = require("../services/NotificationService");
const service = new NotificationService();

// crear notificación
exports.create = (req, res) => {
  const { type, message, ticketId } = req.body;

  if (!type || !message || !ticketId) { // Validar los parámetros 
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  const notification = service.create(type, message, ticketId);
  res.status(201).json(notification); // Retorna la notificación 
};

exports.list = (req, res) => {
  res.status(200).json(service.list());
};
