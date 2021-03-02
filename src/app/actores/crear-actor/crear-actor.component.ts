import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  public errores : string[];
  
  constructor(private actoresService : ActoresService, private route : Router) { }

  ngOnInit(): void {
  }

  public guardarCambios(actor : actorCreacionDTO){
    debugger;
    this.actoresService.Crear(actor).subscribe(
      ()=>{
        this.route.navigate(["/actores"]);
      },
      (errores)=>{
        this.errores = parsearErroresAPI(errores);
      }
    );
  }
}
