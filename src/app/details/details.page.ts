import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnimal, createAnimal } from '../interfaces/animal.interface';
import { FormService } from '../services/form.service';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { CheckboxGroupComponent } from '../components/checkbox-group/checkbox-group/checkbox-group.component';
import { HeaderComponent } from '../components/header/header.component';
import { IUser, createUser } from '../interfaces/user.interface';

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
    HeaderComponent
  ]
})
export class DetailsPage implements OnInit {

  public id: string;
  public animal: IAnimal = createAnimal();

  user: IUser = createUser();
  uid: string | undefined = '';
  
  constructor(private activatedRoute: ActivatedRoute, private _formService: FormService, private router: Router) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.getAnimal(this.id);
  }

  ngOnInit(): void {
    const auth = this._formService.getAuth();
    this.uid = auth.currentUser?.uid;
    if(this.uid) {
      this._formService.getUser(this.uid).then(user => {
        this.user = user.data() as IUser;
      })
    }
  }

  async getAnimal(id: string) {
    try {
      this.animal = await this._formService.getAnimalById(id) as IAnimal;
    } catch(error) {
      console.log(error);
    }
  }

  async adopt() {
    const adoptedAnimal = this.animal;
    if (this.uid != undefined) {
      adoptedAnimal.userId = this.uid;
      this._formService.updateAnimal(this.id, adoptedAnimal);

      this.user.adoptedPets.push(this.id);
      this._formService.updateUser(this.uid, this.user);

      this.router.navigateByUrl('/home');
    }
    console.log("Adotado!")
  }
}
