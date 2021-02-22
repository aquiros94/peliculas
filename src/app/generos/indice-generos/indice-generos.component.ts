import { Component, OnInit } from '@angular/core';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  constructor(private generoService : GenerosService) { }

  ngOnInit(): void {
    debugger;
    this.generoService.ObtenerTodos().subscribe(
      generos => {
        console.log(generos);
      },
      error =>{
        parsearErroresAPI(error);
      }  
    );
  }

}
