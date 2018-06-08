import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'expandable-header',
    templateUrl: 'expandable-header.html'
})
export class ExpandableHeaderComponent {
    @Input('scrollArea') scrollArea: any;
    @Input('headerHeight') headerHeight: number;

    newHeaderHeight: any;

    constructor(public element: ElementRef, public renderer: Renderer2) {
    }

    ngOnInit() {
        this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');

        this.scrollArea.ionScroll.subscribe((ev) => {
            this.resizeHeader(ev);
        });
    }

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

            if (contentTabsRef) {
                this.renderer.setStyle(contentTabsRef._tabbar.nativeElement, 'top', tabHeight + 'px');

                tabRefHeight = tabHeight + 56;
            }

            const scrollContent = tabRefHeight;
            const fixedContent = scrollContent;

            this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
            this.renderer.setStyle(contentElementRef.lastChild, 'margin-top', scrollContent + 'px');
            this.renderer.setStyle(contentElementRef.firstChild, 'margin-top', fixedContent + 'px');
            this.renderer.setStyle(this.element.nativeElement.children[0], 'opacity', (this.newHeaderHeight + 10) / 100);
        });
    }
}
