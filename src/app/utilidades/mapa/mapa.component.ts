import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker, LatLng } from 'leaflet';
import { cineDTO } from 'src/app/cines/cine';
import { Coordenada } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @Output() public coordenadas : EventEmitter<Coordenada>;
  @Input() public coordenadaObtenida!: Coordenada;

  public options : any;
  public marca!: Marker;
  
  constructor() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 18,
      center: latLng(37.373362294209095, -365.75699687004095)
    };
    this.coordenadas = new EventEmitter<Coordenada>();
  }

  ngOnInit(): void {
    if (this.coordenadaObtenida != undefined){
      debugger;
      this.options.center = latLng(this.coordenadaObtenida.latitud, this.coordenadaObtenida.longitud);
      this.marca = marker([this.coordenadaObtenida.latitud, this.coordenadaObtenida.longitud]);
    }
  }

  public clickMapa(eventoClick : LeafletMouseEvent){
    debugger;
    console.log({latitud : eventoClick.latlng.lat, longitud : eventoClick.latlng.lng});
    this.marca = marker([eventoClick.latlng.lat, eventoClick.latlng.lng]);
    this.coordenadas.emit({latitud : eventoClick.latlng.lat, longitud : eventoClick.latlng.lng + 360});
  }
}
