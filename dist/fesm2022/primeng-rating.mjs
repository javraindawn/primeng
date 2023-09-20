import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ContentChildren, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { StarFillIcon } from 'primeng/icons/starfill';
import { StarIcon } from 'primeng/icons/star';
import { BanIcon } from 'primeng/icons/ban';

const RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
/**
 * RadioButton is an extension to standard radio button element with theming.
 * @group Components
 */
class Rating {
    cd;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
    /**
     * When present, changing the value is not possible.
     * @group Props
     */
    readonly;
    /**
     * Number of stars.
     * @group Props
     */
    stars = 5;
    /**
     * When specified a cancel icon is displayed to allow removing the value.
     * @group Props
     */
    cancel = true;
    /**
     * Style class of the on icon.
     * @group Props
     */
    iconOnClass;
    /**
     * Inline style of the on icon.
     * @group Props
     */
    iconOnStyle;
    /**
     * Style class of the off icon.
     * @group Props
     */
    iconOffClass;
    /**
     * Inline style of the off icon.
     * @group Props
     */
    iconOffStyle;
    /**
     * Style class of the cancel icon.
     * @group Props
     */
    iconCancelClass;
    /**
     * Inline style of the cancel icon.
     * @group Props
     */
    iconCancelStyle;
    /**
     * Emitted on value change.
     * @param {RatingRateEvent} value - Custom rate event.
     * @group Emits
     */
    onRate = new EventEmitter();
    /**
     * Emitted when the rating is cancelled.
     * @param {Event} value - Browser event.
     * @group Emits
     */
    onCancel = new EventEmitter();
    templates;
    onIconTemplate;
    offIconTemplate;
    cancelIconTemplate;
    constructor(cd) {
        this.cd = cd;
    }
    value;
    onModelChange = () => { };
    onModelTouched = () => { };
    starsArray;
    ngOnInit() {
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'onicon':
                    this.onIconTemplate = item.template;
                    break;
                case 'officon':
                    this.offIconTemplate = item.template;
                    break;
                case 'cancelicon':
                    this.cancelIconTemplate = item.template;
                    break;
            }
        });
    }
    getIconTemplate(i) {
        return !this.value || i >= this.value ? this.offIconTemplate : this.onIconTemplate;
    }
    rate(event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = i + 1;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: i + 1
            });
        }
        event.preventDefault();
    }
    clear(event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    }
    writeValue(value) {
        this.value = value;
        this.cd.detectChanges();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    get isCustomIcon() {
        return this.templates && this.templates.length > 0;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Rating, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Rating, selector: "p-rating", inputs: { disabled: "disabled", readonly: "readonly", stars: "stars", cancel: "cancel", iconOnClass: "iconOnClass", iconOnStyle: "iconOnStyle", iconOffClass: "iconOffClass", iconOffStyle: "iconOffStyle", iconCancelClass: "iconCancelClass", iconCancelStyle: "iconCancelStyle" }, outputs: { onRate: "onRate", onCancel: "onCancel" }, host: { classAttribute: "p-element" }, providers: [RATING_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div class="p-rating" [ngClass]="{ 'p-readonly': readonly, 'p-disabled': disabled }">
            <ng-container *ngIf="!isCustomIcon; else customTemplate">
                <ng-container *ngIf="cancel">
                    <span
                        *ngIf="iconCancelClass"
                        [attr.tabindex]="disabled || readonly ? null : '0'"
                        (click)="clear($event)"
                        (keydown.enter)="clear($event)"
                        class="p-rating-icon p-rating-cancel"
                        [ngClass]="iconCancelClass"
                        [ngStyle]="iconCancelStyle"
                    ></span>
                    <BanIcon *ngIf="!iconCancelClass" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="clear($event)" (keydown.enter)="clear($event)" [styleClass]="'p-rating-icon p-rating-cancel'" [ngStyle]="iconCancelStyle" />
                </ng-container>
                <span *ngFor="let star of starsArray; let i = index">
                    <ng-container *ngIf="!value || i >= value">
                        <span class="p-rating-icon" *ngIf="iconOffClass" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" (click)="rate($event, i)" (keydown.enter)="rate($event, i)"></span>
                        <StarIcon *ngIf="!iconOffClass" (click)="rate($event, i)" [ngStyle]="iconOffStyle" (keydown.enter)="rate($event, i)" [styleClass]="'p-rating-icon'" [attr.tabindex]="disabled || readonly ? null : '0'" />
                    </ng-container>
                    <ng-container *ngIf="value && i < value">
                        <span class="p-rating-icon p-rating-icon-active" *ngIf="iconOnClass" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" (click)="rate($event, i)" (keydown.enter)="rate($event, i)"></span>
                        <StarFillIcon *ngIf="!iconOnClass" (click)="rate($event, i)" [ngStyle]="iconOnStyle" (keydown.enter)="rate($event, i)" [styleClass]="'p-rating-icon p-rating-icon-active'" [attr.tabindex]="disabled || readonly ? null : '0'" />
                    </ng-container>
                </span>
            </ng-container>
            <ng-template #customTemplate>
                <span *ngIf="cancel" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="clear($event)" (keydown.enter)="clear($event)" class="p-rating-icon p-rating-cancel" [ngStyle]="iconCancelStyle">
                    <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
                </span>
                <span *ngFor="let star of starsArray; let i = index" class="p-rating-icon" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="rate($event, i)" (keydown.enter)="rate($event, i)">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            </ng-template>
        </div>
    `, isInline: true, styles: [".p-rating{display:inline-flex}.p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(function () { return StarFillIcon; }), selector: "StarFillIcon" }, { kind: "component", type: i0.forwardRef(function () { return StarIcon; }), selector: "StarIcon" }, { kind: "component", type: i0.forwardRef(function () { return BanIcon; }), selector: "BanIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Rating, decorators: [{
            type: Component,
            args: [{ selector: 'p-rating', template: `
        <div class="p-rating" [ngClass]="{ 'p-readonly': readonly, 'p-disabled': disabled }">
            <ng-container *ngIf="!isCustomIcon; else customTemplate">
                <ng-container *ngIf="cancel">
                    <span
                        *ngIf="iconCancelClass"
                        [attr.tabindex]="disabled || readonly ? null : '0'"
                        (click)="clear($event)"
                        (keydown.enter)="clear($event)"
                        class="p-rating-icon p-rating-cancel"
                        [ngClass]="iconCancelClass"
                        [ngStyle]="iconCancelStyle"
                    ></span>
                    <BanIcon *ngIf="!iconCancelClass" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="clear($event)" (keydown.enter)="clear($event)" [styleClass]="'p-rating-icon p-rating-cancel'" [ngStyle]="iconCancelStyle" />
                </ng-container>
                <span *ngFor="let star of starsArray; let i = index">
                    <ng-container *ngIf="!value || i >= value">
                        <span class="p-rating-icon" *ngIf="iconOffClass" [ngStyle]="iconOffStyle" [ngClass]="iconOffClass" (click)="rate($event, i)" (keydown.enter)="rate($event, i)"></span>
                        <StarIcon *ngIf="!iconOffClass" (click)="rate($event, i)" [ngStyle]="iconOffStyle" (keydown.enter)="rate($event, i)" [styleClass]="'p-rating-icon'" [attr.tabindex]="disabled || readonly ? null : '0'" />
                    </ng-container>
                    <ng-container *ngIf="value && i < value">
                        <span class="p-rating-icon p-rating-icon-active" *ngIf="iconOnClass" [ngStyle]="iconOnStyle" [ngClass]="iconOnClass" (click)="rate($event, i)" (keydown.enter)="rate($event, i)"></span>
                        <StarFillIcon *ngIf="!iconOnClass" (click)="rate($event, i)" [ngStyle]="iconOnStyle" (keydown.enter)="rate($event, i)" [styleClass]="'p-rating-icon p-rating-icon-active'" [attr.tabindex]="disabled || readonly ? null : '0'" />
                    </ng-container>
                </span>
            </ng-container>
            <ng-template #customTemplate>
                <span *ngIf="cancel" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="clear($event)" (keydown.enter)="clear($event)" class="p-rating-icon p-rating-cancel" [ngStyle]="iconCancelStyle">
                    <ng-container *ngTemplateOutlet="cancelIconTemplate"></ng-container>
                </span>
                <span *ngFor="let star of starsArray; let i = index" class="p-rating-icon" [attr.tabindex]="disabled || readonly ? null : '0'" (click)="rate($event, i)" (keydown.enter)="rate($event, i)">
                    <ng-container *ngTemplateOutlet="getIconTemplate(i)"></ng-container>
                </span>
            </ng-template>
        </div>
    `, providers: [RATING_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-rating{display:inline-flex}.p-rating-icon{cursor:pointer}.p-rating.p-rating-readonly .p-rating-icon{cursor:default}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], stars: [{
                type: Input
            }], cancel: [{
                type: Input
            }], iconOnClass: [{
                type: Input
            }], iconOnStyle: [{
                type: Input
            }], iconOffClass: [{
                type: Input
            }], iconOffStyle: [{
                type: Input
            }], iconCancelClass: [{
                type: Input
            }], iconCancelStyle: [{
                type: Input
            }], onRate: [{
                type: Output
            }], onCancel: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class RatingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: RatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: RatingModule, declarations: [Rating], imports: [CommonModule, StarFillIcon, StarIcon, BanIcon], exports: [Rating, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: RatingModule, imports: [CommonModule, StarFillIcon, StarIcon, BanIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: RatingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, StarFillIcon, StarIcon, BanIcon],
                    exports: [Rating, SharedModule],
                    declarations: [Rating]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RATING_VALUE_ACCESSOR, Rating, RatingModule };
//# sourceMappingURL=primeng-rating.mjs.map
