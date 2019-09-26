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
  
  private database: any;
  private currentUser: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ){
    console.log("firebase");
    console.log(firebase);
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

  // unused from tutorial
  getTasks(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      })
    })
  }
  // unused from tutorial
  getTask(taskId){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if(currentUser){
          this.snapshotChangesSubscription = this.afs.doc<any>('people/' + currentUser.uid + '/tasks/' + taskId).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err)
          })
        }
      })
    });
  }
  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }






  //-------------------------------------------------------------------------------------------------------------------

  // unused from tutorial
  updateTask(taskKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  // unused from tutorial
  deleteTask(taskKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').doc(taskKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  // unused from tutorial
  createTask(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid).collection('tasks').add({
        title: value.title,
        description: value.description//,
        //image: value.image
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }
}