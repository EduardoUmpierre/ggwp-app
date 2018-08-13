import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Product } from "../../../../models/Product";
import { ManagerBillsProductOrderFormPage } from "../product-order-form/manager-bills-product-order-form";

@IonicPage()
@Component({
    selector: 'page-manager-bills-order-form',
    templateUrl: 'manager-bills-order-form.html',
})
export class ManagerBillsOrderFormPage {
    private products = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    }

    /**
     *
     */
    goToProductForm() {
        let productModal = this.modalCtrl.create('ManagerBillsProductOrderFormPage');

        productModal.onDidDismiss(data => {
            if (data instanceof Product) {
                this.products.push(Product);
            }
        });

        productModal.present();
    }
}
