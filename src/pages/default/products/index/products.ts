import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-products',
    templateUrl: 'products.html',
})
export class ProductsPage {
    private categories = [];
    private modal;

    constructor(private apiProvider: ApiProvider, private modalCtrl: ModalController) {
    }

    /**
     * Loads the products list on page load
     */
    ionViewDidLoad() {
        this.apiProvider.builder('products').loader().get().subscribe(res => this.categories = res);
    }

    /**
     * Push to the details page
     *
     * @param {number} id
     */
    showModal(id: number) {
        this.modal = this.modalCtrl.create('ProductsDetailPage', {id: id});
        this.modal.present();
    }
}
