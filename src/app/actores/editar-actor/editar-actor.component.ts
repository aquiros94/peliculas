import { Component, OnInit } from '@angular/core';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  public actorParametro : actorDTO;

  constructor() {
    this.actorParametro = {nombre : "Daniel Radcliffe",fechaNacimiento : new Date("1989-07-23"), urlFoto : 'https://cdn.shopify.com/s/files/1/1878/3879/products/N3877_1000x1000.progressive.jpg?v=1551964399'}
  }

  ngOnInit(): void {
  }

  public guardarCambios(actor : actorCreacionDTO){
    console.log(actor);
  }
}
