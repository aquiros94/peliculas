import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import * as EventEmitter from 'events';
import { actorPeliculaDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  public control : FormControl;
  @Input() public listaActores : actorPeliculaDTO[];
  //private listaActoresOriginal : any[];
  @Input() public listaActoresSeleccionados : actorPeliculaDTO[];
  public columnasMostrar : any;
  @ViewChild(MatTable) table : MatTable<any>;

  constructor(private actoresService : ActoresService) {
    this.control = new FormControl();
    this.listaActores = [] //[{nombre : "Daniel Radcliffe", personaje : "", foto : "https://images.clarin.com/2012/07/13/r1o666nQx_340x340.jpg"},
    // {nombre : "Kit Harington", personaje : "", foto : "https://upload.wikimedia.org/wikipedia/commons/3/32/Kit_harrington_by_sachyn_mital_%28cropped_2%29.jpg"},
    // {nombre : "Emma Watson", personaje : "", foto : "https://media.vogue.mx/photos/5ea380c6a9c5e800087bd464/master/pass/Libros-que-recomienda-Emma-Watson.jpg"},
    // {nombre : "Rupert Grint", personaje : "", foto : "https://www.gente.com.ar/wp-content/uploads/2020/11/ruper-grint-620x464.jpg"},
    // {nombre : "Ralph Fiennes", personaje : "", foto : "http://cdn2.estamosrodando.com/biografias/4/8/ralph-fiennes-203840.jpg"},
    // {nombre : "Michael Gambon", personaje : "", foto : "http://es.web.img2.acsta.net/pictures/16/06/27/17/19/542013.jpg"}];
    //this.listaActoresOriginal = this.listaActores;
    this.listaActoresSeleccionados = [];
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      this.actoresService.ObtenerPorNombres(valor).subscribe(
        resultado =>{
          this.listaActores = resultado;
        },
        error=>{
          console.error(error);
        }
      );
      // this.listaActores = this.listaActoresOriginal;
      // this.listaActores = this.listaActores.filter(actor => actor.nombre.indexOf(valor) !== -1);
    });
    this.columnasMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];
  }

  public opcionSeleccionado(event : MatAutocompleteSelectedEvent){
    this.listaActoresSeleccionados.push(event.option.value);
    debugger;
    this.control.patchValue("");
    debugger;
    if (this.table !== undefined){
      this.table.renderRows();
    }
  }

  public eliminarActorSeleccionado(actor : any){
    this.listaActoresSeleccionados.splice(this.listaActoresSeleccionados.findIndex(a => a.nombre === actor.nombre), 1);
    this.table.renderRows();
  }

  public finalizaArrastre(event : CdkDragDrop<any[]>){
    moveItemInArray(this.listaActoresSeleccionados, this.listaActoresSeleccionados.findIndex(actor => actor === event.item.data), event.currentIndex);
    this.table.renderRows();
  }
}
