import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Ingredient } from "../../../../models/Ingredient";
import { Product } from "../../../../models/Product";
import { DecimalPipe } from "@angular/common";

@IonicPage()
@Component({
    selector: 'manager-page-products-form',
    templateUrl: 'manager-products-form.html',
})
export class ManagerProductsFormPage {
    private id: number;
    product: Product;
    title = 'Novo produto';
    categories = [];
    ingredients = [];
    selectedIngredients = [];
    form: FormGroup;

    constructor(private navCtrl: NavController, private navParams: NavParams, private apiProvider: ApiProvider,
                private formBuilder: FormBuilder, private decimalPipe: DecimalPipe) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar produto';
        }

        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            experience: new FormControl(0, Validators.required),
            categories_id: new FormControl('', Validators.required)
        });
    }

    /**
     * Loads the ingredient data
     */
    ionViewWillLoad() {
        this.apiProvider.builder('categories').loader().get().subscribe(categories => {
            this.categories = categories;

            this.apiProvider.builder('ingredients').loader().get().subscribe(ingredients => {
                this.ingredients = ingredients;

                if (this.id) {
                    this.apiProvider.builder(`products/${this.id}`).loader().get().subscribe(product => {
                        this.form.controls['name'].setValue(product.name);
                        this.form.controls['price'].setValue(this.decimalPipe.transform(product.price, '1.2-2', 'pt-BR'));
                        this.form.controls['experience'].setValue(product.experience);
                        this.form.controls['categories_id'].setValue(product.categories_id);

                        let ingredients = product.ingredients;

                        ingredients.forEach((e, i) => {
                            ingredients[i] = e.id;
                        });

                        this.selectedIngredients = ingredients;
                    });
                }
            });
        });
    }

    /**
     * Submits the form data to server
     */
    submit() {
        const ingredients = {
            ingredients: this.selectedIngredients
        };

        let data = Object.assign({}, this.form.value, ingredients);

        if (this.id) {
            data = Object.assign(data, {id: this.id});

            this.apiProvider.builder(`products/${this.id}`).loader().put(data).subscribe(() => this.dismiss());
        } else {
            this.apiProvider.builder('products').loader().post(data).subscribe(() => this.dismiss());
        }
    }

    /**
     * Update experience value according to price
     *
     * @param ev
     */
    updateExperience(ev: any) {
        const value = Math.ceil(ev.target.value.replace(/,/g, '.') * 0.75);

        this.form.controls['experience'].setValue(value);
    }

    /**
     * Dismiss the current page
     */
    private dismiss() {
        this.navCtrl.pop();
    }
}
