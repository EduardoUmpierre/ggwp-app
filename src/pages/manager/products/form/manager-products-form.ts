import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";
import { Product } from "../../../../models/Product";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
    selector: 'manager-page-products-form',
    templateUrl: 'manager-products-form.html',
})
export class ManagerProductsFormPage {
    private title = 'Novo produto';
    private id: number;
    private product: Product;
    private categories = [];
    private form: FormGroup;

    constructor(private viewCtrl: ViewController, public navParams: NavParams, private apiProvider: ApiProvider, private formBuilder: FormBuilder) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar produto';
        }

        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            experience: new FormControl('', Validators.required),
            categories_id: new FormControl('', Validators.required)
        });
    }

    /**
     *
     */
    ionViewWillEnter() {
        this.apiProvider.builder('products/' + this.id).loader().get().subscribe(res => this.product = res);
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
