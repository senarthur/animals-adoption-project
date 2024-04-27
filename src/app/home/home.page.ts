import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonToggle, IonButtons } from '@ionic/angular/standalone';
import { FooterComponent } from '../components/footer/footer.component';
import { CardsComponent } from '../components/cards/cards.component';

import { moon, sunnyOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormService } from '../services/form.service';
import { Subscription, tap } from 'rxjs';
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
  
  private _formService = inject(FormService);
  animals: IAnimal[] = [];
  animals$ = this._formService.getAnimals();

  goldenPets: IAnimal[] = [];
  sdrPets: IAnimal[] = [];
  
  constructor(private auth: Auth) { 
    addIcons({ moon, sunnyOutline });
  }
  
  ngOnInit(): void {
    const uid = this.auth.currentUser?.uid;
    if(uid) {
      this._formService.getUser(uid).then(userResponse => {
        const user: IUser = userResponse.data() as IUser;
        const fullName = user.name.split(' ');
        this.user = fullName[0];
      })
    }
    // TESTE COM OBSERVABLE ADICIONANDO EM UMA OUTRA VARIAVEL EM VEZ DE ADICIONR O ASYN PIPE NO HTML
    // this._formService.getAnimals().subscribe((value) => {
    //   this.animals = value;
    //   console.log(this.animals.filter(animal => animal.userId == ''))
    // })
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

  async getGoldenPets() {
    this._formService.getAnimalByName('Golden Retriever').then(animals => {
      animals?.forEach((animal) => {
        this.goldenPets.push({ ...animal.data(), id: animal.id } as IAnimal);
      })
    })
  }

  async getSdrPets() {
    this._formService.getAnimalByName('SRD').then(animals => {
      animals?.forEach((animal) => {
        this.sdrPets.push({ ...animal.data(), id: animal.id } as IAnimal);
      })
    })
  }
}
