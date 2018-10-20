import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiProvider } from "../../../../providers/api/api";
import {SelectSearchableComponent} from 'ionic-select-searchable';

@IonicPage()
@Component({
    selector: 'page-manager-bills-form',
    templateUrl: 'manager-bills-form.html',
})
export class ManagerBillsFormPage {
    private id: number;
    title = 'Nova comanda';
    cards = [];
    users = [];
    activeUsers = [];
    form: FormGroup;
    userForm: FormGroup;
    @ViewChild('userComponent') userComponent: SelectSearchableComponent;

    /**
     * Constructor
     *
     * @param {ViewController} viewCtrl
     * @param {NavParams} navParams
     * @param {ApiProvider} apiProvider
     * @param {FormBuilder} formBuilder
     */
    constructor(private viewCtrl: ViewController, public navParams: NavParams, private apiProvider: ApiProvider, private formBuilder: FormBuilder) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar comanda';
        }

        // Bill form
        this.form = this.formBuilder.group({
            cards_id: new FormControl('', Validators.required),
            users_id: new FormControl('', Validators.required)
        });

        // User form
        this.userForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            cpf: new FormControl('', Validators.required),
            birthday: new FormControl('', Validators.required),
            phone: new FormControl('')
        });
    }

    /**
     * Loads the cards, users and bill data
     */
    ionViewWillLoad() {
        this.apiProvider.builder('cards').loader().get({active: true}).subscribe(cards => {
            this.cards = cards;

            this.apiProvider.builder('users').loader().get({active: true}).subscribe(users => {
                this.users = users;

                this.activeUsers = users.filter((item) => item.is_active == 1);

                if (this.id) {
                    this.apiProvider.builder(`bills/${this.id}`).loader().get().subscribe(bill => {
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
            this.apiProvider.builder(`bills/${this.id}`).loader().put(Object.assign({}, {id: this.id}, this.dataNormalizer())).subscribe(() => this.dismiss());
        } else {
            this.apiProvider.builder('bills').loader().post(this.dataNormalizer()).subscribe(() => this.dismiss());
        }
    }

    /**
     * @returns object
     */
    private dataNormalizer() {
        return {
            'cards_id': this.form.get('cards_id').value.id,
            'users_id': this.form.get('users_id').value.id
        };
    }

    /**
     * @param {{component:SelectSearchableComponent}} event
     */
    onAddUser(event: {component: SelectSearchableComponent}) {
        this.resetUserForm();

        // Copy search text to port name field, so
        // user doesn't have to type again
        const search = event.component.searchText;

        if (/\d/.test(search.charAt(0))) {
            this.userForm.controls['cpf'].setValue(search);
        } else {
            this.userForm.controls['name'].setValue(search);
        }

        // Show form
        event.component.showAddItemTemplate();
    }

    /**
     */
    addUser() {
        this.apiProvider.builder('users/quick').loader().post(this.userForm.value).subscribe((res) => {
            this.userComponent.addItem(res).then(() => {
                this.userComponent.search(res.name);
            });

            // Clean form
            this.resetUserForm();

            // Show list
            this.userComponent.hideAddItemTemplate();
        });
    }

    /**
     */
    private resetUserForm() {
        this.userForm.controls['name'].reset();
        this.userForm.controls['email'].reset();
        this.userForm.controls['cpf'].reset();
        this.userForm.controls['birthday'].reset();
        this.userForm.controls['phone'].reset();
    }
}
