import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO, cineDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  private apiUrl : string;

  constructor(private http : HttpClient) { 
    this.apiUrl = environment.apiURL + "cines"
  }

  public Obtener(id : number) : Observable<any>{
    return this.http.get<cineDTO>(this.apiUrl + "/" + id);
  }

  public ObtenerTodos(pagina : number, cantidadRegistrosMostrar : number) : Observable<any>{
    var parametro;
    
    parametro = new HttpParams();
    parametro = parametro.append('pagina', pagina.toString());
    parametro = parametro.append('registrosPorPagina', cantidadRegistrosMostrar.toString());
    return this.http.get<cineDTO[]>(this.apiUrl, {observe : 'response', params : parametro});
  }
  
  public Crear(nuevoCine : cineCreacionDTO) : Observable<any>{
    return this.http.post(this.apiUrl, nuevoCine);
  }

  public Editar(id : number, cine : cineCreacionDTO) : Observable<any>{
    return this.http.put(this.apiUrl + "/" + id, cine);
  }

  public Eliminar(id : number){
    return this.http.delete(this.apiUrl + "/" + id);
  }
}
