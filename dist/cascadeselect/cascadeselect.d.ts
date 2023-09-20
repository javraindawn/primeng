import { AnimationEvent } from '@angular/animations';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnInit, QueryList, TemplateRef } from '@angular/core';
import { OverlayOptions, OverlayService, PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { Overlay } from 'primeng/overlay';
import { CascadeSelectBeforeHideEvent, CascadeSelectBeforeShowEvent, CascadeSelectHideEvent, CascadeSelectShowEvent } from './cascadeselect.interface';
import { Nullable } from 'primeng/ts-helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/overlay";
import * as i3 from "primeng/api";
import * as i4 from "primeng/ripple";
import * as i5 from "primeng/icons/chevrondown";
import * as i6 from "primeng/icons/angleright";
import * as i7 from "primeng/icons/times";
export declare const CASCADESELECT_VALUE_ACCESSOR: any;
export declare class CascadeSelectSub implements OnInit {
    private el;
    selectionPath: string[] | string | undefined | null;
    options: string[] | string | undefined | null;
    optionGroupChildren: string[] | string | undefined | null;
    optionTemplate: Nullable<TemplateRef<any>>;
    groupIconTemplate: Nullable<TemplateRef<any>>;
    level: number;
    optionLabel: string | undefined;
    optionValue: string | undefined;
    optionGroupLabel: string | undefined;
    dirty: boolean | undefined;
    root: boolean | undefined;
    onSelect: EventEmitter<any>;
    onGroupSelect: EventEmitter<any>;
    get parentActive(): boolean;
    set parentActive(val: boolean);
    activeOption: any;
    _parentActive: boolean;
    cascadeSelect: CascadeSelect;
    constructor(cascadeSelect: CascadeSelect, el: ElementRef);
    ngOnInit(): void;
    onOptionClick(event: Event, option: string | string[]): void;
    onOptionSelect(event: Event): void;
    onOptionGroupSelect(event: Event): void;
    getOptionLabel(option: string | string[]): any;
    getOptionValue(option: string | string[]): any;
    getOptionGroupLabel(optionGroup: string | string[]): any;
    getOptionGroupChildren(optionGroup: string | string[]): any;
    isOptionGroup(option: string | string[]): any;
    getOptionLabelToRender(option: string | string[]): any;
    getItemClass(option: string | string[]): {
        'p-cascadeselect-item': boolean;
        'p-cascadeselect-item-group': any;
        'p-cascadeselect-item-active p-highlight': boolean;
    };
    isOptionActive(option: string | string[]): boolean;
    onKeyDown(event: any, option: string | string[], index: number): void;
    position(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CascadeSelectSub, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CascadeSelectSub, "p-cascadeSelectSub", never, { "selectionPath": { "alias": "selectionPath"; "required": false; }; "options": { "alias": "options"; "required": false; }; "optionGroupChildren": { "alias": "optionGroupChildren"; "required": false; }; "optionTemplate": { "alias": "optionTemplate"; "required": false; }; "groupIconTemplate": { "alias": "groupIconTemplate"; "required": false; }; "level": { "alias": "level"; "required": false; }; "optionLabel": { "alias": "optionLabel"; "required": false; }; "optionValue": { "alias": "optionValue"; "required": false; }; "optionGroupLabel": { "alias": "optionGroupLabel"; "required": false; }; "dirty": { "alias": "dirty"; "required": false; }; "root": { "alias": "root"; "required": false; }; "parentActive": { "alias": "parentActive"; "required": false; }; }, { "onSelect": "onSelect"; "onGroupSelect": "onGroupSelect"; }, never, never, false, never>;
}
/**
 * CascadeSelect is a form component to select a value from a nested structure of options.
 * @group Components
 */
export declare class CascadeSelect implements OnInit, AfterContentInit {
    private el;
    private cd;
    private config;
    overlayService: OverlayService;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass: string | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    style: {
        [klass: string]: any;
    } | null | undefined;
    /**
     * An array of selectitems to display as the available options.
     * @group Props
     */
    options: string[] | string | undefined;
    /**
     * Property name or getter function to use as the label of an option.
     * @group Props
     */
    optionLabel: string | undefined;
    /**
     * Property name or getter function to use as the value of an option, defaults to the option itself when not defined.
     * @group Props
     */
    optionValue: string | undefined;
    /**
     * Property name or getter function to use as the label of an option group.
     * @group Props
     */
    optionGroupLabel: string | string[] | undefined;
    /**
     * Property name or getter function to retrieve the items of a group.
     * @group Props
     */
    optionGroupChildren: string | string[] | undefined;
    /**
     * Default text to display when no option is selected.
     * @group Props
     */
    placeholder: string | undefined;
    /**
     * No description available.
     * @group Props
     */
    value: string | undefined | null;
    /**
     * A property to uniquely identify an option.
     * @group Props
     */
    dataKey: string | undefined;
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    inputId: string | undefined;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy: string | undefined;
    /**
     * Label of the input for accessibility.
     * @group Props
     */
    inputLabel: string | undefined;
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel: string | undefined;
    /**
     * Id of the element or "body" for document where the overlay should be appended to.
     * @group Props
     */
    appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled: boolean | undefined;
    /**
     * No description available.
     * @group Props
     */
    rounded: boolean | undefined;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear: boolean;
    /**
     * Style class of the overlay panel.
     * @group Props
     */
    panelStyleClass: string | undefined;
    /**
     * Inline style of the overlay panel.
     * @group Props
     */
    panelStyle: {
        [klass: string]: any;
    } | null | undefined;
    /**
     * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
     * @group Props
     */
    overlayOptions: OverlayOptions | undefined;
    /**
     * Callback to invoke on value change.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onChange: EventEmitter<Event>;
    /**
     * Callback to invoke when a group changes.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onGroupChange: EventEmitter<Event>;
    /**
     * Callback to invoke when the overlay is shown.
     * @param {CascadeSelectShowEvent} event - Custom overlay show event.
     * @group Emits
     */
    onShow: EventEmitter<CascadeSelectShowEvent>;
    /**
     * Callback to invoke when the overlay is hidden.
     * @param {CascadeSelectHideEvent} event - Custom overlay hide event.
     * @group Emits
     */
    onHide: EventEmitter<CascadeSelectHideEvent>;
    /**
     * Callback to invoke when the clear token is clicked.
     * @group Emits
     */
    onClear: EventEmitter<any>;
    /**
     * Callback to invoke before overlay is shown.
     * @param {CascadeSelectBeforeShowEvent} event - Custom overlay show event.
     * @group Emits
     */
    onBeforeShow: EventEmitter<CascadeSelectBeforeShowEvent>;
    /**
     * Callback to invoke before overlay is hidden.
     * @param {CascadeSelectBeforeHideEvent} event - Custom overlay hide event.
     * @group Emits
     */
    onBeforeHide: EventEmitter<CascadeSelectBeforeHideEvent>;
    /**
     * Transition options of the show animation.
     * @group Props
     * @deprecated deprecated since v14.2.0, use overlayOptions property instead.
     */
    get showTransitionOptions(): string;
    set showTransitionOptions(val: string);
    /**
     * Transition options of the hide animation.
     * @group Props
     * @deprecated deprecated since v14.2.0, use overlayOptions property instead.
     */
    get hideTransitionOptions(): string;
    set hideTransitionOptions(val: string);
    focusInputEl: Nullable<ElementRef>;
    containerEl: Nullable<ElementRef>;
    panelEl: Nullable<ElementRef>;
    overlayViewChild: Nullable<Overlay>;
    templates: QueryList<PrimeTemplate>;
    _showTransitionOptions: string;
    _hideTransitionOptions: string;
    selectionPath: any;
    focused: boolean;
    filled: boolean;
    overlayVisible: boolean;
    dirty: boolean;
    valueTemplate: Nullable<TemplateRef<any>>;
    optionTemplate: Nullable<TemplateRef<any>>;
    triggerIconTemplate: Nullable<TemplateRef<any>>;
    groupIconTemplate: Nullable<TemplateRef<any>>;
    clearIconTemplate: Nullable<TemplateRef<any>>;
    onModelChange: Function;
    onModelTouched: Function;
    constructor(el: ElementRef, cd: ChangeDetectorRef, config: PrimeNGConfig, overlayService: OverlayService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    onOptionSelect(event: any): void;
    onOptionGroupSelect(event: Event): void;
    getOptionLabel(option: string | object): any;
    getOptionValue(option: string | object): any;
    getOptionGroupChildren(optionGroup: string | object, level: number): any;
    isOptionGroup(option: string | object, level: number): any;
    updateSelectionPath(): void;
    updateFilledState(): void;
    findModelOptionInGroup(option: string | object, level: number): Nullable<object[] | any>;
    show(): void;
    hide(): void;
    clear(event: Event): void;
    onClick(event: Event): void;
    onFocus(): void;
    onBlur(): void;
    onOverlayAnimationDone(event: AnimationEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    label(): any;
    onKeyDown(event: any): void;
    containerClass(): {
        'p-cascadeselect p-component p-inputwrapper': boolean;
        'p-disabled': boolean;
        'p-focus': boolean;
    };
    labelClass(): {
        'p-cascadeselect-label': boolean;
        'p-inputtext': boolean;
        'p-placeholder': boolean;
        'p-cascadeselect-label-empty': boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<CascadeSelect, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CascadeSelect, "p-cascadeSelect", never, { "styleClass": { "alias": "styleClass"; "required": false; }; "style": { "alias": "style"; "required": false; }; "options": { "alias": "options"; "required": false; }; "optionLabel": { "alias": "optionLabel"; "required": false; }; "optionValue": { "alias": "optionValue"; "required": false; }; "optionGroupLabel": { "alias": "optionGroupLabel"; "required": false; }; "optionGroupChildren": { "alias": "optionGroupChildren"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "dataKey": { "alias": "dataKey"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "inputLabel": { "alias": "inputLabel"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "appendTo": { "alias": "appendTo"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "rounded": { "alias": "rounded"; "required": false; }; "showClear": { "alias": "showClear"; "required": false; }; "panelStyleClass": { "alias": "panelStyleClass"; "required": false; }; "panelStyle": { "alias": "panelStyle"; "required": false; }; "overlayOptions": { "alias": "overlayOptions"; "required": false; }; "showTransitionOptions": { "alias": "showTransitionOptions"; "required": false; }; "hideTransitionOptions": { "alias": "hideTransitionOptions"; "required": false; }; }, { "onChange": "onChange"; "onGroupChange": "onGroupChange"; "onShow": "onShow"; "onHide": "onHide"; "onClear": "onClear"; "onBeforeShow": "onBeforeShow"; "onBeforeHide": "onBeforeHide"; }, ["templates"], never, false, never>;
}
export declare class CascadeSelectModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CascadeSelectModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CascadeSelectModule, [typeof CascadeSelect, typeof CascadeSelectSub], [typeof i1.CommonModule, typeof i2.OverlayModule, typeof i3.SharedModule, typeof i4.RippleModule, typeof i5.ChevronDownIcon, typeof i6.AngleRightIcon, typeof i7.TimesIcon], [typeof CascadeSelect, typeof i2.OverlayModule, typeof CascadeSelectSub, typeof i3.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CascadeSelectModule>;
}
