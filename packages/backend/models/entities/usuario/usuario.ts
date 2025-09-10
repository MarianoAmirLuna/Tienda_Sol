import {TipoUsuario} from "./tipoUsuario"

export class Usuario{

    //TODO: Crear el repositorio de usuarios para poder setear el id
    //private id: string;
    private nombre: string;
    private email: string;
    private telefono: string;
    private tipo: TipoUsuario;
    private fechaAlta: Date;

    constructor(nombre: string, email: string, telefono: string, tipo: TipoUsuario, fechaAlta: Date){

        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.tipo = tipo;
        this.fechaAlta = fechaAlta;
    }
}