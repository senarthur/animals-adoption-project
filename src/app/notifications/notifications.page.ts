import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';

import { addIcons } from 'ionicons';
import { notificationsOutline } from 'ionicons/icons';
import { HeaderComponent } from '../components/header/header.component';
import { NotificationItemComponent } from '../components/notification-item/notification-item.component';
import { INotification } from '../interfaces/notification.interface';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    FooterComponent,
    IonicModule, 
    CommonModule, 
    FormsModule,
    HeaderComponent,
    NotificationItemComponent
  ]
})
export class NotificationsPage implements OnInit {

  notifications: INotification[] = [];
  
  @ViewChild('content') content?: ElementRef;
  
  constructor(private notificationService: NotificationService) { 
    addIcons({ notificationsOutline });
  }

  ngOnInit() {
    this.notifications = this.notificationService.getNotification();
  }


}
