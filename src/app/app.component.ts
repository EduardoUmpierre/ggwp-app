import { Component, ViewChild } from '@angular/core';
import { AlertController, App, Events, MenuController, ModalController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/default/tabs/tabs';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { OneSignal } from "@ionic-native/onesignal";
import { Autostart } from "@ionic-native/autostart";
import { BackgroundMode } from "@ionic-native/background-mode";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    private enabledMenu = 'main-menu';
    private disabledMenu = 'manager-menu';
    private user;

    @ViewChild(Nav) nav: Nav;

    rootPage: any;

    constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                private events: Events, private storage: Storage, private menu: MenuController,
                private authProvider: AuthProvider, private modalCtrl: ModalController, private appCtrl: App,
                private oneSignal: OneSignal, autoStart: Autostart, backgroundMode: BackgroundMode,
                private alertCtrl: AlertController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            if (this.authProvider.isApp()) {
                autoStart.enable();
                backgroundMode.enable();

                this.oneSignal.startInit('2758eb87-0840-4921-8003-53f01423a71c', '179976682819');

                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

                this.oneSignal.handleNotificationReceived().subscribe((data) => {
                    // do something when notification is received
                    console.log('Notification received', data);
                    this.handleNotification(data);
                });

                this.oneSignal.handleNotificationOpened().subscribe((data) => {
                    // do something when a notification is opened
                    console.log('Notification opened', data);
                    this.handleNotification(data);
                });

                this.oneSignal.endInit();
            }

            events.subscribe('user:updated', (user, time) => {
                this.updateActiveMenu();
            });

            this.events.publish('user:updated', true);
        });
    }

    /**
     * @param page
     */
    openPage(page) {
        this.nav.setRoot(page).then(() => this.events.publish('user:updated', true));
    }

    /**
     * @param index
     */
    openTabPage(index) {
        this.nav.push(TabsPage, {index: index}).then(() => this.events.publish('user:updated', true));
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
                if (this.authProvider.isApp()) {
                    this.oneSignal.sendTags({user_id: user.id, user_email: user.email});
                }

                this.user = user;

                if (user.role && user.role >= 1) {
                    this.enabledMenu = 'manager-menu';
                    this.disabledMenu = 'main-menu';
                    this.rootPage = 'ManagerDashboardPage';
                } else {
                    this.rootPage = TabsPage;
                }
            } else {
                this.rootPage = TabsPage;
            }

            this.menu.enable(true, this.enabledMenu);
            this.menu.enable(false, this.disabledMenu);
        });
    }

    /**
     * Logout
     */
    logout() {
        this.authProvider.loader('Saindo').logout().then(() => {
            this.authProvider.hideLoader();
            this.events.publish('user:updated', true);
            this.rootPage = TabsPage;
        });
    }

    /**
     * Calls the login page
     */
    login() {
        this.modalCtrl.create('LoginPage').present();
    }

    /**
     * Calls the registration page
     */
    register() {
        this.modalCtrl.create('RegisterPage').present();
    }

    /**
     * Calls the profile page
     */
    profile() {
        this.modalCtrl.create('ProfilePage').present();
    }

    /**
     * Calls the level up modal
     *
     * @param data
     */
    handleNotification(data) {
        const payload = data.notification.payload;

        const alert = this.alertCtrl.create({
            title: payload.title,
            message: payload.body,
            buttons: [
                {
                    text: 'Fechar',
                    role: 'cancel'
                },
                {
                    text: 'Ver recompensa',
                    handler: () => {
                        this.profile();
                    }
                }
            ]
        });

        alert.present();
    }
}
