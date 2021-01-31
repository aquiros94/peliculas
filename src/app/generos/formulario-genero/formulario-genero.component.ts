import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../generoCreacionDTO';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  public form : FormGroup;
  @Output() public onSubmit;
  @Input() public parametroGenero : generoCreacionDTO | undefined;

  constructor(private formBuilder : FormBuilder) { 
    this.onSubmit = new EventEmitter<generoCreacionDTO>();
    this.form = this.formBuilder.group({
      nombre:['',{
        validators : [Validators.required, Validators.minLength(3), primeraLetraMayuscula()]
      }]
    });

  }

  ngOnInit(): void {
    debugger;
    if (this.parametroGenero !== undefined){
      this.form.patchValue(this.parametroGenero);
    }
  }

  public guardarCambios() : void{
    this.onSubmit.emit(this.form.value);
  }

  public obtenerErrorCampo() : string{
    var campo : AbstractControl | null = this.form.get("nombre");

    if (campo != null){
      if (campo.hasError("required")){
        return "El campo nombre es obligatorio";
      }else{
        if (campo.hasError("minlength")){
          return "La longitud mínima es de 3 carácteres";
        }else{
          if (campo.hasError("primeraLetraMayuscula")){
            return campo.getError("primeraLetraMayuscula").mensaje;
          }else{
            return "";
          }
        }
      }
    }else{
      return "";
    }
  }

}
