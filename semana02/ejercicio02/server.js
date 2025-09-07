const http = require("http");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const PORT = 3000;
function renderTemplate(file, data, res) {
  const filePath = path.join(__dirname, "views", file);
  fs.readFile(filePath, "utf8", (err, templateData) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error interno del servidor");
      return;
    }
    const template = handlebars.compile(templateData);
    const html = template(data);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  });
}
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Página principal
    renderTemplate("home.hbs", {
      title: "Servidor con Handlebars",
      welcomeMessage: "Bienvenido al laboratorio de Node.js",
      day: new Date().toLocaleDateString("es-PE"),
      students: ["Angela", "Mathias", "Erik", "Sebas"],
    }, res);
  } else if (req.url === "/about") {
    const now = new Date();
    const date = now.toLocaleDateString("es-PE");
    const time = now.toLocaleTimeString("es-PE");
    renderTemplate("about.hbs", {
      course: "Desarrollo Web Avanzado",
      teacher: "Edwin Arévalo",
      date,
      time,
    }, res);
  } else if (req.url === "/students") {
    const students = [
      { name: "Angela", grade: 17 },
      { name: "Mathias", grade: 14 },
      { name: "Erik", grade: 16 },
      { name: "Sebas", grade: 13 },
    ].map(s => ({ ...s, highlight: s.grade > 15 }));
    renderTemplate("students.hbs", { students }, res);
  } else {
    res.statusCode = 404;
    res.end("<h1>404 - Página no encontrada</h1>");
  }
});
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
