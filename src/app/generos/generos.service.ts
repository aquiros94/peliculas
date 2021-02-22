import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { generoCreacionDTO, generoDTO } from './generoCreacionDTO';

@Injectable({
  providedIn: 'root'
})

export class GenerosService {

  private apiUrl : string;

  constructor(private http : HttpClient) {
    this.apiUrl = environment.apiURL + "generos";
  }

  public ObtenerTodos() : Observable<generoDTO[]>{
    return this.http.get<generoDTO[]>(this.apiUrl);
  }

  public CrearGenero(nuevoGenero : generoCreacionDTO){
    return this.http.post(this.apiUrl, nuevoGenero);
  }
}
