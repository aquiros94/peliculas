import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { actorCreacionDTO, actorDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiURL : string;

  constructor(private http : HttpClient) {
    this.apiURL = environment.apiURL + "actores";
  }

  public Crear(nuevoActor : actorCreacionDTO) : Observable<any>{
    return this.http.post(this.apiURL, this.ConstruirFormData(nuevoActor));
  }

  private ConstruirFormData(actor : actorCreacionDTO) : FormData{
    var formData : FormData;

    formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia){
      formData.append('biografia', actor.biografia);
    }
    if (actor.fechaNacimiento){
      formData.append('fechaNacimiento', new Date(actor.fechaNacimiento.toString()).toUTCString());
    }

    if (actor.foto){
      formData.append('foto', actor.foto);
    }

    return formData;
  }

  public ObtenerTodos(pagina : number, cantidadRegistrosMostrar : number) : Observable<any>{
    var parametro;
    
    parametro = new HttpParams();
    parametro = parametro.append('pagina', pagina.toString());
    parametro = parametro.append('registrosPorPagina', cantidadRegistrosMostrar.toString());
    return this.http.get<actorDTO[]>(this.apiURL, {observe : 'response', params : parametro});
  }

  public Eliminar(id : number){
    return this.http.delete(this.apiURL + "/" + id);
  }

  public Obtener(id : number) : Observable<any>{
    return this.http.get<actorDTO>(this.apiURL + "/" + id);
  }

  public Editar(id : number, actor : actorCreacionDTO) : Observable<any>{
    return this.http.put(this.apiURL + "/" + id, this.ConstruirFormData(actor));
  }
}
