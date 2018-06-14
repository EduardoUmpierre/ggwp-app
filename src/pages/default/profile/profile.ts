import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    private user;

    constructor(private storage: Storage, private viewCtrl: ViewController) {
    }

    /**
     * Loads the user data
     */
    ionViewWillEnter() {
        this.storage.get('user').then((user) => this.user = user);
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
