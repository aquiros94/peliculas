import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.css']
})
export class ListadoGenericoComponent implements OnInit {

  @Input() public listado : Array<any> | undefined;
  @Input() public tituloGenerico : string | undefined;

  constructor() {}

  ngOnInit(): void {
  }

}
