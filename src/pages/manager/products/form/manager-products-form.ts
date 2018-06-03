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
    private ingredients = [];
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
     * Loads the ingredient data
     */
    ionViewWillLoad() {
        this.apiProvider.builder('categories').loader().get().subscribe(categories => {
            this.categories = categories;

            if (this.id) {
                this.apiProvider.builder('products/' + this.id).loader().get().subscribe(product => this.product = product);
            }
        });
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     *
     */
    submit() {
        if (this.id) {
            this.apiProvider.builder('produtcts/' + this.id).loader().put(Object.assign({}, {id: this.id}, this.form.value)).subscribe((res) => this.dismiss());
        } else {
            this.apiProvider.builder('produtcts').loader().post(this.form.value).subscribe((res) => this.dismiss());
        }
    }
}
