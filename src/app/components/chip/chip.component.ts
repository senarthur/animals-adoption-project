import { Component, Input, OnInit } from '@angular/core';
import { IonChip, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close, checkmark } from 'ionicons/icons';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  standalone: true,
  imports: [
    IonIcon, 
    IonChip,
    IonLabel 
  ]
})
export class ChipComponent  implements OnInit {

  @Input() text: string = '';
  @Input() selected: boolean = false;
  
  constructor() {
    addIcons({ close, checkmark })
   }

  ngOnInit() {}

  toogle() {
    this.selected = !this.selected;
  }
}
