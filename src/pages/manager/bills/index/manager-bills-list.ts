import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-list',
    templateUrl: 'manager-bills-list.html',
})
export class ManagerBillsListPage {
    private bills = [];
    private modal;

    constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, private modalCtrl: ModalController) {
    }

    /**
     *
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
        this.modal = this.modalCtrl.create('ManagerBillsFormPage', {id: id});
        this.modal.present();
    }
}
