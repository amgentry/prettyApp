import {Injectable} from '@angular/core';
import firebase, {User} from 'firebase';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

    cardsRef:any;
    cards:any = [];
    updateCardIndex:any = "";
    userID:any;
    photoRef:any;

    constructor() {
        this.photoRef = firebase.storage().ref('/Photos/');
    }


    getCards():Array<any> {
        this.userID = firebase.auth().currentUser.uid;
        this.cardsRef = firebase.database().ref(`/userProfile/${this.userID}/Cards`);

        this.cardsRef.on('child_added',(data) => {
            console.log("data ", data);
            this.cards.push(data);
        });
        this.cardsRef.on('child_removed', (data) => {
            console.log('data ', data);
        });
        this.cardsRef.on('child_changed', (data) => {
            this.cards[this.updateCardIndex] = data;
        });
        return this.cards;
    }

    addCardToDB(newCard):void {
        firebase.database().ref(`/userProfile/${this.userID}`).child("/Cards").push(newCard);
    }

    removeCardFromDB(cardToDelete):void {
        firebase.database().ref(`/userProfile/${this.userID}/Cards`).child(cardToDelete.key).remove();
    }

    updateCardInDB(key, newData, idx):void {
        this.updateCardIndex = idx;
        newData['time'] = new Date(2018, 11, 24, 10, 33, 30);
        console.log(newData.time);
        firebase.database().ref(`/userProfile/${this.userID}/Cards/${key}`).update(newData);
    }

    async signInWithEP(loginObject):Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(loginObject.email, loginObject.password);
    }

    async createAccount(email, password, fName, lName):Promise<any> {
        try {
            const newUser:User = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            await firebase
                .database()
                .ref(`/userProfile/${firebase.auth().currentUser.uid}`)
                .set({email:email, firstName:fName, lastName:lName});
            return newUser;
        } catch (error){
            throw error;
        }
    }

    logoutUser():Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut()
                .then(() => {
                    let loggedOut = true;
                    this.cards = [];
                    resolve(loggedOut);
                })
                .catch((error:any) => {
                    reject(error);
                })
        })
    }

}
