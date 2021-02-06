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
  public coordenada! : Coordenada;
  @Output() public comunicadorGuardarCambios;
  @Input() public cineEditar! : cineDTO;

  constructor(private formBuilder : FormBuilder) { 
    this.formulario = this.formBuilder.group({
      nombre : ['', {validators : [Validators.required]}],
      latitud : ['', {validators : [Validators.required]}],
      longitud : ['', {validators : [Validators.required]}]
    });
    this.comunicadorGuardarCambios = new EventEmitter<cineCreacionDTO>();    
  }

  ngOnInit(): void {
    if (this.cineEditar !== undefined){
      this.formulario.patchValue(this.cineEditar);
      this.cineEditar.latitud = this.coordenada.latitud;
      this.cineEditar.longitud = this.coordenada.longitud;
    }
  }

  public realizarCambios(){
    this.comunicadorGuardarCambios.emit(this.formulario.value);
  }

  public obtenerCoordenadas(coordena : Coordenada){
    this.formulario.patchValue(coordena);
  }
}
