import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonicModule } from '@ionic/angular';
import { GoogleAuthProvider } from 'firebase/auth';

import { addIcons } from 'ionicons';
import { eye, eyeOff } from 'ionicons/icons'
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service.';
import { IUser, createUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  isUserValid: boolean = true;

  passwordView: boolean = false;
  inputType: string = 'password';

  userGoogle: IUser= createUser();
  
  @ViewChild('password') password?: IonInput;

  constructor(private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private authService: AuthService,
    private router: Router) {
    addIcons({ eye, eyeOff })
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  tooglePasswordView() {
    if(this.password) {
      this.password.type == 'text' ? this.inputType = 'password' : this.inputType = 'text';
      this.passwordView = !this.passwordView;
    }
  }
  

  async signIn() {
    if (this.loginForm.valid) {
      this.isUserValid = true;
      const loading = await this.loadingController.create({
        message: 'Carregando...'
      });
      await loading.present();
      const user = await this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password).catch(error => {
        console.log("Erro ao entrar" + error);
        loading.dismiss();
        this.isUserValid = false;
      })

      if (user) {
        loading.dismiss();
        this.loginForm.reset();
        this.router.navigate(['/home']);
      }
    } else {
      this.isUserValid = false;
    }
  }

  async signInWithGoogle() {
    this.authService.signInWithGoogle().then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(credential) {
        // const token = credential.accessToken;
        const user = result.user;
        if(user.displayName && user.email && user.photoURL && user.uid) {
          this.userGoogle = {
            name: user.displayName,
            age: 0,
            email: user.email,
            phone: '00 00000-0000',
            photoUrl: user.photoURL,
            adoptedPets: [],
            registeredPets: []
          }
          this.authService.saveUserBasicDetailsGoogle(this.userGoogle, user.uid);
        }
        this.router.navigateByUrl('/home');
      }
      return null;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  setUserValid(visibility: boolean) {
    this.isUserValid = visibility;
  }
}
