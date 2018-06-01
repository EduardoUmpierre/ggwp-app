import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-bills-form',
    templateUrl: 'manager-bills-form.html',
})
export class ManagerBillsFormPage {
    private title = 'Nova comanda';
    private id: number;
    private cards = [];
    private users = [];
    private form: FormGroup;

    constructor(private viewCtrl: ViewController, public navParams: NavParams, private apiProvider: ApiProvider, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            cards_id: new FormControl('', Validators.required),
            users_id: new FormControl('', Validators.required)
        });
    }

    /**
     * @todo Load the bill by id
     */
    ionViewWillLoad() {
        this.apiProvider.builder('cards').loader().get().subscribe(res => {
            this.cards = res;

            this.apiProvider.builder('users').loader().get().subscribe(res => this.users = res);
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
            // this.apiProvider.builder('users/' + this.navParams.get('id')).loader().put(Object.assign({}, {id: this.id}, this.form.value)).subscribe((res) => this.redirect());
        } else {
            this.apiProvider.builder('bills').loader().post(this.dataNormalizer()).subscribe((res) => this.dismiss());
        }
    }

    /**
     * @returns object
     */
    dataNormalizer() {
        return {
            'cards_id': this.form.get('cards_id').value.id,
            'users_id': this.form.get('users_id').value.id
        };
    }
}
