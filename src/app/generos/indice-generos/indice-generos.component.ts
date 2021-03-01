import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { generoDTO } from '../generoCreacionDTO';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  public generos : generoDTO[];
  public columnasMostrar : any[];
  public cantidadTotalRegistros;
  public paginaActual = 1;
  public cantidadRegistrosMostrar = 10;

  constructor(private generoService : GenerosService) {
    this.generos = []; //{id : 1, nombre : "prueba"}, {id : 2, nombre : "prueba1"}, {id : 3, nombre : "prueba2"}
    this.columnasMostrar = ['id', 'nombre', 'acciones'];
  }

  ngOnInit(): void {
    this.CargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  private CargarRegistros(pagina : number, cantidadMostrar : number){
    this.generoService.ObtenerTodos(pagina, cantidadMostrar).subscribe(
      (respuesta : HttpResponse<generoDTO[]>) => {
        console.log(respuesta);
        this.generos = respuesta.body;
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
    this.generoService.Eliminar(id).subscribe(
      ()=>{
        this.CargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
      },
      (error)=>{
        console.error(error);
      }
    )
  }
}
