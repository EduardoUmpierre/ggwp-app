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
    private achievements;
    private badges;
    private drops;

    constructor(private storage: Storage, private apiProvider: ApiProvider, private viewCtrl: ViewController) {
    }

    /**
     * Loads the user data
     */
    ionViewWillEnter() {
        this.storage.get('user').then((user) => {
            this.user = user;

            this.apiProvider.builder(`users/${user.id}/badges`).get().subscribe(badges => {
                this.badges = badges;

                this.apiProvider.builder(`users/${user.id}/drops`).get().subscribe(drops => {
                    this.drops = drops;

                    this.apiProvider.builder(`users/${user.id}/achievements`).get().subscribe(achievements => {
                        this.achievements = achievements;
                    });
                });
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
