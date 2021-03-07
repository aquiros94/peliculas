import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multiple-selector-model';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  @Output() public comunicadorGuardar : EventEmitter<PeliculaCreacionDTO>; 
  @Input() public peliculaEditar! : PeliculaDTO;

  public formulario : FormGroup;
  @Input() public listaGenerosSinSeleccionar : MultipleSelectorModel[];
  public listaGenerosSeleccionados : MultipleSelectorModel[];
  @Input() public listaCinesSinSeleccionar : MultipleSelectorModel[];
  public listaCinesSeleccionados : MultipleSelectorModel[];
  @Input() public actoresSeleccionados : actorPeliculaDTO[];
  @Input() public errores : string[];

  constructor(private formBuilder : FormBuilder) {
    this.listaGenerosSinSeleccionar = []//[{id : 1, valor : "Acción"}, {id : 2, valor : "Comedia"}, {id : 3, valor : "Romántico"}, {id : 4, valor : "Fantástico"}];
    this.listaCinesSinSeleccionar = []//[{id : 1, valor : "Nervión"}, {id : 2, valor : "Lagoh"}, {id : 3, valor : "Los Arcos"}, {id : 4, valor : "Eroski"}];
    this.listaGenerosSeleccionados = [];
    this.listaCinesSeleccionados = [];
    this.actoresSeleccionados = [];
    this.comunicadorGuardar = new EventEmitter<PeliculaCreacionDTO>();

    this.formulario = this.formBuilder.group({
      titulo : ['', {validators : [Validators.required]}],
      resumen : '',
      enCines : false,
      trailer : '',
      fechaLanzamiento : '',
      poster : '',
      generosId : [],
      cinesId : [],
      actores : []
    });
  }

  ngOnInit(): void {
    if (this.peliculaEditar != undefined){
      this.formulario.patchValue(this.peliculaEditar);
    }
  }

  public guardarCambios() : void {
    debugger;
    this.formulario.get('generosId')?.setValue(this.listaGenerosSeleccionados.map(val => val.id));
    this.formulario.get('cinesId')?.setValue(this.listaCinesSeleccionados.map(val => val.id));
    this.formulario.get('actores')?.setValue(this.actoresSeleccionados.map(val => {return {id: val.id, personaje : val.personaje}}));
    this.comunicadorGuardar.emit(this.formulario.value);
  }

  public agregarFichero(fichero : File) : void {
    this.formulario.get('poster')?.setValue(fichero);
  }

  public modificarTexto(texto : string){
    this.formulario.get('resumen')?.setValue(texto);
  }
}
