import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
    selector: 'page-manager-drops-form',
    templateUrl: 'manager-drops-form.html',
})
export class ManagerDropsFormPage {
    private id: number;
    title = 'Novo recompensa';
    form: FormGroup;

    constructor(private viewCtrl: ViewController, public navParams: NavParams, private apiProvider: ApiProvider,
                private formBuilder: FormBuilder) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar recompensa';
        }

        this.form = this.formBuilder.group({
            description: new FormControl('', Validators.required),
        });
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     * Loads the drop data
     */
    ionViewWillLoad() {
        if (this.id) {
            this.apiProvider.builder('drops/' + this.id).loader().get().subscribe(drop => {
                this.form.controls['description'].setValue(drop.description);
            });
        }
    }

    /**
     *
     */
    submit() {
        if (this.id) {
            this.apiProvider.builder('drops/' + this.id).loader().put(Object.assign({}, {id: this.id}, this.form.value)).subscribe((res) => this.dismiss());
        } else {
            this.apiProvider.builder('drops').loader().post(this.form.value).subscribe((res) => this.dismiss());
        }
    }
}
