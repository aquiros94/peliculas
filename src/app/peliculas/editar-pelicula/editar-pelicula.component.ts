import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  public pelicula : PeliculaDTO;

  constructor() {
    this.pelicula = {
      titulo : 'Harry Potter',
      enCines : true,
      poster : 'https://playmax.xyz/img/c/400/1/1485452104/492.jpg',
      resumen : 'La película es de Harry Potter',
      trailer : 'https://www.youtube.com/watch?v=M1me0fEgYxY',
      fechaLanzamiento : new Date(),
      generos : [2, 3]
    };
  }

  ngOnInit(): void {
  }

  public guardarCambios(pelicula : any) : void{
    console.log(pelicula);
  }
}
