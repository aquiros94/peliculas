import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  @Input() public peliculas : Array<any> | undefined;
  @Input() public titulo : string;
  
  constructor() { 
    this.titulo = "";
    this.peliculas = new Array();
  }

  ngOnInit(): void {
  }

  public borrarPelicula(numeroPelicula : number){
    if (this.peliculas != undefined){
      this.peliculas.splice(numeroPelicula, 1);
    }
  }

}
