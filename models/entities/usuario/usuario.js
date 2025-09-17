export class Usuario {
  nombre;
  email;
  telefono;
  tipo;
  fechaAlta;

  constructor(nombre, email, telefono, tipo) {
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.tipo = tipo;
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
