import { Component, OnInit } from '@angular/core';
import { IonTabBar, IonTabButton, IonTabs, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, person, home, add, search, notificationsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonIcon, 
    IonTabs,
    IonTabBar,
    IonTabButton
  ]
})
export class FooterComponent implements OnInit {

  constructor() { 
    addIcons({ settingsOutline, person, home, add, search, notificationsOutline});
  }

  ngOnInit() {}

}
