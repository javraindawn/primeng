import * as i2 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, Input, Output, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from 'primeng/api';
import { TranslationKeys, PrimeTemplate, SharedModule } from 'primeng/api';
import * as i7 from 'primeng/autofocus';
import { AutoFocusModule } from 'primeng/autofocus';
import * as i4 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { InputTextModule } from 'primeng/inputtext';
import * as i3 from 'primeng/overlay';
import { OverlayModule } from 'primeng/overlay';
import * as i5 from 'primeng/ripple';
import { RippleModule } from 'primeng/ripple';
import * as i6 from 'primeng/scroller';
import { ScrollerModule } from 'primeng/scroller';
import { UniqueComponentId, ObjectUtils } from 'primeng/utils';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { TimesIcon } from 'primeng/icons/times';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';

const AUTOCOMPLETE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoComplete),
    multi: true
};
/**
 * AutoComplete is an input component that provides real-time suggestions when being typed.
 * @group Components
 */
class AutoComplete {
    document;
    el;
    renderer;
    cd;
    differs;
    config;
    overlayService;
    zone;
    /**
     * Minimum number of characters to initiate a search.
     * @group Props
     */
    minLength = 1;
    /**
     * Delay between keystrokes to wait before sending a query.
     * @group Props
     */
    delay = 300;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Inline style of the overlay panel element.
     * @group Props
     */
    panelStyle;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Style class of the overlay panel element.
     * @group Props
     */
    panelStyleClass;
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyle;
    /**
     * Identifier of the focus input to match a label defined for the component.
     * @group Props
     */
    inputId;
    /**
     * Inline style of the input field.
     * @group Props
     */
    inputStyleClass;
    /**
     * Hint text for the input field.
     * @group Props
     */
    placeholder;
    /**
     * When present, it specifies that the input cannot be typed.
     * @group Props
     */
    readonly;
    /**
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled;
    /**
     * Maximum height of the suggestions panel.
     * @group Props
     */
    scrollHeight = '200px';
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = false;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll;
    /**
     * Height of an item in the list for VirtualScrolling.
     * @group Props
     */
    virtualScrollItemSize;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions;
    /**
     * Maximum number of character allows in the input field.
     * @group Props
     */
    maxlength;
    /**
     * Name of the input element.
     * @group Props
     */
    name;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @group Props
     */
    required;
    /**
     * Size of the input field.
     * @group Props
     */
    size;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    appendTo;
    /**
     * When enabled, highlights the first item in the list by default.
     * @group Props
     */
    autoHighlight;
    /**
     * When present, autocomplete clears the manual input if it does not match of the suggestions to force only accepting values from the suggestions.
     * @group Props
     */
    forceSelection;
    /**
     * Type of the input, defaults to "text".
     * @group Props
     */
    type = 'text';
    /* @deprecated */
    _autoZIndex;
    get autoZIndex() {
        return this._autoZIndex;
    }
    set autoZIndex(val) {
        this._autoZIndex = val;
        console.warn('The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /* @deprecated */
    _baseZIndex;
    get baseZIndex() {
        return this._baseZIndex;
    }
    set baseZIndex(val) {
        this._baseZIndex = val;
        console.warn('The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.');
    }
    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel;
    /**
     * Defines a string that labels the dropdown button for accessibility.
     * @group Props
     */
    dropdownAriaLabel;
    /**
     * Specifies one or more IDs in the DOM that labels the input field.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Icon class of the dropdown icon.
     * @group Props
     */
    dropdownIcon;
    /**
     * Ensures uniqueness of selected items on multiple mode.
     * @group Props
     */
    unique = true;
    /**
     * Whether to display options as grouped when nested options are provided.
     * @group Props
     */
    group;
    /**
     * Whether to run a query when input receives focus.
     * @group Props
     */
    completeOnFocus = false;
    /**
     * When enabled, a clear icon is displayed to clear the value.
     * @group Props
     */
    showClear = false;
    /**
     * Field of a suggested object to resolve and display.
     * @group Props
     */
    field;
    /**
     * Displays a button next to the input field when enabled.
     * @group Props
     */
    dropdown;
    /**
     * Whether to show the empty message or not.
     * @group Props
     */
    showEmptyMessage;
    /**
     * Specifies the behavior dropdown button. Default "blank" mode sends an empty string and "current" mode sends the input value.
     * @group Props
     */
    dropdownMode = 'blank';
    /**
     * Specifies if multiple values can be selected.
     * @group Props
     */
    multiple;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex;
    /**
     * A property to uniquely identify a value in options.
     * @group Props
     */
    dataKey;
    /**
     * Text to display when there is no data. Defaults to global value in i18n translation configuration.
     * @group Props
     */
    emptyMessage;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '.1s linear';
    /**
     * When present, it specifies that the component should automatically get focus on load.
     * @group Props
     */
    autofocus;
    /**
     * Used to define a string that autocomplete attribute the current element.
     * @group Props
     */
    autocomplete = 'off';
    /**
     * Name of the options field of an option group.
     * @group Props
     */
    optionGroupChildren;
    /**
     * Name of the label field of an option group.
     * @group Props
     */
    optionGroupLabel;
    /**
     * Options for the overlay element.
     * @group Props
     */
    overlayOptions;
    /**
     * An array of suggestions to display.
     * @group Props
     */
    get suggestions() {
        return this._suggestions;
    }
    set suggestions(value) {
        this._suggestions = value;
        this.handleSuggestionsChange();
    }
    /**
     * Element dimensions of option for virtual scrolling.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    get itemSize() {
        return this._itemSize;
    }
    set itemSize(val) {
        this._itemSize = val;
        console.warn('The itemSize property is deprecated, use virtualScrollItemSize property instead.');
    }
    /**
     * Callback to invoke to search for suggestions.
     * @param {AutoCompleteCompleteEvent} event - Custom complete event.
     * @group Emits
     */
    completeMethod = new EventEmitter();
    /**
     * Callback to invoke when a suggestion is selected.
     * @param {*} value - selected value.
     * @group Emits
     */
    onSelect = new EventEmitter();
    /**
     * Callback to invoke when a selected value is removed.
     * @param {*} value - removed value.
     * @group Emits
     */
    onUnselect = new EventEmitter();
    /**
     * Callback to invoke when the component receives focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onFocus = new EventEmitter();
    /**
     * Callback to invoke when the component loses focus.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onBlur = new EventEmitter();
    /**
     * Callback to invoke to when dropdown button is clicked.
     * @param {AutoCompleteDropdownClickEvent} event - custom dropdown click event.
     * @group Emits
     */
    onDropdownClick = new EventEmitter();
    /**
     * Callback to invoke when clear button is clicked.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke on input key up.
     * @param {KeyboardEvent} event - Keyboard event.
     * @group Emits
     */
    onKeyUp = new EventEmitter();
    /**
     * Callback to invoke on overlay is shown.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onShow = new EventEmitter();
    /**
     * Callback to invoke on overlay is hidden.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onHide = new EventEmitter();
    /**
     * Callback to invoke on lazy load data.
     * @param {AutoCompleteLazyLoadEvent} event - Lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    containerEL;
    inputEL;
    multiInputEl;
    multiContainerEL;
    dropdownButton;
    itemsViewChild;
    scroller;
    overlayViewChild;
    templates;
    _itemSize;
    itemsWrapper;
    itemTemplate;
    emptyTemplate;
    headerTemplate;
    footerTemplate;
    selectedItemTemplate;
    groupTemplate;
    loaderTemplate;
    removeIconTemplate;
    loadingIconTemplate;
    clearIconTemplate;
    dropdownIconTemplate;
    value;
    _suggestions;
    onModelChange = () => { };
    onModelTouched = () => { };
    timeout;
    overlayVisible = false;
    suggestionsUpdated;
    highlightOption;
    highlightOptionChanged;
    focus = false;
    filled;
    inputClick;
    inputKeyDown;
    noResults;
    differ;
    inputFieldValue = null;
    loading;
    scrollHandler;
    documentResizeListener;
    forceSelectionUpdateModelTimeout;
    listId;
    itemClicked;
    inputValue = null;
    isSearching = false;
    constructor(document, el, renderer, cd, differs, config, overlayService, zone) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.differs = differs;
        this.config = config;
        this.overlayService = overlayService;
        this.zone = zone;
        this.differ = differs.find([]).create(undefined);
        this.listId = UniqueComponentId() + '_list';
    }
    ngAfterViewChecked() {
        //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
        if (this.suggestionsUpdated && this.overlayViewChild) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (this.overlayViewChild) {
                        this.overlayViewChild.alignOverlay();
                    }
                }, 1);
                this.suggestionsUpdated = false;
            });
        }
        if (this.highlightOptionChanged) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    if (this.overlayViewChild && this.itemsWrapper) {
                        let listItem = DomHandler.findSingle(this.overlayViewChild.overlayViewChild.nativeElement, 'li.p-highlight');
                        if (listItem) {
                            DomHandler.scrollInView(this.itemsWrapper, listItem);
                        }
                    }
                }, 1);
                this.highlightOptionChanged = false;
            });
        }
    }
    handleSuggestionsChange() {
        if (this._suggestions != null && this.loading) {
            this.highlightOption = null;
            if (this._suggestions.length) {
                this.noResults = false;
                this.show();
                this.suggestionsUpdated = true;
                if (this.autoHighlight) {
                    this.highlightOption = this._suggestions[0];
                }
            }
            else {
                this.noResults = true;
                if (this.showEmptyMessage) {
                    this.show();
                    this.suggestionsUpdated = true;
                }
                else {
                    this.hide();
                }
            }
            this.loading = false;
            this.isSearching = false;
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'group':
                    this.groupTemplate = item.template;
                    break;
                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'empty':
                    this.emptyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'removetokenicon':
                    this.removeIconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'clearicon':
                    this.clearIconTemplate = item.template;
                    break;
                case 'dropdownicon':
                    this.dropdownIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    writeValue(value) {
        this.value = value;
        this.filled = this.value && this.value.length ? true : false;
        this.updateInputField();
        this.cd.markForCheck();
    }
    getOptionGroupChildren(optionGroup) {
        return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
    }
    getOptionGroupLabel(optionGroup) {
        return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup.label != undefined ? optionGroup.label : optionGroup;
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
    onInput(event) {
        // When an input element with a placeholder is clicked, the onInput event is invoked in IE.
        if (!this.inputKeyDown && DomHandler.isIE()) {
            return;
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        let value = event.target.value;
        this.inputValue = value;
        if (!this.multiple && !this.forceSelection) {
            this.onModelChange(value);
        }
        if (value.length === 0 && !this.multiple) {
            this.value = null;
            this.hide();
            this.onClear.emit(event);
            this.onModelChange(value);
        }
        if (value.length >= this.minLength) {
            this.timeout = setTimeout(() => {
                this.search(event, value);
            }, this.delay);
        }
        else {
            this.hide();
        }
        this.updateFilledState();
        this.inputKeyDown = false;
    }
    onInputClick(event) {
        this.inputClick = true;
    }
    search(event, query) {
        if (!this.isSearching) {
            this.isSearching = true;
            this.loading = true;
            this.completeMethod.emit({
                originalEvent: event,
                query: query
            });
            setTimeout(() => {
                this.isSearching = false;
            }, 100);
        }
    }
    selectItem(option, focus = true) {
        if (this.forceSelectionUpdateModelTimeout) {
            clearTimeout(this.forceSelectionUpdateModelTimeout);
            this.forceSelectionUpdateModelTimeout = null;
        }
        if (this.multiple) {
            this.multiInputEl.nativeElement.value = '';
            this.value = this.value || [];
            if (!this.isSelected(option) || !this.unique) {
                this.value = [...this.value, option];
                this.onModelChange(this.value);
            }
        }
        else {
            this.inputEL.nativeElement.value = this.resolveFieldData(option);
            this.value = option;
            this.onModelChange(this.value);
        }
        this.onSelect.emit(option);
        this.updateFilledState();
        if (focus) {
            this.itemClicked = true;
            this.focusInput();
        }
        this.hide();
    }
    show(event) {
        if (this.multiInputEl || this.inputEL) {
            let hasFocus = this.multiple ? this.multiInputEl?.nativeElement.ownerDocument.activeElement == this.multiInputEl?.nativeElement : this.inputEL?.nativeElement.ownerDocument.activeElement == this.inputEL?.nativeElement;
            if (!this.overlayVisible && hasFocus) {
                this.overlayVisible = true;
            }
        }
        this.onShow.emit(event);
        this.cd.markForCheck();
    }
    clear() {
        this.value = null;
        this.inputValue = null;
        if (this.multiple) {
            this.multiInputEl.nativeElement.value = '';
        }
        else {
            this.inputValue = null;
            this.inputEL.nativeElement.value = '';
        }
        this.updateFilledState();
        this.onModelChange(this.value);
        this.onClear.emit();
    }
    onOverlayAnimationStart(event) {
        if (event.toState === 'visible') {
            this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild.overlayViewChild?.nativeElement, this.virtualScroll ? '.p-scroller' : '.p-autocomplete-panel');
            this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
        }
    }
    resolveFieldData(value) {
        let data = this.field ? ObjectUtils.resolveFieldData(value, this.field) : value;
        return data !== (null || undefined) ? data : '';
    }
    hide(event) {
        this.overlayVisible = false;
        this.onHide.emit(event);
        this.cd.markForCheck();
    }
    handleDropdownClick(event) {
        if (!this.overlayVisible) {
            this.focusInput();
            let queryValue = this.multiple ? this.multiInputEl.nativeElement.value : this.inputEL.nativeElement.value;
            if (this.dropdownMode === 'blank') {
                this.onDropdownClick.emit({
                    originalEvent: event,
                    query: ''
                });
                this.search(event, '');
            }
            else if (this.dropdownMode === 'current') {
                this.onDropdownClick.emit({
                    originalEvent: event,
                    query: queryValue
                });
                this.search(event, queryValue);
            }
        }
        else {
            this.hide(event);
        }
    }
    focusInput() {
        if (this.multiple)
            this.multiInputEl.nativeElement.focus();
        else
            this.inputEL?.nativeElement.focus();
    }
    get emptyMessageLabel() {
        return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
    }
    removeItem(item) {
        let itemIndex = DomHandler.index(item);
        let removedValue = this.value[itemIndex];
        this.value = this.value.filter((val, i) => i != itemIndex);
        this.onModelChange(this.value);
        this.updateFilledState();
        this.onUnselect.emit(removedValue);
    }
    onKeydown(event) {
        if (this.overlayVisible) {
            switch (event.which) {
                //down
                case 40:
                    if (this.group) {
                        let highlightItemIndex = this.findOptionGroupIndex(this.highlightOption, this.suggestions);
                        if (highlightItemIndex !== -1) {
                            let nextItemIndex = highlightItemIndex.itemIndex + 1;
                            if (nextItemIndex < this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex]).length) {
                                this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex])[nextItemIndex];
                                this.highlightOptionChanged = true;
                            }
                            else if (this.suggestions[highlightItemIndex.groupIndex + 1]) {
                                this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex + 1])[0];
                                this.highlightOptionChanged = true;
                            }
                        }
                        else {
                            this.highlightOption = this.getOptionGroupChildren(this.suggestions[0])[0];
                        }
                    }
                    else {
                        let highlightItemIndex = this.findOptionIndex(this.highlightOption, this.suggestions);
                        if (highlightItemIndex != -1) {
                            var nextItemIndex = highlightItemIndex + 1;
                            if (nextItemIndex != this.suggestions.length) {
                                this.highlightOption = this.suggestions[nextItemIndex];
                                this.highlightOptionChanged = true;
                            }
                        }
                        else {
                            this.highlightOption = this.suggestions[0];
                        }
                    }
                    event.preventDefault();
                    break;
                //up
                case 38:
                    if (this.group) {
                        let highlightItemIndex = this.findOptionGroupIndex(this.highlightOption, this.suggestions);
                        if (highlightItemIndex !== -1) {
                            let prevItemIndex = highlightItemIndex.itemIndex - 1;
                            if (prevItemIndex >= 0) {
                                this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex])[prevItemIndex];
                                this.highlightOptionChanged = true;
                            }
                            else if (prevItemIndex < 0) {
                                let prevGroup = this.suggestions[highlightItemIndex.groupIndex - 1];
                                if (prevGroup) {
                                    this.highlightOption = this.getOptionGroupChildren(prevGroup)[this.getOptionGroupChildren(prevGroup).length - 1];
                                    this.highlightOptionChanged = true;
                                }
                            }
                        }
                    }
                    else {
                        let highlightItemIndex = this.findOptionIndex(this.highlightOption, this.suggestions);
                        if (highlightItemIndex > 0) {
                            let prevItemIndex = highlightItemIndex - 1;
                            this.highlightOption = this.suggestions[prevItemIndex];
                            this.highlightOptionChanged = true;
                        }
                    }
                    event.preventDefault();
                    break;
                //enter
                case 13:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                        this.hide();
                    }
                    event.preventDefault();
                    break;
                //escape
                case 27:
                    this.hide();
                    event.preventDefault();
                    break;
                //tab
                case 9:
                    if (this.highlightOption) {
                        this.selectItem(this.highlightOption);
                    }
                    this.hide();
                    break;
            }
        }
        else {
            if (event.which === 40 && this.suggestions) {
                this.search(event, event.target.value);
            }
            else if (event.ctrlKey && event.key === 'z' && !this.multiple) {
                this.inputEL.nativeElement.value = this.resolveFieldData(null);
                this.value = '';
                this.onModelChange(this.value);
            }
            else if (event.ctrlKey && event.key === 'z' && this.multiple) {
                this.value.pop();
                this.onModelChange(this.value);
                this.updateFilledState();
            }
        }
        if (this.multiple) {
            switch (event.which) {
                //backspace
                case 8:
                    if (this.value && this.value.length && !this.multiInputEl?.nativeElement.value) {
                        this.value = [...this.value];
                        const removedValue = this.value.pop();
                        this.onModelChange(this.value);
                        this.updateFilledState();
                        this.onUnselect.emit(removedValue);
                    }
                    break;
            }
        }
        this.inputKeyDown = true;
    }
    onKeyup(event) {
        this.onKeyUp.emit(event);
    }
    onInputFocus(event) {
        if (!this.itemClicked && this.completeOnFocus) {
            let queryValue = this.multiple ? this.multiInputEl?.nativeElement.value : this.inputEL?.nativeElement.value;
            this.search(event, queryValue);
        }
        this.focus = true;
        this.onFocus.emit(event);
        this.itemClicked = false;
    }
    onInputBlur(event) {
        this.focus = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    onInputChange(event) {
        if (this.forceSelection) {
            let valid = false;
            const target = event.target;
            let inputValue = target.value.trim();
            if (this.suggestions) {
                let suggestions = [...this.suggestions];
                if (this.group) {
                    let groupedSuggestions = this.suggestions.filter((s) => s[this.optionGroupChildren]).flatMap((s) => s[this.optionGroupChildren]);
                    suggestions = suggestions.concat(groupedSuggestions);
                }
                for (let suggestion of suggestions) {
                    let itemValue = this.field ? ObjectUtils.resolveFieldData(suggestion, this.field) : suggestion;
                    if (itemValue && inputValue.toLowerCase() === itemValue.toLowerCase().trim()) {
                        valid = true;
                        this.forceSelectionUpdateModelTimeout = setTimeout(() => {
                            this.selectItem(suggestion, false);
                        }, 250);
                        break;
                    }
                }
            }
            if (!valid) {
                if (this.multiple) {
                    this.multiInputEl.nativeElement.value = '';
                }
                else {
                    this.value = null;
                    this.inputEL.nativeElement.value = '';
                }
                this.onClear.emit(event);
                this.onModelChange(this.value);
                this.updateFilledState();
            }
        }
    }
    onInputPaste(event) {
        this.onKeydown(event);
    }
    isSelected(val) {
        let selected = false;
        if (this.value && this.value.length) {
            for (let i = 0; i < this.value.length; i++) {
                if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    }
    findOptionIndex(option, suggestions) {
        let index = -1;
        if (suggestions) {
            for (let i = 0; i < suggestions.length; i++) {
                if (ObjectUtils.equals(option, suggestions[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    findOptionGroupIndex(val, opts) {
        let groupIndex, itemIndex;
        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, this.getOptionGroupChildren(opts[i]));
                if (itemIndex !== -1) {
                    break;
                }
            }
        }
        if (itemIndex !== -1) {
            return { groupIndex: groupIndex, itemIndex: itemIndex };
        }
        else {
            return -1;
        }
    }
    updateFilledState() {
        if (this.multiple)
            this.filled = (this.value && this.value.length) || (this.multiInputEl && this.multiInputEl.nativeElement && this.multiInputEl.nativeElement.value != '');
        else
            this.filled = (this.inputFieldValue && this.inputFieldValue != '') || (this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '');
    }
    updateInputField() {
        let formattedValue = this.resolveFieldData(this.value);
        this.inputFieldValue = formattedValue;
        if (this.inputEL && this.inputEL.nativeElement) {
            this.inputEL.nativeElement.value = formattedValue;
        }
        this.updateFilledState();
    }
    ngOnDestroy() {
        if (this.forceSelectionUpdateModelTimeout) {
            clearTimeout(this.forceSelectionUpdateModelTimeout);
            this.forceSelectionUpdateModelTimeout = null;
        }
        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AutoComplete, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.IterableDiffers }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: AutoComplete, selector: "p-autoComplete", inputs: { minLength: "minLength", delay: "delay", style: "style", panelStyle: "panelStyle", styleClass: "styleClass", panelStyleClass: "panelStyleClass", inputStyle: "inputStyle", inputId: "inputId", inputStyleClass: "inputStyleClass", placeholder: "placeholder", readonly: "readonly", disabled: "disabled", scrollHeight: "scrollHeight", lazy: "lazy", virtualScroll: "virtualScroll", virtualScrollItemSize: "virtualScrollItemSize", virtualScrollOptions: "virtualScrollOptions", maxlength: "maxlength", name: "name", required: "required", size: "size", appendTo: "appendTo", autoHighlight: "autoHighlight", forceSelection: "forceSelection", type: "type", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", ariaLabel: "ariaLabel", dropdownAriaLabel: "dropdownAriaLabel", ariaLabelledBy: "ariaLabelledBy", dropdownIcon: "dropdownIcon", unique: "unique", group: "group", completeOnFocus: "completeOnFocus", showClear: "showClear", field: "field", dropdown: "dropdown", showEmptyMessage: "showEmptyMessage", dropdownMode: "dropdownMode", multiple: "multiple", tabindex: "tabindex", dataKey: "dataKey", emptyMessage: "emptyMessage", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", autofocus: "autofocus", autocomplete: "autocomplete", optionGroupChildren: "optionGroupChildren", optionGroupLabel: "optionGroupLabel", overlayOptions: "overlayOptions", suggestions: "suggestions", itemSize: "itemSize" }, outputs: { completeMethod: "completeMethod", onSelect: "onSelect", onUnselect: "onUnselect", onFocus: "onFocus", onBlur: "onBlur", onDropdownClick: "onDropdownClick", onClear: "onClear", onKeyUp: "onKeyUp", onShow: "onShow", onHide: "onHide", onLazyLoad: "onLazyLoad" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "((focus && !disabled) || autofocus) || overlayVisible", "class.p-autocomplete-clearable": "showClear && !disabled" }, classAttribute: "p-element p-inputwrapper" }, providers: [AUTOCOMPLETE_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerEL", first: true, predicate: ["container"], descendants: true }, { propertyName: "inputEL", first: true, predicate: ["in"], descendants: true }, { propertyName: "multiInputEl", first: true, predicate: ["multiIn"], descendants: true }, { propertyName: "multiContainerEL", first: true, predicate: ["multiContainer"], descendants: true }, { propertyName: "dropdownButton", first: true, predicate: ["ddBtn"], descendants: true }, { propertyName: "itemsViewChild", first: true, predicate: ["items"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }, { propertyName: "overlayViewChild", first: true, predicate: ["overlay"], descendants: true }], ngImport: i0, template: `
        <span #container [ngClass]="{ 'p-autocomplete p-component': true, 'p-autocomplete-dd': dropdown, 'p-autocomplete-multiple': multiple }" [ngStyle]="style" [class]="styleClass">
            <input
                pAutoFocus
                [autofocus]="autofocus"
                *ngIf="!multiple"
                #in
                [attr.type]="type"
                [attr.id]="inputId"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [autocomplete]="autocomplete"
                [attr.required]="required"
                [attr.name]="name"
                class="p-autocomplete-input p-inputtext p-component"
                [ngClass]="{ 'p-autocomplete-dd-input': dropdown, 'p-disabled': disabled }"
                [value]="inputFieldValue"
                aria-autocomplete="list"
                role="searchbox"
                (click)="onInputClick($event)"
                (input)="onInput($event)"
                (keydown)="onKeydown($event)"
                (keyup)="onKeyup($event)"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (change)="onInputChange($event)"
                (paste)="onInputPaste($event)"
                [attr.placeholder]="placeholder"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [readonly]="readonly"
                [disabled]="disabled"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-required]="required"
            />
            <ng-container *ngIf="filled && !disabled && showClear && !loading">
                <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-autocomplete-clear-icon'" (click)="clear()" />
                <span *ngIf="clearIconTemplate" class="p-autocomplete-clear-icon" (click)="clear()">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ul *ngIf="multiple" #multiContainer class="p-autocomplete-multiple-container p-component p-inputtext" [ngClass]="{ 'p-disabled': disabled, 'p-focus': focus }" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value" class="p-autocomplete-token">
                    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: { $implicit: val }"></ng-container>
                    <span *ngIf="!selectedItemTemplate" class="p-autocomplete-token-label">{{ resolveFieldData(val) }}</span>
                    <span class="p-autocomplete-token-icon" (click)="removeItem(token)">
                        <TimesCircleIcon [styleClass]="'p-autocomplete-token-icon'" *ngIf="!removeIconTemplate" />
                        <span *ngIf="removeIconTemplate" class="p-autocomplete-token-icon">
                            <ng-template *ngTemplateOutlet="removeIconTemplate"></ng-template>
                        </span>
                    </span>
                </li>
                <li class="p-autocomplete-input-token">
                    <input
                        pAutoFocus
                        [autofocus]="autofocus"
                        #multiIn
                        [attr.type]="type"
                        [attr.id]="inputId"
                        [disabled]="disabled"
                        [attr.placeholder]="value && value.length ? null : placeholder"
                        [attr.tabindex]="tabindex"
                        [attr.maxlength]="maxlength"
                        (input)="onInput($event)"
                        (click)="onInputClick($event)"
                        (keydown)="onKeydown($event)"
                        [readonly]="readonly"
                        (keyup)="onKeyup($event)"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        (change)="onInputChange($event)"
                        (paste)="onInputPaste($event)"
                        [autocomplete]="autocomplete"
                        [ngStyle]="inputStyle"
                        [class]="inputStyleClass"
                        [attr.aria-label]="ariaLabel"
                        [attr.aria-labelledby]="ariaLabelledBy"
                        [attr.aria-required]="required"
                        aria-autocomplete="list"
                        [attr.aria-controls]="listId"
                        role="searchbox"
                        [attr.aria-expanded]="overlayVisible"
                        aria-haspopup="true"
                        [attr.aria-activedescendant]="'p-highlighted-option'"
                    />
                </li>
            </ul>
            <ng-container *ngIf="loading">
                <SpinnerIcon *ngIf="!loadingIconTemplate" [styleClass]="'p-autocomplete-loader'" [spin]="true" />
                <span *ngIf="loadingIconTemplate" class="p-autocomplete-loader pi-spin ">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <button #ddBtn type="button" pButton [attr.aria-label]="dropdownAriaLabel" class="p-autocomplete-dropdown p-button-icon-only" [disabled]="disabled" pRipple (click)="handleDropdownClick($event)" *ngIf="dropdown" [attr.tabindex]="tabindex">
                <span *ngIf="dropdownIcon" [ngClass]="dropdownIcon"></span>
                <ng-container *ngIf="!dropdownIcon">
                    <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </ng-container>
            </button>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onShow)="show($event)"
                (onHide)="hide($event)"
            >
                <div [ngClass]="['p-autocomplete-panel p-component']" [style.max-height]="virtualScroll ? 'auto' : scrollHeight" [ngStyle]="panelStyle" [class]="panelStyleClass">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <p-scroller
                        *ngIf="virtualScroll"
                        #scroller
                        [items]="suggestions"
                        [style]="{ height: scrollHeight }"
                        [itemSize]="virtualScrollItemSize || _itemSize"
                        [autoSize]="true"
                        [lazy]="lazy"
                        (onLazyLoad)="onLazyLoad.emit($event)"
                        [options]="virtualScrollOptions"
                    >
                        <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                            <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                        </ng-template>
                        <ng-container *ngIf="loaderTemplate">
                            <ng-template pTemplate="loader" let-scrollerOptions="options">
                                <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                            </ng-template>
                        </ng-container>
                    </p-scroller>
                    <ng-container *ngIf="!virtualScroll">
                        <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: suggestions, options: {} }"></ng-container>
                    </ng-container>

                    <ng-template #buildInItems let-items let-scrollerOptions="options">
                        <ul #items role="listbox" [attr.id]="listId" class="p-autocomplete-items" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle">
                            <ng-container *ngIf="group">
                                <ng-template ngFor let-optgroup [ngForOf]="items">
                                    <li class="p-autocomplete-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(optgroup) || 'empty' }}</span>
                                        <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: optgroup }"></ng-container>
                                    </li>
                                    <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: getOptionGroupChildren(optgroup) }"></ng-container>
                                </ng-template>
                            </ng-container>
                            <ng-container *ngIf="!group">
                                <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: items }"></ng-container>
                            </ng-container>
                            <ng-template #itemslist let-suggestionsToDisplay>
                                <li
                                    role="option"
                                    *ngFor="let option of suggestionsToDisplay; let idx = index"
                                    class="p-autocomplete-item"
                                    pRipple
                                    [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }"
                                    [ngClass]="{ 'p-highlight': option === highlightOption }"
                                    [id]="highlightOption == option ? 'p-highlighted-option' : ''"
                                    (click)="selectItem(option)"
                                >
                                    <span *ngIf="!itemTemplate">{{ resolveFieldData(option) }}</span>
                                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: option, index: scrollerOptions.getOptions ? scrollerOptions.getOptions(idx) : idx }"></ng-container>
                                </li>
                            </ng-template>
                            <li *ngIf="noResults && showEmptyMessage" class="p-autocomplete-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                <ng-container *ngIf="!emptyTemplate; else empty">
                                    {{ emptyMessageLabel }}
                                </ng-container>
                                <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                            </li>
                        </ul>
                    </ng-template>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </p-overlay>
        </span>
    `, isInline: true, styles: [".p-autocomplete{display:inline-flex;position:relative}.p-autocomplete-loader{position:absolute;top:50%;margin-top:-.5rem}.p-autocomplete-dd .p-autocomplete-input{flex:1 1 auto;width:1%}.p-autocomplete-dd .p-autocomplete-input,.p-autocomplete-dd .p-autocomplete-multiple-container{border-top-right-radius:0;border-bottom-right-radius:0}.p-autocomplete-dd .p-autocomplete-dropdown{border-top-left-radius:0;border-bottom-left-radius:0}.p-autocomplete-panel{overflow:auto}.p-autocomplete-items{margin:0;padding:0;list-style-type:none}.p-autocomplete-item{cursor:pointer;white-space:nowrap;position:relative;overflow:hidden}.p-autocomplete-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-autocomplete-token{width:-moz-fit-content;width:fit-content;cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-autocomplete-token-icon{cursor:pointer}.p-autocomplete-input-token{flex:1 1 auto;display:inline-flex}.p-autocomplete-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-autocomplete{display:flex}.p-fluid .p-autocomplete-dd .p-autocomplete-input{width:1%}.p-autocomplete-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-autocomplete-clearable{position:relative}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(function () { return i3.Overlay; }), selector: "p-overlay", inputs: ["visible", "mode", "style", "styleClass", "contentStyle", "contentStyleClass", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "listener", "responsive", "options"], outputs: ["visibleChange", "onBeforeShow", "onShow", "onBeforeHide", "onHide", "onAnimationStart", "onAnimationDone"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.PrimeTemplate; }), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i4.ButtonDirective; }), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "directive", type: i0.forwardRef(function () { return i5.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return i6.Scroller; }), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "directive", type: i0.forwardRef(function () { return i7.AutoFocus; }), selector: "[pAutoFocus]", inputs: ["autofocus"] }, { kind: "component", type: i0.forwardRef(function () { return TimesCircleIcon; }), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(function () { return SpinnerIcon; }), selector: "SpinnerIcon" }, { kind: "component", type: i0.forwardRef(function () { return TimesIcon; }), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(function () { return ChevronDownIcon; }), selector: "ChevronDownIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AutoComplete, decorators: [{
            type: Component,
            args: [{ selector: 'p-autoComplete', template: `
        <span #container [ngClass]="{ 'p-autocomplete p-component': true, 'p-autocomplete-dd': dropdown, 'p-autocomplete-multiple': multiple }" [ngStyle]="style" [class]="styleClass">
            <input
                pAutoFocus
                [autofocus]="autofocus"
                *ngIf="!multiple"
                #in
                [attr.type]="type"
                [attr.id]="inputId"
                [ngStyle]="inputStyle"
                [class]="inputStyleClass"
                [autocomplete]="autocomplete"
                [attr.required]="required"
                [attr.name]="name"
                class="p-autocomplete-input p-inputtext p-component"
                [ngClass]="{ 'p-autocomplete-dd-input': dropdown, 'p-disabled': disabled }"
                [value]="inputFieldValue"
                aria-autocomplete="list"
                role="searchbox"
                (click)="onInputClick($event)"
                (input)="onInput($event)"
                (keydown)="onKeydown($event)"
                (keyup)="onKeyup($event)"
                (focus)="onInputFocus($event)"
                (blur)="onInputBlur($event)"
                (change)="onInputChange($event)"
                (paste)="onInputPaste($event)"
                [attr.placeholder]="placeholder"
                [attr.size]="size"
                [attr.maxlength]="maxlength"
                [attr.tabindex]="tabindex"
                [readonly]="readonly"
                [disabled]="disabled"
                [attr.aria-label]="ariaLabel"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-required]="required"
            />
            <ng-container *ngIf="filled && !disabled && showClear && !loading">
                <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-autocomplete-clear-icon'" (click)="clear()" />
                <span *ngIf="clearIconTemplate" class="p-autocomplete-clear-icon" (click)="clear()">
                    <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                </span>
            </ng-container>
            <ul *ngIf="multiple" #multiContainer class="p-autocomplete-multiple-container p-component p-inputtext" [ngClass]="{ 'p-disabled': disabled, 'p-focus': focus }" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value" class="p-autocomplete-token">
                    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: { $implicit: val }"></ng-container>
                    <span *ngIf="!selectedItemTemplate" class="p-autocomplete-token-label">{{ resolveFieldData(val) }}</span>
                    <span class="p-autocomplete-token-icon" (click)="removeItem(token)">
                        <TimesCircleIcon [styleClass]="'p-autocomplete-token-icon'" *ngIf="!removeIconTemplate" />
                        <span *ngIf="removeIconTemplate" class="p-autocomplete-token-icon">
                            <ng-template *ngTemplateOutlet="removeIconTemplate"></ng-template>
                        </span>
                    </span>
                </li>
                <li class="p-autocomplete-input-token">
                    <input
                        pAutoFocus
                        [autofocus]="autofocus"
                        #multiIn
                        [attr.type]="type"
                        [attr.id]="inputId"
                        [disabled]="disabled"
                        [attr.placeholder]="value && value.length ? null : placeholder"
                        [attr.tabindex]="tabindex"
                        [attr.maxlength]="maxlength"
                        (input)="onInput($event)"
                        (click)="onInputClick($event)"
                        (keydown)="onKeydown($event)"
                        [readonly]="readonly"
                        (keyup)="onKeyup($event)"
                        (focus)="onInputFocus($event)"
                        (blur)="onInputBlur($event)"
                        (change)="onInputChange($event)"
                        (paste)="onInputPaste($event)"
                        [autocomplete]="autocomplete"
                        [ngStyle]="inputStyle"
                        [class]="inputStyleClass"
                        [attr.aria-label]="ariaLabel"
                        [attr.aria-labelledby]="ariaLabelledBy"
                        [attr.aria-required]="required"
                        aria-autocomplete="list"
                        [attr.aria-controls]="listId"
                        role="searchbox"
                        [attr.aria-expanded]="overlayVisible"
                        aria-haspopup="true"
                        [attr.aria-activedescendant]="'p-highlighted-option'"
                    />
                </li>
            </ul>
            <ng-container *ngIf="loading">
                <SpinnerIcon *ngIf="!loadingIconTemplate" [styleClass]="'p-autocomplete-loader'" [spin]="true" />
                <span *ngIf="loadingIconTemplate" class="p-autocomplete-loader pi-spin ">
                    <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                </span>
            </ng-container>
            <button #ddBtn type="button" pButton [attr.aria-label]="dropdownAriaLabel" class="p-autocomplete-dropdown p-button-icon-only" [disabled]="disabled" pRipple (click)="handleDropdownClick($event)" *ngIf="dropdown" [attr.tabindex]="tabindex">
                <span *ngIf="dropdownIcon" [ngClass]="dropdownIcon"></span>
                <ng-container *ngIf="!dropdownIcon">
                    <ChevronDownIcon *ngIf="!dropdownIconTemplate" />
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </ng-container>
            </button>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onShow)="show($event)"
                (onHide)="hide($event)"
            >
                <div [ngClass]="['p-autocomplete-panel p-component']" [style.max-height]="virtualScroll ? 'auto' : scrollHeight" [ngStyle]="panelStyle" [class]="panelStyleClass">
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                    <p-scroller
                        *ngIf="virtualScroll"
                        #scroller
                        [items]="suggestions"
                        [style]="{ height: scrollHeight }"
                        [itemSize]="virtualScrollItemSize || _itemSize"
                        [autoSize]="true"
                        [lazy]="lazy"
                        (onLazyLoad)="onLazyLoad.emit($event)"
                        [options]="virtualScrollOptions"
                    >
                        <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                            <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                        </ng-template>
                        <ng-container *ngIf="loaderTemplate">
                            <ng-template pTemplate="loader" let-scrollerOptions="options">
                                <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                            </ng-template>
                        </ng-container>
                    </p-scroller>
                    <ng-container *ngIf="!virtualScroll">
                        <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: suggestions, options: {} }"></ng-container>
                    </ng-container>

                    <ng-template #buildInItems let-items let-scrollerOptions="options">
                        <ul #items role="listbox" [attr.id]="listId" class="p-autocomplete-items" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle">
                            <ng-container *ngIf="group">
                                <ng-template ngFor let-optgroup [ngForOf]="items">
                                    <li class="p-autocomplete-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(optgroup) || 'empty' }}</span>
                                        <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: optgroup }"></ng-container>
                                    </li>
                                    <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: getOptionGroupChildren(optgroup) }"></ng-container>
                                </ng-template>
                            </ng-container>
                            <ng-container *ngIf="!group">
                                <ng-container *ngTemplateOutlet="itemslist; context: { $implicit: items }"></ng-container>
                            </ng-container>
                            <ng-template #itemslist let-suggestionsToDisplay>
                                <li
                                    role="option"
                                    *ngFor="let option of suggestionsToDisplay; let idx = index"
                                    class="p-autocomplete-item"
                                    pRipple
                                    [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }"
                                    [ngClass]="{ 'p-highlight': option === highlightOption }"
                                    [id]="highlightOption == option ? 'p-highlighted-option' : ''"
                                    (click)="selectItem(option)"
                                >
                                    <span *ngIf="!itemTemplate">{{ resolveFieldData(option) }}</span>
                                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: option, index: scrollerOptions.getOptions ? scrollerOptions.getOptions(idx) : idx }"></ng-container>
                                </li>
                            </ng-template>
                            <li *ngIf="noResults && showEmptyMessage" class="p-autocomplete-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                <ng-container *ngIf="!emptyTemplate; else empty">
                                    {{ emptyMessageLabel }}
                                </ng-container>
                                <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                            </li>
                        </ul>
                    </ng-template>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </p-overlay>
        </span>
    `, host: {
                        class: 'p-element p-inputwrapper',
                        '[class.p-inputwrapper-filled]': 'filled',
                        '[class.p-inputwrapper-focus]': '((focus && !disabled) || autofocus) || overlayVisible',
                        '[class.p-autocomplete-clearable]': 'showClear && !disabled'
                    }, providers: [AUTOCOMPLETE_VALUE_ACCESSOR], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".p-autocomplete{display:inline-flex;position:relative}.p-autocomplete-loader{position:absolute;top:50%;margin-top:-.5rem}.p-autocomplete-dd .p-autocomplete-input{flex:1 1 auto;width:1%}.p-autocomplete-dd .p-autocomplete-input,.p-autocomplete-dd .p-autocomplete-multiple-container{border-top-right-radius:0;border-bottom-right-radius:0}.p-autocomplete-dd .p-autocomplete-dropdown{border-top-left-radius:0;border-bottom-left-radius:0}.p-autocomplete-panel{overflow:auto}.p-autocomplete-items{margin:0;padding:0;list-style-type:none}.p-autocomplete-item{cursor:pointer;white-space:nowrap;position:relative;overflow:hidden}.p-autocomplete-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-autocomplete-token{width:-moz-fit-content;width:fit-content;cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-autocomplete-token-icon{cursor:pointer}.p-autocomplete-input-token{flex:1 1 auto;display:inline-flex}.p-autocomplete-input-token input{border:0 none;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-autocomplete{display:flex}.p-fluid .p-autocomplete-dd .p-autocomplete-input{width:1%}.p-autocomplete-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-autocomplete-clearable{position:relative}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.IterableDiffers }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }, { type: i0.NgZone }]; }, propDecorators: { minLength: [{
                type: Input
            }], delay: [{
                type: Input
            }], style: [{
                type: Input
            }], panelStyle: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], panelStyleClass: [{
                type: Input
            }], inputStyle: [{
                type: Input
            }], inputId: [{
                type: Input
            }], inputStyleClass: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], readonly: [{
                type: Input
            }], disabled: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], lazy: [{
                type: Input
            }], virtualScroll: [{
                type: Input
            }], virtualScrollItemSize: [{
                type: Input
            }], virtualScrollOptions: [{
                type: Input
            }], maxlength: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], size: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], autoHighlight: [{
                type: Input
            }], forceSelection: [{
                type: Input
            }], type: [{
                type: Input
            }], autoZIndex: [{
                type: Input
            }], baseZIndex: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], dropdownAriaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], dropdownIcon: [{
                type: Input
            }], unique: [{
                type: Input
            }], group: [{
                type: Input
            }], completeOnFocus: [{
                type: Input
            }], showClear: [{
                type: Input
            }], field: [{
                type: Input
            }], dropdown: [{
                type: Input
            }], showEmptyMessage: [{
                type: Input
            }], dropdownMode: [{
                type: Input
            }], multiple: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], emptyMessage: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], autofocus: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], optionGroupChildren: [{
                type: Input
            }], optionGroupLabel: [{
                type: Input
            }], overlayOptions: [{
                type: Input
            }], suggestions: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], completeMethod: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onUnselect: [{
                type: Output
            }], onFocus: [{
                type: Output
            }], onBlur: [{
                type: Output
            }], onDropdownClick: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onKeyUp: [{
                type: Output
            }], onShow: [{
                type: Output
            }], onHide: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], containerEL: [{
                type: ViewChild,
                args: ['container']
            }], inputEL: [{
                type: ViewChild,
                args: ['in']
            }], multiInputEl: [{
                type: ViewChild,
                args: ['multiIn']
            }], multiContainerEL: [{
                type: ViewChild,
                args: ['multiContainer']
            }], dropdownButton: [{
                type: ViewChild,
                args: ['ddBtn']
            }], itemsViewChild: [{
                type: ViewChild,
                args: ['items']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], overlayViewChild: [{
                type: ViewChild,
                args: ['overlay']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class AutoCompleteModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AutoCompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: AutoCompleteModule, declarations: [AutoComplete], imports: [CommonModule, OverlayModule, InputTextModule, ButtonModule, SharedModule, RippleModule, ScrollerModule, AutoFocusModule, TimesCircleIcon, SpinnerIcon, TimesIcon, ChevronDownIcon], exports: [AutoComplete, OverlayModule, SharedModule, ScrollerModule, AutoFocusModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AutoCompleteModule, imports: [CommonModule, OverlayModule, InputTextModule, ButtonModule, SharedModule, RippleModule, ScrollerModule, AutoFocusModule, TimesCircleIcon, SpinnerIcon, TimesIcon, ChevronDownIcon, OverlayModule, SharedModule, ScrollerModule, AutoFocusModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: AutoCompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, InputTextModule, ButtonModule, SharedModule, RippleModule, ScrollerModule, AutoFocusModule, TimesCircleIcon, SpinnerIcon, TimesIcon, ChevronDownIcon],
                    exports: [AutoComplete, OverlayModule, SharedModule, ScrollerModule, AutoFocusModule],
                    declarations: [AutoComplete]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AUTOCOMPLETE_VALUE_ACCESSOR, AutoComplete, AutoCompleteModule };
//# sourceMappingURL=primeng-autocomplete.mjs.map
