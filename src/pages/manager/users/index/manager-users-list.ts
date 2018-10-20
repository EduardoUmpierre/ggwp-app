import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from "../../../../providers/api/api";

@IonicPage()
@Component({
    selector: 'page-manager-users-list',
    templateUrl: 'manager-users-list.html',
})
export class ManagerUsersListPage {
    private users = [];
    filteredItems = [];
    loaded: boolean = false;

    data = {
        titleKey: 'name',
        subtitle: true,
        subtitleKey: 'cpf'
    };

    constructor(private navCtrl: NavController, private apiProvider: ApiProvider) {
    }

    /**
     * Loads the users data on page load
     */
    ionViewWillEnter() {
        this.apiProvider.builder('users').loader().get().subscribe(res => {
            this.filteredItems = this.users = res;
            this.loaded = true;
        });
    }

    /**
     * Push to the form page
     *
     * @param {number} id
     */
    goToForm(id: number = null) {
        this.navCtrl.push('ManagerUsersFormPage', {id: id});
    }

    /**
     * @param {any} ev
     */
    filterItems(ev: any) {
        let val = ev.target.value;
        this.filteredItems = this.users;

        if (val && val.trim() !== '') {
            this.filteredItems = this.filteredItems.filter((item) => item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
    }

    /**
     * Removes an user
     *
     * @param {number} id
     * @param {number} key
     */
    remove(id: number, key: number) {
        this.apiProvider.builder(`users/${id}`).loader().delete().subscribe(() => this.users.splice(key, 1));
    }

    /**
     * Edits an user
     *
     * @param {number} id
     */
    edit(id: number) {
        this.goToForm(id);
    }
}
