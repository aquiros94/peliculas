import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoordenadaMensaje } from 'src/app/utilidades/mapa/coordenada';
import { PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {

  public pelicula : PeliculaDTO;
  public fechaLanzamiento : Date;
  public trailerURL : SafeResourceUrl;
  public coordenadas : CoordenadaMensaje[];

  constructor(private peliculasService : PeliculasService, private activatedRoute : ActivatedRoute, private sanitazer : DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculasService.ObtenerPorId(params.id).subscribe(
        pelicula =>{
          this.pelicula = pelicula;
          this.fechaLanzamiento = new Date(pelicula.fechaLanzamiento);
          this.trailerURL = this.GenerarURLYoutubeEmbed(pelicula.trailer);
          this.coordenadas = this.pelicula.cines.map(cine => { return {longitud : cine.longitud, latitud : cine.latitud, mensaje : cine.nombre}});
        },
        error =>{
          console.error(error);
        });
    })
  }

  public GenerarURLYoutubeEmbed(url : string) : SafeResourceUrl{
    if (!url){
      return "";
    }

    var videoId = url.split('v=')[1];
    var posicionAmpersand = videoId.indexOf('&');
    if (posicionAmpersand !== -1){
      videoId = videoId.substring(0, posicionAmpersand);
    }

    return this.sanitazer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + videoId);
  }

}
