import { Component } from '@angular/core';
import { AlertController, IonicPage, NavParams, ViewController, Events, ModalController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../../providers/auth/auth";
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from "@angular/common/http";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    private form: FormGroup;

    constructor(public viewCtrl: ViewController, public alertCtrl: AlertController, public navParams: NavParams,
                private authProvider: AuthProvider, private formBuilder: FormBuilder, private storage: Storage,
                private events: Events, private modalCtrl: ModalController, private fb: Facebook) {
        this.form = this.formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    /**
     * Performs the login
     *
     * @param e
     */
    login(e) {
        e.preventDefault();

        this.authProvider.loader('Validando dados')
            .login(this.form.value)
            .then((res) => {
                this.authProvider.hideLoader();

                this.storage.set('token', res.access_token).then(() => {
                    this.authProvider.getUser().subscribe((user) => {
                        this.storage.set('user', user).then(() => {
                            this.events.publish('user:updated', true);
                            this.dismiss({update: true});
                        });
                    });
                });
            })
            .catch((res: HttpErrorResponse) => {
                this.authProvider.hideLoader();

                // Default message
                let title = 'Erro';
                let message = 'Ocorreu um erro no servidor. Tente novamente em breve.';

                // Unauthorized
                if (res.status === 401) {
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

    /**
     * Calls the registration page
     */
    register() {
        const modal = this.modalCtrl.create('RegisterPage');

        modal.onDidDismiss((data) => {
            if (data instanceof Object && data.hasOwnProperty('dismiss') && data.dismiss) {
                this.dismiss();
            }
        });

        modal.present();
    }

    /**
     * Dismiss the modal
     */
    dismiss(data: object = {}) {
        this.viewCtrl.dismiss(data);
    }

    /**
     *
     */
    facebookLogin() {
        this.authProvider.loader();

        // Makes the facebook dialog login
        this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {
                if (res.status === 'connected') {
                    const userID = res.authResponse.userID;

                    // Verifies if the connected user has an account
                    this.authProvider.getUserByFacebookId(userID)
                        .then(res => {
                            // Login to user's account
                            this.authProvider.loader('Entrando')
                                .login({'username': res['facebook_id'], 'password': res['facebook_id']})
                                .then((res) => {
                                    this.storage.set('token', res.access_token).then(() => {
                                        this.authProvider.getUser().subscribe((user) => {
                                            this.storage.set('user', user).then(() => {
                                                this.events.publish('user:updated', true);
                                                this.authProvider.hideLoader();
                                                this.dismiss();
                                            });
                                        });
                                    });
                                });
                        })
                        .catch(error => {
                            this.authProvider.loader('Criando conta');

                            // User not registered
                            // Get facebook user data
                            this.fb.api(`${userID}/?fields=name,email`, [])
                                .then(res => {
                                    // Creates an account
                                    this.authProvider.createFacebookUser(this.normalizeFacebookUserData(res))
                                        .then(user => {
                                            // Account created, now redirects to the next step
                                            const modal = this.modalCtrl.create('FacebookRegisterPage', {user: user});

                                            modal.onDidDismiss((data) => {
                                                if (data instanceof Object && data.hasOwnProperty('dismiss') && data.dismiss) {
                                                    this.dismiss();
                                                }
                                            });

                                            modal.present().then(() => this.authProvider.hideLoader());
                                        })
                                        .catch(error => {
                                            this.alertCtrl.create(this.authProvider.generateErrorMessage(error)).present().then(() => this.authProvider.hideLoader());
                                        });
                                })
                                .catch(error => {
                                    this.authProvider.hideLoader();
                                    console.log('Error', error);
                                });
                        });
                }
            })
            .catch(error => {
                this.authProvider.hideLoader();
                console.log('Error at login', error);
            });
    }

    /**
     *
     * @param {object} res
     */
    normalizeFacebookUserData(res: object) {
        let response = {};

        for (let key in res) {
            if (key) {
                let item = res[key];

                if (key === 'id') {
                    key = 'facebook_id';
                }

                response[key] = item;
            }
        }

        return response;
    }
}
