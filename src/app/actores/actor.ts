export interface actorDTO {
    id : number;
    nombre : string;
    biografia : string;
    fechaNacimiento : Date;
    foto : string;
}

export interface actorCreacionDTO {
    nombre : string;
    biografia : string;
    fechaNacimiento : Date;
    foto : File;
}

export interface actorPeliculaDTO {
    id : number;
    nombre : string;
    personaje : string;
    foto : string;
}
