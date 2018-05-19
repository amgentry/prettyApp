import {Component} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {CreateAccountPage} from "../create-account/create-account";
import {HomePage} from "../home/home";
// import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    public loading:Loading;

    constructor(public navCtrl: NavController, public alertCtrl:AlertController, public loadingCtrl:LoadingController, public data:DataProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    loginClick(): void {
        let prompt = this.alertCtrl.create({
            title: 'Login To CardApp',
            message: "Login to view your account.",
            inputs: [
                {
                    name: 'email',
                    placeholder: "email address"
                },
                {
                    name: 'password',
                    placeholder: "Password",
                    type: "password"
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
                    text: 'Log In',
                    handler: data => {
                        this.data.signInWithEP(data).then((result) => {
                            this.navCtrl.setRoot(HomePage);
                        });
                    }
                }
            ]
        });
        this.loading = this.loadingCtrl.create();
        prompt.present();
    }

    createAccount():void {
        this.navCtrl.push(CreateAccountPage);
    }

}
