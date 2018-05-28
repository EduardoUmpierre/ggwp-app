import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";
import { ManagerProductsFormPage } from "../form/manager-products-form";

@IonicPage()
@Component({
    selector: 'manager-page-products-list',
    templateUrl: 'manager-products-list.html',
})
export class ManagerProductsListPage {
    private products = [];
    private modal;

    constructor(public navCtrl: NavController, private apiProvider: ApiProvider, private modalCtrl: ModalController) {
    }

    /**
     *
     */
    ionViewWillEnter() {
        this.apiProvider.builder('products').loader().get().subscribe(res => this.products = res);
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number) {
        this.modal = this.modalCtrl.create(ManagerProductsFormPage, {id: id});
        this.modal.present();
    }
}
