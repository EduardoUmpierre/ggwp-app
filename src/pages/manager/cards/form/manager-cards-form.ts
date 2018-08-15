import {Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {ApiProvider} from './../../../../providers/api/api';
import {FormGroup} from '@angular/forms';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-manager-cards-form',
    templateUrl: 'manager-cards-form.html',
})
export class ManagerCardsFormPage {
    private id: number;
    title = 'Novo cartão';
    form: FormGroup;

    constructor(private navCtrl: NavController, private navParams: NavParams, private apiProvider: ApiProvider, 
        private formBuilder: FormBuilder) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar cartão';
        }

        this.form = this.formBuilder.group({
            number: new FormControl('', Validators.required)
        });
    }

    /**
     * Loads the card data
     */
    ionViewWillLoad() {
        if (this.id) {
            this.apiProvider.builder('cards/' + this.id).loader().get().subscribe(card => {
                this.form.controls['number'].setValue(card.number);
            });
        }
    }

    /**
     * Submits the form data to server
     */
    submit() {
        let data = this.form.value;

        if (this.id) {
            data = Object.assign(data, {id: this.id});

            this.apiProvider.builder('cards/' + this.id).loader().put(data).subscribe((res) => this.dismiss());
        } else {
            this.apiProvider.builder('cards').loader().post(data).subscribe((res) => this.dismiss());
        }
    }

    /**
     * Dismiss the current page
     */
    private dismiss() {
        this.navCtrl.pop();
    }
}
