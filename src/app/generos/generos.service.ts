import { HttpClient, HttpParams } from '@angular/common/http';
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

  public ObtenerTodos(pagina : number, cantidadRegistrosMostrar : number) : Observable<any>{
    var parametro;
    
    parametro = new HttpParams();
    parametro = parametro.append('pagina', pagina.toString());
    parametro = parametro.append('registrosPorPagina', cantidadRegistrosMostrar.toString());
    return this.http.get<generoDTO[]>(this.apiUrl, {observe : 'response', params : parametro});
  }

  public Crear(nuevoGenero : generoCreacionDTO){
    return this.http.post(this.apiUrl, nuevoGenero);
  }

  public Obtener(id : number) : Observable<any>{
    return this.http.get<generoDTO>(this.apiUrl + "/" + id);
  }

  public Editar(id : number, genero : generoCreacionDTO) : Observable<any>{
    return this.http.put(this.apiUrl + "/" + id, genero);
  }

  public Eliminar(id : number){
    return this.http.delete(this.apiUrl + "/" + id);
  }
}
