import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { Storage } from "@ionic/storage";
import { ModalController } from "ionic-angular";

@Component({
    selector: 'expandable-header',
    templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {
    @Input('scrollArea') scrollArea: any;
    @Input('headerHeight') headerHeight: number;

    newHeaderHeight: any;
    private user = null;

    constructor(private element: ElementRef, private renderer: Renderer2, private storage: Storage,
                private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

        this.scrollArea.ionScroll.subscribe((ev) => {
            this.resizeHeader(ev);
        });

        setTimeout(() => {
            this.renderer.setStyle(this.scrollArea._elementRef.nativeElement.firstChild, 'margin-top', '90px');
        }, 300);
    }

    ngOnChanges() {
        this.storage.get('user').then(user => this.user = user);
    }

    /**
     * Calls the login page
     */
    loginModal() {
        const modal = this.modalCtrl.create('LoginPage');
        modal.present();
    }

    goToProfile() {
        const modal = this.modalCtrl.create('ProfilePage', {user: this.user});
        modal.present();
    }

    /**
     * Animates the header on scroll
     *
     * @param ev
     */
    resizeHeader(ev) {
        ev.domWrite(() => {
            this.newHeaderHeight = this.headerHeight - ev.scrollTop;

            if (this.newHeaderHeight < 0) {
                this.newHeaderHeight = 0;
            }

            const contentElementRef = this.scrollArea._elementRef.nativeElement;
            const contentTabsRef = this.scrollArea._tabs;
            let tabHeight = this.newHeaderHeight;
            let tabRefHeight = tabHeight;
            const tabYMargin = tabHeight - this.headerHeight;

            if (contentTabsRef) {
                this.renderer.setStyle(contentTabsRef._tabbar.nativeElement, 'transform', 'translate3d(0, ' + tabYMargin + 'px, 0)');

                tabRefHeight = tabHeight + 56;
            }

            const scrollContent = tabRefHeight;

            this.renderer.setStyle(this.element.nativeElement, 'height', tabHeight + 'px');
            this.renderer.setStyle(contentElementRef.lastChild, 'margin-top', scrollContent + 'px');
            this.renderer.setStyle(this.element.nativeElement.children[0], 'opacity', (tabHeight + 10) / 100);
        });
    }
}
