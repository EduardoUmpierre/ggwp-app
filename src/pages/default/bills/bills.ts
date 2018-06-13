import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { ApiProvider } from "../../../providers/api/api";
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from "@angular/common/http";

@IonicPage()
@Component({
    selector: 'page-bills',
    templateUrl: 'bills.html',
})
export class BillsPage {
    private bill = null;
    private loaded: boolean = false;
    private modal;

    constructor(private apiProvider: ApiProvider, private modalCtrl: ModalController, private storage: Storage) {
    }

    /**
     * Loads the bill data
     */
    ionViewWillEnter() {
        this.loaded = false;

        this.storage.get('user').then(res => {
            if (!res) {
                this.bill = null;
                this.loaded = true;
            } else {
                this.apiProvider.builder('bills/' + res.id, false).get().subscribe(res => {
                    if (res instanceof HttpErrorResponse) {
                        this.bill = null;
                    } else {
                        this.bill = res;
                    }

                    this.loaded = true;
                });
            }
        });
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
