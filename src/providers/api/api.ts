import { Injectable } from '@angular/core';
import { LoadingController, AlertController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { HttpNativeProvider } from "./http/http-native";
import { HttpAngularProvider } from "./http/http-angular";

@Injectable()
export class ApiProvider {
    private url: string;
    protected urlBase = 'http://localhost:8000/';
    protected loading;
    private http: HttpNativeProvider | HttpAngularProvider;

    constructor(private platform: Platform, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
                private httpAngular: HttpAngularProvider, private httpNative: HttpNativeProvider) {
        this.http = this.isApp() ? this.httpNative : this.httpAngular;
    }

    /**
     * Builds the final URL
     *
     * @param {string} controller
     * @returns {ApiProvider}
     */
    builder(controller: string) {
        this.url = this.urlBase + 'api/v1/' + controller;

        return this;
    }

    /**
     * Shows the loading modal
     *
     * @param message
     * @returns {ApiProvider}
     */
    loader(message: string = 'Carregando') {
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
        return this.resolve(this.http.get(this.buildUrlParams(params)));
    }

    /**
     * HTTP POST request
     *
     * @param params
     * @returns {any}
     */
    post(params) {
        return this.resolve(this.http.post(this.url, params, {'Content-Type': 'application/json'}));
    }

    /**
     * HTTP PUT request
     *
     * @param params
     * @returns {any}
     */
    put(params) {
        return this.resolve(this.http.put(this.url, params, {'Content-Type': 'application/json'}));
    }

    /**
     * HTTP DELETE request
     *
     * @returns {any}
     */
    delete() {
        return this.resolve(this.http.delete(this.url));
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

                this.promiseErrorResolver(err).present();

                return [];
            });
    }

    /**
     *
     * @param error
     * @returns {Alert}
     */
    public promiseErrorResolver(error) {
        let title = 'Erro';
        let message = 'Erro no servidor, informe o erro ' + error.status + ' ao administrador.';

        if (error.status === 422) {
            title = 'Atenção';
            message = '<p>Falha de validação, verifique os campos.</p>';

            let body = JSON.parse(error._body) || {};

            if (body) {
                message += '<ul>';
                for (let item in body) {
                    if (body[item].indexOf('validation.unique') !== -1) {
                        message += '<li>O ' + item + ' já está cadastrado.</li>';
                    }
                }
                message += '</ul>';
            }
        }

        if (error.status === 404) {
            message = 'Não foi possível conectar-se ao servidor. Verifique a sua conexão ou tente novamente em breve.';
        }

        return this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [{text: 'OK'}]
        });
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
        return this.platform.is('core') || this.platform.is('cordova');
    }
}
