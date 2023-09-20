import { AnimationEvent } from '@angular/animations';
import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnInit, QueryList, Renderer2, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FilterService, OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { Overlay } from 'primeng/overlay';
import { Scroller } from 'primeng/scroller';
import { ScrollerOptions } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { MultiSelectRemoveEvent, MultiSelectFilterOptions, MultiSelectFilterEvent, MultiSelectBlurEvent, MultiSelectChangeEvent, MultiSelectFocusEvent, MultiSelectLazyLoadEvent } from './multiselect.interface';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/overlay";
import * as i3 from "primeng/api";
import * as i4 from "primeng/tooltip";
import * as i5 from "primeng/ripple";
import * as i6 from "primeng/scroller";
import * as i7 from "primeng/icons/check";
import * as i8 from "primeng/icons/search";
import * as i9 from "primeng/icons/timescircle";
import * as i10 from "primeng/icons/times";
import * as i11 from "primeng/icons/chevrondown";
export declare const MULTISELECT_VALUE_ACCESSOR: any;
export declare class MultiSelectItem {
    option: any;
    selected: boolean | undefined;
    label: string | undefined;
    disabled: boolean | undefined;
    itemSize: number | undefined;
    template: TemplateRef<any> | undefined;
    checkIconTemplate: TemplateRef<any> | undefined;
    onClick: EventEmitter<any>;
    onKeydown: EventEmitter<any>;
    onOptionClick(event: Event): void;
    onOptionKeydown(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiSelectItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiSelectItem, "p-multiSelectItem", never, { "option": { "alias": "option"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "label": { "alias": "label"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "itemSize": { "alias": "itemSize"; "required": false; }; "template": { "alias": "template"; "required": false; }; "checkIconTemplate": { "alias": "checkIconTemplate"; "required": false; }; }, { "onClick": "onClick"; "onKeydown": "onKeydown"; }, never, never, false, never>;
}
/**
 * MultiSelect is used to select multiple items from a collection.
 * @group Components
 */
export declare class MultiSelect implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, ControlValueAccessor {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    zone: NgZone;
    filterService: FilterService;
    config: PrimeNGConfig;
    overlayService: OverlayService;
    /**
     * Inline style of the element.
     * @group Props
     */
    style: {
        [klass: string]: any;
    } | null | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass: string | undefined;
    /**
     * Inline style of the overlay panel.
     * @group Props
     */
    panelStyle: any;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass: string | undefined;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId: string | undefined;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled: boolean | undefined;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly: boolean | undefined;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group: boolean | undefined;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @group Props
     */
    filter: boolean;
    /**
     * Defines placeholder of the filter input.
     * @group Props
     */
    filterPlaceHolder: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale: string | undefined;
    /**
     * Specifies the visibility of the options panel.
     * @group Props
     */
    overlayVisible: boolean | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex: number | undefined;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey: string | undefined;
    /**
     * Name of the input element.
     * @group Props
     */
    name: string | undefined;
    /**
     * Label of the input for accessibility.
     * @group Props
     */
    label: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy: string | undefined;
    /**
     * Whether to show labels of selected item labels or use default label.
     * @group Props
     */
    displaySelectedLabel: boolean;
    /**
     * Decides how many selected item labels to show at most.
     * @group Props
     */
    maxSelectedLabels: number;
    /**
     * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
     * @group Props
     */
    selectedItemsLabel: string;
    /**
     * Whether to show the checkbox at header to toggle all items at once.
     * @group Props
     */
    showToggleAll: boolean;
    /**
     * Text to display when filtering does not return any results.
     * @group Props
     */
    emptyFilterMessage: string;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage: string;
    /**
     * Clears the filter value when hiding the dropdown.
     * @group Props
     */
    resetFilterOnHide: boolean;
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    dropdownIcon: string | undefined;
    /**
     * Name of the label field of an option.
     * @group Props
     */
    optionLabel: string | undefined;
    /**
     * Name of the value field of an option.
     * @group Props
     */
    optionValue: string | undefined;
    /**
     * Name of the disabled field of an option.
     * @group Props
     */
    optionDisabled: string | undefined;
    /**
     * Name of the label field of an option group.
     * @group Props
     */
    optionGroupLabel: string | undefined;
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    optionGroupChildren: string;
    /**
     * Whether to show the header.
     * @group Props
     */
    showHeader: boolean;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy: string | undefined;
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight: string;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy: boolean;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll: boolean | undefined;
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize: number | undefined;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions: ScrollerOptions | undefined;
    /**
     * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
     * @group Props
     */
    overlayOptions: OverlayOptions | undefined;
    /**
     * Defines a string that labels the filter input.
     * @group Props
     */
    ariaFilterLabel: string | undefined;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    tooltip: string;
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition: 'top' | 'left' | 'right' | 'bottom';
    /**
     * Type of CSS position.
     * @group Props
     */
    tooltipPositionStyle: string;
    /**
     * Style class of the tooltip.
     * @group Props
     */
    tooltipStyleClass: string | undefined;
    /**
     * Applies focus to the filter element when the overlay is shown.
     * @group Props
     */
    autofocusFilter: boolean;
    /**
     * No description available.
     * @group Props
     */
    display: string;
    /**
     * No description available.
     * @group Props
     */
    autocomplete: string;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear: boolean;
    /**
     * @deprecated since v14.2.0, use overlayOptions property instead.
     * Whether to automatically manage layering.
     * @group Props
     */
    get autoZIndex(): boolean | undefined;
    set autoZIndex(val: boolean | undefined);
    /**
     * @deprecated since v14.2.0, use overlayOptions property instead.
     * Base zIndex value to use in layering.
     * @group Props
     */
    get baseZIndex(): number | undefined;
    set baseZIndex(val: number | undefined);
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get showTransitionOptions(): string | undefined;
    set showTransitionOptions(val: string | undefined);
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get hideTransitionOptions(): string | undefined;
    set hideTransitionOptions(val: string | undefined);
    /**
     * Label to display when there are no selections.
     * @group Props
     * @deprecated Use placeholder instead.
     */
    set defaultLabel(val: string | undefined);
    get defaultLabel(): string | undefined;
    /**
     * Label to display when there are no selections.
     * @group Props
     */
    set placeholder(val: string | undefined);
    get placeholder(): string | undefined;
    /**
     * An array of objects to display as the available options.
     * @group Props
     */
    get options(): any[] | undefined;
    set options(val: any[] | undefined);
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    get filterValue(): string | undefined | null;
    set filterValue(val: string | undefined | null);
    /**
     * Item size of item to be virtual scrolled.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    get itemSize(): number | undefined;
    set itemSize(val: number | undefined);
    /**
     * Number of maximum options that can be selected.
     * @group Props
     */
    get selectionLimit(): number | undefined;
    set selectionLimit(val: number | undefined);
    containerViewChild: Nullable<ElementRef>;
    overlayViewChild: Nullable<Overlay>;
    filterInputChild: Nullable<ElementRef>;
    accessibleViewChild: Nullable<ElementRef>;
    itemsViewChild: Nullable<ElementRef>;
    scroller: Nullable<Scroller>;
    footerFacet: any;
    headerFacet: any;
    templates: Nullable<QueryList<PrimeTemplate>>;
    /**
     * Callback to invoke when value changes.
     * @param {MultiSelectChangeEvent} event - Custom change event.
     * @group Emits
     */
    onChange: EventEmitter<MultiSelectChangeEvent>;
    /**
     * Callback to invoke when data is filtered.
     * @param {MultiSelectFilterEvent} event - Custom filter event.
     * @group Emits
     */
    onFilter: EventEmitter<MultiSelectFilterEvent>;
    /**
     * Callback to invoke when multiselect receives focus.
     * @param {MultiSelectFocusEvent} event - Custom focus event.
     * @group Emits
     */
    onFocus: EventEmitter<MultiSelectFocusEvent>;
    /**
     * Callback to invoke when multiselect loses focus.
     * @param {MultiSelectBlurEvent} event - Custom blur event.
     * @group Emits
     */
    onBlur: EventEmitter<MultiSelectBlurEvent>;
    /**
     * Callback to invoke when component is clicked.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClick: EventEmitter<Event>;
    /**
     * Callback to invoke when input field is cleared.
     * @group Emits
     */
    onClear: EventEmitter<void>;
    /**
     * Callback to invoke when overlay panel becomes visible.
     * @group Emits
     */
    onPanelShow: EventEmitter<void>;
    /**
     * Callback to invoke when overlay panel becomes hidden.
     * @group Emits
     */
    onPanelHide: EventEmitter<void>;
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad: EventEmitter<MultiSelectLazyLoadEvent>;
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {MultiSelectRemoveEvent} event - Remove event.
     * @group Emits
     */
    onRemove: EventEmitter<MultiSelectRemoveEvent>;
    _autoZIndex: boolean | undefined;
    _baseZIndex: number | undefined;
    _showTransitionOptions: string | undefined;
    _hideTransitionOptions: string | undefined;
    _defaultLabel: string | undefined;
    _placeholder: string | undefined;
    _itemSize: number | undefined;
    _selectionLimit: number | undefined;
    value: any[] | undefined | null;
    _filteredOptions: any[] | undefined | null;
    onModelChange: Function;
    onModelTouched: Function;
    valuesAsString: string | undefined;
    focus: boolean | undefined;
    filled: boolean | undefined | null;
    _filterValue: string | undefined | null;
    filtered: boolean | undefined;
    itemTemplate: TemplateRef<any> | undefined;
    groupTemplate: TemplateRef<any> | undefined;
    loaderTemplate: TemplateRef<any> | undefined;
    headerTemplate: TemplateRef<any> | undefined;
    filterTemplate: TemplateRef<any> | undefined;
    footerTemplate: TemplateRef<any> | undefined;
    emptyFilterTemplate: TemplateRef<any> | undefined;
    emptyTemplate: TemplateRef<any> | undefined;
    selectedItemsTemplate: TemplateRef<any> | undefined;
    checkIconTemplate: TemplateRef<any> | undefined;
    filterIconTemplate: TemplateRef<any> | undefined;
    removeTokenIconTemplate: TemplateRef<any> | undefined;
    closeIconTemplate: TemplateRef<any> | undefined;
    clearIconTemplate: TemplateRef<any> | undefined;
    dropdownIconTemplate: TemplateRef<any> | undefined;
    headerCheckboxFocus: boolean | undefined;
    filterOptions: MultiSelectFilterOptions | undefined;
    _options: any[] | undefined;
    maxSelectionLimitReached: boolean | undefined;
    preventModelTouched: boolean | undefined;
    preventDocumentDefault: boolean | undefined;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, zone: NgZone, filterService: FilterService, config: PrimeNGConfig, overlayService: OverlayService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    getOptionLabel(option: any): any;
    getOptionValue(option: any): any;
    getOptionGroupLabel(optionGroup: any): any;
    getOptionGroupChildren(optionGroup: any): any;
    isOptionDisabled(option: any): any;
    writeValue(value: any): void;
    checkSelectionLimit(): void;
    updateFilledState(): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onOptionClick(event: {
        originalEvent: Event;
        option: any;
    }): void;
    isSelected(option: any): boolean;
    findSelectionIndex(val: any): number;
    get toggleAllDisabled(): boolean;
    toggleAll(event: Event): void;
    checkAll(): void;
    uncheckAll(): void;
    show(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    hide(): void;
    resetFilter(): void;
    close(event: Event): void;
    clear(event: Event): void;
    onMouseclick(event: MouseEvent, input: HTMLInputElement): void;
    removeChip(chip: MultiSelectItem, event: MouseEvent): void;
    onInputFocus(event: Event): void;
    onInputBlur(event: Event): void;
    onOptionKeydown(event: {
        originalEvent: Event;
        option: any;
    }): void;
    findNextItem(item: any): HTMLElement | null;
    findPrevItem(item: any): HTMLElement | null;
    onKeydown(event: KeyboardEvent): void;
    updateLabel(): void;
    findLabelByValue(val: any): string;
    searchLabelByValue(val: any, options: any[]): string;
    get allChecked(): boolean;
    get optionsToRender(): any[];
    get emptyMessageLabel(): string;
    get emptyFilterMessageLabel(): string;
    hasFilter(): boolean;
    isEmpty(): boolean;
    onFilterInputChange(event: KeyboardEvent): void;
    activateFilter(): void;
    onHeaderCheckboxFocus(): void;
    onHeaderCheckboxBlur(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiSelect, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MultiSelect, "p-multiSelect", never, { "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "panelStyle": { "alias": "panelStyle"; "required": false; }; "panelStyleClass": { "alias": "panelStyleClass"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "group": { "alias": "group"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "filterPlaceHolder": { "alias": "filterPlaceHolder"; "required": false; }; "filterLocale": { "alias": "filterLocale"; "required": false; }; "overlayVisible": { "alias": "overlayVisible"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "appendTo": { "alias": "appendTo"; "required": false; }; "dataKey": { "alias": "dataKey"; "required": false; }; "name": { "alias": "name"; "required": false; }; "label": { "alias": "label"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "displaySelectedLabel": { "alias": "displaySelectedLabel"; "required": false; }; "maxSelectedLabels": { "alias": "maxSelectedLabels"; "required": false; }; "selectedItemsLabel": { "alias": "selectedItemsLabel"; "required": false; }; "showToggleAll": { "alias": "showToggleAll"; "required": false; }; "emptyFilterMessage": { "alias": "emptyFilterMessage"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "resetFilterOnHide": { "alias": "resetFilterOnHide"; "required": false; }; "dropdownIcon": { "alias": "dropdownIcon"; "required": false; }; "optionLabel": { "alias": "optionLabel"; "required": false; }; "optionValue": { "alias": "optionValue"; "required": false; }; "optionDisabled": { "alias": "optionDisabled"; "required": false; }; "optionGroupLabel": { "alias": "optionGroupLabel"; "required": false; }; "optionGroupChildren": { "alias": "optionGroupChildren"; "required": false; }; "showHeader": { "alias": "showHeader"; "required": false; }; "filterBy": { "alias": "filterBy"; "required": false; }; "scrollHeight": { "alias": "scrollHeight"; "required": false; }; "lazy": { "alias": "lazy"; "required": false; }; "virtualScroll": { "alias": "virtualScroll"; "required": false; }; "virtualScrollItemSize": { "alias": "virtualScrollItemSize"; "required": false; }; "virtualScrollOptions": { "alias": "virtualScrollOptions"; "required": false; }; "overlayOptions": { "alias": "overlayOptions"; "required": false; }; "ariaFilterLabel": { "alias": "ariaFilterLabel"; "required": false; }; "filterMatchMode": { "alias": "filterMatchMode"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "tooltipPositionStyle": { "alias": "tooltipPositionStyle"; "required": false; }; "tooltipStyleClass": { "alias": "tooltipStyleClass"; "required": false; }; "autofocusFilter": { "alias": "autofocusFilter"; "required": false; }; "display": { "alias": "display"; "required": false; }; "autocomplete": { "alias": "autocomplete"; "required": false; }; "showClear": { "alias": "showClear"; "required": false; }; "autoZIndex": { "alias": "autoZIndex"; "required": false; }; "baseZIndex": { "alias": "baseZIndex"; "required": false; }; "showTransitionOptions": { "alias": "showTransitionOptions"; "required": false; }; "hideTransitionOptions": { "alias": "hideTransitionOptions"; "required": false; }; "defaultLabel": { "alias": "defaultLabel"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "options": { "alias": "options"; "required": false; }; "filterValue": { "alias": "filterValue"; "required": false; }; "itemSize": { "alias": "itemSize"; "required": false; }; "selectionLimit": { "alias": "selectionLimit"; "required": false; }; }, { "onChange": "onChange"; "onFilter": "onFilter"; "onFocus": "onFocus"; "onBlur": "onBlur"; "onClick": "onClick"; "onClear": "onClear"; "onPanelShow": "onPanelShow"; "onPanelHide": "onPanelHide"; "onLazyLoad": "onLazyLoad"; "onRemove": "onRemove"; }, ["footerFacet", "headerFacet", "templates"], ["p-header", "p-footer"], false, never>;
}
export declare class MultiSelectModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiSelectModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MultiSelectModule, [typeof MultiSelect, typeof MultiSelectItem], [typeof i1.CommonModule, typeof i2.OverlayModule, typeof i3.SharedModule, typeof i4.TooltipModule, typeof i5.RippleModule, typeof i6.ScrollerModule, typeof i7.CheckIcon, typeof i8.SearchIcon, typeof i9.TimesCircleIcon, typeof i10.TimesIcon, typeof i11.ChevronDownIcon, typeof i7.CheckIcon], [typeof MultiSelect, typeof i2.OverlayModule, typeof i3.SharedModule, typeof i6.ScrollerModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MultiSelectModule>;
}
