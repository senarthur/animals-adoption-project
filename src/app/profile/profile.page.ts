import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';
import { CardsComponent } from '../components/cards/cards.component';

import { chevronForward } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service.';
import { IUser, createUser } from '../interfaces/user.interface';
import { Auth } from '@angular/fire/auth';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CardsComponent,
    FooterComponent,
    IonicModule, 
    CommonModule, 
    FormsModule,
    RouterLink
  ]
})
export class ProfilePage implements OnInit {

  user: IUser = createUser();

  
  constructor(private loadingController: LoadingController,
    private authService: AuthService,
    private animalService: AnimalService,
    private auth: Auth,
    private router: Router) { 
    addIcons({ chevronForward });
  }

  ngOnInit() {
    const uid = this.auth.currentUser?.uid;
    if(uid) {
      this.animalService.getUser(uid).then(userResponse => {
        this.user = userResponse.data() as IUser;
      })
    }
  }

  async signOut() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService.signOut().then(() => {
      loading.dismiss();
      this.router.navigate(['/login']);
    })

  }
}
