const http = require('http');
const PORT = 3000;
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Manejo de rutas
  if (req.url === "/") {
    res.statusCode = 200;
    res.end("<h1>Bienvenido al servidor Node.js 🚀</h1>");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.end("<h1>Acerca de nosotros</h1><p>Este es un servidor básico.</p>");
  } else if (req.url === "/contact") {
    res.statusCode = 200;
    res.end("<h1>Contacto</h1><p>Escríbenos a contacto@ejemplo.com</p>");
  } else if (req.url === "/services") {
    res.statusCode = 200;
    res.end(`
      <h1>Nuestros servicios</h1>
      <ul>
        <li>Diseño Web Avanzado</li>
        <li>Desarrollo de Aplicaciones Web</li>
        <li>Desarrollo de Soluciones en la Nube</li>
      </ul>
    `);
  } else if (req.url === "/error") {
    res.statusCode = 500;
    res.end("<h1>500 - Error del servidor</h1><p>Ocurrió un problema.</p>");
  } else {
    res.statusCode = 404;
    res.end("<h1>404 - Página no encontrada</h1>");
  }
});
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

