import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonToggle, IonButtons } from '@ionic/angular/standalone';
import { FooterComponent } from '../components/footer/footer.component';
import { CardsComponent } from '../components/cards/cards.component';

import { moon, sunnyOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AnimalService } from '../services/animal.service';
import { Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Auth } from '@angular/fire/auth';
import { IUser } from '../interfaces/user.interface';
import { IAnimal } from '../interfaces/animal.interface';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonToggle,  
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonIcon,
    FooterComponent,
    CardsComponent,
    AsyncPipe,
    RouterLink
  ],
})
export class HomePage implements OnInit {

  user: string = '';
  animalSub: Subscription | undefined;

  darkMode: boolean = false;
  
  animals: IAnimal[] = [];
  goldenPets: IAnimal[] = [];
  sdrPets: IAnimal[] = [];

  private limit = 15;
  
  constructor(private auth: Auth, private animalService: AnimalService) { 
    addIcons({ moon, sunnyOutline });
  }
  
  ngOnInit(): void {
    const uid = this.auth.currentUser?.uid;
    if(uid) {
      this.animalService.getUser(uid).then(userResponse => {
        const user: IUser = userResponse.data() as IUser;
        const fullName = user.name.split(' ');
        this.user = fullName[0];
      })
    }

    this.getRecentlyRegistereds();
    this.getGoldenPets();
    this.getSdrPets();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      Preferences.set({ key: 'darkModeActivated', value: 'true'});
    } else {
      Preferences.set({ key: 'darkModeActivated', value: 'false'});
    }
  }

  async getRecentlyRegistereds() {
    this.animalService.getRecentlyRegistereds().then(animals => {
      animals?.forEach((animal) => {
        this.animals.push({ ...animal.data(), id: animal.id } as IAnimal);
        AnimalService.timestampToDate(animal.data()['registeredAt']);
      })
    })
  }

  async getGoldenPets() {
    this.animalService.getAnimalByName('Golden Retriever', this.limit).then(animals => {
      animals?.forEach((animal) => {
        this.goldenPets.push({ ...animal.data(), id: animal.id } as IAnimal);
      })
    })
  }

  async getSdrPets() {
    this.animalService.getAnimalByName('SRD', this.limit).then(animals => {
      animals?.forEach((animal) => {
        this.sdrPets.push({ ...animal.data(), id: animal.id } as IAnimal);
      })
    })
  }
}
