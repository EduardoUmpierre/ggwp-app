import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
    selector: 'page-ranking',
    templateUrl: 'ranking.html',
})
export class RankingPage {
    private ranking = [];
    private loaded: boolean = false;
    private user: any = null;

    constructor(private apiProvider: ApiProvider, private storage: Storage) {
    }

    /**
     * Loads the products list on page load
     */
    ionViewDidLoad() {
        this.loaded = false;
        this.storage.get('user').then(user => this.user = user);

        this.apiProvider.builder('users/ranking').get().subscribe(res => {
            this.ranking = res;
            this.loaded = true;
        });
    }

    /**
     * Verifies if the user is in the podium
     *
     * @param {number} i
     * @returns {boolean}
     */
    private isInPodium(i: number) {
        return i < 3;
    }

    /**
     * Verifies if the user item id is equal to the current user
     *
     * @param {number} id
     * @returns {boolean}
     */
    private isTheCurrentUser(id: number) {
        if (!this.user) {
            return false;
        }

        return this.user.id === id;
    }
}
