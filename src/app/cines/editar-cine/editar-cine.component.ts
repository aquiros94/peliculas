import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  public modeloBBDD : cineDTO | undefined;
  public errores : string[];

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private servicioCine : CinesService) { 
    this.errores = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        this.servicioCine.Obtener(params.id).subscribe(
          genero => {
            debugger;
            this.modeloBBDD = genero;
          },
          ()=> {
            this.router.navigate(['/cines']);
          });
    });
  }

  public guardarCambios(cine : cineCreacionDTO){
    this.servicioCine.Editar(this.modeloBBDD.id, cine).subscribe(
      ()=>{
        this.router.navigate(["/cines"]);
      },
      (errores)=>{
        this.errores = parsearErroresAPI(errores);
      }
    )
  }
}
