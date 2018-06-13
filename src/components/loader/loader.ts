import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: 'loader.html'
})
export class LoaderComponent {
    @Input('loading') status: boolean;
    private loading = true;

    ngOnChanges() {
        this.loading = !this.status;
    }
}
