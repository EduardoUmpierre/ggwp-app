import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiProvider } from '../../../../providers/api/api';

@IonicPage()
@Component({
    selector: 'page-manager-schedule-form',
    templateUrl: 'manager-schedule-form.html',
})
export class ManagerScheduleFormPage {
    private id: number;
    private form: FormGroup;
    private title = 'Novo evento';

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
                private apiProvider: ApiProvider) {
        this.id = this.navParams.get('id');

        if (this.id) {
            this.title = 'Editar evento';
        }

        this.form = this.formBuilder.group({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required)
        });
    }

    ionViewWillLoad() {
        if (this.id) {
            this.apiProvider.builder('schedule/' + this.id).loader().get().subscribe(schedule => {
                this.form.controls['title'].setValue(schedule.title);
                this.form.controls['description'].setValue(schedule.description);
                this.form.controls['date'].setValue(schedule.date);
            });
        }
    }

    /**
     * Submits the form data to server
     */
    submit() {
        let data = Object.assign({}, this.form.value);

        if (this.id) {
            data = Object.assign(data, {id: this.id});

            this.apiProvider.builder('schedule/' + this.id).loader().put(data).subscribe((res) => this.dismiss());
        } else {
            this.apiProvider.builder('schedule').loader().post(data).subscribe((res) => this.dismiss());
        }
    }

    /**
     * Dismiss the current page
     */
    private dismiss() {
        this.navCtrl.pop();
    }
}
