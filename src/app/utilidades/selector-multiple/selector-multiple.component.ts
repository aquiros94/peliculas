import { Component, Input, OnInit, Output } from '@angular/core';
import { MultipleSelectorModel } from './multiple-selector-model';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  @Input() public listaSinSeleccionar! : MultipleSelectorModel[];
  @Input() public listaSeleccionados! : MultipleSelectorModel[]; 

  constructor() {
    this.listaSeleccionados = [];
  }

  ngOnInit(): void {
  }

  public seleccionarTodo() : void {
    this.listaSeleccionados.push(...this.listaSinSeleccionar);
    this.listaSinSeleccionar = []
  }

  public deseleccionarTodo() : void {
    this.listaSinSeleccionar.push(...this.listaSeleccionados);
    this.listaSeleccionados = []
  }

  public seleccionarItem(valor : MultipleSelectorModel, posicion : number) : void {
    this.listaSinSeleccionar.splice(posicion, 1);
    this.listaSeleccionados.push(valor);
  }

  public deseleccionarItem(valor : MultipleSelectorModel, posicion : number) : void {
    this.listaSeleccionados.splice(posicion, 1);
    this.listaSinSeleccionar.push(valor);
  }
}
