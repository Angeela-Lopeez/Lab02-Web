// ticket.routes.js

const express = require("express");
const router = express.Router();
const controller = require("../controllers/TicketController");

// Ruta de prueba para generar un error
router.get("/test-error", (req, res, next) => {
  const error = new Error("Este es un error de prueba");
  error.statusCode = 400;
  next(error);
});

// Otras rutas
router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id/notifications", controller.getNotificationsByTicket); // Nueva ruta
router.put("/:id/assign", controller.assign);
router.put("/:id/status", controller.changeStatus);
router.delete("/:id", controller.delete);

module.exports = router;
