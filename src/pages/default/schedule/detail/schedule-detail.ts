import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-schedule-detail',
    templateUrl: 'schedule-detail.html',
})
export class ScheduleDetailPage {
    private event = [];

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the event data on page load
     */
    ionViewDidLoad() {
        this.apiProvider.builder(`schedule/${this.navParams.get('id')}`).loader().get().subscribe(res => this.event = res);
    }

    /**
     * Dismiss the modal
     */
    dismiss() {
        this.viewCtrl.dismiss();
    }
}
