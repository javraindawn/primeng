import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { ObjectUtils, ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
export const OVERLAY_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Overlay),
    multi: true
};
const showOverlayContentAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{showTransitionParams}}')]);
const hideOverlayContentAnimation = animation([animate('{{hideTransitionParams}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * This API allows overlay components to be controlled from the PrimeNGConfig. In this way, all overlay components in the application can have the same behavior.
 * @group Components
 */
class Overlay {
    document;
    platformId;
    el;
    renderer;
    config;
    overlayService;
    zone;
    /**
     * The visible property is an input that determines the visibility of the component.
     * @defaultValue false
     * @group Props
     */
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible && !this.modalVisible) {
            this.modalVisible = true;
        }
    }
    /**
     * The mode property is an input that determines the overlay mode type or string.
     * @defaultValue null
     * @group Props
     */
    get mode() {
        return this._mode || this.overlayOptions?.mode;
    }
    set mode(value) {
        this._mode = value;
    }
    /**
     * The style property is an input that determines the style object for the component.
     * @defaultValue null
     * @group Props
     */
    get style() {
        return ObjectUtils.merge(this._style, this.modal ? this.overlayResponsiveOptions?.style : this.overlayOptions?.style);
    }
    set style(value) {
        this._style = value;
    }
    /**
     * The styleClass property is an input that determines the CSS class(es) for the component.
     * @defaultValue null
     * @group Props
     */
    get styleClass() {
        return ObjectUtils.merge(this._styleClass, this.modal ? this.overlayResponsiveOptions?.styleClass : this.overlayOptions?.styleClass);
    }
    set styleClass(value) {
        this._styleClass = value;
    }
    /**
     * The contentStyle property is an input that determines the style object for the content of the component.
     * @defaultValue null
     * @group Props
     */
    get contentStyle() {
        return ObjectUtils.merge(this._contentStyle, this.modal ? this.overlayResponsiveOptions?.contentStyle : this.overlayOptions?.contentStyle);
    }
    set contentStyle(value) {
        this._contentStyle = value;
    }
    /**
     * The contentStyleClass property is an input that determines the CSS class(es) for the content of the component.
     * @defaultValue null
     * @group Props
     */
    get contentStyleClass() {
        return ObjectUtils.merge(this._contentStyleClass, this.modal ? this.overlayResponsiveOptions?.contentStyleClass : this.overlayOptions?.contentStyleClass);
    }
    set contentStyleClass(value) {
        this._contentStyleClass = value;
    }
    /**
     * The target property is an input that specifies the target element or selector for the component.
     * @defaultValue null
     * @group Props
     */
    get target() {
        const value = this._target || this.overlayOptions?.target;
        return value === undefined ? '@prev' : value;
    }
    set target(value) {
        this._target = value;
    }
    /**
     * Overlay can be mounted into its location, body or DOM element instance using this option.
     * @defaultValue null
     * @group Props
     */
    get appendTo() {
        return this._appendTo || this.overlayOptions?.appendTo;
    }
    set appendTo(value) {
        this._appendTo = value;
    }
    /**
     * The autoZIndex determines whether to automatically manage layering. Its default value is 'false'.
     * @defaultValue false
     * @group Props
     */
    get autoZIndex() {
        const value = this._autoZIndex || this.overlayOptions?.autoZIndex;
        return value === undefined ? true : value;
    }
    set autoZIndex(value) {
        this._autoZIndex = value;
    }
    /**
     * The baseZIndex is base zIndex value to use in layering.
     * @defaultValue null
     * @group Props
     */
    get baseZIndex() {
        const value = this._baseZIndex || this.overlayOptions?.baseZIndex;
        return value === undefined ? 0 : value;
    }
    set baseZIndex(value) {
        this._baseZIndex = value;
    }
    /**
     * Transition options of the show or hide animation.
     * @defaultValue .12s cubic-bezier(0, 0, 0.2, 1)
     * @group Props
     */
    get showTransitionOptions() {
        const value = this._showTransitionOptions || this.overlayOptions?.showTransitionOptions;
        return value === undefined ? '.12s cubic-bezier(0, 0, 0.2, 1)' : value;
    }
    set showTransitionOptions(value) {
        this._showTransitionOptions = value;
    }
    /**
     * The hideTransitionOptions property is an input that determines the CSS transition options for hiding the component.
     * @defaultValue .1s linear
     * @group Props
     */
    get hideTransitionOptions() {
        const value = this._hideTransitionOptions || this.overlayOptions?.hideTransitionOptions;
        return value === undefined ? '.1s linear' : value;
    }
    set hideTransitionOptions(value) {
        this._hideTransitionOptions = value;
    }
    /**
     * The listener property is an input that specifies the listener object for the component.
     * @defaultValue null
     * @group Props
     */
    get listener() {
        return this._listener || this.overlayOptions?.listener;
    }
    set listener(value) {
        this._listener = value;
    }
    /**
     * It is the option used to determine in which mode it should appear according to the given media or breakpoint.
     * @defaultValue null
     * @group Props
     */
    get responsive() {
        return this._responsive || this.overlayOptions?.responsive;
    }
    set responsive(val) {
        this._responsive = val;
    }
    /**
     * The options property is an input that specifies the overlay options for the component.
     * @defaultValue null
     * @group Props
     */
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
    }
    /**
     * This EventEmitter is used to notify changes in the visibility state of a component.
     * @param {Boolean} boolean - Value of visibility as boolean.
     * @group Emits
     */
    visibleChange = new EventEmitter();
    /**
     * Callback to invoke before the overlay is shown.
     * @param {OverlayOnBeforeShowEvent} event - Custom overlay before show event.
     * @group Emits
     */
    onBeforeShow = new EventEmitter();
    /**
     * Callback to invoke when the overlay is shown.
     * @param {OverlayOnShowEvent} event - Custom overlay show event.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke before the overlay is hidden.
     * @param {OverlayOnBeforeHideEvent} event - Custom overlay before hide event.
     * @group Emits
     */
    onBeforeHide = new EventEmitter();
    /**
     * Callback to invoke when the overlay is hidden
     * @param {OverlayOnHideEvent} event - Custom hide event.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * Callback to invoke when the animation is started.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    onAnimationStart = new EventEmitter();
    /**
     * Callback to invoke when the animation is done.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    onAnimationDone = new EventEmitter();
    templates;
    overlayViewChild;
    contentViewChild;
    contentTemplate;
    _visible = false;
    _mode;
    _style;
    _styleClass;
    _contentStyle;
    _contentStyleClass;
    _target;
    _appendTo;
    _autoZIndex;
    _baseZIndex;
    _showTransitionOptions;
    _hideTransitionOptions;
    _listener;
    _responsive;
    _options;
    modalVisible = false;
    isOverlayClicked = false;
    isOverlayContentClicked = false;
    scrollHandler;
    documentClickListener;
    documentResizeListener;
    documentKeyboardListener;
    window;
    transformOptions = {
        default: 'scaleY(0.8)',
        center: 'scale(0.7)',
        top: 'translate3d(0px, -100%, 0px)',
        'top-start': 'translate3d(0px, -100%, 0px)',
        'top-end': 'translate3d(0px, -100%, 0px)',
        bottom: 'translate3d(0px, 100%, 0px)',
        'bottom-start': 'translate3d(0px, 100%, 0px)',
        'bottom-end': 'translate3d(0px, 100%, 0px)',
        left: 'translate3d(-100%, 0px, 0px)',
        'left-start': 'translate3d(-100%, 0px, 0px)',
        'left-end': 'translate3d(-100%, 0px, 0px)',
        right: 'translate3d(100%, 0px, 0px)',
        'right-start': 'translate3d(100%, 0px, 0px)',
        'right-end': 'translate3d(100%, 0px, 0px)'
    };
    get modal() {
        if (isPlatformBrowser(this.platformId)) {
            return this.mode === 'modal' || (this.overlayResponsiveOptions && this.window?.matchMedia(this.overlayResponsiveOptions.media?.replace('@media', '') || `(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches);
        }
    }
    get overlayMode() {
        return this.mode || (this.modal ? 'modal' : 'overlay');
    }
    get overlayOptions() {
        return { ...this.config?.overlayOptions, ...this.options }; // TODO: Improve performance
    }
    get overlayResponsiveOptions() {
        return { ...this.overlayOptions?.responsive, ...this.responsive }; // TODO: Improve performance
    }
    get overlayResponsiveDirection() {
        return this.overlayResponsiveOptions?.direction || 'center';
    }
    get overlayEl() {
        return this.overlayViewChild?.nativeElement;
    }
    get contentEl() {
        return this.contentViewChild?.nativeElement;
    }
    get targetEl() {
        return DomHandler.getTargetElement(this.target, this.el?.nativeElement);
    }
    constructor(document, platformId, el, renderer, config, overlayService, zone) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.config = config;
        this.overlayService = overlayService;
        this.zone = zone;
        this.window = this.document.defaultView;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                // TODO: new template types may be added.
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    show(overlay, isFocus = false) {
        this.onVisibleChange(true);
        this.handleEvents('onShow', { overlay: overlay || this.overlayEl, target: this.targetEl, mode: this.overlayMode });
        isFocus && DomHandler.focus(this.targetEl);
        this.modal && DomHandler.addClass(this.document?.body, 'p-overflow-hidden');
    }
    hide(overlay, isFocus = false) {
        if (!this.visible) {
            return;
        }
        else {
            this.onVisibleChange(false);
            this.handleEvents('onHide', { overlay: overlay || this.overlayEl, target: this.targetEl, mode: this.overlayMode });
            isFocus && DomHandler.focus(this.targetEl);
            this.modal && DomHandler.removeClass(this.document?.body, 'p-overflow-hidden');
        }
    }
    alignOverlay() {
        !this.modal && DomHandler.alignOverlay(this.overlayEl, this.targetEl, this.appendTo);
    }
    onVisibleChange(visible) {
        this._visible = visible;
        this.visibleChange.emit(visible);
    }
    onOverlayClick() {
        this.isOverlayClicked = true;
    }
    onOverlayContentClick(event) {
        this.overlayService.add({
            originalEvent: event,
            target: this.targetEl
        });
        this.isOverlayContentClicked = true;
    }
    onOverlayContentAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.handleEvents('onBeforeShow', { overlay: this.overlayEl, target: this.targetEl, mode: this.overlayMode });
                if (this.autoZIndex) {
                    ZIndexUtils.set(this.overlayMode, this.overlayEl, this.baseZIndex + this.config?.zIndex[this.overlayMode]);
                }
                DomHandler.appendOverlay(this.overlayEl, this.appendTo === 'body' ? this.document.body : this.appendTo, this.appendTo);
                this.alignOverlay();
                break;
            case 'void':
                this.handleEvents('onBeforeHide', { overlay: this.overlayEl, target: this.targetEl, mode: this.overlayMode });
                this.modal && DomHandler.addClass(this.overlayEl, 'p-component-overlay-leave');
                break;
        }
        this.handleEvents('onAnimationStart', event);
    }
    onOverlayContentAnimationDone(event) {
        const container = this.overlayEl || event.element.parentElement;
        switch (event.toState) {
            case 'visible':
                this.show(container, true);
                this.bindListeners();
                break;
            case 'void':
                this.hide(container, true);
                this.unbindListeners();
                DomHandler.appendOverlay(this.overlayEl, this.targetEl, this.appendTo);
                ZIndexUtils.clear(container);
                this.modalVisible = false;
                break;
        }
        this.handleEvents('onAnimationDone', event);
    }
    handleEvents(name, params) {
        this[name].emit(params);
        this.options && this.options[name] && this.options[name](params);
        this.config?.overlayOptions && (this.config?.overlayOptions)[name] && (this.config?.overlayOptions)[name](params);
    }
    bindListeners() {
        this.bindScrollListener();
        this.bindDocumentClickListener();
        this.bindDocumentResizeListener();
        this.bindDocumentKeyboardListener();
    }
    unbindListeners() {
        this.unbindScrollListener();
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindDocumentKeyboardListener();
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.targetEl, (event) => {
                const valid = this.listener ? this.listener(event, { type: 'scroll', mode: this.overlayMode, valid: true }) : true;
                valid && this.hide(event, true);
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen(this.document, 'click', (event) => {
                const isTargetClicked = this.targetEl && (this.targetEl.isSameNode(event.target) || (!this.isOverlayClicked && this.targetEl.contains(event.target)));
                const isOutsideClicked = !isTargetClicked && !this.isOverlayContentClicked;
                const valid = this.listener ? this.listener(event, { type: 'outside', mode: this.overlayMode, valid: event.which !== 3 && isOutsideClicked }) : isOutsideClicked;
                valid && this.hide(event);
                this.isOverlayClicked = this.isOverlayContentClicked = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', (event) => {
                const valid = this.listener ? this.listener(event, { type: 'resize', mode: this.overlayMode, valid: !DomHandler.isTouchDevice() }) : !DomHandler.isTouchDevice();
                valid && this.hide(event, true);
            });
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    bindDocumentKeyboardListener() {
        if (this.documentKeyboardListener) {
            return;
        }
        this.zone.runOutsideAngular(() => {
            this.documentKeyboardListener = this.renderer.listen(this.window, 'keydown', (event) => {
                if (!this.overlayOptions.hideOnEscape || event.keyCode !== 27) {
                    return;
                }
                const valid = this.listener ? this.listener(event, { type: 'keydown', mode: this.overlayMode, valid: !DomHandler.isTouchDevice() }) : !DomHandler.isTouchDevice();
                if (valid) {
                    this.zone.run(() => {
                        this.hide(event, true);
                    });
                }
            });
        });
    }
    unbindDocumentKeyboardListener() {
        if (this.documentKeyboardListener) {
            this.documentKeyboardListener();
            this.documentKeyboardListener = null;
        }
    }
    ngOnDestroy() {
        this.hide(this.overlayEl, true);
        if (this.overlayEl) {
            DomHandler.appendOverlay(this.overlayEl, this.targetEl, this.appendTo);
            ZIndexUtils.clear(this.overlayEl);
        }
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
        this.unbindListeners();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Overlay, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Overlay, selector: "p-overlay", inputs: { visible: "visible", mode: "mode", style: "style", styleClass: "styleClass", contentStyle: "contentStyle", contentStyleClass: "contentStyleClass", target: "target", appendTo: "appendTo", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", listener: "listener", responsive: "responsive", options: "options" }, outputs: { visibleChange: "visibleChange", onBeforeShow: "onBeforeShow", onShow: "onShow", onBeforeHide: "onBeforeHide", onHide: "onHide", onAnimationStart: "onAnimationStart", onAnimationDone: "onAnimationDone" }, host: { classAttribute: "p-element" }, providers: [OVERLAY_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "overlayViewChild", first: true, predicate: ["overlay"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: `
        <div
            *ngIf="modalVisible"
            #overlay
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-overlay p-component': true,
                'p-overlay-modal p-component-overlay p-component-overlay-enter': modal,
                'p-overlay-center': modal && overlayResponsiveDirection === 'center',
                'p-overlay-top': modal && overlayResponsiveDirection === 'top',
                'p-overlay-top-start': modal && overlayResponsiveDirection === 'top-start',
                'p-overlay-top-end': modal && overlayResponsiveDirection === 'top-end',
                'p-overlay-bottom': modal && overlayResponsiveDirection === 'bottom',
                'p-overlay-bottom-start': modal && overlayResponsiveDirection === 'bottom-start',
                'p-overlay-bottom-end': modal && overlayResponsiveDirection === 'bottom-end',
                'p-overlay-left': modal && overlayResponsiveDirection === 'left',
                'p-overlay-left-start': modal && overlayResponsiveDirection === 'left-start',
                'p-overlay-left-end': modal && overlayResponsiveDirection === 'left-end',
                'p-overlay-right': modal && overlayResponsiveDirection === 'right',
                'p-overlay-right-start': modal && overlayResponsiveDirection === 'right-start',
                'p-overlay-right-end': modal && overlayResponsiveDirection === 'right-end'
            }"
            (click)="onOverlayClick($event)"
        >
            <div
                *ngIf="visible"
                #content
                [ngStyle]="contentStyle"
                [class]="contentStyleClass"
                [ngClass]="'p-overlay-content'"
                (click)="onOverlayContentClick($event)"
                [@overlayContentAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions, transform: transformOptions[modal ? overlayResponsiveDirection : 'default'] } }"
                (@overlayContentAnimation.start)="onOverlayContentAnimationStart($event)"
                (@overlayContentAnimation.done)="onOverlayContentAnimationDone($event)"
            >
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: { mode: overlayMode } }"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: [".p-overlay{position:absolute;top:0;left:0}.p-overlay-modal{display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100%;height:100%}.p-overlay-content{transform-origin:inherit}.p-overlay-modal>.p-overlay-content{z-index:1;width:90%}.p-overlay-top{align-items:flex-start}.p-overlay-top-start{align-items:flex-start;justify-content:flex-start}.p-overlay-top-end{align-items:flex-start;justify-content:flex-end}.p-overlay-bottom{align-items:flex-end}.p-overlay-bottom-start{align-items:flex-end;justify-content:flex-start}.p-overlay-bottom-end{align-items:flex-end;justify-content:flex-end}.p-overlay-left{justify-content:flex-start}.p-overlay-left-start{justify-content:flex-start;align-items:flex-start}.p-overlay-left-end{justify-content:flex-start;align-items:flex-end}.p-overlay-right{justify-content:flex-end}.p-overlay-right-start{justify-content:flex-end;align-items:flex-start}.p-overlay-right-end{justify-content:flex-end;align-items:flex-end}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [trigger('overlayContentAnimation', [transition(':enter', [useAnimation(showOverlayContentAnimation)]), transition(':leave', [useAnimation(hideOverlayContentAnimation)])])], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Overlay };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Overlay, decorators: [{
            type: Component,
            args: [{ selector: 'p-overlay', template: `
        <div
            *ngIf="modalVisible"
            #overlay
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-overlay p-component': true,
                'p-overlay-modal p-component-overlay p-component-overlay-enter': modal,
                'p-overlay-center': modal && overlayResponsiveDirection === 'center',
                'p-overlay-top': modal && overlayResponsiveDirection === 'top',
                'p-overlay-top-start': modal && overlayResponsiveDirection === 'top-start',
                'p-overlay-top-end': modal && overlayResponsiveDirection === 'top-end',
                'p-overlay-bottom': modal && overlayResponsiveDirection === 'bottom',
                'p-overlay-bottom-start': modal && overlayResponsiveDirection === 'bottom-start',
                'p-overlay-bottom-end': modal && overlayResponsiveDirection === 'bottom-end',
                'p-overlay-left': modal && overlayResponsiveDirection === 'left',
                'p-overlay-left-start': modal && overlayResponsiveDirection === 'left-start',
                'p-overlay-left-end': modal && overlayResponsiveDirection === 'left-end',
                'p-overlay-right': modal && overlayResponsiveDirection === 'right',
                'p-overlay-right-start': modal && overlayResponsiveDirection === 'right-start',
                'p-overlay-right-end': modal && overlayResponsiveDirection === 'right-end'
            }"
            (click)="onOverlayClick($event)"
        >
            <div
                *ngIf="visible"
                #content
                [ngStyle]="contentStyle"
                [class]="contentStyleClass"
                [ngClass]="'p-overlay-content'"
                (click)="onOverlayContentClick($event)"
                [@overlayContentAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions, transform: transformOptions[modal ? overlayResponsiveDirection : 'default'] } }"
                (@overlayContentAnimation.start)="onOverlayContentAnimationStart($event)"
                (@overlayContentAnimation.done)="onOverlayContentAnimationDone($event)"
            >
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: { mode: overlayMode } }"></ng-container>
            </div>
        </div>
    `, animations: [trigger('overlayContentAnimation', [transition(':enter', [useAnimation(showOverlayContentAnimation)]), transition(':leave', [useAnimation(hideOverlayContentAnimation)])])], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [OVERLAY_VALUE_ACCESSOR], host: {
                        class: 'p-element'
                    }, styles: [".p-overlay{position:absolute;top:0;left:0}.p-overlay-modal{display:flex;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100%;height:100%}.p-overlay-content{transform-origin:inherit}.p-overlay-modal>.p-overlay-content{z-index:1;width:90%}.p-overlay-top{align-items:flex-start}.p-overlay-top-start{align-items:flex-start;justify-content:flex-start}.p-overlay-top-end{align-items:flex-start;justify-content:flex-end}.p-overlay-bottom{align-items:flex-end}.p-overlay-bottom-start{align-items:flex-end;justify-content:flex-start}.p-overlay-bottom-end{align-items:flex-end;justify-content:flex-end}.p-overlay-left{justify-content:flex-start}.p-overlay-left-start{justify-content:flex-start;align-items:flex-start}.p-overlay-left-end{justify-content:flex-start;align-items:flex-end}.p-overlay-right{justify-content:flex-end}.p-overlay-right-start{justify-content:flex-end;align-items:flex-start}.p-overlay-right-end{justify-content:flex-end;align-items:flex-end}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }, { type: i0.NgZone }]; }, propDecorators: { visible: [{
                type: Input
            }], mode: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], contentStyle: [{
                type: Input
            }], contentStyleClass: [{
                type: Input
            }], target: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], listener: [{
                type: Input
            }], responsive: [{
                type: Input
            }], options: [{
                type: Input
            }], visibleChange: [{
                type: Output
            }], onBeforeShow: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onBeforeHide: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onAnimationStart: [{
                type: Output
            }], onAnimationDone: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], overlayViewChild: [{
                type: ViewChild,
                args: ['overlay']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }] } });
class OverlayModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: OverlayModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: OverlayModule, declarations: [Overlay], imports: [CommonModule, SharedModule], exports: [Overlay, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: OverlayModule, imports: [CommonModule, SharedModule, SharedModule] });
}
export { OverlayModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: OverlayModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule],
                    exports: [Overlay, SharedModule],
                    declarations: [Overlay]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9vdmVybGF5L292ZXJsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQWtCLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ILE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUUsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBR1IsTUFBTSxFQUNOLFdBQVcsRUFJWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBOEosYUFBYSxFQUE0QixZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDaFAsT0FBTyxFQUFFLDZCQUE2QixFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUd6RCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBUTtJQUN2QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3RDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGLE1BQU0sMkJBQTJCLEdBQUcsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENB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QUFLO2dCQVlPLHFCQUFxQjtzQkFBakMsS0FBSztnQkFZTyxRQUFRO3NCQUFwQixLQUFLO2dCQVdPLFVBQVU7c0JBQXRCLEtBQUs7Z0JBV08sT0FBTztzQkFBbkIsS0FBSztnQkFXSSxhQUFhO3NCQUF0QixNQUFNO2dCQU1HLFlBQVk7c0JBQXJCLE1BQU07Z0JBTUcsTUFBTTtzQkFBZixNQUFNO2dCQU1HLFlBQVk7c0JBQXJCLE1BQU07Z0JBTUcsTUFBTTtzQkFBZixNQUFNO2dCQU1HLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFNRyxlQUFlO3NCQUF4QixNQUFNO2dCQUV5QixTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7Z0JBRVIsZ0JBQWdCO3NCQUFyQyxTQUFTO3VCQUFDLFNBQVM7Z0JBRUUsZ0JBQWdCO3NCQUFyQyxTQUFTO3VCQUFDLFNBQVM7O0FBa1Z4QixNQUthLGFBQWE7dUdBQWIsYUFBYTt3R0FBYixhQUFhLGlCQXJqQmIsT0FBTyxhQWlqQk4sWUFBWSxFQUFFLFlBQVksYUFqakIzQixPQUFPLEVBa2pCRyxZQUFZO3dHQUd0QixhQUFhLFlBSlosWUFBWSxFQUFFLFlBQVksRUFDakIsWUFBWTs7U0FHdEIsYUFBYTsyRkFBYixhQUFhO2tCQUx6QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7b0JBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7b0JBQ2hDLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBhbmltYXRpb24sIEFuaW1hdGlvbkV2ZW50LCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgdXNlQW5pbWF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZGVUeXBlLCBPdmVybGF5T25CZWZvcmVIaWRlRXZlbnQsIE92ZXJsYXlPbkJlZm9yZVNob3dFdmVudCwgT3ZlcmxheU9uSGlkZUV2ZW50LCBPdmVybGF5T25TaG93RXZlbnQsIE92ZXJsYXlPcHRpb25zLCBPdmVybGF5U2VydmljZSwgUHJpbWVOR0NvbmZpZywgUHJpbWVUZW1wbGF0ZSwgUmVzcG9uc2l2ZU92ZXJsYXlPcHRpb25zLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciwgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE9iamVjdFV0aWxzLCBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuaW1wb3J0IHsgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IE9WRVJMQVlfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPdmVybGF5KSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuY29uc3Qgc2hvd092ZXJsYXlDb250ZW50QW5pbWF0aW9uID0gYW5pbWF0aW9uKFtzdHlsZSh7IHRyYW5zZm9ybTogJ3t7dHJhbnNmb3JtfX0nLCBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKV0pO1xuXG5jb25zdCBoaWRlT3ZlcmxheUNvbnRlbnRBbmltYXRpb24gPSBhbmltYXRpb24oW2FuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSkpXSk7XG4vKipcbiAqIFRoaXMgQVBJIGFsbG93cyBvdmVybGF5IGNvbXBvbmVudHMgdG8gYmUgY29udHJvbGxlZCBmcm9tIHRoZSBQcmltZU5HQ29uZmlnLiBJbiB0aGlzIHdheSwgYWxsIG92ZXJsYXkgY29tcG9uZW50cyBpbiB0aGUgYXBwbGljYXRpb24gY2FuIGhhdmUgdGhlIHNhbWUgYmVoYXZpb3IuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atb3ZlcmxheScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCJtb2RhbFZpc2libGVcIlxuICAgICAgICAgICAgI292ZXJsYXlcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5IHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5LW1vZGFsIHAtY29tcG9uZW50LW92ZXJsYXkgcC1jb21wb25lbnQtb3ZlcmxheS1lbnRlcic6IG1vZGFsLFxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktY2VudGVyJzogbW9kYWwgJiYgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gPT09ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktdG9wJzogbW9kYWwgJiYgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gPT09ICd0b3AnLFxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktdG9wLXN0YXJ0JzogbW9kYWwgJiYgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gPT09ICd0b3Atc3RhcnQnLFxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktdG9wLWVuZCc6IG1vZGFsICYmIG92ZXJsYXlSZXNwb25zaXZlRGlyZWN0aW9uID09PSAndG9wLWVuZCcsXG4gICAgICAgICAgICAgICAgJ3Atb3ZlcmxheS1ib3R0b20nOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgJ3Atb3ZlcmxheS1ib3R0b20tc3RhcnQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ2JvdHRvbS1zdGFydCcsXG4gICAgICAgICAgICAgICAgJ3Atb3ZlcmxheS1ib3R0b20tZW5kJzogbW9kYWwgJiYgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gPT09ICdib3R0b20tZW5kJyxcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5LWxlZnQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ2xlZnQnLFxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktbGVmdC1zdGFydCc6IG1vZGFsICYmIG92ZXJsYXlSZXNwb25zaXZlRGlyZWN0aW9uID09PSAnbGVmdC1zdGFydCcsXG4gICAgICAgICAgICAgICAgJ3Atb3ZlcmxheS1sZWZ0LWVuZCc6IG1vZGFsICYmIG92ZXJsYXlSZXNwb25zaXZlRGlyZWN0aW9uID09PSAnbGVmdC1lbmQnLFxuICAgICAgICAgICAgICAgICdwLW92ZXJsYXktcmlnaHQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAncC1vdmVybGF5LXJpZ2h0LXN0YXJ0JzogbW9kYWwgJiYgb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gPT09ICdyaWdodC1zdGFydCcsXG4gICAgICAgICAgICAgICAgJ3Atb3ZlcmxheS1yaWdodC1lbmQnOiBtb2RhbCAmJiBvdmVybGF5UmVzcG9uc2l2ZURpcmVjdGlvbiA9PT0gJ3JpZ2h0LWVuZCdcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uT3ZlcmxheUNsaWNrKCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKm5nSWY9XCJ2aXNpYmxlXCJcbiAgICAgICAgICAgICAgICAjY29udGVudFxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImNvbnRlbnRTdHlsZVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cImNvbnRlbnRTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCIncC1vdmVybGF5LWNvbnRlbnQnXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25PdmVybGF5Q29udGVudENsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgIFtAb3ZlcmxheUNvbnRlbnRBbmltYXRpb25dPVwieyB2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHsgc2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9ucywgdHJhbnNmb3JtOiB0cmFuc2Zvcm1PcHRpb25zW21vZGFsID8gb3ZlcmxheVJlc3BvbnNpdmVEaXJlY3Rpb24gOiAnZGVmYXVsdCddIH0gfVwiXG4gICAgICAgICAgICAgICAgKEBvdmVybGF5Q29udGVudEFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlDb250ZW50QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKEBvdmVybGF5Q29udGVudEFuaW1hdGlvbi5kb25lKT1cIm9uT3ZlcmxheUNvbnRlbnRBbmltYXRpb25Eb25lKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogeyBtb2RlOiBvdmVybGF5TW9kZSB9IH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFt0cmlnZ2VyKCdvdmVybGF5Q29udGVudEFuaW1hdGlvbicsIFt0cmFuc2l0aW9uKCc6ZW50ZXInLCBbdXNlQW5pbWF0aW9uKHNob3dPdmVybGF5Q29udGVudEFuaW1hdGlvbildKSwgdHJhbnNpdGlvbignOmxlYXZlJywgW3VzZUFuaW1hdGlvbihoaWRlT3ZlcmxheUNvbnRlbnRBbmltYXRpb24pXSldKV0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtPVkVSTEFZX1ZBTFVFX0FDQ0VTU09SXSxcbiAgICBzdHlsZVVybHM6IFsnLi9vdmVybGF5LmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBUaGUgdmlzaWJsZSBwcm9wZXJ0eSBpcyBhbiBpbnB1dCB0aGF0IGRldGVybWluZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIGZhbHNlXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlO1xuICAgIH1cbiAgICBzZXQgdmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUgJiYgIXRoaXMubW9kYWxWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1vZGUgcHJvcGVydHkgaXMgYW4gaW5wdXQgdGhhdCBkZXRlcm1pbmVzIHRoZSBvdmVybGF5IG1vZGUgdHlwZSBvciBzdHJpbmcuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBudWxsXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG1vZGUoKTogT3ZlcmxheU1vZGVUeXBlIHwgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGUgfHwgdGhpcy5vdmVybGF5T3B0aW9ucz8ubW9kZTtcbiAgICB9XG4gICAgc2V0IG1vZGUodmFsdWU6IE92ZXJsYXlNb2RlVHlwZSB8IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tb2RlID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzdHlsZSBwcm9wZXJ0eSBpcyBhbiBpbnB1dCB0aGF0IGRldGVybWluZXMgdGhlIHN0eWxlIG9iamVjdCBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIG51bGxcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc3R5bGUoKTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZSh0aGlzLl9zdHlsZSwgdGhpcy5tb2RhbCA/IHRoaXMub3ZlcmxheVJlc3BvbnNpdmVPcHRpb25zPy5zdHlsZSA6IHRoaXMub3ZlcmxheU9wdGlvbnM/LnN0eWxlKTtcbiAgICB9XG4gICAgc2V0IHN0eWxlKHZhbHVlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzdHlsZUNsYXNzIHByb3BlcnR5IGlzIGFuIGlucHV0IHRoYXQgZGV0ZXJtaW5lcyB0aGUgQ1NTIGNsYXNzKGVzKSBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIG51bGxcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc3R5bGVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMubWVyZ2UodGhpcy5fc3R5bGVDbGFzcywgdGhpcy5tb2RhbCA/IHRoaXMub3ZlcmxheVJlc3BvbnNpdmVPcHRpb25zPy5zdHlsZUNsYXNzIDogdGhpcy5vdmVybGF5T3B0aW9ucz8uc3R5bGVDbGFzcyk7XG4gICAgfVxuICAgIHNldCBzdHlsZUNsYXNzKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVDbGFzcyA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY29udGVudFN0eWxlIHByb3BlcnR5IGlzIGFuIGlucHV0IHRoYXQgZGV0ZXJtaW5lcyB0aGUgc3R5bGUgb2JqZWN0IGZvciB0aGUgY29udGVudCBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBkZWZhdWx0VmFsdWUgbnVsbFxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBjb250ZW50U3R5bGUoKTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5tZXJnZSh0aGlzLl9jb250ZW50U3R5bGUsIHRoaXMubW9kYWwgPyB0aGlzLm92ZXJsYXlSZXNwb25zaXZlT3B0aW9ucz8uY29udGVudFN0eWxlIDogdGhpcy5vdmVybGF5T3B0aW9ucz8uY29udGVudFN0eWxlKTtcbiAgICB9XG4gICAgc2V0IGNvbnRlbnRTdHlsZSh2YWx1ZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9jb250ZW50U3R5bGUgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGNvbnRlbnRTdHlsZUNsYXNzIHByb3BlcnR5IGlzIGFuIGlucHV0IHRoYXQgZGV0ZXJtaW5lcyB0aGUgQ1NTIGNsYXNzKGVzKSBmb3IgdGhlIGNvbnRlbnQgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIG51bGxcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgY29udGVudFN0eWxlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLm1lcmdlKHRoaXMuX2NvbnRlbnRTdHlsZUNsYXNzLCB0aGlzLm1vZGFsID8gdGhpcy5vdmVybGF5UmVzcG9uc2l2ZU9wdGlvbnM/LmNvbnRlbnRTdHlsZUNsYXNzIDogdGhpcy5vdmVybGF5T3B0aW9ucz8uY29udGVudFN0eWxlQ2xhc3MpO1xuICAgIH1cbiAgICBzZXQgY29udGVudFN0eWxlQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9jb250ZW50U3R5bGVDbGFzcyA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHByb3BlcnR5IGlzIGFuIGlucHV0IHRoYXQgc3BlY2lmaWVzIHRoZSB0YXJnZXQgZWxlbWVudCBvciBzZWxlY3RvciBmb3IgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIG51bGxcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgdGFyZ2V0KCk6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3RhcmdldCB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy50YXJnZXQ7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gJ0BwcmV2JyA6IHZhbHVlO1xuICAgIH1cbiAgICBzZXQgdGFyZ2V0KHZhbHVlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVybGF5IGNhbiBiZSBtb3VudGVkIGludG8gaXRzIGxvY2F0aW9uLCBib2R5IG9yIERPTSBlbGVtZW50IGluc3RhbmNlIHVzaW5nIHRoaXMgb3B0aW9uLlxuICAgICAqIEBkZWZhdWx0VmFsdWUgbnVsbFxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBhcHBlbmRUbygpOiAnYm9keScgfCBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBlbmRUbyB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5hcHBlbmRUbztcbiAgICB9XG4gICAgc2V0IGFwcGVuZFRvKHZhbHVlOiAnYm9keScgfCBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9hcHBlbmRUbyA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgYXV0b1pJbmRleCBkZXRlcm1pbmVzIHdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBtYW5hZ2UgbGF5ZXJpbmcuIEl0cyBkZWZhdWx0IHZhbHVlIGlzICdmYWxzZScuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBhdXRvWkluZGV4KCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2F1dG9aSW5kZXggfHwgdGhpcy5vdmVybGF5T3B0aW9ucz8uYXV0b1pJbmRleDtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB0cnVlIDogdmFsdWU7XG4gICAgfVxuICAgIHNldCBhdXRvWkluZGV4KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2F1dG9aSW5kZXggPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGJhc2VaSW5kZXggaXMgYmFzZSB6SW5kZXggdmFsdWUgdG8gdXNlIGluIGxheWVyaW5nLlxuICAgICAqIEBkZWZhdWx0VmFsdWUgbnVsbFxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBiYXNlWkluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fYmFzZVpJbmRleCB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5iYXNlWkluZGV4O1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IDAgOiB2YWx1ZTtcbiAgICB9XG4gICAgc2V0IGJhc2VaSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9iYXNlWkluZGV4ID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgc2hvdyBvciBoaWRlIGFuaW1hdGlvbi5cbiAgICAgKiBAZGVmYXVsdFZhbHVlIC4xMnMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSlcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2hvd1RyYW5zaXRpb25PcHRpb25zKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fc2hvd1RyYW5zaXRpb25PcHRpb25zIHx8IHRoaXMub3ZlcmxheU9wdGlvbnM/LnNob3dUcmFuc2l0aW9uT3B0aW9ucztcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyAnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScgOiB2YWx1ZTtcbiAgICB9XG4gICAgc2V0IHNob3dUcmFuc2l0aW9uT3B0aW9ucyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3Nob3dUcmFuc2l0aW9uT3B0aW9ucyA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgaGlkZVRyYW5zaXRpb25PcHRpb25zIHByb3BlcnR5IGlzIGFuIGlucHV0IHRoYXQgZGV0ZXJtaW5lcyB0aGUgQ1NTIHRyYW5zaXRpb24gb3B0aW9ucyBmb3IgaGlkaW5nIHRoZSBjb21wb25lbnQuXG4gICAgICogQGRlZmF1bHRWYWx1ZSAuMXMgbGluZWFyXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGhpZGVUcmFuc2l0aW9uT3B0aW9ucygpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2hpZGVUcmFuc2l0aW9uT3B0aW9ucyB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5oaWRlVHJhbnNpdGlvbk9wdGlvbnM7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gJy4xcyBsaW5lYXInIDogdmFsdWU7XG4gICAgfVxuICAgIHNldCBoaWRlVHJhbnNpdGlvbk9wdGlvbnModmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9oaWRlVHJhbnNpdGlvbk9wdGlvbnMgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGxpc3RlbmVyIHByb3BlcnR5IGlzIGFuIGlucHV0IHRoYXQgc3BlY2lmaWVzIHRoZSBsaXN0ZW5lciBvYmplY3QgZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBudWxsXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGxpc3RlbmVyKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lciB8fCB0aGlzLm92ZXJsYXlPcHRpb25zPy5saXN0ZW5lcjtcbiAgICB9XG4gICAgc2V0IGxpc3RlbmVyKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSXQgaXMgdGhlIG9wdGlvbiB1c2VkIHRvIGRldGVybWluZSBpbiB3aGljaCBtb2RlIGl0IHNob3VsZCBhcHBlYXIgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBtZWRpYSBvciBicmVha3BvaW50LlxuICAgICAqIEBkZWZhdWx0VmFsdWUgbnVsbFxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByZXNwb25zaXZlKCk6IFJlc3BvbnNpdmVPdmVybGF5T3B0aW9ucyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNwb25zaXZlIHx8IHRoaXMub3ZlcmxheU9wdGlvbnM/LnJlc3BvbnNpdmU7XG4gICAgfVxuICAgIHNldCByZXNwb25zaXZlKHZhbDogUmVzcG9uc2l2ZU92ZXJsYXlPcHRpb25zIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNpdmUgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBvcHRpb25zIHByb3BlcnR5IGlzIGFuIGlucHV0IHRoYXQgc3BlY2lmaWVzIHRoZSBvdmVybGF5IG9wdGlvbnMgZm9yIHRoZSBjb21wb25lbnQuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBudWxsXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG9wdGlvbnMoKTogT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG4gICAgc2V0IG9wdGlvbnModmFsOiBPdmVybGF5T3B0aW9ucyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIEV2ZW50RW1pdHRlciBpcyB1c2VkIHRvIG5vdGlmeSBjaGFuZ2VzIGluIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gYm9vbGVhbiAtIFZhbHVlIG9mIHZpc2liaWxpdHkgYXMgYm9vbGVhbi5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgdmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBiZWZvcmUgdGhlIG92ZXJsYXkgaXMgc2hvd24uXG4gICAgICogQHBhcmFtIHtPdmVybGF5T25CZWZvcmVTaG93RXZlbnR9IGV2ZW50IC0gQ3VzdG9tIG92ZXJsYXkgYmVmb3JlIHNob3cgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQmVmb3JlU2hvdzogRXZlbnRFbWl0dGVyPE92ZXJsYXlPbkJlZm9yZVNob3dFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE92ZXJsYXlPbkJlZm9yZVNob3dFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgb3ZlcmxheSBpcyBzaG93bi5cbiAgICAgKiBAcGFyYW0ge092ZXJsYXlPblNob3dFdmVudH0gZXZlbnQgLSBDdXN0b20gb3ZlcmxheSBzaG93IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxPdmVybGF5T25TaG93RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxPdmVybGF5T25TaG93RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGJlZm9yZSB0aGUgb3ZlcmxheSBpcyBoaWRkZW4uXG4gICAgICogQHBhcmFtIHtPdmVybGF5T25CZWZvcmVIaWRlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIG92ZXJsYXkgYmVmb3JlIGhpZGUgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQmVmb3JlSGlkZTogRXZlbnRFbWl0dGVyPE92ZXJsYXlPbkJlZm9yZUhpZGVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE92ZXJsYXlPbkJlZm9yZUhpZGVFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgb3ZlcmxheSBpcyBoaWRkZW5cbiAgICAgKiBAcGFyYW0ge092ZXJsYXlPbkhpZGVFdmVudH0gZXZlbnQgLSBDdXN0b20gaGlkZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8T3ZlcmxheU9uSGlkZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8T3ZlcmxheU9uSGlkZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHRoZSBhbmltYXRpb24gaXMgc3RhcnRlZC5cbiAgICAgKiBAcGFyYW0ge0FuaW1hdGlvbkV2ZW50fSBldmVudCAtIEFuaW1hdGlvbiBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25BbmltYXRpb25TdGFydDogRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QW5pbWF0aW9uRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gdGhlIGFuaW1hdGlvbiBpcyBkb25lLlxuICAgICAqIEBwYXJhbSB7QW5pbWF0aW9uRXZlbnR9IGV2ZW50IC0gQW5pbWF0aW9uIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkFuaW1hdGlvbkRvbmU6IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnb3ZlcmxheScpIG92ZXJsYXlWaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIF92aXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfbW9kZTogT3ZlcmxheU1vZGVUeXBlIHwgc3RyaW5nO1xuXG4gICAgX3N0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgX3N0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF9jb250ZW50U3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgICBfY29udGVudFN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF90YXJnZXQ6IGFueTtcblxuICAgIF9hcHBlbmRUbzogJ2JvZHknIHwgSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICBfYXV0b1pJbmRleDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9iYXNlWkluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBfc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfbGlzdGVuZXI6IGFueTtcblxuICAgIF9yZXNwb25zaXZlOiBSZXNwb25zaXZlT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgICBfb3B0aW9uczogT3ZlcmxheU9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgICBtb2RhbFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlzT3ZlcmxheUNsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlzT3ZlcmxheUNvbnRlbnRDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBhbnk7XG5cbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIHByaXZhdGUgZG9jdW1lbnRLZXlib2FyZExpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBwcml2YXRlIHdpbmRvdzogV2luZG93IHwgbnVsbDtcblxuICAgIHByb3RlY3RlZCB0cmFuc2Zvcm1PcHRpb25zOiBhbnkgPSB7XG4gICAgICAgIGRlZmF1bHQ6ICdzY2FsZVkoMC44KScsXG4gICAgICAgIGNlbnRlcjogJ3NjYWxlKDAuNyknLFxuICAgICAgICB0b3A6ICd0cmFuc2xhdGUzZCgwcHgsIC0xMDAlLCAwcHgpJyxcbiAgICAgICAgJ3RvcC1zdGFydCc6ICd0cmFuc2xhdGUzZCgwcHgsIC0xMDAlLCAwcHgpJyxcbiAgICAgICAgJ3RvcC1lbmQnOiAndHJhbnNsYXRlM2QoMHB4LCAtMTAwJSwgMHB4KScsXG4gICAgICAgIGJvdHRvbTogJ3RyYW5zbGF0ZTNkKDBweCwgMTAwJSwgMHB4KScsXG4gICAgICAgICdib3R0b20tc3RhcnQnOiAndHJhbnNsYXRlM2QoMHB4LCAxMDAlLCAwcHgpJyxcbiAgICAgICAgJ2JvdHRvbS1lbmQnOiAndHJhbnNsYXRlM2QoMHB4LCAxMDAlLCAwcHgpJyxcbiAgICAgICAgbGVmdDogJ3RyYW5zbGF0ZTNkKC0xMDAlLCAwcHgsIDBweCknLFxuICAgICAgICAnbGVmdC1zdGFydCc6ICd0cmFuc2xhdGUzZCgtMTAwJSwgMHB4LCAwcHgpJyxcbiAgICAgICAgJ2xlZnQtZW5kJzogJ3RyYW5zbGF0ZTNkKC0xMDAlLCAwcHgsIDBweCknLFxuICAgICAgICByaWdodDogJ3RyYW5zbGF0ZTNkKDEwMCUsIDBweCwgMHB4KScsXG4gICAgICAgICdyaWdodC1zdGFydCc6ICd0cmFuc2xhdGUzZCgxMDAlLCAwcHgsIDBweCknLFxuICAgICAgICAncmlnaHQtZW5kJzogJ3RyYW5zbGF0ZTNkKDEwMCUsIDBweCwgMHB4KSdcbiAgICB9O1xuXG4gICAgZ2V0IG1vZGFsKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZSA9PT0gJ21vZGFsJyB8fCAodGhpcy5vdmVybGF5UmVzcG9uc2l2ZU9wdGlvbnMgJiYgdGhpcy53aW5kb3c/Lm1hdGNoTWVkaWEodGhpcy5vdmVybGF5UmVzcG9uc2l2ZU9wdGlvbnMubWVkaWE/LnJlcGxhY2UoJ0BtZWRpYScsICcnKSB8fCBgKG1heC13aWR0aDogJHt0aGlzLm92ZXJsYXlSZXNwb25zaXZlT3B0aW9ucy5icmVha3BvaW50fSlgKS5tYXRjaGVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBvdmVybGF5TW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZSB8fCAodGhpcy5tb2RhbCA/ICdtb2RhbCcgOiAnb3ZlcmxheScpO1xuICAgIH1cblxuICAgIGdldCBvdmVybGF5T3B0aW9ucygpOiBPdmVybGF5T3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB7IC4uLnRoaXMuY29uZmlnPy5vdmVybGF5T3B0aW9ucywgLi4udGhpcy5vcHRpb25zIH07IC8vIFRPRE86IEltcHJvdmUgcGVyZm9ybWFuY2VcbiAgICB9XG5cbiAgICBnZXQgb3ZlcmxheVJlc3BvbnNpdmVPcHRpb25zKCk6IFJlc3BvbnNpdmVPdmVybGF5T3B0aW9ucyB7XG4gICAgICAgIHJldHVybiB7IC4uLnRoaXMub3ZlcmxheU9wdGlvbnM/LnJlc3BvbnNpdmUsIC4uLnRoaXMucmVzcG9uc2l2ZSB9OyAvLyBUT0RPOiBJbXByb3ZlIHBlcmZvcm1hbmNlXG4gICAgfVxuXG4gICAgZ2V0IG92ZXJsYXlSZXNwb25zaXZlRGlyZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVzcG9uc2l2ZU9wdGlvbnM/LmRpcmVjdGlvbiB8fCAnY2VudGVyJztcbiAgICB9XG5cbiAgICBnZXQgb3ZlcmxheUVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBjb250ZW50RWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IHRhcmdldEVsKCkge1xuICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5nZXRUYXJnZXRFbGVtZW50KHRoaXMudGFyZ2V0LCB0aGlzLmVsPy5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LFxuICAgICAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIGNvbmZpZzogUHJpbWVOR0NvbmZpZyxcbiAgICAgICAgcHVibGljIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmVcbiAgICApIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZXcgdGVtcGxhdGUgdHlwZXMgbWF5IGJlIGFkZGVkLlxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3cob3ZlcmxheT86IEhUTUxFbGVtZW50LCBpc0ZvY3VzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5vblZpc2libGVDaGFuZ2UodHJ1ZSk7XG4gICAgICAgIHRoaXMuaGFuZGxlRXZlbnRzKCdvblNob3cnLCB7IG92ZXJsYXk6IG92ZXJsYXkgfHwgdGhpcy5vdmVybGF5RWwsIHRhcmdldDogdGhpcy50YXJnZXRFbCwgbW9kZTogdGhpcy5vdmVybGF5TW9kZSB9KTtcblxuICAgICAgICBpc0ZvY3VzICYmIERvbUhhbmRsZXIuZm9jdXModGhpcy50YXJnZXRFbCk7XG4gICAgICAgIHRoaXMubW9kYWwgJiYgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50Py5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICB9XG5cbiAgICBoaWRlKG92ZXJsYXk/OiBIVE1MRWxlbWVudCwgaXNGb2N1czogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uVmlzaWJsZUNoYW5nZShmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25IaWRlJywgeyBvdmVybGF5OiBvdmVybGF5IHx8IHRoaXMub3ZlcmxheUVsLCB0YXJnZXQ6IHRoaXMudGFyZ2V0RWwsIG1vZGU6IHRoaXMub3ZlcmxheU1vZGUgfSk7XG4gICAgICAgICAgICBpc0ZvY3VzICYmIERvbUhhbmRsZXIuZm9jdXModGhpcy50YXJnZXRFbCk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsICYmIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudD8uYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlnbk92ZXJsYXkoKSB7XG4gICAgICAgICF0aGlzLm1vZGFsICYmIERvbUhhbmRsZXIuYWxpZ25PdmVybGF5KHRoaXMub3ZlcmxheUVsLCB0aGlzLnRhcmdldEVsLCB0aGlzLmFwcGVuZFRvKTtcbiAgICB9XG5cbiAgICBvblZpc2libGVDaGFuZ2UodmlzaWJsZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQodmlzaWJsZSk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5Q2xpY2soKSB7XG4gICAgICAgIHRoaXMuaXNPdmVybGF5Q2xpY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25PdmVybGF5Q29udGVudENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVNlcnZpY2UuYWRkKHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldEVsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXNPdmVybGF5Q29udGVudENsaWNrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uT3ZlcmxheUNvbnRlbnRBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25CZWZvcmVTaG93JywgeyBvdmVybGF5OiB0aGlzLm92ZXJsYXlFbCwgdGFyZ2V0OiB0aGlzLnRhcmdldEVsLCBtb2RlOiB0aGlzLm92ZXJsYXlNb2RlIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQodGhpcy5vdmVybGF5TW9kZSwgdGhpcy5vdmVybGF5RWwsIHRoaXMuYmFzZVpJbmRleCArIHRoaXMuY29uZmlnPy56SW5kZXhbdGhpcy5vdmVybGF5TW9kZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kT3ZlcmxheSh0aGlzLm92ZXJsYXlFbCwgdGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknID8gdGhpcy5kb2N1bWVudC5ib2R5IDogdGhpcy5hcHBlbmRUbywgdGhpcy5hcHBlbmRUbyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25CZWZvcmVIaWRlJywgeyBvdmVybGF5OiB0aGlzLm92ZXJsYXlFbCwgdGFyZ2V0OiB0aGlzLnRhcmdldEVsLCBtb2RlOiB0aGlzLm92ZXJsYXlNb2RlIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbCAmJiBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMub3ZlcmxheUVsLCAncC1jb21wb25lbnQtb3ZlcmxheS1sZWF2ZScpO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25BbmltYXRpb25TdGFydCcsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlDb250ZW50QW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5vdmVybGF5RWwgfHwgZXZlbnQuZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KGNvbnRhaW5lciwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kTGlzdGVuZXJzKCk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKGNvbnRhaW5lciwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kT3ZlcmxheSh0aGlzLm92ZXJsYXlFbCwgdGhpcy50YXJnZXRFbCwgdGhpcy5hcHBlbmRUbyk7XG4gICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIoY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGFsVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25BbmltYXRpb25Eb25lJywgZXZlbnQpO1xuICAgIH1cblxuICAgIGhhbmRsZUV2ZW50cyhuYW1lOiBzdHJpbmcsIHBhcmFtczogYW55KSB7XG4gICAgICAgICh0aGlzIGFzIGFueSlbbmFtZV0uZW1pdChwYXJhbXMpO1xuICAgICAgICB0aGlzLm9wdGlvbnMgJiYgKHRoaXMub3B0aW9ucyBhcyBhbnkpW25hbWVdICYmICh0aGlzLm9wdGlvbnMgYXMgYW55KVtuYW1lXShwYXJhbXMpO1xuICAgICAgICB0aGlzLmNvbmZpZz8ub3ZlcmxheU9wdGlvbnMgJiYgKHRoaXMuY29uZmlnPy5vdmVybGF5T3B0aW9ucyBhcyBhbnkpW25hbWVdICYmICh0aGlzLmNvbmZpZz8ub3ZlcmxheU9wdGlvbnMgYXMgYW55KVtuYW1lXShwYXJhbXMpO1xuICAgIH1cblxuICAgIGJpbmRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHVuYmluZExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEtleWJvYXJkTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBiaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIgPSBuZXcgQ29ubmVjdGVkT3ZlcmxheVNjcm9sbEhhbmRsZXIodGhpcy50YXJnZXRFbCwgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMubGlzdGVuZXIgPyB0aGlzLmxpc3RlbmVyKGV2ZW50LCB7IHR5cGU6ICdzY3JvbGwnLCBtb2RlOiB0aGlzLm92ZXJsYXlNb2RlLCB2YWxpZDogdHJ1ZSB9KSA6IHRydWU7XG5cbiAgICAgICAgICAgICAgICB2YWxpZCAmJiB0aGlzLmhpZGUoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbEhhbmRsZXIuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgdW5iaW5kU2Nyb2xsTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci51bmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1RhcmdldENsaWNrZWQgPSB0aGlzLnRhcmdldEVsICYmICh0aGlzLnRhcmdldEVsLmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fCAoIXRoaXMuaXNPdmVybGF5Q2xpY2tlZCAmJiB0aGlzLnRhcmdldEVsLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc091dHNpZGVDbGlja2VkID0gIWlzVGFyZ2V0Q2xpY2tlZCAmJiAhdGhpcy5pc092ZXJsYXlDb250ZW50Q2xpY2tlZDtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMubGlzdGVuZXIgPyB0aGlzLmxpc3RlbmVyKGV2ZW50LCB7IHR5cGU6ICdvdXRzaWRlJywgbW9kZTogdGhpcy5vdmVybGF5TW9kZSwgdmFsaWQ6IGV2ZW50LndoaWNoICE9PSAzICYmIGlzT3V0c2lkZUNsaWNrZWQgfSkgOiBpc091dHNpZGVDbGlja2VkO1xuXG4gICAgICAgICAgICAgICAgdmFsaWQgJiYgdGhpcy5oaWRlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3ZlcmxheUNsaWNrZWQgPSB0aGlzLmlzT3ZlcmxheUNvbnRlbnRDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLndpbmRvdywgJ3Jlc2l6ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy5saXN0ZW5lciA/IHRoaXMubGlzdGVuZXIoZXZlbnQsIHsgdHlwZTogJ3Jlc2l6ZScsIG1vZGU6IHRoaXMub3ZlcmxheU1vZGUsIHZhbGlkOiAhRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCkgfSkgOiAhRG9tSGFuZGxlci5pc1RvdWNoRGV2aWNlKCk7XG5cbiAgICAgICAgICAgICAgICB2YWxpZCAmJiB0aGlzLmhpZGUoZXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRLZXlib2FyZExpc3RlbmVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEtleWJvYXJkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud2luZG93LCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vdmVybGF5T3B0aW9ucy5oaWRlT25Fc2NhcGUgfHwgZXZlbnQua2V5Q29kZSAhPT0gMjcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy5saXN0ZW5lciA/IHRoaXMubGlzdGVuZXIoZXZlbnQsIHsgdHlwZTogJ2tleWRvd24nLCBtb2RlOiB0aGlzLm92ZXJsYXlNb2RlLCB2YWxpZDogIURvbUhhbmRsZXIuaXNUb3VjaERldmljZSgpIH0pIDogIURvbUhhbmRsZXIuaXNUb3VjaERldmljZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRLZXlib2FyZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50S2V5Ym9hcmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWJvYXJkTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuaGlkZSh0aGlzLm92ZXJsYXlFbCwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheUVsKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZE92ZXJsYXkodGhpcy5vdmVybGF5RWwsIHRoaXMudGFyZ2V0RWwsIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIodGhpcy5vdmVybGF5RWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuYmluZExpc3RlbmVycygpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtPdmVybGF5LCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW092ZXJsYXldXG59KVxuZXhwb3J0IGNsYXNzIE92ZXJsYXlNb2R1bGUge31cbiJdfQ==