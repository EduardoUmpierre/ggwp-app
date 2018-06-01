import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpAngularProvider {
    constructor(private http: HttpClient) {
    }

    /**
     *
     * @param url
     * @param options
     * @returns {Observable<any>}
     */
    public get(url, options: any = {}) {
        return this.http.get(url);
    }

    /**
     * @param url
     * @param params
     * @param options
     * @returns {Observable<any>}
     */
    public post(url, params: any, options: any = {}) {
        return this.http.post(url, params, {headers: options}).map(res => console.log(res));
    }

    /**
     * @param url
     * @param params
     * @param options
     * @returns {Observable<any>}
     */
    public put(url, params: any, options: any = {}) {
        return this.http.put(url, params, {headers: options}).map(res => console.log(res));
    }

    /**
     * @param url
     * @param options
     * @returns {Observable<any>}
     */
    public delete(url, options: any = {}) {
        return this.http.delete(url, {headers: options}).map(res => console.log(res));
    }
}
