import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  @Output() public markdownComunicador;
  @Input() public tituloEditar : string;
  @Input() public contenidoMardown! : string;
  
  constructor() { 
    this.markdownComunicador = new EventEmitter<string>();
    this.tituloEditar = ""
  }

  ngOnInit(): void {
    debugger;
    console.log(this.contenidoMardown);
  }
 
  public modificarTexto(evento : any) : void{
    this.markdownComunicador.emit(evento.target.value);
  }
}
