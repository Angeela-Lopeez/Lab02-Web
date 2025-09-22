const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const ticketRoutes = require("./routes/ticket.routes");
const notificationRoutes = require("./routes/notification.routes");

// Middleware
app.use(express.json()); // Para leer JSON en las solicitudes
app.use(cors()); // Permitir solicitudes de otros dominios
app.use(morgan("dev")); // Mostrar detalles de cada petición

// Definir las rutas
app.use("/tickets", ticketRoutes);
app.use("/notifications", notificationRoutes);

// Mensaje de prueba en la raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API RESTful!");
});

function errorHandler(err, req, res, next) {
  console.error(err.stack); 

  const statusCode = err.statusCode || 500; 
  const message = err.message || 'Internal Server Error'; 

  res.status(statusCode).json({
    error: message,
    details: err.details || null, 
  });
}

app.use(errorHandler);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
