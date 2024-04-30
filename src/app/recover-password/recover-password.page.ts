import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service.';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
  standalone: true,
  imports: 
  [
    IonicModule, 
    CommonModule, 
    FormsModule,
    HeaderComponent,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class RecoverPasswordPage implements OnInit {
  formGroup!: FormGroup;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    })
  }

  sendLinkReset() {
    if(this.formGroup.valid) {
      this.authService.emailForResetPassword = this.formGroup.value.email;
      this.authService.resetPassword(this.formGroup.value.email).then(() => {
        this.formGroup.reset();
        this.route.navigateByUrl('/link-sended');
      }).catch(err => {
        console.log(err.code, err.message);
      })
    }
    console.log(this.formGroup.valid, this.formGroup.value);
  }

}
