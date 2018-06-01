import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-list',
    templateUrl: 'manager-bills-list.html',
})
export class ManagerBillsListPage {
    private bills = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the bills data
     */
    ionViewWillEnter() {
        this.apiProvider.builder('bills').loader().get().subscribe(res => this.bills = res);
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerBillsFormPage', {id: id});
    }

    /**
     * Push to the detail page
     *
     * @param {number} id
     */
    goToDetails(id: number) {
        this.navCtrl.push('ManagerBillsDetailPage', {id: id});
    }
}
