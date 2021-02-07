import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public listaGenerosSinSeleccionar : MultipleSelectorModel[];
  public listaGenerosSeleccionados : MultipleSelectorModel[];

  constructor(private formBuilder : FormBuilder) {
    this.listaGenerosSinSeleccionar = [{id : 1, valor : "Acción"}, {id : 2, valor : "Comedia"}, {id : 3, valor : "Romántico"}, {id : 4, valor : "Fantástico"}];
    this.listaGenerosSeleccionados = [];

    this.comunicadorGuardar = new EventEmitter<PeliculaCreacionDTO>();

    this.formulario = this.formBuilder.group({
      titulo : ['', {validators : [Validators.required]}],
      resumen : '',
      enCines : false,
      trailer : '',
      fechaLanzamiento : '',
      poster : '',
      generos : []
    });
  }

  ngOnInit(): void {
    if (this.peliculaEditar != undefined){
      this.formulario.patchValue(this.peliculaEditar);
    }
  }

  public guardarCambios() : void {
    this.formulario.get('generos')?.setValue(this.listaGenerosSeleccionados.map(x => x.id));
    this.comunicadorGuardar.emit(this.formulario.value);
  }

  public agregarFichero(fichero : File) : void {
    this.formulario.get('poster')?.setValue(fichero);
  }

  public modificarTexto(texto : string){
    this.formulario.get('resumen')?.setValue(texto);
  }
}
