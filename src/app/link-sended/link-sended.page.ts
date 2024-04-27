import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { LoginServiceService } from '../services/loginService.service';

@Component({
  selector: 'app-link-sended',
  templateUrl: './link-sended.page.html',
  styleUrls: ['./link-sended.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    RouterLink,
    HeaderComponent
  ]
})
export class LinkSendedPage implements OnInit {

  email: string = '';
  
  constructor(private loginService: LoginServiceService) { }

  ngOnInit() {
    this.email = this.loginService.emailForResetPassword;
  }

}
