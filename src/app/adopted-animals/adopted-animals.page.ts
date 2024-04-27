import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IAnimal } from '../interfaces/animal.interface';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CardsComponent } from '../components/cards/cards.component';
import { FormService } from '../services/form.service';
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
  
  constructor(private _formService: FormService) { }

  ngOnInit() {
    const auth = this._formService.getAuth();
    this.uid = auth.currentUser?.uid;
    if(this.uid) {
      this._formService.getAdoptedPetsByUser(this.uid).then(pets => {
        pets?.forEach(pet => {
          this.adoptedAnimals.push(pet.data() as IAnimal);
        })
      })
    }
  }

}
