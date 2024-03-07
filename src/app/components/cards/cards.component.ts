import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
  ]
})
export class CardsComponent  implements OnInit {

  @Input("nome") name: string = '';
  @Input("raca") breed: string = '';
  @Input("img") src: string = 'https://ionicframework.com/docs/img/demos/card-media.png';
  
  constructor() { }

  ngOnInit() {}

}
