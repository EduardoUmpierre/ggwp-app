import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiProvider } from "../../../../providers/api/api";
import * as moment from 'moment';
import 'moment/locale/pt-br';

@IonicPage()
@Component({
    selector: 'page-manager-users-form',
    templateUrl: 'manager-users-form.html',
})
export class ManagerUsersFormPage {
    private id: number;
    private form: FormGroup;
    private title = 'Novo usuário';

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
                private apiProvider: ApiProvider) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar usuário';
        }

        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            cpf: new FormControl('', Validators.required),
            birthday: new FormControl('', Validators.required),
            phone: new FormControl(''),
            role: new FormControl(0, Validators.required),
            password: new FormControl('')
        });
    }

    ionViewWillLoad() {
        if (this.id) {
            this.apiProvider.builder('users/' + this.id).loader().get().subscribe(user => {
                this.form.controls['name'].setValue(user.name);
                this.form.controls['username'].setValue(user.username);
                this.form.controls['email'].setValue(user.email);
                this.form.controls['cpf'].setValue(user.cpf);
                this.form.controls['birthday'].setValue(moment(user.birthday, 'YYYY-MM-DD').format('DD/MM/YYYY'));
                this.form.controls['phone'].setValue(user.phone);
                this.form.controls['role'].setValue(user.role);
            });
        }
    }

    /**
     * Submits the form data to server
     */
    submit() {
        let data = Object.assign({}, this.form.value);
        data.birthday = moment(data.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD');

        if (this.id) {
            data = Object.assign(data, {id: this.id});

            this.apiProvider.builder('users/' + this.id).loader().put(data).subscribe((res) => this.dismiss());
        } else {
            this.apiProvider.builder('users').loader().post(data).subscribe((res) => this.dismiss());
        }
    }

    /**
     * Dismiss the current page
     */
    private dismiss() {
        this.navCtrl.pop();
    }
}
