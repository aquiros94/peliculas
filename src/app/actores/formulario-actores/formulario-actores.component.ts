import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  public formulario : FormGroup;
  private haCambiadoFoto : boolean;
  @Output() public guardar;
  @Input() public actorEditar : actorDTO;
  @Input() public errores : string[] | undefined;

  constructor(private formBuilder : FormBuilder) {
    this.haCambiadoFoto = false;
    this.guardar = new EventEmitter<actorCreacionDTO>();
  }

  ngOnInit(): void {
    debugger;

    this.formulario = this.formBuilder.group({
      nombre : [
        '', {
          validators : [Validators.required]
        }],
      biografia : '',
      fechaNacimiento : '',
      foto : '',
    });

    if (this.actorEditar !== undefined){
      this.formulario.patchValue(this.actorEditar);
    } 
  }

  public onSubmit(){
    debugger;
    if (!this.haCambiadoFoto){
      this.formulario.value.foto = null;
    }
    this.guardar.emit(this.formulario.value);
  }

  public archivoSeleccionado(fichero : File){
    this.haCambiadoFoto = true;
    this.formulario.get('foto')?.setValue(fichero);
  }

  public tratarDescripcion(texto : string){
    this.formulario.get('biografia')?.setValue(texto);
  }
}
