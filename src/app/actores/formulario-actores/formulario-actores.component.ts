import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  public formulario : FormGroup;
  @Output() public guardar;
  @Input() public actorEditar : actorCreacionDTO | undefined;

  constructor(private formBuilder : FormBuilder) {
    
    this.guardar = new EventEmitter<actorCreacionDTO>();
    this.formulario = this.formBuilder.group({
      nombre : [
        '', {
          validators : [Validators.required]
        }],
      fechaNacimiento : ''
    });
  }

  ngOnInit(): void {
    if (this.actorEditar != undefined){
      this.formulario.patchValue(this.actorEditar);
    } 
  }

  public onSubmit(){
    this.guardar.emit(this.formulario.value);
  }

}
