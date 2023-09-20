import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { SpinnerIcon } from 'primeng/icons/spinner';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Scroller is a performance-approach to handle huge data efficiently.
 * @group Components
 */
class Scroller {
    document;
    platformId;
    renderer;
    cd;
    zone;
    /**
     * Unique identifier of the element.
     * @group Props
     */
    get id() {
        return this._id;
    }
    set id(val) {
        this._id = val;
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    get style() {
        return this._style;
    }
    set style(val) {
        this._style = val;
    }
    /**
     * Style class of the element.
     * @group Props
     */
    get styleClass() {
        return this._styleClass;
    }
    set styleClass(val) {
        this._styleClass = val;
    }
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    get tabindex() {
        return this._tabindex;
    }
    set tabindex(val) {
        this._tabindex = val;
    }
    /**
     * An array of objects to display.
     * @group Props
     */
    get items() {
        return this._items;
    }
    set items(val) {
        this._items = val;
    }
    /**
     * The height/width of item according to orientation.
     * @group Props
     */
    get itemSize() {
        return this._itemSize;
    }
    set itemSize(val) {
        this._itemSize = val;
    }
    /**
     * Height of the scroll viewport.
     * @group Props
     */
    get scrollHeight() {
        return this._scrollHeight;
    }
    set scrollHeight(val) {
        this._scrollHeight = val;
    }
    /**
     * Width of the scroll viewport.
     * @group Props
     */
    get scrollWidth() {
        return this._scrollWidth;
    }
    set scrollWidth(val) {
        this._scrollWidth = val;
    }
    /**
     * The orientation of scrollbar.
     * @group Props
     */
    get orientation() {
        return this._orientation;
    }
    set orientation(val) {
        this._orientation = val;
    }
    /**
     * Used to specify how many items to load in each load method in lazy mode.
     * @group Props
     */
    get step() {
        return this._step;
    }
    set step(val) {
        this._step = val;
    }
    /**
     * Delay in scroll before new data is loaded.
     * @group Props
     */
    get delay() {
        return this._delay;
    }
    set delay(val) {
        this._delay = val;
    }
    /**
     * Delay after window's resize finishes.
     * @group Props
     */
    get resizeDelay() {
        return this._resizeDelay;
    }
    set resizeDelay(val) {
        this._resizeDelay = val;
    }
    /**
     * Used to append each loaded item to top without removing any items from the DOM. Using very large data may cause the browser to crash.
     * @group Props
     */
    get appendOnly() {
        return this._appendOnly;
    }
    set appendOnly(val) {
        this._appendOnly = val;
    }
    /**
     * Specifies whether the scroller should be displayed inline or not.
     * @group Props
     */
    get inline() {
        return this._inline;
    }
    set inline(val) {
        this._inline = val;
    }
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    get lazy() {
        return this._lazy;
    }
    set lazy(val) {
        this._lazy = val;
    }
    /**
     * If disabled, the scroller feature is eliminated and the content is displayed directly.
     * @group Props
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = val;
    }
    /**
     * Used to implement a custom loader instead of using the loader feature in the scroller.
     * @group Props
     */
    get loaderDisabled() {
        return this._loaderDisabled;
    }
    set loaderDisabled(val) {
        this._loaderDisabled = val;
    }
    /**
     * Columns to display.
     * @group Props
     */
    get columns() {
        return this._columns;
    }
    set columns(val) {
        this._columns = val;
    }
    /**
     * Used to implement a custom spacer instead of using the spacer feature in the scroller.
     * @group Props
     */
    get showSpacer() {
        return this._showSpacer;
    }
    set showSpacer(val) {
        this._showSpacer = val;
    }
    /**
     * Defines whether to show loader.
     * @group Props
     */
    get showLoader() {
        return this._showLoader;
    }
    set showLoader(val) {
        this._showLoader = val;
    }
    /**
     * Determines how many additional elements to add to the DOM outside of the view. According to the scrolls made up and down, extra items are added in a certain algorithm in the form of multiples of this number. Default value is half the number of items shown in the view.
     * @group Props
     */
    get numToleratedItems() {
        return this._numToleratedItems;
    }
    set numToleratedItems(val) {
        this._numToleratedItems = val;
    }
    /**
     * Defines whether the data is loaded.
     * @group Props
     */
    get loading() {
        return this._loading;
    }
    set loading(val) {
        this._loading = val;
    }
    /**
     * Defines whether to dynamically change the height or width of scrollable container.
     * @group Props
     */
    get autoSize() {
        return this._autoSize;
    }
    set autoSize(val) {
        this._autoSize = val;
    }
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algoritm checks for object identity.
     * @group Props
     */
    get trackBy() {
        return this._trackBy;
    }
    set trackBy(val) {
        this._trackBy = val;
    }
    /**
     * Defines whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
        if (val && typeof val === 'object') {
            //@ts-ignore
            Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
        }
    }
    /**
     * Callback to invoke in lazy mode to load new data.
     * @param {ScrollerLazyLoadEvent} event - Custom lazy load event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke when scroll position changes.
     * @param {ScrollerScrollEvent} event - Custom scroll event.
     * @group Emits
     */
    onScroll = new EventEmitter();
    /**
     * Callback to invoke when scroll position and item's range in view changes.
     * @param {ScrollerScrollEvent} event - Custom scroll index change event.
     * @group Emits
     */
    onScrollIndexChange = new EventEmitter();
    elementViewChild;
    contentViewChild;
    templates;
    _id;
    _style;
    _styleClass;
    _tabindex = 0;
    _items;
    _itemSize = 0;
    _scrollHeight;
    _scrollWidth;
    _orientation = 'vertical';
    _step = 0;
    _delay = 0;
    _resizeDelay = 10;
    _appendOnly = false;
    _inline = false;
    _lazy = false;
    _disabled = false;
    _loaderDisabled = false;
    _columns;
    _showSpacer = true;
    _showLoader = false;
    _numToleratedItems;
    _loading;
    _autoSize = false;
    _trackBy;
    _options;
    d_loading = false;
    d_numToleratedItems;
    contentEl;
    contentTemplate;
    itemTemplate;
    loaderTemplate;
    loaderIconTemplate;
    first = 0;
    last = 0;
    page = 0;
    isRangeChanged = false;
    numItemsInViewport = 0;
    lastScrollPos = 0;
    lazyLoadState = {};
    loaderArr = [];
    spacerStyle = {};
    contentStyle = {};
    scrollTimeout;
    resizeTimeout;
    initialized = false;
    windowResizeListener;
    defaultWidth;
    defaultHeight;
    defaultContentWidth;
    defaultContentHeight;
    get vertical() {
        return this._orientation === 'vertical';
    }
    get horizontal() {
        return this._orientation === 'horizontal';
    }
    get both() {
        return this._orientation === 'both';
    }
    get loadedItems() {
        if (this._items && !this.d_loading) {
            if (this.both)
                return this._items.slice(this._appendOnly ? 0 : this.first.rows, this.last.rows).map((item) => (this._columns ? item : item.slice(this._appendOnly ? 0 : this.first.cols, this.last.cols)));
            else if (this.horizontal && this._columns)
                return this._items;
            else
                return this._items.slice(this._appendOnly ? 0 : this.first, this.last);
        }
        return [];
    }
    get loadedRows() {
        return this.d_loading ? (this._loaderDisabled ? this.loaderArr : []) : this.loadedItems;
    }
    get loadedColumns() {
        if (this._columns && (this.both || this.horizontal)) {
            return this.d_loading && this._loaderDisabled ? (this.both ? this.loaderArr[0] : this.loaderArr) : this._columns.slice(this.both ? this.first.cols : this.first, this.both ? this.last.cols : this.last);
        }
        return this._columns;
    }
    get isPageChanged() {
        return this._step ? this.page !== this.getPageByFirst() : true;
    }
    constructor(document, platformId, renderer, cd, zone) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
    }
    ngOnInit() {
        this.setInitialState();
    }
    ngOnChanges(simpleChanges) {
        let isLoadingChanged = false;
        if (simpleChanges.loading) {
            const { previousValue, currentValue } = simpleChanges.loading;
            if (this.lazy && previousValue !== currentValue && currentValue !== this.d_loading) {
                this.d_loading = currentValue;
                isLoadingChanged = true;
            }
        }
        if (simpleChanges.orientation) {
            this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        }
        if (simpleChanges.numToleratedItems) {
            const { previousValue, currentValue } = simpleChanges.numToleratedItems;
            if (previousValue !== currentValue && currentValue !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue;
            }
        }
        if (simpleChanges.options) {
            const { previousValue, currentValue } = simpleChanges.options;
            if (this.lazy && previousValue?.loading !== currentValue?.loading && currentValue?.loading !== this.d_loading) {
                this.d_loading = currentValue.loading;
                isLoadingChanged = true;
            }
            if (previousValue?.numToleratedItems !== currentValue?.numToleratedItems && currentValue?.numToleratedItems !== this.d_numToleratedItems) {
                this.d_numToleratedItems = currentValue.numToleratedItems;
            }
        }
        if (this.initialized) {
            const isChanged = !isLoadingChanged && (simpleChanges.items?.previousValue?.length !== simpleChanges.items?.currentValue?.length || simpleChanges.itemSize || simpleChanges.scrollHeight || simpleChanges.scrollWidth);
            if (isChanged) {
                this.init();
                this.calculateAutoSize();
            }
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'loader':
                    this.loaderTemplate = item.template;
                    break;
                case 'loadericon':
                    this.loaderIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this.viewInit();
        });
    }
    ngAfterViewChecked() {
        if (!this.initialized) {
            this.viewInit();
        }
    }
    ngOnDestroy() {
        this.unbindResizeListener();
        this.contentEl = null;
        this.initialized = false;
    }
    viewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
                this.setInitialState();
                this.setContentEl(this.contentEl);
                this.init();
                this.defaultWidth = DomHandler.getWidth(this.elementViewChild?.nativeElement);
                this.defaultHeight = DomHandler.getHeight(this.elementViewChild?.nativeElement);
                this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
                this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
                this.initialized = true;
            }
        }
    }
    init() {
        if (!this._disabled) {
            this.setSize();
            this.calculateOptions();
            this.setSpacerSize();
            this.bindResizeListener();
            this.cd.detectChanges();
        }
    }
    setContentEl(el) {
        this.contentEl = el || this.contentViewChild?.nativeElement || DomHandler.findSingle(this.elementViewChild?.nativeElement, '.p-scroller-content');
    }
    setInitialState() {
        this.first = this.both ? { rows: 0, cols: 0 } : 0;
        this.last = this.both ? { rows: 0, cols: 0 } : 0;
        this.numItemsInViewport = this.both ? { rows: 0, cols: 0 } : 0;
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.d_loading = this._loading || false;
        this.d_numToleratedItems = this._numToleratedItems;
        this.loaderArr = [];
        this.spacerStyle = {};
        this.contentStyle = {};
    }
    getElementRef() {
        return this.elementViewChild;
    }
    getPageByFirst() {
        return Math.floor((this.first + this.d_numToleratedItems * 4) / (this._step || 1));
    }
    scrollTo(options) {
        this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
        this.elementViewChild?.nativeElement?.scrollTo(options);
    }
    scrollToIndex(index, behavior = 'auto') {
        const { numToleratedItems } = this.calculateNumItems();
        const contentPos = this.getContentPosition();
        const calculateFirst = (_index = 0, _numT) => (_index <= _numT ? 0 : _index);
        const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
        const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
        let newFirst = 0;
        if (this.both) {
            newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
            scrollTo(calculateCoord(newFirst.cols, this._itemSize[1], contentPos.left), calculateCoord(newFirst.rows, this._itemSize[0], contentPos.top));
        }
        else {
            newFirst = calculateFirst(index, numToleratedItems);
            this.horizontal ? scrollTo(calculateCoord(newFirst, this._itemSize, contentPos.left), 0) : scrollTo(0, calculateCoord(newFirst, this._itemSize, contentPos.top));
        }
        this.isRangeChanged = this.first !== newFirst;
        this.first = newFirst;
    }
    scrollInView(index, to, behavior = 'auto') {
        if (to) {
            const { first, viewport } = this.getRenderedRange();
            const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
            const isToStart = to === 'to-start';
            const isToEnd = to === 'to-end';
            if (isToStart) {
                if (this.both) {
                    if (viewport.first.rows - first.rows > index[0]) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows - 1) * this._itemSize[0]);
                    }
                    else if (viewport.first.cols - first.cols > index[1]) {
                        scrollTo((viewport.first.cols - 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.first - first > index) {
                        const pos = (viewport.first - 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
            else if (isToEnd) {
                if (this.both) {
                    if (viewport.last.rows - first.rows <= index[0] + 1) {
                        scrollTo(viewport.first.cols * this._itemSize[1], (viewport.first.rows + 1) * this._itemSize[0]);
                    }
                    else if (viewport.last.cols - first.cols <= index[1] + 1) {
                        scrollTo((viewport.first.cols + 1) * this._itemSize[1], viewport.first.rows * this._itemSize[0]);
                    }
                }
                else {
                    if (viewport.last - first <= index + 1) {
                        const pos = (viewport.first + 1) * this._itemSize;
                        this.horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                    }
                }
            }
        }
        else {
            this.scrollToIndex(index, behavior);
        }
    }
    getRenderedRange() {
        const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));
        let firstInViewport = this.first;
        let lastInViewport = 0;
        if (this.elementViewChild?.nativeElement) {
            const { scrollTop, scrollLeft } = this.elementViewChild.nativeElement;
            if (this.both) {
                firstInViewport = { rows: calculateFirstInViewport(scrollTop, this._itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this._itemSize[1]) };
                lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
            }
            else {
                const scrollPos = this.horizontal ? scrollLeft : scrollTop;
                firstInViewport = calculateFirstInViewport(scrollPos, this._itemSize);
                lastInViewport = firstInViewport + this.numItemsInViewport;
            }
        }
        return {
            first: this.first,
            last: this.last,
            viewport: {
                first: firstInViewport,
                last: lastInViewport
            }
        };
    }
    calculateNumItems() {
        const contentPos = this.getContentPosition();
        const contentWidth = (this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetWidth - contentPos.left : 0) || 0;
        const contentHeight = (this.elementViewChild?.nativeElement ? this.elementViewChild.nativeElement.offsetHeight - contentPos.top : 0) || 0;
        const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
        const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
        const numItemsInViewport = this.both
            ? { rows: calculateNumItemsInViewport(contentHeight, this._itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, this._itemSize[1]) }
            : calculateNumItemsInViewport(this.horizontal ? contentWidth : contentHeight, this._itemSize);
        const numToleratedItems = this.d_numToleratedItems || (this.both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
        return { numItemsInViewport, numToleratedItems };
    }
    calculateOptions() {
        const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
        const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
        const first = this.first;
        const last = this.both
            ? { rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true) }
            : calculateLast(this.first, numItemsInViewport, numToleratedItems);
        this.last = last;
        this.numItemsInViewport = numItemsInViewport;
        this.d_numToleratedItems = numToleratedItems;
        if (this.showLoader) {
            this.loaderArr = this.both ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
        }
        if (this._lazy) {
            Promise.resolve().then(() => {
                this.lazyLoadState = {
                    first: this._step ? (this.both ? { rows: 0, cols: first.cols } : 0) : first,
                    last: Math.min(this._step ? this._step : this.last, this.items.length)
                };
                this.handleEvents('onLazyLoad', this.lazyLoadState);
            });
        }
    }
    calculateAutoSize() {
        if (this._autoSize && !this.d_loading) {
            Promise.resolve().then(() => {
                if (this.contentEl) {
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = 'auto';
                    this.contentEl.style.position = 'relative';
                    this.elementViewChild.nativeElement.style.contain = 'none';
                    const [contentWidth, contentHeight] = [DomHandler.getWidth(this.contentEl), DomHandler.getHeight(this.contentEl)];
                    contentWidth !== this.defaultContentWidth && (this.elementViewChild.nativeElement.style.width = '');
                    contentHeight !== this.defaultContentHeight && (this.elementViewChild.nativeElement.style.height = '');
                    const [width, height] = [DomHandler.getWidth(this.elementViewChild.nativeElement), DomHandler.getHeight(this.elementViewChild.nativeElement)];
                    (this.both || this.horizontal) && (this.elementViewChild.nativeElement.style.width = width < this.defaultWidth ? width + 'px' : this._scrollWidth || this.defaultWidth + 'px');
                    (this.both || this.vertical) && (this.elementViewChild.nativeElement.style.height = height < this.defaultHeight ? height + 'px' : this._scrollHeight || this.defaultHeight + 'px');
                    this.contentEl.style.minHeight = this.contentEl.style.minWidth = '';
                    this.contentEl.style.position = '';
                    this.elementViewChild.nativeElement.style.contain = '';
                }
            });
        }
    }
    getLast(last = 0, isCols = false) {
        return this._items ? Math.min(isCols ? (this._columns || this._items[0]).length : this._items.length, last) : 0;
    }
    getContentPosition() {
        if (this.contentEl) {
            const style = getComputedStyle(this.contentEl);
            const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
            const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
            const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
            const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
            return { left, right, top, bottom, x: left + right, y: top + bottom };
        }
        return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
    }
    setSize() {
        if (this.elementViewChild?.nativeElement) {
            const parentElement = this.elementViewChild.nativeElement.parentElement.parentElement;
            const width = this._scrollWidth || `${this.elementViewChild.nativeElement.offsetWidth || parentElement.offsetWidth}px`;
            const height = this._scrollHeight || `${this.elementViewChild.nativeElement.offsetHeight || parentElement.offsetHeight}px`;
            const setProp = (_name, _value) => (this.elementViewChild.nativeElement.style[_name] = _value);
            if (this.both || this.horizontal) {
                setProp('height', height);
                setProp('width', width);
            }
            else {
                setProp('height', height);
            }
        }
    }
    setSpacerSize() {
        if (this._items) {
            const contentPos = this.getContentPosition();
            const setProp = (_name, _value, _size, _cpos = 0) => (this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: (_value || []).length * _size + _cpos + 'px' } });
            if (this.both) {
                setProp('height', this._items, this._itemSize[0], contentPos.y);
                setProp('width', this._columns || this._items[1], this._itemSize[1], contentPos.x);
            }
            else {
                this.horizontal ? setProp('width', this._columns || this._items, this._itemSize, contentPos.x) : setProp('height', this._items, this._itemSize, contentPos.y);
            }
        }
    }
    setContentPosition(pos) {
        if (this.contentEl && !this._appendOnly) {
            const first = pos ? pos.first : this.first;
            const calculateTranslateVal = (_first, _size) => _first * _size;
            const setTransform = (_x = 0, _y = 0) => (this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } });
            if (this.both) {
                setTransform(calculateTranslateVal(first.cols, this._itemSize[1]), calculateTranslateVal(first.rows, this._itemSize[0]));
            }
            else {
                const translateVal = calculateTranslateVal(first, this._itemSize);
                this.horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
            }
        }
    }
    onScrollPositionChange(event) {
        const target = event.target;
        const contentPos = this.getContentPosition();
        const calculateScrollPos = (_pos, _cpos) => (_pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0);
        const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));
        const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
        };
        const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
            if (_currentIndex <= _numT)
                return 0;
            else
                return Math.max(0, _isScrollDownOrRight ? (_currentIndex < _triggerIndex ? _first : _currentIndex - _numT) : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
        };
        const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
            let lastValue = _first + _num + 2 * _numT;
            if (_currentIndex >= _numT) {
                lastValue += _numT + 1;
            }
            return this.getLast(lastValue, _isCols);
        };
        const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
        const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
        let newFirst = this.both ? { rows: 0, cols: 0 } : 0;
        let newLast = this.last;
        let isRangeChanged = false;
        let newScrollPos = this.lastScrollPos;
        if (this.both) {
            const isScrollDown = this.lastScrollPos.top <= scrollTop;
            const isScrollRight = this.lastScrollPos.left <= scrollLeft;
            if (!this._appendOnly || (this._appendOnly && (isScrollDown || isScrollRight))) {
                const currentIndex = { rows: calculateCurrentIndex(scrollTop, this._itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this._itemSize[1]) };
                const triggerIndex = {
                    rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newFirst = {
                    rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                    cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                };
                newLast = {
                    rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
                    cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
                };
                isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
                newScrollPos = { top: scrollTop, left: scrollLeft };
            }
        }
        else {
            const scrollPos = this.horizontal ? scrollLeft : scrollTop;
            const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
            if (!this._appendOnly || (this._appendOnly && isScrollDownOrRight)) {
                const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize);
                const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
                isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
                newScrollPos = scrollPos;
            }
        }
        return {
            first: newFirst,
            last: newLast,
            isRangeChanged,
            scrollPos: newScrollPos
        };
    }
    onScrollChange(event) {
        const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
        if (isRangeChanged) {
            const newState = { first, last };
            this.setContentPosition(newState);
            this.first = first;
            this.last = last;
            this.lastScrollPos = scrollPos;
            this.handleEvents('onScrollIndexChange', newState);
            if (this._lazy && this.isPageChanged) {
                const lazyLoadState = {
                    first: this._step ? Math.min(this.getPageByFirst() * this._step, this.items.length - this._step) : first,
                    last: Math.min(this._step ? (this.getPageByFirst() + 1) * this._step : last, this.items.length)
                };
                const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
                isLazyStateChanged && this.handleEvents('onLazyLoad', lazyLoadState);
                this.lazyLoadState = lazyLoadState;
            }
        }
    }
    onContainerScroll(event) {
        this.handleEvents('onScroll', { originalEvent: event });
        if (this._delay && this.isPageChanged) {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            if (!this.d_loading && this.showLoader) {
                const { isRangeChanged } = this.onScrollPositionChange(event);
                const changed = isRangeChanged || (this._step ? this.isPageChanged : false);
                if (changed) {
                    this.d_loading = true;
                    this.cd.detectChanges();
                }
            }
            this.scrollTimeout = setTimeout(() => {
                this.onScrollChange(event);
                if (this.d_loading && this.showLoader && (!this._lazy || this._loading === undefined)) {
                    this.d_loading = false;
                    this.page = this.getPageByFirst();
                    this.cd.detectChanges();
                }
            }, this._delay);
        }
        else {
            !this.d_loading && this.onScrollChange(event);
        }
    }
    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.windowResizeListener) {
                this.zone.runOutsideAngular(() => {
                    const window = this.document.defaultView;
                    const event = DomHandler.isTouchDevice() ? 'orientationchange' : 'resize';
                    this.windowResizeListener = this.renderer.listen(window, event, this.onWindowResize.bind(this));
                });
            }
        }
    }
    unbindResizeListener() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }
    }
    onWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(() => {
            if (DomHandler.isVisible(this.elementViewChild?.nativeElement)) {
                const [width, height] = [DomHandler.getWidth(this.elementViewChild?.nativeElement), DomHandler.getHeight(this.elementViewChild?.nativeElement)];
                const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
                const reinit = this.both ? isDiffWidth || isDiffHeight : this.horizontal ? isDiffWidth : this.vertical ? isDiffHeight : false;
                reinit &&
                    this.zone.run(() => {
                        this.d_numToleratedItems = this._numToleratedItems;
                        this.defaultWidth = width;
                        this.defaultHeight = height;
                        this.defaultContentWidth = DomHandler.getWidth(this.contentEl);
                        this.defaultContentHeight = DomHandler.getHeight(this.contentEl);
                        this.init();
                    });
            }
        }, this._resizeDelay);
    }
    handleEvents(name, params) {
        //@ts-ignore
        return this.options && this.options[name] ? this.options[name](params) : this[name].emit(params);
    }
    getContentOptions() {
        return {
            contentStyleClass: `p-scroller-content ${this.d_loading ? 'p-scroller-loading' : ''}`,
            items: this.loadedItems,
            getItemOptions: (index) => this.getOptions(index),
            loading: this.d_loading,
            getLoaderOptions: (index, options) => this.getLoaderOptions(index, options),
            itemSize: this._itemSize,
            rows: this.loadedRows,
            columns: this.loadedColumns,
            spacerStyle: this.spacerStyle,
            contentStyle: this.contentStyle,
            vertical: this.vertical,
            horizontal: this.horizontal,
            both: this.both
        };
    }
    getOptions(renderedIndex) {
        const count = (this._items || []).length;
        const index = this.both ? this.first.rows + renderedIndex : this.first + renderedIndex;
        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0
        };
    }
    getLoaderOptions(index, extOptions) {
        const count = this.loaderArr.length;
        return {
            index,
            count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0,
            ...extOptions
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Scroller, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Scroller, selector: "p-scroller", inputs: { id: "id", style: "style", styleClass: "styleClass", tabindex: "tabindex", items: "items", itemSize: "itemSize", scrollHeight: "scrollHeight", scrollWidth: "scrollWidth", orientation: "orientation", step: "step", delay: "delay", resizeDelay: "resizeDelay", appendOnly: "appendOnly", inline: "inline", lazy: "lazy", disabled: "disabled", loaderDisabled: "loaderDisabled", columns: "columns", showSpacer: "showSpacer", showLoader: "showLoader", numToleratedItems: "numToleratedItems", loading: "loading", autoSize: "autoSize", trackBy: "trackBy", options: "options" }, outputs: { onLazyLoad: "onLazyLoad", onScroll: "onScroll", onScrollIndexChange: "onScrollIndexChange" }, host: { classAttribute: "p-scroller-viewport p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "elementViewChild", first: true, predicate: ["element"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon'" />
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `, isInline: true, styles: ["p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(function () { return SpinnerIcon; }), selector: "SpinnerIcon" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
export { Scroller };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Scroller, decorators: [{
            type: Component,
            args: [{ selector: 'p-scroller', template: `
        <ng-container *ngIf="!_disabled; else disabledContainer">
            <div
                #element
                [attr.id]="_id"
                [attr.tabindex]="tabindex"
                [ngStyle]="_style"
                [class]="_styleClass"
                [ngClass]="{ 'p-scroller': true, 'p-scroller-inline': inline, 'p-both-scroll': both, 'p-horizontal-scroll': horizontal }"
                (scroll)="onContainerScroll($event)"
            >
                <ng-container *ngIf="contentTemplate; else buildInContent">
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: loadedItems, options: getContentOptions() }"></ng-container>
                </ng-container>
                <ng-template #buildInContent>
                    <div #content class="p-scroller-content" [ngClass]="{ 'p-scroller-loading': d_loading }" [ngStyle]="contentStyle">
                        <ng-container *ngFor="let item of loadedItems; let index = index; trackBy: _trackBy || index">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, options: getOptions(index) }"></ng-container>
                        </ng-container>
                    </div>
                </ng-template>
                <div *ngIf="_showSpacer" class="p-scroller-spacer" [ngStyle]="spacerStyle"></div>
                <div *ngIf="!loaderDisabled && _showLoader && d_loading" class="p-scroller-loader" [ngClass]="{ 'p-component-overlay': !loaderTemplate }">
                    <ng-container *ngIf="loaderTemplate; else buildInLoader">
                        <ng-container *ngFor="let item of loaderArr; let index = index">
                            <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: getLoaderOptions(index, both && { numCols: _numItemsInViewport.cols }) }"></ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-template #buildInLoader>
                        <ng-container *ngIf="loaderIconTemplate; else buildInLoaderIcon">
                            <ng-container *ngTemplateOutlet="loaderIconTemplate; context: { options: { styleClass: 'p-scroller-loading-icon' } }"></ng-container>
                        </ng-container>
                        <ng-template #buildInLoaderIcon>
                            <SpinnerIcon [styleClass]="'p-scroller-loading-icon'" />
                        </ng-template>
                    </ng-template>
                </div>
            </div>
        </ng-container>
        <ng-template #disabledContainer>
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate">
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: items, options: { rows: _items, columns: loadedColumns } }"></ng-container>
            </ng-container>
        </ng-template>
    `, changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-scroller-viewport p-element'
                    }, styles: ["p-scroller{flex:1;outline:0 none}.p-scroller{position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;outline:0 none}.p-scroller-content{position:absolute;top:0;left:0;min-height:100%;min-width:100%;will-change:transform}.p-scroller-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0;pointer-events:none}.p-scroller-loader{position:sticky;top:0;left:0;width:100%;height:100%}.p-scroller-loader.p-component-overlay{display:flex;align-items:center;justify-content:center}.p-scroller-loading-icon{scale:2}.p-scroller-inline .p-scroller-content{position:static}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }]; }, propDecorators: { id: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], items: [{
                type: Input
            }], itemSize: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], scrollWidth: [{
                type: Input
            }], orientation: [{
                type: Input
            }], step: [{
                type: Input
            }], delay: [{
                type: Input
            }], resizeDelay: [{
                type: Input
            }], appendOnly: [{
                type: Input
            }], inline: [{
                type: Input
            }], lazy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loaderDisabled: [{
                type: Input
            }], columns: [{
                type: Input
            }], showSpacer: [{
                type: Input
            }], showLoader: [{
                type: Input
            }], numToleratedItems: [{
                type: Input
            }], loading: [{
                type: Input
            }], autoSize: [{
                type: Input
            }], trackBy: [{
                type: Input
            }], options: [{
                type: Input
            }], onLazyLoad: [{
                type: Output
            }], onScroll: [{
                type: Output
            }], onScrollIndexChange: [{
                type: Output
            }], elementViewChild: [{
                type: ViewChild,
                args: ['element']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class ScrollerModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: ScrollerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: ScrollerModule, declarations: [Scroller], imports: [CommonModule, SharedModule, SpinnerIcon], exports: [Scroller, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: ScrollerModule, imports: [CommonModule, SharedModule, SpinnerIcon, SharedModule] });
}
export { ScrollerModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: ScrollerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, SpinnerIcon],
                    exports: [Scroller, SharedModule],
                    declarations: [Scroller]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xsZXIvc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUlSLE1BQU0sRUFDTixXQUFXLEVBS1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBSXBEOzs7R0FHRztBQUNILE1BdURhLFFBQVE7SUFtYXFCO0lBQWlEO0lBQXlCO0lBQTZCO0lBQStCO0lBbGE1Szs7O09BR0c7SUFDSCxJQUFhLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLEdBQXVCO1FBQzFCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFDRDs7O09BR0c7SUFDSCxJQUFhLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEdBQVE7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUN0QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsSUFBYSxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBQ0Qs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QkFBNUIsTUFBTTtnQkFFZSxnQkFBZ0I7c0JBQXJDLFNBQVM7dUJBQUMsU0FBUztnQkFFRSxnQkFBZ0I7c0JBQXJDLFNBQVM7dUJBQUMsU0FBUztnQkFFWSxTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7O0FBd3VCbEMsTUFLYSxjQUFjO3VHQUFkLGNBQWM7d0dBQWQsY0FBYyxpQkFwZ0NkLFFBQVEsYUFnZ0NQLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxhQWhnQ3hDLFFBQVEsRUFpZ0NHLFlBQVk7d0dBR3ZCLGNBQWMsWUFKYixZQUFZLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFDN0IsWUFBWTs7U0FHdkIsY0FBYzsyRkFBZCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDO29CQUNsRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgU3Bpbm5lckljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NwaW5uZXInO1xuaW1wb3J0IHsgU2Nyb2xsZXJMYXp5TG9hZEV2ZW50LCBTY3JvbGxlclNjcm9sbEV2ZW50LCBTY3JvbGxlclNjcm9sbEluZGV4Q2hhbmdlRXZlbnQsIFNjcm9sbGVyVG9UeXBlIH0gZnJvbSAnLi9zY3JvbGxlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2Nyb2xsZXJPcHRpb25zIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgTnVsbGFibGUsIFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG4vKipcbiAqIFNjcm9sbGVyIGlzIGEgcGVyZm9ybWFuY2UtYXBwcm9hY2ggdG8gaGFuZGxlIGh1Z2UgZGF0YSBlZmZpY2llbnRseS5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zY3JvbGxlcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFfZGlzYWJsZWQ7IGVsc2UgZGlzYWJsZWRDb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAjZWxlbWVudFxuICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIl9pZFwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIl9zdHlsZVwiXG4gICAgICAgICAgICAgICAgW2NsYXNzXT1cIl9zdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLXNjcm9sbGVyJzogdHJ1ZSwgJ3Atc2Nyb2xsZXItaW5saW5lJzogaW5saW5lLCAncC1ib3RoLXNjcm9sbCc6IGJvdGgsICdwLWhvcml6b250YWwtc2Nyb2xsJzogaG9yaXpvbnRhbCB9XCJcbiAgICAgICAgICAgICAgICAoc2Nyb2xsKT1cIm9uQ29udGFpbmVyU2Nyb2xsKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGU7IGVsc2UgYnVpbGRJbkNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGxvYWRlZEl0ZW1zLCBvcHRpb25zOiBnZXRDb250ZW50T3B0aW9ucygpIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5Db250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwicC1zY3JvbGxlci1jb250ZW50XCIgW25nQ2xhc3NdPVwieyAncC1zY3JvbGxlci1sb2FkaW5nJzogZF9sb2FkaW5nIH1cIiBbbmdTdHlsZV09XCJjb250ZW50U3R5bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbG9hZGVkSXRlbXM7IGxldCBpbmRleCA9IGluZGV4OyB0cmFja0J5OiBfdHJhY2tCeSB8fCBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtLCBvcHRpb25zOiBnZXRPcHRpb25zKGluZGV4KSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiX3Nob3dTcGFjZXJcIiBjbGFzcz1cInAtc2Nyb2xsZXItc3BhY2VyXCIgW25nU3R5bGVdPVwic3BhY2VyU3R5bGVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWxvYWRlckRpc2FibGVkICYmIF9zaG93TG9hZGVyICYmIGRfbG9hZGluZ1wiIGNsYXNzPVwicC1zY3JvbGxlci1sb2FkZXJcIiBbbmdDbGFzc109XCJ7ICdwLWNvbXBvbmVudC1vdmVybGF5JzogIWxvYWRlclRlbXBsYXRlIH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvYWRlclRlbXBsYXRlOyBlbHNlIGJ1aWxkSW5Mb2FkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbG9hZGVyQXJyOyBsZXQgaW5kZXggPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsb2FkZXJUZW1wbGF0ZTsgY29udGV4dDogeyBvcHRpb25zOiBnZXRMb2FkZXJPcHRpb25zKGluZGV4LCBib3RoICYmIHsgbnVtQ29sczogX251bUl0ZW1zSW5WaWV3cG9ydC5jb2xzIH0pIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNidWlsZEluTG9hZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvYWRlckljb25UZW1wbGF0ZTsgZWxzZSBidWlsZEluTG9hZGVySWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsb2FkZXJJY29uVGVtcGxhdGU7IGNvbnRleHQ6IHsgb3B0aW9uczogeyBzdHlsZUNsYXNzOiAncC1zY3JvbGxlci1sb2FkaW5nLWljb24nIH0gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2J1aWxkSW5Mb2FkZXJJY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGlubmVySWNvbiBbc3R5bGVDbGFzc109XCIncC1zY3JvbGxlci1sb2FkaW5nLWljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZGlzYWJsZWRDb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW1zLCBvcHRpb25zOiB7IHJvd3M6IF9pdGVtcywgY29sdW1uczogbG9hZGVkQ29sdW1ucyB9IH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2Nyb2xsZXIuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3Atc2Nyb2xsZXItdmlld3BvcnQgcC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsZXIgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGlkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG4gICAgc2V0IGlkKHZhbDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2lkID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc3R5bGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgIH1cbiAgICBzZXQgc3R5bGUodmFsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fc3R5bGUgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzdHlsZUNsYXNzKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZUNsYXNzO1xuICAgIH1cbiAgICBzZXQgc3R5bGVDbGFzcyh2YWw6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9zdHlsZUNsYXNzID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0YWJiaW5nIG9yZGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB0YWJpbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhYmluZGV4O1xuICAgIH1cbiAgICBzZXQgdGFiaW5kZXgodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGFiaW5kZXggPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgdG8gZGlzcGxheS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaXRlbXMoKTogYW55W10gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgIH1cbiAgICBzZXQgaXRlbXModmFsOiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBoZWlnaHQvd2lkdGggb2YgaXRlbSBhY2NvcmRpbmcgdG8gb3JpZW50YXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGl0ZW1TaXplKCk6IG51bWJlcltdIHwgbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1TaXplO1xuICAgIH1cbiAgICBzZXQgaXRlbVNpemUodmFsOiBudW1iZXJbXSB8IG51bWJlcikge1xuICAgICAgICB0aGlzLl9pdGVtU2l6ZSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSBzY3JvbGwgdmlld3BvcnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHNjcm9sbEhlaWdodCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsSGVpZ2h0O1xuICAgIH1cbiAgICBzZXQgc2Nyb2xsSGVpZ2h0KHZhbDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbEhlaWdodCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2lkdGggb2YgdGhlIHNjcm9sbCB2aWV3cG9ydC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2Nyb2xsV2lkdGgoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbFdpZHRoO1xuICAgIH1cbiAgICBzZXQgc2Nyb2xsV2lkdGgodmFsOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsV2lkdGggPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBvcmllbnRhdGlvbiBvZiBzY3JvbGxiYXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG9yaWVudGF0aW9uKCk6ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcgfCAnYm90aCcge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gICAgfVxuICAgIHNldCBvcmllbnRhdGlvbih2YWw6ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcgfCAnYm90aCcpIHtcbiAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc3BlY2lmeSBob3cgbWFueSBpdGVtcyB0byBsb2FkIGluIGVhY2ggbG9hZCBtZXRob2QgaW4gbGF6eSBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzdGVwKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICAgIH1cbiAgICBzZXQgc3RlcCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zdGVwID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxheSBpbiBzY3JvbGwgYmVmb3JlIG5ldyBkYXRhIGlzIGxvYWRlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZGVsYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWxheTtcbiAgICB9XG4gICAgc2V0IGRlbGF5KHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2RlbGF5ID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxheSBhZnRlciB3aW5kb3cncyByZXNpemUgZmluaXNoZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHJlc2l6ZURlbGF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzaXplRGVsYXk7XG4gICAgfVxuICAgIHNldCByZXNpemVEZWxheSh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9yZXNpemVEZWxheSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBhcHBlbmQgZWFjaCBsb2FkZWQgaXRlbSB0byB0b3Agd2l0aG91dCByZW1vdmluZyBhbnkgaXRlbXMgZnJvbSB0aGUgRE9NLiBVc2luZyB2ZXJ5IGxhcmdlIGRhdGEgbWF5IGNhdXNlIHRoZSBicm93c2VyIHRvIGNyYXNoLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBhcHBlbmRPbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXBwZW5kT25seTtcbiAgICB9XG4gICAgc2V0IGFwcGVuZE9ubHkodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2FwcGVuZE9ubHkgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBzY3JvbGxlciBzaG91bGQgYmUgZGlzcGxheWVkIGlubGluZSBvciBub3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGlubGluZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubGluZTtcbiAgICB9XG4gICAgc2V0IGlubGluZSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faW5saW5lID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIGRhdGEgaXMgbG9hZGVkIGFuZCBpbnRlcmFjdGVkIHdpdGggaW4gbGF6eSBtYW5uZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGxhenkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXp5O1xuICAgIH1cbiAgICBzZXQgbGF6eSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbGF6eSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgZGlzYWJsZWQsIHRoZSBzY3JvbGxlciBmZWF0dXJlIGlzIGVsaW1pbmF0ZWQgYW5kIHRoZSBjb250ZW50IGlzIGRpc3BsYXllZCBkaXJlY3RseS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IGRpc2FibGVkKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBpbXBsZW1lbnQgYSBjdXN0b20gbG9hZGVyIGluc3RlYWQgb2YgdXNpbmcgdGhlIGxvYWRlciBmZWF0dXJlIGluIHRoZSBzY3JvbGxlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbG9hZGVyRGlzYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXJEaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IGxvYWRlckRpc2FibGVkKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9sb2FkZXJEaXNhYmxlZCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29sdW1ucyB0byBkaXNwbGF5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBjb2x1bW5zKCk6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICAgIH1cbiAgICBzZXQgY29sdW1ucyh2YWw6IGFueVtdIHwgdW5kZWZpbmVkIHwgbnVsbCkge1xuICAgICAgICB0aGlzLl9jb2x1bW5zID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGltcGxlbWVudCBhIGN1c3RvbSBzcGFjZXIgaW5zdGVhZCBvZiB1c2luZyB0aGUgc3BhY2VyIGZlYXR1cmUgaW4gdGhlIHNjcm9sbGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzaG93U3BhY2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd1NwYWNlcjtcbiAgICB9XG4gICAgc2V0IHNob3dTcGFjZXIodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dTcGFjZXIgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciB0byBzaG93IGxvYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2hvd0xvYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dMb2FkZXI7XG4gICAgfVxuICAgIHNldCBzaG93TG9hZGVyKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93TG9hZGVyID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGhvdyBtYW55IGFkZGl0aW9uYWwgZWxlbWVudHMgdG8gYWRkIHRvIHRoZSBET00gb3V0c2lkZSBvZiB0aGUgdmlldy4gQWNjb3JkaW5nIHRvIHRoZSBzY3JvbGxzIG1hZGUgdXAgYW5kIGRvd24sIGV4dHJhIGl0ZW1zIGFyZSBhZGRlZCBpbiBhIGNlcnRhaW4gYWxnb3JpdGhtIGluIHRoZSBmb3JtIG9mIG11bHRpcGxlcyBvZiB0aGlzIG51bWJlci4gRGVmYXVsdCB2YWx1ZSBpcyBoYWxmIHRoZSBudW1iZXIgb2YgaXRlbXMgc2hvd24gaW4gdGhlIHZpZXcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IG51bVRvbGVyYXRlZEl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbnVtVG9sZXJhdGVkSXRlbXM7XG4gICAgfVxuICAgIHNldCBudW1Ub2xlcmF0ZWRJdGVtcyh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9udW1Ub2xlcmF0ZWRJdGVtcyA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoZSBkYXRhIGlzIGxvYWRlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbG9hZGluZygpOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRpbmc7XG4gICAgfVxuICAgIHNldCBsb2FkaW5nKHZhbDogYm9vbGVhbiB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9sb2FkaW5nID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgdG8gZHluYW1pY2FsbHkgY2hhbmdlIHRoZSBoZWlnaHQgb3Igd2lkdGggb2Ygc2Nyb2xsYWJsZSBjb250YWluZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGF1dG9TaXplKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b1NpemU7XG4gICAgfVxuICAgIHNldCBhdXRvU2l6ZSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYXV0b1NpemUgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRvIG9wdGltaXplIHRoZSBkb20gb3BlcmF0aW9ucyBieSBkZWxlZ2F0aW5nIHRvIG5nRm9yVHJhY2tCeSwgZGVmYXVsdCBhbGdvcml0bSBjaGVja3MgZm9yIG9iamVjdCBpZGVudGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgdHJhY2tCeSgpOiBGdW5jdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja0J5O1xuICAgIH1cbiAgICBzZXQgdHJhY2tCeSh2YWw6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuX3RyYWNrQnkgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciB0byB1c2UgdGhlIHNjcm9sbGVyIGZlYXR1cmUuIFRoZSBwcm9wZXJ0aWVzIG9mIHNjcm9sbGVyIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBsaWtlIGFuIG9iamVjdCBpbiBpdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBTY3JvbGxlck9wdGlvbnMgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG4gICAgc2V0IG9wdGlvbnModmFsOiBTY3JvbGxlck9wdGlvbnMgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHZhbDtcblxuICAgICAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbCkuZm9yRWFjaCgoW2ssIHZdKSA9PiB0aGlzW2BfJHtrfWBdICE9PSB2ICYmICh0aGlzW2BfJHtrfWBdID0gdikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBpbiBsYXp5IG1vZGUgdG8gbG9hZCBuZXcgZGF0YS5cbiAgICAgKiBAcGFyYW0ge1Njcm9sbGVyTGF6eUxvYWRFdmVudH0gZXZlbnQgLSBDdXN0b20gbGF6eSBsb2FkIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8U2Nyb2xsZXJMYXp5TG9hZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2Nyb2xsZXJMYXp5TG9hZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHNjcm9sbCBwb3NpdGlvbiBjaGFuZ2VzLlxuICAgICAqIEBwYXJhbSB7U2Nyb2xsZXJTY3JvbGxFdmVudH0gZXZlbnQgLSBDdXN0b20gc2Nyb2xsIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNjcm9sbDogRXZlbnRFbWl0dGVyPFNjcm9sbGVyU2Nyb2xsRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTY3JvbGxlclNjcm9sbEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHNjcm9sbCBwb3NpdGlvbiBhbmQgaXRlbSdzIHJhbmdlIGluIHZpZXcgY2hhbmdlcy5cbiAgICAgKiBAcGFyYW0ge1Njcm9sbGVyU2Nyb2xsRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNjcm9sbCBpbmRleCBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2Nyb2xsSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTY3JvbGxlclNjcm9sbEluZGV4Q2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTY3JvbGxlclNjcm9sbEluZGV4Q2hhbmdlRXZlbnQ+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdlbGVtZW50JykgZWxlbWVudFZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogTnVsbGFibGU8UXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+PjtcblxuICAgIF9pZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgX3N0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgX3N0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF90YWJpbmRleDogbnVtYmVyID0gMDtcblxuICAgIF9pdGVtczogYW55W10gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgX2l0ZW1TaXplOiBudW1iZXIgfCBudW1iZXJbXSA9IDA7XG5cbiAgICBfc2Nyb2xsSGVpZ2h0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBfc2Nyb2xsV2lkdGg6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF9vcmllbnRhdGlvbjogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyB8ICdib3RoJyA9ICd2ZXJ0aWNhbCc7XG5cbiAgICBfc3RlcDogbnVtYmVyID0gMDtcblxuICAgIF9kZWxheTogbnVtYmVyID0gMDtcblxuICAgIF9yZXNpemVEZWxheTogbnVtYmVyID0gMTA7XG5cbiAgICBfYXBwZW5kT25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX2lubGluZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX2xhenk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgX2xvYWRlckRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBfY29sdW1uczogYW55W10gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgX3Nob3dTcGFjZXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgX3Nob3dMb2FkZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF9udW1Ub2xlcmF0ZWRJdGVtczogYW55O1xuXG4gICAgX2xvYWRpbmc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBfYXV0b1NpemU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIF90cmFja0J5OiBhbnk7XG5cbiAgICBfb3B0aW9uczogU2Nyb2xsZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuXG4gICAgZF9sb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBkX251bVRvbGVyYXRlZEl0ZW1zOiBhbnk7XG5cbiAgICBjb250ZW50RWw6IGFueTtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBpdGVtVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbG9hZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgbG9hZGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZpcnN0OiBhbnkgPSAwO1xuXG4gICAgbGFzdDogYW55ID0gMDtcblxuICAgIHBhZ2U6IG51bWJlciA9IDA7XG5cbiAgICBpc1JhbmdlQ2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbnVtSXRlbXNJblZpZXdwb3J0OiBhbnkgPSAwO1xuXG4gICAgbGFzdFNjcm9sbFBvczogYW55ID0gMDtcblxuICAgIGxhenlMb2FkU3RhdGU6IGFueSA9IHt9O1xuXG4gICAgbG9hZGVyQXJyOiBhbnlbXSA9IFtdO1xuXG4gICAgc3BhY2VyU3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQgPSB7fTtcblxuICAgIGNvbnRlbnRTdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9IHt9O1xuXG4gICAgc2Nyb2xsVGltZW91dDogYW55O1xuXG4gICAgcmVzaXplVGltZW91dDogYW55O1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHdpbmRvd1Jlc2l6ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkZWZhdWx0V2lkdGg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGRlZmF1bHRIZWlnaHQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGRlZmF1bHRDb250ZW50V2lkdGg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGRlZmF1bHRDb250ZW50SGVpZ2h0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBnZXQgdmVydGljYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJztcbiAgICB9XG5cbiAgICBnZXQgaG9yaXpvbnRhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuXG4gICAgZ2V0IGJvdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ2JvdGgnO1xuICAgIH1cblxuICAgIGdldCBsb2FkZWRJdGVtcygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2l0ZW1zICYmICF0aGlzLmRfbG9hZGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYm90aCkgcmV0dXJuIHRoaXMuX2l0ZW1zLnNsaWNlKHRoaXMuX2FwcGVuZE9ubHkgPyAwIDogdGhpcy5maXJzdC5yb3dzLCB0aGlzLmxhc3Qucm93cykubWFwKChpdGVtKSA9PiAodGhpcy5fY29sdW1ucyA/IGl0ZW0gOiBpdGVtLnNsaWNlKHRoaXMuX2FwcGVuZE9ubHkgPyAwIDogdGhpcy5maXJzdC5jb2xzLCB0aGlzLmxhc3QuY29scykpKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaG9yaXpvbnRhbCAmJiB0aGlzLl9jb2x1bW5zKSByZXR1cm4gdGhpcy5faXRlbXM7XG4gICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLl9pdGVtcy5zbGljZSh0aGlzLl9hcHBlbmRPbmx5ID8gMCA6IHRoaXMuZmlyc3QsIHRoaXMubGFzdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgZ2V0IGxvYWRlZFJvd3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRfbG9hZGluZyA/ICh0aGlzLl9sb2FkZXJEaXNhYmxlZCA/IHRoaXMubG9hZGVyQXJyIDogW10pIDogdGhpcy5sb2FkZWRJdGVtcztcbiAgICB9XG5cbiAgICBnZXQgbG9hZGVkQ29sdW1ucygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbHVtbnMgJiYgKHRoaXMuYm90aCB8fCB0aGlzLmhvcml6b250YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kX2xvYWRpbmcgJiYgdGhpcy5fbG9hZGVyRGlzYWJsZWQgPyAodGhpcy5ib3RoID8gdGhpcy5sb2FkZXJBcnJbMF0gOiB0aGlzLmxvYWRlckFycikgOiB0aGlzLl9jb2x1bW5zLnNsaWNlKHRoaXMuYm90aCA/IHRoaXMuZmlyc3QuY29scyA6IHRoaXMuZmlyc3QsIHRoaXMuYm90aCA/IHRoaXMubGFzdC5jb2xzIDogdGhpcy5sYXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xuICAgIH1cblxuICAgIGdldCBpc1BhZ2VDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcCA/IHRoaXMucGFnZSAhPT0gdGhpcy5nZXRQYWdlQnlGaXJzdCgpIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBsZXQgaXNMb2FkaW5nQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2VzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlIH0gPSBzaW1wbGVDaGFuZ2VzLmxvYWRpbmc7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxhenkgJiYgcHJldmlvdXNWYWx1ZSAhPT0gY3VycmVudFZhbHVlICYmIGN1cnJlbnRWYWx1ZSAhPT0gdGhpcy5kX2xvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRfbG9hZGluZyA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICBpc0xvYWRpbmdDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2VzLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RTY3JvbGxQb3MgPSB0aGlzLmJvdGggPyB7IHRvcDogMCwgbGVmdDogMCB9IDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2VzLm51bVRvbGVyYXRlZEl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSB9ID0gc2ltcGxlQ2hhbmdlcy5udW1Ub2xlcmF0ZWRJdGVtcztcblxuICAgICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUgIT09IGN1cnJlbnRWYWx1ZSAmJiBjdXJyZW50VmFsdWUgIT09IHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2VzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlIH0gPSBzaW1wbGVDaGFuZ2VzLm9wdGlvbnM7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxhenkgJiYgcHJldmlvdXNWYWx1ZT8ubG9hZGluZyAhPT0gY3VycmVudFZhbHVlPy5sb2FkaW5nICYmIGN1cnJlbnRWYWx1ZT8ubG9hZGluZyAhPT0gdGhpcy5kX2xvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRfbG9hZGluZyA9IGN1cnJlbnRWYWx1ZS5sb2FkaW5nO1xuICAgICAgICAgICAgICAgIGlzTG9hZGluZ0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZT8ubnVtVG9sZXJhdGVkSXRlbXMgIT09IGN1cnJlbnRWYWx1ZT8ubnVtVG9sZXJhdGVkSXRlbXMgJiYgY3VycmVudFZhbHVlPy5udW1Ub2xlcmF0ZWRJdGVtcyAhPT0gdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zID0gY3VycmVudFZhbHVlLm51bVRvbGVyYXRlZEl0ZW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFpc0xvYWRpbmdDaGFuZ2VkICYmIChzaW1wbGVDaGFuZ2VzLml0ZW1zPy5wcmV2aW91c1ZhbHVlPy5sZW5ndGggIT09IHNpbXBsZUNoYW5nZXMuaXRlbXM/LmN1cnJlbnRWYWx1ZT8ubGVuZ3RoIHx8IHNpbXBsZUNoYW5nZXMuaXRlbVNpemUgfHwgc2ltcGxlQ2hhbmdlcy5zY3JvbGxIZWlnaHQgfHwgc2ltcGxlQ2hhbmdlcy5zY3JvbGxXaWR0aCk7XG5cbiAgICAgICAgICAgIGlmIChpc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZUF1dG9TaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVySWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3SW5pdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy52aWV3SW5pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kUmVzaXplTGlzdGVuZXIoKTtcblxuICAgICAgICB0aGlzLmNvbnRlbnRFbCA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2aWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmlzVmlzaWJsZSh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvbnRlbnRFbCh0aGlzLmNvbnRlbnRFbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRXaWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRlbnRXaWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbnRlbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldEhlaWdodCh0aGlzLmNvbnRlbnRFbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNpemUoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlT3B0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5zZXRTcGFjZXJTaXplKCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuXG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldENvbnRlbnRFbChlbD86IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsID0gZWwgfHwgdGhpcy5jb250ZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50IHx8IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQsICcucC1zY3JvbGxlci1jb250ZW50Jyk7XG4gICAgfVxuXG4gICAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xuICAgICAgICB0aGlzLmxhc3QgPSB0aGlzLmJvdGggPyB7IHJvd3M6IDAsIGNvbHM6IDAgfSA6IDA7XG4gICAgICAgIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0ID0gdGhpcy5ib3RoID8geyByb3dzOiAwLCBjb2xzOiAwIH0gOiAwO1xuICAgICAgICB0aGlzLmxhc3RTY3JvbGxQb3MgPSB0aGlzLmJvdGggPyB7IHRvcDogMCwgbGVmdDogMCB9IDogMDtcbiAgICAgICAgdGhpcy5kX2xvYWRpbmcgPSB0aGlzLl9sb2FkaW5nIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgPSB0aGlzLl9udW1Ub2xlcmF0ZWRJdGVtcztcbiAgICAgICAgdGhpcy5sb2FkZXJBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5zcGFjZXJTdHlsZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbnRlbnRTdHlsZSA9IHt9O1xuICAgIH1cblxuICAgIGdldEVsZW1lbnRSZWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUJ5Rmlyc3QoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCh0aGlzLmZpcnN0ICsgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zICogNCkgLyAodGhpcy5fc3RlcCB8fCAxKSk7XG4gICAgfVxuXG4gICAgc2Nyb2xsVG8ob3B0aW9uczogU2Nyb2xsVG9PcHRpb25zKSB7XG4gICAgICAgIHRoaXMubGFzdFNjcm9sbFBvcyA9IHRoaXMuYm90aCA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiAwO1xuICAgICAgICB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQ/LnNjcm9sbFRvKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNjcm9sbFRvSW5kZXgoaW5kZXg6IG51bWJlciwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yID0gJ2F1dG8nKSB7XG4gICAgICAgIGNvbnN0IHsgbnVtVG9sZXJhdGVkSXRlbXMgfSA9IHRoaXMuY2FsY3VsYXRlTnVtSXRlbXMoKTtcbiAgICAgICAgY29uc3QgY29udGVudFBvcyA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZUZpcnN0ID0gKF9pbmRleCA9IDAsIF9udW1UOiBudW1iZXIpID0+IChfaW5kZXggPD0gX251bVQgPyAwIDogX2luZGV4KTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlQ29vcmQgPSAoX2ZpcnN0OiBudW1iZXIsIF9zaXplOiBudW1iZXIsIF9jcG9zOiBudW1iZXIpID0+IF9maXJzdCAqIF9zaXplICsgX2Nwb3M7XG4gICAgICAgIGNvbnN0IHNjcm9sbFRvID0gKGxlZnQgPSAwLCB0b3AgPSAwKSA9PiB0aGlzLnNjcm9sbFRvKHsgbGVmdCwgdG9wLCBiZWhhdmlvciB9KTtcbiAgICAgICAgbGV0IG5ld0ZpcnN0OiBhbnkgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLmJvdGgpIHtcbiAgICAgICAgICAgIG5ld0ZpcnN0ID0geyByb3dzOiBjYWxjdWxhdGVGaXJzdCgoPGFueT5pbmRleClbMF0sIG51bVRvbGVyYXRlZEl0ZW1zWzBdKSwgY29sczogY2FsY3VsYXRlRmlyc3QoKDxhbnk+aW5kZXgpWzFdLCBudW1Ub2xlcmF0ZWRJdGVtc1sxXSkgfTtcbiAgICAgICAgICAgIHNjcm9sbFRvKGNhbGN1bGF0ZUNvb3JkKG5ld0ZpcnN0LmNvbHMsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdLCBjb250ZW50UG9zLmxlZnQpLCBjYWxjdWxhdGVDb29yZChuZXdGaXJzdC5yb3dzLCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVswXSwgY29udGVudFBvcy50b3ApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0ZpcnN0ID0gY2FsY3VsYXRlRmlyc3QoaW5kZXgsIG51bVRvbGVyYXRlZEl0ZW1zKTtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbCA/IHNjcm9sbFRvKGNhbGN1bGF0ZUNvb3JkKG5ld0ZpcnN0LCA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplLCBjb250ZW50UG9zLmxlZnQpLCAwKSA6IHNjcm9sbFRvKDAsIGNhbGN1bGF0ZUNvb3JkKG5ld0ZpcnN0LCA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplLCBjb250ZW50UG9zLnRvcCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc1JhbmdlQ2hhbmdlZCA9IHRoaXMuZmlyc3QgIT09IG5ld0ZpcnN0O1xuICAgICAgICB0aGlzLmZpcnN0ID0gbmV3Rmlyc3Q7XG4gICAgfVxuXG4gICAgc2Nyb2xsSW5WaWV3KGluZGV4OiBudW1iZXIsIHRvOiBTY3JvbGxlclRvVHlwZSwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yID0gJ2F1dG8nKSB7XG4gICAgICAgIGlmICh0bykge1xuICAgICAgICAgICAgY29uc3QgeyBmaXJzdCwgdmlld3BvcnQgfSA9IHRoaXMuZ2V0UmVuZGVyZWRSYW5nZSgpO1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsVG8gPSAobGVmdCA9IDAsIHRvcCA9IDApID0+IHRoaXMuc2Nyb2xsVG8oeyBsZWZ0LCB0b3AsIGJlaGF2aW9yIH0pO1xuICAgICAgICAgICAgY29uc3QgaXNUb1N0YXJ0ID0gdG8gPT09ICd0by1zdGFydCc7XG4gICAgICAgICAgICBjb25zdCBpc1RvRW5kID0gdG8gPT09ICd0by1lbmQnO1xuXG4gICAgICAgICAgICBpZiAoaXNUb1N0YXJ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlld3BvcnQuZmlyc3Qucm93cyAtIGZpcnN0LnJvd3MgPiAoPGFueT5pbmRleClbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKHZpZXdwb3J0LmZpcnN0LmNvbHMgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSwgKHZpZXdwb3J0LmZpcnN0LnJvd3MgLSAxKSAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3cG9ydC5maXJzdC5jb2xzIC0gZmlyc3QuY29scyA+ICg8YW55PmluZGV4KVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG8oKHZpZXdwb3J0LmZpcnN0LmNvbHMgLSAxKSAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdLCB2aWV3cG9ydC5maXJzdC5yb3dzICogKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdwb3J0LmZpcnN0IC0gZmlyc3QgPiBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zID0gKHZpZXdwb3J0LmZpcnN0IC0gMSkgKiA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsID8gc2Nyb2xsVG8ocG9zLCAwKSA6IHNjcm9sbFRvKDAsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzVG9FbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ib3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydC5sYXN0LnJvd3MgLSBmaXJzdC5yb3dzIDw9ICg8YW55PmluZGV4KVswXSArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKHZpZXdwb3J0LmZpcnN0LmNvbHMgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSwgKHZpZXdwb3J0LmZpcnN0LnJvd3MgKyAxKSAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aWV3cG9ydC5sYXN0LmNvbHMgLSBmaXJzdC5jb2xzIDw9ICg8YW55PmluZGV4KVsxXSArIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvKCh2aWV3cG9ydC5maXJzdC5jb2xzICsgMSkgKiAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVsxXSwgdmlld3BvcnQuZmlyc3Qucm93cyAqICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3cG9ydC5sYXN0IC0gZmlyc3QgPD0gaW5kZXggKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSAodmlld3BvcnQuZmlyc3QgKyAxKSAqIDxudW1iZXI+dGhpcy5faXRlbVNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPyBzY3JvbGxUbyhwb3MsIDApIDogc2Nyb2xsVG8oMCwgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9JbmRleChpbmRleCwgYmVoYXZpb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UmVuZGVyZWRSYW5nZSgpIHtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlRmlyc3RJblZpZXdwb3J0ID0gKF9wb3M6IG51bWJlciwgX3NpemU6IG51bWJlcikgPT4gTWF0aC5mbG9vcihfcG9zIC8gKF9zaXplIHx8IF9wb3MpKTtcblxuICAgICAgICBsZXQgZmlyc3RJblZpZXdwb3J0ID0gdGhpcy5maXJzdDtcbiAgICAgICAgbGV0IGxhc3RJblZpZXdwb3J0OiBhbnkgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0IH0gPSB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgICAgIGZpcnN0SW5WaWV3cG9ydCA9IHsgcm93czogY2FsY3VsYXRlRmlyc3RJblZpZXdwb3J0KHNjcm9sbFRvcCwgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMF0pLCBjb2xzOiBjYWxjdWxhdGVGaXJzdEluVmlld3BvcnQoc2Nyb2xsTGVmdCwgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMV0pIH07XG4gICAgICAgICAgICAgICAgbGFzdEluVmlld3BvcnQgPSB7IHJvd3M6IGZpcnN0SW5WaWV3cG9ydC5yb3dzICsgdGhpcy5udW1JdGVtc0luVmlld3BvcnQucm93cywgY29sczogZmlyc3RJblZpZXdwb3J0LmNvbHMgKyB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5jb2xzIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbFBvcyA9IHRoaXMuaG9yaXpvbnRhbCA/IHNjcm9sbExlZnQgOiBzY3JvbGxUb3A7XG4gICAgICAgICAgICAgICAgZmlyc3RJblZpZXdwb3J0ID0gY2FsY3VsYXRlRmlyc3RJblZpZXdwb3J0KHNjcm9sbFBvcywgPG51bWJlcj50aGlzLl9pdGVtU2l6ZSk7XG4gICAgICAgICAgICAgICAgbGFzdEluVmlld3BvcnQgPSBmaXJzdEluVmlld3BvcnQgKyB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIGxhc3Q6IHRoaXMubGFzdCxcbiAgICAgICAgICAgIHZpZXdwb3J0OiB7XG4gICAgICAgICAgICAgICAgZmlyc3Q6IGZpcnN0SW5WaWV3cG9ydCxcbiAgICAgICAgICAgICAgICBsYXN0OiBsYXN0SW5WaWV3cG9ydFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZU51bUl0ZW1zKCkge1xuICAgICAgICBjb25zdCBjb250ZW50UG9zID0gdGhpcy5nZXRDb250ZW50UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgY29udGVudFdpZHRoID0gKHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCA/IHRoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC0gY29udGVudFBvcy5sZWZ0IDogMCkgfHwgMDtcbiAgICAgICAgY29uc3QgY29udGVudEhlaWdodCA9ICh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQgPyB0aGlzLmVsZW1lbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgLSBjb250ZW50UG9zLnRvcCA6IDApIHx8IDA7XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZU51bUl0ZW1zSW5WaWV3cG9ydCA9IChfY29udGVudFNpemU6IG51bWJlciwgX2l0ZW1TaXplOiBudW1iZXIpID0+IE1hdGguY2VpbChfY29udGVudFNpemUgLyAoX2l0ZW1TaXplIHx8IF9jb250ZW50U2l6ZSkpO1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVOdW1Ub2xlcmF0ZWRJdGVtcyA9IChfbnVtSXRlbXM6IG51bWJlcikgPT4gTWF0aC5jZWlsKF9udW1JdGVtcyAvIDIpO1xuICAgICAgICBjb25zdCBudW1JdGVtc0luVmlld3BvcnQ6IGFueSA9IHRoaXMuYm90aFxuICAgICAgICAgICAgPyB7IHJvd3M6IGNhbGN1bGF0ZU51bUl0ZW1zSW5WaWV3cG9ydChjb250ZW50SGVpZ2h0LCAoPG51bWJlcltdPnRoaXMuX2l0ZW1TaXplKVswXSksIGNvbHM6IGNhbGN1bGF0ZU51bUl0ZW1zSW5WaWV3cG9ydChjb250ZW50V2lkdGgsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdKSB9XG4gICAgICAgICAgICA6IGNhbGN1bGF0ZU51bUl0ZW1zSW5WaWV3cG9ydCh0aGlzLmhvcml6b250YWwgPyBjb250ZW50V2lkdGggOiBjb250ZW50SGVpZ2h0LCA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplKTtcblxuICAgICAgICBjb25zdCBudW1Ub2xlcmF0ZWRJdGVtcyA9IHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyB8fCAodGhpcy5ib3RoID8gW2NhbGN1bGF0ZU51bVRvbGVyYXRlZEl0ZW1zKG51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzKSwgY2FsY3VsYXRlTnVtVG9sZXJhdGVkSXRlbXMobnVtSXRlbXNJblZpZXdwb3J0LmNvbHMpXSA6IGNhbGN1bGF0ZU51bVRvbGVyYXRlZEl0ZW1zKG51bUl0ZW1zSW5WaWV3cG9ydCkpO1xuXG4gICAgICAgIHJldHVybiB7IG51bUl0ZW1zSW5WaWV3cG9ydCwgbnVtVG9sZXJhdGVkSXRlbXMgfTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVPcHRpb25zKCkge1xuICAgICAgICBjb25zdCB7IG51bUl0ZW1zSW5WaWV3cG9ydCwgbnVtVG9sZXJhdGVkSXRlbXMgfSA9IHRoaXMuY2FsY3VsYXRlTnVtSXRlbXMoKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlTGFzdCA9IChfZmlyc3Q6IG51bWJlciwgX251bTogbnVtYmVyLCBfbnVtVDogbnVtYmVyLCBfaXNDb2xzOiBib29sZWFuID0gZmFsc2UpID0+IHRoaXMuZ2V0TGFzdChfZmlyc3QgKyBfbnVtICsgKF9maXJzdCA8IF9udW1UID8gMiA6IDMpICogX251bVQsIF9pc0NvbHMpO1xuICAgICAgICBjb25zdCBmaXJzdCA9IHRoaXMuZmlyc3Q7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLmJvdGhcbiAgICAgICAgICAgID8geyByb3dzOiBjYWxjdWxhdGVMYXN0KHRoaXMuZmlyc3Qucm93cywgbnVtSXRlbXNJblZpZXdwb3J0LnJvd3MsIG51bVRvbGVyYXRlZEl0ZW1zWzBdKSwgY29sczogY2FsY3VsYXRlTGFzdCh0aGlzLmZpcnN0LmNvbHMsIG51bUl0ZW1zSW5WaWV3cG9ydC5jb2xzLCBudW1Ub2xlcmF0ZWRJdGVtc1sxXSwgdHJ1ZSkgfVxuICAgICAgICAgICAgOiBjYWxjdWxhdGVMYXN0KHRoaXMuZmlyc3QsIG51bUl0ZW1zSW5WaWV3cG9ydCwgbnVtVG9sZXJhdGVkSXRlbXMpO1xuXG4gICAgICAgIHRoaXMubGFzdCA9IGxhc3Q7XG4gICAgICAgIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0ID0gbnVtSXRlbXNJblZpZXdwb3J0O1xuICAgICAgICB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMgPSBudW1Ub2xlcmF0ZWRJdGVtcztcblxuICAgICAgICBpZiAodGhpcy5zaG93TG9hZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlckFyciA9IHRoaXMuYm90aCA/IEFycmF5LmZyb20oeyBsZW5ndGg6IG51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzIH0pLm1hcCgoKSA9PiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBudW1JdGVtc0luVmlld3BvcnQuY29scyB9KSkgOiBBcnJheS5mcm9tKHsgbGVuZ3RoOiBudW1JdGVtc0luVmlld3BvcnQgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbGF6eSkge1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXp5TG9hZFN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdDogdGhpcy5fc3RlcCA/ICh0aGlzLmJvdGggPyB7IHJvd3M6IDAsIGNvbHM6IGZpcnN0LmNvbHMgfSA6IDApIDogZmlyc3QsXG4gICAgICAgICAgICAgICAgICAgIGxhc3Q6IE1hdGgubWluKHRoaXMuX3N0ZXAgPyB0aGlzLl9zdGVwIDogdGhpcy5sYXN0LCAoPGFueVtdPnRoaXMuaXRlbXMpLmxlbmd0aClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFdmVudHMoJ29uTGF6eUxvYWQnLCB0aGlzLmxhenlMb2FkU3RhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjdWxhdGVBdXRvU2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9TaXplICYmICF0aGlzLmRfbG9hZGluZykge1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudEVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLm1pbkhlaWdodCA9IHRoaXMuY29udGVudEVsLnN0eWxlLm1pbldpZHRoID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY29udGFpbiA9ICdub25lJztcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBbY29udGVudFdpZHRoLCBjb250ZW50SGVpZ2h0XSA9IFtEb21IYW5kbGVyLmdldFdpZHRoKHRoaXMuY29udGVudEVsKSwgRG9tSGFuZGxlci5nZXRIZWlnaHQodGhpcy5jb250ZW50RWwpXTtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFdpZHRoICE9PSB0aGlzLmRlZmF1bHRDb250ZW50V2lkdGggJiYgKCg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRIZWlnaHQgIT09IHRoaXMuZGVmYXVsdENvbnRlbnRIZWlnaHQgJiYgKCg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJycpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFt3aWR0aCwgaGVpZ2h0XSA9IFtEb21IYW5kbGVyLmdldFdpZHRoKCg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQpLCBEb21IYW5kbGVyLmdldEhlaWdodCgoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50KV07XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmJvdGggfHwgdGhpcy5ob3Jpem9udGFsKSAmJiAoKDxFbGVtZW50UmVmPnRoaXMuZWxlbWVudFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoIDwgPG51bWJlcj50aGlzLmRlZmF1bHRXaWR0aCA/IHdpZHRoICsgJ3B4JyA6IHRoaXMuX3Njcm9sbFdpZHRoIHx8IHRoaXMuZGVmYXVsdFdpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmJvdGggfHwgdGhpcy52ZXJ0aWNhbCkgJiYgKCg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0IDwgPG51bWJlcj50aGlzLmRlZmF1bHRIZWlnaHQgPyBoZWlnaHQgKyAncHgnIDogdGhpcy5fc2Nyb2xsSGVpZ2h0IHx8IHRoaXMuZGVmYXVsdEhlaWdodCArICdweCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLm1pbkhlaWdodCA9IHRoaXMuY29udGVudEVsLnN0eWxlLm1pbldpZHRoID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLmVsZW1lbnRWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuY29udGFpbiA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGFzdChsYXN0ID0gMCwgaXNDb2xzID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zID8gTWF0aC5taW4oaXNDb2xzID8gKHRoaXMuX2NvbHVtbnMgfHwgdGhpcy5faXRlbXNbMF0pLmxlbmd0aCA6IHRoaXMuX2l0ZW1zLmxlbmd0aCwgbGFzdCkgOiAwO1xuICAgIH1cblxuICAgIGdldENvbnRlbnRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudEVsKSB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5jb250ZW50RWwpO1xuICAgICAgICAgICAgY29uc3QgbGVmdCA9IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0xlZnQpICsgTWF0aC5tYXgocGFyc2VGbG9hdChzdHlsZS5sZWZ0KSB8fCAwLCAwKTtcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nUmlnaHQpICsgTWF0aC5tYXgocGFyc2VGbG9hdChzdHlsZS5yaWdodCkgfHwgMCwgMCk7XG4gICAgICAgICAgICBjb25zdCB0b3AgPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdUb3ApICsgTWF0aC5tYXgocGFyc2VGbG9hdChzdHlsZS50b3ApIHx8IDAsIDApO1xuICAgICAgICAgICAgY29uc3QgYm90dG9tID0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nQm90dG9tKSArIE1hdGgubWF4KHBhcnNlRmxvYXQoc3R5bGUuYm90dG9tKSB8fCAwLCAwKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tLCB4OiBsZWZ0ICsgcmlnaHQsIHk6IHRvcCArIGJvdHRvbSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgbGVmdDogMCwgcmlnaHQ6IDAsIHRvcDogMCwgYm90dG9tOiAwLCB4OiAwLCB5OiAwIH07XG4gICAgfVxuXG4gICAgc2V0U2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudFZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMuZWxlbWVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5fc2Nyb2xsV2lkdGggfHwgYCR7dGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgcGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aH1weGA7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLl9zY3JvbGxIZWlnaHQgfHwgYCR7dGhpcy5lbGVtZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IHBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgICAgICAgICAgIGNvbnN0IHNldFByb3AgPSAoX25hbWU6IHN0cmluZywgX3ZhbHVlOiBhbnkpID0+ICgoPEVsZW1lbnRSZWY+dGhpcy5lbGVtZW50Vmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlW19uYW1lXSA9IF92YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJvdGggfHwgdGhpcy5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgc2V0UHJvcCgnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBzZXRQcm9wKCd3aWR0aCcsIHdpZHRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0UHJvcCgnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFNwYWNlclNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcykge1xuICAgICAgICAgICAgY29uc3QgY29udGVudFBvcyA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBzZXRQcm9wID0gKF9uYW1lOiBzdHJpbmcsIF92YWx1ZTogYW55LCBfc2l6ZTogbnVtYmVyLCBfY3BvczogbnVtYmVyID0gMCkgPT4gKHRoaXMuc3BhY2VyU3R5bGUgPSB7IC4uLnRoaXMuc3BhY2VyU3R5bGUsIC4uLnsgW2Ake19uYW1lfWBdOiAoX3ZhbHVlIHx8IFtdKS5sZW5ndGggKiBfc2l6ZSArIF9jcG9zICsgJ3B4JyB9IH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5ib3RoKSB7XG4gICAgICAgICAgICAgICAgc2V0UHJvcCgnaGVpZ2h0JywgdGhpcy5faXRlbXMsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdLCBjb250ZW50UG9zLnkpO1xuICAgICAgICAgICAgICAgIHNldFByb3AoJ3dpZHRoJywgdGhpcy5fY29sdW1ucyB8fCB0aGlzLl9pdGVtc1sxXSwgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMV0sIGNvbnRlbnRQb3MueCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbCA/IHNldFByb3AoJ3dpZHRoJywgdGhpcy5fY29sdW1ucyB8fCB0aGlzLl9pdGVtcywgPG51bWJlcj50aGlzLl9pdGVtU2l6ZSwgY29udGVudFBvcy54KSA6IHNldFByb3AoJ2hlaWdodCcsIHRoaXMuX2l0ZW1zLCA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplLCBjb250ZW50UG9zLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29udGVudFBvc2l0aW9uKHBvczogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRFbCAmJiAhdGhpcy5fYXBwZW5kT25seSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSBwb3MgPyBwb3MuZmlyc3QgOiB0aGlzLmZpcnN0O1xuICAgICAgICAgICAgY29uc3QgY2FsY3VsYXRlVHJhbnNsYXRlVmFsID0gKF9maXJzdDogbnVtYmVyLCBfc2l6ZTogbnVtYmVyKSA9PiBfZmlyc3QgKiBfc2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IHNldFRyYW5zZm9ybSA9IChfeCA9IDAsIF95ID0gMCkgPT4gKHRoaXMuY29udGVudFN0eWxlID0geyAuLi50aGlzLmNvbnRlbnRTdHlsZSwgLi4ueyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke194fXB4LCAke195fXB4LCAwKWAgfSB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYm90aCkge1xuICAgICAgICAgICAgICAgIHNldFRyYW5zZm9ybShjYWxjdWxhdGVUcmFuc2xhdGVWYWwoZmlyc3QuY29scywgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMV0pLCBjYWxjdWxhdGVUcmFuc2xhdGVWYWwoZmlyc3Qucm93cywgKDxudW1iZXJbXT50aGlzLl9pdGVtU2l6ZSlbMF0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlVmFsID0gY2FsY3VsYXRlVHJhbnNsYXRlVmFsKGZpcnN0LCA8bnVtYmVyPnRoaXMuX2l0ZW1TaXplKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgPyBzZXRUcmFuc2Zvcm0odHJhbnNsYXRlVmFsLCAwKSA6IHNldFRyYW5zZm9ybSgwLCB0cmFuc2xhdGVWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TY3JvbGxQb3NpdGlvbkNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBjb250ZW50UG9zID0gdGhpcy5nZXRDb250ZW50UG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlU2Nyb2xsUG9zID0gKF9wb3M6IG51bWJlciwgX2Nwb3M6IG51bWJlcikgPT4gKF9wb3MgPyAoX3BvcyA+IF9jcG9zID8gX3BvcyAtIF9jcG9zIDogX3BvcykgOiAwKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlQ3VycmVudEluZGV4ID0gKF9wb3M6IG51bWJlciwgX3NpemU6IG51bWJlcikgPT4gTWF0aC5mbG9vcihfcG9zIC8gKF9zaXplIHx8IF9wb3MpKTtcbiAgICAgICAgY29uc3QgY2FsY3VsYXRlVHJpZ2dlckluZGV4ID0gKF9jdXJyZW50SW5kZXg6IG51bWJlciwgX2ZpcnN0OiBudW1iZXIsIF9sYXN0OiBudW1iZXIsIF9udW06IG51bWJlciwgX251bVQ6IG51bWJlciwgX2lzU2Nyb2xsRG93bk9yUmlnaHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIF9jdXJyZW50SW5kZXggPD0gX251bVQgPyBfbnVtVCA6IF9pc1Njcm9sbERvd25PclJpZ2h0ID8gX2xhc3QgLSBfbnVtIC0gX251bVQgOiBfZmlyc3QgKyBfbnVtVCAtIDE7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZUZpcnN0ID0gKF9jdXJyZW50SW5kZXg6IG51bWJlciwgX3RyaWdnZXJJbmRleDogbnVtYmVyLCBfZmlyc3Q6IG51bWJlciwgX2xhc3Q6IG51bWJlciwgX251bTogbnVtYmVyLCBfbnVtVDogbnVtYmVyLCBfaXNTY3JvbGxEb3duT3JSaWdodDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoX2N1cnJlbnRJbmRleCA8PSBfbnVtVCkgcmV0dXJuIDA7XG4gICAgICAgICAgICBlbHNlIHJldHVybiBNYXRoLm1heCgwLCBfaXNTY3JvbGxEb3duT3JSaWdodCA/IChfY3VycmVudEluZGV4IDwgX3RyaWdnZXJJbmRleCA/IF9maXJzdCA6IF9jdXJyZW50SW5kZXggLSBfbnVtVCkgOiBfY3VycmVudEluZGV4ID4gX3RyaWdnZXJJbmRleCA/IF9maXJzdCA6IF9jdXJyZW50SW5kZXggLSAyICogX251bVQpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjYWxjdWxhdGVMYXN0ID0gKF9jdXJyZW50SW5kZXg6IG51bWJlciwgX2ZpcnN0OiBudW1iZXIsIF9sYXN0OiBudW1iZXIsIF9udW06IG51bWJlciwgX251bVQ6IG51bWJlciwgX2lzQ29scyA9IGZhbHNlKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGFzdFZhbHVlID0gX2ZpcnN0ICsgX251bSArIDIgKiBfbnVtVDtcblxuICAgICAgICAgICAgaWYgKF9jdXJyZW50SW5kZXggPj0gX251bVQpIHtcbiAgICAgICAgICAgICAgICBsYXN0VmFsdWUgKz0gX251bVQgKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMYXN0KGxhc3RWYWx1ZSwgX2lzQ29scyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gY2FsY3VsYXRlU2Nyb2xsUG9zKCg8SFRNTEVsZW1lbnQ+dGFyZ2V0KS5zY3JvbGxUb3AsIGNvbnRlbnRQb3MudG9wKTtcbiAgICAgICAgY29uc3Qgc2Nyb2xsTGVmdCA9IGNhbGN1bGF0ZVNjcm9sbFBvcygoPEhUTUxFbGVtZW50PnRhcmdldCkuc2Nyb2xsTGVmdCwgY29udGVudFBvcy5sZWZ0KTtcblxuICAgICAgICBsZXQgbmV3Rmlyc3QgPSB0aGlzLmJvdGggPyB7IHJvd3M6IDAsIGNvbHM6IDAgfSA6IDA7XG4gICAgICAgIGxldCBuZXdMYXN0ID0gdGhpcy5sYXN0O1xuICAgICAgICBsZXQgaXNSYW5nZUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5ld1Njcm9sbFBvcyA9IHRoaXMubGFzdFNjcm9sbFBvcztcblxuICAgICAgICBpZiAodGhpcy5ib3RoKSB7XG4gICAgICAgICAgICBjb25zdCBpc1Njcm9sbERvd24gPSB0aGlzLmxhc3RTY3JvbGxQb3MudG9wIDw9IHNjcm9sbFRvcDtcbiAgICAgICAgICAgIGNvbnN0IGlzU2Nyb2xsUmlnaHQgPSB0aGlzLmxhc3RTY3JvbGxQb3MubGVmdCA8PSBzY3JvbGxMZWZ0O1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2FwcGVuZE9ubHkgfHwgKHRoaXMuX2FwcGVuZE9ubHkgJiYgKGlzU2Nyb2xsRG93biB8fCBpc1Njcm9sbFJpZ2h0KSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB7IHJvd3M6IGNhbGN1bGF0ZUN1cnJlbnRJbmRleChzY3JvbGxUb3AsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzBdKSwgY29sczogY2FsY3VsYXRlQ3VycmVudEluZGV4KHNjcm9sbExlZnQsICg8bnVtYmVyW10+dGhpcy5faXRlbVNpemUpWzFdKSB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJJbmRleCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcm93czogY2FsY3VsYXRlVHJpZ2dlckluZGV4KGN1cnJlbnRJbmRleC5yb3dzLCB0aGlzLmZpcnN0LnJvd3MsIHRoaXMubGFzdC5yb3dzLCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzLCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXNbMF0sIGlzU2Nyb2xsRG93biksXG4gICAgICAgICAgICAgICAgICAgIGNvbHM6IGNhbGN1bGF0ZVRyaWdnZXJJbmRleChjdXJyZW50SW5kZXguY29scywgdGhpcy5maXJzdC5jb2xzLCB0aGlzLmxhc3QuY29scywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQuY29scywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzFdLCBpc1Njcm9sbFJpZ2h0KVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBuZXdGaXJzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcm93czogY2FsY3VsYXRlRmlyc3QoY3VycmVudEluZGV4LnJvd3MsIHRyaWdnZXJJbmRleC5yb3dzLCB0aGlzLmZpcnN0LnJvd3MsIHRoaXMubGFzdC5yb3dzLCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5yb3dzLCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXNbMF0sIGlzU2Nyb2xsRG93biksXG4gICAgICAgICAgICAgICAgICAgIGNvbHM6IGNhbGN1bGF0ZUZpcnN0KGN1cnJlbnRJbmRleC5jb2xzLCB0cmlnZ2VySW5kZXguY29scywgdGhpcy5maXJzdC5jb2xzLCB0aGlzLmxhc3QuY29scywgdGhpcy5udW1JdGVtc0luVmlld3BvcnQuY29scywgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zWzFdLCBpc1Njcm9sbFJpZ2h0KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbmV3TGFzdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgcm93czogY2FsY3VsYXRlTGFzdChjdXJyZW50SW5kZXgucm93cywgbmV3Rmlyc3Qucm93cywgdGhpcy5sYXN0LnJvd3MsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LnJvd3MsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtc1swXSksXG4gICAgICAgICAgICAgICAgICAgIGNvbHM6IGNhbGN1bGF0ZUxhc3QoY3VycmVudEluZGV4LmNvbHMsIG5ld0ZpcnN0LmNvbHMsIHRoaXMubGFzdC5jb2xzLCB0aGlzLm51bUl0ZW1zSW5WaWV3cG9ydC5jb2xzLCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXNbMV0sIHRydWUpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlzUmFuZ2VDaGFuZ2VkID0gbmV3Rmlyc3Qucm93cyAhPT0gdGhpcy5maXJzdC5yb3dzIHx8IG5ld0xhc3Qucm93cyAhPT0gdGhpcy5sYXN0LnJvd3MgfHwgbmV3Rmlyc3QuY29scyAhPT0gdGhpcy5maXJzdC5jb2xzIHx8IG5ld0xhc3QuY29scyAhPT0gdGhpcy5sYXN0LmNvbHMgfHwgdGhpcy5pc1JhbmdlQ2hhbmdlZDtcbiAgICAgICAgICAgICAgICBuZXdTY3JvbGxQb3MgPSB7IHRvcDogc2Nyb2xsVG9wLCBsZWZ0OiBzY3JvbGxMZWZ0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGxQb3MgPSB0aGlzLmhvcml6b250YWwgPyBzY3JvbGxMZWZ0IDogc2Nyb2xsVG9wO1xuICAgICAgICAgICAgY29uc3QgaXNTY3JvbGxEb3duT3JSaWdodCA9IHRoaXMubGFzdFNjcm9sbFBvcyA8PSBzY3JvbGxQb3M7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5fYXBwZW5kT25seSB8fCAodGhpcy5fYXBwZW5kT25seSAmJiBpc1Njcm9sbERvd25PclJpZ2h0KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGNhbGN1bGF0ZUN1cnJlbnRJbmRleChzY3JvbGxQb3MsIDxudW1iZXI+dGhpcy5faXRlbVNpemUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJJbmRleCA9IGNhbGN1bGF0ZVRyaWdnZXJJbmRleChjdXJyZW50SW5kZXgsIHRoaXMuZmlyc3QsIHRoaXMubGFzdCwgdGhpcy5udW1JdGVtc0luVmlld3BvcnQsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcywgaXNTY3JvbGxEb3duT3JSaWdodCk7XG5cbiAgICAgICAgICAgICAgICBuZXdGaXJzdCA9IGNhbGN1bGF0ZUZpcnN0KGN1cnJlbnRJbmRleCwgdHJpZ2dlckluZGV4LCB0aGlzLmZpcnN0LCB0aGlzLmxhc3QsIHRoaXMubnVtSXRlbXNJblZpZXdwb3J0LCB0aGlzLmRfbnVtVG9sZXJhdGVkSXRlbXMsIGlzU2Nyb2xsRG93bk9yUmlnaHQpO1xuICAgICAgICAgICAgICAgIG5ld0xhc3QgPSBjYWxjdWxhdGVMYXN0KGN1cnJlbnRJbmRleCwgbmV3Rmlyc3QsIHRoaXMubGFzdCwgdGhpcy5udW1JdGVtc0luVmlld3BvcnQsIHRoaXMuZF9udW1Ub2xlcmF0ZWRJdGVtcyk7XG4gICAgICAgICAgICAgICAgaXNSYW5nZUNoYW5nZWQgPSBuZXdGaXJzdCAhPT0gdGhpcy5maXJzdCB8fCBuZXdMYXN0ICE9PSB0aGlzLmxhc3QgfHwgdGhpcy5pc1JhbmdlQ2hhbmdlZDtcbiAgICAgICAgICAgICAgICBuZXdTY3JvbGxQb3MgPSBzY3JvbGxQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlyc3Q6IG5ld0ZpcnN0LFxuICAgICAgICAgICAgbGFzdDogbmV3TGFzdCxcbiAgICAgICAgICAgIGlzUmFuZ2VDaGFuZ2VkLFxuICAgICAgICAgICAgc2Nyb2xsUG9zOiBuZXdTY3JvbGxQb3NcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvblNjcm9sbENoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBmaXJzdCwgbGFzdCwgaXNSYW5nZUNoYW5nZWQsIHNjcm9sbFBvcyB9ID0gdGhpcy5vblNjcm9sbFBvc2l0aW9uQ2hhbmdlKGV2ZW50KTtcblxuICAgICAgICBpZiAoaXNSYW5nZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0geyBmaXJzdCwgbGFzdCB9O1xuXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRQb3NpdGlvbihuZXdTdGF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSBmaXJzdDtcbiAgICAgICAgICAgIHRoaXMubGFzdCA9IGxhc3Q7XG4gICAgICAgICAgICB0aGlzLmxhc3RTY3JvbGxQb3MgPSBzY3JvbGxQb3M7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXZlbnRzKCdvblNjcm9sbEluZGV4Q2hhbmdlJywgbmV3U3RhdGUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbGF6eSAmJiB0aGlzLmlzUGFnZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXp5TG9hZFN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdDogdGhpcy5fc3RlcCA/IE1hdGgubWluKHRoaXMuZ2V0UGFnZUJ5Rmlyc3QoKSAqIHRoaXMuX3N0ZXAsICg8YW55W10+dGhpcy5pdGVtcykubGVuZ3RoIC0gdGhpcy5fc3RlcCkgOiBmaXJzdCxcbiAgICAgICAgICAgICAgICAgICAgbGFzdDogTWF0aC5taW4odGhpcy5fc3RlcCA/ICh0aGlzLmdldFBhZ2VCeUZpcnN0KCkgKyAxKSAqIHRoaXMuX3N0ZXAgOiBsYXN0LCAoPGFueVtdPnRoaXMuaXRlbXMpLmxlbmd0aClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzTGF6eVN0YXRlQ2hhbmdlZCA9IHRoaXMubGF6eUxvYWRTdGF0ZS5maXJzdCAhPT0gbGF6eUxvYWRTdGF0ZS5maXJzdCB8fCB0aGlzLmxhenlMb2FkU3RhdGUubGFzdCAhPT0gbGF6eUxvYWRTdGF0ZS5sYXN0O1xuXG4gICAgICAgICAgICAgICAgaXNMYXp5U3RhdGVDaGFuZ2VkICYmIHRoaXMuaGFuZGxlRXZlbnRzKCdvbkxhenlMb2FkJywgbGF6eUxvYWRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXp5TG9hZFN0YXRlID0gbGF6eUxvYWRTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29udGFpbmVyU2Nyb2xsKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmhhbmRsZUV2ZW50cygnb25TY3JvbGwnLCB7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50IH0pO1xuXG4gICAgICAgIGlmICh0aGlzLl9kZWxheSAmJiB0aGlzLmlzUGFnZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxUaW1lb3V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmRfbG9hZGluZyAmJiB0aGlzLnNob3dMb2FkZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlzUmFuZ2VDaGFuZ2VkIH0gPSB0aGlzLm9uU2Nyb2xsUG9zaXRpb25DaGFuZ2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBpc1JhbmdlQ2hhbmdlZCB8fCAodGhpcy5fc3RlcCA/IHRoaXMuaXNQYWdlQ2hhbmdlZCA6IGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZF9sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25TY3JvbGxDaGFuZ2UoZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZF9sb2FkaW5nICYmIHRoaXMuc2hvd0xvYWRlciAmJiAoIXRoaXMuX2xhenkgfHwgdGhpcy5fbG9hZGluZyA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRfbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2UgPSB0aGlzLmdldFBhZ2VCeUZpcnN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMuX2RlbGF5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICF0aGlzLmRfbG9hZGluZyAmJiB0aGlzLm9uU2Nyb2xsQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRSZXNpemVMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpbmRvdyA9IHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgV2luZG93O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IERvbUhhbmRsZXIuaXNUb3VjaERldmljZSgpID8gJ29yaWVudGF0aW9uY2hhbmdlJyA6ICdyZXNpemUnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4od2luZG93LCBldmVudCwgdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmlzVmlzaWJsZSh0aGlzLmVsZW1lbnRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgW3dpZHRoLCBoZWlnaHRdID0gW0RvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KSwgRG9tSGFuZGxlci5nZXRIZWlnaHQodGhpcy5lbGVtZW50Vmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KV07XG4gICAgICAgICAgICAgICAgY29uc3QgW2lzRGlmZldpZHRoLCBpc0RpZmZIZWlnaHRdID0gW3dpZHRoICE9PSB0aGlzLmRlZmF1bHRXaWR0aCwgaGVpZ2h0ICE9PSB0aGlzLmRlZmF1bHRIZWlnaHRdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlaW5pdCA9IHRoaXMuYm90aCA/IGlzRGlmZldpZHRoIHx8IGlzRGlmZkhlaWdodCA6IHRoaXMuaG9yaXpvbnRhbCA/IGlzRGlmZldpZHRoIDogdGhpcy52ZXJ0aWNhbCA/IGlzRGlmZkhlaWdodCA6IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmVpbml0ICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kX251bVRvbGVyYXRlZEl0ZW1zID0gdGhpcy5fbnVtVG9sZXJhdGVkSXRlbXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q29udGVudFdpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmNvbnRlbnRFbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRDb250ZW50SGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRIZWlnaHQodGhpcy5jb250ZW50RWwpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMuX3Jlc2l6ZURlbGF5KTtcbiAgICB9XG5cbiAgICBoYW5kbGVFdmVudHMobmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucyAmJiAoPGFueT50aGlzLm9wdGlvbnMpW25hbWVdID8gKDxhbnk+dGhpcy5vcHRpb25zKVtuYW1lXShwYXJhbXMpIDogdGhpc1tuYW1lXS5lbWl0KHBhcmFtcyk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50U3R5bGVDbGFzczogYHAtc2Nyb2xsZXItY29udGVudCAke3RoaXMuZF9sb2FkaW5nID8gJ3Atc2Nyb2xsZXItbG9hZGluZycgOiAnJ31gLFxuICAgICAgICAgICAgaXRlbXM6IHRoaXMubG9hZGVkSXRlbXMsXG4gICAgICAgICAgICBnZXRJdGVtT3B0aW9uczogKGluZGV4OiBudW1iZXIpID0+IHRoaXMuZ2V0T3B0aW9ucyhpbmRleCksXG4gICAgICAgICAgICBsb2FkaW5nOiB0aGlzLmRfbG9hZGluZyxcbiAgICAgICAgICAgIGdldExvYWRlck9wdGlvbnM6IChpbmRleDogbnVtYmVyLCBvcHRpb25zPzogYW55KSA9PiB0aGlzLmdldExvYWRlck9wdGlvbnMoaW5kZXgsIG9wdGlvbnMpLFxuICAgICAgICAgICAgaXRlbVNpemU6IHRoaXMuX2l0ZW1TaXplLFxuICAgICAgICAgICAgcm93czogdGhpcy5sb2FkZWRSb3dzLFxuICAgICAgICAgICAgY29sdW1uczogdGhpcy5sb2FkZWRDb2x1bW5zLFxuICAgICAgICAgICAgc3BhY2VyU3R5bGU6IHRoaXMuc3BhY2VyU3R5bGUsXG4gICAgICAgICAgICBjb250ZW50U3R5bGU6IHRoaXMuY29udGVudFN0eWxlLFxuICAgICAgICAgICAgdmVydGljYWw6IHRoaXMudmVydGljYWwsXG4gICAgICAgICAgICBob3Jpem9udGFsOiB0aGlzLmhvcml6b250YWwsXG4gICAgICAgICAgICBib3RoOiB0aGlzLmJvdGhcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRPcHRpb25zKHJlbmRlcmVkSW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBjb3VudCA9ICh0aGlzLl9pdGVtcyB8fCBbXSkubGVuZ3RoO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYm90aCA/IHRoaXMuZmlyc3Qucm93cyArIHJlbmRlcmVkSW5kZXggOiB0aGlzLmZpcnN0ICsgcmVuZGVyZWRJbmRleDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgIGZpcnN0OiBpbmRleCA9PT0gMCxcbiAgICAgICAgICAgIGxhc3Q6IGluZGV4ID09PSBjb3VudCAtIDEsXG4gICAgICAgICAgICBldmVuOiBpbmRleCAlIDIgPT09IDAsXG4gICAgICAgICAgICBvZGQ6IGluZGV4ICUgMiAhPT0gMFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldExvYWRlck9wdGlvbnMoaW5kZXg6IG51bWJlciwgZXh0T3B0aW9uczogYW55KSB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5sb2FkZXJBcnIubGVuZ3RoO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgZmlyc3Q6IGluZGV4ID09PSAwLFxuICAgICAgICAgICAgbGFzdDogaW5kZXggPT09IGNvdW50IC0gMSxcbiAgICAgICAgICAgIGV2ZW46IGluZGV4ICUgMiA9PT0gMCxcbiAgICAgICAgICAgIG9kZDogaW5kZXggJSAyICE9PSAwLFxuICAgICAgICAgICAgLi4uZXh0T3B0aW9uc1xuICAgICAgICB9O1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFNwaW5uZXJJY29uXSxcbiAgICBleHBvcnRzOiBbU2Nyb2xsZXIsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2Nyb2xsZXJdXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbGVyTW9kdWxlIHt9XG4iXX0=