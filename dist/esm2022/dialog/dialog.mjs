import { animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { Footer, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { FocusTrapModule } from 'primeng/focustrap';
import { TimesIcon } from 'primeng/icons/times';
import { WindowMaximizeIcon } from 'primeng/icons/windowmaximize';
import { WindowMinimizeIcon } from 'primeng/icons/windowminimize';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/focustrap";
import * as i4 from "primeng/ripple";
const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);
const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * Dialog is a container to display content in an overlay window.
 * @group Components
 */
class Dialog {
    document;
    platformId;
    el;
    renderer;
    zone;
    cd;
    config;
    /**
     * Title text of the dialog.
     * @group Props
     */
    header;
    /**
     * Enables dragging to change the position using header.
     * @group Props
     */
    draggable = true;
    /**
     * Enables resizing of the content.
     * @group Props
     */
    resizable = true;
    /**
     * Defines the left offset of dialog.
     * @group Props
     * @deprecated positionLeft property is deprecated.
     */
    get positionLeft() {
        return 0;
    }
    set positionLeft(_positionLeft) {
        console.log('positionLeft property is deprecated.');
    }
    /**
     * Defines the top offset of dialog.
     * @group Props
     * @deprecated positionTop property is deprecated.
     */
    get positionTop() {
        return 0;
    }
    set positionTop(_positionTop) {
        console.log('positionTop property is deprecated.');
    }
    /**
     * Style of the content section.
     * @group Props
     */
    contentStyle;
    /**
     * Style class of the content.
     * @group Props
     */
    contentStyleClass;
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @group Props
     */
    modal = false;
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @group Props
     */
    closeOnEscape = true;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    dismissableMask = false;
    /**
     * When enabled dialog is displayed in RTL direction.
     * @group Props
     */
    rtl = false;
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    closable = true;
    /**
     * Defines if the component is responsive.
     * @group Props
     * @deprecated Responsive property is deprecated.
     */
    get responsive() {
        return false;
    }
    set responsive(_responsive) {
        console.log('Responsive property is deprecated.');
    }
    /**
     * Target element to attach the dialog, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Object literal to define widths per screen size.
     * @group Props
     */
    breakpoints;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the mask.
     * @group Props
     */
    maskStyleClass;
    /**
     * Whether to show the header or not.
     * @group Props
     */
    showHeader = true;
    /**
     * Defines the breakpoint of the component responsive.
     * @group Props
     * @deprecated Breakpoint property is not utilized and deprecated. Use breakpoints or CSS media queries instead.
     */
    get breakpoint() {
        return 649;
    }
    set breakpoint(_breakpoint) {
        console.log('Breakpoint property is not utilized and deprecated, use breakpoints or CSS media queries instead.');
    }
    /**
     * Whether background scroll should be blocked when dialog is visible.
     * @group Props
     */
    blockScroll = false;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    autoZIndex = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    baseZIndex = 0;
    /**
     * Minimum value for the left coordinate of dialog in dragging.
     * @group Props
     */
    minX = 0;
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     * @group Props
     */
    minY = 0;
    /**
     * When enabled, first button receives focus on show.
     * @group Props
     */
    focusOnShow = true;
    /**
     * Whether the dialog can be displayed full screen.
     * @group Props
     */
    maximizable = false;
    /**
     * Keeps dialog in the viewport.
     * @group Props
     */
    keepInViewport = true;
    /**
     * When enabled, can only focus on elements inside the dialog.
     * @group Props
     */
    focusTrap = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Name of the close icon.
     * @group Props
     */
    closeIcon;
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    closeAriaLabel;
    /**
     * Index of the close button in tabbing order.
     * @group Props
     */
    closeTabindex = '-1';
    /**
     * Name of the minimize icon.
     * @group Props
     */
    minimizeIcon;
    /**
     * Name of the maximize icon.
     * @group Props
     */
    maximizeIcon;
    /**
     * Specifies the visibility of the dialog.
     * @group Props
     */
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    get style() {
        return this._style;
    }
    set style(value) {
        if (value) {
            this._style = { ...value };
            this.originalStyle = value;
        }
    }
    /**
     * Position of the dialog.
     * @group Props
     */
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        switch (value) {
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = 'translate3d(-100%, 0px, 0px)';
                break;
            case 'topright':
            case 'bottomright':
            case 'right':
                this.transformOptions = 'translate3d(100%, 0px, 0px)';
                break;
            case 'bottom':
                this.transformOptions = 'translate3d(0px, 100%, 0px)';
                break;
            case 'top':
                this.transformOptions = 'translate3d(0px, -100%, 0px)';
                break;
            default:
                this.transformOptions = 'scale(0.7)';
                break;
        }
    }
    /**
     * Callback to invoke when dialog is shown.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke when dialog is hidden.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * This EventEmitter is used to notify changes in the visibility state of a component.
     * @param {boolean} value - New value.
     * @group Emits
     */
    visibleChange = new EventEmitter();
    /**
     * Callback to invoke when dialog resizing is initiated.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onResizeInit = new EventEmitter();
    /**
     * Callback to invoke when dialog resizing is completed.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onResizeEnd = new EventEmitter();
    /**
     * Callback to invoke when dialog dragging is completed.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    onDragEnd = new EventEmitter();
    /**
     * Callback to invoke when dialog maximized or unmaximized.
     * @group Emits
     */
    onMaximize = new EventEmitter();
    headerFacet;
    footerFacet;
    templates;
    headerViewChild;
    contentViewChild;
    footerViewChild;
    headerTemplate;
    contentTemplate;
    footerTemplate;
    maximizeIconTemplate;
    closeIconTemplate;
    minimizeIconTemplate;
    _visible = false;
    maskVisible;
    container;
    wrapper;
    dragging;
    documentDragListener;
    documentDragEndListener;
    resizing;
    documentResizeListener;
    documentResizeEndListener;
    documentEscapeListener;
    maskClickListener;
    lastPageX;
    lastPageY;
    preventVisibleChangePropagation;
    maximized;
    preMaximizeContentHeight;
    preMaximizeContainerWidth;
    preMaximizeContainerHeight;
    preMaximizePageX;
    preMaximizePageY;
    id = UniqueComponentId();
    _style = {};
    _position = 'center';
    originalStyle;
    transformOptions = 'scale(0.7)';
    styleElement;
    window;
    constructor(document, platformId, el, renderer, zone, cd, config) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.cd = cd;
        this.config = config;
        this.window = this.document.defaultView;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                case 'maximizeicon':
                    this.maximizeIconTemplate = item.template;
                    break;
                case 'minimizeicon':
                    this.minimizeIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        if (this.breakpoints) {
            this.createStyle();
        }
    }
    getAriaLabelledBy() {
        return this.header !== null ? UniqueComponentId() + '_header' : null;
    }
    focus() {
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    close(event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (this.closable && this.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.close(event);
                }
            });
        }
        if (this.modal) {
            DomHandler.addClass(this.document.body, 'p-overflow-hidden');
        }
    }
    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }
            if (this.modal) {
                DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
            }
            if (!this.cd.destroyed) {
                this.cd.detectChanges();
            }
        }
    }
    maximize() {
        this.maximized = !this.maximized;
        if (!this.modal && !this.blockScroll) {
            if (this.maximized)
                DomHandler.addClass(this.document.body, 'p-overflow-hidden');
            else
                DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }
        this.onMaximize.emit({ maximized: this.maximized });
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal);
            this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1);
        }
    }
    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.styleElement = this.renderer.createElement('style');
                this.styleElement.type = 'text/css';
                this.renderer.appendChild(this.document.head, this.styleElement);
                let innerHTML = '';
                for (let breakpoint in this.breakpoints) {
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-dialog[${this.id}]:not(.p-dialog-maximized) {
                                width: ${this.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
                }
                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
            }
        }
    }
    initDrag(event) {
        if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.container.style.margin = '0';
            DomHandler.addClass(this.document.body, 'p-unselectable-text');
        }
    }
    onKeydown(event) {
        if (this.focusTrap) {
            if (event.which === 9) {
                event.preventDefault();
                let focusableElements = DomHandler.getFocusableElements(this.container);
                if (focusableElements && focusableElements.length > 0) {
                    if (!focusableElements[0].ownerDocument.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
                        if (event.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === focusableElements.length - 1)
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        }
    }
    onDrag(event) {
        if (this.dragging) {
            const containerWidth = DomHandler.getOuterWidth(this.container);
            const containerHeight = DomHandler.getOuterHeight(this.container);
            const deltaX = event.pageX - this.lastPageX;
            const deltaY = event.pageY - this.lastPageY;
            const offset = this.container.getBoundingClientRect();
            const containerComputedStyle = getComputedStyle(this.container);
            const leftMargin = parseFloat(containerComputedStyle.marginLeft);
            const topMargin = parseFloat(containerComputedStyle.marginTop);
            const leftPos = offset.left + deltaX - leftMargin;
            const topPos = offset.top + deltaY - topMargin;
            const viewport = DomHandler.getViewport();
            this.container.style.position = 'fixed';
            if (this.keepInViewport) {
                if (leftPos >= this.minX && leftPos + containerWidth < viewport.width) {
                    this._style.left = `${leftPos}px`;
                    this.lastPageX = event.pageX;
                    this.container.style.left = `${leftPos}px`;
                }
                if (topPos >= this.minY && topPos + containerHeight < viewport.height) {
                    this._style.top = `${topPos}px`;
                    this.lastPageY = event.pageY;
                    this.container.style.top = `${topPos}px`;
                }
            }
            else {
                this.lastPageX = event.pageX;
                this.container.style.left = `${leftPos}px`;
                this.lastPageY = event.pageY;
                this.container.style.top = `${leftPos}px`;
            }
        }
    }
    endDrag(event) {
        if (this.dragging) {
            this.dragging = false;
            DomHandler.removeClass(this.document.body, 'p-unselectable-text');
            this.cd.detectChanges();
            this.onDragEnd.emit(event);
        }
    }
    resetPosition() {
        this.container.style.position = '';
        this.container.style.left = '';
        this.container.style.top = '';
        this.container.style.margin = '';
    }
    //backward compatibility
    center() {
        this.resetPosition();
    }
    initResize(event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(this.document.body, 'p-unselectable-text');
            this.onResizeInit.emit(event);
        }
    }
    onResize(event) {
        if (this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight(this.contentViewChild?.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = this.container.style.minWidth;
            let minHeight = this.container.style.minHeight;
            let offset = this.container.getBoundingClientRect();
            let viewport = DomHandler.getViewport();
            let hasBeenDragged = !parseInt(this.container.style.top) || !parseInt(this.container.style.left);
            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }
            if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
                this._style.width = newWidth + 'px';
                this.container.style.width = this._style.width;
            }
            if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
                this.contentViewChild.nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';
                if (this._style.height) {
                    this._style.height = newHeight + 'px';
                    this.container.style.height = this._style.height;
                }
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    resizeEnd(event) {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(this.document.body, 'p-unselectable-text');
            this.onResizeEnd.emit(event);
        }
    }
    bindGlobalListeners() {
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }
    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    }
    bindDocumentDragListener() {
        if (!this.documentDragListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragListener = this.renderer.listen(this.window, 'mousemove', this.onDrag.bind(this));
            });
        }
    }
    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    }
    bindDocumentDragEndListener() {
        if (!this.documentDragEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragEndListener = this.renderer.listen(this.window, 'mouseup', this.endDrag.bind(this));
            });
        }
    }
    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            this.documentDragEndListener();
            this.documentDragEndListener = null;
        }
    }
    bindDocumentResizeListeners() {
        if (!this.documentResizeListener && !this.documentResizeEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentResizeListener = this.renderer.listen(this.window, 'mousemove', this.onResize.bind(this));
                this.documentResizeEndListener = this.renderer.listen(this.window, 'mouseup', this.resizeEnd.bind(this));
            });
        }
    }
    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }
    bindDocumentEscapeListener() {
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                this.close(event);
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                this.renderer.appendChild(this.document.body, this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.wrapper);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container?.parentElement;
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.container?.setAttribute(this.id, '');
                if (this.modal) {
                    this.enableModality();
                }
                if (!this.modal && this.blockScroll) {
                    DomHandler.addClass(this.document.body, 'p-overflow-hidden');
                }
                if (this.focusOnShow) {
                    this.focus();
                }
                break;
            case 'void':
                if (this.wrapper && this.modal) {
                    DomHandler.addClass(this.wrapper, 'p-component-overlay-leave');
                }
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                this.cd.markForCheck();
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }
    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;
        this.maskVisible = false;
        if (this.maximized) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
            this.maximized = false;
        }
        if (this.modal) {
            this.disableModality();
        }
        if (this.blockScroll) {
            DomHandler.removeClass(this.document.body, 'p-overflow-hidden');
        }
        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }
        this.container = null;
        this.wrapper = null;
        this._style = this.originalStyle ? { ...this.originalStyle } : {};
    }
    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
        this.destroyStyle();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Dialog, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Dialog, selector: "p-dialog", inputs: { header: "header", draggable: "draggable", resizable: "resizable", positionLeft: "positionLeft", positionTop: "positionTop", contentStyle: "contentStyle", contentStyleClass: "contentStyleClass", modal: "modal", closeOnEscape: "closeOnEscape", dismissableMask: "dismissableMask", rtl: "rtl", closable: "closable", responsive: "responsive", appendTo: "appendTo", breakpoints: "breakpoints", styleClass: "styleClass", maskStyleClass: "maskStyleClass", showHeader: "showHeader", breakpoint: "breakpoint", blockScroll: "blockScroll", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", minX: "minX", minY: "minY", focusOnShow: "focusOnShow", maximizable: "maximizable", keepInViewport: "keepInViewport", focusTrap: "focusTrap", transitionOptions: "transitionOptions", closeIcon: "closeIcon", closeAriaLabel: "closeAriaLabel", closeTabindex: "closeTabindex", minimizeIcon: "minimizeIcon", maximizeIcon: "maximizeIcon", visible: "visible", style: "style", position: "position" }, outputs: { onShow: "onShow", onHide: "onHide", visibleChange: "visibleChange", onResizeInit: "onResizeInit", onResizeEnd: "onResizeEnd", onDragEnd: "onDragEnd", onMaximize: "onMaximize" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "headerViewChild", first: true, predicate: ["titlebar"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }, { propertyName: "footerViewChild", first: true, predicate: ["footer"], descendants: true }], ngImport: i0, template: `
        <div
            *ngIf="maskVisible"
            [class]="maskStyleClass"
            [ngClass]="{
                'p-dialog-mask': true,
                'p-component-overlay p-component-overlay-enter': this.modal,
                'p-dialog-mask-scrollblocker': this.modal || this.blockScroll,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'
            }"
        >
            <div
                #container
                [ngClass]="{ 'p-dialog p-component': true, 'p-dialog-rtl': rtl, 'p-dialog-draggable': draggable, 'p-dialog-resizable': resizable, 'p-dialog-maximized': maximized }"
                [ngStyle]="style"
                [class]="styleClass"
                *ngIf="visible"
                pFocusTrap
                [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="dialog"
                [attr.aria-labelledby]="getAriaLabelledBy()"
                [attr.aria-modal]="true"
            >
                <div *ngIf="resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="!headerFacet && !headerTemplate">{{ header }}</span>
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" role="button" type="button" [ngClass]="{ 'p-dialog-header-icon p-dialog-header-maximize p-link': true }" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span *ngIf="maximizeIcon && !maximizeIconTemplate && !minimizeIconTemplate" class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                            <ng-container *ngIf="!maximizeIcon">
                                <WindowMaximizeIcon *ngIf="!maximized && !maximizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                                <WindowMinimizeIcon *ngIf="maximized && !minimizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                            </ng-container>
                            <ng-container *ngIf="!maximized">
                                <ng-template *ngTemplateOutlet="maximizeIconTemplate"></ng-template>
                            </ng-container>
                            <ng-container *ngIf="maximized">
                                <ng-template *ngTemplateOutlet="minimizeIconTemplate"></ng-template>
                            </ng-container>
                        </button>
                        <button
                            *ngIf="closable"
                            type="button"
                            [ngClass]="{ 'p-dialog-header-icon p-dialog-header-close p-link': true }"
                            [attr.aria-label]="closeAriaLabel"
                            (click)="close($event)"
                            (keydown.enter)="close($event)"
                            [attr.tabindex]="closeTabindex"
                            pRipple
                        >
                            <ng-container *ngIf="!closeIconTemplate">
                                <span *ngIf="closeIcon" class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
                                <TimesIcon *ngIf="!closeIcon" [styleClass]="'p-dialog-header-close-icon'" />
                            </ng-container>
                            <span *ngIf="closeIconTemplate">
                                <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                            </span>
                        </button>
                    </div>
                </div>
                <div #content [ngClass]="'p-dialog-content'" [ngStyle]="contentStyle" [class]="contentStyleClass">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer class="p-dialog-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `, isInline: true, styles: [".p-dialog-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:none}.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;pointer-events:auto;max-height:90%;transform:scale(1);position:relative}.p-dialog-content{overflow-y:auto;flex-grow:1}.p-dialog-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.p-dialog-draggable .p-dialog-header{cursor:move}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{display:flex;align-items:center}.p-dialog .p-dialog-header-icon{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-top .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{transition:none;transform:none;width:100vw!important;height:100vh!important;top:0!important;left:0!important;max-height:100%;height:100%}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start;align-items:flex-start}.p-dialog-top-right{justify-content:flex-end;align-items:flex-start}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{justify-content:flex-start;align-items:flex-end}.p-dialog-bottom-right{justify-content:flex-end;align-items:flex-end}.p-dialog .p-resizable-handle{position:absolute;font-size:.1px;display:block;cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.p-confirm-dialog .p-dialog-content{display:flex;align-items:center}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.FocusTrap; }), selector: "[pFocusTrap]", inputs: ["pFocusTrapDisabled"] }, { kind: "directive", type: i0.forwardRef(function () { return i4.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return TimesIcon; }), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(function () { return WindowMaximizeIcon; }), selector: "WindowMaximizeIcon" }, { kind: "component", type: i0.forwardRef(function () { return WindowMinimizeIcon; }), selector: "WindowMinimizeIcon" }], animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Dialog };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Dialog, decorators: [{
            type: Component,
            args: [{ selector: 'p-dialog', template: `
        <div
            *ngIf="maskVisible"
            [class]="maskStyleClass"
            [ngClass]="{
                'p-dialog-mask': true,
                'p-component-overlay p-component-overlay-enter': this.modal,
                'p-dialog-mask-scrollblocker': this.modal || this.blockScroll,
                'p-dialog-left': position === 'left',
                'p-dialog-right': position === 'right',
                'p-dialog-top': position === 'top',
                'p-dialog-top-left': position === 'topleft' || position === 'top-left',
                'p-dialog-top-right': position === 'topright' || position === 'top-right',
                'p-dialog-bottom': position === 'bottom',
                'p-dialog-bottom-left': position === 'bottomleft' || position === 'bottom-left',
                'p-dialog-bottom-right': position === 'bottomright' || position === 'bottom-right'
            }"
        >
            <div
                #container
                [ngClass]="{ 'p-dialog p-component': true, 'p-dialog-rtl': rtl, 'p-dialog-draggable': draggable, 'p-dialog-resizable': resizable, 'p-dialog-maximized': maximized }"
                [ngStyle]="style"
                [class]="styleClass"
                *ngIf="visible"
                pFocusTrap
                [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                role="dialog"
                [attr.aria-labelledby]="getAriaLabelledBy()"
                [attr.aria-modal]="true"
            >
                <div *ngIf="resizable" class="p-resizable-handle" style="z-index: 90;" (mousedown)="initResize($event)"></div>
                <div #titlebar class="p-dialog-header" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="!headerFacet && !headerTemplate">{{ header }}</span>
                    <span [id]="getAriaLabelledBy()" class="p-dialog-title" *ngIf="headerFacet">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <div class="p-dialog-header-icons">
                        <button *ngIf="maximizable" role="button" type="button" [ngClass]="{ 'p-dialog-header-icon p-dialog-header-maximize p-link': true }" (click)="maximize()" (keydown.enter)="maximize()" tabindex="-1" pRipple>
                            <span *ngIf="maximizeIcon && !maximizeIconTemplate && !minimizeIconTemplate" class="p-dialog-header-maximize-icon" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                            <ng-container *ngIf="!maximizeIcon">
                                <WindowMaximizeIcon *ngIf="!maximized && !maximizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                                <WindowMinimizeIcon *ngIf="maximized && !minimizeIconTemplate" [styleClass]="'p-dialog-header-maximize-icon'" />
                            </ng-container>
                            <ng-container *ngIf="!maximized">
                                <ng-template *ngTemplateOutlet="maximizeIconTemplate"></ng-template>
                            </ng-container>
                            <ng-container *ngIf="maximized">
                                <ng-template *ngTemplateOutlet="minimizeIconTemplate"></ng-template>
                            </ng-container>
                        </button>
                        <button
                            *ngIf="closable"
                            type="button"
                            [ngClass]="{ 'p-dialog-header-icon p-dialog-header-close p-link': true }"
                            [attr.aria-label]="closeAriaLabel"
                            (click)="close($event)"
                            (keydown.enter)="close($event)"
                            [attr.tabindex]="closeTabindex"
                            pRipple
                        >
                            <ng-container *ngIf="!closeIconTemplate">
                                <span *ngIf="closeIcon" class="p-dialog-header-close-icon" [ngClass]="closeIcon"></span>
                                <TimesIcon *ngIf="!closeIcon" [styleClass]="'p-dialog-header-close-icon'" />
                            </ng-container>
                            <span *ngIf="closeIconTemplate">
                                <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                            </span>
                        </button>
                    </div>
                </div>
                <div #content [ngClass]="'p-dialog-content'" [ngStyle]="contentStyle" [class]="contentStyleClass">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <div #footer class="p-dialog-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `, animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-dialog-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:none}.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;pointer-events:auto;max-height:90%;transform:scale(1);position:relative}.p-dialog-content{overflow-y:auto;flex-grow:1}.p-dialog-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.p-dialog-draggable .p-dialog-header{cursor:move}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{display:flex;align-items:center}.p-dialog .p-dialog-header-icon{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-top .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{transition:none;transform:none;width:100vw!important;height:100vh!important;top:0!important;left:0!important;max-height:100%;height:100%}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start;align-items:flex-start}.p-dialog-top-right{justify-content:flex-end;align-items:flex-start}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{justify-content:flex-start;align-items:flex-end}.p-dialog-bottom-right{justify-content:flex-end;align-items:flex-end}.p-dialog .p-resizable-handle{position:absolute;font-size:.1px;display:block;cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.p-confirm-dialog .p-dialog-content{display:flex;align-items:center}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1.PrimeNGConfig }]; }, propDecorators: { header: [{
                type: Input
            }], draggable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], positionLeft: [{
                type: Input
            }], positionTop: [{
                type: Input
            }], contentStyle: [{
                type: Input
            }], contentStyleClass: [{
                type: Input
            }], modal: [{
                type: Input
            }], closeOnEscape: [{
                type: Input
            }], dismissableMask: [{
                type: Input
            }], rtl: [{
                type: Input
            }], closable: [{
                type: Input
            }], responsive: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], breakpoints: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], maskStyleClass: [{
                type: Input
            }], showHeader: [{
                type: Input
            }], breakpoint: [{
                type: Input
            }], blockScroll: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], minX: [{
                type: Input
            }], minY: [{
                type: Input
            }], focusOnShow: [{
                type: Input
            }], maximizable: [{
                type: Input
            }], keepInViewport: [{
                type: Input
            }], focusTrap: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], closeIcon: [{
                type: Input
            }], closeAriaLabel: [{
                type: Input
            }], closeTabindex: [{
                type: Input
            }], minimizeIcon: [{
                type: Input
            }], maximizeIcon: [{
                type: Input
            }], visible: [{
                type: Input
            }], style: [{
                type: Input
            }], position: [{
                type: Input
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], visibleChange: [{
                type: Output
            }], onResizeInit: [{
                type: Output
            }], onResizeEnd: [{
                type: Output
            }], onDragEnd: [{
                type: Output
            }], onMaximize: [{
                type: Output
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], headerViewChild: [{
                type: ViewChild,
                args: ['titlebar']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], footerViewChild: [{
                type: ViewChild,
                args: ['footer']
            }] } });
class DialogModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: DialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: DialogModule, declarations: [Dialog], imports: [CommonModule, FocusTrapModule, RippleModule, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon], exports: [Dialog, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: DialogModule, imports: [CommonModule, FocusTrapModule, RippleModule, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon, SharedModule] });
}
export { DialogModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: DialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FocusTrapModule, RippleModule, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon],
                    exports: [Dialog, SharedModule],
                    declarations: [Dialog]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ILE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDNUUsT0FBTyxFQUVILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLGVBQWUsRUFFZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBSVIsTUFBTSxFQUNOLFdBQVcsRUFJWCxTQUFTLEVBQ1QsaUJBQWlCLEVBRXBCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFpQixhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRS9ELE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFl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LGtCQUFrQixFQUFFLGtCQUFrQixhQS8xQi9GLE1BQU0sRUFnMkJHLFlBQVk7d0dBR3JCLFlBQVksWUFKWCxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQ3RGLFlBQVk7O1NBR3JCLFlBQVk7MkZBQVosWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUM7b0JBQ3pHLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7b0JBQy9CLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmltYXRpb25FdmVudCwgYW5pbWF0ZSwgYW5pbWF0aW9uLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciwgdXNlQW5pbWF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBWaWV3UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9vdGVyLCBIZWFkZXIsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBGb2N1c1RyYXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL2ZvY3VzdHJhcCc7XG5pbXBvcnQgeyBUaW1lc0ljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RpbWVzJztcbmltcG9ydCB7IFdpbmRvd01heGltaXplSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvd2luZG93bWF4aW1pemUnO1xuaW1wb3J0IHsgV2luZG93TWluaW1pemVJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy93aW5kb3dtaW5pbWl6ZSc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBOdWxsYWJsZSwgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkLCBaSW5kZXhVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5jb25zdCBzaG93QW5pbWF0aW9uID0gYW5pbWF0aW9uKFtzdHlsZSh7IHRyYW5zZm9ybTogJ3t7dHJhbnNmb3JtfX0nLCBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCd7e3RyYW5zaXRpb259fScpXSk7XG5cbmNvbnN0IGhpZGVBbmltYXRpb24gPSBhbmltYXRpb24oW2FuaW1hdGUoJ3t7dHJhbnNpdGlvbn19Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybX19Jywgb3BhY2l0eTogMCB9KSldKTtcbi8qKlxuICogRGlhbG9nIGlzIGEgY29udGFpbmVyIHRvIGRpc3BsYXkgY29udGVudCBpbiBhbiBvdmVybGF5IHdpbmRvdy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1kaWFsb2cnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgICpuZ0lmPVwibWFza1Zpc2libGVcIlxuICAgICAgICAgICAgW2NsYXNzXT1cIm1hc2tTdHlsZUNsYXNzXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctbWFzayc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3AtY29tcG9uZW50LW92ZXJsYXkgcC1jb21wb25lbnQtb3ZlcmxheS1lbnRlcic6IHRoaXMubW9kYWwsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLW1hc2stc2Nyb2xsYmxvY2tlcic6IHRoaXMubW9kYWwgfHwgdGhpcy5ibG9ja1Njcm9sbCxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctbGVmdCc6IHBvc2l0aW9uID09PSAnbGVmdCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLXJpZ2h0JzogcG9zaXRpb24gPT09ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLXRvcCc6IHBvc2l0aW9uID09PSAndG9wJyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctdG9wLWxlZnQnOiBwb3NpdGlvbiA9PT0gJ3RvcGxlZnQnIHx8IHBvc2l0aW9uID09PSAndG9wLWxlZnQnLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy10b3AtcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ3RvcHJpZ2h0JyB8fCBwb3NpdGlvbiA9PT0gJ3RvcC1yaWdodCcsXG4gICAgICAgICAgICAgICAgJ3AtZGlhbG9nLWJvdHRvbSc6IHBvc2l0aW9uID09PSAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAncC1kaWFsb2ctYm90dG9tLWxlZnQnOiBwb3NpdGlvbiA9PT0gJ2JvdHRvbWxlZnQnIHx8IHBvc2l0aW9uID09PSAnYm90dG9tLWxlZnQnLFxuICAgICAgICAgICAgICAgICdwLWRpYWxvZy1ib3R0b20tcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ2JvdHRvbXJpZ2h0JyB8fCBwb3NpdGlvbiA9PT0gJ2JvdHRvbS1yaWdodCdcbiAgICAgICAgICAgIH1cIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgI2NvbnRhaW5lclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGlhbG9nIHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtZGlhbG9nLXJ0bCc6IHJ0bCwgJ3AtZGlhbG9nLWRyYWdnYWJsZSc6IGRyYWdnYWJsZSwgJ3AtZGlhbG9nLXJlc2l6YWJsZSc6IHJlc2l6YWJsZSwgJ3AtZGlhbG9nLW1heGltaXplZCc6IG1heGltaXplZCB9XCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwidmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgcEZvY3VzVHJhcFxuICAgICAgICAgICAgICAgIFtwRm9jdXNUcmFwRGlzYWJsZWRdPVwiZm9jdXNUcmFwID09PSBmYWxzZVwiXG4gICAgICAgICAgICAgICAgW0BhbmltYXRpb25dPVwieyB2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHsgdHJhbnNmb3JtOiB0cmFuc2Zvcm1PcHRpb25zLCB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uT3B0aW9ucyB9IH1cIlxuICAgICAgICAgICAgICAgIChAYW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKEBhbmltYXRpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiZ2V0QXJpYUxhYmVsbGVkQnkoKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1tb2RhbF09XCJ0cnVlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVzaXphYmxlXCIgY2xhc3M9XCJwLXJlc2l6YWJsZS1oYW5kbGVcIiBzdHlsZT1cInotaW5kZXg6IDkwO1wiIChtb3VzZWRvd24pPVwiaW5pdFJlc2l6ZSgkZXZlbnQpXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAjdGl0bGViYXIgY2xhc3M9XCJwLWRpYWxvZy1oZWFkZXJcIiAobW91c2Vkb3duKT1cImluaXREcmFnKCRldmVudClcIiAqbmdJZj1cInNob3dIZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2lkXT1cImdldEFyaWFMYWJlbGxlZEJ5KClcIiBjbGFzcz1cInAtZGlhbG9nLXRpdGxlXCIgKm5nSWY9XCIhaGVhZGVyRmFjZXQgJiYgIWhlYWRlclRlbXBsYXRlXCI+e3sgaGVhZGVyIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbaWRdPVwiZ2V0QXJpYUxhYmVsbGVkQnkoKVwiIGNsYXNzPVwicC1kaWFsb2ctdGl0bGVcIiAqbmdJZj1cImhlYWRlckZhY2V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGlhbG9nLWhlYWRlci1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cIm1heGltaXphYmxlXCIgcm9sZT1cImJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBbbmdDbGFzc109XCJ7ICdwLWRpYWxvZy1oZWFkZXItaWNvbiBwLWRpYWxvZy1oZWFkZXItbWF4aW1pemUgcC1saW5rJzogdHJ1ZSB9XCIgKGNsaWNrKT1cIm1heGltaXplKClcIiAoa2V5ZG93bi5lbnRlcik9XCJtYXhpbWl6ZSgpXCIgdGFiaW5kZXg9XCItMVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtYXhpbWl6ZUljb24gJiYgIW1heGltaXplSWNvblRlbXBsYXRlICYmICFtaW5pbWl6ZUljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1kaWFsb2ctaGVhZGVyLW1heGltaXplLWljb25cIiBbbmdDbGFzc109XCJtYXhpbWl6ZWQgPyBtaW5pbWl6ZUljb24gOiBtYXhpbWl6ZUljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtYXhpbWl6ZUljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFdpbmRvd01heGltaXplSWNvbiAqbmdJZj1cIiFtYXhpbWl6ZWQgJiYgIW1heGltaXplSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtZGlhbG9nLWhlYWRlci1tYXhpbWl6ZS1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxXaW5kb3dNaW5pbWl6ZUljb24gKm5nSWY9XCJtYXhpbWl6ZWQgJiYgIW1pbmltaXplSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtZGlhbG9nLWhlYWRlci1tYXhpbWl6ZS1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtYXhpbWl6ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibWF4aW1pemVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtYXhpbWl6ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibWluaW1pemVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJjbG9zYWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1kaWFsb2ctaGVhZGVyLWljb24gcC1kaWFsb2ctaGVhZGVyLWNsb3NlIHAtbGluayc6IHRydWUgfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjbG9zZUFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImNsb3NlVGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBSaXBwbGVcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNsb3NlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2xvc2VJY29uXCIgY2xhc3M9XCJwLWRpYWxvZy1oZWFkZXItY2xvc2UtaWNvblwiIFtuZ0NsYXNzXT1cImNsb3NlSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjbG9zZUljb25cIiBbc3R5bGVDbGFzc109XCIncC1kaWFsb2ctaGVhZGVyLWNsb3NlLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNsb3NlSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNsb3NlSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBbbmdDbGFzc109XCIncC1kaWFsb2ctY29udGVudCdcIiBbbmdTdHlsZV09XCJjb250ZW50U3R5bGVcIiBbY2xhc3NdPVwiY29udGVudFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAjZm9vdGVyIGNsYXNzPVwicC1kaWFsb2ctZm9vdGVyXCIgKm5nSWY9XCJmb290ZXJGYWNldCB8fCBmb290ZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbdHJpZ2dlcignYW5pbWF0aW9uJywgW3RyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFt1c2VBbmltYXRpb24oc2hvd0FuaW1hdGlvbildKSwgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgW3VzZUFuaW1hdGlvbihoaWRlQW5pbWF0aW9uKV0pXSldLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4uL2RpYWxvZy9kaWFsb2cuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBUaXRsZSB0ZXh0IG9mIHRoZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBkcmFnZ2luZyB0byBjaGFuZ2UgdGhlIHBvc2l0aW9uIHVzaW5nIGhlYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgcmVzaXppbmcgb2YgdGhlIGNvbnRlbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVzaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBsZWZ0IG9mZnNldCBvZiBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgcG9zaXRpb25MZWZ0IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHBvc2l0aW9uTGVmdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgc2V0IHBvc2l0aW9uTGVmdChfcG9zaXRpb25MZWZ0OiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Bvc2l0aW9uTGVmdCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSB0b3Agb2Zmc2V0IG9mIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBwb3NpdGlvblRvcCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBwb3NpdGlvblRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgc2V0IHBvc2l0aW9uVG9wKF9wb3NpdGlvblRvcDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb3NpdGlvblRvcCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdHlsZSBvZiB0aGUgY29udGVudCBzZWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZTogYW55O1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb250ZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBiYWNrZ3JvdW5kIHNob3VsZCBiZSBibG9ja2VkIHdoZW4gZGlhbG9nIGlzIGRpc3BsYXllZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtb2RhbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyBpZiBwcmVzc2luZyBlc2NhcGUga2V5IHNob3VsZCBoaWRlIHRoZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2xvc2VPbkVzY2FwZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogU3BlY2lmaWVzIGlmIGNsaWNraW5nIHRoZSBtb2RhbCBiYWNrZ3JvdW5kIHNob3VsZCBoaWRlIHRoZSBkaWFsb2cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzbWlzc2FibGVNYXNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkIGRpYWxvZyBpcyBkaXNwbGF5ZWQgaW4gUlRMIGRpcmVjdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBydGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBBZGRzIGEgY2xvc2UgaWNvbiB0byB0aGUgaGVhZGVyIHRvIGhpZGUgdGhlIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiB0aGUgY29tcG9uZW50IGlzIHJlc3BvbnNpdmUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgUmVzcG9uc2l2ZSBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldCByZXNwb25zaXZlKF9yZXNwb25zaXZlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXNwb25zaXZlIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRhcmdldCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgZGlhbG9nLCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfCBhbnk7XG4gICAgLyoqXG4gICAgICogT2JqZWN0IGxpdGVyYWwgdG8gZGVmaW5lIHdpZHRocyBwZXIgc2NyZWVuIHNpemUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYnJlYWtwb2ludHM6IGFueTtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgbWFzay5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtYXNrU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgaGVhZGVyIG9yIG5vdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93SGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBicmVha3BvaW50IG9mIHRoZSBjb21wb25lbnQgcmVzcG9uc2l2ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKiBAZGVwcmVjYXRlZCBCcmVha3BvaW50IHByb3BlcnR5IGlzIG5vdCB1dGlsaXplZCBhbmQgZGVwcmVjYXRlZC4gVXNlIGJyZWFrcG9pbnRzIG9yIENTUyBtZWRpYSBxdWVyaWVzIGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGJyZWFrcG9pbnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDY0OTtcbiAgICB9XG4gICAgc2V0IGJyZWFrcG9pbnQoX2JyZWFrcG9pbnQ6IG51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZygnQnJlYWtwb2ludCBwcm9wZXJ0eSBpcyBub3QgdXRpbGl6ZWQgYW5kIGRlcHJlY2F0ZWQsIHVzZSBicmVha3BvaW50cyBvciBDU1MgbWVkaWEgcXVlcmllcyBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGJhY2tncm91bmQgc2Nyb2xsIHNob3VsZCBiZSBibG9ja2VkIHdoZW4gZGlhbG9nIGlzIHZpc2libGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYmxvY2tTY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgbWFuYWdlIGxheWVyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEJhc2UgekluZGV4IHZhbHVlIHRvIHVzZSBpbiBsYXllcmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIE1pbmltdW0gdmFsdWUgZm9yIHRoZSBsZWZ0IGNvb3JkaW5hdGUgb2YgZGlhbG9nIGluIGRyYWdnaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1pblg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogTWluaW11bSB2YWx1ZSBmb3IgdGhlIHRvcCBjb29yZGluYXRlIG9mIGRpYWxvZyBpbiBkcmFnZ2luZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtaW5ZOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgZmlyc3QgYnV0dG9uIHJlY2VpdmVzIGZvY3VzIG9uIHNob3cuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZm9jdXNPblNob3c6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGRpYWxvZyBjYW4gYmUgZGlzcGxheWVkIGZ1bGwgc2NyZWVuLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heGltaXphYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogS2VlcHMgZGlhbG9nIGluIHRoZSB2aWV3cG9ydC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBrZWVwSW5WaWV3cG9ydDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBjYW4gb25seSBmb2N1cyBvbiBlbGVtZW50cyBpbnNpZGUgdGhlIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmb2N1c1RyYXA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGNsb3NlIGljb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2xvc2VJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgY2xvc2UgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNsb3NlQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGNsb3NlIGJ1dHRvbiBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNsb3NlVGFiaW5kZXg6IHN0cmluZyA9ICctMSc7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgbWluaW1pemUgaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtaW5pbWl6ZUljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBtYXhpbWl6ZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1heGltaXplSWNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZGlhbG9nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG4gICAgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlICYmICF0aGlzLm1hc2tWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc3R5bGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgIH1cbiAgICBzZXQgc3R5bGUodmFsdWU6IGFueSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0geyAuLi52YWx1ZSB9O1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgdGhlIGRpYWxvZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgcG9zaXRpb24oKTogJ2NlbnRlcicgfCAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3BsZWZ0JyB8ICd0b3ByaWdodCcgfCAnYm90dG9tbGVmdCcgfCAnYm90dG9tcmlnaHQnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICAgIH1cbiAgICBzZXQgcG9zaXRpb24odmFsdWU6ICdjZW50ZXInIHwgJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wbGVmdCcgfCAndG9wcmlnaHQnIHwgJ2JvdHRvbWxlZnQnIHwgJ2JvdHRvbXJpZ2h0Jykge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSAndHJhbnNsYXRlM2QoLTEwMCUsIDBweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3ByaWdodCc6XG4gICAgICAgICAgICBjYXNlICdib3R0b21yaWdodCc6XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gJ3RyYW5zbGF0ZTNkKDEwMCUsIDBweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9ICd0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweCknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSAndHJhbnNsYXRlM2QoMHB4LCAtMTAwJSwgMHB4KSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9ICdzY2FsZSgwLjcpJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkaWFsb2cgaXMgc2hvd24uXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBkaWFsb2cgaXMgaGlkZGVuLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgLyoqXG4gICAgICogVGhpcyBFdmVudEVtaXR0ZXIgaXMgdXNlZCB0byBub3RpZnkgY2hhbmdlcyBpbiB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlIC0gTmV3IHZhbHVlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZGlhbG9nIHJlc2l6aW5nIGlzIGluaXRpYXRlZC5cbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IC0gTW91c2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUmVzaXplSW5pdDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRpYWxvZyByZXNpemluZyBpcyBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCAtIE1vdXNlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJlc2l6ZUVuZDogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRpYWxvZyBkcmFnZ2luZyBpcyBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtEcmFnRXZlbnR9IGV2ZW50IC0gRHJhZyBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25EcmFnRW5kOiBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RHJhZ0V2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRpYWxvZyBtYXhpbWl6ZWQgb3IgdW5tYXhpbWl6ZWQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uTWF4aW1pemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyRmFjZXQ6IFF1ZXJ5TGlzdDxIZWFkZXI+IHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlckZhY2V0OiBRdWVyeUxpc3Q8Rm9vdGVyPiB8IHVuZGVmaW5lZDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCd0aXRsZWJhcicpIGhlYWRlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdmb290ZXInKSBmb290ZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1heGltaXplSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGNsb3NlSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG1pbmltaXplSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIF92aXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBtYXNrVmlzaWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRhaW5lcjogTnVsbGFibGU8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgd3JhcHBlcjogTnVsbGFibGU8SFRNTEVsZW1lbnQ+O1xuXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBkb2N1bWVudERyYWdMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZG9jdW1lbnREcmFnRW5kTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHJlc2l6aW5nOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgbWFza0NsaWNrTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGxhc3RQYWdlWDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgbGFzdFBhZ2VZOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBwcmV2ZW50VmlzaWJsZUNoYW5nZVByb3BhZ2F0aW9uOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgbWF4aW1pemVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJlTWF4aW1pemVDb250ZW50SGVpZ2h0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBwcmVNYXhpbWl6ZUNvbnRhaW5lcldpZHRoOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBwcmVNYXhpbWl6ZUNvbnRhaW5lckhlaWdodDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJlTWF4aW1pemVQYWdlWDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgcHJlTWF4aW1pemVQYWdlWTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgaWQ6IHN0cmluZyA9IFVuaXF1ZUNvbXBvbmVudElkKCk7XG5cbiAgICBfc3R5bGU6IGFueSA9IHt9O1xuXG4gICAgX3Bvc2l0aW9uOiAnY2VudGVyJyB8ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcGxlZnQnIHwgJ3RvcHJpZ2h0JyB8ICdib3R0b21sZWZ0JyB8ICdib3R0b21yaWdodCcgPSAnY2VudGVyJztcblxuICAgIG9yaWdpbmFsU3R5bGU6IGFueTtcblxuICAgIHRyYW5zZm9ybU9wdGlvbnM6IGFueSA9ICdzY2FsZSgwLjcpJztcblxuICAgIHN0eWxlRWxlbWVudDogYW55O1xuXG4gICAgcHJpdmF0ZSB3aW5kb3c6IFdpbmRvdztcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcpIHtcbiAgICAgICAgdGhpcy53aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbG9zZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtYXhpbWl6ZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1heGltaXplSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtaW5pbWl6ZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pbmltaXplSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3R5bGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFyaWFMYWJlbGxlZEJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXIgIT09IG51bGwgPyBVbmlxdWVDb21wb25lbnRJZCgpICsgJ19oZWFkZXInIDogbnVsbDtcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgbGV0IGZvY3VzYWJsZSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lciwgJ1thdXRvZm9jdXNdJyk7XG4gICAgICAgIGlmIChmb2N1c2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBmb2N1c2FibGUuZm9jdXMoKSwgNSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZW5hYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NhYmxlICYmIHRoaXMuZGlzbWlzc2FibGVNYXNrKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy53cmFwcGVyLCAnbW91c2Vkb3duJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy53cmFwcGVyICYmIHRoaXMud3JhcHBlci5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZShldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZU1vZGFsaXR5KCkge1xuICAgICAgICBpZiAodGhpcy53cmFwcGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXNtaXNzYWJsZU1hc2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISh0aGlzLmNkIGFzIFZpZXdSZWYpLmRlc3Ryb3llZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWF4aW1pemUoKSB7XG4gICAgICAgIHRoaXMubWF4aW1pemVkID0gIXRoaXMubWF4aW1pemVkO1xuXG4gICAgICAgIGlmICghdGhpcy5tb2RhbCAmJiAhdGhpcy5ibG9ja1Njcm9sbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4aW1pemVkKSBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICBlbHNlIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25NYXhpbWl6ZS5lbWl0KHsgbWF4aW1pemVkOiB0aGlzLm1heGltaXplZCB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWFza0NsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU9uVG9wKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ21vZGFsJywgdGhpcy5jb250YWluZXIsIHRoaXMuYmFzZVpJbmRleCArIHRoaXMuY29uZmlnLnpJbmRleC5tb2RhbCk7XG4gICAgICAgICAgICAodGhpcy53cmFwcGVyIGFzIEhUTUxFbGVtZW50KS5zdHlsZS56SW5kZXggPSBTdHJpbmcocGFyc2VJbnQoKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS56SW5kZXgsIDEwKSAtIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlU3R5bGUoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBsZXQgaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYnJlYWtwb2ludCBpbiB0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke2JyZWFrcG9pbnR9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnAtZGlhbG9nWyR7dGhpcy5pZH1dOm5vdCgucC1kaWFsb2ctbWF4aW1pemVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAke3RoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF19ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5zdHlsZUVsZW1lbnQsICdpbm5lckhUTUwnLCBpbm5lckhUTUwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdERyYWcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1kaWFsb2ctaGVhZGVyLWljb24nKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5wYXJlbnRFbGVtZW50LCAncC1kaWFsb2ctaGVhZGVyLWljb24nKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuXG4gICAgICAgICAgICAodGhpcy5jb250YWluZXIgYXMgSFRNTERpdkVsZW1lbnQpLnN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzVHJhcCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSA5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHModGhpcy5jb250YWluZXIgYXMgSFRNTERpdkVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzICYmIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb2N1c2FibGVFbGVtZW50c1swXS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNlZEluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMuaW5kZXhPZihmb2N1c2FibGVFbGVtZW50c1swXS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gMCkgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEgfHwgZm9jdXNlZEluZGV4ID09PSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxKSBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNlZEluZGV4ICsgMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZyhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVggPSBldmVudC5wYWdlWCAtICh0aGlzLmxhc3RQYWdlWCBhcyBudW1iZXIpO1xuICAgICAgICAgICAgY29uc3QgZGVsdGFZID0gZXZlbnQucGFnZVkgLSAodGhpcy5sYXN0UGFnZVkgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGNvbnN0IGxlZnRNYXJnaW4gPSBwYXJzZUZsb2F0KGNvbnRhaW5lckNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCk7XG4gICAgICAgICAgICBjb25zdCB0b3BNYXJnaW4gPSBwYXJzZUZsb2F0KGNvbnRhaW5lckNvbXB1dGVkU3R5bGUubWFyZ2luVG9wKTtcblxuICAgICAgICAgICAgY29uc3QgbGVmdFBvcyA9IG9mZnNldC5sZWZ0ICsgZGVsdGFYIC0gbGVmdE1hcmdpbjtcbiAgICAgICAgICAgIGNvbnN0IHRvcFBvcyA9IG9mZnNldC50b3AgKyBkZWx0YVkgLSB0b3BNYXJnaW47XG4gICAgICAgICAgICBjb25zdCB2aWV3cG9ydCA9IERvbUhhbmRsZXIuZ2V0Vmlld3BvcnQoKTtcblxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5rZWVwSW5WaWV3cG9ydCkge1xuICAgICAgICAgICAgICAgIGlmIChsZWZ0UG9zID49IHRoaXMubWluWCAmJiBsZWZ0UG9zICsgY29udGFpbmVyV2lkdGggPCB2aWV3cG9ydC53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZS5sZWZ0ID0gYCR7bGVmdFBvc31weGA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHtsZWZ0UG9zfXB4YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodG9wUG9zID49IHRoaXMubWluWSAmJiB0b3BQb3MgKyBjb250YWluZXJIZWlnaHQgPCB2aWV3cG9ydC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUudG9wID0gYCR7dG9wUG9zfXB4YDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gYCR7dG9wUG9zfXB4YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9IGAke2xlZnRQb3N9cHhgO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gYCR7bGVmdFBvc31weGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmREcmFnKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLm9uRHJhZ0VuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0UG9zaXRpb24oKSB7XG4gICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICAgICAgKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5sZWZ0ID0gJyc7XG4gICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUudG9wID0gJyc7XG4gICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUubWFyZ2luID0gJyc7XG4gICAgfVxuXG4gICAgLy9iYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgY2VudGVyKCkge1xuICAgICAgICB0aGlzLnJlc2V0UG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBpbml0UmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZUluaXQuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZXNpemluZykge1xuICAgICAgICAgICAgbGV0IGRlbHRhWCA9IGV2ZW50LnBhZ2VYIC0gKHRoaXMubGFzdFBhZ2VYIGFzIG51bWJlcik7XG4gICAgICAgICAgICBsZXQgZGVsdGFZID0gZXZlbnQucGFnZVkgLSAodGhpcy5sYXN0UGFnZVkgYXMgbnVtYmVyKTtcbiAgICAgICAgICAgIGxldCBjb250YWluZXJXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgY29udGVudEhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250ZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBuZXdXaWR0aCA9IGNvbnRhaW5lcldpZHRoICsgZGVsdGFYO1xuICAgICAgICAgICAgbGV0IG5ld0hlaWdodCA9IGNvbnRhaW5lckhlaWdodCArIGRlbHRhWTtcbiAgICAgICAgICAgIGxldCBtaW5XaWR0aCA9ICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUubWluV2lkdGg7XG4gICAgICAgICAgICBsZXQgbWluSGVpZ2h0ID0gKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS5taW5IZWlnaHQ7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydCA9IERvbUhhbmRsZXIuZ2V0Vmlld3BvcnQoKTtcbiAgICAgICAgICAgIGxldCBoYXNCZWVuRHJhZ2dlZCA9ICFwYXJzZUludCgodGhpcy5jb250YWluZXIgYXMgSFRNTERpdkVsZW1lbnQpLnN0eWxlLnRvcCkgfHwgIXBhcnNlSW50KCh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUubGVmdCk7XG5cbiAgICAgICAgICAgIGlmIChoYXNCZWVuRHJhZ2dlZCkge1xuICAgICAgICAgICAgICAgIG5ld1dpZHRoICs9IGRlbHRhWDtcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgKz0gZGVsdGFZO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKCFtaW5XaWR0aCB8fCBuZXdXaWR0aCA+IHBhcnNlSW50KG1pbldpZHRoKSkgJiYgb2Zmc2V0LmxlZnQgKyBuZXdXaWR0aCA8IHZpZXdwb3J0LndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUud2lkdGggPSBuZXdXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgKHRoaXMuY29udGFpbmVyIGFzIEhUTUxEaXZFbGVtZW50KS5zdHlsZS53aWR0aCA9IHRoaXMuX3N0eWxlLndpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKCFtaW5IZWlnaHQgfHwgbmV3SGVpZ2h0ID4gcGFyc2VJbnQobWluSGVpZ2h0KSkgJiYgb2Zmc2V0LnRvcCArIG5ld0hlaWdodCA8IHZpZXdwb3J0LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLmNvbnRlbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gY29udGVudEhlaWdodCArIG5ld0hlaWdodCAtIGNvbnRhaW5lckhlaWdodCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3R5bGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlLmhlaWdodCA9IG5ld0hlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmNvbnRhaW5lciBhcyBIVE1MRGl2RWxlbWVudCkuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fc3R5bGUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemVFbmQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXppbmcpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXppbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZUVuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnREcmFnTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNpemFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jbG9zZU9uRXNjYXBlICYmIHRoaXMuY2xvc2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudERyYWdMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnREcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud2luZG93LCAnbW91c2Vtb3ZlJywgdGhpcy5vbkRyYWcuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50RHJhZ0VuZExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy53aW5kb3csICdtb3VzZXVwJywgdGhpcy5lbmREcmFnLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudERyYWdFbmRMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciAmJiAhdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMud2luZG93LCAnbW91c2Vtb3ZlJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLndpbmRvdywgJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUVuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgJiYgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6ICdkb2N1bWVudCc7XG5cbiAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29udGFpbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JykgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmJvZHksIHRoaXMud3JhcHBlcik7XG4gICAgICAgICAgICBlbHNlIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy53cmFwcGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IHRoaXMuY29udGFpbmVyPy5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlT25Ub3AoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lcj8uc2V0QXR0cmlidXRlKHRoaXMuaWQsICcnKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW9kYWwgJiYgdGhpcy5ibG9ja1Njcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3Atb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNPblNob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud3JhcHBlciAmJiB0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy53cmFwcGVyLCAncC1jb21wb25lbnQtb3ZlcmxheS1sZWF2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25Db250YWluZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpZGUuZW1pdCh7fSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TaG93LmVtaXQoe30pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db250YWluZXJEZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLm1heGltaXplZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdwLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgdGhpcy5tYXhpbWl6ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmxvY2tTY3JvbGwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIFpJbmRleFV0aWxzLmNsZWFyKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy53cmFwcGVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zdHlsZSA9IHRoaXMub3JpZ2luYWxTdHlsZSA/IHsgLi4udGhpcy5vcmlnaW5hbFN0eWxlIH0gOiB7fTtcbiAgICB9XG5cbiAgICBkZXN0cm95U3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUFwcGVuZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzdHJveVN0eWxlKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvY3VzVHJhcE1vZHVsZSwgUmlwcGxlTW9kdWxlLCBUaW1lc0ljb24sIFdpbmRvd01heGltaXplSWNvbiwgV2luZG93TWluaW1pemVJY29uXSxcbiAgICBleHBvcnRzOiBbRGlhbG9nLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0RpYWxvZ11cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nTW9kdWxlIHt9XG4iXX0=