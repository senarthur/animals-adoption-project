import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonItem, IonLabel } from "@ionic/angular/standalone";
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
  standalone: true,
  imports: [
    IonItem, 
    IonLabel
  ]
})
export class NotificationItemComponent  implements OnInit {

  @Input() index: number = 0;
  @Input() class: string = 'read';
  @Input() content: string = '';
  @Input() isReaded: boolean = false;

  constructor(private notificationService: NotificationService) { }

  
  ngOnInit() {}

  removeNotification() {
    if(!this.isReaded) {
      this.notificationService.readNotification(this.index);
      this.class = 'read';
    }
  }

}
