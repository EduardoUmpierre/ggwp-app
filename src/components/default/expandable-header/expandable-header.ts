import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, Events } from 'ionic-angular';

@Component({
    selector: 'expandable-header',
    templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {
    private user = null;

    constructor(private storage: Storage, private modalCtrl: ModalController, private events: Events) {
        events.subscribe('user:updated', (user) => this.updateUserData());
    }

    /**
     * Update user object
     */
    ngOnChanges() {
        this.updateUserData();
    }

    /**
     * Updates the user data from local storage
     */
    private updateUserData() {
        this.storage.get('user').then(user => this.user = user);
    }

    /**
     * Calls the login page
     */
    loginModal() {
        const modal = this.modalCtrl.create('LoginPage');
        modal.present();
    }

    /**
     * Calls the profile page
     */
    goToProfile() {
        const modal = this.modalCtrl.create('ProfilePage');
        modal.present();
    }
}
