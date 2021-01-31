import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RaitingComponent } from '../utilidades/raiting/raiting.component';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styleUrls: ['./ciclo-de-vida.component.css']
})
export class CicloDeVidaComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit {

  @Input() 
  titulo : string;
  @ViewChild(RaitingComponent)
  componenteEstrella: RaitingComponent;
  private timer: ReturnType<typeof setInterval>;

  //No es un evento del ciclo de vida
  constructor(private changeDetectorRef : ChangeDetectorRef) {
    this.titulo = "";
    this.componenteEstrella = new RaitingComponent();
    this.timer = setInterval(()=> console.log(new Date(),), 1000);
  }

  //Se ejecuta cada vez que hay un cambio en el componente.
  //SimpleChanges contiene los datos da valor anterior, valor actual y si es la primera vez que ocurre un cambio en el parámetro.
  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes');
    console.log(changes);
  }

  //Se ejecuta cuando desaparece un parámetro.
  ngOnDestroy(): void {
    console.log('on destroy');
    //Limpia el timer cuando desaparece el componente
    clearInterval(this.timer);
  }

  //Se ejecuta cada vez que necesita hacer una comprobación de componente(Una acción).
  ngDoCheck(): void {
    console.log('do check');
  }

  //Se ejecuta después del renderizado del componente(ngOnInit)
  ngAfterViewInit(): void {
    console.log('on after view init');
    //this.componenteEstrella.estrellasSeleccionada = 3;
    this.changeDetectorRef.detectChanges();
  }

  //Se ejecuta antes del renderizado del componente.
  ngOnInit(): void {
    console.log('on init');
    
  }

}
