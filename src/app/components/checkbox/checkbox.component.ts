import { Component, Host, Input, OnInit } from '@angular/core';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group/checkbox-group.component';
import { IonCheckbox, IonItem, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, 
    IonCheckbox,  
  ]
})
export class CheckboxComponent {

  @Input() value: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Input() onlyRead: boolean = false;

  constructor(@Host() public CheckboxGroup: CheckboxGroupComponent) { }

}
