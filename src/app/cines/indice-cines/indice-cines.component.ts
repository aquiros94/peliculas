import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent implements OnInit {

  public cines : cineDTO[];
  public columnasMostrar : any[];
  public cantidadTotalRegistros;
  public paginaActual = 1;
  public cantidadRegistrosMostrar = 10;

  constructor(private cinesService : CinesService) { 
    this.cines = []; //{id : 1, nombre : "prueba"}, {id : 2, nombre : "prueba1"}, {id : 3, nombre : "prueba2"}
    this.columnasMostrar = ['id', 'nombre', 'acciones'];
  }

  ngOnInit(): void {
    this.CargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  private CargarRegistros(pagina : number, cantidadMostrar : number){
    this.cinesService.ObtenerTodos(pagina, cantidadMostrar).subscribe(
      (respuesta : HttpResponse<cineDTO[]>) => {
        this.cines = respuesta.body;
        this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
      },
      error =>{
        parsearErroresAPI(error);
      }  
    );
  }

  public ActualizarPaginacion(datos : PageEvent){
    debugger;
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosMostrar = datos.pageSize;
    this.CargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  public EliminarRegistro(id : number){
    this.cinesService.Eliminar(id).subscribe(
      ()=>{
        this.CargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
      },
      (error)=>{
        console.error(error);
      }
    )
  }

}
