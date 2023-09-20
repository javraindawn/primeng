import { AnimationEvent } from '@angular/animations';
import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnInit, QueryList, Renderer2, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FilterService, OverlayOptions, PrimeNGConfig, PrimeTemplate, SelectItem } from 'primeng/api';
import { Overlay } from 'primeng/overlay';
import { Scroller } from 'primeng/scroller';
import { ScrollerOptions } from 'primeng/api';
import { DropdownChangeEvent, DropdownFilterEvent, DropdownFilterOptions, DropdownLazyLoadEvent } from './dropdown.interface';
import { Nullable } from 'primeng/ts-helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/overlay";
import * as i3 from "primeng/api";
import * as i4 from "primeng/tooltip";
import * as i5 from "primeng/ripple";
import * as i6 from "primeng/scroller";
import * as i7 from "primeng/autofocus";
import * as i8 from "primeng/icons/times";
import * as i9 from "primeng/icons/chevrondown";
import * as i10 from "primeng/icons/search";
export declare const DROPDOWN_VALUE_ACCESSOR: any;
export declare class DropdownItem {
    option: SelectItem | undefined;
    selected: boolean | undefined;
    label: string | undefined;
    disabled: boolean | undefined;
    visible: boolean | undefined;
    itemSize: number | undefined;
    template: TemplateRef<any> | undefined;
    onClick: EventEmitter<any>;
    onOptionClick(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownItem, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DropdownItem, "p-dropdownItem", never, { "option": { "alias": "option"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "label": { "alias": "label"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "visible": { "alias": "visible"; "required": false; }; "itemSize": { "alias": "itemSize"; "required": false; }; "template": { "alias": "template"; "required": false; }; }, { "onClick": "onClick"; }, never, never, false, never>;
}
/**
 * Dropdown also known as Select, is used to choose an item from a collection of options.
 * @group Components
 */
export declare class Dropdown implements OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, ControlValueAccessor {
    el: ElementRef;
    renderer: Renderer2;
    cd: ChangeDetectorRef;
    zone: NgZone;
    filterService: FilterService;
    config: PrimeNGConfig;
    /**
     * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    scrollHeight: string;
    /**
     * When specified, displays an input field to filter the items on keyup.
     * @group Props
     */
    filter: boolean | undefined;
    /**
     * Name of the input element.
     * @group Props
     */
    name: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    style: {
        [klass: string]: any;
    } | null | undefined;
    /**
     * Inline style of the overlay panel element.
     * @group Props
     */
    panelStyle: {
        [klass: string]: any;
    } | null | undefined;
    /**
     * Style class of the element.
     * @group Props
     */
    styleClass: string | undefined;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass: string | undefined;
    /**
     * When present, it specifies that the component cannot be edited.
     * @group Props
     */
    readonly: boolean | undefined;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    required: boolean | undefined;
    /**
     * When present, custom value instead of predefined options can be entered using the editable input field.
     * @group Props
     */
    editable: boolean | undefined;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex: number | undefined;
    /**
     * Default text to display when no option is selected.
     * @group Props
     */
    placeholder: string | undefined;
    /**
     * Placeholder text to show when filter input is empty.
     * @group Props
     */
    filterPlaceholder: string | undefined;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale: string | undefined;
    /**
     * Identifier of the accessible input element.
     * @group Props
     */
    inputId: string | undefined;
    /**
     * No description available.
     * @group Props
     */
    selectId: string | undefined;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey: string | undefined;
    /**
     * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
     * @group Props
     */
    filterBy: string | undefined;
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus: boolean | undefined;
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
     * Whether to display the first item as the label if no placeholder is defined and value is null.
     * @group Props
     */
    autoDisplayFirst: boolean;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group: boolean | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear: boolean | undefined;
    /**
     * Text to display when filtering does not return any results. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyFilterMessage: string;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage: string;
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
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy: string | undefined;
    /**
     * Defines how the items are filtered.
     * @group Props
     */
    filterMatchMode: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';
    /**
     * Maximum number of character allows in the editable input field.
     * @group Props
     */
    maxlength: number | undefined;
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
    overlayDirection: string;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    get disabled(): boolean | undefined;
    set disabled(_disabled: boolean | undefined);
    /**
     * Item size of item to be virtual scrolled.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    get itemSize(): number | undefined;
    set itemSize(val: number | undefined);
    _itemSize: number | undefined;
    /**
     * Whether to automatically manage layering.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get autoZIndex(): boolean | undefined;
    set autoZIndex(val: boolean | undefined);
    _autoZIndex: boolean | undefined;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get baseZIndex(): number | undefined;
    set baseZIndex(val: number | undefined);
    _baseZIndex: number | undefined;
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get showTransitionOptions(): string | undefined;
    set showTransitionOptions(val: string | undefined);
    _showTransitionOptions: string | undefined;
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated since v14.2.0, use overlayOptions property instead.
     */
    get hideTransitionOptions(): string | undefined;
    set hideTransitionOptions(val: string | undefined);
    _hideTransitionOptions: string | undefined;
    /**
     * When specified, filter displays with this value.
     * @group Props
     */
    get filterValue(): string | undefined | null;
    set filterValue(val: string | undefined | null);
    /**
     * An array of objects to display as the available options.
     * @group Props
     */
    get options(): any[] | undefined;
    set options(val: any[] | undefined);
    /**
     * Callback to invoke when value of dropdown changes.
     * @param {DropdownChangeEvent} event - custom change event.
     * @group Emits
     */
    onChange: EventEmitter<DropdownChangeEvent>;
    /**
     * Callback to invoke when data is filtered.
     * @param {DropdownFilterEvent} event - custom filter event.
     * @group Emits
     */
    onFilter: EventEmitter<DropdownFilterEvent>;
    /**
     * Callback to invoke when dropdown gets focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus: EventEmitter<Event>;
    /**
     * Callback to invoke when dropdown loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur: EventEmitter<Event>;
    /**
     * Callback to invoke when component is clicked.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onClick: EventEmitter<MouseEvent>;
    /**
     * Callback to invoke when dropdown overlay gets visible.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    onShow: EventEmitter<AnimationEvent>;
    /**
     * Callback to invoke when dropdown overlay gets hidden.
     * @param {AnimationEvent} event - Animation event.
     * @group Emits
     */
    onHide: EventEmitter<AnimationEvent>;
    /**
     * Callback to invoke when dropdown clears the value.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClear: EventEmitter<Event>;
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {DropdownLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad: EventEmitter<DropdownLazyLoadEvent>;
    containerViewChild: Nullable<ElementRef>;
    filterViewChild: Nullable<ElementRef>;
    accessibleViewChild: Nullable<ElementRef>;
    editableInputViewChild: Nullable<ElementRef>;
    itemsViewChild: Nullable<ElementRef>;
    scroller: Nullable<Scroller>;
    overlayViewChild: Nullable<Overlay>;
    templates: Nullable<QueryList<PrimeTemplate>>;
    _disabled: boolean | undefined;
    itemsWrapper: Nullable<HTMLDivElement>;
    itemTemplate: Nullable<TemplateRef<any>>;
    groupTemplate: Nullable<TemplateRef<any>>;
    loaderTemplate: Nullable<TemplateRef<any>>;
    selectedItemTemplate: Nullable<TemplateRef<any>>;
    headerTemplate: Nullable<TemplateRef<any>>;
    filterTemplate: Nullable<TemplateRef<any>>;
    footerTemplate: Nullable<TemplateRef<any>>;
    emptyFilterTemplate: Nullable<TemplateRef<any>>;
    emptyTemplate: Nullable<TemplateRef<any>>;
    dropdownIconTemplate: Nullable<TemplateRef<any>>;
    clearIconTemplate: Nullable<TemplateRef<any>>;
    filterIconTemplate: Nullable<TemplateRef<any>>;
    filterOptions: DropdownFilterOptions | undefined;
    selectedOption: any;
    _options: any[] | undefined;
    value: any;
    onModelChange: Function;
    onModelTouched: Function;
    optionsToDisplay: any[] | undefined;
    hover: Nullable<boolean>;
    focused: Nullable<boolean>;
    overlayVisible: Nullable<boolean>;
    optionsChanged: Nullable<boolean>;
    panel: Nullable<HTMLDivElement>;
    dimensionsUpdated: Nullable<boolean>;
    hoveredItem: any;
    selectedOptionUpdated: Nullable<boolean>;
    _filterValue: string | undefined | null;
    searchValue: Nullable<string>;
    searchIndex: Nullable<number>;
    searchTimeout: any;
    previousSearchChar: Nullable<string>;
    currentSearchChar: Nullable<string>;
    preventModelTouched: Nullable<boolean>;
    id: string;
    labelId: Nullable<string>;
    listId: Nullable<string>;
    constructor(el: ElementRef, renderer: Renderer2, cd: ChangeDetectorRef, zone: NgZone, filterService: FilterService, config: PrimeNGConfig);
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    get label(): string;
    get emptyMessageLabel(): string;
    get emptyFilterMessageLabel(): string;
    get filled(): boolean;
    get isVisibleClearIcon(): boolean | undefined;
    updateEditableLabel(): void;
    getOptionLabel(option: any): any;
    getOptionValue(option: any): any;
    isOptionDisabled(option: any): any;
    getOptionGroupLabel(optionGroup: any): any;
    getOptionGroupChildren(optionGroup: any): any;
    onItemClick(event: {
        originalEvent: Event;
        option: any;
    }): void;
    selectItem(event: Event, option: any): void;
    ngAfterViewChecked(): void;
    writeValue(value: any): void;
    /**
     * Callback to invoke on filter reset.
     * @group Method
     */
    resetFilter(): void;
    updateSelectedOption(val: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onMouseclick(event: MouseEvent): void;
    isInputClick(event: MouseEvent): boolean;
    isEmpty(): boolean;
    onEditableInputFocus(event: Event): void;
    onEditableInputChange(event: Event): void;
    /**
     * Displays the panel.
     * @group Method
     */
    show(): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    /**
     * Hides the panel.
     * @group Method
     */
    hide(): void;
    onInputFocus(event: Event): void;
    onInputBlur(event: Event): void;
    findPrevEnabledOption(index: number): any;
    findNextEnabledOption(index: number): any;
    onKeydown(event: KeyboardEvent, search: boolean): void;
    search(event: KeyboardEvent): void;
    searchOption(index: number): any;
    searchOptionInRange(start: number, end: number): any;
    searchOptionWithinGroup(index: any): any;
    findOptionIndex(val: any, opts: any[]): number;
    findOptionGroupIndex(val: any, opts: any[]): any;
    findOption(val: any, opts: any[], inGroup?: boolean): SelectItem;
    onFilterInputChange(event: Event | any): void;
    activateFilter(): void;
    applyFocus(): void;
    /**
     * Applies focus.
     * @group Method
     */
    focus(): void;
    clear(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Dropdown, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Dropdown, "p-dropdown", never, { "scrollHeight": { "alias": "scrollHeight"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "name": { "alias": "name"; "required": false; }; "style": { "alias": "style"; "required": false; }; "panelStyle": { "alias": "panelStyle"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; "panelStyleClass": { "alias": "panelStyleClass"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "required": { "alias": "required"; "required": false; }; "editable": { "alias": "editable"; "required": false; }; "appendTo": { "alias": "appendTo"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "filterPlaceholder": { "alias": "filterPlaceholder"; "required": false; }; "filterLocale": { "alias": "filterLocale"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; "selectId": { "alias": "selectId"; "required": false; }; "dataKey": { "alias": "dataKey"; "required": false; }; "filterBy": { "alias": "filterBy"; "required": false; }; "autofocus": { "alias": "autofocus"; "required": false; }; "resetFilterOnHide": { "alias": "resetFilterOnHide"; "required": false; }; "dropdownIcon": { "alias": "dropdownIcon"; "required": false; }; "optionLabel": { "alias": "optionLabel"; "required": false; }; "optionValue": { "alias": "optionValue"; "required": false; }; "optionDisabled": { "alias": "optionDisabled"; "required": false; }; "optionGroupLabel": { "alias": "optionGroupLabel"; "required": false; }; "optionGroupChildren": { "alias": "optionGroupChildren"; "required": false; }; "autoDisplayFirst": { "alias": "autoDisplayFirst"; "required": false; }; "group": { "alias": "group"; "required": false; }; "showClear": { "alias": "showClear"; "required": false; }; "emptyFilterMessage": { "alias": "emptyFilterMessage"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "lazy": { "alias": "lazy"; "required": false; }; "virtualScroll": { "alias": "virtualScroll"; "required": false; }; "virtualScrollItemSize": { "alias": "virtualScrollItemSize"; "required": false; }; "virtualScrollOptions": { "alias": "virtualScrollOptions"; "required": false; }; "overlayOptions": { "alias": "overlayOptions"; "required": false; }; "ariaFilterLabel": { "alias": "ariaFilterLabel"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "filterMatchMode": { "alias": "filterMatchMode"; "required": false; }; "maxlength": { "alias": "maxlength"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; "tooltipPositionStyle": { "alias": "tooltipPositionStyle"; "required": false; }; "tooltipStyleClass": { "alias": "tooltipStyleClass"; "required": false; }; "autofocusFilter": { "alias": "autofocusFilter"; "required": false; }; "overlayDirection": { "alias": "overlayDirection"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "itemSize": { "alias": "itemSize"; "required": false; }; "autoZIndex": { "alias": "autoZIndex"; "required": false; }; "baseZIndex": { "alias": "baseZIndex"; "required": false; }; "showTransitionOptions": { "alias": "showTransitionOptions"; "required": false; }; "hideTransitionOptions": { "alias": "hideTransitionOptions"; "required": false; }; "filterValue": { "alias": "filterValue"; "required": false; }; "options": { "alias": "options"; "required": false; }; }, { "onChange": "onChange"; "onFilter": "onFilter"; "onFocus": "onFocus"; "onBlur": "onBlur"; "onClick": "onClick"; "onShow": "onShow"; "onHide": "onHide"; "onClear": "onClear"; "onLazyLoad": "onLazyLoad"; }, ["templates"], never, false, never>;
}
export declare class DropdownModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DropdownModule, [typeof Dropdown, typeof DropdownItem], [typeof i1.CommonModule, typeof i2.OverlayModule, typeof i3.SharedModule, typeof i4.TooltipModule, typeof i5.RippleModule, typeof i6.ScrollerModule, typeof i7.AutoFocusModule, typeof i8.TimesIcon, typeof i9.ChevronDownIcon, typeof i10.SearchIcon], [typeof Dropdown, typeof i2.OverlayModule, typeof i3.SharedModule, typeof i6.ScrollerModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DropdownModule>;
}
