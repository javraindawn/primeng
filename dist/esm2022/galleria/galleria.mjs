import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { FocusTrapModule } from 'primeng/focustrap';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/focustrap";
/**
 * Galleria is an advanced content gallery component.
 * @group Components
 */
class Galleria {
    document;
    element;
    cd;
    config;
    /**
     * Index of the first item.
     * @group Props
     */
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    /**
     * Whether to display the component on fullscreen.
     * @group Props
     */
    fullScreen = false;
    /**
     * Unique identifier of the element.
     * @group Props
     */
    id;
    /**
     * An array of objects to display.
     * @group Props
     */
    value;
    /**
     * Number of items per page.
     * @group Props
     */
    numVisible = 3;
    /**
     * An array of options for responsive design.
     * @see {GalleriaResponsiveOptions}
     * @group Props
     */
    responsiveOptions;
    /**
     * Whether to display navigation buttons in item section.
     * @group Props
     */
    showItemNavigators = false;
    /**
     * Whether to display navigation buttons in thumbnail container.
     * @group Props
     */
    showThumbnailNavigators = true;
    /**
     * Whether to display navigation buttons on item hover.
     * @group Props
     */
    showItemNavigatorsOnHover = false;
    /**
     * When enabled, item is changed on indicator hover.
     * @group Props
     */
    changeItemOnIndicatorHover = false;
    /**
     * Defines if scrolling would be infinite.
     * @group Props
     */
    circular = false;
    /**
     * Items are displayed with a slideshow in autoPlay mode.
     * @group Props
     */
    autoPlay = false;
    /**
     * When enabled, autorun should stop by click.
     * @group Props
     */
    shouldStopAutoplayByClick = true;
    /**
     * Time in milliseconds to scroll items.
     * @group Props
     */
    transitionInterval = 4000;
    /**
     * Whether to display thumbnail container.
     * @group Props
     */
    showThumbnails = true;
    /**
     * Position of thumbnails.
     * @group Props
     */
    thumbnailsPosition = 'bottom';
    /**
     * Height of the viewport in vertical thumbnail.
     * @group Props
     */
    verticalThumbnailViewPortHeight = '300px';
    /**
     * Whether to display indicator container.
     * @group Props
     */
    showIndicators = false;
    /**
     * When enabled, indicator container is displayed on item container.
     * @group Props
     */
    showIndicatorsOnItem = false;
    /**
     * Position of indicators.
     * @group Props
     */
    indicatorsPosition = 'bottom';
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * Style class of the mask on fullscreen mode.
     * @group Props
     */
    maskClass;
    /**
     * Style class of the component on fullscreen mode. Otherwise, the 'class' property can be used.
     * @group Props
     */
    containerClass;
    /**
     * Inline style of the component on fullscreen mode. Otherwise, the 'style' property can be used.
     * @group Props
     */
    containerStyle;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Specifies the visibility of the mask on fullscreen mode.
     * @group Props
     */
    get visible() {
        return this._visible;
    }
    set visible(visible) {
        this._visible = visible;
        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    /**
     * Callback to invoke on active index change.
     * @param {number} number - Active index.
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    /**
     * Callback to invoke on visiblity change.
     * @param {boolean} boolean - Visible value.
     * @group Emits
     */
    visibleChange = new EventEmitter();
    mask;
    container;
    templates;
    _visible = false;
    _activeIndex = 0;
    headerFacet;
    footerFacet;
    indicatorFacet;
    captionFacet;
    closeIconTemplate;
    previousThumbnailIconTemplate;
    nextThumbnailIconTemplate;
    itemPreviousIconTemplate;
    itemNextIconTemplate;
    maskVisible = false;
    constructor(document, element, cd, config) {
        this.document = document;
        this.element = element;
        this.cd = cd;
        this.config = config;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerFacet = item.template;
                    break;
                case 'footer':
                    this.footerFacet = item.template;
                    break;
                case 'indicator':
                    this.indicatorFacet = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                case 'itemnexticon':
                    this.itemNextIconTemplate = item.template;
                    break;
                case 'itempreviousicon':
                    this.itemPreviousIconTemplate = item.template;
                    break;
                case 'previousthumbnailicon':
                    this.previousThumbnailIconTemplate = item.template;
                    break;
                case 'nextthumbnailicon':
                    this.nextThumbnailIconTemplate = item.template;
                    break;
                case 'caption':
                    this.captionFacet = item.template;
                    break;
            }
        });
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.value && simpleChanges.value.currentValue?.length < this.numVisible) {
            this.numVisible = simpleChanges.value.currentValue.length;
        }
    }
    onMaskHide() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
    onActiveItemChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeIndexChange.emit(index);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.enableModality();
                setTimeout(() => {
                    DomHandler.focus(DomHandler.findSingle(this.container.nativeElement, '[data-pc-section="closebutton"]'));
                }, 25);
                break;
            case 'void':
                DomHandler.addClass(this.mask?.nativeElement, 'p-component-overlay-leave');
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.disableModality();
                break;
        }
    }
    enableModality() {
        DomHandler.addClass(this.document.body, 'p-overflow-hidden');
        this.cd.markForCheck();
        if (this.mask) {
            ZIndexUtils.set('modal', this.mask.nativeElement, this.baseZIndex || this.config.zIndex.modal);
        }
    }
    disableModality() {
        DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        this.maskVisible = false;
        this.cd.markForCheck();
        if (this.mask) {
            ZIndexUtils.clear(this.mask.nativeElement);
        }
    }
    ngOnDestroy() {
        if (this.fullScreen) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }
        if (this.mask) {
            this.disableModality();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Galleria, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Galleria, selector: "p-galleria", inputs: { activeIndex: "activeIndex", fullScreen: "fullScreen", id: "id", value: "value", numVisible: "numVisible", responsiveOptions: "responsiveOptions", showItemNavigators: "showItemNavigators", showThumbnailNavigators: "showThumbnailNavigators", showItemNavigatorsOnHover: "showItemNavigatorsOnHover", changeItemOnIndicatorHover: "changeItemOnIndicatorHover", circular: "circular", autoPlay: "autoPlay", shouldStopAutoplayByClick: "shouldStopAutoplayByClick", transitionInterval: "transitionInterval", showThumbnails: "showThumbnails", thumbnailsPosition: "thumbnailsPosition", verticalThumbnailViewPortHeight: "verticalThumbnailViewPortHeight", showIndicators: "showIndicators", showIndicatorsOnItem: "showIndicatorsOnItem", indicatorsPosition: "indicatorsPosition", baseZIndex: "baseZIndex", maskClass: "maskClass", containerClass: "containerClass", containerStyle: "containerStyle", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", visible: "visible" }, outputs: { activeIndexChange: "activeIndexChange", visibleChange: "visibleChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "mask", first: true, predicate: ["mask"], descendants: true }, { propertyName: "container", first: true, predicate: ["container"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div *ngIf="fullScreen; else windowed" #container>
            <div
                *ngIf="maskVisible"
                #mask
                [ngClass]="{ 'p-galleria-mask p-component-overlay p-component-overlay-enter': true, 'p-galleria-visible': this.visible }"
                [class]="maskClass"
                [attr.role]="fullScreen ? 'dialog' : 'region'"
                [attr.aria-modal]="fullScreen ? 'true' : undefined"
            >
                <p-galleriaContent
                    *ngIf="visible"
                    [@animation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                    (@animation.start)="onAnimationStart($event)"
                    (@animation.done)="onAnimationEnd($event)"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [numVisible]="numVisible"
                    (maskHide)="onMaskHide()"
                    (activeItemChange)="onActiveItemChange($event)"
                    [ngStyle]="containerStyle"
                ></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent [value]="value" [activeIndex]="activeIndex" [numVisible]="numVisible" (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `, isInline: true, styles: [".p-galleria-content{display:flex;flex-direction:column}.p-galleria-item-wrapper{display:flex;flex-direction:column;position:relative}.p-galleria-item-container{position:relative;display:flex;height:100%}.p-galleria-item-nav{position:absolute;top:50%;margin-top:-.5rem;display:inline-flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-item-prev{left:0;border-top-left-radius:0;border-bottom-left-radius:0}.p-galleria-item-next{right:0;border-top-right-radius:0;border-bottom-right-radius:0}.p-galleria-item{display:flex;justify-content:center;align-items:center;height:100%;width:100%}.p-galleria-item-nav-onhover .p-galleria-item-nav{pointer-events:none;opacity:0;transition:opacity .2s ease-in-out}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav{pointer-events:all;opacity:1}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled{pointer-events:none}.p-galleria-caption{position:absolute;bottom:0;left:0;width:100%}.p-galleria-thumbnail-wrapper{display:flex;flex-direction:column;overflow:auto;flex-shrink:0}.p-galleria-thumbnail-prev,.p-galleria-thumbnail-next{align-self:center;flex:0 0 auto;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-galleria-thumbnail-prev span,.p-galleria-thumbnail-next span{display:flex;justify-content:center;align-items:center}.p-galleria-thumbnail-container{display:flex;flex-direction:row}.p-galleria-thumbnail-items-container{overflow:hidden;width:100%}.p-galleria-thumbnail-items{display:flex}.p-galleria-thumbnail-item{overflow:auto;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:.5}.p-galleria-thumbnail-item:hover{opacity:1;transition:opacity .3s}.p-galleria-thumbnail-item-current{opacity:1}.p-galleria-thumbnails-left .p-galleria-content,.p-galleria-thumbnails-right .p-galleria-content,.p-galleria-thumbnails-left .p-galleria-item-wrapper,.p-galleria-thumbnails-right .p-galleria-item-wrapper{flex-direction:row}.p-galleria-thumbnails-left p-galleriaitem,.p-galleria-thumbnails-top p-galleriaitem{order:2}.p-galleria-thumbnails-left p-galleriathumbnails,.p-galleria-thumbnails-top p-galleriathumbnails{order:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-container,.p-galleria-thumbnails-right .p-galleria-thumbnail-container{flex-direction:column;flex-grow:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-items,.p-galleria-thumbnails-right .p-galleria-thumbnail-items{flex-direction:column;height:100%}.p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,.p-galleria-thumbnails-right .p-galleria-thumbnail-wrapper{height:100%}.p-galleria-indicators{display:flex;align-items:center;justify-content:center}.p-galleria-indicator>button{display:inline-flex;align-items:center}.p-galleria-indicators-left .p-galleria-item-wrapper,.p-galleria-indicators-right .p-galleria-item-wrapper{flex-direction:row;align-items:center}.p-galleria-indicators-left .p-galleria-item-container,.p-galleria-indicators-top .p-galleria-item-container{order:2}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-top .p-galleria-indicators{order:1}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-right .p-galleria-indicators{flex-direction:column}.p-galleria-indicator-onitem .p-galleria-indicators{position:absolute;display:flex;z-index:1}.p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators{top:0;left:0;width:100%;align-items:flex-start}.p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators{right:0;top:0;height:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators{bottom:0;left:0;width:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators{left:0;top:0;height:100%;align-items:flex-start}.p-galleria-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background-color:transparent;transition-property:background-color}.p-galleria-close{position:absolute;top:0;right:0;display:flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-mask .p-galleria-item-nav{position:fixed;top:50%;margin-top:-.5rem}.p-galleria-mask.p-galleria-mask-leave{background-color:transparent}.p-items-hidden .p-galleria-thumbnail-item{visibility:hidden}.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active{visibility:visible}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(function () { return GalleriaContent; }), selector: "p-galleriaContent", inputs: ["activeIndex", "value", "numVisible"], outputs: ["maskHide", "activeItemChange"] }], animations: [
            trigger('animation', [
                transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
                transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Galleria };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Galleria, decorators: [{
            type: Component,
            args: [{ selector: 'p-galleria', template: `
        <div *ngIf="fullScreen; else windowed" #container>
            <div
                *ngIf="maskVisible"
                #mask
                [ngClass]="{ 'p-galleria-mask p-component-overlay p-component-overlay-enter': true, 'p-galleria-visible': this.visible }"
                [class]="maskClass"
                [attr.role]="fullScreen ? 'dialog' : 'region'"
                [attr.aria-modal]="fullScreen ? 'true' : undefined"
            >
                <p-galleriaContent
                    *ngIf="visible"
                    [@animation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                    (@animation.start)="onAnimationStart($event)"
                    (@animation.done)="onAnimationEnd($event)"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [numVisible]="numVisible"
                    (maskHide)="onMaskHide()"
                    (activeItemChange)="onActiveItemChange($event)"
                    [ngStyle]="containerStyle"
                ></p-galleriaContent>
            </div>
        </div>

        <ng-template #windowed>
            <p-galleriaContent [value]="value" [activeIndex]="activeIndex" [numVisible]="numVisible" (activeItemChange)="onActiveItemChange($event)"></p-galleriaContent>
        </ng-template>
    `, animations: [
                        trigger('animation', [
                            transition('void => visible', [style({ transform: 'scale(0.7)', opacity: 0 }), animate('{{showTransitionParams}}')]),
                            transition('visible => void', [animate('{{hideTransitionParams}}', style({ transform: 'scale(0.7)', opacity: 0 }))])
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-galleria-content{display:flex;flex-direction:column}.p-galleria-item-wrapper{display:flex;flex-direction:column;position:relative}.p-galleria-item-container{position:relative;display:flex;height:100%}.p-galleria-item-nav{position:absolute;top:50%;margin-top:-.5rem;display:inline-flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-item-prev{left:0;border-top-left-radius:0;border-bottom-left-radius:0}.p-galleria-item-next{right:0;border-top-right-radius:0;border-bottom-right-radius:0}.p-galleria-item{display:flex;justify-content:center;align-items:center;height:100%;width:100%}.p-galleria-item-nav-onhover .p-galleria-item-nav{pointer-events:none;opacity:0;transition:opacity .2s ease-in-out}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav{pointer-events:all;opacity:1}.p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled{pointer-events:none}.p-galleria-caption{position:absolute;bottom:0;left:0;width:100%}.p-galleria-thumbnail-wrapper{display:flex;flex-direction:column;overflow:auto;flex-shrink:0}.p-galleria-thumbnail-prev,.p-galleria-thumbnail-next{align-self:center;flex:0 0 auto;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-galleria-thumbnail-prev span,.p-galleria-thumbnail-next span{display:flex;justify-content:center;align-items:center}.p-galleria-thumbnail-container{display:flex;flex-direction:row}.p-galleria-thumbnail-items-container{overflow:hidden;width:100%}.p-galleria-thumbnail-items{display:flex}.p-galleria-thumbnail-item{overflow:auto;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:.5}.p-galleria-thumbnail-item:hover{opacity:1;transition:opacity .3s}.p-galleria-thumbnail-item-current{opacity:1}.p-galleria-thumbnails-left .p-galleria-content,.p-galleria-thumbnails-right .p-galleria-content,.p-galleria-thumbnails-left .p-galleria-item-wrapper,.p-galleria-thumbnails-right .p-galleria-item-wrapper{flex-direction:row}.p-galleria-thumbnails-left p-galleriaitem,.p-galleria-thumbnails-top p-galleriaitem{order:2}.p-galleria-thumbnails-left p-galleriathumbnails,.p-galleria-thumbnails-top p-galleriathumbnails{order:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-container,.p-galleria-thumbnails-right .p-galleria-thumbnail-container{flex-direction:column;flex-grow:1}.p-galleria-thumbnails-left .p-galleria-thumbnail-items,.p-galleria-thumbnails-right .p-galleria-thumbnail-items{flex-direction:column;height:100%}.p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,.p-galleria-thumbnails-right .p-galleria-thumbnail-wrapper{height:100%}.p-galleria-indicators{display:flex;align-items:center;justify-content:center}.p-galleria-indicator>button{display:inline-flex;align-items:center}.p-galleria-indicators-left .p-galleria-item-wrapper,.p-galleria-indicators-right .p-galleria-item-wrapper{flex-direction:row;align-items:center}.p-galleria-indicators-left .p-galleria-item-container,.p-galleria-indicators-top .p-galleria-item-container{order:2}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-top .p-galleria-indicators{order:1}.p-galleria-indicators-left .p-galleria-indicators,.p-galleria-indicators-right .p-galleria-indicators{flex-direction:column}.p-galleria-indicator-onitem .p-galleria-indicators{position:absolute;display:flex;z-index:1}.p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators{top:0;left:0;width:100%;align-items:flex-start}.p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators{right:0;top:0;height:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators{bottom:0;left:0;width:100%;align-items:flex-end}.p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators{left:0;top:0;height:100%;align-items:flex-start}.p-galleria-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background-color:transparent;transition-property:background-color}.p-galleria-close{position:absolute;top:0;right:0;display:flex;justify-content:center;align-items:center;overflow:hidden}.p-galleria-mask .p-galleria-item-nav{position:fixed;top:50%;margin-top:-.5rem}.p-galleria-mask.p-galleria-mask-leave{background-color:transparent}.p-items-hidden .p-galleria-thumbnail-item{visibility:hidden}.p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active{visibility:visible}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }]; }, propDecorators: { activeIndex: [{
                type: Input
            }], fullScreen: [{
                type: Input
            }], id: [{
                type: Input
            }], value: [{
                type: Input
            }], numVisible: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], showItemNavigators: [{
                type: Input
            }], showThumbnailNavigators: [{
                type: Input
            }], showItemNavigatorsOnHover: [{
                type: Input
            }], changeItemOnIndicatorHover: [{
                type: Input
            }], circular: [{
                type: Input
            }], autoPlay: [{
                type: Input
            }], shouldStopAutoplayByClick: [{
                type: Input
            }], transitionInterval: [{
                type: Input
            }], showThumbnails: [{
                type: Input
            }], thumbnailsPosition: [{
                type: Input
            }], verticalThumbnailViewPortHeight: [{
                type: Input
            }], showIndicators: [{
                type: Input
            }], showIndicatorsOnItem: [{
                type: Input
            }], indicatorsPosition: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], maskClass: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], containerStyle: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], visible: [{
                type: Input
            }], activeIndexChange: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], mask: [{
                type: ViewChild,
                args: ['mask']
            }], container: [{
                type: ViewChild,
                args: ['container']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class GalleriaContent {
    galleria;
    cd;
    differs;
    config;
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    value = [];
    numVisible;
    maskHide = new EventEmitter();
    activeItemChange = new EventEmitter();
    closeButton;
    id;
    _activeIndex = 0;
    slideShowActive = true;
    interval;
    styleClass;
    differ;
    constructor(galleria, cd, differs, config) {
        this.galleria = galleria;
        this.cd = cd;
        this.differs = differs;
        this.config = config;
        this.id = this.galleria.id || UniqueComponentId();
        this.differ = this.differs.find(this.galleria).create();
    }
    ngDoCheck() {
        const changes = this.differ.diff(this.galleria);
        if (changes && changes.forEachItem.length > 0) {
            // Because we change the properties of the parent component,
            // and the children take our entity from the injector.
            // We can tell the children to redraw themselves when we change the properties of the parent component.
            // Since we have an onPush strategy
            this.cd.markForCheck();
        }
    }
    galleriaClass() {
        const thumbnailsPosClass = this.galleria.showThumbnails && this.getPositionClass('p-galleria-thumbnails', this.galleria.thumbnailsPosition);
        const indicatorPosClass = this.galleria.showIndicators && this.getPositionClass('p-galleria-indicators', this.galleria.indicatorsPosition);
        return (this.galleria.containerClass ? this.galleria.containerClass + ' ' : '') + (thumbnailsPosClass ? thumbnailsPosClass + ' ' : '') + (indicatorPosClass ? indicatorPosClass + ' ' : '');
    }
    startSlideShow() {
        this.interval = setInterval(() => {
            let activeIndex = this.galleria.circular && this.value.length - 1 === this.activeIndex ? 0 : this.activeIndex + 1;
            this.onActiveIndexChange(activeIndex);
            this.activeIndex = activeIndex;
        }, this.galleria.transitionInterval);
        this.slideShowActive = true;
    }
    stopSlideShow() {
        if (this.galleria.autoPlay && !this.galleria.shouldStopAutoplayByClick) {
            return;
        }
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideShowActive = false;
    }
    getPositionClass(preClassName, position) {
        const positions = ['top', 'left', 'bottom', 'right'];
        const pos = positions.find((item) => item === position);
        return pos ? `${preClassName}-${pos}` : '';
    }
    isVertical() {
        return this.galleria.thumbnailsPosition === 'left' || this.galleria.thumbnailsPosition === 'right';
    }
    onActiveIndexChange(index) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.activeItemChange.emit(this.activeIndex);
        }
    }
    closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaContent, deps: [{ token: Galleria }, { token: i0.ChangeDetectorRef }, { token: i0.KeyValueDiffers }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: GalleriaContent, selector: "p-galleriaContent", inputs: { activeIndex: "activeIndex", value: "value", numVisible: "numVisible" }, outputs: { maskHide: "maskHide", activeItemChange: "activeItemChange" }, viewQueries: [{ propertyName: "closeButton", first: true, predicate: ["closeButton"], descendants: true }], ngImport: i0, template: `
        <div
            [attr.id]="id"
            *ngIf="value && value.length > 0"
            [ngClass]="{
                'p-galleria p-component': true,
                'p-galleria-fullscreen': this.galleria.fullScreen,
                'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem,
                'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen
            }"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}"
            [class]="galleriaClass()"
            pFocusTrap
        >
            <button *ngIf="galleria.fullScreen" type="button" class="p-galleria-close p-link" (click)="maskHide.emit()" pRipple [attr.aria-label]="closeAriaLabel()" [attr.data-pc-section]="'closebutton'">
                <TimesIcon *ngIf="!galleria.closeIconTemplate" [styleClass]="'p-galleria-close-icon'" />
                <ng-template *ngTemplateOutlet="galleria.closeIconTemplate"></ng-template>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="p-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="p-galleria-content" [attr.aria-live]="galleria.autoPlay ? 'polite' : 'off'">
                <p-galleriaItem
                    [id]="id"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [circular]="galleria.circular"
                    [templates]="galleria.templates"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [showIndicators]="galleria.showIndicators"
                    [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover"
                    [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet"
                    [showItemNavigators]="galleria.showItemNavigators"
                    [autoPlay]="galleria.autoPlay"
                    [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaItem>

                <p-galleriaThumbnails
                    *ngIf="galleria.showThumbnails"
                    [containerId]="id"
                    [value]="value"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [activeIndex]="activeIndex"
                    [templates]="galleria.templates"
                    [numVisible]="numVisible"
                    [responsiveOptions]="galleria.responsiveOptions"
                    [circular]="galleria.circular"
                    [isVertical]="isVertical()"
                    [contentHeight]="galleria.verticalThumbnailViewPortHeight"
                    [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="p-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return TimesIcon; }), selector: "TimesIcon" }, { kind: "directive", type: i0.forwardRef(function () { return i4.FocusTrap; }), selector: "[pFocusTrap]", inputs: ["pFocusTrapDisabled"] }, { kind: "component", type: i0.forwardRef(function () { return GalleriaItemSlot; }), selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }, { kind: "component", type: i0.forwardRef(function () { return GalleriaItem; }), selector: "p-galleriaItem", inputs: ["id", "circular", "value", "showItemNavigators", "showIndicators", "slideShowActive", "changeItemOnIndicatorHover", "autoPlay", "templates", "indicatorFacet", "captionFacet", "activeIndex"], outputs: ["startSlideShow", "stopSlideShow", "onActiveIndexChange"] }, { kind: "component", type: i0.forwardRef(function () { return GalleriaThumbnails; }), selector: "p-galleriaThumbnails", inputs: ["containerId", "value", "isVertical", "slideShowActive", "circular", "responsiveOptions", "contentHeight", "showThumbnailNavigators", "templates", "numVisible", "activeIndex"], outputs: ["onActiveIndexChange", "stopSlideShow"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { GalleriaContent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaContent',
                    template: `
        <div
            [attr.id]="id"
            *ngIf="value && value.length > 0"
            [ngClass]="{
                'p-galleria p-component': true,
                'p-galleria-fullscreen': this.galleria.fullScreen,
                'p-galleria-indicator-onitem': this.galleria.showIndicatorsOnItem,
                'p-galleria-item-nav-onhover': this.galleria.showItemNavigatorsOnHover && !this.galleria.fullScreen
            }"
            [ngStyle]="!galleria.fullScreen ? galleria.containerStyle : {}"
            [class]="galleriaClass()"
            pFocusTrap
        >
            <button *ngIf="galleria.fullScreen" type="button" class="p-galleria-close p-link" (click)="maskHide.emit()" pRipple [attr.aria-label]="closeAriaLabel()" [attr.data-pc-section]="'closebutton'">
                <TimesIcon *ngIf="!galleria.closeIconTemplate" [styleClass]="'p-galleria-close-icon'" />
                <ng-template *ngTemplateOutlet="galleria.closeIconTemplate"></ng-template>
            </button>
            <div *ngIf="galleria.templates && galleria.headerFacet" class="p-galleria-header">
                <p-galleriaItemSlot type="header" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
            <div class="p-galleria-content" [attr.aria-live]="galleria.autoPlay ? 'polite' : 'off'">
                <p-galleriaItem
                    [id]="id"
                    [value]="value"
                    [activeIndex]="activeIndex"
                    [circular]="galleria.circular"
                    [templates]="galleria.templates"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [showIndicators]="galleria.showIndicators"
                    [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover"
                    [indicatorFacet]="galleria.indicatorFacet"
                    [captionFacet]="galleria.captionFacet"
                    [showItemNavigators]="galleria.showItemNavigators"
                    [autoPlay]="galleria.autoPlay"
                    [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaItem>

                <p-galleriaThumbnails
                    *ngIf="galleria.showThumbnails"
                    [containerId]="id"
                    [value]="value"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [activeIndex]="activeIndex"
                    [templates]="galleria.templates"
                    [numVisible]="numVisible"
                    [responsiveOptions]="galleria.responsiveOptions"
                    [circular]="galleria.circular"
                    [isVertical]="isVertical()"
                    [contentHeight]="galleria.verticalThumbnailViewPortHeight"
                    [showThumbnailNavigators]="galleria.showThumbnailNavigators"
                    [slideShowActive]="slideShowActive"
                    (stopSlideShow)="stopSlideShow()"
                ></p-galleriaThumbnails>
            </div>
            <div *ngIf="galleria.templates && galleria.footerFacet" class="p-galleria-footer">
                <p-galleriaItemSlot type="footer" [templates]="galleria.templates"></p-galleriaItemSlot>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: Galleria }, { type: i0.ChangeDetectorRef }, { type: i0.KeyValueDiffers }, { type: i1.PrimeNGConfig }]; }, propDecorators: { activeIndex: [{
                type: Input
            }], value: [{
                type: Input
            }], numVisible: [{
                type: Input
            }], maskHide: [{
                type: Output
            }], activeItemChange: [{
                type: Output
            }], closeButton: [{
                type: ViewChild,
                args: ['closeButton']
            }] } });
class GalleriaItemSlot {
    templates;
    index;
    get item() {
        return this._item;
    }
    set item(item) {
        this._item = item;
        if (this.templates) {
            this.templates.forEach((item) => {
                if (item.getType() === this.type) {
                    switch (this.type) {
                        case 'item':
                        case 'caption':
                        case 'thumbnail':
                            this.context = { $implicit: this.item };
                            this.contentTemplate = item.template;
                            break;
                    }
                }
            });
        }
    }
    type;
    contentTemplate;
    context;
    _item;
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            if (item.getType() === this.type) {
                switch (this.type) {
                    case 'item':
                    case 'caption':
                    case 'thumbnail':
                        this.context = { $implicit: this.item };
                        this.contentTemplate = item.template;
                        break;
                    case 'indicator':
                        this.context = { $implicit: this.index };
                        this.contentTemplate = item.template;
                        break;
                    default:
                        this.context = {};
                        this.contentTemplate = item.template;
                        break;
                }
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaItemSlot, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: GalleriaItemSlot, selector: "p-galleriaItemSlot", inputs: { templates: "templates", index: "index", item: "item", type: "type" }, ngImport: i0, template: `
        <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { GalleriaItemSlot };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaItemSlot, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaItemSlot',
                    template: `
        <ng-container *ngIf="contentTemplate">
            <ng-container *ngTemplateOutlet="contentTemplate; context: context"></ng-container>
        </ng-container>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { templates: [{
                type: Input
            }], index: [{
                type: Input
            }], item: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
class GalleriaItem {
    galleria;
    id;
    circular = false;
    value;
    showItemNavigators = false;
    showIndicators = true;
    slideShowActive = true;
    changeItemOnIndicatorHover = true;
    autoPlay = false;
    templates;
    indicatorFacet;
    captionFacet;
    startSlideShow = new EventEmitter();
    stopSlideShow = new EventEmitter();
    onActiveIndexChange = new EventEmitter();
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._activeIndex = activeIndex;
    }
    get activeItem() {
        return this.value && this.value[this._activeIndex];
    }
    _activeIndex = 0;
    constructor(galleria) {
        this.galleria = galleria;
    }
    ngOnChanges({ autoPlay }) {
        if (autoPlay?.currentValue) {
            this.startSlideShow.emit();
        }
        if (autoPlay && autoPlay.currentValue === false) {
            this.stopTheSlideShow();
        }
    }
    next() {
        let nextItemIndex = this.activeIndex + 1;
        let activeIndex = this.circular && this.value.length - 1 === this.activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }
    prev() {
        let prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
        let activeIndex = this.circular && this.activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }
    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }
    navForward(e) {
        this.stopTheSlideShow();
        this.next();
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e) {
        this.stopTheSlideShow();
        this.prev();
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    onIndicatorClick(index) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }
    onIndicatorMouseEnter(index) {
        if (this.changeItemOnIndicatorHover) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        }
    }
    onIndicatorKeyDown(event, index) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.stopTheSlideShow();
                this.onActiveIndexChange.emit(index);
                event.preventDefault();
                break;
            case 'ArrowDown':
            case 'ArrowUp':
                event.preventDefault();
                break;
            default:
                break;
        }
    }
    isNavForwardDisabled() {
        return !this.circular && this.activeIndex === this.value.length - 1;
    }
    isNavBackwardDisabled() {
        return !this.circular && this.activeIndex === 0;
    }
    isIndicatorItemActive(index) {
        return this.activeIndex === index;
    }
    ariaSlideLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.slide : undefined;
    }
    ariaSlideNumber(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
    }
    ariaPageLabel(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaItem, deps: [{ token: Galleria }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: GalleriaItem, selector: "p-galleriaItem", inputs: { id: "id", circular: "circular", value: "value", showItemNavigators: "showItemNavigators", showIndicators: "showIndicators", slideShowActive: "slideShowActive", changeItemOnIndicatorHover: "changeItemOnIndicatorHover", autoPlay: "autoPlay", templates: "templates", indicatorFacet: "indicatorFacet", captionFacet: "captionFacet", activeIndex: "activeIndex" }, outputs: { startSlideShow: "startSlideShow", stopSlideShow: "stopSlideShow", onActiveIndexChange: "onActiveIndexChange" }, usesOnChanges: true, ngImport: i0, template: `
        <div class="p-galleria-item-wrapper">
            <div class="p-galleria-item-container">
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    role="navigation"
                    [ngClass]="{ 'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!galleria.itemPreviousIconTemplate" [styleClass]="'p-galleria-item-prev-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemPreviousIconTemplate"></ng-template>
                </button>
                <div [id]="id + '_item_' + activeIndex" role="group" [attr.aria-label]="ariaSlideNumber(activeIndex + 1)" [attr.aria-roledescription]="ariaSlideLabel()" [style.width]="'100%'">
                    <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="p-galleria-item"></p-galleriaItemSlot>
                </div>
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-item-next p-galleria-item-nav p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    role="navigation"
                >
                    <ChevronRightIcon *ngIf="!galleria.itemNextIconTemplate" [styleClass]="'p-galleria-item-next-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemNextIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-caption" *ngIf="captionFacet">
                    <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
                </div>
            </div>
            <ul *ngIf="showIndicators" class="p-galleria-indicators p-reset">
                <li
                    *ngFor="let item of value; let index = index"
                    tabindex="0"
                    (click)="onIndicatorClick(index)"
                    (mouseenter)="onIndicatorMouseEnter(index)"
                    (keydown)="onIndicatorKeyDown(event, index)"
                    [ngClass]="{ 'p-galleria-indicator': true, 'p-highlight': isIndicatorItemActive(index) }"
                    [attr.aria-label]="ariaPageLabel(index + 1)"
                    [attr.aria-selected]="activeIndex === index"
                    [attr.aria-controls]="id + '_item_' + index"
                >
                    <button type="button" tabIndex="-1" class="p-link" *ngIf="!indicatorFacet"></button>
                    <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
                </li>
            </ul>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return ChevronRightIcon; }), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(function () { return ChevronLeftIcon; }), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(function () { return GalleriaItemSlot; }), selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { GalleriaItem };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaItem, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaItem',
                    template: `
        <div class="p-galleria-item-wrapper">
            <div class="p-galleria-item-container">
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    role="navigation"
                    [ngClass]="{ 'p-galleria-item-prev p-galleria-item-nav p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!galleria.itemPreviousIconTemplate" [styleClass]="'p-galleria-item-prev-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemPreviousIconTemplate"></ng-template>
                </button>
                <div [id]="id + '_item_' + activeIndex" role="group" [attr.aria-label]="ariaSlideNumber(activeIndex + 1)" [attr.aria-roledescription]="ariaSlideLabel()" [style.width]="'100%'">
                    <p-galleriaItemSlot type="item" [item]="activeItem" [templates]="templates" class="p-galleria-item"></p-galleriaItemSlot>
                </div>
                <button
                    *ngIf="showItemNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-item-next p-galleria-item-nav p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    role="navigation"
                >
                    <ChevronRightIcon *ngIf="!galleria.itemNextIconTemplate" [styleClass]="'p-galleria-item-next-icon'" />
                    <ng-template *ngTemplateOutlet="galleria.itemNextIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-caption" *ngIf="captionFacet">
                    <p-galleriaItemSlot type="caption" [item]="activeItem" [templates]="templates"></p-galleriaItemSlot>
                </div>
            </div>
            <ul *ngIf="showIndicators" class="p-galleria-indicators p-reset">
                <li
                    *ngFor="let item of value; let index = index"
                    tabindex="0"
                    (click)="onIndicatorClick(index)"
                    (mouseenter)="onIndicatorMouseEnter(index)"
                    (keydown)="onIndicatorKeyDown(event, index)"
                    [ngClass]="{ 'p-galleria-indicator': true, 'p-highlight': isIndicatorItemActive(index) }"
                    [attr.aria-label]="ariaPageLabel(index + 1)"
                    [attr.aria-selected]="activeIndex === index"
                    [attr.aria-controls]="id + '_item_' + index"
                >
                    <button type="button" tabIndex="-1" class="p-link" *ngIf="!indicatorFacet"></button>
                    <p-galleriaItemSlot type="indicator" [index]="index" [templates]="templates"></p-galleriaItemSlot>
                </li>
            </ul>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: Galleria }]; }, propDecorators: { id: [{
                type: Input
            }], circular: [{
                type: Input
            }], value: [{
                type: Input
            }], showItemNavigators: [{
                type: Input
            }], showIndicators: [{
                type: Input
            }], slideShowActive: [{
                type: Input
            }], changeItemOnIndicatorHover: [{
                type: Input
            }], autoPlay: [{
                type: Input
            }], templates: [{
                type: Input
            }], indicatorFacet: [{
                type: Input
            }], captionFacet: [{
                type: Input
            }], startSlideShow: [{
                type: Output
            }], stopSlideShow: [{
                type: Output
            }], onActiveIndexChange: [{
                type: Output
            }], activeIndex: [{
                type: Input
            }] } });
class GalleriaThumbnails {
    galleria;
    document;
    platformId;
    renderer;
    cd;
    containerId;
    value;
    isVertical = false;
    slideShowActive = false;
    circular = false;
    responsiveOptions;
    contentHeight = '300px';
    showThumbnailNavigators = true;
    templates;
    onActiveIndexChange = new EventEmitter();
    stopSlideShow = new EventEmitter();
    itemsContainer;
    get numVisible() {
        return this._numVisible;
    }
    set numVisible(numVisible) {
        this._numVisible = numVisible;
        this._oldNumVisible = this.d_numVisible;
        this.d_numVisible = numVisible;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(activeIndex) {
        this._oldactiveIndex = this._activeIndex;
        this._activeIndex = activeIndex;
    }
    index;
    startPos = null;
    thumbnailsStyle = null;
    sortedResponsiveOptions = null;
    totalShiftedItems = 0;
    page = 0;
    documentResizeListener;
    _numVisible = 0;
    d_numVisible = 0;
    _oldNumVisible = 0;
    _activeIndex = 0;
    _oldactiveIndex = 0;
    constructor(galleria, document, platformId, renderer, cd) {
        this.galleria = galleria;
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
    }
    ngOnInit() {
        this.createStyle();
        if (this.responsiveOptions) {
            this.bindDocumentListeners();
        }
    }
    ngAfterContentChecked() {
        let totalShiftedItems = this.totalShiftedItems;
        if ((this._oldNumVisible !== this.d_numVisible || this._oldactiveIndex !== this._activeIndex) && this.itemsContainer) {
            if (this._activeIndex <= this.getMedianItemIndex()) {
                totalShiftedItems = 0;
            }
            else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this._activeIndex) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
            else if (this.value.length - this.d_numVisible < this._activeIndex && this.d_numVisible % 2 === 0) {
                totalShiftedItems = this._activeIndex * -1 + this.getMedianItemIndex() + 1;
            }
            else {
                totalShiftedItems = this._activeIndex * -1 + this.getMedianItemIndex();
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
            if (this.itemsContainer && this.itemsContainer.nativeElement) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            }
            if (this._oldactiveIndex !== this._activeIndex) {
                DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
                this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
            }
            this._oldactiveIndex = this._activeIndex;
            this._oldNumVisible = this.d_numVisible;
        }
    }
    ngAfterViewInit() {
        this.calculatePosition();
    }
    createStyle() {
        if (!this.thumbnailsStyle) {
            this.thumbnailsStyle = this.document.createElement('style');
            this.document.body.appendChild(this.thumbnailsStyle);
        }
        let innerHTML = `
            #${this.containerId} .p-galleria-thumbnail-item {
                flex: 1 0 ${100 / this.d_numVisible}%
            }
        `;
        if (this.responsiveOptions) {
            this.sortedResponsiveOptions = [...this.responsiveOptions];
            this.sortedResponsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
                return -1 * result;
            });
            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.containerId} .p-galleria-thumbnail-item {
                            flex: 1 0 ${100 / res.numVisible}%
                        }
                    }
                `;
            }
        }
        this.thumbnailsStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (this.itemsContainer && this.sortedResponsiveOptions) {
            let windowWidth = window.innerWidth;
            let matchedResponsiveData = {
                numVisible: this._numVisible
            };
            for (let i = 0; i < this.sortedResponsiveOptions.length; i++) {
                let res = this.sortedResponsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this.d_numVisible !== matchedResponsiveData.numVisible) {
                this.d_numVisible = matchedResponsiveData.numVisible;
                this.cd.markForCheck();
            }
        }
    }
    getTabIndex(index) {
        return this.isItemActive(index) ? 0 : null;
    }
    navForward(e) {
        this.stopTheSlideShow();
        let nextItemIndex = this._activeIndex + 1;
        if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.totalShiftedItems < this.getTotalPageNumber() - 1 || this.circular)) {
            this.step(-1);
        }
        let activeIndex = this.circular && this.value.length - 1 === this._activeIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e) {
        this.stopTheSlideShow();
        let prevItemIndex = this._activeIndex !== 0 ? this._activeIndex - 1 : 0;
        let diff = prevItemIndex + this.totalShiftedItems;
        if (this.d_numVisible - diff - 1 > this.getMedianItemIndex() && (-1 * this.totalShiftedItems !== 0 || this.circular)) {
            this.step(1);
        }
        let activeIndex = this.circular && this._activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onItemClick(index) {
        this.stopTheSlideShow();
        let selectedItemIndex = index;
        if (selectedItemIndex !== this._activeIndex) {
            const diff = selectedItemIndex + this.totalShiftedItems;
            let dir = 0;
            if (selectedItemIndex < this._activeIndex) {
                dir = this.d_numVisible - diff - 1 - this.getMedianItemIndex();
                if (dir > 0 && -1 * this.totalShiftedItems !== 0) {
                    this.step(dir);
                }
            }
            else {
                dir = this.getMedianItemIndex() - diff;
                if (dir < 0 && -1 * this.totalShiftedItems < this.getTotalPageNumber() - 1) {
                    this.step(dir);
                }
            }
            this.activeIndex = selectedItemIndex;
            this.onActiveIndexChange.emit(this.activeIndex);
        }
    }
    onThumbnailKeydown(event, index) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.onItemClick(index);
            event.preventDefault();
        }
        switch (event.code) {
            case 'ArrowRight':
                this.onRightKey();
                break;
            case 'ArrowLeft':
                this.onLeftKey();
                break;
            case 'Home':
                this.onHomeKey();
                event.preventDefault();
                break;
            case 'End':
                this.onEndKey();
                event.preventDefault();
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();
                break;
            case 'Tab':
                this.onTabKey();
                break;
            default:
                break;
        }
    }
    onRightKey() {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
    }
    onLeftKey() {
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
    }
    onHomeKey() {
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, 0);
    }
    onEndKey() {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');
        const activeIndex = this.findFocusedIndicatorIndex();
        this.changedFocusedIndicator(activeIndex, indicators.length - 1);
    }
    onTabKey() {
        const indicators = [...DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]')];
        const highlightedIndex = indicators.findIndex((ind) => DomHandler.getAttribute(ind, 'data-p-active') === true);
        const activeIndicator = DomHandler.findSingle(this.itemsContainer.nativeElement, '[tabindex="0"]');
        const activeIndex = indicators.findIndex((ind) => ind === activeIndicator.parentElement);
        indicators[activeIndex].children[0].tabIndex = '-1';
        indicators[highlightedIndex].children[0].tabIndex = '0';
    }
    findFocusedIndicatorIndex() {
        const indicators = [...DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]')];
        const activeIndicator = DomHandler.findSingle(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"] > [tabindex="0"]');
        return indicators.findIndex((ind) => ind === activeIndicator.parentElement);
    }
    changedFocusedIndicator(prevInd, nextInd) {
        const indicators = DomHandler.find(this.itemsContainer.nativeElement, '[data-pc-section="thumbnailitem"]');
        indicators[prevInd].children[0].tabIndex = '-1';
        indicators[nextInd].children[0].tabIndex = '0';
        indicators[nextInd].children[0].focus();
    }
    step(dir) {
        let totalShiftedItems = this.totalShiftedItems + dir;
        if (dir < 0 && -1 * totalShiftedItems + this.d_numVisible > this.value.length - 1) {
            totalShiftedItems = this.d_numVisible - this.value.length;
        }
        else if (dir > 0 && totalShiftedItems > 0) {
            totalShiftedItems = 0;
        }
        if (this.circular) {
            if (dir < 0 && this.value.length - 1 === this._activeIndex) {
                totalShiftedItems = 0;
            }
            else if (dir > 0 && this._activeIndex === 0) {
                totalShiftedItems = this.d_numVisible - this.value.length;
            }
        }
        if (this.itemsContainer) {
            DomHandler.removeClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transform = this.isVertical ? `translate3d(0, ${totalShiftedItems * (100 / this.d_numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this.d_numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
    }
    stopTheSlideShow() {
        if (this.slideShowActive && this.stopSlideShow) {
            this.stopSlideShow.emit();
        }
    }
    changePageOnTouch(e, diff) {
        if (diff < 0) {
            // left
            this.navForward(e);
        }
        else {
            // right
            this.navBackward(e);
        }
    }
    getTotalPageNumber() {
        return this.value.length > this.d_numVisible ? this.value.length - this.d_numVisible + 1 : 0;
    }
    getMedianItemIndex() {
        let index = Math.floor(this.d_numVisible / 2);
        return this.d_numVisible % 2 ? index : index - 1;
    }
    onTransitionEnd() {
        if (this.itemsContainer && this.itemsContainer.nativeElement) {
            DomHandler.addClass(this.itemsContainer.nativeElement, 'p-items-hidden');
            this.itemsContainer.nativeElement.style.transition = '';
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical) {
            this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
        }
        else {
            this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
        }
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    isNavBackwardDisabled() {
        return (!this.circular && this._activeIndex === 0) || this.value.length <= this.d_numVisible;
    }
    isNavForwardDisabled() {
        return (!this.circular && this._activeIndex === this.value.length - 1) || this.value.length <= this.d_numVisible;
    }
    firstItemAciveIndex() {
        return this.totalShiftedItems * -1;
    }
    lastItemActiveIndex() {
        return this.firstItemAciveIndex() + this.d_numVisible - 1;
    }
    isItemActive(index) {
        return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
    }
    bindDocumentListeners() {
        if (isPlatformBrowser(this.platformId)) {
            const window = this.document.defaultView || 'window';
            this.documentResizeListener = this.renderer.listen(window, 'resize', () => {
                this.calculatePosition();
            });
        }
    }
    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.thumbnailsStyle) {
            this.thumbnailsStyle.parentNode?.removeChild(this.thumbnailsStyle);
        }
    }
    ariaPrevButtonLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.prevPageLabel : undefined;
    }
    ariaNextButtonLabel() {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.nextPageLabel : undefined;
    }
    ariaPageLabel(value) {
        return this.galleria.config.translation.aria ? this.galleria.config.translation.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaThumbnails, deps: [{ token: Galleria }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: GalleriaThumbnails, selector: "p-galleriaThumbnails", inputs: { containerId: "containerId", value: "value", isVertical: "isVertical", slideShowActive: "slideShowActive", circular: "circular", responsiveOptions: "responsiveOptions", contentHeight: "contentHeight", showThumbnailNavigators: "showThumbnailNavigators", templates: "templates", numVisible: "numVisible", activeIndex: "activeIndex" }, outputs: { onActiveIndexChange: "onActiveIndexChange", stopSlideShow: "stopSlideShow" }, viewQueries: [{ propertyName: "itemsContainer", first: true, predicate: ["itemsContainer"], descendants: true }], ngImport: i0, template: `
        <div class="p-galleria-thumbnail-wrapper">
            <div class="p-galleria-thumbnail-container">
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaPrevButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.previousThumbnailIconTemplate">
                        <ChevronLeftIcon *ngIf="!isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                        <ChevronUpIcon *ngIf="isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.previousThumbnailIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-thumbnail-items-container" [ngStyle]="{ height: isVertical ? contentHeight : '' }">
                    <div #itemsContainer class="p-galleria-thumbnail-items" (transitionend)="onTransitionEnd()" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" role="tablist">
                        <div
                            *ngFor="let item of value; let index = index"
                            [ngClass]="{
                                'p-galleria-thumbnail-item': true,
                                'p-galleria-thumbnail-item-current': activeIndex === index,
                                'p-galleria-thumbnail-item-active': isItemActive(index),
                                'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index,
                                'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index
                            }"
                            [attr.aria-selected]="activeIndex === index"
                            [attr.aria-controls]="containerId + '_item_' + index"
                            [attr.data-pc-section]="'thumbnailitem'"
                            [attr.data-p-active]="activeIndex === index"
                            (keydown)="onThumbnailKeydown($event, index)"
                        >
                            <div
                                class="p-galleria-thumbnail-item-content"
                                [attr.tabindex]="activeIndex === index ? 0 : -1"
                                [attr.aria-current]="activeIndex === index ? 'page' : undefined"
                                [attr.aria-label]="ariaPageLabel(index + 1)"
                                (click)="onItemClick(index)"
                                (touchend)="onItemClick(index)"
                                (keydown.enter)="onItemClick(index)"
                            >
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaNextButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.nextThumbnailIconTemplate">
                        <ChevronRightIcon *ngIf="!isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                        <ChevronDownIcon *ngIf="isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.nextThumbnailIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return ChevronRightIcon; }), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(function () { return ChevronLeftIcon; }), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(function () { return GalleriaItemSlot; }), selector: "p-galleriaItemSlot", inputs: ["templates", "index", "item", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { GalleriaThumbnails };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaThumbnails, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-galleriaThumbnails',
                    template: `
        <div class="p-galleria-thumbnail-wrapper">
            <div class="p-galleria-thumbnail-container">
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-prev p-link': true, 'p-disabled': this.isNavBackwardDisabled() }"
                    (click)="navBackward($event)"
                    [disabled]="isNavBackwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaPrevButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.previousThumbnailIconTemplate">
                        <ChevronLeftIcon *ngIf="!isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                        <ChevronUpIcon *ngIf="isVertical" [styleClass]="'p-galleria-thumbnail-prev-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.previousThumbnailIconTemplate"></ng-template>
                </button>
                <div class="p-galleria-thumbnail-items-container" [ngStyle]="{ height: isVertical ? contentHeight : '' }">
                    <div #itemsContainer class="p-galleria-thumbnail-items" (transitionend)="onTransitionEnd()" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)" role="tablist">
                        <div
                            *ngFor="let item of value; let index = index"
                            [ngClass]="{
                                'p-galleria-thumbnail-item': true,
                                'p-galleria-thumbnail-item-current': activeIndex === index,
                                'p-galleria-thumbnail-item-active': isItemActive(index),
                                'p-galleria-thumbnail-item-start': firstItemAciveIndex() === index,
                                'p-galleria-thumbnail-item-end': lastItemActiveIndex() === index
                            }"
                            [attr.aria-selected]="activeIndex === index"
                            [attr.aria-controls]="containerId + '_item_' + index"
                            [attr.data-pc-section]="'thumbnailitem'"
                            [attr.data-p-active]="activeIndex === index"
                            (keydown)="onThumbnailKeydown($event, index)"
                        >
                            <div
                                class="p-galleria-thumbnail-item-content"
                                [attr.tabindex]="activeIndex === index ? 0 : -1"
                                [attr.aria-current]="activeIndex === index ? 'page' : undefined"
                                [attr.aria-label]="ariaPageLabel(index + 1)"
                                (click)="onItemClick(index)"
                                (touchend)="onItemClick(index)"
                                (keydown.enter)="onItemClick(index)"
                            >
                                <p-galleriaItemSlot type="thumbnail" [item]="item" [templates]="templates"></p-galleriaItemSlot>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    *ngIf="showThumbnailNavigators"
                    type="button"
                    [ngClass]="{ 'p-galleria-thumbnail-next p-link': true, 'p-disabled': this.isNavForwardDisabled() }"
                    (click)="navForward($event)"
                    [disabled]="isNavForwardDisabled()"
                    pRipple
                    [attr.aria-label]="ariaNextButtonLabel()"
                >
                    <ng-container *ngIf="!galleria.nextThumbnailIconTemplate">
                        <ChevronRightIcon *ngIf="!isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                        <ChevronDownIcon *ngIf="isVertical" [ngClass]="'p-galleria-thumbnail-next-icon'" />
                    </ng-container>
                    <ng-template *ngTemplateOutlet="galleria.nextThumbnailIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: Galleria }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { containerId: [{
                type: Input
            }], value: [{
                type: Input
            }], isVertical: [{
                type: Input
            }], slideShowActive: [{
                type: Input
            }], circular: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], contentHeight: [{
                type: Input
            }], showThumbnailNavigators: [{
                type: Input
            }], templates: [{
                type: Input
            }], onActiveIndexChange: [{
                type: Output
            }], stopSlideShow: [{
                type: Output
            }], itemsContainer: [{
                type: ViewChild,
                args: ['itemsContainer']
            }], numVisible: [{
                type: Input
            }], activeIndex: [{
                type: Input
            }] } });
class GalleriaModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: GalleriaModule, declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails], imports: [CommonModule, SharedModule, RippleModule, TimesIcon, ChevronRightIcon, ChevronLeftIcon, WindowMaximizeIcon, WindowMinimizeIcon, FocusTrapModule], exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaModule, imports: [CommonModule, SharedModule, RippleModule, TimesIcon, ChevronRightIcon, ChevronLeftIcon, WindowMaximizeIcon, WindowMinimizeIcon, FocusTrapModule, CommonModule, SharedModule] });
}
export { GalleriaModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: GalleriaModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule, TimesIcon, ChevronRightIcon, ChevronLeftIcon, WindowMaximizeIcon, WindowMinimizeIcon, FocusTrapModule],
                    exports: [CommonModule, Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails, SharedModule],
                    declarations: [Galleria, GalleriaContent, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZ2FsbGVyaWEvZ2FsbGVyaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVFLE9BQU8sRUFHSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFHZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBSVIsTUFBTSxFQUNOLFdBQVcsRUFLWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBaUIsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFDcEQ7OztHQUdHO0FBQ0gsTUE0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LEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFDL0ksWUFBWSxFQUFpRixZQUFZOztTQUcxRyxjQUFjOzJGQUFkLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLENBQUM7b0JBQzFKLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxZQUFZLENBQUM7b0JBQ3BILFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixDQUFDO2lCQUNoRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaW1hdGlvbkV2ZW50LCBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEb0NoZWNrLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBLZXlWYWx1ZURpZmZlcnMsXG4gICAgTmdNb2R1bGUsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgQ2hldnJvbkxlZnRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9ubGVmdCc7XG5pbXBvcnQgeyBDaGV2cm9uUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGV2cm9ucmlnaHQnO1xuaW1wb3J0IHsgVGltZXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lcyc7XG5pbXBvcnQgeyBXaW5kb3dNYXhpbWl6ZUljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3dpbmRvd21heGltaXplJztcbmltcG9ydCB7IFdpbmRvd01pbmltaXplSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvd2luZG93bWluaW1pemUnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkLCBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgR2FsbGVyaWFSZXNwb25zaXZlT3B0aW9ucyB9IGZyb20gJy4vZ2FsbGVyaWEuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvY3VzVHJhcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZm9jdXN0cmFwJztcbi8qKlxuICogR2FsbGVyaWEgaXMgYW4gYWR2YW5jZWQgY29udGVudCBnYWxsZXJ5IGNvbXBvbmVudC5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1nYWxsZXJpYScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAqbmdJZj1cImZ1bGxTY3JlZW47IGVsc2Ugd2luZG93ZWRcIiAjY29udGFpbmVyPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICpuZ0lmPVwibWFza1Zpc2libGVcIlxuICAgICAgICAgICAgICAgICNtYXNrXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1nYWxsZXJpYS1tYXNrIHAtY29tcG9uZW50LW92ZXJsYXkgcC1jb21wb25lbnQtb3ZlcmxheS1lbnRlcic6IHRydWUsICdwLWdhbGxlcmlhLXZpc2libGUnOiB0aGlzLnZpc2libGUgfVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cIm1hc2tDbGFzc1wiXG4gICAgICAgICAgICAgICAgW2F0dHIucm9sZV09XCJmdWxsU2NyZWVuID8gJ2RpYWxvZycgOiAncmVnaW9uJ1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1tb2RhbF09XCJmdWxsU2NyZWVuID8gJ3RydWUnIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cC1nYWxsZXJpYUNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgW0BhbmltYXRpb25dPVwieyB2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHsgc2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9ucyB9IH1cIlxuICAgICAgICAgICAgICAgICAgICAoQGFuaW1hdGlvbi5zdGFydCk9XCJvbkFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoQGFuaW1hdGlvbi5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICBbYWN0aXZlSW5kZXhdPVwiYWN0aXZlSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbbnVtVmlzaWJsZV09XCJudW1WaXNpYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgKG1hc2tIaWRlKT1cIm9uTWFza0hpZGUoKVwiXG4gICAgICAgICAgICAgICAgICAgIChhY3RpdmVJdGVtQ2hhbmdlKT1cIm9uQWN0aXZlSXRlbUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiY29udGFpbmVyU3R5bGVcIlxuICAgICAgICAgICAgICAgID48L3AtZ2FsbGVyaWFDb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjd2luZG93ZWQ+XG4gICAgICAgICAgICA8cC1nYWxsZXJpYUNvbnRlbnQgW3ZhbHVlXT1cInZhbHVlXCIgW2FjdGl2ZUluZGV4XT1cImFjdGl2ZUluZGV4XCIgW251bVZpc2libGVdPVwibnVtVmlzaWJsZVwiIChhY3RpdmVJdGVtQ2hhbmdlKT1cIm9uQWN0aXZlSXRlbUNoYW5nZSgkZXZlbnQpXCI+PC9wLWdhbGxlcmlhQ29udGVudD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignYW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgW3N0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMC43KScsIG9wYWNpdHk6IDAgfSksIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBbYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgwLjcpJywgb3BhY2l0eTogMCB9KSldKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9nYWxsZXJpYS5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWEgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZUluZGV4KGFjdGl2ZUluZGV4KSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSB0aGUgY29tcG9uZW50IG9uIGZ1bGxzY3JlZW4uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZnVsbFNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBkaXNwbGF5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnlbXSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbnVtVmlzaWJsZTogbnVtYmVyID0gMztcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBvcHRpb25zIGZvciByZXNwb25zaXZlIGRlc2lnbi5cbiAgICAgKiBAc2VlIHtHYWxsZXJpYVJlc3BvbnNpdmVPcHRpb25zfVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlc3BvbnNpdmVPcHRpb25zOiBHYWxsZXJpYVJlc3BvbnNpdmVPcHRpb25zW10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IG5hdmlnYXRpb24gYnV0dG9ucyBpbiBpdGVtIHNlY3Rpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0l0ZW1OYXZpZ2F0b3JzOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IG5hdmlnYXRpb24gYnV0dG9ucyBpbiB0aHVtYm5haWwgY29udGFpbmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dUaHVtYm5haWxOYXZpZ2F0b3JzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgbmF2aWdhdGlvbiBidXR0b25zIG9uIGl0ZW0gaG92ZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0l0ZW1OYXZpZ2F0b3JzT25Ib3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgaXRlbSBpcyBjaGFuZ2VkIG9uIGluZGljYXRvciBob3Zlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjaGFuZ2VJdGVtT25JbmRpY2F0b3JIb3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgc2Nyb2xsaW5nIHdvdWxkIGJlIGluZmluaXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNpcmN1bGFyOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogSXRlbXMgYXJlIGRpc3BsYXllZCB3aXRoIGEgc2xpZGVzaG93IGluIGF1dG9QbGF5IG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXV0b1BsYXk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGF1dG9ydW4gc2hvdWxkIHN0b3AgYnkgY2xpY2suXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvdWxkU3RvcEF1dG9wbGF5QnlDbGljazogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gc2Nyb2xsIGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25JbnRlcnZhbDogbnVtYmVyID0gNDAwMDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgdGh1bWJuYWlsIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VGh1bWJuYWlsczogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgdGh1bWJuYWlscy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0aHVtYm5haWxzUG9zaXRpb246ICdib3R0b20nIHwgJ3RvcCcgfCAnbGVmdCcgfCAncmlnaHQnIHwgdW5kZWZpbmVkID0gJ2JvdHRvbSc7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiB2ZXJ0aWNhbCB0aHVtYm5haWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmVydGljYWxUaHVtYm5haWxWaWV3UG9ydEhlaWdodDogc3RyaW5nID0gJzMwMHB4JztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgaW5kaWNhdG9yIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93SW5kaWNhdG9yczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgaW5kaWNhdG9yIGNvbnRhaW5lciBpcyBkaXNwbGF5ZWQgb24gaXRlbSBjb250YWluZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0luZGljYXRvcnNPbkl0ZW06IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiBpbmRpY2F0b3JzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGluZGljYXRvcnNQb3NpdGlvbjogJ2JvdHRvbScgfCAndG9wJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCB1bmRlZmluZWQgPSAnYm90dG9tJztcbiAgICAvKipcbiAgICAgKiBCYXNlIHpJbmRleCB2YWx1ZSB0byB1c2UgaW4gbGF5ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgbWFzayBvbiBmdWxsc2NyZWVuIG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWFza0NsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudCBvbiBmdWxsc2NyZWVuIG1vZGUuIE90aGVyd2lzZSwgdGhlICdjbGFzcycgcHJvcGVydHkgY2FuIGJlIHVzZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29udGFpbmVyQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudCBvbiBmdWxsc2NyZWVuIG1vZGUuIE90aGVyd2lzZSwgdGhlICdzdHlsZScgcHJvcGVydHkgY2FuIGJlIHVzZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29udGFpbmVyU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBzaG93IGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG4gICAgLyoqXG4gICAgICogVHJhbnNpdGlvbiBvcHRpb25zIG9mIHRoZSBoaWRlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtYXNrIG9uIGZ1bGxzY3JlZW4gbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfVxuICAgIHNldCB2aXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZpc2libGU7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUgJiYgIXRoaXMubWFza1Zpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMubWFza1Zpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBhY3RpdmUgaW5kZXggY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSBBY3RpdmUgaW5kZXguXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIGFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiB2aXNpYmxpdHkgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYm9vbGVhbiAtIFZpc2libGUgdmFsdWUuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ21hc2snKSBtYXNrOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIF92aXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfYWN0aXZlSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBoZWFkZXJGYWNldDogYW55O1xuXG4gICAgZm9vdGVyRmFjZXQ6IGFueTtcblxuICAgIGluZGljYXRvckZhY2V0OiBhbnk7XG5cbiAgICBjYXB0aW9uRmFjZXQ6IGFueTtcblxuICAgIGNsb3NlSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcHJldmlvdXNUaHVtYm5haWxJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBuZXh0VGh1bWJuYWlsSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaXRlbVByZXZpb3VzSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaXRlbU5leHRJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBtYXNrVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcz8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyRmFjZXQgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyRmFjZXQgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2luZGljYXRvcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yRmFjZXQgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Nsb3NlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW1uZXh0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbU5leHRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW1wcmV2aW91c2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1QcmV2aW91c0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncHJldmlvdXN0aHVtYm5haWxpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1RodW1ibmFpbEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbmV4dHRodW1ibmFpbGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRUaHVtYm5haWxJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhcHRpb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcHRpb25GYWNldCA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2VzLnZhbHVlICYmIHNpbXBsZUNoYW5nZXMudmFsdWUuY3VycmVudFZhbHVlPy5sZW5ndGggPCB0aGlzLm51bVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMubnVtVmlzaWJsZSA9IHNpbXBsZUNoYW5nZXMudmFsdWUuY3VycmVudFZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTWFza0hpZGUoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgfVxuXG4gICAgb25BY3RpdmVJdGVtQ2hhbmdlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXMoRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiY2xvc2VidXR0b25cIl0nKSk7XG4gICAgICAgICAgICAgICAgfSwgMjUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMubWFzaz8ubmF0aXZlRWxlbWVudCwgJ3AtY29tcG9uZW50LW92ZXJsYXktbGVhdmUnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVNb2RhbGl0eSgpIHtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLnNldCgnbW9kYWwnLCB0aGlzLm1hc2submF0aXZlRWxlbWVudCwgdGhpcy5iYXNlWkluZGV4IHx8IHRoaXMuY29uZmlnLnpJbmRleC5tb2RhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMubWFzay5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5mdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tYXNrKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZ2FsbGVyaWFDb250ZW50JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBbYXR0ci5pZF09XCJpZFwiXG4gICAgICAgICAgICAqbmdJZj1cInZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDBcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICAgICAgICdwLWdhbGxlcmlhIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAncC1nYWxsZXJpYS1mdWxsc2NyZWVuJzogdGhpcy5nYWxsZXJpYS5mdWxsU2NyZWVuLFxuICAgICAgICAgICAgICAgICdwLWdhbGxlcmlhLWluZGljYXRvci1vbml0ZW0nOiB0aGlzLmdhbGxlcmlhLnNob3dJbmRpY2F0b3JzT25JdGVtLFxuICAgICAgICAgICAgICAgICdwLWdhbGxlcmlhLWl0ZW0tbmF2LW9uaG92ZXInOiB0aGlzLmdhbGxlcmlhLnNob3dJdGVtTmF2aWdhdG9yc09uSG92ZXIgJiYgIXRoaXMuZ2FsbGVyaWEuZnVsbFNjcmVlblxuICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICBbbmdTdHlsZV09XCIhZ2FsbGVyaWEuZnVsbFNjcmVlbiA/IGdhbGxlcmlhLmNvbnRhaW5lclN0eWxlIDoge31cIlxuICAgICAgICAgICAgW2NsYXNzXT1cImdhbGxlcmlhQ2xhc3MoKVwiXG4gICAgICAgICAgICBwRm9jdXNUcmFwXG4gICAgICAgID5cbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJnYWxsZXJpYS5mdWxsU2NyZWVuXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwicC1nYWxsZXJpYS1jbG9zZSBwLWxpbmtcIiAoY2xpY2spPVwibWFza0hpZGUuZW1pdCgpXCIgcFJpcHBsZSBbYXR0ci5hcmlhLWxhYmVsXT1cImNsb3NlQXJpYUxhYmVsKClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2Nsb3NlYnV0dG9uJ1wiPlxuICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gKm5nSWY9XCIhZ2FsbGVyaWEuY2xvc2VJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1nYWxsZXJpYS1jbG9zZS1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZ2FsbGVyaWEuY2xvc2VJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZ2FsbGVyaWEudGVtcGxhdGVzICYmIGdhbGxlcmlhLmhlYWRlckZhY2V0XCIgY2xhc3M9XCJwLWdhbGxlcmlhLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbVNsb3QgdHlwZT1cImhlYWRlclwiIFt0ZW1wbGF0ZXNdPVwiZ2FsbGVyaWEudGVtcGxhdGVzXCI+PC9wLWdhbGxlcmlhSXRlbVNsb3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWdhbGxlcmlhLWNvbnRlbnRcIiBbYXR0ci5hcmlhLWxpdmVdPVwiZ2FsbGVyaWEuYXV0b1BsYXkgPyAncG9saXRlJyA6ICdvZmYnXCI+XG4gICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFJdGVtXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCJpZFwiXG4gICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIFthY3RpdmVJbmRleF09XCJhY3RpdmVJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFtjaXJjdWxhcl09XCJnYWxsZXJpYS5jaXJjdWxhclwiXG4gICAgICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwiZ2FsbGVyaWEudGVtcGxhdGVzXCJcbiAgICAgICAgICAgICAgICAgICAgKG9uQWN0aXZlSW5kZXhDaGFuZ2UpPVwib25BY3RpdmVJbmRleENoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dJbmRpY2F0b3JzXT1cImdhbGxlcmlhLnNob3dJbmRpY2F0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgW2NoYW5nZUl0ZW1PbkluZGljYXRvckhvdmVyXT1cImdhbGxlcmlhLmNoYW5nZUl0ZW1PbkluZGljYXRvckhvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgW2luZGljYXRvckZhY2V0XT1cImdhbGxlcmlhLmluZGljYXRvckZhY2V0XCJcbiAgICAgICAgICAgICAgICAgICAgW2NhcHRpb25GYWNldF09XCJnYWxsZXJpYS5jYXB0aW9uRmFjZXRcIlxuICAgICAgICAgICAgICAgICAgICBbc2hvd0l0ZW1OYXZpZ2F0b3JzXT1cImdhbGxlcmlhLnNob3dJdGVtTmF2aWdhdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgIFthdXRvUGxheV09XCJnYWxsZXJpYS5hdXRvUGxheVwiXG4gICAgICAgICAgICAgICAgICAgIFtzbGlkZVNob3dBY3RpdmVdPVwic2xpZGVTaG93QWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgKHN0YXJ0U2xpZGVTaG93KT1cInN0YXJ0U2xpZGVTaG93KClcIlxuICAgICAgICAgICAgICAgICAgICAoc3RvcFNsaWRlU2hvdyk9XCJzdG9wU2xpZGVTaG93KClcIlxuICAgICAgICAgICAgICAgID48L3AtZ2FsbGVyaWFJdGVtPlxuXG4gICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFUaHVtYm5haWxzXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2FsbGVyaWEuc2hvd1RodW1ibmFpbHNcIlxuICAgICAgICAgICAgICAgICAgICBbY29udGFpbmVySWRdPVwiaWRcIlxuICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAob25BY3RpdmVJbmRleENoYW5nZSk9XCJvbkFjdGl2ZUluZGV4Q2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbYWN0aXZlSW5kZXhdPVwiYWN0aXZlSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbdGVtcGxhdGVzXT1cImdhbGxlcmlhLnRlbXBsYXRlc1wiXG4gICAgICAgICAgICAgICAgICAgIFtudW1WaXNpYmxlXT1cIm51bVZpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICBbcmVzcG9uc2l2ZU9wdGlvbnNdPVwiZ2FsbGVyaWEucmVzcG9uc2l2ZU9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICBbY2lyY3VsYXJdPVwiZ2FsbGVyaWEuY2lyY3VsYXJcIlxuICAgICAgICAgICAgICAgICAgICBbaXNWZXJ0aWNhbF09XCJpc1ZlcnRpY2FsKClcIlxuICAgICAgICAgICAgICAgICAgICBbY29udGVudEhlaWdodF09XCJnYWxsZXJpYS52ZXJ0aWNhbFRodW1ibmFpbFZpZXdQb3J0SGVpZ2h0XCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dUaHVtYm5haWxOYXZpZ2F0b3JzXT1cImdhbGxlcmlhLnNob3dUaHVtYm5haWxOYXZpZ2F0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgW3NsaWRlU2hvd0FjdGl2ZV09XCJzbGlkZVNob3dBY3RpdmVcIlxuICAgICAgICAgICAgICAgICAgICAoc3RvcFNsaWRlU2hvdyk9XCJzdG9wU2xpZGVTaG93KClcIlxuICAgICAgICAgICAgICAgID48L3AtZ2FsbGVyaWFUaHVtYm5haWxzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZ2FsbGVyaWEudGVtcGxhdGVzICYmIGdhbGxlcmlhLmZvb3RlckZhY2V0XCIgY2xhc3M9XCJwLWdhbGxlcmlhLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbVNsb3QgdHlwZT1cImZvb3RlclwiIFt0ZW1wbGF0ZXNdPVwiZ2FsbGVyaWEudGVtcGxhdGVzXCI+PC9wLWdhbGxlcmlhSXRlbVNsb3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJpYUNvbnRlbnQgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgICBASW5wdXQoKSBnZXQgYWN0aXZlSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUluZGV4O1xuICAgIH1cbiAgICBzZXQgYWN0aXZlSW5kZXgoYWN0aXZlSW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4O1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnlbXSA9IFtdO1xuXG4gICAgQElucHV0KCkgbnVtVmlzaWJsZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQE91dHB1dCgpIG1hc2tIaWRlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgYWN0aXZlSXRlbUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdjbG9zZUJ1dHRvbicpIGNsb3NlQnV0dG9uOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgaWQ6IHN0cmluZztcblxuICAgIF9hY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHNsaWRlU2hvd0FjdGl2ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBpbnRlcnZhbDogYW55O1xuXG4gICAgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJpdmF0ZSBkaWZmZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYWxsZXJpYTogR2FsbGVyaWEsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLCBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLmdhbGxlcmlhLmlkIHx8IFVuaXF1ZUNvbXBvbmVudElkKCk7XG4gICAgICAgIHRoaXMuZGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5nYWxsZXJpYSkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLmdhbGxlcmlhIGFzIHVua25vd24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pO1xuXG4gICAgICAgIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZm9yRWFjaEl0ZW0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gQmVjYXVzZSB3ZSBjaGFuZ2UgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHBhcmVudCBjb21wb25lbnQsXG4gICAgICAgICAgICAvLyBhbmQgdGhlIGNoaWxkcmVuIHRha2Ugb3VyIGVudGl0eSBmcm9tIHRoZSBpbmplY3Rvci5cbiAgICAgICAgICAgIC8vIFdlIGNhbiB0ZWxsIHRoZSBjaGlsZHJlbiB0byByZWRyYXcgdGhlbXNlbHZlcyB3aGVuIHdlIGNoYW5nZSB0aGUgcHJvcGVydGllcyBvZiB0aGUgcGFyZW50IGNvbXBvbmVudC5cbiAgICAgICAgICAgIC8vIFNpbmNlIHdlIGhhdmUgYW4gb25QdXNoIHN0cmF0ZWd5XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2FsbGVyaWFDbGFzcygpIHtcbiAgICAgICAgY29uc3QgdGh1bWJuYWlsc1Bvc0NsYXNzID0gdGhpcy5nYWxsZXJpYS5zaG93VGh1bWJuYWlscyAmJiB0aGlzLmdldFBvc2l0aW9uQ2xhc3MoJ3AtZ2FsbGVyaWEtdGh1bWJuYWlscycsIHRoaXMuZ2FsbGVyaWEudGh1bWJuYWlsc1Bvc2l0aW9uIGFzIHN0cmluZyk7XG4gICAgICAgIGNvbnN0IGluZGljYXRvclBvc0NsYXNzID0gdGhpcy5nYWxsZXJpYS5zaG93SW5kaWNhdG9ycyAmJiB0aGlzLmdldFBvc2l0aW9uQ2xhc3MoJ3AtZ2FsbGVyaWEtaW5kaWNhdG9ycycsIHRoaXMuZ2FsbGVyaWEuaW5kaWNhdG9yc1Bvc2l0aW9uIGFzIHN0cmluZyk7XG5cbiAgICAgICAgcmV0dXJuICh0aGlzLmdhbGxlcmlhLmNvbnRhaW5lckNsYXNzID8gdGhpcy5nYWxsZXJpYS5jb250YWluZXJDbGFzcyArICcgJyA6ICcnKSArICh0aHVtYm5haWxzUG9zQ2xhc3MgPyB0aHVtYm5haWxzUG9zQ2xhc3MgKyAnICcgOiAnJykgKyAoaW5kaWNhdG9yUG9zQ2xhc3MgPyBpbmRpY2F0b3JQb3NDbGFzcyArICcgJyA6ICcnKTtcbiAgICB9XG5cbiAgICBzdGFydFNsaWRlU2hvdygpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBhY3RpdmVJbmRleCA9IHRoaXMuZ2FsbGVyaWEuY2lyY3VsYXIgJiYgdGhpcy52YWx1ZS5sZW5ndGggLSAxID09PSB0aGlzLmFjdGl2ZUluZGV4ID8gMCA6IHRoaXMuYWN0aXZlSW5kZXggKyAxO1xuICAgICAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlKGFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgICAgICAgfSwgdGhpcy5nYWxsZXJpYS50cmFuc2l0aW9uSW50ZXJ2YWwpO1xuXG4gICAgICAgIHRoaXMuc2xpZGVTaG93QWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdG9wU2xpZGVTaG93KCkge1xuICAgICAgICBpZiAodGhpcy5nYWxsZXJpYS5hdXRvUGxheSAmJiAhdGhpcy5nYWxsZXJpYS5zaG91bGRTdG9wQXV0b3BsYXlCeUNsaWNrKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVTaG93QWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0UG9zaXRpb25DbGFzcyhwcmVDbGFzc05hbWU6IHN0cmluZywgcG9zaXRpb246IHN0cmluZykge1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbJ3RvcCcsICdsZWZ0JywgJ2JvdHRvbScsICdyaWdodCddO1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbnMuZmluZCgoaXRlbSkgPT4gaXRlbSA9PT0gcG9zaXRpb24pO1xuXG4gICAgICAgIHJldHVybiBwb3MgPyBgJHtwcmVDbGFzc05hbWV9LSR7cG9zfWAgOiAnJztcbiAgICB9XG5cbiAgICBpc1ZlcnRpY2FsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS50aHVtYm5haWxzUG9zaXRpb24gPT09ICdsZWZ0JyB8fCB0aGlzLmdhbGxlcmlhLnRodW1ibmFpbHNQb3NpdGlvbiA9PT0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICBvbkFjdGl2ZUluZGV4Q2hhbmdlKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW1DaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuY2xvc2UgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZ2FsbGVyaWFJdGVtU2xvdCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRlbnRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZTsgY29udGV4dDogY29udGV4dFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcmlhSXRlbVNsb3Qge1xuICAgIEBJbnB1dCgpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGdldCBpdGVtKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtO1xuICAgIH1cblxuICAgIHNldCBpdGVtKGl0ZW06IGFueSkge1xuICAgICAgICB0aGlzLl9pdGVtID0gaXRlbTtcbiAgICAgICAgaWYgKHRoaXMudGVtcGxhdGVzKSB7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0VHlwZSgpID09PSB0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2FwdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd0aHVtYm5haWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHsgJGltcGxpY2l0OiB0aGlzLml0ZW0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRleHQ6IGFueTtcblxuICAgIF9pdGVtOiBhbnk7XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5nZXRUeXBlKCkgPT09IHRoaXMudHlwZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdjYXB0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndGh1bWJuYWlsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHsgJGltcGxpY2l0OiB0aGlzLml0ZW0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2luZGljYXRvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQgPSB7ICRpbXBsaWNpdDogdGhpcy5pbmRleCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1nYWxsZXJpYUl0ZW0nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWdhbGxlcmlhLWl0ZW0td3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtaXRlbS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0l0ZW1OYXZpZ2F0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJuYXZpZ2F0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1nYWxsZXJpYS1pdGVtLXByZXYgcC1nYWxsZXJpYS1pdGVtLW5hdiBwLWxpbmsnOiB0cnVlLCAncC1kaXNhYmxlZCc6IHRoaXMuaXNOYXZCYWNrd2FyZERpc2FibGVkKCkgfVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJuYXZCYWNrd2FyZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzTmF2QmFja3dhcmREaXNhYmxlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPENoZXZyb25MZWZ0SWNvbiAqbmdJZj1cIiFnYWxsZXJpYS5pdGVtUHJldmlvdXNJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1nYWxsZXJpYS1pdGVtLXByZXYtaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJnYWxsZXJpYS5pdGVtUHJldmlvdXNJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgW2lkXT1cImlkICsgJ19pdGVtXycgKyBhY3RpdmVJbmRleFwiIHJvbGU9XCJncm91cFwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVNsaWRlTnVtYmVyKGFjdGl2ZUluZGV4ICsgMSlcIiBbYXR0ci5hcmlhLXJvbGVkZXNjcmlwdGlvbl09XCJhcmlhU2xpZGVMYWJlbCgpXCIgW3N0eWxlLndpZHRoXT1cIicxMDAlJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8cC1nYWxsZXJpYUl0ZW1TbG90IHR5cGU9XCJpdGVtXCIgW2l0ZW1dPVwiYWN0aXZlSXRlbVwiIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCIgY2xhc3M9XCJwLWdhbGxlcmlhLWl0ZW1cIj48L3AtZ2FsbGVyaWFJdGVtU2xvdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0l0ZW1OYXZpZ2F0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZ2FsbGVyaWEtaXRlbS1uZXh0IHAtZ2FsbGVyaWEtaXRlbS1uYXYgcC1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzTmF2Rm9yd2FyZERpc2FibGVkKCkgfVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNOYXZGb3J3YXJkRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm5hdmlnYXRpb25cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodEljb24gKm5nSWY9XCIhZ2FsbGVyaWEuaXRlbU5leHRJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1nYWxsZXJpYS1pdGVtLW5leHQtaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJnYWxsZXJpYS5pdGVtTmV4dEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtY2FwdGlvblwiICpuZ0lmPVwiY2FwdGlvbkZhY2V0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbVNsb3QgdHlwZT1cImNhcHRpb25cIiBbaXRlbV09XCJhY3RpdmVJdGVtXCIgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIj48L3AtZ2FsbGVyaWFJdGVtU2xvdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHVsICpuZ0lmPVwic2hvd0luZGljYXRvcnNcIiBjbGFzcz1cInAtZ2FsbGVyaWEtaW5kaWNhdG9ycyBwLXJlc2V0XCI+XG4gICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHZhbHVlOyBsZXQgaW5kZXggPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkluZGljYXRvckNsaWNrKGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cIm9uSW5kaWNhdG9yTW91c2VFbnRlcihpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkluZGljYXRvcktleURvd24oZXZlbnQsIGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZ2FsbGVyaWEtaW5kaWNhdG9yJzogdHJ1ZSwgJ3AtaGlnaGxpZ2h0JzogaXNJbmRpY2F0b3JJdGVtQWN0aXZlKGluZGV4KSB9XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhUGFnZUxhYmVsKGluZGV4ICsgMSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImFjdGl2ZUluZGV4ID09PSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiaWQgKyAnX2l0ZW1fJyArIGluZGV4XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRhYkluZGV4PVwiLTFcIiBjbGFzcz1cInAtbGlua1wiICpuZ0lmPVwiIWluZGljYXRvckZhY2V0XCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxwLWdhbGxlcmlhSXRlbVNsb3QgdHlwZT1cImluZGljYXRvclwiIFtpbmRleF09XCJpbmRleFwiIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCI+PC9wLWdhbGxlcmlhSXRlbVNsb3Q+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFJdGVtIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgY2lyY3VsYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnlbXSB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHNob3dJdGVtTmF2aWdhdG9yczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2hvd0luZGljYXRvcnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2xpZGVTaG93QWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGNoYW5nZUl0ZW1PbkluZGljYXRvckhvdmVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGF1dG9QbGF5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGluZGljYXRvckZhY2V0OiBhbnk7XG5cbiAgICBASW5wdXQoKSBjYXB0aW9uRmFjZXQ6IGFueTtcblxuICAgIEBPdXRwdXQoKSBzdGFydFNsaWRlU2hvdzogRXZlbnRFbWl0dGVyPEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBzdG9wU2xpZGVTaG93OiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlSW5kZXgoYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlSXRlbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZVt0aGlzLl9hY3RpdmVJbmRleF07XG4gICAgfVxuXG4gICAgX2FjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGdhbGxlcmlhOiBHYWxsZXJpYSkge31cblxuICAgIG5nT25DaGFuZ2VzKHsgYXV0b1BsYXkgfTogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoYXV0b1BsYXk/LmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFNsaWRlU2hvdy5lbWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXV0b1BsYXkgJiYgYXV0b1BsYXkuY3VycmVudFZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wVGhlU2xpZGVTaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICBsZXQgbmV4dEl0ZW1JbmRleCA9IHRoaXMuYWN0aXZlSW5kZXggKyAxO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gMSA9PT0gdGhpcy5hY3RpdmVJbmRleCA/IDAgOiBuZXh0SXRlbUluZGV4O1xuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChhY3RpdmVJbmRleCk7XG4gICAgfVxuXG4gICAgcHJldigpIHtcbiAgICAgICAgbGV0IHByZXZJdGVtSW5kZXggPSB0aGlzLmFjdGl2ZUluZGV4ICE9PSAwID8gdGhpcy5hY3RpdmVJbmRleCAtIDEgOiAwO1xuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmIHRoaXMuYWN0aXZlSW5kZXggPT09IDAgPyAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIDEgOiBwcmV2SXRlbUluZGV4O1xuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChhY3RpdmVJbmRleCk7XG4gICAgfVxuXG4gICAgc3RvcFRoZVNsaWRlU2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVTaG93QWN0aXZlICYmIHRoaXMuc3RvcFNsaWRlU2hvdykge1xuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVTaG93LmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5hdkZvcndhcmQoZTogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG5cbiAgICAgICAgaWYgKGUgJiYgZS5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZCYWNrd2FyZChlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuICAgICAgICB0aGlzLnByZXYoKTtcblxuICAgICAgICBpZiAoZSAmJiBlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5kaWNhdG9yQ2xpY2soaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgIH1cblxuICAgIG9uSW5kaWNhdG9yTW91c2VFbnRlcihpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNoYW5nZUl0ZW1PbkluZGljYXRvckhvdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgICAgIHRoaXMub25BY3RpdmVJbmRleENoYW5nZS5lbWl0KGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5kaWNhdG9yS2V5RG93bihldmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BUaGVTbGlkZVNob3coKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpbmRleCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc05hdkZvcndhcmREaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNpcmN1bGFyICYmIHRoaXMuYWN0aXZlSW5kZXggPT09ICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICBpc05hdkJhY2t3YXJkRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jaXJjdWxhciAmJiB0aGlzLmFjdGl2ZUluZGV4ID09PSAwO1xuICAgIH1cblxuICAgIGlzSW5kaWNhdG9ySXRlbUFjdGl2ZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUluZGV4ID09PSBpbmRleDtcbiAgICB9XG5cbiAgICBhcmlhU2xpZGVMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEgPyB0aGlzLmdhbGxlcmlhLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnNsaWRlIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGFyaWFTbGlkZU51bWJlcih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuc2xpZGVOdW1iZXIucmVwbGFjZSgve3NsaWRlTnVtYmVyfS9nLCB2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgYXJpYVBhZ2VMYWJlbCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEucGFnZUxhYmVsLnJlcGxhY2UoL3twYWdlfS9nLCB2YWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZ2FsbGVyaWFUaHVtYm5haWxzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZ2FsbGVyaWEtdGh1bWJuYWlsLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93VGh1bWJuYWlsTmF2aWdhdG9yc1wiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWdhbGxlcmlhLXRodW1ibmFpbC1wcmV2IHAtbGluayc6IHRydWUsICdwLWRpc2FibGVkJzogdGhpcy5pc05hdkJhY2t3YXJkRGlzYWJsZWQoKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNOYXZCYWNrd2FyZERpc2FibGVkKClcIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVByZXZCdXR0b25MYWJlbCgpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZ2FsbGVyaWEucHJldmlvdXNUaHVtYm5haWxJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gKm5nSWY9XCIhaXNWZXJ0aWNhbFwiIFtzdHlsZUNsYXNzXT1cIidwLWdhbGxlcmlhLXRodW1ibmFpbC1wcmV2LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uVXBJY29uICpuZ0lmPVwiaXNWZXJ0aWNhbFwiIFtzdHlsZUNsYXNzXT1cIidwLWdhbGxlcmlhLXRodW1ibmFpbC1wcmV2LWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImdhbGxlcmlhLnByZXZpb3VzVGh1bWJuYWlsSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbXMtY29udGFpbmVyXCIgW25nU3R5bGVdPVwieyBoZWlnaHQ6IGlzVmVydGljYWwgPyBjb250ZW50SGVpZ2h0IDogJycgfVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNpdGVtc0NvbnRhaW5lciBjbGFzcz1cInAtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW1zXCIgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIiAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdmFsdWU7IGxldCBpbmRleCA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwLWdhbGxlcmlhLXRodW1ibmFpbC1pdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0tY3VycmVudCc6IGFjdGl2ZUluZGV4ID09PSBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0tYWN0aXZlJzogaXNJdGVtQWN0aXZlKGluZGV4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0tc3RhcnQnOiBmaXJzdEl0ZW1BY2l2ZUluZGV4KCkgPT09IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbS1lbmQnOiBsYXN0SXRlbUFjdGl2ZUluZGV4KCkgPT09IGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJhY3RpdmVJbmRleCA9PT0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiY29udGFpbmVySWQgKyAnX2l0ZW1fJyArIGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3RodW1ibmFpbGl0ZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtYWN0aXZlXT1cImFjdGl2ZUluZGV4ID09PSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25UaHVtYm5haWxLZXlkb3duKCRldmVudCwgaW5kZXgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1nYWxsZXJpYS10aHVtYm5haWwtaXRlbS1jb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiYWN0aXZlSW5kZXggPT09IGluZGV4ID8gMCA6IC0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jdXJyZW50XT1cImFjdGl2ZUluZGV4ID09PSBpbmRleCA/ICdwYWdlJyA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVBhZ2VMYWJlbChpbmRleCArIDEpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKGluZGV4KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3VjaGVuZCk9XCJvbkl0ZW1DbGljayhpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJvbkl0ZW1DbGljayhpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtZ2FsbGVyaWFJdGVtU2xvdCB0eXBlPVwidGh1bWJuYWlsXCIgW2l0ZW1dPVwiaXRlbVwiIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCI+PC9wLWdhbGxlcmlhSXRlbVNsb3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInNob3dUaHVtYm5haWxOYXZpZ2F0b3JzXCJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLW5leHQgcC1saW5rJzogdHJ1ZSwgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzTmF2Rm9yd2FyZERpc2FibGVkKCkgfVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNOYXZGb3J3YXJkRGlzYWJsZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTmV4dEJ1dHRvbkxhYmVsKClcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFnYWxsZXJpYS5uZXh0VGh1bWJuYWlsSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFpc1ZlcnRpY2FsXCIgW25nQ2xhc3NdPVwiJ3AtZ2FsbGVyaWEtdGh1bWJuYWlsLW5leHQtaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cImlzVmVydGljYWxcIiBbbmdDbGFzc109XCIncC1nYWxsZXJpYS10aHVtYm5haWwtbmV4dC1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJnYWxsZXJpYS5uZXh0VGh1bWJuYWlsSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcmlhVGh1bWJuYWlscyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBjb250YWluZXJJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgaXNWZXJ0aWNhbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgc2xpZGVTaG93QWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBjaXJjdWxhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgcmVzcG9uc2l2ZU9wdGlvbnM6IEdhbGxlcmlhUmVzcG9uc2l2ZU9wdGlvbnNbXSB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGNvbnRlbnRIZWlnaHQ6IHN0cmluZyA9ICczMDBweCc7XG5cbiAgICBASW5wdXQoKSBzaG93VGh1bWJuYWlsTmF2aWdhdG9ycyA9IHRydWU7XG5cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBPdXRwdXQoKSBvbkFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBzdG9wU2xpZGVTaG93OiBFdmVudEVtaXR0ZXI8RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaXRlbXNDb250YWluZXInKSBpdGVtc0NvbnRhaW5lcjogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGdldCBudW1WaXNpYmxlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xuICAgIH1cblxuICAgIHNldCBudW1WaXNpYmxlKG51bVZpc2libGUpIHtcbiAgICAgICAgdGhpcy5fbnVtVmlzaWJsZSA9IG51bVZpc2libGU7XG4gICAgICAgIHRoaXMuX29sZE51bVZpc2libGUgPSB0aGlzLmRfbnVtVmlzaWJsZTtcbiAgICAgICAgdGhpcy5kX251bVZpc2libGUgPSBudW1WaXNpYmxlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IGFjdGl2ZUluZGV4KGFjdGl2ZUluZGV4KSB7XG4gICAgICAgIHRoaXMuX29sZGFjdGl2ZUluZGV4ID0gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIHN0YXJ0UG9zOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCBudWxsID0gbnVsbDtcblxuICAgIHRodW1ibmFpbHNTdHlsZTogSFRNTFN0eWxlRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gICAgc29ydGVkUmVzcG9uc2l2ZU9wdGlvbnM6IEdhbGxlcmlhUmVzcG9uc2l2ZU9wdGlvbnNbXSB8IG51bGwgPSBudWxsO1xuXG4gICAgdG90YWxTaGlmdGVkSXRlbXM6IG51bWJlciA9IDA7XG5cbiAgICBwYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgX251bVZpc2libGU6IG51bWJlciA9IDA7XG5cbiAgICBkX251bVZpc2libGU6IG51bWJlciA9IDA7XG5cbiAgICBfb2xkTnVtVmlzaWJsZTogbnVtYmVyID0gMDtcblxuICAgIF9hY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIF9vbGRhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBnYWxsZXJpYTogR2FsbGVyaWEsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50TGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgICAgIGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IHRoaXMudG90YWxTaGlmdGVkSXRlbXM7XG5cbiAgICAgICAgaWYgKCh0aGlzLl9vbGROdW1WaXNpYmxlICE9PSB0aGlzLmRfbnVtVmlzaWJsZSB8fCB0aGlzLl9vbGRhY3RpdmVJbmRleCAhPT0gdGhpcy5fYWN0aXZlSW5kZXgpICYmIHRoaXMuaXRlbXNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbmRleCA8PSB0aGlzLmdldE1lZGlhbkl0ZW1JbmRleCgpKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIHRoaXMuZF9udW1WaXNpYmxlICsgdGhpcy5nZXRNZWRpYW5JdGVtSW5kZXgoKSA8IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLmRfbnVtVmlzaWJsZSAtICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIHRoaXMuZF9udW1WaXNpYmxlIDwgdGhpcy5fYWN0aXZlSW5kZXggJiYgdGhpcy5kX251bVZpc2libGUgJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLl9hY3RpdmVJbmRleCAqIC0xICsgdGhpcy5nZXRNZWRpYW5JdGVtSW5kZXgoKSArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5fYWN0aXZlSW5kZXggKiAtMSArIHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b3RhbFNoaWZ0ZWRJdGVtcyAhPT0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNDb250YWluZXIgJiYgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCA/IGB0cmFuc2xhdGUzZCgwLCAke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMCAvIHRoaXMuZF9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAgLyB0aGlzLmRfbnVtVmlzaWJsZSl9JSwgMCwgMClgO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fb2xkYWN0aXZlSW5kZXggIT09IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdwLWl0ZW1zLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSA1MDBtcyBlYXNlIDBzJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fb2xkYWN0aXZlSW5kZXggPSB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICAgICAgICAgIHRoaXMuX29sZE51bVZpc2libGUgPSB0aGlzLmRfbnVtVmlzaWJsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIGNyZWF0ZVN0eWxlKCkge1xuICAgICAgICBpZiAoIXRoaXMudGh1bWJuYWlsc1N0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLnRodW1ibmFpbHNTdHlsZSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnRodW1ibmFpbHNTdHlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgIyR7dGhpcy5jb250YWluZXJJZH0gLnAtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0ge1xuICAgICAgICAgICAgICAgIGZsZXg6IDEgMCAkezEwMCAvIHRoaXMuZF9udW1WaXNpYmxlfSVcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcblxuICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zb3J0ZWRSZXNwb25zaXZlT3B0aW9ucyA9IFsuLi50aGlzLnJlc3BvbnNpdmVPcHRpb25zXTtcbiAgICAgICAgICAgIHRoaXMuc29ydGVkUmVzcG9uc2l2ZU9wdGlvbnMuc29ydCgoZGF0YTEsIGRhdGEyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUxID0gZGF0YTEuYnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZTIgPSBkYXRhMi5icmVha3BvaW50O1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKSByZXN1bHQgPSAtMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZTEgIT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbCkgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbCkgcmVzdWx0ID0gMDtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUyID09PSAnc3RyaW5nJykgcmVzdWx0ID0gdmFsdWUxLmxvY2FsZUNvbXBhcmUodmFsdWUyLCB1bmRlZmluZWQsIHsgbnVtZXJpYzogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICBlbHNlIHJlc3VsdCA9IHZhbHVlMSA8IHZhbHVlMiA/IC0xIDogdmFsdWUxID4gdmFsdWUyID8gMSA6IDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gLTEgKiByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvcnRlZFJlc3BvbnNpdmVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMuc29ydGVkUmVzcG9uc2l2ZU9wdGlvbnNbaV07XG5cbiAgICAgICAgICAgICAgICBpbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3Jlcy5icmVha3BvaW50fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIyR7dGhpcy5jb250YWluZXJJZH0gLnAtZ2FsbGVyaWEtdGh1bWJuYWlsLWl0ZW0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEgMCAkezEwMCAvIHJlcy5udW1WaXNpYmxlfSVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRodW1ibmFpbHNTdHlsZS5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlUG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zQ29udGFpbmVyICYmIHRoaXMuc29ydGVkUmVzcG9uc2l2ZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgbGV0IG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBudW1WaXNpYmxlOiB0aGlzLl9udW1WaXNpYmxlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc29ydGVkUmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5zb3J0ZWRSZXNwb25zaXZlT3B0aW9uc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChyZXMuYnJlYWtwb2ludCwgMTApID49IHdpbmRvd1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHJlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRfbnVtVmlzaWJsZSAhPT0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRfbnVtVmlzaWJsZSA9IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUYWJJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzSXRlbUFjdGl2ZShpbmRleCkgPyAwIDogbnVsbDtcbiAgICB9XG5cbiAgICBuYXZGb3J3YXJkKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RvcFRoZVNsaWRlU2hvdygpO1xuXG4gICAgICAgIGxldCBuZXh0SXRlbUluZGV4ID0gdGhpcy5fYWN0aXZlSW5kZXggKyAxO1xuICAgICAgICBpZiAobmV4dEl0ZW1JbmRleCArIHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPiB0aGlzLmdldE1lZGlhbkl0ZW1JbmRleCgpICYmICgtMSAqIHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPCB0aGlzLmdldFRvdGFsUGFnZU51bWJlcigpIC0gMSB8fCB0aGlzLmNpcmN1bGFyKSkge1xuICAgICAgICAgICAgdGhpcy5zdGVwKC0xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhY3RpdmVJbmRleCA9IHRoaXMuY2lyY3VsYXIgJiYgKDxhbnlbXT50aGlzLnZhbHVlKS5sZW5ndGggLSAxID09PSB0aGlzLl9hY3RpdmVJbmRleCA/IDAgOiBuZXh0SXRlbUluZGV4O1xuICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChhY3RpdmVJbmRleCk7XG5cbiAgICAgICAgaWYgKGUuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmF2QmFja3dhcmQoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zdG9wVGhlU2xpZGVTaG93KCk7XG5cbiAgICAgICAgbGV0IHByZXZJdGVtSW5kZXggPSB0aGlzLl9hY3RpdmVJbmRleCAhPT0gMCA/IHRoaXMuX2FjdGl2ZUluZGV4IC0gMSA6IDA7XG4gICAgICAgIGxldCBkaWZmID0gcHJldkl0ZW1JbmRleCArIHRoaXMudG90YWxTaGlmdGVkSXRlbXM7XG4gICAgICAgIGlmICh0aGlzLmRfbnVtVmlzaWJsZSAtIGRpZmYgLSAxID4gdGhpcy5nZXRNZWRpYW5JdGVtSW5kZXgoKSAmJiAoLTEgKiB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICE9PSAwIHx8IHRoaXMuY2lyY3VsYXIpKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXAoMSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLmNpcmN1bGFyICYmIHRoaXMuX2FjdGl2ZUluZGV4ID09PSAwID8gKDxhbnlbXT50aGlzLnZhbHVlKS5sZW5ndGggLSAxIDogcHJldkl0ZW1JbmRleDtcbiAgICAgICAgdGhpcy5vbkFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoYWN0aXZlSW5kZXgpO1xuXG4gICAgICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zdG9wVGhlU2xpZGVTaG93KCk7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4ID0gaW5kZXg7XG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPT0gdGhpcy5fYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBzZWxlY3RlZEl0ZW1JbmRleCArIHRoaXMudG90YWxTaGlmdGVkSXRlbXM7XG4gICAgICAgICAgICBsZXQgZGlyID0gMDtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCA8IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgZGlyID0gdGhpcy5kX251bVZpc2libGUgLSBkaWZmIC0gMSAtIHRoaXMuZ2V0TWVkaWFuSXRlbUluZGV4KCk7XG4gICAgICAgICAgICAgICAgaWYgKGRpciA+IDAgJiYgLTEgKiB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcChkaXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyID0gdGhpcy5nZXRNZWRpYW5JdGVtSW5kZXgoKSAtIGRpZmY7XG4gICAgICAgICAgICAgICAgaWYgKGRpciA8IDAgJiYgLTEgKiB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zIDwgdGhpcy5nZXRUb3RhbFBhZ2VOdW1iZXIoKSAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwKGRpcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gc2VsZWN0ZWRJdGVtSW5kZXg7XG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZlSW5kZXhDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGh1bWJuYWlsS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ0VudGVyJyB8fCBldmVudC5jb2RlID09PSAnU3BhY2UnKSB7XG4gICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKGluZGV4KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25SaWdodEtleSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25MZWZ0S2V5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Ib21lS2V5KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uRW5kS2V5KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYktleSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25SaWdodEtleSgpIHtcbiAgICAgICAgY29uc3QgaW5kaWNhdG9ycyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwidGh1bWJuYWlsaXRlbVwiXScpO1xuICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuZmluZEZvY3VzZWRJbmRpY2F0b3JJbmRleCgpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlZEZvY3VzZWRJbmRpY2F0b3IoYWN0aXZlSW5kZXgsIGFjdGl2ZUluZGV4ICsgMSA9PT0gaW5kaWNhdG9ycy5sZW5ndGggPyBpbmRpY2F0b3JzLmxlbmd0aCAtIDEgOiBhY3RpdmVJbmRleCArIDEpO1xuICAgIH1cblxuICAgIG9uTGVmdEtleSgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmZpbmRGb2N1c2VkSW5kaWNhdG9ySW5kZXgoKTtcblxuICAgICAgICB0aGlzLmNoYW5nZWRGb2N1c2VkSW5kaWNhdG9yKGFjdGl2ZUluZGV4LCBhY3RpdmVJbmRleCAtIDEgPD0gMCA/IDAgOiBhY3RpdmVJbmRleCAtIDEpO1xuICAgIH1cblxuICAgIG9uSG9tZUtleSgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmZpbmRGb2N1c2VkSW5kaWNhdG9ySW5kZXgoKTtcblxuICAgICAgICB0aGlzLmNoYW5nZWRGb2N1c2VkSW5kaWNhdG9yKGFjdGl2ZUluZGV4LCAwKTtcbiAgICB9XG5cbiAgICBvbkVuZEtleSgpIHtcbiAgICAgICAgY29uc3QgaW5kaWNhdG9ycyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwidGh1bWJuYWlsaXRlbVwiXScpO1xuICAgICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHRoaXMuZmluZEZvY3VzZWRJbmRpY2F0b3JJbmRleCgpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlZEZvY3VzZWRJbmRpY2F0b3IoYWN0aXZlSW5kZXgsIGluZGljYXRvcnMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgb25UYWJLZXkoKSB7XG4gICAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBbLi4uRG9tSGFuZGxlci5maW5kKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJ0aHVtYm5haWxpdGVtXCJdJyldO1xuICAgICAgICBjb25zdCBoaWdobGlnaHRlZEluZGV4ID0gaW5kaWNhdG9ycy5maW5kSW5kZXgoKGluZCkgPT4gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaW5kLCAnZGF0YS1wLWFjdGl2ZScpID09PSB0cnVlKTtcblxuICAgICAgICBjb25zdCBhY3RpdmVJbmRpY2F0b3IgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnW3RhYmluZGV4PVwiMFwiXScpO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gaW5kaWNhdG9ycy5maW5kSW5kZXgoKGluZCkgPT4gaW5kID09PSBhY3RpdmVJbmRpY2F0b3IucGFyZW50RWxlbWVudCk7XG5cbiAgICAgICAgaW5kaWNhdG9yc1thY3RpdmVJbmRleF0uY2hpbGRyZW5bMF0udGFiSW5kZXggPSAnLTEnO1xuICAgICAgICBpbmRpY2F0b3JzW2hpZ2hsaWdodGVkSW5kZXhdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJzAnO1xuICAgIH1cblxuICAgIGZpbmRGb2N1c2VkSW5kaWNhdG9ySW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IGluZGljYXRvcnMgPSBbLi4uRG9tSGFuZGxlci5maW5kKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJ0aHVtYm5haWxpdGVtXCJdJyldO1xuICAgICAgICBjb25zdCBhY3RpdmVJbmRpY2F0b3IgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cInRodW1ibmFpbGl0ZW1cIl0gPiBbdGFiaW5kZXg9XCIwXCJdJyk7XG5cbiAgICAgICAgcmV0dXJuIGluZGljYXRvcnMuZmluZEluZGV4KChpbmQpID0+IGluZCA9PT0gYWN0aXZlSW5kaWNhdG9yLnBhcmVudEVsZW1lbnQpO1xuICAgIH1cblxuICAgIGNoYW5nZWRGb2N1c2VkSW5kaWNhdG9yKHByZXZJbmQsIG5leHRJbmQpIHtcbiAgICAgICAgY29uc3QgaW5kaWNhdG9ycyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwidGh1bWJuYWlsaXRlbVwiXScpO1xuXG4gICAgICAgIGluZGljYXRvcnNbcHJldkluZF0uY2hpbGRyZW5bMF0udGFiSW5kZXggPSAnLTEnO1xuICAgICAgICBpbmRpY2F0b3JzW25leHRJbmRdLmNoaWxkcmVuWzBdLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICBpbmRpY2F0b3JzW25leHRJbmRdLmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgc3RlcChkaXI6IG51bWJlcikge1xuICAgICAgICBsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICsgZGlyO1xuXG4gICAgICAgIGlmIChkaXIgPCAwICYmIC0xICogdG90YWxTaGlmdGVkSXRlbXMgKyB0aGlzLmRfbnVtVmlzaWJsZSA+ICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLmRfbnVtVmlzaWJsZSAtICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKGRpciA+IDAgJiYgdG90YWxTaGlmdGVkSXRlbXMgPiAwKSB7XG4gICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jaXJjdWxhcikge1xuICAgICAgICAgICAgaWYgKGRpciA8IDAgJiYgKDxhbnlbXT50aGlzLnZhbHVlKS5sZW5ndGggLSAxID09PSB0aGlzLl9hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyID4gMCAmJiB0aGlzLl9hY3RpdmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gdGhpcy5kX251bVZpc2libGUgLSAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLml0ZW1zQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCwgJ3AtaXRlbXMtaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwIC8gdGhpcy5kX251bVZpc2libGUpfSUsIDApYCA6IGB0cmFuc2xhdGUzZCgke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMCAvIHRoaXMuZF9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XG4gICAgICAgICAgICB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gNTAwbXMgZWFzZSAwcyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG4gICAgfVxuXG4gICAgc3RvcFRoZVNsaWRlU2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVTaG93QWN0aXZlICYmIHRoaXMuc3RvcFNsaWRlU2hvdykge1xuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVTaG93LmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VPblRvdWNoKGU6IFRvdWNoRXZlbnQsIGRpZmY6IG51bWJlcikge1xuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIC8vIGxlZnRcbiAgICAgICAgICAgIHRoaXMubmF2Rm9yd2FyZChlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHJpZ2h0XG4gICAgICAgICAgICB0aGlzLm5hdkJhY2t3YXJkKGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VG90YWxQYWdlTnVtYmVyKCkge1xuICAgICAgICByZXR1cm4gKDxhbnlbXT50aGlzLnZhbHVlKS5sZW5ndGggPiB0aGlzLmRfbnVtVmlzaWJsZSA/ICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIC0gdGhpcy5kX251bVZpc2libGUgKyAxIDogMDtcbiAgICB9XG5cbiAgICBnZXRNZWRpYW5JdGVtSW5kZXgoKSB7XG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IodGhpcy5kX251bVZpc2libGUgLyAyKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5kX251bVZpc2libGUgJSAyID8gaW5kZXggOiBpbmRleCAtIDE7XG4gICAgfVxuXG4gICAgb25UcmFuc2l0aW9uRW5kKCkge1xuICAgICAgICBpZiAodGhpcy5pdGVtc0NvbnRhaW5lciAmJiB0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LCAncC1pdGVtcy1oaWRkZW4nKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoRW5kKGU6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblxuICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2VPblRvdWNoKGUsIHRvdWNob2JqLnBhZ2VZIC0gKDx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+dGhpcy5zdGFydFBvcykueSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2VPblRvdWNoKGUsIHRvdWNob2JqLnBhZ2VYIC0gKDx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+dGhpcy5zdGFydFBvcykueCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoTW92ZShlOiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hTdGFydChlOiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICAgICAgdGhpcy5zdGFydFBvcyA9IHtcbiAgICAgICAgICAgIHg6IHRvdWNob2JqLnBhZ2VYLFxuICAgICAgICAgICAgeTogdG91Y2hvYmoucGFnZVlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpc05hdkJhY2t3YXJkRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAoIXRoaXMuY2lyY3VsYXIgJiYgdGhpcy5fYWN0aXZlSW5kZXggPT09IDApIHx8ICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIDw9IHRoaXMuZF9udW1WaXNpYmxlO1xuICAgIH1cblxuICAgIGlzTmF2Rm9yd2FyZERpc2FibGVkKCkge1xuICAgICAgICByZXR1cm4gKCF0aGlzLmNpcmN1bGFyICYmIHRoaXMuX2FjdGl2ZUluZGV4ID09PSAoPGFueVtdPnRoaXMudmFsdWUpLmxlbmd0aCAtIDEpIHx8ICg8YW55W10+dGhpcy52YWx1ZSkubGVuZ3RoIDw9IHRoaXMuZF9udW1WaXNpYmxlO1xuICAgIH1cblxuICAgIGZpcnN0SXRlbUFjaXZlSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogLTE7XG4gICAgfVxuXG4gICAgbGFzdEl0ZW1BY3RpdmVJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3RJdGVtQWNpdmVJbmRleCgpICsgdGhpcy5kX251bVZpc2libGUgLSAxO1xuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpcnN0SXRlbUFjaXZlSW5kZXgoKSA8PSBpbmRleCAmJiB0aGlzLmxhc3RJdGVtQWN0aXZlSW5kZXgoKSA+PSBpbmRleDtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IHx8ICd3aW5kb3cnO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4od2luZG93LCAncmVzaXplJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudExpc3RlbmVycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGh1bWJuYWlsc1N0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLnRodW1ibmFpbHNTdHlsZS5wYXJlbnROb2RlPy5yZW1vdmVDaGlsZCh0aGlzLnRodW1ibmFpbHNTdHlsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcmlhUHJldkJ1dHRvbkxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEucHJldlBhZ2VMYWJlbCA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBhcmlhTmV4dEJ1dHRvbkxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYWxsZXJpYS5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/IHRoaXMuZ2FsbGVyaWEuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEubmV4dFBhZ2VMYWJlbCA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBhcmlhUGFnZUxhYmVsKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbGxlcmlhLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gdGhpcy5nYWxsZXJpYS5jb25maWcudHJhbnNsYXRpb24uYXJpYS5wYWdlTGFiZWwucmVwbGFjZSgve3BhZ2V9L2csIHZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFRpbWVzSWNvbiwgQ2hldnJvblJpZ2h0SWNvbiwgQ2hldnJvbkxlZnRJY29uLCBXaW5kb3dNYXhpbWl6ZUljb24sIFdpbmRvd01pbmltaXplSWNvbiwgRm9jdXNUcmFwTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBHYWxsZXJpYSwgR2FsbGVyaWFDb250ZW50LCBHYWxsZXJpYUl0ZW1TbG90LCBHYWxsZXJpYUl0ZW0sIEdhbGxlcmlhVGh1bWJuYWlscywgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtHYWxsZXJpYSwgR2FsbGVyaWFDb250ZW50LCBHYWxsZXJpYUl0ZW1TbG90LCBHYWxsZXJpYUl0ZW0sIEdhbGxlcmlhVGh1bWJuYWlsc11cbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWFNb2R1bGUge31cbiJdfQ==