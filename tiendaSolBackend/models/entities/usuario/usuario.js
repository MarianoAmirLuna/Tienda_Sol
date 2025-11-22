export class Usuario {
  nombre;
  apellido;
  password;
  email;
  telefono;
  fechaAlta;

  constructor(nombre, email, telefono, apellido, password) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.apellido = apellido;
    this.password = password;
    this.fechaAlta = new Date();
  }

  getNombre() {
    return this.nombre;
  }

  getId() {
    return this.id;
  }

  setId(new_id) {
    this.id = new_id;
  }
}
