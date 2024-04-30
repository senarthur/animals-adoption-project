import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBreed } from '../interfaces/breed.interface';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Timestamp, addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, limit, or, query, updateDoc, where } from 'firebase/firestore';

import { IAnimal, ISize, IVaccines, createAnimal } from '../interfaces/animal.interface';
import { Auth } from '@angular/fire/auth';
import { IUser } from '../interfaces/user.interface';
import { Preferences } from '@capacitor/preferences';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private _firestore = inject(Firestore);
  private _auth = inject(Auth);

  darkMode: boolean = false;

  private readonly DOG_API = "https://api.thedogapi.com/v1/breeds";

  private _animals_collection = collection(this._firestore, 'animals');
  private _size_collection = collection(this._firestore, 'size');
  private _vaccines_collection = collection(this._firestore, 'vaccines');
  private _reports_collection = collection(this._firestore, 'reports');


  constructor(private http: HttpClient) {}

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

  async getRecentlyRegistereds() {
     // Pega os pets registrados nos últimos 15 dias, a partir do dia e horário atual

    const date: Date = Timestamp.now().toDate(); // Converto o tempo atual para o Tipo Date
    const seconds: number = date.getSeconds() - 60*60*24*15; // Pego os segundos e subtraio 15 dias dele
    date.setSeconds(seconds);
    const fromDate: Timestamp = Timestamp.fromDate(date);
    try {
      const q = query(this._animals_collection, and(where('registeredAt', '>=', fromDate), where('registeredAt', '<=', Timestamp.now())), limit(10));
      const snapshot = await getDocs(q);
      return snapshot;
    } catch(error) {
      console.log(error);
      return null;
    }
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

  async getAnimalBySize(size: string, limite?: number | undefined) {
    if(limite) {
      try {
        const q = query(this._animals_collection, and(where("size", "==", size), where("userId", "==", "")), limit(limite));
        const snapshot = getDocs(q);
        return snapshot;
      } catch(error) {
        console.log("Erro ao realizar a consulta");
        return null;
      }
    } 

    try {
      const q = query(this._animals_collection, and(where("size", "==", size), where("userId", "==", "")));
      const snapshot = getDocs(q);
      return snapshot;
    } catch(error) {
      console.log("Erro ao realizar a consulta");
      return null;
    }
  }

  async getAnimalByName(name: string, limite?: number | undefined) {
    if(limite) {
      try {
        const q = query(this._animals_collection, and(or(where("name", "==", name), where("breed", "==", name)), where("userId", "==", "")), limit(limite));
        const snapshot = getDocs(q);
        return snapshot;
      } catch(error) {
        console.log("Erro ao realizar a consulta");
        return null;
      }
    }

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
    // Pega o tempo atual
    const time: Timestamp = Timestamp.fromDate(animal.registeredAt);
    return addDoc(this._animals_collection, { ...animal, registeredAt: time});
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

  async teste() {
    try {
      const q = query(this._animals_collection, where("name", "==", 'Snow'));
      const snapshot = await getDocs(q);
      return snapshot;
    } catch(error) {
      console.log("Erro ao realizar a consulta");
      return null;
    }
  }
}
