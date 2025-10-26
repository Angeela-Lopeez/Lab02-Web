const catalogo = [];

const index = (req, res) => {
  res.render("peliculas/index", { catalogo });
};

const save = (req, res) => {
  const { titulo, genero, actriz, año, descripcion } = req.body;

  catalogo.push({ titulo, genero, actriz, año, descripcion });
  console.log("Registros en memoria:", catalogo);
  res.redirect("/peliculas");
};

module.exports = { index, save };
