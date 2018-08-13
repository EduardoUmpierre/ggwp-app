import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-manager-bills-product-form',
    templateUrl: 'manager-bills-product-form.html',
})
export class ManagerBillsProductFormPage {
    private title = 'Adicionar produto';

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {

    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
