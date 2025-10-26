const express = require("express");
const router = express.Router();
const controller = require("../controllers/NotificationController");

router.post("/", controller.create); //crear una notificación
router.get("/", controller.list); //listar todas las notificaciones

module.exports = router;
