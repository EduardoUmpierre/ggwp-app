import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    private user;
    private profile = {
        drops: [],
        badges: [],
        achievements: []
    };

    constructor(private storage: Storage, private apiProvider: ApiProvider, private viewCtrl: ViewController) {
    }

    /**
     * Loads the user data
     */
    ionViewWillEnter() {
        this.storage.get('user').then((user) => {
            this.user = user;

            this.apiProvider.builder(`users/${user.id}/profile`).get().subscribe(profile => {
                this.profile = profile;

                console.log(profile);
            });
        });
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
