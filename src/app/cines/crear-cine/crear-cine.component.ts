import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent implements OnInit {

  public errores : string[];

  constructor(private servicioCine : CinesService, private router : Router) { 
    this.errores = [];
  }

  ngOnInit(): void {
  }

  public guardarCambios(cine : cineCreacionDTO){
    debugger;
    this.servicioCine.Crear(cine).subscribe(() =>{
      this.router.navigate(["/cines"]);
    },
    error => {
      this.errores = parsearErroresAPI(error);
    });
  }
}
