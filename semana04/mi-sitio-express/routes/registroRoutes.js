const express = require("express");
const router = express.Router();
const registroController = require("../controllers/registroController");

router.get("/", registroController.index);
router.post("/save", registroController.save);

module.exports = router;
