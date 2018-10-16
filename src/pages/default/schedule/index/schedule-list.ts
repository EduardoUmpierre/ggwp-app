import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-schedule-list',
    templateUrl: 'schedule-list.html',
})
export class SchedulePage {
    private schedule = [];
    private modal;
    private loaded: boolean = false;

    constructor(private apiProvider: ApiProvider, private modalCtrl: ModalController) {
    }

    /**
     * Loads the products list on page load
     */
    ionViewDidLoad() {
        this.loaded = false;

        this.apiProvider.builder('schedule').get().subscribe(res => {
            this.schedule = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the details page
     *
     * @param {number} id
     */
    showModal(id: number) {
        this.modal = this.modalCtrl.create('ScheduleDetailPage', {id: id});
        this.modal.present();
    }
}
