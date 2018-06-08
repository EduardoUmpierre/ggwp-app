import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/default/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from "../providers/api/api";
import { HttpProvider } from "../providers/api/http/http";
import { HttpAngularProvider } from "../providers/api/http/http-angular";
import { HttpClientModule } from "@angular/common/http";
import { HttpNativeProvider } from "../providers/api/http/http-native";
import { HTTP } from "@ionic-native/http";
import { BrMaskerModule } from "brmasker-ionic-3";
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrMaskerModule,
        SelectSearchableModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'top'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ApiProvider,
        HttpProvider,
        HttpAngularProvider,
        HttpNativeProvider,
        HTTP,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
