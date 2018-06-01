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
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar comanda';
        }

        this.form = this.formBuilder.group({
            cards_id: new FormControl('', Validators.required),
            users_id: new FormControl('', Validators.required)
        });
    }

    /**
     * Loads the cards, users and bill data
     */
    ionViewWillLoad() {
        this.apiProvider.builder('cards').loader().get().subscribe(cards => {
            this.cards = cards;

            this.apiProvider.builder('users').loader().get().subscribe(users => {
                this.users = users;

                if (this.id) {
                    this.apiProvider.builder('bills/' + this.id).loader().get().subscribe(bill => {
                        this.form.controls['users_id'].setValue(bill.user);
                        this.form.controls['cards_id'].setValue(bill.card);
                    });
                }
            });
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
            this.apiProvider.builder('bills/' + this.id).loader().put(Object.assign({}, {id: this.id}, this.dataNormalizer())).subscribe((res) => this.dismiss());
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
