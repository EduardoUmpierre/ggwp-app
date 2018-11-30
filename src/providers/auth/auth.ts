import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthProvider extends ApiProvider {
    client = {
        client_id: '2',
        client_secret: 'D5xBasVi7s8qb7iKJvAO8ZZuYUaW6yyWdxsAFLHJ',
        scope: ''
    };

    /**
     * Get current user data
     *
     * @returns {any}
     */
    getUser(loader: boolean = true) {
        if (loader)
            return this.builder('auth/me').loader().get();

        return this.builder('auth/me').get();
    }

    /**
     * Do the login request
     *
     * @param data
     * @returns {Promise<T>}
     */
    login(data) {
        data = this.buildAuthForm(data);
        data.grant_type = 'password';

        return this.http.post(`${this.urlBase}oauth/token`, data).toPromise().then(res => res);
    }

    /**
     * Removes the user key in storage
     *
     * @returns {Promise<any>}
     */
    logout() {
        return this.storage.remove('user').then(() => this.storage.remove('token'));
    }

    /**
     * Refresh the authorization token
     *
     * @param data
     * @returns {any}
     */
    refreshToken(data) {
        data = this.buildAuthForm(data);
        data.grant_type = 'refresh_token';

        let observable = this.http.post(`${this.urlBase}oauth/token`, data);
        return this.resolve(observable);
    }

    /**
     *
     * @param {string} userId
     * @returns {Promise<HTTPResponse> | Promise<Object>}
     */
    getUserByFacebookId(userId: string) {
        return this.http.get(`${this.urlBase}api/v1/users/facebook/${userId}`).toPromise();
    }

    /**
     *
     * @param {object} data
     * @returns {Promise<HTTPResponse> | Promise<Object>}
     */
    createFacebookUser(data: object) {
        return this.http.post(`${this.urlBase}api/v1/users/facebook`, data).toPromise();
    }

    /**
     * Builds the authorization form
     *
     * @param data
     * @returns {any}
     */
    private buildAuthForm(data) {
        data.client_id = this.client.client_id;
        data.client_secret = this.client.client_secret;
        data.scope = this.client.scope;

        return data;
    }
}
