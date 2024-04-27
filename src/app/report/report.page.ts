import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule, 
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule
  ]
})
export class ReportPage implements OnInit {

  reported: boolean = false;
  reportForm!: FormGroup;
  
  constructor(private formService: FormService) { }

  ngOnInit() {
    this.reportForm = new FormGroup({
      message: new FormControl('', Validators.required),
    })
  }

  makeReport() {
    console.log(this.reportForm.valid);
    if(!this.reportForm.valid) return;

    console.log('Passou')
    this.formService.makeReport(this.reportForm.get('message')?.value);
    this.reportForm.reset();
    this.reported = true;
  }

  setReport(response: boolean) {
    this.reported = response;
  }

}
