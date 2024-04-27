import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonicModule } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';
import { LoginServiceService } from '../services/loginService.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IUser, createUser } from '../interfaces/user.interface';

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

  constructor(private formBuilder: FormBuilder, 
    private loadingController: LoadingController, 
    private loginService: LoginServiceService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })

    const formControls = this.registerForm.controls;
    Object.keys(formControls).forEach(key => {
    const control = formControls[key];
    const uniqueId = 'registerForm_' + key; // Adicionando 'registerForm_' como prefixo
    console.log(control);
});
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();
   
    if (this.registerForm.valid) {
        this.saveUser();
        await this.loginService.registerUser(this.registerForm.value.email, this.registerForm.value.password).then((userCredential) => {
        this.loginService.saveUserBasicDetails(this.user, userCredential).then(() => {
          this.router.navigate(['/home']);
          loading.dismiss();
        }).catch(error => {
          console.log('Erro ao adicionar o usuário no firebase: ', error)
          loading.dismiss();
        })
      }).catch(error => {
        console.log("Erro ao registrar" + error);
        loading.dismiss();
      })
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
}
