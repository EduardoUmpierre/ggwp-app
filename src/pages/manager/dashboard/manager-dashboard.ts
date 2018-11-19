import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-dashboard',
    templateUrl: 'manager-dashboard.html',
})
export class ManagerDashboardPage {
    private report;

    data = {
        titleKey: 'name',
        subtitle: true,
        subtitleKey: 'count'
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {
    }

    ionViewWillEnter() {
        this.apiProvider.builder('dashboard').loader().get().subscribe(res => {
            this.report = res;
            console.log(res);
        });
    }
}
