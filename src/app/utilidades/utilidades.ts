export function toBase64(fichero : File) {
    debugger;
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(fichero);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export function parsearErroresAPI(respuesta : any) : string[]{
    var mapaErrores : any;
    var entradas : any;
    var resultado : string[] = []

    debugger;
    if (respuesta.error){
        if (typeof respuesta.error === 'string'){
            resultado.push(respuesta.error);
        }else{
            mapaErrores = respuesta.error.errors;
            entradas = Object.entries(mapaErrores);
            entradas.forEach(arreglo => {
                const campo = arreglo[0];
                arreglo[1].forEach(mensajeError => {
                    resultado.push(`${campo}: ${mensajeError}`);
                });
            });
        }
    }

    return resultado;
}
