import { Component } from '@angular/core';
import { Events, IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiProvider } from "../../../providers/api/api";
import { AuthProvider } from "../../../providers/auth/auth";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    private form: FormGroup;

    constructor(private viewCtrl: ViewController, public navParams: NavParams, private formBuilder: FormBuilder,
                private apiProvider: ApiProvider, private authProvider: AuthProvider, private storage: Storage,
                private events: Events) {
        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            cpf: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            birthday: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    register() {
        this.apiProvider.builder('users').loader().post(this.form.value).subscribe((e) => {
            this.authProvider.loader('Entrando')
                .login({'username': e.username, 'password': this.form.controls['password'].value})
                .then((res) => {
                    this.authProvider.hideLoader();

                    this.storage.set('token', res.access_token).then(() => {
                        this.authProvider.getUser().subscribe((user) => {
                            this.storage.set('user', user).then(() => {
                                this.events.publish('user:updated', true);
                                this.dismiss();
                            });
                        });
                    });
                });
        });
    }
}
