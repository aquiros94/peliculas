export interface Coordenada {
    latitud : number;
    longitud : number;
}

export interface CoordenadaMensaje extends Coordenada{
    mensaje : string;
}
