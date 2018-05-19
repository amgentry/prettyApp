import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {LoginPage} from "../login/login";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    setOfCards:any;

    constructor(public navCtrl: NavController, public  data:DataProvider, public alertCtrl:AlertController) {

    }

    ionViewDidLoad() {
       this.setOfCards = this.data.getCards();
       // .then((result) => {
       //     console.log('result ', result);
       //     console.log('result '+ result);
       //     this.setOfCards = result;
       // })
    }

    editCard(card):void {
        let prompt = this.alertCtrl.create({
            title: 'Create a new card',
            message: "Enter a title and description for your new card.",
            inputs: [
                {
                    name: 'title',
                    value: card.val().title
                },
                {
                    name: 'content',
                    value: card.val().content
                }
            ],
            buttons: [
                {
                    text : 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Edit Card',
                    handler: data => {
                        let index = this.data.cards.indexOf(card);

                        if(index > -1){
                            let obj = {
                                "title": data.title,
                                "content": data.content
                            };
                            this.data.updateCardInDB(card.key, obj, index);
                        }
                    }
                }
            ]
        });
        prompt.present();
    }

    deleteCard(card):void {
        let confirm = this.alertCtrl.create({
            title: 'Delete Card?',
            message: 'Are you sure you want to delete card?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('cancelled clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        let index = this.data.cards.indexOf(card);
                        if(index > -1){
                            this.data.cards.splice(index, 1);
                        }
                        this.data.removeCardFromDB(card);
                    }
                }
            ]
        });
        confirm.present();
    }

    addCard(): void {
        let prompt = this.alertCtrl.create({
            title: 'Create a new card',
            message: "Enter a title and description for your new card.",
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title'
                },
                {
                    name: 'content',
                    placeholder: "Description"
                },
                {
                    name: 'imageSrc',
                    placeholder: "Image Name"
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Create Card',
                    handler: data => {
                        let currentDate = new Date().toDateString();
                        let currentTime = new Date().toLocaleTimeString();
                        let date = currentDate + ' ' + currentTime;

                        let obj = {
                            "title": data.title,
                            "content": data.content,
                            "imageSrc": data.imageSrc,
                            "time": date
                        };
                        console.log(obj);
                        this.data.addCardToDB(obj);
                    }
                }
            ]
        });
        prompt.present();
    }

    logout():void {
        this.data.logoutUser().then((result) => {
            this.navCtrl.setRoot(LoginPage);
        });
    }

}
