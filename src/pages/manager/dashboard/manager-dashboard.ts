import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-dashboard',
    templateUrl: 'manager-dashboard.html',
})
export class ManagerDashboardPage {
    private sum;

    constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {
    }

    ionViewWillEnter() {
        this.apiProvider.builder('users/online/stats').loader().get().subscribe(res => this.sum = res);
    }
}
