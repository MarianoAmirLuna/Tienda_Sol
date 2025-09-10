export class Categoria{
    nombre: string;

    constructor( nombre:string){
        this.nombre = nombre;
    }

    getCategoria() : String {
        return this.nombre;
    }
}