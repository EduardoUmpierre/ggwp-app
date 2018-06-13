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
    getUser() {
        return this.builder('auth/me').loader().get();
    }

    /**
     * Do the login request
     *
     * @param data
     */
    login(data) {
        data = this.buildAuthForm(data);
        data.grant_type = 'password';

        return this.http.post(this.urlBase + 'oauth/token', data).toPromise().then(res => res);
    }

    /**
     * Removes the user key in storage
     *
     * @returns {Promise<any>}
     */
    logout() {
        return this.storage.remove('user');
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

        let observable = this.http.post(this.urlBase + 'oauth/token', data);
        return this.resolve(observable);
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
