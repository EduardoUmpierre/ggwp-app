import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
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
import { IonicStorageModule } from "@ionic/storage";
import { AuthProvider } from "../providers/auth/auth";
import { ComponentsModule } from "../components/components.module";
import { DecimalPipe, registerLocaleData } from "@angular/common";
import localePt from '@angular/common/locales/pt';
import { OneSignal } from "@ionic-native/onesignal";
import { Autostart } from "@ionic-native/autostart";
import { BackgroundMode } from "@ionic-native/background-mode";

registerLocaleData(localePt);

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
        ComponentsModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'top',
            tabsHideOnSubPages: false
        }),
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
    ],
    providers: [
        DecimalPipe,
        StatusBar,
        SplashScreen,
        ApiProvider,
        AuthProvider,
        HttpProvider,
        HttpAngularProvider,
        HttpNativeProvider,
        HTTP,
        OneSignal,
        Autostart,
        BackgroundMode,
        {provide: LOCALE_ID, useValue: "pt-BR"},
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
