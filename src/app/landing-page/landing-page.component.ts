import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public peliculasCine: Array<any> | undefined;
  public peliculasEstreno: Array<any> | undefined;

  constructor() { }

  ngOnInit(): void {

      this.peliculasCine = [
        {
          nombre : "India Jones",
          fecha : new Date(),
          precio : 1000,
          poster : "https://i.pinimg.com/originals/63/ce/5a/63ce5ad71ec888224fa7783cafede996.jpg"
        },
        {
          nombre : "Rocky",
          fecha : new Date('2020/10/13'),
          precio : 100,
          poster : "https://i.pinimg.com/originals/4e/9b/13/4e9b135d3cb31735832e7f3ac9c91741.jpg"
        },
        {
          nombre : "El señor de los anillos",
          fecha : new Date('2020/10/13'),
          precio : 100,
          poster : "https://static.posters.cz/image/750/poster/el-senor-de-los-anillos-i11969.jpg"
        },
        {
          nombre : "Harry Potter",
          fecha : new Date('2020/10/13'),
          precio : 2000,
          poster : "https://static.posters.cz/image/750/poster/harry-potter-undesirable-n5-i16373.jpg"
        }
      ];
    
      this.peliculasEstreno = [];

  }

}
