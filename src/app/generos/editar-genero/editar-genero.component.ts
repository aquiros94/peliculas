import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO, generoDTO } from '../generoCreacionDTO';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  public modeloBBDD : generoDTO | undefined;
  public errores : string[];
  
  constructor(private activatedRoute : ActivatedRoute, private router : Router, private servicioGenero : GenerosService) {
    this.errores = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        this.servicioGenero.Obtener(params.id).subscribe(
          genero => {
            debugger;
            this.modeloBBDD = genero;
          },
          ()=> {
            this.router.navigate(['/generos']);
          });
    });
  }

  public guardarCambios(genero : generoCreacionDTO) : void{
    this.servicioGenero.Editar(this.modeloBBDD.id, genero).subscribe(
      ()=>{
        this.router.navigate(["/generos"]);
      },
      (errores)=>{
        this.errores = parsearErroresAPI(errores);
      }
    )
    
  }

}
