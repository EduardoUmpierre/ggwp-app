import { Component } from '@angular/core';
import { AlertController, IonicPage, NavParams, ViewController, Events } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../../providers/auth/auth";
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from "@angular/common/http";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    private form: FormGroup;

    constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public navParams: NavParams,
                private AuthProvider: AuthProvider, private formBuilder: FormBuilder, private storage: Storage,
                private events: Events) {
        this.form = this.formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    /**
     *
     * @param e
     */
    login(e) {
        e.preventDefault();

        this.AuthProvider.loader('Validando dados')
            .login(this.form.value)
            .then((res) => {
                this.AuthProvider.hideLoader();

                this.storage.set('token', res.access_token).then(() => {
                    this.AuthProvider.getUser().subscribe((user) => {
                        this.storage.set('user', user).then(() => {
                            this.events.publish('user:updated', true);
                            this.dismiss();
                        });
                    });
                });
            })
            .catch((res: HttpErrorResponse) => {
                this.AuthProvider.hideLoader();

                // Default message
                let title = 'Erro';
                let message = 'Ocorreu um erro no servidor. Tente novamente em breve.';

                // Unauthorized
                if (res.status === 401) {
                    console.log(res.error);

                    let error;

                    if (res.error.hasOwnProperty('error')) {
                        error = res.error.error;
                    } else {
                        error = JSON.parse(res.error).error;
                    }

                    // Invalid credentials status
                    if (error == 'invalid_credentials') {
                        title = 'Atenção';
                        message = 'Usuário e/ou senha inválidos';
                    }
                } else if (res.status === 404) {
                    message = 'Não foi possível conectar-se ao servidor. Verifique a sua conexão ou tente novamente em breve.';
                }

                let alert = this.alertCtrl.create({
                    title: title,
                    subTitle: message,
                    buttons: [
                        {text: 'OK'}
                    ]
                });

                alert.present();

                return res;
            });
    }
}
