import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO } from '../generoCreacionDTO';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent implements OnInit {

  public errores : string[];

  constructor(private router : Router, private servicioGenero : GenerosService) { 
    this.errores = [];
  }

  ngOnInit(): void {
  }

  public guardarCambios(genero : generoCreacionDTO) : void{

    this.servicioGenero.Crear(genero).subscribe(() =>{
      this.router.navigate(["/generos"]);
    },
    error => {
      this.errores = parsearErroresAPI(error);
    });   
  }

}
