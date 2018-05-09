import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from "../../../providers/api/api";
import { Product } from "../../../models/Product";

@IonicPage()
@Component({
    selector: 'page-products-detail',
    templateUrl: 'products-detail.html',
})
export class ProductsDetailPage {
    private product: Product;

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the product data on page load
     */
    ionViewDidLoad() {
        this.apiProvider.builder('products/' + this.navParams.get('id')).loader().get().subscribe(res => this.product = res);
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
