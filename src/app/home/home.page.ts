import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { FooterComponent } from '../components/footer/footer.component';
import { CardsComponent } from '../components/cards/cards.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonIcon,
    FooterComponent,
    CardsComponent
  ],
})
export class HomePage {

  user: string = 'Anna';
  
  constructor() { }
}
