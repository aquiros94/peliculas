import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css']
})
export class FormularioCineComponent implements OnInit {

  public formulario : FormGroup;
  @Output() public comunicadorGuardarCambios;
  @Input() public cineEditar! : cineDTO;

  constructor(private formBuilder : FormBuilder) { 
    this.formulario = this.formBuilder.group({
      nombre : ['', {validators : [Validators.required]}],
      coordenadas : {
        latitud : [2, {validators : [Validators.required]}],
        longitud : [2, {validators : [Validators.required]}]
      }
    });
    this.comunicadorGuardarCambios = new EventEmitter<cineCreacionDTO>();    
  }

  ngOnInit(): void {
    if (this.cineEditar !== undefined){
      this.formulario.patchValue(this.cineEditar);
    }
  }

  public realizarCambios(){
    this.comunicadorGuardarCambios.emit(this.formulario.value);
  }

  public obtenerCoordenadas(coordena : Coordenada){
    debugger;
    this.cineEditar.coordenada = coordena;
    this.formulario.patchValue(this.cineEditar);
  }
}
