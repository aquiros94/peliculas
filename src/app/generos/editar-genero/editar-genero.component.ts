import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generoCreacionDTO } from '../generoCreacionDTO';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  public modeloBBDD : generoCreacionDTO;

  constructor(private activatedRoute : ActivatedRoute, private router : Router) {
    this.modeloBBDD = {nombre : "Acción"};
    debugger;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        console.log(params.id);
    });
  }

  public guardarCambios(genero : generoCreacionDTO) : void{
    console.log(genero);
    this.router.navigate(["/generos"]);
  }

}
