import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IAnimal, createAnimal } from '../interfaces/animal.interface';
import { IUser, createUser } from '../interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CheckboxGroupComponent } from '../components/checkbox-group/checkbox-group/checkbox-group.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';

@Component({
  selector: 'app-registered-animals',
  templateUrl: './registered-animal-details.page.html',
  styleUrls: ['./registered-animal-details.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    HeaderComponent,
    FooterComponent,
    CheckboxGroupComponent,
    CheckboxComponent
  ]
})
export class RegisteredAnimalsDetailsPage implements OnInit {

  public id: string;
  public animal: IAnimal = createAnimal();


  user: IUser = createUser();
  uid: string | undefined = '';
  
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
  }

  async getAnimal(id: string) {
    try {
      this.animal = await this.animalService.getAnimalById(id) as IAnimal;
    } catch(error) {
      console.log(error);
    }
  }

  async deleteAnimal() {
    this.animalService.deleteAnimal(this.id).then(() => {
      const index = this.user.registeredPets.indexOf(this.id);
      this.user.registeredPets.splice(index, 1);
      if(this.uid) {
        this.animalService.updateUser(this.uid, this.user)
      }
      this.router.navigateByUrl('/home');
    })
  }
}
