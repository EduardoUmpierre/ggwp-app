import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Product } from "../../../../models/Product";
import { FormBuilder, FormControl, Validators, FormGroup } from "@angular/forms";
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-product-order-form',
    templateUrl: 'manager-bills-product-order-form.html',
})
export class ManagerBillsProductOrderFormPage {
    product: Product;
    products: Product[] = [];
    form: FormGroup;

    constructor(private navParams: NavParams, private viewCtrl: ViewController,
                private formBuilder: FormBuilder, private apiProvider: ApiProvider) {
        if (this.navParams.get('product')) {
            this.product = this.navParams.get('product');
        }

        this.form = this.formBuilder.group({
            note: new FormControl('')
        });
    }

    /**
     * Loads the products data
     */
    ionViewWillLoad() {
        this.apiProvider.builder('products').loader().get().subscribe(res => this.products = res);
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     * Dismiss the modal and returns the new product instance
     */
    submit() {
        this.viewCtrl.dismiss(new Product(this.product.id, this.product.name, this.product.price,
            this.product.experience, this.product.categories_id, this.form.value.note));
    }
}
