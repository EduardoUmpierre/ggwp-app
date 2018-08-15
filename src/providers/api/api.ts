import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { HttpNativeProvider } from "./http/http-native";
import { HttpAngularProvider } from "./http/http-angular";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";

@Injectable()
export class ApiProvider {
    private url: string;
    private resolveError: boolean;
    protected urlBase = this.isApp() ? 'https://underdogs-app.herokuapp.com/' : 'http://localhost:8000/';
    protected loading;
    protected http: HttpNativeProvider | HttpAngularProvider;

    constructor(private platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
                private httpAngular: HttpAngularProvider, private httpNative: HttpNativeProvider,
                protected storage: Storage) {
        this.http = this.isApp() ? this.httpNative : this.httpAngular;

        console.log('Is App:', this.isApp());
    }

    /**
     * Builds the final URL
     *
     * @param {string} controller
     * @param {boolean} resolve
     * @returns {this}
     */
    builder(controller: string, resolve: boolean = true) {
        this.url = this.urlBase + 'api/v1/' + controller;
        this.resolveError = resolve;

        return this;
    }

    /**
     * @returns {Observable<Headers>}
     */
    getApiToken(): Observable<Headers> {
        return Observable.fromPromise(this.storage.get('token'));
    }

    /**
     * Shows the loading modal
     *
     * @param message
     * @returns {ApiProvider}
     */
    loader(message: string = 'Carregando') {
        this.hideLoader();

        this.loading = this.loadingCtrl.create({
            content: message
        });

        this.loading.present();

        return this;
    }

    /**
     * Builds the URL parameters
     *
     * @param params
     */
    private buildUrlParams(params = null) {
        if (params) {
            let urlParams = '';

            for (let key in params) {
                if (urlParams)
                    urlParams += '&';

                urlParams += key + '=' + params[key];
            }

            this.url += urlParams !== '' ? '?' + urlParams : '';
        }

        return this.url;
    }

    /**
     * HTTP GET request
     *
     * @param {{}} params
     * @returns {any}
     */
    get(params = {}) {
        return this.resolve(this.getApiToken().flatMap((res) => {
            const headers = {
                'Authorization': 'Bearer ' + res
            };

            return this.http.get(this.buildUrlParams(params), headers);
        }));
    }

    /**
     * HTTP POST request
     *
     * @param params
     * @returns {any}
     */
    post(params) {
        return this.resolve(this.getApiToken().flatMap(res => {
            const headers = {
                'Authorization': 'Bearer ' + res,
                'Content-Type': 'application/json'
            };

            return this.http.post(this.url, params, headers);
        }));
    }

    /**
     * HTTP PUT request
     *
     * @param params
     * @returns {any}
     */
    put(params) {
        return this.resolve(this.getApiToken().flatMap(res => {
            const headers = {
                'Authorization': 'Bearer ' + res,
                'Content-Type': 'application/json'
            };

            return this.http.put(this.url, params, headers);
        }));
    }

    /**
     * HTTP DELETE request
     *
     * @returns {any}
     */
    delete() {
        return this.resolve(this.getApiToken().flatMap(res => this.http.delete(this.url, {
            'Authorization': 'Bearer ' + res
        })));
    }

    /**
     * @param request
     */
    resolve(request) {
        return request
            .map((res) => {
                this.hideLoader();

                return res || [];
            })
            .catch((err) => {
                this.hideLoader();

                if (!this.resolveError) {
                    return [err];
                }

                this.promiseErrorResolver(err).present();

                return [];
            });
    }

    /**
     * @param res
     */
    public promiseErrorResolver(res: HttpErrorResponse) {
        return this.alertCtrl.create(this.generateErrorMessage(res));
    }

    /**
     * Hides the loader if it's visible
     */
    public hideLoader() {
        if (this.loading) {
            this.loading.dismiss().catch(() => {
            });
        }
    }

    /**
     * @returns {boolean}
     */
    public isApp() {
        return this.platform.is('cordova');
    }

    /**
     * @param {HttpErrorResponse} res
     */
    private generateErrorMessage(res: HttpErrorResponse) {
        let title = 'Erro';
        let message = 'Ocorreu um erro no servidor. Tente novamente em breve.';

        if (res.status === 422) {
            title = 'Atenção';
            message = '<p>Falha na validação, verifique os campos:</p>';

            if (res.error) {
                console.error(res.status, res.error);

                message += this.generateUniqueValidationErrorItems(res.error);
            }
        }

        if (res.status === 404) {
            message = 'Não foi possível conectar-se ao servidor. Tente novamente em breve.';
        }

        return {
            title: title,
            subTitle: message,
            buttons: [{text: 'OK'}]
        }
    }

    /**
     * @param {object} error
     */
    private generateUniqueValidationErrorItems(error: object) {
        let message = '<ul>';

        for (let item in error) {
            let itemText;

            switch (item) {
                case 'cpf':
                    itemText = 'CPF';
                    break;
                case 'email':
                    itemText = 'e-mail'
                    break;
                case 'phone':
                    itemText = 'celular';
                    break;
                default:
                    itemText = item;
                    break;
            }

            if (error[item].indexOf('validation.unique') !== -1) {
                message += '<li>O ' + itemText + ' já está em uso.</li>';
            }
        }

        message += '</ul>';

        return message;
    }
}
