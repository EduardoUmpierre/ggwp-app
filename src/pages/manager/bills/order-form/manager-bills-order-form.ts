import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Product } from "../../../../models/Product";
import { ManagerBillsProductOrderFormPage } from "../product-order-form/manager-bills-product-order-form";
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-order-form',
    templateUrl: 'manager-bills-order-form.html',
})
export class ManagerBillsOrderFormPage {
    private products: Product[] = [];
    private id: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
                private apiProvider: ApiProvider) {
        this.id = this.navParams.get('id');
    }

    /**
     * Shows the product modal and inserts a product into the products list
     */
    goToProductForm() {
        let productModal = this.modalCtrl.create('ManagerBillsProductOrderFormPage');

        productModal.onDidDismiss(data => {
            if (data instanceof Product) {
                this.products.push(data);
            }
        });

        productModal.present();
    }

    /**
     * Performs the HTTP post request
     */
    submit() {
        let data = {
            'bills_id': this.id,
            'products': this.normalizeData()
        };

        this.apiProvider.builder('bills/products').loader().post(data).subscribe(res => this.navCtrl.pop());
    }

    /**
     * Normalize the data to post only the necessary information
     *
     * @returns {Array}
     */
    normalizeData() {
        let data = [];

        this.products.forEach((e, i) => {
            data[i] = {
                products_id: e.id,
                note: e.note
            }
        });

        return data;
    }
}
