import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomHandler } from 'primeng/dom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Slider),
    multi: true
};
/**
 * Slider is a component to provide input with a drag handle.
 * @group Components
 */
class Slider {
    document;
    platformId;
    el;
    renderer;
    ngZone;
    cd;
    /**
     * When enabled, displays an animation on click of the slider bar.
     * @group Props
     */
    animate;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled;
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
     * Orientation of the slider.
     * @group Props
     */
    orientation = 'horizontal';
    /**
     * Step factor to increment/decrement the value.
     * @group Props
     */
    step;
    /**
     * When specified, allows two boundary values to be picked.
     * @group Props
     */
    range;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Callback to invoke on value change.
     * @param {SliderChangeEvent} event - Custom value change event.
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke when slide ended.
     * @param {SliderSlideEndEvent} event - Custom slide end event.
     * @group Emits
     */
    onSlideEnd = new EventEmitter();
    sliderHandle;
    sliderHandleStart;
    sliderHandleEnd;
    value;
    values;
    handleValue;
    handleValues = [];
    diff;
    offset;
    bottom;
    onModelChange = () => { };
    onModelTouched = () => { };
    dragging;
    dragListener;
    mouseupListener;
    initX;
    initY;
    barWidth;
    barHeight;
    sliderHandleClick;
    handleIndex = 0;
    startHandleValue;
    startx;
    starty;
    constructor(document, platformId, el, renderer, ngZone, cd) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.cd = cd;
    }
    onMouseDown(event, index) {
        if (this.disabled) {
            return;
        }
        this.dragging = true;
        this.updateDomData();
        this.sliderHandleClick = true;
        if (this.range && this.handleValues && this.handleValues[0] === this.max) {
            this.handleIndex = 0;
        }
        else {
            this.handleIndex = index;
        }
        this.bindDragListeners();
        event.target.focus();
        event.preventDefault();
        if (this.animate) {
            DomHandler.removeClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
    }
    onTouchStart(event, index) {
        if (this.disabled) {
            return;
        }
        var touchobj = event.changedTouches[0];
        this.startHandleValue = this.range ? this.handleValues[index] : this.handleValue;
        this.dragging = true;
        if (this.range && this.handleValues && this.handleValues[0] === this.max) {
            this.handleIndex = 0;
        }
        else {
            this.handleIndex = index;
        }
        if (this.orientation === 'horizontal') {
            this.startx = parseInt(touchobj.clientX, 10);
            this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        }
        else {
            this.starty = parseInt(touchobj.clientY, 10);
            this.barHeight = this.el.nativeElement.children[0].offsetHeight;
        }
        if (this.animate) {
            DomHandler.removeClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
        event.preventDefault();
    }
    onTouchMove(event) {
        if (this.disabled) {
            return;
        }
        var touchobj = event.changedTouches[0], handleValue = 0;
        if (this.orientation === 'horizontal') {
            handleValue = Math.floor(((parseInt(touchobj.clientX, 10) - this.startx) * 100) / this.barWidth) + this.startHandleValue;
        }
        else {
            handleValue = Math.floor(((this.starty - parseInt(touchobj.clientY, 10)) * 100) / this.barHeight) + this.startHandleValue;
        }
        this.setValueFromHandle(event, handleValue);
        event.preventDefault();
    }
    onTouchEnd(event) {
        if (this.disabled) {
            return;
        }
        this.dragging = false;
        if (this.range)
            this.onSlideEnd.emit({ originalEvent: event, values: this.values });
        else
            this.onSlideEnd.emit({ originalEvent: event, value: this.value });
        if (this.animate) {
            DomHandler.addClass(this.el.nativeElement.children[0], 'p-slider-animate');
        }
        event.preventDefault();
    }
    onBarClick(event) {
        if (this.disabled) {
            return;
        }
        if (!this.sliderHandleClick) {
            this.updateDomData();
            this.handleChange(event);
        }
        this.sliderHandleClick = false;
    }
    onHandleKeydown(event, handleIndex) {
        if (this.disabled) {
            return;
        }
        if (event.which == 38 || event.which == 39) {
            this.spin(event, 1, handleIndex);
        }
        else if (event.which == 37 || event.which == 40) {
            this.spin(event, -1, handleIndex);
        }
    }
    spin(event, dir, handleIndex) {
        let step = (this.step || 1) * dir;
        if (this.range) {
            this.handleIndex = handleIndex;
            this.updateValue(this.values[this.handleIndex] + step);
            this.updateHandleValue();
        }
        else {
            this.updateValue(this.value + step);
            this.updateHandleValue();
        }
        event.preventDefault();
    }
    handleChange(event) {
        let handleValue = this.calculateHandleValue(event);
        this.setValueFromHandle(event, handleValue);
    }
    bindDragListeners() {
        if (isPlatformBrowser(this.platformId)) {
            this.ngZone.runOutsideAngular(() => {
                const documentTarget = this.el ? this.el.nativeElement.ownerDocument : this.document;
                if (!this.dragListener) {
                    this.dragListener = this.renderer.listen(documentTarget, 'mousemove', (event) => {
                        if (this.dragging) {
                            this.ngZone.run(() => {
                                this.handleChange(event);
                            });
                        }
                    });
                }
                if (!this.mouseupListener) {
                    this.mouseupListener = this.renderer.listen(documentTarget, 'mouseup', (event) => {
                        if (this.dragging) {
                            this.dragging = false;
                            this.ngZone.run(() => {
                                if (this.range)
                                    this.onSlideEnd.emit({ originalEvent: event, values: this.values });
                                else
                                    this.onSlideEnd.emit({ originalEvent: event, value: this.value });
                                if (this.animate) {
                                    DomHandler.addClass(this.el.nativeElement.children[0], 'p-slider-animate');
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    unbindDragListeners() {
        if (this.dragListener) {
            this.dragListener();
            this.dragListener = null;
        }
        if (this.mouseupListener) {
            this.mouseupListener();
            this.mouseupListener = null;
        }
    }
    setValueFromHandle(event, handleValue) {
        this.sliderHandleClick = false;
        let newValue = this.getValueFromHandle(handleValue);
        if (this.range) {
            if (this.step) {
                this.handleStepChange(newValue, this.values[this.handleIndex]);
            }
            else {
                this.handleValues[this.handleIndex] = handleValue;
                this.updateValue(newValue, event);
            }
        }
        else {
            if (this.step) {
                this.handleStepChange(newValue, this.value);
            }
            else {
                this.handleValue = handleValue;
                this.updateValue(newValue, event);
            }
        }
        this.cd.markForCheck();
    }
    handleStepChange(newValue, oldValue) {
        let diff = newValue - oldValue;
        let val = oldValue;
        let _step = this.step;
        if (diff < 0) {
            val = oldValue + Math.ceil(newValue / _step - oldValue / _step) * _step;
        }
        else if (diff > 0) {
            val = oldValue + Math.floor(newValue / _step - oldValue / _step) * _step;
        }
        this.updateValue(val);
        this.updateHandleValue();
    }
    writeValue(value) {
        if (this.range)
            this.values = value || [0, 0];
        else
            this.value = value || 0;
        this.updateHandleValue();
        this.updateDiffAndOffset();
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
    get rangeStartLeft() {
        if (!this.isVertical())
            return this.handleValues[0] > 100 ? 100 + '%' : this.handleValues[0] + '%';
        return null;
    }
    get rangeStartBottom() {
        return this.isVertical() ? this.handleValues[0] + '%' : 'auto';
    }
    get rangeEndLeft() {
        return this.isVertical() ? null : this.handleValues[1] + '%';
    }
    get rangeEndBottom() {
        return this.isVertical() ? this.handleValues[1] + '%' : 'auto';
    }
    isVertical() {
        return this.orientation === 'vertical';
    }
    updateDomData() {
        let rect = this.el.nativeElement.children[0].getBoundingClientRect();
        this.initX = rect.left + DomHandler.getWindowScrollLeft();
        this.initY = rect.top + DomHandler.getWindowScrollTop();
        this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        this.barHeight = this.el.nativeElement.children[0].offsetHeight;
    }
    calculateHandleValue(event) {
        if (this.orientation === 'horizontal')
            return ((event.pageX - this.initX) * 100) / this.barWidth;
        else
            return ((this.initY + this.barHeight - event.pageY) * 100) / this.barHeight;
    }
    updateHandleValue() {
        if (this.range) {
            this.handleValues[0] = ((this.values[0] < this.min ? 0 : this.values[0] - this.min) * 100) / (this.max - this.min);
            this.handleValues[1] = ((this.values[1] > this.max ? 100 : this.values[1] - this.min) * 100) / (this.max - this.min);
        }
        else {
            if (this.value < this.min)
                this.handleValue = 0;
            else if (this.value > this.max)
                this.handleValue = 100;
            else
                this.handleValue = ((this.value - this.min) * 100) / (this.max - this.min);
        }
        if (this.step) {
            this.updateDiffAndOffset();
        }
    }
    updateDiffAndOffset() {
        this.diff = this.getDiff();
        this.offset = this.getOffset();
    }
    getDiff() {
        return Math.abs(this.handleValues[0] - this.handleValues[1]);
    }
    getOffset() {
        return Math.min(this.handleValues[0], this.handleValues[1]);
    }
    updateValue(val, event) {
        if (this.range) {
            let value = val;
            if (this.handleIndex == 0) {
                if (value < this.min) {
                    value = this.min;
                    this.handleValues[0] = 0;
                }
                else if (value > this.values[1]) {
                    if (value > this.max) {
                        value = this.max;
                        this.handleValues[0] = 100;
                    }
                }
                this.sliderHandleStart?.nativeElement.focus();
            }
            else {
                if (value > this.max) {
                    value = this.max;
                    this.handleValues[1] = 100;
                    this.offset = this.handleValues[1];
                }
                else if (value < this.min) {
                    value = this.min;
                    this.handleValues[1] = 0;
                }
                else if (value < this.values[0]) {
                    this.offset = this.handleValues[1];
                }
                this.sliderHandleEnd?.nativeElement.focus();
            }
            if (this.step) {
                this.updateHandleValue();
            }
            else {
                this.updateDiffAndOffset();
            }
            this.values[this.handleIndex] = this.getNormalizedValue(value);
            let newValues = [this.minVal, this.maxVal];
            this.onModelChange(newValues);
            this.onChange.emit({ event: event, values: this.values });
        }
        else {
            if (val < this.min) {
                val = this.min;
                this.handleValue = 0;
            }
            else if (val > this.max) {
                val = this.max;
                this.handleValue = 100;
            }
            this.value = this.getNormalizedValue(val);
            this.onModelChange(this.value);
            this.onChange.emit({ event: event, value: this.value });
            this.sliderHandle?.nativeElement.focus();
        }
    }
    getValueFromHandle(handleValue) {
        return (this.max - this.min) * (handleValue / 100) + this.min;
    }
    getDecimalsCount(value) {
        if (value && Math.floor(value) !== value)
            return value.toString().split('.')[1].length || 0;
        return 0;
    }
    getNormalizedValue(val) {
        let decimalsCount = this.getDecimalsCount(this.step);
        if (decimalsCount > 0) {
            return +parseFloat(val.toString()).toFixed(decimalsCount);
        }
        else {
            return Math.floor(val);
        }
    }
    ngOnDestroy() {
        this.unbindDragListeners();
    }
    get minVal() {
        return Math.min(this.values[1], this.values[0]);
    }
    get maxVal() {
        return Math.max(this.values[1], this.values[0]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Slider, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Slider, selector: "p-slider", inputs: { animate: "animate", disabled: "disabled", min: "min", max: "max", orientation: "orientation", step: "step", range: "range", style: "style", styleClass: "styleClass", ariaLabelledBy: "ariaLabelledBy", tabindex: "tabindex" }, outputs: { onChange: "onChange", onSlideEnd: "onSlideEnd" }, host: { classAttribute: "p-element" }, providers: [SLIDER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "sliderHandle", first: true, predicate: ["sliderHandle"], descendants: true }, { propertyName: "sliderHandleStart", first: true, predicate: ["sliderHandleStart"], descendants: true }, { propertyName: "sliderHandleEnd", first: true, predicate: ["sliderHandleEnd"], descendants: true }], ngImport: i0, template: `
        <div
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-slider p-component': true, 'p-disabled': disabled, 'p-slider-horizontal': orientation == 'horizontal', 'p-slider-vertical': orientation == 'vertical', 'p-slider-animate': animate }"
            (click)="onBarClick($event)"
        >
            <span
                *ngIf="range && orientation == 'horizontal'"
                class="p-slider-range"
                [ngStyle]="{ left: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%', width: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%' }"
            ></span>
            <span
                *ngIf="range && orientation == 'vertical'"
                class="p-slider-range"
                [ngStyle]="{ bottom: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%', height: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%' }"
            ></span>
            <span *ngIf="!range && orientation == 'vertical'" class="p-slider-range" [ngStyle]="{ height: handleValue + '%' }"></span>
            <span *ngIf="!range && orientation == 'horizontal'" class="p-slider-range" [ngStyle]="{ width: handleValue + '%' }"></span>
            <span
                #sliderHandle
                *ngIf="!range"
                [attr.tabindex]="disabled ? null : tabindex"
                (keydown)="onHandleKeydown($event)"
                class="p-slider-handle"
                (mousedown)="onMouseDown($event)"
                (touchstart)="onTouchStart($event)"
                (touchmove)="onTouchMove($event)"
                (touchend)="onTouchEnd($event)"
                [style.transition]="dragging ? 'none' : null"
                [ngStyle]="{ left: orientation == 'horizontal' ? handleValue + '%' : null, bottom: orientation == 'vertical' ? handleValue + '%' : null }"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
            ></span>
            <span
                #sliderHandleStart
                *ngIf="range"
                [attr.tabindex]="disabled ? null : tabindex"
                (keydown)="onHandleKeydown($event, 0)"
                (mousedown)="onMouseDown($event, 0)"
                (touchstart)="onTouchStart($event, 0)"
                (touchmove)="onTouchMove($event, 0)"
                (touchend)="onTouchEnd($event)"
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ left: rangeStartLeft, bottom: rangeStartBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 0 }"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[0] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
            ></span>
            <span
                #sliderHandleEnd
                *ngIf="range"
                [attr.tabindex]="disabled ? null : tabindex"
                (keydown)="onHandleKeydown($event, 1)"
                (mousedown)="onMouseDown($event, 1)"
                (touchstart)="onTouchStart($event, 1)"
                (touchmove)="onTouchMove($event, 1)"
                (touchend)="onTouchEnd($event)"
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ left: rangeEndLeft, bottom: rangeEndBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 1 }"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[1] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
            ></span>
        </div>
    `, isInline: true, styles: [".p-slider{position:relative}.p-slider .p-slider-handle{position:absolute;cursor:grab;touch-action:none;display:block}.p-slider-range{position:absolute;display:block}.p-slider-horizontal .p-slider-range{top:0;left:0;height:100%}.p-slider-horizontal .p-slider-handle{top:50%}.p-slider-vertical{height:100px}.p-slider-vertical .p-slider-handle{left:50%}.p-slider-vertical .p-slider-range{bottom:0;left:0;width:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Slider };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Slider, decorators: [{
            type: Component,
            args: [{ selector: 'p-slider', template: `
        <div
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-slider p-component': true, 'p-disabled': disabled, 'p-slider-horizontal': orientation == 'horizontal', 'p-slider-vertical': orientation == 'vertical', 'p-slider-animate': animate }"
            (click)="onBarClick($event)"
        >
            <span
                *ngIf="range && orientation == 'horizontal'"
                class="p-slider-range"
                [ngStyle]="{ left: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%', width: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%' }"
            ></span>
            <span
                *ngIf="range && orientation == 'vertical'"
                class="p-slider-range"
                [ngStyle]="{ bottom: offset !== null && offset !== undefined ? offset + '%' : handleValues[0] + '%', height: diff ? diff + '%' : handleValues[1] - handleValues[0] + '%' }"
            ></span>
            <span *ngIf="!range && orientation == 'vertical'" class="p-slider-range" [ngStyle]="{ height: handleValue + '%' }"></span>
            <span *ngIf="!range && orientation == 'horizontal'" class="p-slider-range" [ngStyle]="{ width: handleValue + '%' }"></span>
            <span
                #sliderHandle
                *ngIf="!range"
                [attr.tabindex]="disabled ? null : tabindex"
                (keydown)="onHandleKeydown($event)"
                class="p-slider-handle"
                (mousedown)="onMouseDown($event)"
                (touchstart)="onTouchStart($event)"
                (touchmove)="onTouchMove($event)"
                (touchend)="onTouchEnd($event)"
                [style.transition]="dragging ? 'none' : null"
                [ngStyle]="{ left: orientation == 'horizontal' ? handleValue + '%' : null, bottom: orientation == 'vertical' ? handleValue + '%' : null }"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
            ></span>
            <span
                #sliderHandleStart
                *ngIf="range"
                [attr.tabindex]="disabled ? null : tabindex"
                (keydown)="onHandleKeydown($event, 0)"
                (mousedown)="onMouseDown($event, 0)"
                (touchstart)="onTouchStart($event, 0)"
                (touchmove)="onTouchMove($event, 0)"
                (touchend)="onTouchEnd($event)"
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ left: rangeStartLeft, bottom: rangeStartBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 0 }"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[0] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
            ></span>
            <span
                #sliderHandleEnd
                *ngIf="range"
                [attr.tabindex]="disabled ? null : tabindex"
                (keydown)="onHandleKeydown($event, 1)"
                (mousedown)="onMouseDown($event, 1)"
                (touchstart)="onTouchStart($event, 1)"
                (touchmove)="onTouchMove($event, 1)"
                (touchend)="onTouchEnd($event)"
                [style.transition]="dragging ? 'none' : null"
                class="p-slider-handle"
                [ngStyle]="{ left: rangeEndLeft, bottom: rangeEndBottom }"
                [ngClass]="{ 'p-slider-handle-active': handleIndex == 1 }"
                [attr.aria-valuemin]="min"
                [attr.aria-valuenow]="value ? value[1] : null"
                [attr.aria-valuemax]="max"
                [attr.aria-labelledby]="ariaLabelledBy"
            ></span>
        </div>
    `, providers: [SLIDER_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-slider{position:relative}.p-slider .p-slider-handle{position:absolute;cursor:grab;touch-action:none;display:block}.p-slider-range{position:absolute;display:block}.p-slider-horizontal .p-slider-range{top:0;left:0;height:100%}.p-slider-horizontal .p-slider-handle{top:50%}.p-slider-vertical{height:100px}.p-slider-vertical .p-slider-handle{left:50%}.p-slider-vertical .p-slider-range{bottom:0;left:0;width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { animate: [{
                type: Input
            }], disabled: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], orientation: [{
                type: Input
            }], step: [{
                type: Input
            }], range: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onSlideEnd: [{
                type: Output
            }], sliderHandle: [{
                type: ViewChild,
                args: ['sliderHandle']
            }], sliderHandleStart: [{
                type: ViewChild,
                args: ['sliderHandleStart']
            }], sliderHandleEnd: [{
                type: ViewChild,
                args: ['sliderHandleEnd']
            }] } });
class SliderModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: SliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: SliderModule, declarations: [Slider], imports: [CommonModule], exports: [Slider] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: SliderModule, imports: [CommonModule] });
}
export { SliderModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: SliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Slider],
                    declarations: [Slider]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3NsaWRlci9zbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsdUJBQXVCLEVBQXFCLFNBQVMsRUFBYyxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFxQixNQUFNLEVBQUUsV0FBVyxFQUFhLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0TyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBSXpDLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFRO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBQ0Y7OztHQUdHO0FBQ0gsTUFvRmEsTUFBTTtJQXFIdUI7SUFBaUQ7SUFBd0I7SUFBdUI7SUFBNkI7SUFBdUI7SUFwSDFMOzs7T0FHRztJQUNNLE9BQU8sQ0FBc0I7SUFDdEM7OztPQUdHO0lBQ00sUUFBUSxDQUFzQjtJQUN2Qzs7O09BR0c7SUFDTSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0lBQ3pCOzs7T0FHRztJQUNNLEdBQUcsR0FBVyxHQUFHLENBQUM7SUFDM0I7OztPQUdHO0lBQ00sV0FBVyxHQUE4QixZQUFZLENBQUM7SUFDL0Q7OztPQUdHO0lBQ00sSUFBSSxDQUFxQjtJQUNsQzs7O09BR0c7SUFDTSxLQUFLLENBQXNCO0lBQ3BDOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7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QUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBTUksUUFBUTtzQkFBakIsTUFBTTtnQkFNRyxVQUFVO3NCQUFuQixNQUFNO2dCQUVvQixZQUFZO3NCQUF0QyxTQUFTO3VCQUFDLGNBQWM7Z0JBRU8saUJBQWlCO3NCQUFoRCxTQUFTO3VCQUFDLG1CQUFtQjtnQkFFQSxlQUFlO3NCQUE1QyxTQUFTO3VCQUFDLGlCQUFpQjs7QUFnYmhDLE1BS2EsWUFBWTt1R0FBWixZQUFZO3dHQUFaLFlBQVksaUJBOWZaLE1BQU0sYUEwZkwsWUFBWSxhQTFmYixNQUFNO3dHQThmTixZQUFZLFlBSlgsWUFBWTs7U0FJYixZQUFZOzJGQUFaLFlBQVk7a0JBTHhCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ2pCLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbmplY3QsIElucHV0LCBOZ01vZHVsZSwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dCwgUExBVEZPUk1fSUQsIFJlbmRlcmVyMiwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE51bGxhYmxlLCBWb2lkTGlzdGVuZXIgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgU2xpZGVyQ2hhbmdlRXZlbnQsIFNsaWRlclNsaWRlRW5kRXZlbnQgfSBmcm9tICcuL3NsaWRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgU0xJREVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcbi8qKlxuICogU2xpZGVyIGlzIGEgY29tcG9uZW50IHRvIHByb3ZpZGUgaW5wdXQgd2l0aCBhIGRyYWcgaGFuZGxlLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNsaWRlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1zbGlkZXIgcC1jb21wb25lbnQnOiB0cnVlLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkLCAncC1zbGlkZXItaG9yaXpvbnRhbCc6IG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJywgJ3Atc2xpZGVyLXZlcnRpY2FsJzogb3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJywgJ3Atc2xpZGVyLWFuaW1hdGUnOiBhbmltYXRlIH1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQmFyQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJyYW5nZSAmJiBvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCdcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zbGlkZXItcmFuZ2VcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgbGVmdDogb2Zmc2V0ICE9PSBudWxsICYmIG9mZnNldCAhPT0gdW5kZWZpbmVkID8gb2Zmc2V0ICsgJyUnIDogaGFuZGxlVmFsdWVzWzBdICsgJyUnLCB3aWR0aDogZGlmZiA/IGRpZmYgKyAnJScgOiBoYW5kbGVWYWx1ZXNbMV0gLSBoYW5kbGVWYWx1ZXNbMF0gKyAnJScgfVwiXG4gICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAqbmdJZj1cInJhbmdlICYmIG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCdcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zbGlkZXItcmFuZ2VcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgYm90dG9tOiBvZmZzZXQgIT09IG51bGwgJiYgb2Zmc2V0ICE9PSB1bmRlZmluZWQgPyBvZmZzZXQgKyAnJScgOiBoYW5kbGVWYWx1ZXNbMF0gKyAnJScsIGhlaWdodDogZGlmZiA/IGRpZmYgKyAnJScgOiBoYW5kbGVWYWx1ZXNbMV0gLSBoYW5kbGVWYWx1ZXNbMF0gKyAnJScgfVwiXG4gICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhcmFuZ2UgJiYgb3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJ1wiIGNsYXNzPVwicC1zbGlkZXItcmFuZ2VcIiBbbmdTdHlsZV09XCJ7IGhlaWdodDogaGFuZGxlVmFsdWUgKyAnJScgfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXJhbmdlICYmIG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJ1wiIGNsYXNzPVwicC1zbGlkZXItcmFuZ2VcIiBbbmdTdHlsZV09XCJ7IHdpZHRoOiBoYW5kbGVWYWx1ZSArICclJyB9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAjc2xpZGVySGFuZGxlXG4gICAgICAgICAgICAgICAgKm5nSWY9XCIhcmFuZ2VcIlxuICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IHRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkhhbmRsZUtleWRvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJwLXNsaWRlci1oYW5kbGVcIlxuICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICh0b3VjaG1vdmUpPVwib25Ub3VjaE1vdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHRvdWNoZW5kKT1cIm9uVG91Y2hFbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25dPVwiZHJhZ2dpbmcgPyAnbm9uZScgOiBudWxsXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGxlZnQ6IG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJyA/IGhhbmRsZVZhbHVlICsgJyUnIDogbnVsbCwgYm90dG9tOiBvcmllbnRhdGlvbiA9PSAndmVydGljYWwnID8gaGFuZGxlVmFsdWUgKyAnJScgOiBudWxsIH1cIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwibWluXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcbiAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICNzbGlkZXJIYW5kbGVTdGFydFxuICAgICAgICAgICAgICAgICpuZ0lmPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IHRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkhhbmRsZUtleWRvd24oJGV2ZW50LCAwKVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsIDApXCJcbiAgICAgICAgICAgICAgICAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50LCAwKVwiXG4gICAgICAgICAgICAgICAgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQsIDApXCJcbiAgICAgICAgICAgICAgICAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJkcmFnZ2luZyA/ICdub25lJyA6IG51bGxcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zbGlkZXItaGFuZGxlXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGxlZnQ6IHJhbmdlU3RhcnRMZWZ0LCBib3R0b206IHJhbmdlU3RhcnRCb3R0b20gfVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1zbGlkZXItaGFuZGxlLWFjdGl2ZSc6IGhhbmRsZUluZGV4ID09IDAgfVwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1pbl09XCJtaW5cIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWUgPyB2YWx1ZVswXSA6IG51bGxcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgI3NsaWRlckhhbmRsZUVuZFxuICAgICAgICAgICAgICAgICpuZ0lmPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IHRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbkhhbmRsZUtleWRvd24oJGV2ZW50LCAxKVwiXG4gICAgICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsIDEpXCJcbiAgICAgICAgICAgICAgICAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50LCAxKVwiXG4gICAgICAgICAgICAgICAgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQsIDEpXCJcbiAgICAgICAgICAgICAgICAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJkcmFnZ2luZyA/ICdub25lJyA6IG51bGxcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zbGlkZXItaGFuZGxlXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGxlZnQ6IHJhbmdlRW5kTGVmdCwgYm90dG9tOiByYW5nZUVuZEJvdHRvbSB9XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXNsaWRlci1oYW5kbGUtYWN0aXZlJzogaGFuZGxlSW5kZXggPT0gMSB9XCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWluXT1cIm1pblwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJ2YWx1ZSA/IHZhbHVlWzFdIDogbnVsbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1NMSURFUl9WQUxVRV9BQ0NFU1NPUl0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zbGlkZXIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgZGlzcGxheXMgYW4gYW5pbWF0aW9uIG9uIGNsaWNrIG9mIHRoZSBzbGlkZXIgYmFyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFuaW1hdGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBwcmVzZW50LCBpdCBzcGVjaWZpZXMgdGhhdCB0aGUgZWxlbWVudCBzaG91bGQgYmUgZGlzYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWluaW51bSBib3VuZGFyeSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtaW46IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogTWF4aW11bSBib3VuZGFyeSB2YWx1ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtYXg6IG51bWJlciA9IDEwMDtcbiAgICAvKipcbiAgICAgKiBPcmllbnRhdGlvbiBvZiB0aGUgc2xpZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICAgIC8qKlxuICAgICAqIFN0ZXAgZmFjdG9yIHRvIGluY3JlbWVudC9kZWNyZW1lbnQgdGhlIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0ZXA6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCwgYWxsb3dzIHR3byBib3VuZGFyeSB2YWx1ZXMgdG8gYmUgcGlja2VkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJhbmdlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEVzdGFibGlzaGVzIHJlbGF0aW9uc2hpcHMgYmV0d2VlbiB0aGUgY29tcG9uZW50IGFuZCBsYWJlbChzKSB3aGVyZSBpdHMgdmFsdWUgc2hvdWxkIGJlIG9uZSBvciBtb3JlIGVsZW1lbnQgSURzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugb24gdmFsdWUgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7U2xpZGVyQ2hhbmdlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHZhbHVlIGNoYW5nZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxTbGlkZXJDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlckNoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHNsaWRlIGVuZGVkLlxuICAgICAqIEBwYXJhbSB7U2xpZGVyU2xpZGVFbmRFdmVudH0gZXZlbnQgLSBDdXN0b20gc2xpZGUgZW5kIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNsaWRlRW5kOiBFdmVudEVtaXR0ZXI8U2xpZGVyU2xpZGVFbmRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlclNsaWRlRW5kRXZlbnQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdzbGlkZXJIYW5kbGUnKSBzbGlkZXJIYW5kbGU6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnc2xpZGVySGFuZGxlU3RhcnQnKSBzbGlkZXJIYW5kbGVTdGFydDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdzbGlkZXJIYW5kbGVFbmQnKSBzbGlkZXJIYW5kbGVFbmQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgcHVibGljIHZhbHVlOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHVibGljIHZhbHVlczogTnVsbGFibGU8bnVtYmVyW10+O1xuXG4gICAgcHVibGljIGhhbmRsZVZhbHVlOiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHVibGljIGhhbmRsZVZhbHVlczogbnVtYmVyW10gPSBbXTtcblxuICAgIGRpZmY6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBvZmZzZXQ6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBib3R0b206IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBwdWJsaWMgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIHB1YmxpYyBkcmFnZ2luZzogTnVsbGFibGU8Ym9vbGVhbj47XG5cbiAgICBwdWJsaWMgZHJhZ0xpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBwdWJsaWMgbW91c2V1cExpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBwdWJsaWMgaW5pdFg6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBwdWJsaWMgaW5pdFk6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBwdWJsaWMgYmFyV2lkdGg6IE51bGxhYmxlPG51bWJlcj47XG5cbiAgICBwdWJsaWMgYmFySGVpZ2h0OiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHVibGljIHNsaWRlckhhbmRsZUNsaWNrOiBOdWxsYWJsZTxib29sZWFuPjtcblxuICAgIHB1YmxpYyBoYW5kbGVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBzdGFydEhhbmRsZVZhbHVlOiBhbnk7XG5cbiAgICBwdWJsaWMgc3RhcnR4OiBOdWxsYWJsZTxudW1iZXI+O1xuXG4gICAgcHVibGljIHN0YXJ0eTogTnVsbGFibGU8bnVtYmVyPjtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG9uTW91c2VEb3duKGV2ZW50OiBFdmVudCwgaW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZURvbURhdGEoKTtcbiAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVDbGljayA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlICYmIHRoaXMuaGFuZGxlVmFsdWVzICYmIHRoaXMuaGFuZGxlVmFsdWVzWzBdID09PSB0aGlzLm1heCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAodGhpcy5oYW5kbGVJbmRleCBhcyBhbnkpID0gaW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmREcmFnTGlzdGVuZXJzKCk7XG4gICAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuZm9jdXMoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodGhpcy5hbmltYXRlKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgJ3Atc2xpZGVyLWFuaW1hdGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVG91Y2hTdGFydChldmVudDogVG91Y2hFdmVudCwgaW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3VjaG9iaiA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB0aGlzLnN0YXJ0SGFuZGxlVmFsdWUgPSB0aGlzLnJhbmdlID8gdGhpcy5oYW5kbGVWYWx1ZXNbaW5kZXggYXMgbnVtYmVyXSA6IHRoaXMuaGFuZGxlVmFsdWU7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5yYW5nZSAmJiB0aGlzLmhhbmRsZVZhbHVlcyAmJiB0aGlzLmhhbmRsZVZhbHVlc1swXSA9PT0gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlSW5kZXggPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IGluZGV4IGFzIG51bWJlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnR4ID0gcGFyc2VJbnQoKHRvdWNob2JqIGFzIGFueSkuY2xpZW50WCwgMTApO1xuICAgICAgICAgICAgdGhpcy5iYXJXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnR5ID0gcGFyc2VJbnQoKHRvdWNob2JqIGFzIGFueSkuY2xpZW50WSwgMTApO1xuICAgICAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICdwLXNsaWRlci1hbmltYXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVG91Y2hNb3ZlKGV2ZW50OiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG91Y2hvYmogPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSxcbiAgICAgICAgICAgIGhhbmRsZVZhbHVlID0gMDtcblxuICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBoYW5kbGVWYWx1ZSA9IE1hdGguZmxvb3IoKChwYXJzZUludCgodG91Y2hvYmogYXMgYW55KS5jbGllbnRYLCAxMCkgLSAodGhpcy5zdGFydHggYXMgbnVtYmVyKSkgKiAxMDApIC8gKHRoaXMuYmFyV2lkdGggYXMgbnVtYmVyKSkgKyB0aGlzLnN0YXJ0SGFuZGxlVmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVWYWx1ZSA9IE1hdGguZmxvb3IoKCgodGhpcy5zdGFydHkgYXMgbnVtYmVyKSAtIHBhcnNlSW50KCh0b3VjaG9iaiBhcyBhbnkpLmNsaWVudFksIDEwKSkgKiAxMDApIC8gKHRoaXMuYmFySGVpZ2h0IGFzIG51bWJlcikpICsgdGhpcy5zdGFydEhhbmRsZVZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRWYWx1ZUZyb21IYW5kbGUoZXZlbnQsIGhhbmRsZVZhbHVlKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uVG91Y2hFbmQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5yYW5nZSkgdGhpcy5vblNsaWRlRW5kLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSB9KTtcbiAgICAgICAgZWxzZSB0aGlzLm9uU2xpZGVFbmQuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy52YWx1ZSBhcyBudW1iZXIgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICdwLXNsaWRlci1hbmltYXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uQmFyQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc2xpZGVySGFuZGxlQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG9tRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVDbGljayA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uSGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaGFuZGxlSW5kZXg/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMzggfHwgZXZlbnQud2hpY2ggPT0gMzkpIHtcbiAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgMSwgaGFuZGxlSW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09IDM3IHx8IGV2ZW50LndoaWNoID09IDQwKSB7XG4gICAgICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIC0xLCBoYW5kbGVJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGluKGV2ZW50OiBFdmVudCwgZGlyOiBudW1iZXIsIGhhbmRsZUluZGV4PzogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzdGVwID0gKHRoaXMuc3RlcCB8fCAxKSAqIGRpcjtcblxuICAgICAgICBpZiAodGhpcy5yYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IGhhbmRsZUluZGV4IGFzIG51bWJlcjtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVt0aGlzLmhhbmRsZUluZGV4XSArIHN0ZXApO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVIYW5kbGVWYWx1ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSgodGhpcy52YWx1ZSBhcyBudW1iZXIpICsgc3RlcCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZVZhbHVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgbGV0IGhhbmRsZVZhbHVlID0gdGhpcy5jYWxjdWxhdGVIYW5kbGVWYWx1ZShldmVudCk7XG4gICAgICAgIHRoaXMuc2V0VmFsdWVGcm9tSGFuZGxlKGV2ZW50LCBoYW5kbGVWYWx1ZSk7XG4gICAgfVxuXG4gICAgYmluZERyYWdMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jdW1lbnRUYXJnZXQ6IGFueSA9IHRoaXMuZWwgPyB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudCA6IHRoaXMuZG9jdW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHJhZ0xpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubW91c2V1cExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW91c2V1cExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oZG9jdW1lbnRUYXJnZXQsICdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yYW5nZSkgdGhpcy5vblNsaWRlRW5kLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLm9uU2xpZGVFbmQuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy52YWx1ZSBhcyBudW1iZXIgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sICdwLXNsaWRlci1hbmltYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREcmFnTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb3VzZXVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2V1cExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1vdXNldXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWYWx1ZUZyb21IYW5kbGUoZXZlbnQ6IEV2ZW50LCBoYW5kbGVWYWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuc2xpZGVySGFuZGxlQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gdGhpcy5nZXRWYWx1ZUZyb21IYW5kbGUoaGFuZGxlVmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTdGVwQ2hhbmdlKG5ld1ZhbHVlLCAodGhpcy52YWx1ZXMgYXMgYW55KVt0aGlzLmhhbmRsZUluZGV4XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzW3RoaXMuaGFuZGxlSW5kZXhdID0gaGFuZGxlVmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdWYWx1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RlcENoYW5nZShuZXdWYWx1ZSwgdGhpcy52YWx1ZSBhcyBhbnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlID0gaGFuZGxlVmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShuZXdWYWx1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdGVwQ2hhbmdlKG5ld1ZhbHVlOiBudW1iZXIsIG9sZFZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRpZmYgPSBuZXdWYWx1ZSAtIG9sZFZhbHVlO1xuICAgICAgICBsZXQgdmFsID0gb2xkVmFsdWU7XG4gICAgICAgIGxldCBfc3RlcCA9IHRoaXMuc3RlcCBhcyBudW1iZXI7XG5cbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICB2YWwgPSBvbGRWYWx1ZSArIE1hdGguY2VpbChuZXdWYWx1ZSAvIF9zdGVwIC0gb2xkVmFsdWUgLyBfc3RlcCkgKiBfc3RlcDtcbiAgICAgICAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgICAgICAgICAgdmFsID0gb2xkVmFsdWUgKyBNYXRoLmZsb29yKG5ld1ZhbHVlIC8gX3N0ZXAgLSBvbGRWYWx1ZSAvIF9zdGVwKSAqIF9zdGVwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh2YWwpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZVZhbHVlKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB0aGlzLnZhbHVlcyA9IHZhbHVlIHx8IFswLCAwXTtcbiAgICAgICAgZWxzZSB0aGlzLnZhbHVlID0gdmFsdWUgfHwgMDtcblxuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZVZhbHVlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlmZkFuZE9mZnNldCgpO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXQgcmFuZ2VTdGFydExlZnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKCkpIHJldHVybiB0aGlzLmhhbmRsZVZhbHVlc1swXSA+IDEwMCA/IDEwMCArICclJyA6IHRoaXMuaGFuZGxlVmFsdWVzWzBdICsgJyUnO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgcmFuZ2VTdGFydEJvdHRvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpID8gdGhpcy5oYW5kbGVWYWx1ZXNbMF0gKyAnJScgOiAnYXV0byc7XG4gICAgfVxuXG4gICAgZ2V0IHJhbmdlRW5kTGVmdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpID8gbnVsbCA6IHRoaXMuaGFuZGxlVmFsdWVzWzFdICsgJyUnO1xuICAgIH1cblxuICAgIGdldCByYW5nZUVuZEJvdHRvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWZXJ0aWNhbCgpID8gdGhpcy5oYW5kbGVWYWx1ZXNbMV0gKyAnJScgOiAnYXV0byc7XG4gICAgfVxuXG4gICAgaXNWZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XG4gICAgfVxuXG4gICAgdXBkYXRlRG9tRGF0YSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMuaW5pdFggPSByZWN0LmxlZnQgKyBEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbExlZnQoKTtcbiAgICAgICAgdGhpcy5pbml0WSA9IHJlY3QudG9wICsgRG9tSGFuZGxlci5nZXRXaW5kb3dTY3JvbGxUb3AoKTtcbiAgICAgICAgdGhpcy5iYXJXaWR0aCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUhhbmRsZVZhbHVlKGV2ZW50OiBFdmVudCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHJldHVybiAoKChldmVudCBhcyBNb3VzZUV2ZW50KS5wYWdlWCAtICh0aGlzLmluaXRYIGFzIG51bWJlcikpICogMTAwKSAvICh0aGlzLmJhcldpZHRoIGFzIG51bWJlcik7XG4gICAgICAgIGVsc2UgcmV0dXJuICgoKHRoaXMuaW5pdFkgYXMgbnVtYmVyKSArICh0aGlzLmJhckhlaWdodCBhcyBudW1iZXIpIC0gKGV2ZW50IGFzIE1vdXNlRXZlbnQpLnBhZ2VZKSAqIDEwMCkgLyAodGhpcy5iYXJIZWlnaHQgYXMgbnVtYmVyKTtcbiAgICB9XG5cbiAgICB1cGRhdGVIYW5kbGVWYWx1ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzWzBdID0gKCgodGhpcy52YWx1ZXMgYXMgbnVtYmVyW10pWzBdIDwgdGhpcy5taW4gPyAwIDogKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVswXSAtIHRoaXMubWluKSAqIDEwMCkgLyAodGhpcy5tYXggLSB0aGlzLm1pbik7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1sxXSA9ICgoKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVsxXSA+IHRoaXMubWF4ID8gMTAwIDogKHRoaXMudmFsdWVzIGFzIG51bWJlcltdKVsxXSAtIHRoaXMubWluKSAqIDEwMCkgLyAodGhpcy5tYXggLSB0aGlzLm1pbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHRoaXMudmFsdWUgYXMgbnVtYmVyKSA8IHRoaXMubWluKSB0aGlzLmhhbmRsZVZhbHVlID0gMDtcbiAgICAgICAgICAgIGVsc2UgaWYgKCh0aGlzLnZhbHVlIGFzIG51bWJlcikgPiB0aGlzLm1heCkgdGhpcy5oYW5kbGVWYWx1ZSA9IDEwMDtcbiAgICAgICAgICAgIGVsc2UgdGhpcy5oYW5kbGVWYWx1ZSA9ICgoKHRoaXMudmFsdWUgYXMgbnVtYmVyKSAtIHRoaXMubWluKSAqIDEwMCkgLyAodGhpcy5tYXggLSB0aGlzLm1pbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zdGVwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpZmZBbmRPZmZzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZURpZmZBbmRPZmZzZXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlmZiA9IHRoaXMuZ2V0RGlmZigpO1xuICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0KCk7XG4gICAgfVxuXG4gICAgZ2V0RGlmZigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModGhpcy5oYW5kbGVWYWx1ZXNbMF0gLSB0aGlzLmhhbmRsZVZhbHVlc1sxXSk7XG4gICAgfVxuXG4gICAgZ2V0T2Zmc2V0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbih0aGlzLmhhbmRsZVZhbHVlc1swXSwgdGhpcy5oYW5kbGVWYWx1ZXNbMV0pO1xuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKHZhbDogbnVtYmVyLCBldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZUluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1swXSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+ICh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1swXSA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckhhbmRsZVN0YXJ0Py5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzWzFdID0gMTAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMuaGFuZGxlVmFsdWVzWzFdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1sxXSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8ICh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmhhbmRsZVZhbHVlc1sxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVFbmQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSGFuZGxlVmFsdWUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEaWZmQW5kT2Zmc2V0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbdGhpcy5oYW5kbGVJbmRleF0gPSB0aGlzLmdldE5vcm1hbGl6ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICBsZXQgbmV3VmFsdWVzID0gW3RoaXMubWluVmFsLCB0aGlzLm1heFZhbF07XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UobmV3VmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7IGV2ZW50OiBldmVudCBhcyBFdmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh2YWwgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWwgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMubWF4O1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWUgPSAxMDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmdldE5vcm1hbGl6ZWRWYWx1ZSh2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoeyBldmVudDogZXZlbnQgYXMgRXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlIH0pO1xuICAgICAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGU/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFZhbHVlRnJvbUhhbmRsZShoYW5kbGVWYWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1heCAtIHRoaXMubWluKSAqIChoYW5kbGVWYWx1ZSAvIDEwMCkgKyB0aGlzLm1pbjtcbiAgICB9XG5cbiAgICBnZXREZWNpbWFsc0NvdW50KHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBpZiAodmFsdWUgJiYgTWF0aC5mbG9vcih2YWx1ZSkgIT09IHZhbHVlKSByZXR1cm4gdmFsdWUudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdLmxlbmd0aCB8fCAwO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBnZXROb3JtYWxpemVkVmFsdWUodmFsOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgZGVjaW1hbHNDb3VudCA9IHRoaXMuZ2V0RGVjaW1hbHNDb3VudCh0aGlzLnN0ZXAgYXMgbnVtYmVyKTtcbiAgICAgICAgaWYgKGRlY2ltYWxzQ291bnQgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gK3BhcnNlRmxvYXQodmFsLnRvU3RyaW5nKCkpLnRvRml4ZWQoZGVjaW1hbHNDb3VudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRHJhZ0xpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGdldCBtaW5WYWwoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbigodGhpcy52YWx1ZXMgYXMgbnVtYmVyW10pWzFdLCAodGhpcy52YWx1ZXMgYXMgbnVtYmVyW10pWzBdKTtcbiAgICB9XG4gICAgZ2V0IG1heFZhbCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KCh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbMV0sICh0aGlzLnZhbHVlcyBhcyBudW1iZXJbXSlbMF0pO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU2xpZGVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTbGlkZXJdXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlck1vZHVsZSB7fVxuIl19