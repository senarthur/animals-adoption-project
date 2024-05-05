import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service.';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IUser, createUser } from '../interfaces/user.interface';
import { CustomValidators } from './password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireAuthModule,
  ]
})
export class SignUpPage implements OnInit {

  registerForm!: FormGroup;
  user: IUser = createUser();

  formValid: boolean = true;
  message: string = '';
  
  constructor(private formBuilder: FormBuilder, 
    private loadingController: LoadingController, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      birthDate: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.passwordMatchValidator('password')])
    });
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
   
    console.log(this.registerForm)
    if (this.registerForm.valid) {
        this.saveUser();
        await this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password).then((userCredential) => {
        this.authService.saveUserBasicDetails(this.user, userCredential).then(() => {
          this.router.navigate(['/home']);
          loading.dismiss();
        }).catch(error => {
          loading.dismiss();
          this.message = 'Erro ao registrar';
          this.formValid = false;
        })
      }).catch(error => {
        loading.dismiss();
        this.message = 'Erro ao registrar';
        this.formValid = false;
      })
    } else {
      this.formValid = false;
      this.message = 'O formulário não está válido!';
    }

    loading.dismiss();
  }

  private saveUser() {
    const form = this.registerForm.value;
    this.user = {
      name: form.fullName,
      email: form.email,
      age: this.getAge(form.birthDate),
      phone: form.phone,
      photoUrl: 'https://firebasestorage.googleapis.com/v0/b/animals-adoption-project.appspot.com/o/users%2Fgeneric-profile.jpg?alt=media&token=2b8bbaab-9475-41bb-9a2b-127eec7f906e',
      adoptedPets: [],
      registeredPets: []
    }
  }

  private getAge(date: string) {
    const value = new Date(date);
    const now = new Date();
    let difference = now.getTime() - value.getTime();
    return Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
  }

  setFormValid(boolean: boolean) {
    this.formValid = boolean;
  }
}
