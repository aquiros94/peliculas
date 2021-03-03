import { Component, OnInit } from '@angular/core';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  public cine : cineDTO;

  constructor() { 
    this.cine = {id : 1, nombre : "Lagoh", latitud : 37.34288223059827, longitud : -365.83189487457275};
  }

  ngOnInit(): void {
  }

  public guardarCambios(cine : cineCreacionDTO){
    debugger;
    console.log(cine);
  }
}
