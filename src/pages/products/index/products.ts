import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { ApiProvider } from "../../../providers/api/api";
import { ProductsDetailPage } from "../detail/products-detail";
import { Product } from "../../../models/Product";

@IonicPage()
@Component({
    selector: 'page-products',
    templateUrl: 'products.html',
})
export class ProductsPage {
    products: Product[] = [];
    private modal;

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider, private modalCtrl: ModalController) {
    }

    /**
     * Loads the products list on page load
     */
    ionViewDidLoad() {
        this.apiProvider.builder('products').loader().get().subscribe(res => this.products = res);
    }

    /**
     * Push to the details page
     *
     * @param {number} id
     */
    showModal(id: number) {
        this.modal = this.modalCtrl.create(ProductsDetailPage, {id: id});
        this.modal.present();
    }
}
