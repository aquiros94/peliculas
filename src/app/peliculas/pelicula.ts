import { actorPeliculaDTO } from "../actores/actor";
import { cineDTO } from "../cines/cine";
import { generoDTO } from "../generos/generoCreacionDTO";

export interface PeliculaCreacionDTO {
    titulo : string;
    resumen : string;
    enCines : boolean;
    trailer : string;
    fechaLanzamiento : Date;
    poster : File;
    generosId : number[];
    cinesId : number[];
    actores : actorPeliculaDTO[];
}

export interface PeliculaDTO {
    titulo : string;
    resumen : string;
    enCines : boolean;
    trailer : string;
    fechaLanzamiento : Date;
    poster : string;
    generos : generoDTO[];
    actores : actorPeliculaDTO[];
    cines : cineDTO[];
}

export interface PeliculaPostGetDTO {
    generos : generoDTO[];
    cines : cineDTO[];
}