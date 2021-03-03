import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  private apiUrl : string;

  constructor(private http : HttpClient) { 
    this.apiUrl = environment.apiURL + "cines"
  }

  public Crear(nuevoCine : cineCreacionDTO) : Observable<any>{
    return this.http.post(this.apiUrl, nuevoCine);
  }
}
