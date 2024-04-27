import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBreed } from '../interfaces/breed.interface';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, or, query, updateDoc, where } from 'firebase/firestore';

import { IAnimal, ISize, IVaccines, createAnimal } from '../interfaces/animal.interface';
import { Auth } from '@angular/fire/auth';
import { IUser, createUser } from '../interfaces/user.interface';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _firestore = inject(Firestore);
  private _auth = inject(Auth);

  darkMode: boolean = false;

  private readonly DOG_API = "https://api.thedogapi.com/v1/breeds";

  private _animals_collection = collection(this._firestore, 'animals');
  private _size_collection = collection(this._firestore, 'size');
  private _vaccines_collection = collection(this._firestore, 'vaccines');
  private _reports_collection = collection(this._firestore, 'reports');


  constructor(private http: HttpClient) {
  }

  async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    checkIsDarkMode?.value == 'true'
    ? (this.darkMode) = true
    : (this.darkMode) = false;
    document.body.classList.toggle('dark', this.darkMode);
  }

  public getAuth() {
    return this._auth;
  }

  /* THE DOG API */
  getAllBreeds(): Observable<IBreed[]> {
    return this.http.get<IBreed[]>(this.DOG_API);
  }

  /* GET METHOD - FIREBASE API */
  getAnimals(): Observable<IAnimal[]> {
    return collectionData(this._animals_collection, { idField: 'id' }) as Observable<IAnimal[]>;
  }

  getSizes(): Observable<ISize[]> {
    return collectionData(this._size_collection) as Observable<ISize[]>;
  }

  getVaccines(): Observable<IVaccines[]> {
    return collectionData(this._vaccines_collection) as Observable<IVaccines[]>;
  }
  
  async getAnimalById(id: string) {
    try {
      const document = doc(this._firestore, 'animals', id);
      const snapshot = await getDoc(document);
      return snapshot.data() as IAnimal;
    } catch (error) {
      console.log(error);
      return createAnimal();
    }
  }

  async getAnimalBySize(size: string) {
    try {
      const q = query(this._animals_collection, and(where("size", "==", size), where("userId", "==", "")));
      const snapshot = getDocs(q);
      return snapshot;
    } catch(error) {
      console.log("Erro ao realizar a consulta");
      return null;
    }
  }

  async getAnimalByName(name: string) {
    try {
      const q = query(this._animals_collection, and(or(where("name", "==", name), where("breed", "==", name)), where("userId", "==", "")));
      const snapshot = getDocs(q);
      return snapshot;
    } catch(error) {
      console.log("Erro ao realizar a consulta");
      return null;
    }
  }

  async getRegisteredPetsByUser(registerId: string) {
    try {
      const q = query(this._animals_collection, where("registerId", "==", registerId));
      return await getDocs(q);
    } catch(error) {
      console.log("Erro ao realizar a consulta");
      return null;
    }
  }

  async getAdoptedPetsByUser(userId: string) {
    try {
      const q = query(this._animals_collection, where("userId", "==", userId));
      const snapshot = await getDocs(q);
      return snapshot;
    } catch(error) {
      console.log("Erro ao realizar a consulta");
      return null;
    }
  }

  async getUser(id: string) {
    const document = doc(this._firestore, 'users', id);
    return await getDoc(document);
  }

  /* POST METHOD - FIREBASE API */
  registerAnimal(animal: IAnimal) {
    return addDoc(this._animals_collection, animal);
  }

  makeReport(reportMessage: string) {
    return addDoc(this._reports_collection, { message: reportMessage });
  }

  updateAnimal(id: string, animal: IAnimal) {
    const document = doc(this._firestore, 'animals', id);
    return updateDoc(document, { ...animal });
  }

  updateUser(id: string, user: IUser) {
    const document = doc(this._firestore, 'users', id);
    return updateDoc(document, {...user});
  }

  async deleteAnimal(id: string) {
    return await deleteDoc(doc(this._firestore, 'animals', id));
  }
}
