import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, Inject, Input, NgModule, Output, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { RippleModule } from 'primeng/ripple';
import { ObjectUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
const INTERNAL_BUTTON_CLASSES = {
    button: 'p-button',
    component: 'p-component',
    iconOnly: 'p-button-icon-only',
    disabled: 'p-disabled',
    loading: 'p-button-loading',
    labelOnly: 'p-button-loading-label-only'
};
/**
 * Button directive is an extension to button component.
 * @group Components
 */
class ButtonDirective {
    el;
    document;
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'left';
    /**
     * Uses to pass attributes to the loading icon's DOM element.
     * @group Props
     */
    loadingIcon;
    /**
     * Text of the button.
     * @group Props
     */
    get label() {
        return this._label;
    }
    set label(val) {
        this._label = val;
        if (this.initialized) {
            this.updateLabel();
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Name of the icon.
     * @group Props
     */
    get icon() {
        return this._icon;
    }
    set icon(val) {
        this._icon = val;
        if (this.initialized) {
            this.updateIcon();
            this.setStyleClass();
        }
    }
    /**
     * Whether the button is in loading state.
     * @group Props
     */
    get loading() {
        return this._loading;
    }
    set loading(val) {
        this._loading = val;
        if (this.initialized) {
            this.updateIcon();
            this.setStyleClass();
        }
    }
    _label;
    _icon;
    _loading = false;
    initialized;
    get htmlElement() {
        return this.el.nativeElement;
    }
    _internalClasses = Object.values(INTERNAL_BUTTON_CLASSES);
    spinnerIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;
    constructor(el, document) {
        this.el = el;
        this.document = document;
    }
    ngAfterViewInit() {
        DomHandler.addMultipleClasses(this.htmlElement, this.getStyleClass().join(' '));
        this.createIcon();
        this.createLabel();
        this.initialized = true;
    }
    getStyleClass() {
        const styleClass = [INTERNAL_BUTTON_CLASSES.button, INTERNAL_BUTTON_CLASSES.component];
        if (this.icon && !this.label && ObjectUtils.isEmpty(this.htmlElement.textContent)) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.iconOnly);
        }
        if (this.loading) {
            styleClass.push(INTERNAL_BUTTON_CLASSES.disabled, INTERNAL_BUTTON_CLASSES.loading);
            if (!this.icon && this.label) {
                styleClass.push(INTERNAL_BUTTON_CLASSES.labelOnly);
            }
            if (this.icon && !this.label && !ObjectUtils.isEmpty(this.htmlElement.textContent)) {
                styleClass.push(INTERNAL_BUTTON_CLASSES.iconOnly);
            }
        }
        return styleClass;
    }
    setStyleClass() {
        const styleClass = this.getStyleClass();
        this.htmlElement.classList.remove(...this._internalClasses);
        this.htmlElement.classList.add(...styleClass);
    }
    createLabel() {
        if (this.label) {
            let labelElement = this.document.createElement('span');
            if (this.icon && !this.label) {
                labelElement.setAttribute('aria-hidden', 'true');
            }
            labelElement.className = 'p-button-label';
            labelElement.appendChild(this.document.createTextNode(this.label));
            this.htmlElement.appendChild(labelElement);
        }
    }
    createIcon() {
        if (this.icon || this.loading) {
            let iconElement = this.document.createElement('span');
            iconElement.className = 'p-button-icon';
            iconElement.setAttribute('aria-hidden', 'true');
            let iconPosClass = this.label ? 'p-button-icon-' + this.iconPos : null;
            if (iconPosClass) {
                DomHandler.addClass(iconElement, iconPosClass);
            }
            let iconClass = this.getIconClass();
            if (iconClass) {
                DomHandler.addMultipleClasses(iconElement, iconClass);
            }
            if (!this.loadingIcon && this.loading) {
                iconElement.innerHTML = this.spinnerIcon;
            }
            this.htmlElement.insertBefore(iconElement, this.htmlElement.firstChild);
        }
    }
    updateLabel() {
        let labelElement = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (!this.label) {
            labelElement && this.htmlElement.removeChild(labelElement);
            return;
        }
        labelElement ? (labelElement.textContent = this.label) : this.createLabel();
    }
    updateIcon() {
        let iconElement = DomHandler.findSingle(this.htmlElement, '.p-button-icon');
        let labelElement = DomHandler.findSingle(this.htmlElement, '.p-button-label');
        if (!this.icon && !this.loading) {
            iconElement && this.htmlElement.removeChild(iconElement);
            return;
        }
        if (this.loading && !this.loadingIcon && iconElement) {
            iconElement.innerHTML = this.spinnerIcon;
        }
        if (iconElement) {
            if (this.iconPos) {
                iconElement.className = 'p-button-icon ' + (labelElement ? 'p-button-icon-' + this.iconPos : '') + ' ' + this.getIconClass();
            }
            else {
                iconElement.className = 'p-button-icon ' + this.getIconClass();
            }
        }
        else {
            this.createIcon();
        }
    }
    getIconClass() {
        return this.loading ? 'p-button-loading-icon ' + (this.loadingIcon ? this.loadingIcon : 'p-icon') : this.icon;
    }
    ngOnDestroy() {
        this.initialized = false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: ButtonDirective, deps: [{ token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.0", type: ButtonDirective, selector: "[pButton]", inputs: { iconPos: "iconPos", loadingIcon: "loadingIcon", label: "label", icon: "icon", loading: "loading" }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
export { ButtonDirective };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: ButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pButton]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { iconPos: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], label: [{
                type: Input
            }], icon: [{
                type: Input
            }], loading: [{
                type: Input
            }] } });
/**
 * Button is an extension to standard button element with icons and theming.
 * @group Components
 */
class Button {
    /**
     * Type of the button.
     * @group Props
     */
    type = 'button';
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'left';
    /**
     * Name of the icon.
     * @group Props
     */
    icon;
    /**
     * Value of the badge.
     * @group Props
     */
    badge;
    /**
     * Uses to pass attributes to the label's DOM element.
     * @group Props
     */
    label;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Whether the button is in loading state.
     * @group Props
     */
    loading = false;
    /**
     * Icon to display in loading state.
     * @group Props
     */
    loadingIcon;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the badge.
     * @group Props
     */
    badgeClass;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    ariaLabel;
    /**
     * Callback to execute when button is clicked.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (click).
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick = new EventEmitter();
    /**
     * Callback to execute when button is focused.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (focus).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to execute when button loses focus.
     * This event is intended to be used with the <p-button> component. Using a regular <button> element, use (blur).
     * @param {FocusEvent} event - Focus event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    contentTemplate;
    loadingIconTemplate;
    iconTemplate;
    templates;
    spinnerIconClass() {
        return Object.entries(this.iconClass())
            .filter(([, value]) => !!value)
            .reduce((acc, [key]) => acc + ` ${key}`, 'p-button-loading-icon');
    }
    iconClass() {
        return {
            'p-button-icon': true,
            'p-button-icon-left': this.iconPos === 'left' && this.label,
            'p-button-icon-right': this.iconPos === 'right' && this.label,
            'p-button-icon-top': this.iconPos === 'top' && this.label,
            'p-button-icon-bottom': this.iconPos === 'bottom' && this.label
        };
    }
    buttonClass() {
        return {
            'p-button p-component': true,
            'p-button-icon-only': (this.icon || this.iconTemplate || this.loadingIcon || this.loadingIconTemplate) && !this.label,
            'p-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
            'p-disabled': this.disabled || this.loading,
            'p-button-loading': this.loading,
            'p-button-loading-label-only': this.loading && !this.icon && this.label && !this.loadingIcon && this.iconPos === 'left'
        };
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    badgeStyleClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.badge && String(this.badge).length === 1
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Button, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Button, selector: "p-button", inputs: { type: "type", iconPos: "iconPos", icon: "icon", badge: "badge", label: "label", disabled: "disabled", loading: "loading", loadingIcon: "loadingIcon", style: "style", styleClass: "styleClass", badgeClass: "badgeClass", ariaLabel: "ariaLabel" }, outputs: { onClick: "onClick", onFocus: "onFocus", onBlur: "onBlur" }, host: { properties: { "class.p-disabled": "disabled" }, classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <button
            [attr.type]="type"
            [attr.aria-label]="ariaLabel"
            [class]="styleClass"
            [ngStyle]="style"
            [disabled]="disabled || loading"
            [ngClass]="buttonClass()"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.data-pc-name]="'button'"
            [attr.data-pc-section]="'root'"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ng-container *ngIf="loading">
                <ng-container *ngIf="!loadingIconTemplate">
                    <span *ngIf="loadingIcon" [class]="'p-button-loading-icon pi-spin ' + loadingIcon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'"></span>
                    <SpinnerIcon *ngIf="!loadingIcon" [styleClass]="spinnerIconClass()" [spin]="true" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'" />
                </ng-container>
                <span *ngIf="loadingIconTemplate" class="p-button-loading-icon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ng-container *ngIf="!loading">
                <span *ngIf="icon && !iconTemplate" [class]="icon" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'"></span>
                <span *ngIf="!icon && iconTemplate" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'">
                    <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate"></ng-template>
                </span>
            </ng-container>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate && label" [attr.data-pc-section]="'label'">{{ label }}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge" [attr.data-pc-section]="'badge'">{{ badge }}</span>
        </button>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return SpinnerIcon; }), selector: "SpinnerIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Button };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Button, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-button',
                    template: `
        <button
            [attr.type]="type"
            [attr.aria-label]="ariaLabel"
            [class]="styleClass"
            [ngStyle]="style"
            [disabled]="disabled || loading"
            [ngClass]="buttonClass()"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.data-pc-name]="'button'"
            [attr.data-pc-section]="'root'"
        >
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            <ng-container *ngIf="loading">
                <ng-container *ngIf="!loadingIconTemplate">
                    <span *ngIf="loadingIcon" [class]="'p-button-loading-icon pi-spin ' + loadingIcon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'"></span>
                    <SpinnerIcon *ngIf="!loadingIcon" [styleClass]="spinnerIconClass()" [spin]="true" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'" />
                </ng-container>
                <span *ngIf="loadingIconTemplate" class="p-button-loading-icon" [ngClass]="iconClass()" [attr.aria-hidden]="true" [attr.data-pc-section]="'loadingicon'">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ng-container *ngIf="!loading">
                <span *ngIf="icon && !iconTemplate" [class]="icon" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'"></span>
                <span *ngIf="!icon && iconTemplate" [ngClass]="iconClass()" [attr.data-pc-section]="'icon'">
                    <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate"></ng-template>
                </span>
            </ng-container>
            <span class="p-button-label" [attr.aria-hidden]="icon && !label" *ngIf="!contentTemplate && label" [attr.data-pc-section]="'label'">{{ label }}</span>
            <span [ngClass]="badgeStyleClass()" [class]="badgeClass" *ngIf="!contentTemplate && badge" [attr.data-pc-section]="'badge'">{{ badge }}</span>
        </button>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element',
                        '[class.p-disabled]': 'disabled' || 'loading'
                    }
                }]
        }], propDecorators: { type: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], icon: [{
                type: Input
            }], badge: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], badgeClass: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], onClick: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class ButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: ButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: ButtonModule, declarations: [ButtonDirective, Button], imports: [CommonModule, RippleModule, SharedModule, SpinnerIcon], exports: [ButtonDirective, Button, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: ButtonModule, imports: [CommonModule, RippleModule, SharedModule, SpinnerIcon, SharedModule] });
}
export { ButtonModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: ButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, SharedModule, SpinnerIcon],
                    exports: [ButtonDirective, Button, SharedModule],
                    declarations: [ButtonDirective, Button]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2J1dHRvbi9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQW1DLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBYSxNQUFNLEVBQTBCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pQLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSTVDLE1BQU0sdUJBQXVCLEdBQUc7SUFDNUIsTUFBTSxFQUFFLFVBQVU7SUFDbEIsU0FBUyxFQUFFLGFBQWE7SUFDeEIsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixRQUFRLEVBQUUsWUFBWTtJQUN0QixPQUFPLEVBQUUsa0JBQWtCO0lBQzNCLFNBQVMsRUFBRSw2QkFBNkI7Q0FDbEMsQ0FBQztBQUNYOzs7R0FHRztBQUNILE1BTWEsZUFBZTtJQXNGTDtJQUEwQztJQXJGN0Q7OztPQUdHO0lBQ00sT0FBTyxHQUF1QixNQUFNLENBQUM7SUFDOUM7OztPQUdHO0lBQ00sV0FBVyxDQUFxQjtJQUN6Qzs7O09BR0c7SUFDSCxJQUFhLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFJLEtBQUss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OzJGQUFaLFlBQVk7a0JBTHhCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDO29CQUNoRSxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQztvQkFDaEQsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQztpQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE5nTW9kdWxlLCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBTcGlubmVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Bpbm5lcic7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG50eXBlIEJ1dHRvbkljb25Qb3NpdGlvbiA9ICdsZWZ0JyB8ICdyaWdodCcgfCAndG9wJyB8ICdib3R0b20nO1xuXG5jb25zdCBJTlRFUk5BTF9CVVRUT05fQ0xBU1NFUyA9IHtcbiAgICBidXR0b246ICdwLWJ1dHRvbicsXG4gICAgY29tcG9uZW50OiAncC1jb21wb25lbnQnLFxuICAgIGljb25Pbmx5OiAncC1idXR0b24taWNvbi1vbmx5JyxcbiAgICBkaXNhYmxlZDogJ3AtZGlzYWJsZWQnLFxuICAgIGxvYWRpbmc6ICdwLWJ1dHRvbi1sb2FkaW5nJyxcbiAgICBsYWJlbE9ubHk6ICdwLWJ1dHRvbi1sb2FkaW5nLWxhYmVsLW9ubHknXG59IGFzIGNvbnN0O1xuLyoqXG4gKiBCdXR0b24gZGlyZWN0aXZlIGlzIGFuIGV4dGVuc2lvbiB0byBidXR0b24gY29tcG9uZW50LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEJ1dHRvbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25Qb3M6IEJ1dHRvbkljb25Qb3NpdGlvbiA9ICdsZWZ0JztcbiAgICAvKipcbiAgICAgKiBVc2VzIHRvIHBhc3MgYXR0cmlidXRlcyB0byB0aGUgbG9hZGluZyBpY29uJ3MgRE9NIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbG9hZGluZ0ljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUZXh0IG9mIHRoZSBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYWJlbCBhcyBzdHJpbmc7XG4gICAgfVxuICAgIHNldCBsYWJlbCh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9sYWJlbCA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJY29uKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBpY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pY29uIGFzIHN0cmluZztcbiAgICB9XG4gICAgc2V0IGljb24odmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faWNvbiA9IHZhbDtcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJY29uKCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBidXR0b24gaXMgaW4gbG9hZGluZyBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbG9hZGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gICAgfVxuICAgIHNldCBsb2FkaW5nKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9sb2FkaW5nID0gdmFsO1xuXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUljb24oKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVDbGFzcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIF9sYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIF9pY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgX2xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBpbml0aWFsaXplZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgZ2V0IGh0bWxFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbnRlcm5hbENsYXNzZXM6IHN0cmluZ1tdID0gT2JqZWN0LnZhbHVlcyhJTlRFUk5BTF9CVVRUT05fQ0xBU1NFUyk7XG5cbiAgICBzcGlubmVySWNvbiA9IGA8c3ZnIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMTQgMTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInAtaWNvbi1zcGluXCI+XG4gICAgICAgIDxnIGNsaXAtcGF0aD1cInVybCgjY2xpcDBfNDE3XzIxNDA4KVwiPlxuICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICBkPVwiTTYuOTk3MDEgMTRDNS44NTQ0MSAxMy45OTkgNC43MjkzOSAxMy43MTg2IDMuNzIwMTIgMTMuMTgzMkMyLjcxMDg0IDEyLjY0NzggMS44NDc5NSAxMS44NzM3IDEuMjA2NzMgMTAuOTI4NEMwLjU2NTUwNCA5Ljk4MzA1IDAuMTY1NDI0IDguODk1MjYgMC4wNDEzODcgNy43NTk4OUMtMC4wODI2NDk2IDYuNjI0NTMgMC4wNzMxMjUgNS40NzYwNyAwLjQ5NTEyMiA0LjQxNDdDMC45MTcxMTkgMy4zNTMzMyAxLjU5MjUyIDIuNDExMyAyLjQ2MjQxIDEuNjcwNzdDMy4zMzIyOSAwLjkzMDI0NyA0LjM3MDI0IDAuNDEzNzI5IDUuNDg1NyAwLjE2NjI3NUM2LjYwMTE3IC0wLjA4MTE3OTYgNy43NjAyNiAtMC4wNTIwNTM1IDguODYxODggMC4yNTExMTJDOS45NjM1IDAuNTU0Mjc4IDEwLjk3NDIgMS4xMjIyNyAxMS44MDU3IDEuOTA1NTVDMTEuOTE1IDIuMDE0OTMgMTEuOTc2NCAyLjE2MzE5IDExLjk3NjQgMi4zMTc3OEMxMS45NzY0IDIuNDcyMzYgMTEuOTE1IDIuNjIwNjIgMTEuODA1NyAyLjczQzExLjc1MjEgMi43ODUwMyAxMS42ODggMi44Mjg3NyAxMS42MTcxIDIuODU4NjRDMTEuNTQ2MyAyLjg4ODUgMTEuNDcwMiAyLjkwMzg5IDExLjM5MzMgMi45MDM4OUMxMS4zMTY1IDIuOTAzODkgMTEuMjQwNCAyLjg4ODUgMTEuMTY5NSAyLjg1ODY0QzExLjA5ODcgMi44Mjg3NyAxMS4wMzQ2IDIuNzg1MDMgMTAuOTgwOSAyLjczQzkuOTk5OCAxLjgxMjczIDguNzMyNDYgMS4yNjEzOCA3LjM5MjI2IDEuMTY4NzZDNi4wNTIwNiAxLjA3NjE1IDQuNzIwODYgMS40NDc5NCAzLjYyMjc5IDIuMjIxNTJDMi41MjQ3MSAyLjk5NTExIDEuNzI2ODMgNC4xMjMyNSAxLjM2MzQ1IDUuNDE2MDJDMS4wMDAwOCA2LjcwODc5IDEuMDkzNDIgOC4wODcyMyAxLjYyNzc1IDkuMzE5MjZDMi4xNjIwOSAxMC41NTEzIDMuMTA0NzggMTEuNTYxNyA0LjI5NzEzIDEyLjE4MDNDNS40ODk0NyAxMi43OTg5IDYuODU4NjUgMTIuOTg4IDguMTc0MTQgMTIuNzE1N0M5LjQ4OTYzIDEyLjQ0MzUgMTAuNjcxMSAxMS43MjY0IDExLjUxOTYgMTAuNjg1NEMxMi4zNjgxIDkuNjQ0MzIgMTIuODMxOSA4LjM0MjgyIDEyLjgzMjggN0MxMi44MzI4IDYuODQ1MjkgMTIuODk0MyA2LjY5NjkyIDEzLjAwMzggNi41ODc1MkMxMy4xMTMyIDYuNDc4MTIgMTMuMjYxNiA2LjQxNjY3IDEzLjQxNjQgNi40MTY2N0MxMy41NzEyIDYuNDE2NjcgMTMuNzE5NiA2LjQ3ODEyIDEzLjgyOTEgNi41ODc1MkMxMy45Mzg1IDYuNjk2OTIgMTQgNi44NDUyOSAxNCA3QzE0IDguODU2NTEgMTMuMjYyMiAxMC42MzcgMTEuOTQ4OSAxMS45NDk3QzEwLjYzNTYgMTMuMjYyNSA4Ljg1NDMyIDE0IDYuOTk3MDEgMTRaXCJcbiAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZz5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF80MTdfMjE0MDhcIj5cbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiBmaWxsPVwid2hpdGVcIiAvPlxuICAgICAgICAgICAgPC9jbGlwUGF0aD5cbiAgICAgICAgPC9kZWZzPlxuICAgIDwvc3ZnPmA7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50KSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLmh0bWxFbGVtZW50LCB0aGlzLmdldFN0eWxlQ2xhc3MoKS5qb2luKCcgJykpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlSWNvbigpO1xuICAgICAgICB0aGlzLmNyZWF0ZUxhYmVsKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0U3R5bGVDbGFzcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHN0eWxlQ2xhc3M6IHN0cmluZ1tdID0gW0lOVEVSTkFMX0JVVFRPTl9DTEFTU0VTLmJ1dHRvbiwgSU5URVJOQUxfQlVUVE9OX0NMQVNTRVMuY29tcG9uZW50XTtcblxuICAgICAgICBpZiAodGhpcy5pY29uICYmICF0aGlzLmxhYmVsICYmIE9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5odG1sRWxlbWVudC50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgICAgIHN0eWxlQ2xhc3MucHVzaChJTlRFUk5BTF9CVVRUT05fQ0xBU1NFUy5pY29uT25seSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzLnB1c2goSU5URVJOQUxfQlVUVE9OX0NMQVNTRVMuZGlzYWJsZWQsIElOVEVSTkFMX0JVVFRPTl9DTEFTU0VTLmxvYWRpbmcpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaWNvbiAmJiB0aGlzLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVDbGFzcy5wdXNoKElOVEVSTkFMX0JVVFRPTl9DTEFTU0VTLmxhYmVsT25seSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmljb24gJiYgIXRoaXMubGFiZWwgJiYgIU9iamVjdFV0aWxzLmlzRW1wdHkodGhpcy5odG1sRWxlbWVudC50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzLnB1c2goSU5URVJOQUxfQlVUVE9OX0NMQVNTRVMuaWNvbk9ubHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gICAgfVxuXG4gICAgc2V0U3R5bGVDbGFzcygpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVDbGFzcyA9IHRoaXMuZ2V0U3R5bGVDbGFzcygpO1xuICAgICAgICB0aGlzLmh0bWxFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5faW50ZXJuYWxDbGFzc2VzKTtcbiAgICAgICAgdGhpcy5odG1sRWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLnN0eWxlQ2xhc3MpO1xuICAgIH1cblxuICAgIGNyZWF0ZUxhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaWNvbiAmJiAhdGhpcy5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGxhYmVsRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGFiZWxFbGVtZW50LmNsYXNzTmFtZSA9ICdwLWJ1dHRvbi1sYWJlbCc7XG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmxhYmVsKSk7XG5cbiAgICAgICAgICAgIHRoaXMuaHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWxFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUljb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmljb24gfHwgdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICBsZXQgaWNvbkVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZSA9ICdwLWJ1dHRvbi1pY29uJztcbiAgICAgICAgICAgIGljb25FbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgbGV0IGljb25Qb3NDbGFzcyA9IHRoaXMubGFiZWwgPyAncC1idXR0b24taWNvbi0nICsgdGhpcy5pY29uUG9zIDogbnVsbDtcblxuICAgICAgICAgICAgaWYgKGljb25Qb3NDbGFzcykge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoaWNvbkVsZW1lbnQsIGljb25Qb3NDbGFzcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpY29uQ2xhc3MgPSB0aGlzLmdldEljb25DbGFzcygpO1xuXG4gICAgICAgICAgICBpZiAoaWNvbkNsYXNzKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXMoaWNvbkVsZW1lbnQsIGljb25DbGFzcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5sb2FkaW5nSWNvbiAmJiB0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLnNwaW5uZXJJY29uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmh0bWxFbGVtZW50Lmluc2VydEJlZm9yZShpY29uRWxlbWVudCwgdGhpcy5odG1sRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUxhYmVsKCkge1xuICAgICAgICBsZXQgbGFiZWxFbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaHRtbEVsZW1lbnQsICcucC1idXR0b24tbGFiZWwnKTtcblxuICAgICAgICBpZiAoIXRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIGxhYmVsRWxlbWVudCAmJiB0aGlzLmh0bWxFbGVtZW50LnJlbW92ZUNoaWxkKGxhYmVsRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsYWJlbEVsZW1lbnQgPyAobGFiZWxFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5sYWJlbCkgOiB0aGlzLmNyZWF0ZUxhYmVsKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSWNvbigpIHtcbiAgICAgICAgbGV0IGljb25FbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaHRtbEVsZW1lbnQsICcucC1idXR0b24taWNvbicpO1xuICAgICAgICBsZXQgbGFiZWxFbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuaHRtbEVsZW1lbnQsICcucC1idXR0b24tbGFiZWwnKTtcblxuICAgICAgICBpZiAoIXRoaXMuaWNvbiAmJiAhdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICBpY29uRWxlbWVudCAmJiB0aGlzLmh0bWxFbGVtZW50LnJlbW92ZUNoaWxkKGljb25FbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmcgJiYgIXRoaXMubG9hZGluZ0ljb24gJiYgaWNvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGljb25FbGVtZW50LmlubmVySFRNTCA9IHRoaXMuc3Bpbm5lckljb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaWNvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmljb25Qb3MpIHtcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAncC1idXR0b24taWNvbiAnICsgKGxhYmVsRWxlbWVudCA/ICdwLWJ1dHRvbi1pY29uLScgKyB0aGlzLmljb25Qb3MgOiAnJykgKyAnICcgKyB0aGlzLmdldEljb25DbGFzcygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWUgPSAncC1idXR0b24taWNvbiAnICsgdGhpcy5nZXRJY29uQ2xhc3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSWNvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SWNvbkNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nID8gJ3AtYnV0dG9uLWxvYWRpbmctaWNvbiAnICsgKHRoaXMubG9hZGluZ0ljb24gPyB0aGlzLmxvYWRpbmdJY29uIDogJ3AtaWNvbicpIDogdGhpcy5pY29uO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxufVxuLyoqXG4gKiBCdXR0b24gaXMgYW4gZXh0ZW5zaW9uIHRvIHN0YW5kYXJkIGJ1dHRvbiBlbGVtZW50IHdpdGggaWNvbnMgYW5kIHRoZW1pbmcuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBbYXR0ci50eXBlXT1cInR5cGVcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGxvYWRpbmdcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwiYnV0dG9uQ2xhc3MoKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwib25DbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgIChibHVyKT1cIm9uQmx1ci5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIididXR0b24nXCJcbiAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIncm9vdCdcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbG9hZGluZ0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImxvYWRpbmdJY29uXCIgW2NsYXNzXT1cIidwLWJ1dHRvbi1sb2FkaW5nLWljb24gcGktc3BpbiAnICsgbG9hZGluZ0ljb25cIiBbbmdDbGFzc109XCJpY29uQ2xhc3MoKVwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xvYWRpbmdpY29uJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uICpuZ0lmPVwiIWxvYWRpbmdJY29uXCIgW3N0eWxlQ2xhc3NdPVwic3Bpbm5lckljb25DbGFzcygpXCIgW3NwaW5dPVwidHJ1ZVwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xvYWRpbmdpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWJ1dHRvbi1sb2FkaW5nLWljb25cIiBbbmdDbGFzc109XCJpY29uQ2xhc3MoKVwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xvYWRpbmdpY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsb2FkaW5nSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaWNvbiAmJiAhaWNvblRlbXBsYXRlXCIgW2NsYXNzXT1cImljb25cIiBbbmdDbGFzc109XCJpY29uQ2xhc3MoKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaWNvbiAmJiBpY29uVGVtcGxhdGVcIiBbbmdDbGFzc109XCJpY29uQ2xhc3MoKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpY29uXCIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWJ1dHRvbi1sYWJlbFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImljb24gJiYgIWxhYmVsXCIgKm5nSWY9XCIhY29udGVudFRlbXBsYXRlICYmIGxhYmVsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidsYWJlbCdcIj57eyBsYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cImJhZGdlU3R5bGVDbGFzcygpXCIgW2NsYXNzXT1cImJhZGdlQ2xhc3NcIiAqbmdJZj1cIiFjb250ZW50VGVtcGxhdGUgJiYgYmFkZ2VcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2JhZGdlJ1wiPnt7IGJhZGdlIH19PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCcsXG4gICAgICAgICdbY2xhc3MucC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnIHx8ICdsb2FkaW5nJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiB0aGUgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICdidXR0b24nO1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb25Qb3M6IEJ1dHRvbkljb25Qb3NpdGlvbiA9ICdsZWZ0JztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBWYWx1ZSBvZiB0aGUgYmFkZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYmFkZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBVc2VzIHRvIHBhc3MgYXR0cmlidXRlcyB0byB0aGUgbGFiZWwncyBET00gZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgYnV0dG9uIGlzIGluIGxvYWRpbmcgc3RhdGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEljb24gdG8gZGlzcGxheSBpbiBsb2FkaW5nIHN0YXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvYWRpbmdJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgYmFkZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYmFkZ2VDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGVmaW5lIGEgc3RyaW5nIHRoYXQgYXV0b2NvbXBsZXRlIGF0dHJpYnV0ZSB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGV4ZWN1dGUgd2hlbiBidXR0b24gaXMgY2xpY2tlZC5cbiAgICAgKiBUaGlzIGV2ZW50IGlzIGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aCB0aGUgPHAtYnV0dG9uPiBjb21wb25lbnQuIFVzaW5nIGEgcmVndWxhciA8YnV0dG9uPiBlbGVtZW50LCB1c2UgKGNsaWNrKS5cbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IC0gTW91c2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBleGVjdXRlIHdoZW4gYnV0dG9uIGlzIGZvY3VzZWQuXG4gICAgICogVGhpcyBldmVudCBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGggdGhlIDxwLWJ1dHRvbj4gY29tcG9uZW50LiBVc2luZyBhIHJlZ3VsYXIgPGJ1dHRvbj4gZWxlbWVudCwgdXNlIChmb2N1cykuXG4gICAgICogQHBhcmFtIHtGb2N1c0V2ZW50fSBldmVudCAtIEZvY3VzIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gZXhlY3V0ZSB3aGVuIGJ1dHRvbiBsb3NlcyBmb2N1cy5cbiAgICAgKiBUaGlzIGV2ZW50IGlzIGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aCB0aGUgPHAtYnV0dG9uPiBjb21wb25lbnQuIFVzaW5nIGEgcmVndWxhciA8YnV0dG9uPiBlbGVtZW50LCB1c2UgKGJsdXIpLlxuICAgICAqIEBwYXJhbSB7Rm9jdXNFdmVudH0gZXZlbnQgLSBGb2N1cyBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBsb2FkaW5nSWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIHNwaW5uZXJJY29uQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMuaWNvbkNsYXNzKCkpXG4gICAgICAgICAgICAuZmlsdGVyKChbLCB2YWx1ZV0pID0+ICEhdmFsdWUpXG4gICAgICAgICAgICAucmVkdWNlKChhY2MsIFtrZXldKSA9PiBhY2MgKyBgICR7a2V5fWAsICdwLWJ1dHRvbi1sb2FkaW5nLWljb24nKTtcbiAgICB9XG5cbiAgICBpY29uQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1idXR0b24taWNvbic6IHRydWUsXG4gICAgICAgICAgICAncC1idXR0b24taWNvbi1sZWZ0JzogdGhpcy5pY29uUG9zID09PSAnbGVmdCcgJiYgdGhpcy5sYWJlbCxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1pY29uLXJpZ2h0JzogdGhpcy5pY29uUG9zID09PSAncmlnaHQnICYmIHRoaXMubGFiZWwsXG4gICAgICAgICAgICAncC1idXR0b24taWNvbi10b3AnOiB0aGlzLmljb25Qb3MgPT09ICd0b3AnICYmIHRoaXMubGFiZWwsXG4gICAgICAgICAgICAncC1idXR0b24taWNvbi1ib3R0b20nOiB0aGlzLmljb25Qb3MgPT09ICdib3R0b20nICYmIHRoaXMubGFiZWxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBidXR0b25DbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWJ1dHRvbiBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1idXR0b24taWNvbi1vbmx5JzogKHRoaXMuaWNvbiB8fCB0aGlzLmljb25UZW1wbGF0ZSB8fCB0aGlzLmxvYWRpbmdJY29uIHx8IHRoaXMubG9hZGluZ0ljb25UZW1wbGF0ZSkgJiYgIXRoaXMubGFiZWwsXG4gICAgICAgICAgICAncC1idXR0b24tdmVydGljYWwnOiAodGhpcy5pY29uUG9zID09PSAndG9wJyB8fCB0aGlzLmljb25Qb3MgPT09ICdib3R0b20nKSAmJiB0aGlzLmxhYmVsLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmRpc2FibGVkIHx8IHRoaXMubG9hZGluZyxcbiAgICAgICAgICAgICdwLWJ1dHRvbi1sb2FkaW5nJzogdGhpcy5sb2FkaW5nLFxuICAgICAgICAgICAgJ3AtYnV0dG9uLWxvYWRpbmctbGFiZWwtb25seSc6IHRoaXMubG9hZGluZyAmJiAhdGhpcy5pY29uICYmIHRoaXMubGFiZWwgJiYgIXRoaXMubG9hZGluZ0ljb24gJiYgdGhpcy5pY29uUG9zID09PSAnbGVmdCdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRpbmdpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiYWRnZVN0eWxlQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1iYWRnZSBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1iYWRnZS1uby1ndXR0ZXInOiB0aGlzLmJhZGdlICYmIFN0cmluZyh0aGlzLmJhZGdlKS5sZW5ndGggPT09IDFcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmlwcGxlTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFNwaW5uZXJJY29uXSxcbiAgICBleHBvcnRzOiBbQnV0dG9uRGlyZWN0aXZlLCBCdXR0b24sIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQnV0dG9uRGlyZWN0aXZlLCBCdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbk1vZHVsZSB7fVxuIl19