import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeTemplate } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { AngleDoubleLeftIcon } from 'primeng/icons/angledoubleleft';
import { AngleDoubleRightIcon } from 'primeng/icons/angledoubleright';
import { AngleLeftIcon } from 'primeng/icons/angleleft';
import { AngleRightIcon } from 'primeng/icons/angleright';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/dropdown";
import * as i3 from "primeng/api";
import * as i4 from "primeng/inputnumber";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/ripple";
/**
 * Paginator is a generic component to display content in paged format.
 * @group Components
 */
class Paginator {
    cd;
    /**
     * Number of page links to display.
     * @group Props
     */
    pageLinkSize = 5;
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
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShow = true;
    /**
     * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    dropdownAppendTo;
    /**
     * Template instance to inject into the left side of the paginator.
     * @param {PaginatorState} context - Paginator state.
     * @group Props
     */
    templateLeft;
    /**
     * Template instance to inject into the right side of the paginator.
     * @param {PaginatorState} context - Paginator state.
     * @group Props
     */
    templateRight;
    /**
     * Target element to attach the dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * Dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    dropdownScrollHeight = '200px';
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    currentPageReportTemplate = '{currentPage} of {totalPages}';
    /**
     * Whether to display current page report.
     * @group Props
     */
    showCurrentPageReport;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon = true;
    /**
     * Number of total records.
     * @group Props
     */
    totalRecords = 0;
    /**
     * Data count to display per page.
     * @group Props
     */
    rows = 0;
    /**
     * Array of integer/object values to display inside rows per page dropdown. A object that have 'showAll' key can be added to it to show all data. Exp; [10,20,30,{showAll:'All'}]
     * @group Props
     */
    rowsPerPageOptions;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown;
    /**
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    showJumpToPageInput;
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks = true;
    /**
     * Locale to be used in formatting.
     * @group Props
     */
    locale;
    /**
     * Template instance to inject into the dropdown item inside in the paginator.
     * @param {Object} context - item instance.
     * @group Props
     */
    dropdownItemTemplate;
    /**
     * Zero-relative number of the first row to be displayed.
     * @group Props
     */
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    /**
     * Callback to invoke when page changes, the event object contains information about the new state.
     * @param {PaginatorState} event - Paginator state.
     * @group Emits
     */
    onPageChange = new EventEmitter();
    templates;
    firstPageLinkIconTemplate;
    previousPageLinkIconTemplate;
    lastPageLinkIconTemplate;
    nextPageLinkIconTemplate;
    pageLinks;
    pageItems;
    rowsPerPageItems;
    paginatorState;
    _first = 0;
    _page = 0;
    constructor(cd) {
        this.cd = cd;
    }
    ngOnInit() {
        this.updatePaginatorState();
    }
    getLocalization(digit) {
        const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
        const index = new Map(numerals.map((d, i) => [i, d]));
        if (digit > 9) {
            const numbers = String(digit).split('');
            return numbers.map((number) => index.get(Number(number))).join('');
        }
        else {
            return index.get(digit);
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'firstpagelinkicon':
                    this.firstPageLinkIconTemplate = item.template;
                    break;
                case 'previouspagelinkicon':
                    this.previousPageLinkIconTemplate = item.template;
                    break;
                case 'lastpagelinkicon':
                    this.lastPageLinkIconTemplate = item.template;
                    break;
                case 'nextpagelinkicon':
                    this.nextPageLinkIconTemplate = item.template;
                    break;
            }
        });
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.totalRecords) {
            this.updatePageLinks();
            this.updatePaginatorState();
            this.updateFirst();
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.first) {
            this._first = simpleChange.first.currentValue;
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rows) {
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rowsPerPageOptions) {
            this.updateRowsPerPageOptions();
        }
    }
    updateRowsPerPageOptions() {
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    this.rowsPerPageItems.unshift({ label: opt['showAll'], value: this.totalRecords });
                }
                else {
                    this.rowsPerPageItems.push({ label: String(this.getLocalization(opt)), value: opt });
                }
            }
        }
    }
    isFirstPage() {
        return this.getPage() === 0;
    }
    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }
    getPageCount() {
        return Math.ceil(this.totalRecords / this.rows);
    }
    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2)), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    }
    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
        if (this.showJumpToPageDropdown) {
            this.pageItems = [];
            for (let i = 0; i < this.getPageCount(); i++) {
                this.pageItems.push({ label: String(i + 1), value: i });
            }
        }
    }
    changePage(p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }
    updateFirst() {
        const page = this.getPage();
        if (page > 0 && this.totalRecords && this.first >= this.totalRecords) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }
    getPage() {
        return Math.floor(this.first / this.rows);
    }
    changePageToFirst(event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    }
    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }
    changePageToNext(event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }
    changePageToLast(event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    }
    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }
    onRppChange(event) {
        this.changePage(this.getPage());
    }
    onPageDropdownChange(event) {
        this.changePage(event.value);
    }
    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    }
    empty() {
        return this.getPageCount() === 0;
    }
    currentPage() {
        return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
    }
    get currentPageReport() {
        return this.currentPageReportTemplate
            .replace('{currentPage}', String(this.currentPage()))
            .replace('{totalPages}', String(this.getPageCount()))
            .replace('{first}', String(this.totalRecords > 0 ? this._first + 1 : 0))
            .replace('{last}', String(Math.min(this._first + this.rows, this.totalRecords)))
            .replace('{rows}', String(this.rows))
            .replace('{totalRecords}', String(this.totalRecords));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Paginator, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Paginator, selector: "p-paginator", inputs: { pageLinkSize: "pageLinkSize", style: "style", styleClass: "styleClass", alwaysShow: "alwaysShow", dropdownAppendTo: "dropdownAppendTo", templateLeft: "templateLeft", templateRight: "templateRight", appendTo: "appendTo", dropdownScrollHeight: "dropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: "showCurrentPageReport", showFirstLastIcon: "showFirstLastIcon", totalRecords: "totalRecords", rows: "rows", rowsPerPageOptions: "rowsPerPageOptions", showJumpToPageDropdown: "showJumpToPageDropdown", showJumpToPageInput: "showJumpToPageInput", showPageLinks: "showPageLinks", locale: "locale", dropdownItemTemplate: "dropdownItemTemplate", first: "first" }, outputs: { onPageChange: "onPageChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], usesOnChanges: true, ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : pageLinks && pageLinks.length > 1">
            <div class="p-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToFirst($event)" pRipple class="p-paginator-first p-paginator-element p-link" [ngClass]="{ 'p-disabled': isFirstPage() || empty() }">
                <AngleDoubleLeftIcon *ngIf="!firstPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="firstPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple class="p-paginator-prev p-paginator-element p-link" [ngClass]="{ 'p-disabled': isFirstPage() || empty() }">
                <AngleLeftIcon *ngIf="!previousPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="previousPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button type="button" *ngFor="let pageLink of pageLinks" class="p-paginator-page p-paginator-element p-link" [ngClass]="{ 'p-highlight': pageLink - 1 == getPage() }" (click)="onPageLinkClick($event, pageLink - 1)" pRipple>
                    {{ getLocalization(pageLink) }}
                </button>
            </span>
            <p-dropdown
                [options]="pageItems"
                [ngModel]="getPage()"
                *ngIf="showJumpToPageDropdown"
                [disabled]="empty()"
                styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
            </p-dropdown>
            <button type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple class="p-paginator-next p-paginator-element p-link" [ngClass]="{ 'p-disabled': isLastPage() || empty() }">
                <AngleRightIcon *ngIf="!nextPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="nextPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple class="p-paginator-last p-paginator-element p-link" [ngClass]="{ 'p-disabled': isLastPage() || empty() }">
                <AngleDoubleRightIcon *ngIf="!lastPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="lastPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <p-inputNumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            <p-dropdown
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                *ngIf="rowsPerPageOptions"
                styleClass="p-paginator-rpp-options"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"> </ng-container>
                    </ng-template>
                </ng-container>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
            </div>
        </div>
    `, isInline: true, styles: [".p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-page,.p-paginator-next,.p-paginator-last,.p-paginator-first,.p-paginator-prev,.p-paginator-current{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;-webkit-user-select:none;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(function () { return i2.Dropdown; }), selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "overlayDirection", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.PrimeTemplate; }), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "component", type: i0.forwardRef(function () { return i4.InputNumber; }), selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "showClear", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown", "onClear"] }, { kind: "directive", type: i0.forwardRef(function () { return i5.NgControlStatus; }), selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i0.forwardRef(function () { return i5.NgModel; }), selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i0.forwardRef(function () { return i6.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return AngleDoubleLeftIcon; }), selector: "AngleDoubleLeftIcon" }, { kind: "component", type: i0.forwardRef(function () { return AngleDoubleRightIcon; }), selector: "AngleDoubleRightIcon" }, { kind: "component", type: i0.forwardRef(function () { return AngleLeftIcon; }), selector: "AngleLeftIcon" }, { kind: "component", type: i0.forwardRef(function () { return AngleRightIcon; }), selector: "AngleRightIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Paginator };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Paginator, decorators: [{
            type: Component,
            args: [{ selector: 'p-paginator', template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-paginator p-component'" *ngIf="alwaysShow ? true : pageLinks && pageLinks.length > 1">
            <div class="p-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: { $implicit: paginatorState }"></ng-container>
            </div>
            <span class="p-paginator-current" *ngIf="showCurrentPageReport">{{ currentPageReport }}</span>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToFirst($event)" pRipple class="p-paginator-first p-paginator-element p-link" [ngClass]="{ 'p-disabled': isFirstPage() || empty() }">
                <AngleDoubleLeftIcon *ngIf="!firstPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="firstPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple class="p-paginator-prev p-paginator-element p-link" [ngClass]="{ 'p-disabled': isFirstPage() || empty() }">
                <AngleLeftIcon *ngIf="!previousPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="previousPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <span class="p-paginator-pages" *ngIf="showPageLinks">
                <button type="button" *ngFor="let pageLink of pageLinks" class="p-paginator-page p-paginator-element p-link" [ngClass]="{ 'p-highlight': pageLink - 1 == getPage() }" (click)="onPageLinkClick($event, pageLink - 1)" pRipple>
                    {{ getLocalization(pageLink) }}
                </button>
            </span>
            <p-dropdown
                [options]="pageItems"
                [ngModel]="getPage()"
                *ngIf="showJumpToPageDropdown"
                [disabled]="empty()"
                styleClass="p-paginator-page-options"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-template pTemplate="selectedItem">{{ currentPageReport }}</ng-template>
            </p-dropdown>
            <button type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple class="p-paginator-next p-paginator-element p-link" [ngClass]="{ 'p-disabled': isLastPage() || empty() }">
                <AngleRightIcon *ngIf="!nextPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="nextPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <button *ngIf="showFirstLastIcon" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple class="p-paginator-last p-paginator-element p-link" [ngClass]="{ 'p-disabled': isLastPage() || empty() }">
                <AngleDoubleRightIcon *ngIf="!lastPageLinkIconTemplate" [styleClass]="'p-paginator-icon'" />
                <span class="p-paginator-icon" *ngIf="lastPageLinkIconTemplate">
                    <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate"></ng-template>
                </span>
            </button>
            <p-inputNumber *ngIf="showJumpToPageInput" [ngModel]="currentPage()" class="p-paginator-page-input" [disabled]="empty()" (ngModelChange)="changePage($event - 1)"></p-inputNumber>
            <p-dropdown
                [options]="rowsPerPageItems"
                [(ngModel)]="rows"
                *ngIf="rowsPerPageOptions"
                styleClass="p-paginator-rpp-options"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="dropdownAppendTo"
                [scrollHeight]="dropdownScrollHeight"
            >
                <ng-container *ngIf="dropdownItemTemplate">
                    <ng-template let-item pTemplate="item">
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate; context: { $implicit: item }"> </ng-container>
                    </ng-template>
                </ng-container>
            </p-dropdown>
            <div class="p-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: { $implicit: paginatorState }"></ng-container>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-paginator{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}.p-paginator-left-content{margin-right:auto}.p-paginator-right-content{margin-left:auto}.p-paginator-page,.p-paginator-next,.p-paginator-last,.p-paginator-first,.p-paginator-prev,.p-paginator-current{cursor:pointer;display:inline-flex;align-items:center;justify-content:center;line-height:1;-webkit-user-select:none;user-select:none;overflow:hidden;position:relative}.p-paginator-element:focus{z-index:1;position:relative}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { pageLinkSize: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], alwaysShow: [{
                type: Input
            }], dropdownAppendTo: [{
                type: Input
            }], templateLeft: [{
                type: Input
            }], templateRight: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], dropdownScrollHeight: [{
                type: Input
            }], currentPageReportTemplate: [{
                type: Input
            }], showCurrentPageReport: [{
                type: Input
            }], showFirstLastIcon: [{
                type: Input
            }], totalRecords: [{
                type: Input
            }], rows: [{
                type: Input
            }], rowsPerPageOptions: [{
                type: Input
            }], showJumpToPageDropdown: [{
                type: Input
            }], showJumpToPageInput: [{
                type: Input
            }], showPageLinks: [{
                type: Input
            }], locale: [{
                type: Input
            }], dropdownItemTemplate: [{
                type: Input
            }], first: [{
                type: Input
            }], onPageChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class PaginatorModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: PaginatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: PaginatorModule, declarations: [Paginator], imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon], exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: PaginatorModule, imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon, DropdownModule, InputNumberModule, FormsModule, SharedModule] });
}
export { PaginatorModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: PaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, DropdownModule, InputNumberModule, FormsModule, SharedModule, RippleModule, AngleDoubleLeftIcon, AngleDoubleRightIcon, AngleLeftIcon, AngleRightIcon],
                    exports: [Paginator, DropdownModule, InputNumberModule, FormsModule, SharedModule],
                    declarations: [Paginator]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3BhZ2luYXRvci9wYWdpbmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBcUIsWUFBWSxFQUF5Qyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBb0IsZUFBZSxFQUF5QixNQUFNLGVBQWUsQ0FBQztBQUN6UCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7O0FBSTFEOzs7R0FHRztBQUNILE1BOEVhLFNBQVM7SUErSUU7SUE5SXBCOzs7T0FHRztJQUNNLFlBQVksR0FBVyxDQUFDLENBQUM7SUFDbEM7OztPQUdHO0lBQ00sS0FBSyxDQUE4QztJQUM1RDs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLFVBQVUsR0FBWSxJ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c0JBQWpCLEtBQUs7Z0JBV0ksWUFBWTtzQkFBckIsTUFBTTtnQkFFeUIsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQWdQbEMsTUFLYSxlQUFlO3VHQUFmLGVBQWU7d0dBQWYsZUFBZSxpQkE5V2YsU0FBUyxhQTBXUixZQUFZLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxjQUFjLGFBMVduSyxTQUFTLEVBMldHLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsWUFBWTt3R0FHeEUsZUFBZSxZQUpkLFlBQVksRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFDdkosY0FBYyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxZQUFZOztTQUd4RSxlQUFlOzJGQUFmLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDO29CQUM3SyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUM7b0JBQ2xGLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdG9yUmVmLCBFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgSW5wdXROdW1iZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL2lucHV0bnVtYmVyJztcbmltcG9ydCB7IEFuZ2xlRG91YmxlTGVmdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlZG91YmxlbGVmdCc7XG5pbXBvcnQgeyBBbmdsZURvdWJsZVJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3VibGVyaWdodCc7XG5pbXBvcnQgeyBBbmdsZUxlZnRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZWxlZnQnO1xuaW1wb3J0IHsgQW5nbGVSaWdodEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2FuZ2xlcmlnaHQnO1xuaW1wb3J0IHsgUGFnaW5hdG9yU3RhdGUgfSBmcm9tICcuL3BhZ2luYXRvci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgRHJvcGRvd25DaGFuZ2VFdmVudCB9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xuLyoqXG4gKiBQYWdpbmF0b3IgaXMgYSBnZW5lcmljIGNvbXBvbmVudCB0byBkaXNwbGF5IGNvbnRlbnQgaW4gcGFnZWQgZm9ybWF0LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXBhZ2luYXRvcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwiJ3AtcGFnaW5hdG9yIHAtY29tcG9uZW50J1wiICpuZ0lmPVwiYWx3YXlzU2hvdyA/IHRydWUgOiBwYWdlTGlua3MgJiYgcGFnZUxpbmtzLmxlbmd0aCA+IDFcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXBhZ2luYXRvci1sZWZ0LWNvbnRlbnRcIiAqbmdJZj1cInRlbXBsYXRlTGVmdFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZUxlZnQ7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBwYWdpbmF0b3JTdGF0ZSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYWdpbmF0b3ItY3VycmVudFwiICpuZ0lmPVwic2hvd0N1cnJlbnRQYWdlUmVwb3J0XCI+e3sgY3VycmVudFBhZ2VSZXBvcnQgfX08L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd0ZpcnN0TGFzdEljb25cIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImlzRmlyc3RQYWdlKCkgfHwgZW1wdHkoKVwiIChjbGljayk9XCJjaGFuZ2VQYWdlVG9GaXJzdCgkZXZlbnQpXCIgcFJpcHBsZSBjbGFzcz1cInAtcGFnaW5hdG9yLWZpcnN0IHAtcGFnaW5hdG9yLWVsZW1lbnQgcC1saW5rXCIgW25nQ2xhc3NdPVwieyAncC1kaXNhYmxlZCc6IGlzRmlyc3RQYWdlKCkgfHwgZW1wdHkoKSB9XCI+XG4gICAgICAgICAgICAgICAgPEFuZ2xlRG91YmxlTGVmdEljb24gKm5nSWY9XCIhZmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXBhZ2luYXRvci1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBhZ2luYXRvci1pY29uXCIgKm5nSWY9XCJmaXJzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImZpcnN0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cImlzRmlyc3RQYWdlKCkgfHwgZW1wdHkoKVwiIChjbGljayk9XCJjaGFuZ2VQYWdlVG9QcmV2KCRldmVudClcIiBwUmlwcGxlIGNsYXNzPVwicC1wYWdpbmF0b3ItcHJldiBwLXBhZ2luYXRvci1lbGVtZW50IHAtbGlua1wiIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpc0ZpcnN0UGFnZSgpIHx8IGVtcHR5KCkgfVwiPlxuICAgICAgICAgICAgICAgIDxBbmdsZUxlZnRJY29uICpuZ0lmPVwiIXByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1wYWdpbmF0b3ItaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYWdpbmF0b3ItaWNvblwiICpuZ0lmPVwicHJldmlvdXNQYWdlTGlua0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwcmV2aW91c1BhZ2VMaW5rSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYWdpbmF0b3ItcGFnZXNcIiAqbmdJZj1cInNob3dQYWdlTGlua3NcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAqbmdGb3I9XCJsZXQgcGFnZUxpbmsgb2YgcGFnZUxpbmtzXCIgY2xhc3M9XCJwLXBhZ2luYXRvci1wYWdlIHAtcGFnaW5hdG9yLWVsZW1lbnQgcC1saW5rXCIgW25nQ2xhc3NdPVwieyAncC1oaWdobGlnaHQnOiBwYWdlTGluayAtIDEgPT0gZ2V0UGFnZSgpIH1cIiAoY2xpY2spPVwib25QYWdlTGlua0NsaWNrKCRldmVudCwgcGFnZUxpbmsgLSAxKVwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgIHt7IGdldExvY2FsaXphdGlvbihwYWdlTGluaykgfX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxwLWRyb3Bkb3duXG4gICAgICAgICAgICAgICAgW29wdGlvbnNdPVwicGFnZUl0ZW1zXCJcbiAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCJnZXRQYWdlKClcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0p1bXBUb1BhZ2VEcm9wZG93blwiXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImVtcHR5KClcIlxuICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3M9XCJwLXBhZ2luYXRvci1wYWdlLW9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIChvbkNoYW5nZSk9XCJvblBhZ2VEcm9wZG93bkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbYXBwZW5kVG9dPVwiZHJvcGRvd25BcHBlbmRUb1wiXG4gICAgICAgICAgICAgICAgW3Njcm9sbEhlaWdodF09XCJkcm9wZG93blNjcm9sbEhlaWdodFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cInNlbGVjdGVkSXRlbVwiPnt7IGN1cnJlbnRQYWdlUmVwb3J0IH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcC1kcm9wZG93bj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJpc0xhc3RQYWdlKCkgfHwgZW1wdHkoKVwiIChjbGljayk9XCJjaGFuZ2VQYWdlVG9OZXh0KCRldmVudClcIiBwUmlwcGxlIGNsYXNzPVwicC1wYWdpbmF0b3ItbmV4dCBwLXBhZ2luYXRvci1lbGVtZW50IHAtbGlua1wiIFtuZ0NsYXNzXT1cInsgJ3AtZGlzYWJsZWQnOiBpc0xhc3RQYWdlKCkgfHwgZW1wdHkoKSB9XCI+XG4gICAgICAgICAgICAgICAgPEFuZ2xlUmlnaHRJY29uICpuZ0lmPVwiIW5leHRQYWdlTGlua0ljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXBhZ2luYXRvci1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXBhZ2luYXRvci1pY29uXCIgKm5nSWY9XCJuZXh0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibmV4dFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzaG93Rmlyc3RMYXN0SWNvblwiIHR5cGU9XCJidXR0b25cIiBbZGlzYWJsZWRdPVwiaXNMYXN0UGFnZSgpIHx8IGVtcHR5KClcIiAoY2xpY2spPVwiY2hhbmdlUGFnZVRvTGFzdCgkZXZlbnQpXCIgcFJpcHBsZSBjbGFzcz1cInAtcGFnaW5hdG9yLWxhc3QgcC1wYWdpbmF0b3ItZWxlbWVudCBwLWxpbmtcIiBbbmdDbGFzc109XCJ7ICdwLWRpc2FibGVkJzogaXNMYXN0UGFnZSgpIHx8IGVtcHR5KCkgfVwiPlxuICAgICAgICAgICAgICAgIDxBbmdsZURvdWJsZVJpZ2h0SWNvbiAqbmdJZj1cIiFsYXN0UGFnZUxpbmtJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1wYWdpbmF0b3ItaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1wYWdpbmF0b3ItaWNvblwiICpuZ0lmPVwibGFzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8cC1pbnB1dE51bWJlciAqbmdJZj1cInNob3dKdW1wVG9QYWdlSW5wdXRcIiBbbmdNb2RlbF09XCJjdXJyZW50UGFnZSgpXCIgY2xhc3M9XCJwLXBhZ2luYXRvci1wYWdlLWlucHV0XCIgW2Rpc2FibGVkXT1cImVtcHR5KClcIiAobmdNb2RlbENoYW5nZSk9XCJjaGFuZ2VQYWdlKCRldmVudCAtIDEpXCI+PC9wLWlucHV0TnVtYmVyPlxuICAgICAgICAgICAgPHAtZHJvcGRvd25cbiAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJyb3dzUGVyUGFnZUl0ZW1zXCJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cInJvd3NcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwicm93c1BlclBhZ2VPcHRpb25zXCJcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzPVwicC1wYWdpbmF0b3ItcnBwLW9wdGlvbnNcIlxuICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJlbXB0eSgpXCJcbiAgICAgICAgICAgICAgICAob25DaGFuZ2UpPVwib25ScHBDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW2FwcGVuZFRvXT1cImRyb3Bkb3duQXBwZW5kVG9cIlxuICAgICAgICAgICAgICAgIFtzY3JvbGxIZWlnaHRdPVwiZHJvcGRvd25TY3JvbGxIZWlnaHRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkcm9wZG93bkl0ZW1UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbGV0LWl0ZW0gcFRlbXBsYXRlPVwiaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRyb3Bkb3duSXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCI+IDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9wLWRyb3Bkb3duPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtcGFnaW5hdG9yLXJpZ2h0LWNvbnRlbnRcIiAqbmdJZj1cInRlbXBsYXRlUmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVSaWdodDsgY29udGV4dDogeyAkaW1wbGljaXQ6IHBhZ2luYXRvclN0YXRlIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFnaW5hdG9yLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0b3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcyB7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHBhZ2UgbGlua3MgdG8gZGlzcGxheS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYWdlTGlua1NpemU6IG51bWJlciA9IDU7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IGl0IGV2ZW4gdGhlcmUgaXMgb25seSBvbmUgcGFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhbHdheXNTaG93OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIGRyb3Bkb3duIG92ZXJsYXksIHZhbGlkIHZhbHVlcyBhcmUgXCJib2R5XCIgb3IgYSBsb2NhbCBuZy10ZW1wbGF0ZSB2YXJpYWJsZSBvZiBhbm90aGVyIGVsZW1lbnQgKG5vdGU6IHVzZSBiaW5kaW5nIHdpdGggYnJhY2tldHMgZm9yIHRlbXBsYXRlIHZhcmlhYmxlcywgZS5nLiBbYXBwZW5kVG9dPVwibXlkaXZcIiBmb3IgYSBkaXYgZWxlbWVudCBoYXZpbmcgI215ZGl2IGFzIHZhcmlhYmxlIG5hbWUpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyb3Bkb3duQXBwZW5kVG86IEhUTUxFbGVtZW50IHwgRWxlbWVudFJlZiB8IFRlbXBsYXRlUmVmPGFueT4gfCBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIHwgYW55O1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGluc3RhbmNlIHRvIGluamVjdCBpbnRvIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHBhZ2luYXRvci5cbiAgICAgKiBAcGFyYW0ge1BhZ2luYXRvclN0YXRlfSBjb250ZXh0IC0gUGFnaW5hdG9yIHN0YXRlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRlbXBsYXRlTGVmdDogVGVtcGxhdGVSZWY8UGFnaW5hdG9yU3RhdGU+IHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGluc3RhbmNlIHRvIGluamVjdCBpbnRvIHRoZSByaWdodCBzaWRlIG9mIHRoZSBwYWdpbmF0b3IuXG4gICAgICogQHBhcmFtIHtQYWdpbmF0b3JTdGF0ZX0gY29udGV4dCAtIFBhZ2luYXRvciBzdGF0ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0ZW1wbGF0ZVJpZ2h0OiBUZW1wbGF0ZVJlZjxQYWdpbmF0b3JTdGF0ZT4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGFyZ2V0IGVsZW1lbnQgdG8gYXR0YWNoIHRoZSBkcm9wZG93biBvdmVybGF5LCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgVGVtcGxhdGVSZWY8YW55PiB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgfCBhbnk7XG4gICAgLyoqXG4gICAgICogRHJvcGRvd24gaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHMsIGEgc2Nyb2xsYmFyIGlzIGRlZmluZWQgaWYgaGVpZ2h0IG9mIGxpc3QgZXhjZWVkcyB0aGlzIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRyb3Bkb3duU2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIG9mIHRoZSBjdXJyZW50IHBhZ2UgcmVwb3J0IGVsZW1lbnQuIEF2YWlsYWJsZSBwbGFjZWhvbGRlcnMgYXJlIHtjdXJyZW50UGFnZX0se3RvdGFsUGFnZXN9LHtyb3dzfSx7Zmlyc3R9LHtsYXN0fSBhbmQge3RvdGFsUmVjb3Jkc31cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlOiBzdHJpbmcgPSAne2N1cnJlbnRQYWdlfSBvZiB7dG90YWxQYWdlc30nO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBjdXJyZW50IHBhZ2UgcmVwb3J0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dDdXJyZW50UGFnZVJlcG9ydDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGljb25zIGFyZSBkaXNwbGF5ZWQgb24gcGFnaW5hdG9yIHRvIGdvIGZpcnN0IGFuZCBsYXN0IHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0ZpcnN0TGFzdEljb246IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiB0b3RhbCByZWNvcmRzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvdGFsUmVjb3JkczogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBEYXRhIGNvdW50IHRvIGRpc3BsYXkgcGVyIHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcm93czogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBpbnRlZ2VyL29iamVjdCB2YWx1ZXMgdG8gZGlzcGxheSBpbnNpZGUgcm93cyBwZXIgcGFnZSBkcm9wZG93bi4gQSBvYmplY3QgdGhhdCBoYXZlICdzaG93QWxsJyBrZXkgY2FuIGJlIGFkZGVkIHRvIGl0IHRvIHNob3cgYWxsIGRhdGEuIEV4cDsgWzEwLDIwLDMwLHtzaG93QWxsOidBbGwnfV1cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3dzUGVyUGFnZU9wdGlvbnM6IGFueVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBhIGRyb3Bkb3duIHRvIG5hdmlnYXRlIHRvIGFueSBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dKdW1wVG9QYWdlRHJvcGRvd246IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBkaXNwbGF5IGEgaW5wdXQgdG8gbmF2aWdhdGUgdG8gYW55IHBhZ2UuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0p1bXBUb1BhZ2VJbnB1dDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgcGFnZSBsaW5rcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93UGFnZUxpbmtzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgdG8gYmUgdXNlZCBpbiBmb3JtYXR0aW5nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGluc3RhbmNlIHRvIGluamVjdCBpbnRvIHRoZSBkcm9wZG93biBpdGVtIGluc2lkZSBpbiB0aGUgcGFnaW5hdG9yLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IC0gaXRlbSBpbnN0YW5jZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkcm9wZG93bkl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IGFueSB9PiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBaZXJvLXJlbGF0aXZlIG51bWJlciBvZiB0aGUgZmlyc3Qgcm93IHRvIGJlIGRpc3BsYXllZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZmlyc3QoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0O1xuICAgIH1cbiAgICBzZXQgZmlyc3QodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZmlyc3QgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHBhZ2UgY2hhbmdlcywgdGhlIGV2ZW50IG9iamVjdCBjb250YWlucyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbmV3IHN0YXRlLlxuICAgICAqIEBwYXJhbSB7UGFnaW5hdG9yU3RhdGV9IGV2ZW50IC0gUGFnaW5hdG9yIHN0YXRlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblBhZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxQYWdpbmF0b3JTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPFBhZ2luYXRvclN0YXRlPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IE51bGxhYmxlPFF1ZXJ5TGlzdDxhbnk+PjtcblxuICAgIGZpcnN0UGFnZUxpbmtJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcHJldmlvdXNQYWdlTGlua0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBsYXN0UGFnZUxpbmtJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbmV4dFBhZ2VMaW5rSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHBhZ2VMaW5rczogbnVtYmVyW10gfCB1bmRlZmluZWQ7XG5cbiAgICBwYWdlSXRlbXM6IFNlbGVjdEl0ZW1bXSB8IHVuZGVmaW5lZDtcblxuICAgIHJvd3NQZXJQYWdlSXRlbXM6IFNlbGVjdEl0ZW1bXSB8IHVuZGVmaW5lZDtcblxuICAgIHBhZ2luYXRvclN0YXRlOiBhbnk7XG5cbiAgICBfZmlyc3Q6IG51bWJlciA9IDA7XG5cbiAgICBfcGFnZTogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICB9XG5cbiAgICBnZXRMb2NhbGl6YXRpb24oZGlnaXQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBudW1lcmFscyA9IFsuLi5uZXcgSW50bC5OdW1iZXJGb3JtYXQodGhpcy5sb2NhbGUsIHsgdXNlR3JvdXBpbmc6IGZhbHNlIH0pLmZvcm1hdCg5ODc2NTQzMjEwKV0ucmV2ZXJzZSgpO1xuICAgICAgICBjb25zdCBpbmRleCA9IG5ldyBNYXAobnVtZXJhbHMubWFwKChkLCBpKSA9PiBbaSwgZF0pKTtcbiAgICAgICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgICAgICAgY29uc3QgbnVtYmVycyA9IFN0cmluZyhkaWdpdCkuc3BsaXQoJycpO1xuICAgICAgICAgICAgcmV0dXJuIG51bWJlcnMubWFwKChudW1iZXIpID0+IGluZGV4LmdldChOdW1iZXIobnVtYmVyKSkpLmpvaW4oJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4LmdldChkaWdpdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdmaXJzdHBhZ2VsaW5raWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncHJldmlvdXNwYWdlbGlua2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xhc3RwYWdlbGlua2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbmV4dHBhZ2VsaW5raWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFBhZ2VMaW5rSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnRvdGFsUmVjb3Jkcykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlyc3QoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmZpcnN0KSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IHNpbXBsZUNoYW5nZS5maXJzdC5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5yb3dzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5yb3dzUGVyUGFnZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVSb3dzUGVyUGFnZU9wdGlvbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvd3NQZXJQYWdlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5yb3dzUGVyUGFnZUl0ZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBvcHQgb2YgdGhpcy5yb3dzUGVyUGFnZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PSAnb2JqZWN0JyAmJiBvcHRbJ3Nob3dBbGwnXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMudW5zaGlmdCh7IGxhYmVsOiBvcHRbJ3Nob3dBbGwnXSwgdmFsdWU6IHRoaXMudG90YWxSZWNvcmRzIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c1BlclBhZ2VJdGVtcy5wdXNoKHsgbGFiZWw6IFN0cmluZyh0aGlzLmdldExvY2FsaXphdGlvbihvcHQpKSwgdmFsdWU6IG9wdCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZpcnN0UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZSgpID09PSAwO1xuICAgIH1cblxuICAgIGlzTGFzdFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2UoKSA9PT0gdGhpcy5nZXRQYWdlQ291bnQoKSAtIDE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUNvdW50KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxSZWNvcmRzIC8gdGhpcy5yb3dzKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVQYWdlTGlua0JvdW5kYXJpZXMoKSB7XG4gICAgICAgIGxldCBudW1iZXJPZlBhZ2VzID0gdGhpcy5nZXRQYWdlQ291bnQoKSxcbiAgICAgICAgICAgIHZpc2libGVQYWdlcyA9IE1hdGgubWluKHRoaXMucGFnZUxpbmtTaXplLCBudW1iZXJPZlBhZ2VzKTtcblxuICAgICAgICAvL2NhbGN1bGF0ZSByYW5nZSwga2VlcCBjdXJyZW50IGluIG1pZGRsZSBpZiBuZWNlc3NhcnlcbiAgICAgICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKHRoaXMuZ2V0UGFnZSgpIC0gdmlzaWJsZVBhZ2VzIC8gMikpLFxuICAgICAgICAgICAgZW5kID0gTWF0aC5taW4obnVtYmVyT2ZQYWdlcyAtIDEsIHN0YXJ0ICsgdmlzaWJsZVBhZ2VzIC0gMSk7XG5cbiAgICAgICAgLy9jaGVjayB3aGVuIGFwcHJvYWNoaW5nIHRvIGxhc3QgcGFnZVxuICAgICAgICB2YXIgZGVsdGEgPSB0aGlzLnBhZ2VMaW5rU2l6ZSAtIChlbmQgLSBzdGFydCArIDEpO1xuICAgICAgICBzdGFydCA9IE1hdGgubWF4KDAsIHN0YXJ0IC0gZGVsdGEpO1xuXG4gICAgICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gICAgfVxuXG4gICAgdXBkYXRlUGFnZUxpbmtzKCkge1xuICAgICAgICB0aGlzLnBhZ2VMaW5rcyA9IFtdO1xuICAgICAgICBsZXQgYm91bmRhcmllcyA9IHRoaXMuY2FsY3VsYXRlUGFnZUxpbmtCb3VuZGFyaWVzKCksXG4gICAgICAgICAgICBzdGFydCA9IGJvdW5kYXJpZXNbMF0sXG4gICAgICAgICAgICBlbmQgPSBib3VuZGFyaWVzWzFdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wYWdlTGlua3MucHVzaChpICsgMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93SnVtcFRvUGFnZURyb3Bkb3duKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VJdGVtcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdldFBhZ2VDb3VudCgpOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VJdGVtcy5wdXNoKHsgbGFiZWw6IFN0cmluZyhpICsgMSksIHZhbHVlOiBpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZShwOiBudW1iZXIpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcy5nZXRQYWdlQ291bnQoKTtcblxuICAgICAgICBpZiAocCA+PSAwICYmIHAgPCBwYykge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSB0aGlzLnJvd3MgKiBwO1xuICAgICAgICAgICAgdmFyIHN0YXRlID0ge1xuICAgICAgICAgICAgICAgIHBhZ2U6IHAsXG4gICAgICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxuICAgICAgICAgICAgICAgIHBhZ2VDb3VudDogcGNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuXG4gICAgICAgICAgICB0aGlzLm9uUGFnZUNoYW5nZS5lbWl0KHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUZpcnN0KCkge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5nZXRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlID4gMCAmJiB0aGlzLnRvdGFsUmVjb3JkcyAmJiB0aGlzLmZpcnN0ID49IHRoaXMudG90YWxSZWNvcmRzKSB7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLmNoYW5nZVBhZ2UocGFnZSAtIDEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5maXJzdCAvIHRoaXMucm93cyk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZVRvRmlyc3QoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0ZpcnN0UGFnZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2UoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb1ByZXYoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSAtIDEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb05leHQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSArIDEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb0xhc3QoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0xhc3RQYWdlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2VDb3VudCgpIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uUGFnZUxpbmtDbGljayhldmVudDogRXZlbnQsIHBhZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UocGFnZSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25ScHBDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSk7XG4gICAgfVxuXG4gICAgb25QYWdlRHJvcGRvd25DaGFuZ2UoZXZlbnQ6IERyb3Bkb3duQ2hhbmdlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKGV2ZW50LnZhbHVlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQYWdpbmF0b3JTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wYWdpbmF0b3JTdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMuZ2V0UGFnZSgpLFxuICAgICAgICAgICAgcGFnZUNvdW50OiB0aGlzLmdldFBhZ2VDb3VudCgpLFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICB0b3RhbFJlY29yZHM6IHRoaXMudG90YWxSZWNvcmRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZW1wdHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2VDb3VudCgpID09PSAwO1xuICAgIH1cblxuICAgIGN1cnJlbnRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYWdlQ291bnQoKSA+IDAgPyB0aGlzLmdldFBhZ2UoKSArIDEgOiAwO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50UGFnZVJlcG9ydCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZVxuICAgICAgICAgICAgLnJlcGxhY2UoJ3tjdXJyZW50UGFnZX0nLCBTdHJpbmcodGhpcy5jdXJyZW50UGFnZSgpKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7dG90YWxQYWdlc30nLCBTdHJpbmcodGhpcy5nZXRQYWdlQ291bnQoKSkpXG4gICAgICAgICAgICAucmVwbGFjZSgne2ZpcnN0fScsIFN0cmluZyh0aGlzLnRvdGFsUmVjb3JkcyA+IDAgPyB0aGlzLl9maXJzdCArIDEgOiAwKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7bGFzdH0nLCBTdHJpbmcoTWF0aC5taW4odGhpcy5fZmlyc3QgKyB0aGlzLnJvd3MsIHRoaXMudG90YWxSZWNvcmRzKSkpXG4gICAgICAgICAgICAucmVwbGFjZSgne3Jvd3N9JywgU3RyaW5nKHRoaXMucm93cykpXG4gICAgICAgICAgICAucmVwbGFjZSgne3RvdGFsUmVjb3Jkc30nLCBTdHJpbmcodGhpcy50b3RhbFJlY29yZHMpKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRHJvcGRvd25Nb2R1bGUsIElucHV0TnVtYmVyTW9kdWxlLCBGb3Jtc01vZHVsZSwgU2hhcmVkTW9kdWxlLCBSaXBwbGVNb2R1bGUsIEFuZ2xlRG91YmxlTGVmdEljb24sIEFuZ2xlRG91YmxlUmlnaHRJY29uLCBBbmdsZUxlZnRJY29uLCBBbmdsZVJpZ2h0SWNvbl0sXG4gICAgZXhwb3J0czogW1BhZ2luYXRvciwgRHJvcGRvd25Nb2R1bGUsIElucHV0TnVtYmVyTW9kdWxlLCBGb3Jtc01vZHVsZSwgU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQYWdpbmF0b3JdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRvck1vZHVsZSB7fVxuIl19