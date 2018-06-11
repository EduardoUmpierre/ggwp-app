import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {
    private user;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        this.user = this.navParams.get('user');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
