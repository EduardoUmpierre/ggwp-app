import { Component, Input } from '@angular/core';

@Component({
    selector: 'user-level',
    templateUrl: 'user-level.html'
})
export class UserLevelComponent {
    @Input('user') user: any;
    @Input('layout') layout: string;

    private progressBarValue;

    /**
     * Updates the progressbar with the level amount
     */
    ngOnChanges() {
        if (this.user && this.user.current_level) {
            const currentLevelMinExp = this.user.current_level.experience;

            this.progressBarValue = ((this.user.experience - currentLevelMinExp) * 100) / (this.user.next_level.experience - currentLevelMinExp);
        }
    }
}
