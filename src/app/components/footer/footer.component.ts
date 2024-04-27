import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonBadge, IonFab, IonFabButton, IonFabList, IonFooter, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, person, home, add, search, notificationsOutline, chevronUp } from 'ionicons/icons';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'toolbar',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
    IonToolbar, 
    IonFooter, 
    IonFabList, 
    IonFabButton, 
    IonFab, 
    IonBadge, 
    IonIcon, 
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonBadge,
    RouterLinkWithHref
  ]
})
export class FooterComponent implements OnInit {

  notifications: number = 0;

  constructor(private notificationService: NotificationService) { 
    addIcons({ settingsOutline, person, home, add, search, notificationsOutline, chevronUp});
  }

  ngOnInit() {
    this.notificationService.unreadedCount$.subscribe(count => {
      this.notifications = count;
    });
  }
}
