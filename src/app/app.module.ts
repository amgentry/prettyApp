import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {DataProvider} from '../providers/data/data';
import {LoginPage} from "../pages/login/login";
import {CreateAccountPage} from "../pages/create-account/create-account";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        CreateAccountPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        CreateAccountPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataProvider
    ]
})
export class AppModule {
}
