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
    private cards = [];
    private users = [];
    private form: FormGroup;

    constructor(private viewCtrl: ViewController, public navParams: NavParams, private apiProvider: ApiProvider, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            bills_id: new FormControl('', Validators.required),
            users_id: new FormControl('', Validators.required)
        });
    }

    /**
     * @todo Load the bill by id
     */
    ionViewWillEnter() {
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
