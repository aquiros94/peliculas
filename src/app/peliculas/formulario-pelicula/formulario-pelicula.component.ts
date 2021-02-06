import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder : FormBuilder) {
    this.comunicadorGuardar = new EventEmitter<PeliculaCreacionDTO>();

    this.formulario = this.formBuilder.group({
      titulo : ['', {validators : [Validators.required]}],
      resumen : '',
      enCines : false,
      trailer : '',
      fechaLanzamiento : '',
      poster : ''
    });
  }

  ngOnInit(): void {
    if (this.peliculaEditar != undefined){
      this.formulario.patchValue(this.peliculaEditar);
    }
  }

  public guardarCambios() : void {
    this.comunicadorGuardar.emit(this.formulario.value);
  }

  public agregarFichero(fichero : File) : void {
    this.formulario.get('poster')?.setValue(fichero);
  }
}
