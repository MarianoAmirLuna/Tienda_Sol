export class DireccionEntrega{
    private calle: string
    private altura: string
    private piso: string
    private departamento: string
    private codigoPostal: string
    private ciudad: string
    private provincia: string
    private pais: string
    private lat: string
    private lon: string
    
    constructor (calle: string, altura: string, piso: string,
                departamento: string, codigoPostal: string,
                ciudad: string, provincia: string, pais: string,
                lat: string, lon: string) {
        this.calle = calle;
        this.altura = altura;
        this.piso = piso;
        this.departamento = departamento;
        this.codigoPostal = codigoPostal;
        this.ciudad = ciudad;
        this.provincia = provincia;
        this.pais = pais;
        this.lat = lat;
        this.lon = lon
    }
}