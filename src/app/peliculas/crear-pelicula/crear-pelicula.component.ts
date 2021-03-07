import { Component, OnInit } from '@angular/core';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multiple-selector-model';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { PeliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})

export class CrearPeliculaComponent implements OnInit {

  public generosNoSeleccionados : MultipleSelectorModel[];
  public cinesNoSeleccionado : MultipleSelectorModel[];
  public errores : string[];

  constructor(private peliculaService : PeliculasService) { }

  ngOnInit(): void {
    this.peliculaService.PostGet().subscribe(
      resultado => {
        this.generosNoSeleccionados = resultado.generos.map(g => { return <MultipleSelectorModel>{id : g.id, valor : g.nombre}});
        this.cinesNoSeleccionado = resultado.cines.map(g => { return <MultipleSelectorModel>{id : g.id, valor : g.nombre}});
      },
      error => {
        console.error(error);
      });
  }

  public guardarCambios(pelicula : PeliculaCreacionDTO) : void{
    this.peliculaService.Crear(pelicula).subscribe(
    () =>{
      console.log("exitoso");
    },
    (error) => {
      this.errores = parsearErroresAPI(error); 
    });
  }
}
