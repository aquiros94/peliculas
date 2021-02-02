import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  public imagenBase64 : string;
  @Output() public archivoSeleccionado;
  @Input() public urlImagenActual : string;
   
  constructor() {
    this.imagenBase64 = "";
    this.archivoSeleccionado = new EventEmitter<File>();
    this.urlImagenActual = '';
  }

  ngOnInit(): void {
  }

  public change(evento : any){
    var fichero : File = evento.target.files[0];
    toBase64(fichero).then((value : string | any) => this.imagenBase64 = value).catch(error => console.log(error));
    this.archivoSeleccionado.emit(fichero);
    this.urlImagenActual = "";
  }
}
