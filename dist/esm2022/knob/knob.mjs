import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, forwardRef, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const KNOB_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Knob),
    multi: true
};
/**
 * Knob is a form component to define number inputs with a dial.
 * @group Components
 */
class Knob {
    document;
    renderer;
    cd;
    el;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Background of the value.
     * @group Props
     */
    valueColor = 'var(--primary-color, Black)';
    /**
     * Background color of the range.
     * @group Props
     */
    rangeColor = 'var(--surface-border, LightGray)';
    /**
     * Color of the value text.
     * @group Props
     */
    textColor = 'var(--text-color-secondary, Black)';
    /**
     * Template string of the value.
     * @group Props
     */
    valueTemplate = '{value}';
    /**
     * Name of the input element.
     * @group Props
     */
    name;
    /**
     * Size of the component in pixels.
     * @group Props
     */
    size = 100;
    /**
     * Step factor to increment/decrement the value.
     * @group Props
     */
    step = 1;
    /**
     * Mininum boundary value.
     * @group Props
     */
    min = 0;
    /**
     * Maximum boundary value.
     * @group Props
     */
    max = 100;
    /**
     * Width of the knob stroke.
     * @group Props
     */
    strokeWidth = 14;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Whether the show the value inside the knob.
     * @group Props
     */
    showValue = true;
    /**
     * When present, it specifies that the component value cannot be edited.
     * @group Props
     */
    readonly = false;
    /**
     * Callback to invoke on value change.
     * @param {number} value - New value.
     * @group Emits
     */
    onChange = new EventEmitter();
    radius = 40;
    midX = 50;
    midY = 50;
    minRadians = (4 * Math.PI) / 3;
    maxRadians = -Math.PI / 3;
    value = 0;
    windowMouseMoveListener;
    windowMouseUpListener;
    windowTouchMoveListener;
    windowTouchEndListener;
    onModelChange = () => { };
    onModelTouched = () => { };
    constructor(document, renderer, cd, el) {
        this.document = document;
        this.renderer = renderer;
        this.cd = cd;
        this.el = el;
    }
    mapRange(x, inMin, inMax, outMin, outMax) {
        return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
    onClick(event) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
        }
    }
    updateValue(offsetX, offsetY) {
        let dx = offsetX - this.size / 2;
        let dy = this.size / 2 - offsetY;
        let angle = Math.atan2(dy, dx);
        let start = -Math.PI / 2 - Math.PI / 6;
        this.updateModel(angle, start);
    }
    updateModel(angle, start) {
        let mappedValue;
        if (angle > this.maxRadians)
            mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min, this.max);
        else if (angle < start)
            mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.min, this.max);
        else
            return;
        let newValue = Math.round((mappedValue - this.min) / this.step) * this.step + this.min;
        this.value = newValue;
        this.onModelChange(this.value);
        this.onChange.emit(this.value);
    }
    onMouseDown(event) {
        if (!this.disabled && !this.readonly) {
            const window = this.document.defaultView || 'window';
            this.windowMouseMoveListener = this.renderer.listen(window, 'mousemove', this.onMouseMove.bind(this));
            this.windowMouseUpListener = this.renderer.listen(window, 'mouseup', this.onMouseUp.bind(this));
            event.preventDefault();
        }
    }
    onMouseUp(event) {
        if (!this.disabled && !this.readonly) {
            if (this.windowMouseMoveListener) {
                this.windowMouseMoveListener();
                this.windowMouseUpListener = null;
            }
            if (this.windowMouseUpListener) {
                this.windowMouseUpListener();
                this.windowMouseMoveListener = null;
            }
            event.preventDefault();
        }
    }
    onTouchStart(event) {
        if (!this.disabled && !this.readonly) {
            const window = this.document.defaultView || 'window';
            this.windowTouchMoveListener = this.renderer.listen(window, 'touchmove', this.onTouchMove.bind(this));
            this.windowTouchEndListener = this.renderer.listen(window, 'touchend', this.onTouchEnd.bind(this));
            event.preventDefault();
        }
    }
    onTouchEnd(event) {
        if (!this.disabled && !this.readonly) {
            if (this.windowTouchMoveListener) {
                this.windowTouchMoveListener();
            }
            if (this.windowTouchEndListener) {
                this.windowTouchEndListener();
            }
            this.windowTouchMoveListener = null;
            this.windowTouchEndListener = null;
            event.preventDefault();
        }
    }
    onMouseMove(event) {
        if (!this.disabled && !this.readonly) {
            this.updateValue(event.offsetX, event.offsetY);
            event.preventDefault();
        }
    }
    onTouchMove(event) {
        if (!this.disabled && !this.readonly && event instanceof TouchEvent && event.touches.length === 1) {
            const rect = this.el.nativeElement.children[0].getBoundingClientRect();
            const touch = event.targetTouches.item(0);
            if (touch) {
                const offsetX = touch.clientX - rect.left;
                const offsetY = touch.clientY - rect.top;
                this.updateValue(offsetX, offsetY);
            }
        }
    }
    writeValue(value) {
        this.value = value;
        this.cd.markForCheck();
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
    containerClass() {
        return {
            'p-knob p-component': true,
            'p-disabled': this.disabled
        };
    }
    rangePath() {
        return `M ${this.minX()} ${this.minY()} A ${this.radius} ${this.radius} 0 1 1 ${this.maxX()} ${this.maxY()}`;
    }
    valuePath() {
        return `M ${this.zeroX()} ${this.zeroY()} A ${this.radius} ${this.radius} 0 ${this.largeArc()} ${this.sweep()} ${this.valueX()} ${this.valueY()}`;
    }
    zeroRadians() {
        if (this.min > 0 && this.max > 0)
            return this.mapRange(this.min, this.min, this.max, this.minRadians, this.maxRadians);
        else
            return this.mapRange(0, this.min, this.max, this.minRadians, this.maxRadians);
    }
    valueRadians() {
        return this.mapRange(this._value, this.min, this.max, this.minRadians, this.maxRadians);
    }
    minX() {
        return this.midX + Math.cos(this.minRadians) * this.radius;
    }
    minY() {
        return this.midY - Math.sin(this.minRadians) * this.radius;
    }
    maxX() {
        return this.midX + Math.cos(this.maxRadians) * this.radius;
    }
    maxY() {
        return this.midY - Math.sin(this.maxRadians) * this.radius;
    }
    zeroX() {
        return this.midX + Math.cos(this.zeroRadians()) * this.radius;
    }
    zeroY() {
        return this.midY - Math.sin(this.zeroRadians()) * this.radius;
    }
    valueX() {
        return this.midX + Math.cos(this.valueRadians()) * this.radius;
    }
    valueY() {
        return this.midY - Math.sin(this.valueRadians()) * this.radius;
    }
    largeArc() {
        return Math.abs(this.zeroRadians() - this.valueRadians()) < Math.PI ? 0 : 1;
    }
    sweep() {
        return this.valueRadians() > this.zeroRadians() ? 0 : 1;
    }
    valueToDisplay() {
        return this.valueTemplate.replace('{value}', this._value.toString());
    }
    get _value() {
        return this.value != null ? this.value : this.min;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Knob, deps: [{ token: DOCUMENT }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Knob, selector: "p-knob", inputs: { styleClass: "styleClass", style: "style", valueColor: "valueColor", rangeColor: "rangeColor", textColor: "textColor", valueTemplate: "valueTemplate", name: "name", size: "size", step: "step", min: "min", max: "max", strokeWidth: "strokeWidth", disabled: "disabled", showValue: "showValue", readonly: "readonly" }, outputs: { onChange: "onChange" }, host: { classAttribute: "p-element" }, providers: [KNOB_VALUE_ACCESSOR], ngImport: i0, template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <svg
                viewBox="0 0 100 100"
                [style.width]="size + 'px'"
                [style.height]="size + 'px'"
                (click)="onClick($event)"
                (mousedown)="onMouseDown($event)"
                (mouseup)="onMouseUp($event)"
                (touchstart)="onTouchStart($event)"
                (touchend)="onTouchEnd($event)"
            >
                <path [attr.d]="rangePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="rangeColor" class="p-knob-range"></path>
                <path [attr.d]="valuePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="valueColor" class="p-knob-value"></path>
                <text *ngIf="showValue" [attr.x]="50" [attr.y]="57" text-anchor="middle" [attr.fill]="textColor" class="p-knob-text" [attr.name]="name">{{ valueToDisplay() }}</text>
            </svg>
        </div>
    `, isInline: true, styles: ["@keyframes dash-frame{to{stroke-dashoffset:0}}.p-knob-range{fill:none;transition:stroke .1s ease-in}.p-knob-value{animation-name:dash-frame;animation-fill-mode:forwards;fill:none}.p-knob-text{font-size:1.3rem;text-align:center}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Knob };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Knob, decorators: [{
            type: Component,
            args: [{ selector: 'p-knob', template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <svg
                viewBox="0 0 100 100"
                [style.width]="size + 'px'"
                [style.height]="size + 'px'"
                (click)="onClick($event)"
                (mousedown)="onMouseDown($event)"
                (mouseup)="onMouseUp($event)"
                (touchstart)="onTouchStart($event)"
                (touchend)="onTouchEnd($event)"
            >
                <path [attr.d]="rangePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="rangeColor" class="p-knob-range"></path>
                <path [attr.d]="valuePath()" [attr.stroke-width]="strokeWidth" [attr.stroke]="valueColor" class="p-knob-value"></path>
                <text *ngIf="showValue" [attr.x]="50" [attr.y]="57" text-anchor="middle" [attr.fill]="textColor" class="p-knob-text" [attr.name]="name">{{ valueToDisplay() }}</text>
            </svg>
        </div>
    `, providers: [KNOB_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@keyframes dash-frame{to{stroke-dashoffset:0}}.p-knob-range{fill:none;transition:stroke .1s ease-in}.p-knob-value{animation-name:dash-frame;animation-fill-mode:forwards;fill:none}.p-knob-text{font-size:1.3rem;text-align:center}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], valueColor: [{
                type: Input
            }], rangeColor: [{
                type: Input
            }], textColor: [{
                type: Input
            }], valueTemplate: [{
                type: Input
            }], name: [{
                type: Input
            }], size: [{
                type: Input
            }], step: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showValue: [{
                type: Input
            }], readonly: [{
                type: Input
            }], onChange: [{
                type: Output
            }] } });
class KnobModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: KnobModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: KnobModule, declarations: [Knob], imports: [CommonModule], exports: [Knob] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: KnobModule, imports: [CommonModule] });
}
export { KnobModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: KnobModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Knob],
                    declarations: [Knob]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9rbm9iL2tub2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBaUMsTUFBTSxFQUFFLFlBQVksRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0wsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR25ELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFRO0lBQ3BDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDbkMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBQ0gsTUE0QmEsSUFBSTtJQTJHeUI7SUFBNEI7SUFBNkI7SUFBK0I7SUExRzlIOzs7T0FHRztJQUNNLFVBQVUsQ0FBcUI7SUFDeEM7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJQUM1RDs7O09BR0c7SUFDTSxVQUFVLEdBQVcsNkJBQTZCLENBQUM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxHQUFXLGtDQUFrQyxDQUFDO0lBQ2pFOzs7T0FHRztJQUNNLFNBQVMsR0FBVyxvQ0FBb0MsQ0FBQztJQUNsRTs7O09BR0c7SUFDTSxhQUFhLEdBQVcsU0FBUyxDQUFDO0lBQzNDOzs7T0FHRztJQUNNLElBQUksQ0FBcUI7SUFDbEM7OztPQUdHO0lBQ00sSUFBSSxHQUFXLEdBQUcsQ0FBQztJQUM1Qjs7O09BR0c7SUFDTSxJQUFJLEdBQVcsQ0FBQyxDQUFDO0lBQzFCOzs7T0FHRztJQUNNLEdBQUcsR0FBVyxDQUFDLENBQUM7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LElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztZQUNsSCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9ELENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0QsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElB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LFlBSlQsWUFBWTs7U0FJYixVQUFVOzJGQUFWLFVBQVU7a0JBTHRCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0JBQ2YsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDO2lCQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXQsIGZvcndhcmRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgUmVuZGVyZXIyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuXG5leHBvcnQgY29uc3QgS05PQl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEtub2IpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuLyoqXG4gKiBLbm9iIGlzIGEgZm9ybSBjb21wb25lbnQgdG8gZGVmaW5lIG51bWJlciBpbnB1dHMgd2l0aCBhIGRpYWwuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Ata25vYicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cInNpemUgKyAncHgnXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuaGVpZ2h0XT1cInNpemUgKyAncHgnXCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uTW91c2VEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChtb3VzZXVwKT1cIm9uTW91c2VVcCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHRvdWNoZW5kKT1cIm9uVG91Y2hFbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHBhdGggW2F0dHIuZF09XCJyYW5nZVBhdGgoKVwiIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiIFthdHRyLnN0cm9rZV09XCJyYW5nZUNvbG9yXCIgY2xhc3M9XCJwLWtub2ItcmFuZ2VcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgPHBhdGggW2F0dHIuZF09XCJ2YWx1ZVBhdGgoKVwiIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiIFthdHRyLnN0cm9rZV09XCJ2YWx1ZUNvbG9yXCIgY2xhc3M9XCJwLWtub2ItdmFsdWVcIj48L3BhdGg+XG4gICAgICAgICAgICAgICAgPHRleHQgKm5nSWY9XCJzaG93VmFsdWVcIiBbYXR0ci54XT1cIjUwXCIgW2F0dHIueV09XCI1N1wiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgW2F0dHIuZmlsbF09XCJ0ZXh0Q29sb3JcIiBjbGFzcz1cInAta25vYi10ZXh0XCIgW2F0dHIubmFtZV09XCJuYW1lXCI+e3sgdmFsdWVUb0Rpc3BsYXkoKSB9fTwvdGV4dD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0tOT0JfVkFMVUVfQUNDRVNTT1JdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4va25vYi5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgS25vYiB7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQmFja2dyb3VuZCBvZiB0aGUgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmFsdWVDb2xvcjogc3RyaW5nID0gJ3ZhcigtLXByaW1hcnktY29sb3IsIEJsYWNrKSc7XG4gICAgLyoqXG4gICAgICogQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgcmFuZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmFuZ2VDb2xvcjogc3RyaW5nID0gJ3ZhcigtLXN1cmZhY2UtYm9yZGVyLCBMaWdodEdyYXkpJztcbiAgICAvKipcbiAgICAgKiBDb2xvciBvZiB0aGUgdmFsdWUgdGV4dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0ZXh0Q29sb3I6IHN0cmluZyA9ICd2YXIoLS10ZXh0LWNvbG9yLXNlY29uZGFyeSwgQmxhY2spJztcbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSBzdHJpbmcgb2YgdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZhbHVlVGVtcGxhdGU6IHN0cmluZyA9ICd7dmFsdWV9JztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBjb21wb25lbnQgaW4gcGl4ZWxzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlciA9IDEwMDtcbiAgICAvKipcbiAgICAgKiBTdGVwIGZhY3RvciB0byBpbmNyZW1lbnQvZGVjcmVtZW50IHRoZSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdGVwOiBudW1iZXIgPSAxO1xuICAgIC8qKlxuICAgICAqIE1pbmludW0gYm91bmRhcnkgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWluOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIE1heGltdW0gYm91bmRhcnkgdmFsdWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXIgPSAxMDA7XG4gICAgLyoqXG4gICAgICogV2lkdGggb2YgdGhlIGtub2Igc3Ryb2tlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0cm9rZVdpZHRoOiBudW1iZXIgPSAxNDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHNob3cgdGhlIHZhbHVlIGluc2lkZSB0aGUga25vYi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcHJlc2VudCwgaXQgc3BlY2lmaWVzIHRoYXQgdGhlIGNvbXBvbmVudCB2YWx1ZSBjYW5ub3QgYmUgZWRpdGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIHZhbHVlIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBOZXcgdmFsdWUuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgcmFkaXVzOiBudW1iZXIgPSA0MDtcblxuICAgIG1pZFg6IG51bWJlciA9IDUwO1xuXG4gICAgbWlkWTogbnVtYmVyID0gNTA7XG5cbiAgICBtaW5SYWRpYW5zOiBudW1iZXIgPSAoNCAqIE1hdGguUEkpIC8gMztcblxuICAgIG1heFJhZGlhbnM6IG51bWJlciA9IC1NYXRoLlBJIC8gMztcblxuICAgIHZhbHVlOiBudW1iZXIgPSAwO1xuXG4gICAgd2luZG93TW91c2VNb3ZlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHdpbmRvd01vdXNlVXBMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgd2luZG93VG91Y2hNb3ZlTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIHdpbmRvd1RvdWNoRW5kTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbWFwUmFuZ2UoeDogbnVtYmVyLCBpbk1pbjogbnVtYmVyLCBpbk1heDogbnVtYmVyLCBvdXRNaW46IG51bWJlciwgb3V0TWF4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuICgoeCAtIGluTWluKSAqIChvdXRNYXggLSBvdXRNaW4pKSAvIChpbk1heCAtIGluTWluKSArIG91dE1pbjtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBkeCA9IG9mZnNldFggLSB0aGlzLnNpemUgLyAyO1xuICAgICAgICBsZXQgZHkgPSB0aGlzLnNpemUgLyAyIC0gb2Zmc2V0WTtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpO1xuICAgICAgICBsZXQgc3RhcnQgPSAtTWF0aC5QSSAvIDIgLSBNYXRoLlBJIC8gNjtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbChhbmdsZSwgc3RhcnQpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKGFuZ2xlOiBudW1iZXIsIHN0YXJ0OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG1hcHBlZFZhbHVlO1xuICAgICAgICBpZiAoYW5nbGUgPiB0aGlzLm1heFJhZGlhbnMpIG1hcHBlZFZhbHVlID0gdGhpcy5tYXBSYW5nZShhbmdsZSwgdGhpcy5taW5SYWRpYW5zLCB0aGlzLm1heFJhZGlhbnMsIHRoaXMubWluLCB0aGlzLm1heCk7XG4gICAgICAgIGVsc2UgaWYgKGFuZ2xlIDwgc3RhcnQpIG1hcHBlZFZhbHVlID0gdGhpcy5tYXBSYW5nZShhbmdsZSArIDIgKiBNYXRoLlBJLCB0aGlzLm1pblJhZGlhbnMsIHRoaXMubWF4UmFkaWFucywgdGhpcy5taW4sIHRoaXMubWF4KTtcbiAgICAgICAgZWxzZSByZXR1cm47XG5cbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gTWF0aC5yb3VuZCgobWFwcGVkVmFsdWUgLSB0aGlzLm1pbikgLyB0aGlzLnN0ZXApICogdGhpcy5zdGVwICsgdGhpcy5taW47XG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICBjb25zdCB3aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IHx8ICd3aW5kb3cnO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dNb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHdpbmRvdywgJ21vdXNlbW92ZScsIHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLndpbmRvd01vdXNlVXBMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHdpbmRvdywgJ21vdXNldXAnLCB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy53aW5kb3dNb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMud2luZG93TW91c2VNb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLndpbmRvd01vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLndpbmRvd01vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMud2luZG93TW91c2VVcExpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3dNb3VzZU1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaFN0YXJ0KGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgY29uc3Qgd2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyB8fCAnd2luZG93JztcbiAgICAgICAgICAgIHRoaXMud2luZG93VG91Y2hNb3ZlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih3aW5kb3csICd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dUb3VjaEVuZExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4od2luZG93LCAndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ub3VjaEVuZChldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndpbmRvd1RvdWNoTW92ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3dUb3VjaE1vdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMud2luZG93VG91Y2hFbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMud2luZG93VG91Y2hFbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53aW5kb3dUb3VjaE1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLndpbmRvd1RvdWNoRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoTW92ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5ICYmIGV2ZW50IGluc3RhbmNlb2YgVG91Y2hFdmVudCAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQudGFyZ2V0VG91Y2hlcy5pdGVtKDApO1xuICAgICAgICAgICAgaWYgKHRvdWNoKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IHRvdWNoLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IHRvdWNoLmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKG9mZnNldFgsIG9mZnNldFkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1rbm9iIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWRpc2FibGVkJzogdGhpcy5kaXNhYmxlZFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJhbmdlUGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIGBNICR7dGhpcy5taW5YKCl9ICR7dGhpcy5taW5ZKCl9IEEgJHt0aGlzLnJhZGl1c30gJHt0aGlzLnJhZGl1c30gMCAxIDEgJHt0aGlzLm1heFgoKX0gJHt0aGlzLm1heFkoKX1gO1xuICAgIH1cblxuICAgIHZhbHVlUGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIGBNICR7dGhpcy56ZXJvWCgpfSAke3RoaXMuemVyb1koKX0gQSAke3RoaXMucmFkaXVzfSAke3RoaXMucmFkaXVzfSAwICR7dGhpcy5sYXJnZUFyYygpfSAke3RoaXMuc3dlZXAoKX0gJHt0aGlzLnZhbHVlWCgpfSAke3RoaXMudmFsdWVZKCl9YDtcbiAgICB9XG5cbiAgICB6ZXJvUmFkaWFucygpIHtcbiAgICAgICAgaWYgKHRoaXMubWluID4gMCAmJiB0aGlzLm1heCA+IDApIHJldHVybiB0aGlzLm1hcFJhbmdlKHRoaXMubWluLCB0aGlzLm1pbiwgdGhpcy5tYXgsIHRoaXMubWluUmFkaWFucywgdGhpcy5tYXhSYWRpYW5zKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5tYXBSYW5nZSgwLCB0aGlzLm1pbiwgdGhpcy5tYXgsIHRoaXMubWluUmFkaWFucywgdGhpcy5tYXhSYWRpYW5zKTtcbiAgICB9XG5cbiAgICB2YWx1ZVJhZGlhbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hcFJhbmdlKHRoaXMuX3ZhbHVlLCB0aGlzLm1pbiwgdGhpcy5tYXgsIHRoaXMubWluUmFkaWFucywgdGhpcy5tYXhSYWRpYW5zKTtcbiAgICB9XG5cbiAgICBtaW5YKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWRYICsgTWF0aC5jb3ModGhpcy5taW5SYWRpYW5zKSAqIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIG1pblkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1pZFkgLSBNYXRoLnNpbih0aGlzLm1pblJhZGlhbnMpICogdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgbWF4WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlkWCArIE1hdGguY29zKHRoaXMubWF4UmFkaWFucykgKiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBtYXhZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWRZIC0gTWF0aC5zaW4odGhpcy5tYXhSYWRpYW5zKSAqIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIHplcm9YKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWRYICsgTWF0aC5jb3ModGhpcy56ZXJvUmFkaWFucygpKSAqIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIHplcm9ZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWRZIC0gTWF0aC5zaW4odGhpcy56ZXJvUmFkaWFucygpKSAqIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIHZhbHVlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWlkWCArIE1hdGguY29zKHRoaXMudmFsdWVSYWRpYW5zKCkpICogdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgdmFsdWVZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5taWRZIC0gTWF0aC5zaW4odGhpcy52YWx1ZVJhZGlhbnMoKSkgKiB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBsYXJnZUFyYygpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMuemVyb1JhZGlhbnMoKSAtIHRoaXMudmFsdWVSYWRpYW5zKCkpIDwgTWF0aC5QSSA/IDAgOiAxO1xuICAgIH1cblxuICAgIHN3ZWVwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVJhZGlhbnMoKSA+IHRoaXMuemVyb1JhZGlhbnMoKSA/IDAgOiAxO1xuICAgIH1cblxuICAgIHZhbHVlVG9EaXNwbGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRlbXBsYXRlLnJlcGxhY2UoJ3t2YWx1ZX0nLCB0aGlzLl92YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICBnZXQgX3ZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlICE9IG51bGwgPyB0aGlzLnZhbHVlIDogdGhpcy5taW47XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtLbm9iXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtLbm9iXVxufSlcbmV4cG9ydCBjbGFzcyBLbm9iTW9kdWxlIHt9XG4iXX0=