import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Inject, Input, NgModule, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * AccordionTab is a helper component for Accordion.
 * @group Components
 */
class AccordionTab {
    el;
    changeDetector;
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
    /**
     * Used to define the header of the tab.
     * @group Props
     */
    header;
    /**
     * Inline style of the tab header.
     * @group Props
     */
    headerStyle;
    /**
     * Inline style of the tab.
     * @group Props
     */
    tabStyle;
    /**
     * Inline style of the tab content.
     * @group Props
     */
    contentStyle;
    /**
     * Style class of the tab.
     * @group Props
     */
    tabStyleClass;
    /**
     * Style class of the tab header.
     * @group Props
     */
    headerStyleClass;
    /**
     * Style class of the tab content.
     * @group Props
     */
    contentStyleClass;
    /**
     * Whether the tab is disabled.
     * @group Props
     */
    disabled;
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    cache = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Position of the icon.
     * @group Props
     */
    iconPos = 'start';
    /**
     * The value that returns the selection.
     * @group Props
     */
    get selected() {
        return this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            if (this._selected && this.cache) {
                this.loaded = true;
            }
            this.changeDetector.detectChanges();
        }
    }
    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @group Props
     */
    headerAriaLevel = 2;
    /**
     * Event triggered by changing the choice.
     * @param {boolean} value - Boolean value indicates that the option is changed.
     * @group Emits
     */
    selectedChange = new EventEmitter();
    headerFacet;
    templates;
    _selected = false;
    get iconClass() {
        if (this.iconPos === 'end') {
            return 'p-accordion-toggle-icon-end';
        }
        else {
            return 'p-accordion-toggle-icon';
        }
    }
    contentTemplate;
    headerTemplate;
    iconTemplate;
    loaded = false;
    accordion;
    constructor(accordion, el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
        this.accordion = accordion;
        this.id = UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    toggle(event) {
        if (this.disabled) {
            return false;
        }
        let index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    if (this.accordion.tabs[i].selected) {
                        this.accordion.tabs[i].selected = false;
                        this.accordion.tabs[i].selectedChange.emit(false);
                        this.accordion.tabs[i].changeDetector.markForCheck();
                    }
                }
            }
            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        this.accordion.updateActiveIndex();
        this.changeDetector.markForCheck();
        event.preventDefault();
    }
    findTabIndex() {
        let index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }
    get hasHeaderFacet() {
        return this.headerFacet && this.headerFacet.length > 0;
    }
    onKeydown(event) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.toggle(event);
                event.preventDefault(); // ???
                break;
            default:
                break;
        }
    }
    getTabHeaderActionId(tabId) {
        return `${tabId}_header_action`;
    }
    getTabContentId(tabId) {
        return `${tabId}_content`;
    }
    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AccordionTab, deps: [{ token: forwardRef(() => Accordion) }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: AccordionTab, selector: "p-accordionTab", inputs: { id: "id", header: "header", headerStyle: "headerStyle", tabStyle: "tabStyle", contentStyle: "contentStyle", tabStyleClass: "tabStyleClass", headerStyleClass: "headerStyleClass", contentStyleClass: "contentStyleClass", disabled: "disabled", cache: "cache", transitionOptions: "transitionOptions", iconPos: "iconPos", selected: "selected", headerAriaLevel: "headerAriaLevel" }, outputs: { selectedChange: "selectedChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", predicate: Header }, { propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div class="p-accordion-tab" [class.p-accordion-tab-active]="selected" [ngClass]="tabStyleClass" [ngStyle]="tabStyle" [attr.data-pc-name]="'accordiontab'">
            <div class="p-accordion-header" role="heading" [attr.aria-level]="headerAriaLevel" [class.p-highlight]="selected" [class.p-disabled]="disabled" [attr.data-p-disabled]="disabled" [attr.data-pc-section]="'header'">
                <a
                    [ngClass]="headerStyleClass"
                    [style]="headerStyle"
                    role="button"
                    class="p-accordion-header-link"
                    (click)="toggle($event)"
                    (keydown)="onKeydown($event)"
                    [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="getTabHeaderActionId(id)"
                    [attr.aria-controls]="getTabContentId(id)"
                    [attr.aria-expanded]="selected"
                    [attr.aria-disabled]="disabled"
                    [attr.data-pc-section]="'headeraction'"
                >
                    <ng-container *ngIf="!iconTemplate">
                        <ng-container *ngIf="selected">
                            <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                        <ng-container *ngIf="!selected">
                            <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronRightIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                    </ng-container>
                    <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
                    <span class="p-accordion-header-text" *ngIf="!hasHeaderFacet">
                        {{ header }}
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
                </a>
            </div>
            <div
                [attr.id]="getTabContentId(id)"
                class="p-toggleable-content"
                [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
                role="region"
                [attr.aria-hidden]="!selected"
                [attr.aria-labelledby]="getTabHeaderActionId(id)"
                [attr.data-pc-section]="'toggleablecontent'"
            >
                <div class="p-accordion-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                    <ng-content></ng-content>
                    <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `, isInline: true, styles: [".p-accordion-header-link{cursor:pointer;display:flex;align-items:center;-webkit-user-select:none;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(function () { return ChevronRightIcon; }), selector: "ChevronRightIcon" }, { kind: "component", type: i0.forwardRef(function () { return ChevronDownIcon; }), selector: "ChevronDownIcon" }], animations: [
            trigger('tabContent', [
                state('hidden', style({
                    height: '0'
                })),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                transition('void => *', animate(0))
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { AccordionTab };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AccordionTab, decorators: [{
            type: Component,
            args: [{ selector: 'p-accordionTab', template: `
        <div class="p-accordion-tab" [class.p-accordion-tab-active]="selected" [ngClass]="tabStyleClass" [ngStyle]="tabStyle" [attr.data-pc-name]="'accordiontab'">
            <div class="p-accordion-header" role="heading" [attr.aria-level]="headerAriaLevel" [class.p-highlight]="selected" [class.p-disabled]="disabled" [attr.data-p-disabled]="disabled" [attr.data-pc-section]="'header'">
                <a
                    [ngClass]="headerStyleClass"
                    [style]="headerStyle"
                    role="button"
                    class="p-accordion-header-link"
                    (click)="toggle($event)"
                    (keydown)="onKeydown($event)"
                    [attr.tabindex]="disabled ? null : 0"
                    [attr.id]="getTabHeaderActionId(id)"
                    [attr.aria-controls]="getTabContentId(id)"
                    [attr.aria-expanded]="selected"
                    [attr.aria-disabled]="disabled"
                    [attr.data-pc-section]="'headeraction'"
                >
                    <ng-container *ngIf="!iconTemplate">
                        <ng-container *ngIf="selected">
                            <span *ngIf="accordion.collapseIcon" [class]="accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronDownIcon *ngIf="!accordion.collapseIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                        <ng-container *ngIf="!selected">
                            <span *ngIf="accordion.expandIcon" [class]="accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true"></span>
                            <ChevronRightIcon *ngIf="!accordion.expandIcon" [ngClass]="iconClass" [attr.aria-hidden]="true" />
                        </ng-container>
                    </ng-container>
                    <ng-template *ngTemplateOutlet="iconTemplate; context: { $implicit: selected }"></ng-template>
                    <span class="p-accordion-header-text" *ngIf="!hasHeaderFacet">
                        {{ header }}
                    </span>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
                </a>
            </div>
            <div
                [attr.id]="getTabContentId(id)"
                class="p-toggleable-content"
                [@tabContent]="selected ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }"
                role="region"
                [attr.aria-hidden]="!selected"
                [attr.aria-labelledby]="getTabHeaderActionId(id)"
                [attr.data-pc-section]="'toggleablecontent'"
            >
                <div class="p-accordion-content" [ngClass]="contentStyleClass" [ngStyle]="contentStyle">
                    <ng-content></ng-content>
                    <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `, animations: [
                        trigger('tabContent', [
                            state('hidden', style({
                                height: '0'
                            })),
                            state('visible', style({
                                height: '*'
                            })),
                            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
                            transition('void => *', animate(0))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-accordion-header-link{cursor:pointer;display:flex;align-items:center;-webkit-user-select:none;user-select:none;position:relative;text-decoration:none}.p-accordion-header-link:focus{z-index:1}.p-accordion-header-text{line-height:1}.p-accordion .p-toggleable-content{overflow:hidden}.p-accordion .p-accordion-tab-active>.p-toggleable-content:not(.ng-animating){overflow:inherit}.p-accordion-toggle-icon-end{order:1;margin-left:auto}.p-accordion-toggle-icon{order:0}\n"] }]
        }], ctorParameters: function () { return [{ type: Accordion, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => Accordion)]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { id: [{
                type: Input
            }], header: [{
                type: Input
            }], headerStyle: [{
                type: Input
            }], tabStyle: [{
                type: Input
            }], contentStyle: [{
                type: Input
            }], tabStyleClass: [{
                type: Input
            }], headerStyleClass: [{
                type: Input
            }], contentStyleClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], cache: [{
                type: Input
            }], transitionOptions: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], selected: [{
                type: Input
            }], headerAriaLevel: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], headerFacet: [{
                type: ContentChildren,
                args: [Header]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
class Accordion {
    el;
    changeDetector;
    /**
     * When enabled, multiple tabs can be activated at the same time.
     * @group Props
     */
    multiple = false;
    /**
     * Inline style of the tab header and content.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Icon of a collapsed tab.
     * @group Props
     */
    expandIcon;
    /**
     * Icon of an expanded tab.
     * @group Props
     */
    collapseIcon;
    /**
     * Index of the active tab or an array of indexes in multiple mode.
     * @group Props
     */
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }
        this.updateSelectionState();
    }
    /**
     * When enabled, the focused tab is activated.
     * @group Props
     */
    selectOnFocus = false;
    /**
     * The aria-level that each accordion header will have. The default value is 2 as per W3C specifications
     * @group Props
     */
    get headerAriaLevel() {
        return this._headerAriaLevel;
    }
    set headerAriaLevel(val) {
        if (typeof val === 'number' && val > 0) {
            this._headerAriaLevel = val;
        }
        else if (this._headerAriaLevel !== 2) {
            this._headerAriaLevel = 2;
        }
    }
    /**
     * Callback to invoke when an active tab is collapsed by clicking on the header.
     * @param {AccordionTabCloseEvent} event - Custom tab close event.
     * @group Emits
     */
    onClose = new EventEmitter();
    /**
     * Callback to invoke when a tab gets expanded.
     * @param {AccordionTabOpenEvent} event - Custom tab open event.
     * @group Emits
     */
    onOpen = new EventEmitter();
    /**
     * Returns the active index.
     * @param {number | number[]} value - New index.
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    tabList;
    tabListSubscription = null;
    _activeIndex;
    _headerAriaLevel = 2;
    preventActiveIndexPropagation = false;
    tabs = [];
    constructor(el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
    }
    onKeydown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onTabArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onTabArrowUpKey(event);
                break;
            case 'Home':
                this.onTabHomeKey(event);
                break;
            case 'End':
                this.onTabEndKey(event);
                break;
        }
    }
    onTabArrowDownKey(event) {
        const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement.parentElement);
        nextHeaderAction ? this.changeFocusedTab(nextHeaderAction) : this.onTabHomeKey(event);
        event.preventDefault();
    }
    onTabArrowUpKey(event) {
        const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement.parentElement);
        prevHeaderAction ? this.changeFocusedTab(prevHeaderAction) : this.onTabEndKey(event);
        event.preventDefault();
    }
    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        this.changeFocusedTab(firstHeaderAction);
        event.preventDefault();
    }
    changeFocusedTab(element) {
        if (element) {
            DomHandler.focus(element);
            if (this.selectOnFocus) {
                this.tabs.forEach((tab, i) => {
                    let selected = this.multiple ? this._activeIndex.includes(i) : i === this._activeIndex;
                    if (this.multiple) {
                        if (!this._activeIndex) {
                            this._activeIndex = [];
                        }
                        if (tab.id == element.id) {
                            tab.selected = !tab.selected;
                            if (!this._activeIndex.includes(i)) {
                                this._activeIndex.push(i);
                            }
                            else {
                                this._activeIndex = this._activeIndex.filter((ind) => ind !== i);
                            }
                        }
                    }
                    else {
                        if (tab.id == element.id) {
                            tab.selected = !tab.selected;
                            this._activeIndex = i;
                        }
                        else {
                            tab.selected = false;
                        }
                    }
                    tab.selectedChange.emit(selected);
                    this.activeIndexChange.emit(this._activeIndex);
                    tab.changeDetector.markForCheck();
                });
            }
        }
    }
    findNextHeaderAction(tabElement, selfCheck = false) {
        const nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        const headerElement = DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeaderAction(headerElement.parentElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')) : null;
    }
    findPrevHeaderAction(tabElement, selfCheck = false) {
        const prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        const headerElement = DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');
        return headerElement ? (DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')) : null;
    }
    findFirstHeaderAction() {
        const firstEl = this.el.nativeElement.firstElementChild.childNodes[0];
        return this.findNextHeaderAction(firstEl, true);
    }
    findLastHeaderAction() {
        const childNodes = this.el.nativeElement.firstElementChild.childNodes;
        const lastEl = childNodes[childNodes.length - 1];
        return this.findPrevHeaderAction(lastEl, true);
    }
    onTabEndKey(event) {
        const lastHeaderAction = this.findLastHeaderAction();
        this.changeFocusedTab(lastHeaderAction);
        event.preventDefault();
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabListSubscription = this.tabList.changes.subscribe((_) => {
            this.initTabs();
        });
    }
    initTabs() {
        this.tabs = this.tabList.toArray();
        this.tabs.forEach((tab) => {
            tab.headerAriaLevel = this._headerAriaLevel;
        });
        this.updateSelectionState();
        this.changeDetector.markForCheck();
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? this._activeIndex.includes(i) : i === this._activeIndex;
                let changed = selected !== this.tabs[i].selected;
                if (changed) {
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                    this.tabs[i].changeDetector.markForCheck();
                }
            }
        }
    }
    isTabActive(index) {
        return this.multiple ? this._activeIndex && this._activeIndex.includes(index) : this._activeIndex === index;
    }
    getTabProp(tab, name) {
        return tab.props ? tab.props[name] : undefined;
    }
    updateActiveIndex() {
        let index = this.multiple ? [] : null;
        this.tabs.forEach((tab, i) => {
            if (tab.selected) {
                if (this.multiple) {
                    index.push(i);
                }
                else {
                    index = i;
                    return;
                }
            }
        });
        this.preventActiveIndexPropagation = true;
        this.activeIndexChange.emit(index);
    }
    ngOnDestroy() {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Accordion, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Accordion, selector: "p-accordion", inputs: { multiple: "multiple", style: "style", styleClass: "styleClass", expandIcon: "expandIcon", collapseIcon: "collapseIcon", activeIndex: "activeIndex", selectOnFocus: "selectOnFocus", headerAriaLevel: "headerAriaLevel" }, outputs: { onClose: "onClose", onOpen: "onOpen", activeIndexChange: "activeIndexChange" }, host: { listeners: { "keydown": "onKeydown($event)" }, classAttribute: "p-element" }, queries: [{ propertyName: "tabList", predicate: AccordionTab }], ngImport: i0, template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
export { Accordion };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Accordion, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-accordion',
                    template: `
        <div [ngClass]="'p-accordion p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { multiple: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], expandIcon: [{
                type: Input
            }], collapseIcon: [{
                type: Input
            }], activeIndex: [{
                type: Input
            }], selectOnFocus: [{
                type: Input
            }], headerAriaLevel: [{
                type: Input
            }], onClose: [{
                type: Output
            }], onOpen: [{
                type: Output
            }], activeIndexChange: [{
                type: Output
            }], tabList: [{
                type: ContentChildren,
                args: [AccordionTab]
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
class AccordionModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: AccordionModule, declarations: [Accordion, AccordionTab], imports: [CommonModule, ChevronRightIcon, ChevronDownIcon], exports: [Accordion, AccordionTab, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AccordionModule, imports: [CommonModule, ChevronRightIcon, ChevronDownIcon, SharedModule] });
}
export { AccordionModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ChevronRightIcon, ChevronDownIcon],
                    exports: [Accordion, AccordionTab, SharedModule],
                    declarations: [Accordion, AccordionTab]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsTUFBTSxFQUdOLGlCQUFpQixFQUNqQixVQUFVLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLE1BQU0sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRWxEOzs7R0FHRztBQUNILE1BZ0ZhLFlBQVk7SUFtSHlEO0lBQXVCO0lBbEhyRzs7O09BR0c7SUFDTSxFQUFFLENBQXFCO0lBQ2hDOzs7T0FHRztJQUNNLE1BQU0sQ0FBcUI7SUFDcEM7OztPQUdHO0lBQ00sV0FBVyxDQUE4QztJQUNsRTs7O09BR0c7SUFDTSxRQUFRLENBQThDO0lBQy9EOzs7T0FHRztJQUNNLFlBQVksQ0FBOEM7SUFDbkU7OztPQUdHO0lBQ00sYUFBYSxDQUFxQjtJQUMzQzs7O09BR0c7SUFDTSxnQkFBZ0IsQ0FBcUI7SUFDOUM7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QUwzQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7b0JBQzFELE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUNoRCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT25EZXN0cm95LFxuICAgIE91dHB1dCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgZm9yd2FyZFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJsb2NrYWJsZVVJLCBIZWFkZXIsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBDaGV2cm9uRG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25kb3duJztcbmltcG9ydCB7IENoZXZyb25SaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2NoZXZyb25yaWdodCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjY29yZGlvblRhYkNsb3NlRXZlbnQsIEFjY29yZGlvblRhYk9wZW5FdmVudCB9IGZyb20gJy4vYWNjb3JkaW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG4vKipcbiAqIEFjY29yZGlvblRhYiBpcyBhIGhlbHBlciBjb21wb25lbnQgZm9yIEFjY29yZGlvbi5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hY2NvcmRpb25UYWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWFjY29yZGlvbi10YWJcIiBbY2xhc3MucC1hY2NvcmRpb24tdGFiLWFjdGl2ZV09XCJzZWxlY3RlZFwiIFtuZ0NsYXNzXT1cInRhYlN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJ0YWJTdHlsZVwiIFthdHRyLmRhdGEtcGMtbmFtZV09XCInYWNjb3JkaW9udGFiJ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtYWNjb3JkaW9uLWhlYWRlclwiIHJvbGU9XCJoZWFkaW5nXCIgW2F0dHIuYXJpYS1sZXZlbF09XCJoZWFkZXJBcmlhTGV2ZWxcIiBbY2xhc3MucC1oaWdobGlnaHRdPVwic2VsZWN0ZWRcIiBbY2xhc3MucC1kaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLmRhdGEtcC1kaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyJ1wiPlxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImhlYWRlclN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwiaGVhZGVyU3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWFjY29yZGlvbi1oZWFkZXItbGlua1wiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogMFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImdldFRhYkhlYWRlckFjdGlvbklkKGlkKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiZ2V0VGFiQ29udGVudElkKGlkKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwic2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidoZWFkZXJhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjY29yZGlvbi5jb2xsYXBzZUljb25cIiBbY2xhc3NdPVwiYWNjb3JkaW9uLmNvbGxhcHNlSWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZXZyb25Eb3duSWNvbiAqbmdJZj1cIiFhY2NvcmRpb24uY29sbGFwc2VJY29uXCIgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2VsZWN0ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjY29yZGlvbi5leHBhbmRJY29uXCIgW2NsYXNzXT1cImFjY29yZGlvbi5leHBhbmRJY29uXCIgW25nQ2xhc3NdPVwiaWNvbkNsYXNzXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFhY2NvcmRpb24uZXhwYW5kSWNvblwiIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBzZWxlY3RlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWFjY29yZGlvbi1oZWFkZXItdGV4dFwiICpuZ0lmPVwiIWhhc0hlYWRlckZhY2V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyBoZWFkZXIgfX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIiAqbmdJZj1cImhhc0hlYWRlckZhY2V0XCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImdldFRhYkNvbnRlbnRJZChpZClcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC10b2dnbGVhYmxlLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIFtAdGFiQ29udGVudF09XCJzZWxlY3RlZCA/IHsgdmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7IHRyYW5zaXRpb25QYXJhbXM6IHRyYW5zaXRpb25PcHRpb25zIH0gfSA6IHsgdmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHsgdHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMgfSB9XCJcbiAgICAgICAgICAgICAgICByb2xlPVwicmVnaW9uXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCIhc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJnZXRUYWJIZWFkZXJBY3Rpb25JZChpZClcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCIndG9nZ2xlYWJsZWNvbnRlbnQnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1hY2NvcmRpb24tY29udGVudFwiIFtuZ0NsYXNzXT1cImNvbnRlbnRTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiY29udGVudFN0eWxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRlbnRUZW1wbGF0ZSAmJiAoY2FjaGUgPyBsb2FkZWQgOiBzZWxlY3RlZClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3RhYkNvbnRlbnQnLCBbXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzAnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGF0ZShcbiAgICAgICAgICAgICAgICAndmlzaWJsZScsXG4gICAgICAgICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA8PT4gaGlkZGVuJywgW2FuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JyldKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIGFuaW1hdGUoMCkpXG4gICAgICAgIF0pXG4gICAgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2FjY29yZGlvbi5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uVGFiIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IGlkIHN0YXRlIGFzIGEgc3RyaW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgdGhlIGhlYWRlciBvZiB0aGUgdGFiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgdGFiIGhlYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHRhYi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHRhYiBjb250ZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdGFiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRhYlN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdGFiIGhlYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHRhYiBjb250ZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGFiIGlzIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgYSBsYXp5IGxvYWRlZCBwYW5lbCBzaG91bGQgYXZvaWQgZ2V0dGluZyBsb2FkZWQgYWdhaW4gb24gcmVzZWxlY3Rpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2FjaGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgYW5pbWF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnNDAwbXMgY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpJztcbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgaWNvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpY29uUG9zOiAnZW5kJyB8ICdzdGFydCcgPSAnc3RhcnQnO1xuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSB0aGF0IHJldHVybnMgdGhlIHNlbGVjdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG4gICAgc2V0IHNlbGVjdGVkKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbDtcblxuICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWQgJiYgdGhpcy5jYWNoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGFyaWEtbGV2ZWwgdGhhdCBlYWNoIGFjY29yZGlvbiBoZWFkZXIgd2lsbCBoYXZlLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyAyIGFzIHBlciBXM0Mgc3BlY2lmaWNhdGlvbnNcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoZWFkZXJBcmlhTGV2ZWw6IG51bWJlciA9IDI7XG4gICAgLyoqXG4gICAgICogRXZlbnQgdHJpZ2dlcmVkIGJ5IGNoYW5naW5nIHRoZSBjaG9pY2UuXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAtIEJvb2xlYW4gdmFsdWUgaW5kaWNhdGVzIHRoYXQgdGhlIG9wdGlvbiBpcyBjaGFuZ2VkLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihIZWFkZXIpIGhlYWRlckZhY2V0ITogUXVlcnlMaXN0PEhlYWRlcj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlcyE6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPjtcblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBnZXQgaWNvbkNsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5pY29uUG9zID09PSAnZW5kJykge1xuICAgICAgICAgICAgcmV0dXJuICdwLWFjY29yZGlvbi10b2dnbGUtaWNvbi1lbmQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdwLWFjY29yZGlvbi10b2dnbGUtaWNvbic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgYWNjb3JkaW9uOiBBY2NvcmRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQWNjb3JkaW9uKSkgYWNjb3JkaW9uOiBBY2NvcmRpb24sIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICB0aGlzLmFjY29yZGlvbiA9IGFjY29yZGlvbiBhcyBBY2NvcmRpb247XG4gICAgICAgIHRoaXMuaWQgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQ/OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kVGFiSW5kZXgoKTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24ub25DbG9zZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBpbmRleCB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hY2NvcmRpb24ubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWNjb3JkaW9uLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0uc2VsZWN0ZWRDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY29yZGlvbi50YWJzW2ldLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWNjb3JkaW9uLm9uT3Blbi5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBpbmRleCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5hY2NvcmRpb24udXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGZpbmRUYWJJbmRleCgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hY2NvcmRpb24udGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWNjb3JkaW9uLnRhYnNbaV0gPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0IGhhc0hlYWRlckZhY2V0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuaGVhZGVyRmFjZXQgYXMgUXVlcnlMaXN0PEhlYWRlcj4pICYmICh0aGlzLmhlYWRlckZhY2V0IGFzIFF1ZXJ5TGlzdDxIZWFkZXI+KS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gPz8/XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VGFiSGVhZGVyQWN0aW9uSWQodGFiSWQpIHtcbiAgICAgICAgcmV0dXJuIGAke3RhYklkfV9oZWFkZXJfYWN0aW9uYDtcbiAgICB9XG5cbiAgICBnZXRUYWJDb250ZW50SWQodGFiSWQpIHtcbiAgICAgICAgcmV0dXJuIGAke3RhYklkfV9jb250ZW50YDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hY2NvcmRpb24udGFicy5zcGxpY2UodGhpcy5maW5kVGFiSW5kZXgoKSwgMSk7XG4gICAgfVxufVxuXG4vKipcbiAqIEFjY29yZGlvbiBncm91cHMgYSBjb2xsZWN0aW9uIG9mIGNvbnRlbnRzIGluIHRhYnMuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYWNjb3JkaW9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIidwLWFjY29yZGlvbiBwLWNvbXBvbmVudCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvbiBpbXBsZW1lbnRzIEJsb2NrYWJsZVVJLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCwgbXVsdGlwbGUgdGFicyBjYW4gYmUgYWN0aXZhdGVkIGF0IHRoZSBzYW1lIHRpbWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIHRhYiBoZWFkZXIgYW5kIGNvbnRlbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2xhc3Mgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEljb24gb2YgYSBjb2xsYXBzZWQgdGFiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGV4cGFuZEljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIG9mIGFuIGV4cGFuZGVkIHRhYi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb2xsYXBzZUljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgYWN0aXZlIHRhYiBvciBhbiBhcnJheSBvZiBpbmRleGVzIGluIG11bHRpcGxlIG1vZGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB8IG51bWJlcltdIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG4gICAgc2V0IGFjdGl2ZUluZGV4KHZhbDogbnVtYmVyIHwgbnVtYmVyW10gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25TdGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIHRoZSBmb2N1c2VkIHRhYiBpcyBhY3RpdmF0ZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2VsZWN0T25Gb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIFRoZSBhcmlhLWxldmVsIHRoYXQgZWFjaCBhY2NvcmRpb24gaGVhZGVyIHdpbGwgaGF2ZS4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMiBhcyBwZXIgVzNDIHNwZWNpZmljYXRpb25zXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGhlYWRlckFyaWFMZXZlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyQXJpYUxldmVsO1xuICAgIH1cbiAgICBzZXQgaGVhZGVyQXJpYUxldmVsKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiB2YWwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkZXJBcmlhTGV2ZWwgPSB2YWw7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGVhZGVyQXJpYUxldmVsICE9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWFkZXJBcmlhTGV2ZWwgPSAyO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGFuIGFjdGl2ZSB0YWIgaXMgY29sbGFwc2VkIGJ5IGNsaWNraW5nIG9uIHRoZSBoZWFkZXIuXG4gICAgICogQHBhcmFtIHtBY2NvcmRpb25UYWJDbG9zZUV2ZW50fSBldmVudCAtIEN1c3RvbSB0YWIgY2xvc2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxBY2NvcmRpb25UYWJDbG9zZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIHRhYiBnZXRzIGV4cGFuZGVkLlxuICAgICAqIEBwYXJhbSB7QWNjb3JkaW9uVGFiT3BlbkV2ZW50fSBldmVudCAtIEN1c3RvbSB0YWIgb3BlbiBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25PcGVuOiBFdmVudEVtaXR0ZXI8QWNjb3JkaW9uVGFiT3BlbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBhY3RpdmUgaW5kZXguXG4gICAgICogQHBhcmFtIHtudW1iZXIgfCBudW1iZXJbXX0gdmFsdWUgLSBOZXcgaW5kZXguXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIGFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyIHwgbnVtYmVyW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXIgfCBudW1iZXJbXT4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oQWNjb3JkaW9uVGFiKSB0YWJMaXN0OiBRdWVyeUxpc3Q8QWNjb3JkaW9uVGFiPiB8IHVuZGVmaW5lZDtcblxuICAgIHRhYkxpc3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfYWN0aXZlSW5kZXg6IGFueTtcbiAgICBwcml2YXRlIF9oZWFkZXJBcmlhTGV2ZWw6IG51bWJlciA9IDI7XG5cbiAgICBwcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIHRhYnM6IEFjY29yZGlvblRhYltdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgICBvbktleWRvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJBcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJIb21lS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGFiRW5kS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGFiQXJyb3dEb3duS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXJBY3Rpb24gPSB0aGlzLmZpbmROZXh0SGVhZGVyQWN0aW9uKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgICAgIG5leHRIZWFkZXJBY3Rpb24gPyB0aGlzLmNoYW5nZUZvY3VzZWRUYWIobmV4dEhlYWRlckFjdGlvbikgOiB0aGlzLm9uVGFiSG9tZUtleShldmVudCk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblRhYkFycm93VXBLZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJldkhlYWRlckFjdGlvbiA9IHRoaXMuZmluZFByZXZIZWFkZXJBY3Rpb24oZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgcHJldkhlYWRlckFjdGlvbiA/IHRoaXMuY2hhbmdlRm9jdXNlZFRhYihwcmV2SGVhZGVyQWN0aW9uKSA6IHRoaXMub25UYWJFbmRLZXkoZXZlbnQpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJIb21lS2V5KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZpcnN0SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kRmlyc3RIZWFkZXJBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkVGFiKGZpcnN0SGVhZGVyQWN0aW9uKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VGb2N1c2VkVGFiKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuZm9jdXMoZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdE9uRm9jdXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMubXVsdGlwbGUgPyB0aGlzLl9hY3RpdmVJbmRleC5pbmNsdWRlcyhpKSA6IGkgPT09IHRoaXMuX2FjdGl2ZUluZGV4O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWIuaWQgPT0gZWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9ICF0YWIuc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVJbmRleC5pbmNsdWRlcyhpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVJbmRleC5wdXNoKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gdGhpcy5fYWN0aXZlSW5kZXguZmlsdGVyKChpbmQpID0+IGluZCAhPT0gaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhYi5pZCA9PSBlbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiLnNlbGVjdGVkID0gIXRhYi5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGFiLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQodGhpcy5fYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0YWIuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEhlYWRlckFjdGlvbih0YWJFbGVtZW50LCBzZWxmQ2hlY2sgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBuZXh0VGFiRWxlbWVudCA9IHNlbGZDaGVjayA/IHRhYkVsZW1lbnQgOiB0YWJFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShuZXh0VGFiRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJoZWFkZXJcIl0nKTtcblxuICAgICAgICByZXR1cm4gaGVhZGVyRWxlbWVudCA/IChEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShoZWFkZXJFbGVtZW50LCAnZGF0YS1wLWRpc2FibGVkJykgPyB0aGlzLmZpbmROZXh0SGVhZGVyQWN0aW9uKGhlYWRlckVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KSA6IERvbUhhbmRsZXIuZmluZFNpbmdsZShoZWFkZXJFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlcmFjdGlvblwiXScpKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZIZWFkZXJBY3Rpb24odGFiRWxlbWVudCwgc2VsZkNoZWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgcHJldlRhYkVsZW1lbnQgPSBzZWxmQ2hlY2sgPyB0YWJFbGVtZW50IDogdGFiRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHByZXZUYWJFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlclwiXScpO1xuXG4gICAgICAgIHJldHVybiBoZWFkZXJFbGVtZW50ID8gKERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSA/IHRoaXMuZmluZFByZXZIZWFkZXJBY3Rpb24oaGVhZGVyRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpIDogRG9tSGFuZGxlci5maW5kU2luZ2xlKGhlYWRlckVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaGVhZGVyYWN0aW9uXCJdJykpIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RIZWFkZXJBY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0RWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1swXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5leHRIZWFkZXJBY3Rpb24oZmlyc3RFbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZmluZExhc3RIZWFkZXJBY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZXMgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2RlcztcbiAgICAgICAgY29uc3QgbGFzdEVsID0gY2hpbGROb2Rlc1tjaGlsZE5vZGVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRQcmV2SGVhZGVyQWN0aW9uKGxhc3RFbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb25UYWJFbmRLZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGFzdEhlYWRlckFjdGlvbiA9IHRoaXMuZmluZExhc3RIZWFkZXJBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkVGFiKGxhc3RIZWFkZXJBY3Rpb24pO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0VGFicygpO1xuXG4gICAgICAgIHRoaXMudGFiTGlzdFN1YnNjcmlwdGlvbiA9ICh0aGlzLnRhYkxpc3QgYXMgUXVlcnlMaXN0PEFjY29yZGlvblRhYj4pLmNoYW5nZXMuc3Vic2NyaWJlKChfKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRUYWJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRUYWJzKCkge1xuICAgICAgICB0aGlzLnRhYnMgPSAodGhpcy50YWJMaXN0IGFzIFF1ZXJ5TGlzdDxBY2NvcmRpb25UYWI+KS50b0FycmF5KCk7XG5cbiAgICAgICAgdGhpcy50YWJzLmZvckVhY2goKHRhYikgPT4ge1xuICAgICAgICAgICAgdGFiLmhlYWRlckFyaWFMZXZlbCA9IHRoaXMuX2hlYWRlckFyaWFMZXZlbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25TdGF0ZSgpO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvblN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy50YWJzICYmIHRoaXMudGFicy5sZW5ndGggJiYgdGhpcy5fYWN0aXZlSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLm11bHRpcGxlID8gdGhpcy5fYWN0aXZlSW5kZXguaW5jbHVkZXMoaSkgOiBpID09PSB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICAgICAgICAgICAgICBsZXQgY2hhbmdlZCA9IHNlbGVjdGVkICE9PSB0aGlzLnRhYnNbaV0uc2VsZWN0ZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYnNbaV0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJzW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYnNbaV0uY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNUYWJBY3RpdmUoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLl9hY3RpdmVJbmRleCAmJiAoPG51bWJlcltdPnRoaXMuX2FjdGl2ZUluZGV4KS5pbmNsdWRlcyhpbmRleCkgOiB0aGlzLl9hY3RpdmVJbmRleCA9PT0gaW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0VGFiUHJvcCh0YWIsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRhYi5wcm9wcyA/IHRhYi5wcm9wc1tuYW1lXSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cGRhdGVBY3RpdmVJbmRleCgpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgfCBudW1iZXJbXSB8IG51bGwgPSB0aGlzLm11bHRpcGxlID8gW10gOiBudWxsO1xuICAgICAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiLCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAodGFiLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgKGluZGV4IGFzIG51bWJlcltdKS5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLmFjdGl2ZUluZGV4Q2hhbmdlLmVtaXQoaW5kZXggYXMgbnVtYmVyW10gfCBudW1iZXIpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50YWJMaXN0U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhYkxpc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDaGV2cm9uUmlnaHRJY29uLCBDaGV2cm9uRG93bkljb25dLFxuICAgIGV4cG9ydHM6IFtBY2NvcmRpb24sIEFjY29yZGlvblRhYiwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtBY2NvcmRpb24sIEFjY29yZGlvblRhYl1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uTW9kdWxlIHt9XG4iXX0=