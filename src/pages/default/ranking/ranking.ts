import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-ranking',
    templateUrl: 'ranking.html',
})
export class RankingPage {
    private ranking = [];
    private loaded: boolean = false;

    constructor(private apiProvider: ApiProvider) {
    }

    /**
     * Loads the products list on page load
     */
    ionViewDidLoad() {
        this.loaded = false;

        this.apiProvider.builder('users/ranking').get().subscribe(res => {
            this.ranking = res;
            this.loaded = true;
        });
    }
}
