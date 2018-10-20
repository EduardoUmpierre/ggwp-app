import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-ingredients-form',
    templateUrl: 'manager-ingredients-form.html',
})
export class ManagerIngredientsFormPage {
    private id: number;
    title = 'Novo ingrediente';
    form: FormGroup;

    constructor(private viewCtrl: ViewController, public navParams: NavParams, private apiProvider: ApiProvider,
                private formBuilder: FormBuilder) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar ingrediente';
        }

        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            allergenic: new FormControl(false, Validators.required)
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
            this.apiProvider.builder(`ingredients/${this.id}`).loader().get().subscribe(ingredient => {
                this.form.controls['name'].setValue(ingredient.name);
                this.form.controls['allergenic'].setValue(ingredient.allergenic);
            });
        }
    }

    /**
     *
     */
    submit() {
        if (this.id) {
            this.apiProvider.builder(`ingredients/${this.id}`).loader().put(Object.assign({}, {id: this.id}, this.form.value)).subscribe(() => this.dismiss());
        } else {
            this.apiProvider.builder('ingredients').loader().post(this.form.value).subscribe(() => this.dismiss());
        }
    }
}
