import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

export interface User { userId: string; name: string; email: string; card: string; };

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  private existingCardOwnerData: any;
  
  private currentUser: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ){
  }

  lookupExistingCardOwner(cardnumber) {
    console.log("step 1");
    let data = null;

    var docRef = this.afs.collection("existing card owners").doc(cardnumber);
    docRef.get().subscribe(
      x => { console.log("step2"); this.existingCardOwnerData = x; },
      err => { console.error(err); }
    );

  }

  getExistingCardData() {
    console.log("getting card data");
    return this.existingCardOwnerData;
  }

  updateCurrentUserEmail(email) {
    // check that authenticated user is signed in  
    if (firebase.auth().currentUser) {
      // first update authenticated email address
      return firebase.auth().currentUser.updateEmail(email)
      .then(() => {
        // then update the actual database entry
        return this.afs.collection('users/').doc(firebase.auth().currentUser.uid).update({
            email: email,
          });
        });
    }
    else
    {
      console.log("Not authenticated");
      return null;
    }
  }

  updateCurrentUserPassword(password) {
    // check that authenticated user is signed in  
    if (firebase.auth().currentUser) {
      return firebase.auth().currentUser.updatePassword(password)
      .then (() => {return true;})
      .catch(function(error) {
        console.log(error);
        return null;
      });
    }
    else
    {
      console.log("Not authenticated");
      return null;
    }
  }

  updateCurrentUserName(first, last) {
    // check that authenticated user is signed in  
    if (firebase.auth().currentUser) {
      return this.afs.collection('users/').doc(firebase.auth().currentUser.uid).update({
          firstName: first,
          lastName: last
        });
    }
    else
    {
      console.log("Not authenticated");
      return null;
    }
  }

  updateCurrentUserCardNumber(cardNumber) {
    // check that authenticated user is signed in  
    if (firebase.auth().currentUser) {
      return this.afs.collection('users/').doc(firebase.auth().currentUser.uid).update({
          card: cardNumber,
        });
    }
    else
    {
      console.log("Not authenticated");
      return null;
    }
  }

  updateCurrentUserData(first, last, email, cardNumber) {
    // check that authenticated user is signed in  
    if (firebase.auth().currentUser) {
      if (cardNumber != null) {
        return this.afs.collection('users/').doc(firebase.auth().currentUser.uid).update({
          //userId: firebase.auth().currentUser.uid,
          firstName: first,
          lastName: last,
          email: email,
          card: cardNumber
        });
      } else {
          return this.afs.collection('users/').doc(firebase.auth().currentUser.uid).update({
          //userId: firebase.auth().currentUser.uid,
          firstName: first,
          lastName: last,
          email: email
        });
      }
    }
    else
    {
      console.log("Not authenticated");
      return null;
    }
  }

  writeUserData(userId, first, last, email, cardNumber) {
    // check that authenticated user is signed in  
    if (firebase.auth().currentUser) {
      if (cardNumber != null) {
        return this.afs.collection('users/').doc(firebase.auth().currentUser.uid).set({
          userId: userId,
          firstName: first,
          lastName: last,
          email: email,
          card: cardNumber
        });
      } else {
          return this.afs.collection('users/').doc(firebase.auth().currentUser.uid).set({
          userId: userId,
          firstName: first,
          lastName: last,
          email: email
        });
      }
    }
    else
    {
      console.log("Not authenticated");
      return null;
    }
  }

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }



}