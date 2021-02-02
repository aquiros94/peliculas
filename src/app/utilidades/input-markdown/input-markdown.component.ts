import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  public contenidoMardown : string;
  @Output() public markdownComunicador;

  constructor() { 
    this.contenidoMardown = "";
    this.markdownComunicador = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  public inputTextArea(evento : any){
    this.contenidoMardown = "";
    if (evento.value  != null){
      this.contenidoMardown = evento.value;
      this.markdownComunicador.emit(this.contenidoMardown);
    }
    
  }
}
