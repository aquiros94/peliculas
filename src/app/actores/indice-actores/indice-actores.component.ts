import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  public actores : actorDTO[];
  public columnasMostrar : any[];
  public cantidadTotalRegistros;
  public paginaActual = 1;
  public cantidadRegistrosMostrar = 10;

  constructor(private actoresService : ActoresService) {
    this.actores = []; //{id : 1, nombre : "prueba"}, {id : 2, nombre : "prueba1"}, {id : 3, nombre : "prueba2"}
    //this.columnasMostrar = ['id', 'nombre', 'foto', 'acciones'];
    this.columnasMostrar = ['foto', 'nombre', 'acciones'];
  }

  ngOnInit(): void {
    this.CargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  private CargarRegistros(pagina : number, cantidadMostrar : number){
    this.actoresService.ObtenerTodos(pagina, cantidadMostrar).subscribe(
      (respuesta : HttpResponse<actorDTO[]>) => {
        console.log(respuesta);
        debugger;
        this.actores = respuesta.body;
        this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
      },
      error =>{
        parsearErroresAPI(error);
      }  
    );
  }

  public ActualizarPaginacion(datos : PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosMostrar = datos.pageSize;
    this.CargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  public EliminarRegistro(id : number){
    this.actoresService.Eliminar(id).subscribe(
      ()=>{
        this.CargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
      },
      (error)=>{
        console.error(error);
      }
    )
  }
}
