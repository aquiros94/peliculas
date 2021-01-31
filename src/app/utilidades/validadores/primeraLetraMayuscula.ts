import { AbstractControl, Validator, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula() {

    return (control : AbstractControl) => {

        if (control !== undefined){
            var valor = <string>control.value;
            
            if (valor && valor.length > 0){
                var primeraLetra = valor[0];
                if (primeraLetra !== primeraLetra.toUpperCase()){
                    return {
                        primeraLetraMayuscula : {
                            mensaje : "La primera letra debe ser mayúscula"
                        }
                    };
                }else{
                    return ;
                }
            }else{
                return ;
            }
        }else{
            return ;
        }
    }
}