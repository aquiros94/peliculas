export function toBase64(fichero : File) {
    debugger;
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(fichero);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
