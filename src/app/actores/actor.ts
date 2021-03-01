export interface actorDTO {
    nombre : string;
    biografia : string;
    fechaNacimiento : Date;
    urlFoto : string;
}

export interface actorCreacionDTO {
    nombre : string;
    biografia : string;
    fechaNacimiento : Date;
    foto : File;
}
