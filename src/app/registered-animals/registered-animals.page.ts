import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { CardsComponent } from '../components/cards/cards.component';
import { IAnimal, createAnimal } from '../interfaces/animal.interface';
import { HeaderComponent } from '../components/header/header.component';
import { AnimalService } from '../services/animal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registered-animals',
  templateUrl: './registered-animals.page.html',
  styleUrls: ['./registered-animals.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule, 
    FormsModule,
    FooterComponent,
    CardsComponent,
    HeaderComponent,
    RouterLink
  ]
})
export class RegisterAnimalsPage implements OnInit {

  uid: string | undefined = '';
  registeredAnimals: IAnimal[] = []

  constructor(private animalService: AnimalService){}

  ngOnInit(): void {
    const auth = this.animalService.getAuth();
    this.uid = auth.currentUser?.uid;
    if (this.uid) {
      this.animalService.getRegisteredPetsByUser(this.uid).then(animals => {
        animals?.forEach(animal => {
          const id = animal.id;
          const animalData: IAnimal = animal.data() as IAnimal;
          animalData.id = id;
          this.registeredAnimals.push(animalData);
        })
      }).catch(error => {
        console.log(error)
      });
    }
  }
}
