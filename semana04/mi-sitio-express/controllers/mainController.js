const messages = [];

const home = (req, res) => {
  res.render("home", { title: "Inicio" });
};

const about = (req, res) => {
  res.render("about", { title: "Acerca de" });
};

const contact = (req, res) => {
  res.render("contact", { title: "Contacto" });
};

const saveContact = (req, res) => {
  const { nombre, email, mensaje } = req.body;

  messages.push({ nombre, email, mensaje });

  console.log("Nuevo mensaje:", { nombre, email, mensaje });

  res.redirect("/admin");
};

const admin = (req, res) => {
  res.render("admin", { title: "Admin", messages });
};

module.exports = { home, about, contact, saveContact, admin };
