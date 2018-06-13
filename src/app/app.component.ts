import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, ModalController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/default/tabs/tabs';
import { Storage } from "@ionic/storage";
import { AuthProvider } from "../providers/auth/auth";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    private enabledMenu = 'main-menu';
    private disabledMenu = 'manager-menu';
    private user;

    @ViewChild(Nav) nav: Nav;

    rootPage: any = TabsPage;

    // rootPage: any = 'ManagerProductsListPage';

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private events: Events,
                private storage: Storage, private menu: MenuController, private authProvider: AuthProvider,
                private modalCtrl: ModalController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.updateActiveMenu();

        events.subscribe('user:updated', (user, time) => {
            this.updateActiveMenu();
        });
    }

    /**
     * @param page
     */
    openPage(page) {
        this.nav.setRoot(page);
    }

    /**
     * Updates the main menu by user role
     */
    updateActiveMenu() {
        this.storage.get('user').then(user => {
            this.user = false;
            this.enabledMenu = 'main-menu';
            this.disabledMenu = 'manager-menu';

            if (user) {
                this.user = true;

                if (user.role && user.role > 1) {
                    this.enabledMenu = 'manager-menu';
                    this.disabledMenu = 'main-menu';
                }
            }

            this.menu.enable(true, this.enabledMenu);
            this.menu.enable(false, this.disabledMenu);

            console.log('Menu ativado', this.enabledMenu);
            console.log('Menu desativado', this.disabledMenu);
        })
    }

    /**
     * Logout
     */
    logout() {
        this.authProvider.loader('Saindo').logout().then(() => {
            this.authProvider.hideLoader();
            this.events.publish('user:updated', true);
        });
    }

    /**
     * Calls the login page
     */
    login() {
        const modal = this.modalCtrl.create('LoginPage');
        modal.present();
    }
}
