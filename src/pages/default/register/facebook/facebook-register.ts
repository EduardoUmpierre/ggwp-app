import { Component } from '@angular/core';
import { Events, IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { AuthProvider } from "../../../../providers/auth/auth";
import * as moment from "moment";
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-facebook-register',
    templateUrl: 'facebook-register.html',
})
export class FacebookRegisterPage {
    private user: any;
    private form: FormGroup;
    private permittedFields: Array<string> = ['name', 'email', 'birthday'];

    constructor(private viewCtrl: ViewController, private formBuilder: FormBuilder, private apiProvider: ApiProvider,
                private authProvider: AuthProvider, private storage: Storage, private events: Events,
                private navParams: NavParams) {
        this.user = navParams.get('user');

        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            cpf: new FormControl('', Validators.required),
            birthday: new FormControl('', Validators.required),
            phone: new FormControl('')
        });
    }

    /**
     *
     */
    ionViewWillLoad() {
        if (this.user) {
            for (let key in this.user) {
                if (this.permittedFields.indexOf(key) > -1) {
                    let value = this.user[key];

                    if (key === 'birthday') {
                        value = moment(this.user[key], 'YYYY-MM-DD').format('DD/MM/YYYY')
                    }

                    this.form.controls[key].setValue(value);
                }
            }
        }
    }

    /**
     * Dismiss the view
     */
    dismiss(dismiss: boolean = false) {
        this.viewCtrl.dismiss({dismiss: dismiss});
    }

    /**
     * Sends the register request
     */
    register() {
        const birthday: string = moment(this.form.controls['birthday'].value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        let form: any = this.form.value;
        form.birthday = birthday;
        form.facebook_id = this.user['facebook_id'];

        this.apiProvider.builder(`users/facebook/${this.user.id}`).loader().put(form).subscribe(() => {
            // Authorizes the registered user
            this.authProvider.loader('Entrando')
                .login({'username': this.user['facebook_id'], 'password': this.user['facebook_id']})
                .then(res => {
                    this.authProvider.hideLoader();

                    this.storage.set('token', res.access_token).then(() => {
                        this.authProvider.getUser().subscribe(user => {
                            this.storage.set('user', user).then(() => {
                                this.events.publish('user:updated', true);
                                this.dismiss(true);
                            });
                        });
                    });
                });
        });
    }
}
