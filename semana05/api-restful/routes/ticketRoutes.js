const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/tickets', (req, res) => {
  const dbPath = path.join(__dirname, '../database/db.json');
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer la base de datos' });
    }
    const db = JSON.parse(data);
    res.json(db.tickets);
  });
});

router.post('/tickets', (req, res) => {
  const newTicket = req.body; // El ticket a agregar
  const dbPath = path.join(__dirname, '../database/db.json');
  
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer la base de datos' });
    }
    const db = JSON.parse(data);
    db.tickets.push(newTicket); // Agregar el ticket

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'No se pudo guardar el ticket' });
      }
      res.status(201).json(newTicket); // Responder con el ticket agregado
    });
  });
});

module.exports = router;
