import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { IUser, createUser } from '../interfaces/user.interface';
import { FormService } from '../services/form.service';
import { Auth } from '@angular/fire/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.page.html',
  styleUrls: ['./profile-data.page.scss'],
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
export class ProfileDataPage implements OnInit {
  
  isOnEdit: boolean = false;
  user: IUser = createUser();
  uid: string = '';
  imageUrl: string = '';
  progress: number = -1;

  @ViewChild('image') input?: ElementRef;
  private _storage = inject(Storage);
  
  personalData!: FormGroup;

  constructor(private formService: FormService, private auth: Auth, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const uid = this.auth.currentUser?.uid;
    if(uid) {
      this.uid = uid;
      this.formService.getUser(uid).then(userResponse => {
        this.user = userResponse.data() as IUser;
        this.initForm();
      })
    }

    this.personalData = this.formBuilder.group({
      fullName: [{value: '', disabled: true}],
      phone: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}, Validators.email],
      image: [{value: '', disabled: true}]
    })
  }

  private initForm() {
    this.personalData.setValue({
      fullName: this.user.name, 
      phone: this.user.phone,
      email: this.user.email,
      image: '',
    })
  }

  edit() {
    this.isOnEdit = !this.isOnEdit;
    this.personalData.get('fullName')?.enable();
    this.personalData.get('phone')?.enable();
    this.personalData.get('email')?.enable();
    this.personalData.get('image')?.enable();
  }

  saveChanges() {
    console.log(this.personalData);
    if(this.personalData.valid) {
      this.isOnEdit = !this.isOnEdit;
      this.personalData.get('fullName')?.disable();
      this.personalData.get('phone')?.disable();
      this.personalData.get('email')?.disable();
      this.personalData.get('image')?.disable();
      const user = this.updateUser();
      this.formService.updateUser(this.uid, user);
    } else {
      console.log('não é valido')
    }
  }

  private updateUser(): IUser {
    const form = this.personalData.value;
    let imageUrl = form.image;
    if (imageUrl == '') imageUrl = this.user.photoUrl;
    return {
      name: form.fullName,
      age: this.user.age,
      email: form.email,
      phone: form.phone,
      photoUrl: imageUrl,
      adoptedPets: this.user.adoptedPets,
      registeredPets: this.user.registeredPets
    }
  }

  onFileSelected(event: any) {
    const selectedArchive: File = event.target.files[0];
    this.uploadImage(selectedArchive);
  }

  uploadImage(file: File): boolean {
    const filePath = `users/${file.name}`;
    const fileRef = ref(this._storage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);

    uploadFile.on("state_changed", (snapshot) => {
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes);
      console.log(this.progress);
    }, (error) => {
      console.log("Erro ao carregar o arquivo: ", error)
      return false;
    }, async () => {
      this.imageUrl = await getDownloadURL(fileRef);
      this.user.photoUrl = this.imageUrl;
      this.progress = -1;
    })

    return true;
  }
}
