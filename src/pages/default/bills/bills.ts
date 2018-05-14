import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../../providers/api/api";
import { ProductsDetailPage } from "../products/detail/products-detail";

@IonicPage()
@Component({
    selector: 'page-bills',
    templateUrl: 'bills.html',
})
export class BillsPage {
    private bill = {};
    private modal;

    constructor(private navCtrl: NavController, private navParams: NavParams, private apiProvider: ApiProvider, private modalCtrl: ModalController) {
    }

    /**
     * @todo Add logged user id
     */
    ionViewWillEnter() {
        this.apiProvider.builder('bills/' + 1).loader().get().subscribe(res => this.bill = res);
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
