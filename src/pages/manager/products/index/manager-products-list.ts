import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'manager-page-products-list',
    templateUrl: 'manager-products-list.html',
})
export class ManagerProductsListPage {
    private products = [];
    private loaded: boolean = false;

    constructor(public navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     *
     */
    ionViewWillEnter() {
        this.apiProvider.builder('products').loader().get().subscribe(res => {
            this.products = res;
            this.loaded = true;
        });
    }
}
