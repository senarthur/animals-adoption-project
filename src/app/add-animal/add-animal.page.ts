import { Component, OnDestroy, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonItem, IonProgressBar, IonicModule } from '@ionic/angular';
import { FooterComponent } from '../components/footer/footer.component';

import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { FormService } from '../services/form.service';
import { IBreed } from '../interfaces/breed.interface';
import { Subscription } from 'rxjs';
import { CheckboxGroupComponent } from '../components/checkbox-group/checkbox-group/checkbox-group.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { IAnimal, createAnimal } from '../interfaces/animal.interface';
import { Router } from '@angular/router';
import { Storage, uploadBytesResumable } from '@angular/fire/storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { HeaderComponent } from '../components/header/header.component';
import { IUser, createUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.page.html',
  styleUrls: ['./add-animal.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    CheckboxGroupComponent,
    CheckboxComponent
  ]
})
export class AddAnimalPage implements OnInit, OnDestroy {
  
  private _formService = inject(FormService);
  private _storage = inject(Storage);
  
  animal: IAnimal = createAnimal();
  uid: string | undefined = '';
  user: IUser = createUser();

  labelText: string = 'Selecione uma imagem'
  progress: number = -1;
  
  formData!: FormGroup;

  @ViewChildren('inputPhoto') photoInput!: QueryList<IonItem>;
  @ViewChildren('progressBar') progressBar!: QueryList<IonProgressBar>

  /* Subscribers */ 
  breeds: IBreed[] = [];
  breedsSubs: Subscription | undefined;
  animals$ = this._formService.getAnimals();
  sizes$ = this._formService.getSizes();
  vaccines$ = this._formService.getVaccines();

  /* Link to Uploaded Image */
  private imageUrl: string = '';
  
  
  constructor(private form: FormService, private formBuilder: FormBuilder, private router: Router) {
    addIcons({ cameraOutline });
  }
  
  ngOnInit() {
    this.breedsSubs = this.form.getAllBreeds().subscribe((breedResponse) => {
      this.breeds = breedResponse;
    });

    this.uid = this._formService.getAuth().currentUser?.uid;
    if(this.uid) {
      this._formService.getUser(this.uid).then(user => {
        this.uid = user.id;
        this.user = user.data() as IUser;
      })
    }

    this.formData = this.formBuilder.group({
      name: ["", Validators.required],
      age: ["",Validators.required],
      gender: ["", Validators.required],
      breed: ["", Validators.required],
      size: ["", Validators.required],
      vaccines: [[]],
      image: [null,Validators.required]
    })

    this._formService.checkAppMode();

  }

  ngOnDestroy(): void {
    this.breedsSubs && this.breedsSubs.unsubscribe();
  }

  /* Seleção da raça */
  breedOptions = {
    header: 'Raça',
    subHeader: 'Selecione a raça do animal',
  };

  onFileSelected(event: any) {
    const selectedArchive: File = event.target.files[0];
    const textData = event.target.value.split('\\')
    
    // this.progress = 0.2;
    this.uploadImage(selectedArchive);
    this.labelText = textData[2];
  }

  uploadImage(file: File): boolean {
    const filePath = `arquivos/${file.name}`;
    const fileRef = ref(this._storage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);

    uploadFile.on("state_changed", (snapshot) => {
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes);
    }, (error) => {
      console.log("Erro ao carregar o arquivo: ", error)
      return false;
    }, async () => {
      this.imageUrl = await getDownloadURL(fileRef);
      this.progress = -1;
    })

    return true;
  }

  async onSubmit() {
    if (!this.formData.valid) return
    const animal = this.formData.value as IAnimal; 
    animal.userId = '';
    if (this.imageUrl && this.uid) {
      animal.image = this.imageUrl;
      animal.registerId = this.uid;
    }
    try {
      const doc = await this._formService.registerAnimal(animal);
      this.animal.id = doc.id;
      this.user.registeredPets.push(this.animal.id);
      if(this.uid) {
        await this._formService.updateUser(this.uid, this.user);
      }
      this.formData.reset();
      this.router.navigateByUrl('/home');
    } catch(error) {
      console.log("Não foi possível salvar!")
    }
  }
}