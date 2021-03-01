import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { actorCreacionDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiURL : string;

  constructor(private http : HttpClient) {
    this.apiURL = environment.apiURL + "actores";
  }

  public Crear(nuevoActor : actorCreacionDTO) : Observable<any>{
    debugger;
    return this.http.post(this.apiURL, nuevoActor);
  }

}
