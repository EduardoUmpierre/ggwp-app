import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-manager-users-form',
    templateUrl: 'manager-users-form.html',
})
export class ManagerUsersFormPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ManagerUsersFormPage');
    }

}
