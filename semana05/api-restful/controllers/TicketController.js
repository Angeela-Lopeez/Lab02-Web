const TicketService = require("../services/TicketService");
const NotificationService = require("../services/NotificationService");
const service = new TicketService();
const notificationService = new NotificationService();

exports.create = (req, res) => {
  const ticket = service.createTicket(req.body);
  res.status(201).json(ticket);
};

exports.list = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  if (page < 1 || limit < 1) {
    return res.status(400).json({ error: "Los valores de page y limit deben ser mayores que 0" });
  }

  const offset = (page - 1) * limit;
  const tickets = service.list();

  if (!tickets || tickets.length === 0) {
    return res.status(404).json({ message: "No se encontraron tickets" });
  }

  const paginatedTickets = tickets.slice(offset, offset + limit);

  res.status(200).json({
    page,
    limit,
    totalTickets: tickets.length,
    totalPages: Math.ceil(tickets.length / limit),
    data: paginatedTickets,
  });
};

exports.assign = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = service.assignTicket(id, user);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = service.changeStatus(id, status);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.delete = (req, res) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Nuevo método para obtener las notificaciones de un ticket
exports.getNotificationsByTicket = (req, res) => {
  const { id } = req.params; // El ID del ticket
  const notifications = notificationService.getNotificationsByTicket(id);

  if (!notifications || notifications.length === 0) {
    return res.status(404).json({ message: "No se encontraron notificaciones para este ticket" });
  }

  res.status(200).json(notifications);
};
