import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO, actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  public modeloBBDD : actorDTO;
  public errores : string[];
  
  constructor(private activatedRoute : ActivatedRoute, private router : Router, private servicioGenero : ActoresService) {
    this.errores = [];
  }

  ngOnInit(): void {
    debugger;
    this.activatedRoute.params.subscribe(
      params =>{
        this.servicioGenero.Obtener(params.id).subscribe(
          actor => {
            this.modeloBBDD = actor;
          },
          ()=> {
            this.router.navigate(['/actores']);
          });
    });
  }

  public guardarCambios(genero : actorCreacionDTO) : void{
    this.servicioGenero.Editar(this.modeloBBDD.id, genero).subscribe(
      ()=>{
        this.router.navigate(["/actores"]);
      },
      (errores)=>{
        this.errores = parsearErroresAPI(errores);
      }
    )
    
  }

}
