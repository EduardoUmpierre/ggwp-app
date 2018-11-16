import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-categories-form',
    templateUrl: 'manager-categories-form.html',
})
export class ManagerCategoriesFormPage {
    private id: number;
    title = 'Nova categoria';
    form: FormGroup;

    constructor(private viewCtrl: ViewController, public navParams: NavParams, private apiProvider: ApiProvider,
                private formBuilder: FormBuilder) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar categoria';
        }

        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required)
        });
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     * Loads the ingredient data
     */
    ionViewWillLoad() {
        if (this.id) {
            this.apiProvider.builder(`categories/${this.id}`).loader().get().subscribe(ingredient => {
                this.form.controls['name'].setValue(ingredient.name);
            });
        }
    }

    /**
     *
     */
    submit() {
        if (this.id) {
            this.apiProvider.builder(`categories/${this.id}`).loader().put(Object.assign({}, {id: this.id}, this.form.value)).subscribe(() => this.dismiss());
        } else {
            this.apiProvider.builder('categories').loader().post(this.form.value).subscribe(() => this.dismiss());
        }
    }
}
