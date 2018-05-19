import {Component} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataProvider} from "../../providers/data/data";
import {HomePage} from "../home/home";

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
    selector: 'page-create-account',
    templateUrl: 'create-account.html',
})
export class CreateAccountPage {

    private registerForm: FormGroup;
    private loading:Loading;

    constructor(private formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams, public data:DataProvider, private loadingCtrl:LoadingController, private alertCtrl:AlertController) {

        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required])],
            fName: ['', Validators.compose([Validators.required])],
            lName: ['', Validators.compose([Validators.required])]
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateAccountPage');
    }

    registerSubmitForm():void {
        if(!this.registerForm.valid){
            console.log(this.registerForm.value);
        }else{
            this.data.createAccount(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.fName, this.registerForm.value.lName)
                .then(authData => {
                    this.loading.dismiss().then(() => {
                        this.navCtrl.setRoot(HomePage);
                    })
                }, error => {
                    let alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text:'ok',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
        }

        this.loading = this.loadingCtrl.create();
        this.loading.present();
    }

}
