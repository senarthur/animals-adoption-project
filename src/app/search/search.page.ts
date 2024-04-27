import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { close, checkmark } from 'ionicons/icons';
import { FooterComponent } from '../components/footer/footer.component';
import { CardsComponent } from '../components/cards/cards.component';
import { IAnimal } from '../interfaces/animal.interface';
import { FormService } from '../services/form.service';
import { RouterLink } from '@angular/router';
import { ChipComponent } from '../components/chip/chip.component';
import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule, 
    FormsModule,
    CardsComponent,
    FooterComponent,
    RouterLink,
    ChipComponent
  ]
})
export class SearchPage implements OnInit {

  animals: IAnimal[] = [];
  isSearching: boolean = false;

  @ViewChildren('small') small?: QueryList<ChipComponent>;
  @ViewChildren('medium') medium?: QueryList<ChipComponent>;
  @ViewChildren('big') big?: QueryList<ChipComponent>;
  
  constructor(private formService: FormService, private loadingController: LoadingController) { 
    addIcons({ close, checkmark })
  }

  ngOnInit() {
    this.animals = [];
  }

  async onSelected(event: ChipComponent) {
    if(event.selected === true) {
      event.selected = false;
      this.isSearching = false;
      this.animals = [];
      return;
    }

    if(this.small && this.medium && this.big) {
      this.small.first.selected = false;
      this.medium.first.selected = false;
      this.big.first.selected = false;
    }
    
    this.animals = [];
    event.selected = true;

    const loading = await this.loadingController.create();
    await loading.present();
    
    this.formService.getAnimalBySize(event.text).then(animals => {
      animals?.forEach(animal => {
        this.animals.push({...animal.data(), id: animal.id } as IAnimal);
      })
      loading.dismiss();
      this.isSearching = true;
    }).catch(error => {
      console.log(error)
    })
  }

  async search(event: IonSearchbar) {
    if(event.value == null || event.value == undefined) {
      return;
    }
    
    const first = event.value.charAt(0).toUpperCase();
    const letter = event.value.slice(1);
    const name = first + letter;
    
    this.animals = [];

    const loading = await this.loadingController.create();
    await loading.present();
    
    this.formService.getAnimalByName(name).then(animals => {
      animals?.forEach(animal => {
        this.animals.push({...animal.data(), id: animal.id } as IAnimal);
      })
      loading.dismiss();
      event.value = '';
      this.isSearching = true;
    }).catch(error => {
      console.log(error)
    })
  }
}
