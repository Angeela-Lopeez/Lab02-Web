const http = require("http");
const repo = require("./repository/studentsRepository");
const PORT = 4000;
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { method, url } = req;
  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", () => {
    if (url === "/students" && method === "GET") {
      res.statusCode = 200;
      res.end(JSON.stringify(repo.getAll()));
    }
    else if (url.startsWith("/students/") && method === "GET") {
      const id = parseInt(url.split("/")[2]);
      const student = repo.getById(id);
      if (student) res.end(JSON.stringify(student));
      else { res.statusCode = 404; res.end(JSON.stringify({ error: "Estudiante no encontrado" })); }
    }
    else if (url === "/students" && method === "POST") {
      const newStudent = repo.create(JSON.parse(body));
      if (newStudent.error) {
        res.statusCode = 400;
        res.end(JSON.stringify(newStudent));
      } else {
        res.statusCode = 201;
        res.end(JSON.stringify(newStudent));
      }
    }
    else if (url.startsWith("/students/") && method === "PUT") {
      const id = parseInt(url.split("/")[2]);
      const updated = repo.update(id, JSON.parse(body));
      if (updated) res.end(JSON.stringify(updated));
      else { res.statusCode = 404; res.end(JSON.stringify({ error: "Estudiante no encontrado" })); }
    }
    else if (url.startsWith("/students/") && method === "PATCH") {
      const id = parseInt(url.split("/")[2]);
      const updated = repo.update(id, JSON.parse(body));
      if (updated) res.end(JSON.stringify(updated));
      else { res.statusCode = 404; res.end(JSON.stringify({ error: "Estudiante no encontrado" })); }
    }
    else if (url.startsWith("/students/") && method === "DELETE") {
      const id = parseInt(url.split("/")[2]);
      const deleted = repo.remove(id);
      if (deleted) res.end(JSON.stringify(deleted));
      else { res.statusCode = 404; res.end(JSON.stringify({ error: "Estudiante no encontrado" })); }
    }
    else if (url === "/ListByStatus" && method === "POST") {
      const { status } = JSON.parse(body);
      res.end(JSON.stringify(repo.listByStatus(status)));
    }
    else if (url === "/ListByGrade" && method === "POST") {
      const { gpa } = JSON.parse(body);
      res.end(JSON.stringify(repo.listByGPA(gpa)));
    }
    else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Ruta no encontrada" }));
    }
  });
});
server.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
