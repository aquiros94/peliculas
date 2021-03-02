import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit, AfterViewInit {

  public formulario : FormGroup;
  @Output() public guardar;
  @Input() public actorEditar : actorDTO;
  @Input() public errores : string[] | undefined;

  constructor(private formBuilder : FormBuilder) {
    
    this.guardar = new EventEmitter<actorCreacionDTO>();
    
  }
  ngAfterViewInit(): void {
    debugger;
    if (this.actorEditar !== undefined){
      this.formulario.patchValue(this.actorEditar);
    } 
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

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public onSubmit(){
    this.guardar.emit(this.formulario.value);
  }

  public archivoSeleccionado(fichero : File){
    this.formulario.get('foto')?.setValue(fichero);
  }

  public tratarDescripcion(texto : string){
    this.formulario.get('biografia')?.setValue(texto);
  }
}
