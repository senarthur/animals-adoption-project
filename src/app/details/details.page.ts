import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IAnimal, IVaccines, createAnimal, createVaccines } from '../interfaces/animal.interface';
import { AnimalService } from '../services/animal.service';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { CheckboxGroupComponent } from '../components/checkbox-group/checkbox-group/checkbox-group.component';
import { HeaderComponent } from '../components/header/header.component';
import { IUser, createUser } from '../interfaces/user.interface';
import { CardsComponent } from '../components/cards/cards.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    FooterComponent,
    CheckboxGroupComponent,
    CheckboxComponent,
    HeaderComponent,
    CardsComponent,
    RouterLink
  ]
})

export class DetailsPage implements OnInit {
  
  public id: string;
  public animal: IAnimal = createAnimal();
  public moreAnimals: IAnimal[] = [];

  user: IUser = createUser();
  uid: string | undefined = '';
  vaccines: IVaccines = createVaccines();
  
  private limit = 4;
  
  constructor(private activatedRoute: ActivatedRoute, private animalService: AnimalService, private router: Router) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.getAnimal(this.id);
  }

  ngOnInit(): void {
    const auth = this.animalService.getAuth();
    this.uid = auth.currentUser?.uid;
    if(this.uid) {
      this.animalService.getUser(this.uid).then(user => {
        this.user = user.data() as IUser;
      })
    }

    this.animalService.getVaccines().subscribe(vaccines => {
      this.vaccines = vaccines[0];
    })

  }

  async getAnimal(id: string) {
    try {
      this.animal = await this.animalService.getAnimalById(id) as IAnimal;
      this.getSuggestion();
    } catch(error) {
      console.log(error);
    }
  }

  private async getSuggestion() {
    const filterAnimals: IAnimal[] = [];
    await this.animalService.getAnimalByName(this.animal.breed, ++this.limit).then(animals => {
      console.log(this.limit)
      animals?.forEach(animal => {
        filterAnimals.push({ ...animal.data(), id: animal.id } as IAnimal)
      })
      this.moreAnimals = filterAnimals.filter(animal => animal.id != this.id);
      console.log(this.moreAnimals);
    })
  }

  async adopt() {
    const adoptedAnimal = this.animal;
    if (this.uid != undefined) {
      adoptedAnimal.userId = this.uid;
      this.animalService.updateAnimal(this.id, adoptedAnimal);

      this.user.adoptedPets.push(this.id);
      this.animalService.updateUser(this.uid, this.user);

      this.router.navigateByUrl('/home');
    }
  }
}
