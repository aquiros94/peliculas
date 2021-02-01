import { Component, OnInit } from '@angular/core';
import { actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  public actorParametro : actorCreacionDTO;

  constructor() {
    this.actorParametro = {nombre : "Daniel Radcliffe", fechaNacimiento : new Date("1989-07-23")}
  }

  ngOnInit(): void {
  }

  public guardarCambios(actor : actorCreacionDTO){
    console.log(actor);
  }
}
