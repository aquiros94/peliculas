import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeliculaCreacionDTO, PeliculaDTO, PeliculaPostGetDTO } from './pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiURL : string;

  constructor(private http : HttpClient) { 
    this.apiURL = environment.apiURL + "peliculas";
  }

  public ObtenerPorId(id : number) : Observable<PeliculaDTO>{
    return this.http.get<PeliculaDTO>(this.apiURL + "/" + id)
  }
  public PostGet() : Observable<PeliculaPostGetDTO>{
    return this.http.get<PeliculaPostGetDTO>(this.apiURL + "/postget");
  }

  public Crear(pelicula : PeliculaCreacionDTO){
    debugger;
    return this.http.post(this.apiURL, this.ConstruirFormData(pelicula));
  }

  private ConstruirFormData(pelicula : PeliculaCreacionDTO) : FormData{
    var formData : FormData;
    formData = new FormData();

    formData.append('Titulo', pelicula.titulo);
    formData.append('Resumen', pelicula.resumen);
    formData.append('Trailer', pelicula.trailer);
    formData.append('EnCines', String(pelicula.enCines));
    if (pelicula.fechaLanzamiento){
      formData.append('FechaLanzamiento', new Date(pelicula.fechaLanzamiento.toString()).toUTCString());
    }
    
    if (pelicula.poster){
      formData.append('Poster', pelicula.poster);
    }

    formData.append('GenerosIds', JSON.stringify(pelicula.generosId));
    formData.append('CinesIds', JSON.stringify(pelicula.cinesId));
    formData.append('Actores', JSON.stringify(pelicula.actores));

    return formData;
  }
}
