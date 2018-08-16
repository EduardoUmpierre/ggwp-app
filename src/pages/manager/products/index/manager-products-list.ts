import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ApiProvider} from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'manager-page-products-list',
    templateUrl: 'manager-products-list.html',
})
export class ManagerProductsListPage {
    private products = [];
    filteredItems = [];
    loaded: boolean = false;

    constructor(public navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the product data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('products').loader().get().subscribe(res => {
            this.products = res;
            this.filteredItems = res;
            this.loaded = true;
        });
    }

    /**
     * Push to products form
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerProductsFormPage', {id: id});
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.products;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter((item) => item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
    }

    /**
     * Removes a product
     *
     * @param {number} id
     * @param {number} key
     */
    remove(id: number, key: number) {
        this.apiProvider.builder('products/' + id).loader().delete().subscribe((res) => {
            this.products.splice(key, 1);
        });
    }

    /**
     * Edits a product
     *
     * @param {number} id
     * @param {number} key
     */
    edit(id: number, key: number) {
        this.goToForm(id);
    }
}
