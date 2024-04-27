import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../components/header/header.component';
import { Router, RouterLink } from '@angular/router';
import { LoginServiceService } from '../services/loginService.service';

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

  constructor(private loginService: LoginServiceService, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    })
  }

  sendLinkReset() {
    if(this.formGroup.valid) {
      this.loginService.emailForResetPassword = this.formGroup.value.email;
      this.loginService.resetPassword(this.formGroup.value.email).then(() => {
        this.formGroup.reset();
        this.route.navigateByUrl('/link-sended');
      }).catch(err => {
        console.log(err.code, err.message);
      })
    }
    console.log(this.formGroup.valid, this.formGroup.value);
  }

}
