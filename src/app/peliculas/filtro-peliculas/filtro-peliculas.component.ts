import { query } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  public formularioBusqueda : FormGroup
  public listadoPeliculasFiltro : any;
  public peliculasOrigen : Array<any>
  private formularioInicial : any;
  public generos : any;

  constructor(private formBuilder : FormBuilder, private location : Location, private activatedRoute : ActivatedRoute) { 
    this.generos = [{id : 1, nombre : "Drama"}, {id : 2, nombre : "Acción"}, {id : 3, nombre : "Comedia"}]
    
    this.formularioInicial = {
      nombre : '',
      generoId : 0,
      proximosEstrenos : false,
      enCines : false
    };

    this.formularioBusqueda = this.formBuilder.group(this.formularioInicial);

    this.peliculasOrigen = [
      {
        nombre : "India Jones",
        generos : [1, 2],
        proximosEstrenos : false,
        enCines : false,
        poster : "https://i.pinimg.com/originals/63/ce/5a/63ce5ad71ec888224fa7783cafede996.jpg"
      },
      {
        nombre : "Rocky",
        generos : [3],
        proximosEstrenos : false,
        enCines : false,
        poster : "https://i.pinimg.com/originals/4e/9b/13/4e9b135d3cb31735832e7f3ac9c91741.jpg"
      },
      {
        nombre : "El señor de los anillos",
        generos : [1],
        proximosEstrenos : true,
        enCines : false,
        poster : "https://static.posters.cz/image/750/poster/el-senor-de-los-anillos-i11969.jpg"
      },
      {
        nombre : "Harry Potter",
        generos : [3, 2],
        proximosEstrenos : true,
        enCines : true,
        poster : "https://static.posters.cz/image/750/poster/harry-potter-undesirable-n5-i16373.jpg"
      }
    ];

    this.listadoPeliculasFiltro = this.peliculasOrigen;
  }

  ngOnInit(): void {
    
    this.formularioBusqueda.valueChanges.subscribe(valores => {
      this.listadoPeliculasFiltro = this.peliculasOrigen;
      this.filtrarPelicula(valores);
      this.escribirUrl();
    });

    this.leerValoresUrl();
  }

  private leerValoresUrl(){
    var objectoPelicula = this.formularioInicial;

    this.activatedRoute.queryParams.subscribe((parametro) => {
      if (parametro.nombre){
        objectoPelicula.nombre = parametro.nombre;
      }

      if (parametro.generoId){
        objectoPelicula.generoId = Number(parametro.generoId);
      }

      if (parametro.proximosEstrenos){
        objectoPelicula.proximosEstrenos = Boolean(parametro.proximosEstrenos);
      }

      if (parametro.enCines){
        objectoPelicula.enCines = Boolean(parametro.enCines);
      }

      this.formularioBusqueda.patchValue(objectoPelicula);
    });
  }

  private escribirUrl(){
    var urlString = [];
    var valoresFormulario = this.formularioBusqueda.value;

    if (valoresFormulario.nombre){
      urlString.push(`nombre=${valoresFormulario.nombre}`);
    }

    if (valoresFormulario.generoId){
      urlString.push(`generoId=${valoresFormulario.generoId}`);
    }

    if (valoresFormulario.proximosEstrenos){
      urlString.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if (valoresFormulario.enCines){
      urlString.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', urlString.join('&'));
  }

  private filtrarPelicula(valores: any) {
    debugger;
    if (valores.nombre){
      this.listadoPeliculasFiltro = this.listadoPeliculasFiltro.filter((p: { nombre: string }) => p.nombre.toUpperCase().indexOf(valores.nombre.toUpperCase()) != -1);
    }

    if (valores.generoId){
      this.listadoPeliculasFiltro = this.listadoPeliculasFiltro.filter((p: { generos: any }) => p.generos.indexOf(valores.generoId) != -1);
    }

    if (valores.enCines){
      this.listadoPeliculasFiltro = this.listadoPeliculasFiltro.filter((p: { enCines: boolean }) => p.enCines);
    }

    if (valores.proximosEstrenos){
      this.listadoPeliculasFiltro = this.listadoPeliculasFiltro.filter((p: { proximosEstrenos: boolean } ) => p.proximosEstrenos);
    }
  }

  public limpiarFormulario(){
    this.formularioBusqueda.patchValue(this.formularioInicial);
  }

}
