import {TipoUsuario} from "./tipoUsuario"

export class Usuario{

    private id: string;
    private nombre: string;
    private email: string;
    private telefono: string;
    private tipo: TipoUsuario;
    private fechaAlta: Date;

    constructor(id: string, nombre: string, email: string, telefono: string, tipo: TipoUsuario, fechaAlta: Date){

        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.tipo = tipo;
        this.fechaAlta = fechaAlta;
    }
}