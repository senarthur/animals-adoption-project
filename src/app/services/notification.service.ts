import { DoCheck, Injectable } from '@angular/core';
import { INotification } from '../interfaces/notification.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private noReadedNumber = new BehaviorSubject<number>(0);
  unreadedCount$ = this.noReadedNumber.asObservable();
  
  private notifications: INotification[] = [
    { 
      text: 'Seja bem vindo ao APP! Fique por dentro das novidades em nossas redes sociais!',
      read: false
    },
    { 
      text: 'Você sabia que no app é possível denunciar casos de maus-tratos? Não podemos permitir que situações como essa aconteçam! Faça sua parte.',
      read: false
    },
    {
      text: 'Viu algum animalzinho por aí na rua? Crie uma solicitação de recolhimento.',
      read: false
    },
    {
      text: 'Sua solicitação de adoção foi recebida pela ONG Cães Desabrigados.',
      read: false
    },
    {
      text: 'Novos animais estão esperando para ser adotados, que tal dar uma conferida?',
      read: false
    }
  ]

  constructor() {
    this.noReadNotificationsCount();
  }

  addNotification(notification: INotification) {
    this.notifications.push(notification);
    this.updateUnreadCount();
  }

  readNotification(index: number) {
    this.notifications[index].read = true;
    if(this.noReadedNumber.getValue() <= 0) {
      this.noReadedNumber.next(0);
    } else {
      this.noReadedNumber.next(this.noReadedNumber.getValue() - 1);
    }
  }

  getNotification(): INotification[] {
    return this.notifications.reverse();
  }

  private noReadNotificationsCount() {
    for(let notification of this.notifications) {
      if(!notification.read) {
        this.noReadedNumber.next(this.noReadedNumber.getValue() + 1);
      }
    }
  }

  private updateUnreadCount() {
    const unreadCount = this.noReadedNumber.value;
    this.noReadedNumber.next(unreadCount);
  }
}
