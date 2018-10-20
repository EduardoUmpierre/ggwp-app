import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-schedule-list',
    templateUrl: 'manager-schedule-list.html',
})
export class ManagerScheduleListPage {
    private schedule = [];
    filteredItems = [];
    loaded: boolean = false;

    data = {
        titleKey: 'title',
        subtitle: true,
        subtitleKey: 'date',
        subtitleFormat: 'date'
    };

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the schedule data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('schedule').loader().get().subscribe(res => {
            this.filteredItems = this.schedule = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerScheduleFormPage', {id: id});
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.schedule;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter(item => item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
    }

    /**
     * Removes a schedule
     *
     * @param {number} id
     * @param {number} key
     */
    remove(id: number, key: number) {
        this.apiProvider.builder(`schedule/${id}`).loader().delete().subscribe(() => this.schedule.splice(key, 1));
    }

    /**
     * Edits a schedule
     *
     * @param {number} id
     */
    edit(id: number) {
        this.goToForm(id);
    }
}
