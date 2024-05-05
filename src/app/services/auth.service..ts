import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, UserCredential, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { IUser } from '../interfaces/user.interface';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { updateEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private fireAuth = inject(Auth);
  private firestore = inject(Firestore);
  provider: GoogleAuthProvider = new GoogleAuthProvider();

  emailForResetPassword: string = '';

  constructor() { }
  
  async registerUser(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.fireAuth, email, password);
  }

  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  async signInWithGoogle() {
    return signInWithPopup(this.fireAuth, this.provider);
  }

  async resetPassword(email: string) {
    return await sendPasswordResetEmail(this.fireAuth, email);
  }

  async signOut() {
    return await this.fireAuth.signOut();
  }

  async saveUserBasicDetails(user: IUser, credential: UserCredential) {
    return await setDoc(doc(this.firestore, 'users', credential.user.uid), user)
  }

  async saveUserBasicDetailsGoogle(user: IUser, uid: string) {
    return await setDoc(doc(this.firestore, 'users', uid), user)
  }

  async updateEmail(email: string): Promise<boolean> {
    const user = this.fireAuth.currentUser;
    let valid = false;
    if (user) {
      try {
        await updateEmail(user, email);
        valid = true;
      } catch(err) {
        console.log(err)
        valid = false;
      };
    }
    return valid;
  }
  
  getAuth() {
    return this.fireAuth;
  }
}
