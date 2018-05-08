import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private loading: boolean;

    constructor(public navCtrl: NavController, public apiProvider: ApiProvider) {
        this.apiProvider.builder('products').loader().get().subscribe(res => console.log(res));
    }

    ionViewDidLoad() {
        this.loading = true;
    }
}
