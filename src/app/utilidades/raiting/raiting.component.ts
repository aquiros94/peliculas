import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-raiting',
  templateUrl: './raiting.component.html',
  styleUrls: ['./raiting.component.css']
})
export class RaitingComponent implements OnInit {

  @Input() public numeroMaximo : number;
  @Input() public estrellasSeleccionada : number;
  @Output() public eventoComunicador:EventEmitter<number>;
  public listaEstrellas : Array<number>;
  public estrellasSeleccionadoAnterior : number;

  constructor() {
    this.numeroMaximo = 5;
    this.listaEstrellas = [];
    this.estrellasSeleccionada = 0;
    this.estrellasSeleccionadoAnterior = 0;
    this.eventoComunicador = new EventEmitter<number>();
  }
  
  ngOnInit(): void {
    this.listaEstrellas = Array(this.numeroMaximo).fill(0)
  }

  public eventoMouseEnter(index : number) : void{
    this.estrellasSeleccionada = index + 1;
  }

  public eventoMouseLeave() : void{
    if (this.estrellasSeleccionadoAnterior != 0){
      this.estrellasSeleccionada = this.estrellasSeleccionadoAnterior;
    }else{
      this.estrellasSeleccionada = 0;
    }
  }

  public eventoClick(index : number) : void{
    this.estrellasSeleccionada = index + 1;
    this.estrellasSeleccionadoAnterior = this.estrellasSeleccionada;
    this.eventoComunicador.emit(this.estrellasSeleccionada);
  }

}
