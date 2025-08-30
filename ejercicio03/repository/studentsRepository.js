let students = [
  {
    id: 1,
    name: "Angela Lopez",
    grade: 19,
    age: 20,
    email: "angela.lopez@tecsup.edu.pe",
    phone: "987654321",
    enrollmentNumber: "2025001",
    course: "Diseño y Desarrollo de Software C24",
    year: 3,
    subjects: ["Algoritmos", "Bases de Datos", "Redes"],
    gpa: 3.8,
    status: "Activo",
    admissionDate: "2022-03-01"
  },
  {
    id: 2,
    name: "Juan Torres",
    grade: 18,
    age: 22,
    email: "juan.torres@tecsup.edu.pe",
    phone: "987654322",
    enrollmentNumber: "2025002",
    course: "Diseño y Desarrollo de Software C24",
    year: 3,
    subjects: ["Programación", "Redes", "Base de Datos"],
    gpa: 3.5,
    status: "Activo",
    admissionDate: "2023-03-01"
  },
];
function getAll() { return students; }
function getById(id) { return students.find(s => s.id === id); }
function create(student) {
  if (!student.name || !student.email || !student.course || !student.phone) {
    return { error: "Faltan campos obligatorios: name, email, course, phone" };
  }
  student.id = students.length + 1;
  students.push(student);
  return student;
}
function update(id, updateData) {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updateData };
    return students[index];
  }
  return null;
}
function remove(id) {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    return students.splice(index, 1)[0];
  }
  return null;
}
function listByStatus(status) {
  return students.filter(s => s.status === status);
}
function listByGPA(minGpa) {
  minGpa = Number(minGpa); 
  return students.filter(s => s.gpa >= minGpa);
}

module.exports = { getAll, getById, create, update, remove, listByStatus, listByGPA };
