import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IAnimal } from '../interfaces/animal.interface';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CardsComponent } from '../components/cards/cards.component';
import { AnimalService } from '../services/animal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adopted-animals',
  templateUrl: './adopted-animals.page.html',
  styleUrls: ['./adopted-animals.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    HeaderComponent,
    FooterComponent,
    CardsComponent,
    RouterLink
  ]
})
export class AdoptedAnimalsPage implements OnInit {

  uid: string | undefined = '';
  adoptedAnimals: IAnimal[] = []
  
  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    const auth = this.animalService.getAuth();
    this.uid = auth.currentUser?.uid;
    if(this.uid) {
      this.animalService.getAdoptedPetsByUser(this.uid).then(pets => {
        pets?.forEach(pet => {
          this.adoptedAnimals.push(pet.data() as IAnimal);
        })
      })
    }
  }

}
