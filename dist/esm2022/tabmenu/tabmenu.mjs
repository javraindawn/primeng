import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewChildren, ViewEncapsulation, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
/**
 * TabMenu is a navigation component that displays items as tab headers.
 * @group Components
 */
class TabMenu {
    platformId;
    router;
    route;
    cd;
    /**
     * An array of menuitems.
     * @group Props
     */
    set model(value) {
        this._model = value;
        this._focusableItems = (this._model || []).reduce((result, item) => {
            result.push(item);
            return result;
        }, []);
    }
    get model() {
        return this._model;
    }
    /**
     * Defines the default active menuitem
     * @group Props
     */
    activeItem;
    /**
     * When enabled displays buttons at each side of the tab headers to scroll the tab list.
     * @group Props
     */
    scrollable;
    /**
     * Defines if popup mode enabled.
     */
    popup;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabel;
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    ariaLabelledBy;
    /**
     * Event fired when a tab is selected.
     * @param {MenuItem} item - Menu item.
     * @group Emits
     */
    activeItemChange = new EventEmitter();
    content;
    navbar;
    inkbar;
    prevBtn;
    nextBtn;
    tabLink;
    tab;
    templates;
    itemTemplate;
    previousIconTemplate;
    nextIconTemplate;
    tabChanged;
    backwardIsDisabled = true;
    forwardIsDisabled = false;
    timerIdForInitialAutoScroll = null;
    _focusableItems;
    _model;
    focusedItemInfo = signal(null);
    get focusableItems() {
        if (!this._focusableItems || !this._focusableItems.length) {
            this._focusableItems = (this.model || []).reduce((result, item) => {
                result.push(item);
                return result;
            }, []);
        }
        return this._focusableItems;
    }
    constructor(platformId, router, route, cd) {
        this.platformId = platformId;
        this.router = router;
        this.route = route;
        this.cd = cd;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;
                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.updateInkBar();
            this.initAutoScrollForActiveItem();
            this.initButtonState();
        }
    }
    ngAfterViewChecked() {
        if (this.tabChanged) {
            this.updateInkBar();
            this.tabChanged = false;
        }
    }
    ngOnDestroy() {
        this.clearAutoScrollHandler();
    }
    isActive(item) {
        if (item.routerLink) {
            const routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            return this.router.isActive(this.router.createUrlTree(routerLink, { relativeTo: this.route }).toString(), item.routerLinkActiveOptions?.exact ?? item.routerLinkActiveOptions ?? false);
        }
        return item === this.activeItem;
    }
    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }
    visible(item) {
        return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    }
    disabled(item) {
        return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    }
    onMenuItemFocus(item) {
        this.focusedItemInfo.set(item);
    }
    itemClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.activeItem = item;
        this.activeItemChange.emit(item);
        this.tabChanged = true;
        this.cd.markForCheck();
    }
    onKeydownItem(event, index, item) {
        let i = index;
        let foundElement = {};
        const tabLinks = this.tabLink.toArray();
        const tabs = this.tab.toArray();
        switch (event.code) {
            case 'ArrowRight':
                foundElement = this.findNextItem(tabs, i);
                i = foundElement['i'];
                break;
            case 'ArrowLeft':
                foundElement = this.findPrevItem(tabs, i);
                i = foundElement['i'];
                break;
            case 'End':
                foundElement = this.findPrevItem(tabs, this.model.length);
                i = foundElement['i'];
                event.preventDefault();
                break;
            case 'Home':
                foundElement = this.findNextItem(tabs, -1);
                i = foundElement['i'];
                event.preventDefault();
                break;
            case 'Space':
            case 'Enter':
                this.itemClick(event, item);
                break;
            case 'Tab':
                this.onTabKeyDown(tabLinks);
                break;
            default:
                break;
        }
        if (tabLinks[i] && tabLinks[index]) {
            tabLinks[index].nativeElement.tabIndex = '-1';
            tabLinks[i].nativeElement.tabIndex = '0';
            tabLinks[i].nativeElement.focus();
        }
        this.cd.markForCheck();
    }
    onTabKeyDown(tabLinks) {
        tabLinks.forEach((item) => {
            item.nativeElement.tabIndex = DomHandler.getAttribute(item.nativeElement.parentElement, 'data-p-highlight') ? '0' : '-1';
        });
    }
    findNextItem(items, index) {
        let i = index + 1;
        if (i >= items.length) {
            return { nextItem: items[items.length], i: items.length };
        }
        let nextItem = items[i];
        if (nextItem)
            return DomHandler.getAttribute(nextItem.nativeElement, 'data-p-disabled') ? this.findNextItem(items, i) : { nextItem: nextItem.nativeElement, i };
        else
            return null;
    }
    findPrevItem(items, index) {
        let i = index - 1;
        if (i < 0) {
            return { prevItem: items[0], i: 0 };
        }
        let prevItem = items[i];
        if (prevItem)
            return DomHandler.getAttribute(prevItem.nativeElement, 'data-p-disabled') ? this.findPrevItem(items, i) : { prevItem: prevItem.nativeElement, i };
        else
            return null;
    }
    updateInkBar() {
        const tabHeader = DomHandler.findSingle(this.navbar?.nativeElement, 'li.p-highlight');
        if (tabHeader) {
            this.inkbar.nativeElement.style.width = DomHandler.getWidth(tabHeader) + 'px';
            this.inkbar.nativeElement.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.navbar?.nativeElement).left + 'px';
        }
    }
    getVisibleButtonWidths() {
        return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => (el ? acc + DomHandler.getWidth(el) : acc), 0);
    }
    updateButtonState() {
        const content = this.content?.nativeElement;
        const { scrollLeft, scrollWidth } = content;
        const width = DomHandler.getWidth(content);
        this.backwardIsDisabled = scrollLeft === 0;
        this.forwardIsDisabled = parseInt(scrollLeft) === scrollWidth - width;
    }
    updateScrollBar(index) {
        const tabHeader = this.navbar?.nativeElement.children[index];
        if (!tabHeader) {
            return;
        }
        tabHeader.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
    onScroll(event) {
        this.scrollable && this.updateButtonState();
        event.preventDefault();
    }
    navBackward() {
        const content = this.content?.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft - width;
        content.scrollLeft = pos <= 0 ? 0 : pos;
    }
    navForward() {
        const content = this.content?.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft + width;
        const lastPos = content.scrollWidth - width;
        content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }
    initAutoScrollForActiveItem() {
        if (!this.scrollable) {
            return;
        }
        this.clearAutoScrollHandler();
        // We have to wait for the rendering and then can scroll to element.
        this.timerIdForInitialAutoScroll = setTimeout(() => {
            const activeItem = this.model.findIndex((menuItem) => this.isActive(menuItem));
            if (activeItem !== -1) {
                this.updateScrollBar(activeItem);
            }
        });
    }
    clearAutoScrollHandler() {
        if (this.timerIdForInitialAutoScroll) {
            clearTimeout(this.timerIdForInitialAutoScroll);
            this.timerIdForInitialAutoScroll = null;
        }
    }
    initButtonState() {
        if (this.scrollable) {
            // We have to wait for the rendering and then retrieve the actual size element from the DOM.
            // in future `Promise.resolve` can be changed to `queueMicrotask` (if ie11 support will be dropped)
            Promise.resolve().then(() => {
                this.updateButtonState();
                this.cd.markForCheck();
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TabMenu, deps: [{ token: PLATFORM_ID }, { token: i1.Router }, { token: i1.ActivatedRoute }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: TabMenu, selector: "p-tabMenu", inputs: { model: "model", activeItem: "activeItem", scrollable: "scrollable", popup: "popup", style: "style", styleClass: "styleClass", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy" }, outputs: { activeItemChange: "activeItemChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "navbar", first: true, predicate: ["navbar"], descendants: true }, { propertyName: "inkbar", first: true, predicate: ["inkbar"], descendants: true }, { propertyName: "prevBtn", first: true, predicate: ["prevBtn"], descendants: true }, { propertyName: "nextBtn", first: true, predicate: ["nextBtn"], descendants: true }, { propertyName: "tabLink", predicate: ["tabLink"], descendants: true }, { propertyName: "tab", predicate: ["tab"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="{ 'p-tabmenu p-component': true, 'p-tabmenu-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass">
            <div class="p-tabmenu-nav-container">
                <button *ngIf="scrollable && !backwardIsDisabled" #prevBtn class="p-tabmenu-nav-prev p-tabmenu-nav-btn p-link" (click)="navBackward()" type="button" role="navigation" pRipple>
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabmenu-nav-content" (scroll)="onScroll($event)">
                    <ul #navbar class="p-tabmenu-nav p-reset" role="menubar" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel">
                        <li
                            #tab
                            *ngFor="let item of focusableItems; let i = index"
                            role="presentation"
                            [ngStyle]="item.style"
                            [class]="item.styleClass"
                            [attr.data-p-disabled]="disabled(item)"
                            [attr.data-p-highlight]="focusedItemInfo() === item"
                            [ngClass]="{ 'p-tabmenuitem': true, 'p-disabled': getItemProp(item, 'disabled'), 'p-highlight': isActive(item), 'p-hidden': item.visible === false }"
                            pTooltip
                            [tooltipOptions]="item.tooltipOptions"
                        >
                            <a
                                #tabLink
                                *ngIf="!item.routerLink"
                                class="p-menuitem-link"
                                role="menuitem"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.id]="getItemProp(item, 'id')"
                                [attr.aria-disabled]="disabled(item)"
                                [attr.aria-label]="getItemProp(item, 'label')"
                                [attr.tabindex]="disabled(item) ? -1 : 0"
                                [target]="getItemProp(item, 'target')"
                                (click)="itemClick($event, item)"
                                (keydown)="onKeydownItem($event, i, item)"
                                (focus)="onMenuItemFocus(item)"
                                pRipple
                            >
                                <ng-container *ngIf="!itemTemplate">
                                    <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                    <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                    <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ getItemProp(item, 'badge') }}</span>
                                </ng-container>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                            </a>
                            <a
                                #tabLink
                                *ngIf="item.routerLink"
                                [routerLink]="item.routerLink"
                                [queryParams]="item.queryParams"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                                role="menuitem"
                                class="p-menuitem-link"
                                (click)="itemClick($event, item)"
                                (keydown)="onKeydownItem($event, i, item)"
                                (focus)="onMenuItemFocus(item)"
                                [target]="item.target"
                                [attr.id]="getItemProp(item, 'id')"
                                [attr.aria-disabled]="disabled(item)"
                                [attr.aria-label]="getItemProp(item, 'label')"
                                [attr.tabindex]="disabled(item) ? -1 : 0"
                                [fragment]="item.fragment"
                                [queryParamsHandling]="item.queryParamsHandling"
                                [preserveFragment]="item.preserveFragment"
                                [skipLocationChange]="item.skipLocationChange"
                                [replaceUrl]="item.replaceUrl"
                                [state]="item.state"
                                pRipple
                            >
                                <ng-container *ngIf="!itemTemplate">
                                    <span class="p-menuitem-icon" [attr.aria-hidden]="true" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                    <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                    <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ getItemProp(item, 'badge') }}</span>
                                </ng-container>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                            </a>
                        </li>
                        <li #inkbar class="p-tabmenu-ink-bar" role="none"></li>
                    </ul>
                </div>
                <button *ngIf="scrollable && !forwardIsDisabled" #nextBtn class="p-tabmenu-nav-next p-tabmenu-nav-btn p-link" (click)="navForward()" type="button" role="navigation" pRipple>
                    <ChevronRightIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, isInline: true, styles: [".p-tabmenu-nav-container{position:relative}.p-tabmenu-scrollable .p-tabmenu-nav-container{overflow:hidden}.p-tabmenu-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabmenu-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabmenu-nav-prev{left:0}.p-tabmenu-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabmenu-nav{display:flex;margin:0;padding:0;list-style-type:none;flex-wrap:nowrap}.p-tabmenu-nav a{cursor:pointer;-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabmenu-nav a:focus{z-index:1}.p-tabmenu-nav .p-menuitem-text{line-height:1;white-space:nowrap}.p-tabmenu-ink-bar{display:none;z-index:1}.p-tabmenu-nav-content::-webkit-scrollbar{display:none}.p-tabmenuitem:not(.p-hidden){display:flex}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.RouterLink; }), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.RouterLinkActive; }), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Ripple; }), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(function () { return i4.Tooltip; }), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(function () { return ChevronLeftIcon; }), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(function () { return ChevronRightIcon; }), selector: "ChevronRightIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { TabMenu };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TabMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-tabMenu', template: `
        <div [ngClass]="{ 'p-tabmenu p-component': true, 'p-tabmenu-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass">
            <div class="p-tabmenu-nav-container">
                <button *ngIf="scrollable && !backwardIsDisabled" #prevBtn class="p-tabmenu-nav-prev p-tabmenu-nav-btn p-link" (click)="navBackward()" type="button" role="navigation" pRipple>
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabmenu-nav-content" (scroll)="onScroll($event)">
                    <ul #navbar class="p-tabmenu-nav p-reset" role="menubar" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-label]="ariaLabel">
                        <li
                            #tab
                            *ngFor="let item of focusableItems; let i = index"
                            role="presentation"
                            [ngStyle]="item.style"
                            [class]="item.styleClass"
                            [attr.data-p-disabled]="disabled(item)"
                            [attr.data-p-highlight]="focusedItemInfo() === item"
                            [ngClass]="{ 'p-tabmenuitem': true, 'p-disabled': getItemProp(item, 'disabled'), 'p-highlight': isActive(item), 'p-hidden': item.visible === false }"
                            pTooltip
                            [tooltipOptions]="item.tooltipOptions"
                        >
                            <a
                                #tabLink
                                *ngIf="!item.routerLink"
                                class="p-menuitem-link"
                                role="menuitem"
                                [attr.href]="getItemProp(item, 'url')"
                                [attr.id]="getItemProp(item, 'id')"
                                [attr.aria-disabled]="disabled(item)"
                                [attr.aria-label]="getItemProp(item, 'label')"
                                [attr.tabindex]="disabled(item) ? -1 : 0"
                                [target]="getItemProp(item, 'target')"
                                (click)="itemClick($event, item)"
                                (keydown)="onKeydownItem($event, i, item)"
                                (focus)="onMenuItemFocus(item)"
                                pRipple
                            >
                                <ng-container *ngIf="!itemTemplate">
                                    <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{ getItemProp(item, 'label') }}</span>
                                    <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                    <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ getItemProp(item, 'badge') }}</span>
                                </ng-container>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                            </a>
                            <a
                                #tabLink
                                *ngIf="item.routerLink"
                                [routerLink]="item.routerLink"
                                [queryParams]="item.queryParams"
                                [routerLinkActive]="'p-menuitem-link-active'"
                                [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                                role="menuitem"
                                class="p-menuitem-link"
                                (click)="itemClick($event, item)"
                                (keydown)="onKeydownItem($event, i, item)"
                                (focus)="onMenuItemFocus(item)"
                                [target]="item.target"
                                [attr.id]="getItemProp(item, 'id')"
                                [attr.aria-disabled]="disabled(item)"
                                [attr.aria-label]="getItemProp(item, 'label')"
                                [attr.tabindex]="disabled(item) ? -1 : 0"
                                [fragment]="item.fragment"
                                [queryParamsHandling]="item.queryParamsHandling"
                                [preserveFragment]="item.preserveFragment"
                                [skipLocationChange]="item.skipLocationChange"
                                [replaceUrl]="item.replaceUrl"
                                [state]="item.state"
                                pRipple
                            >
                                <ng-container *ngIf="!itemTemplate">
                                    <span class="p-menuitem-icon" [attr.aria-hidden]="true" [ngClass]="item.icon" *ngIf="item.icon" [ngStyle]="item.iconStyle"></span>
                                    <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{ getItemProp(item, 'label') }}</span>
                                    <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemProp(item, 'label')"></span></ng-template>
                                    <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ getItemProp(item, 'badge') }}</span>
                                </ng-container>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"></ng-container>
                            </a>
                        </li>
                        <li #inkbar class="p-tabmenu-ink-bar" role="none"></li>
                    </ul>
                </div>
                <button *ngIf="scrollable && !forwardIsDisabled" #nextBtn class="p-tabmenu-nav-next p-tabmenu-nav-btn p-link" (click)="navForward()" type="button" role="navigation" pRipple>
                    <ChevronRightIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-tabmenu-nav-container{position:relative}.p-tabmenu-scrollable .p-tabmenu-nav-container{overflow:hidden}.p-tabmenu-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabmenu-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabmenu-nav-prev{left:0}.p-tabmenu-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabmenu-nav{display:flex;margin:0;padding:0;list-style-type:none;flex-wrap:nowrap}.p-tabmenu-nav a{cursor:pointer;-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabmenu-nav a:focus{z-index:1}.p-tabmenu-nav .p-menuitem-text{line-height:1;white-space:nowrap}.p-tabmenu-ink-bar{display:none;z-index:1}.p-tabmenu-nav-content::-webkit-scrollbar{display:none}.p-tabmenuitem:not(.p-hidden){display:flex}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i1.Router }, { type: i1.ActivatedRoute }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { model: [{
                type: Input
            }], activeItem: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], popup: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], activeItemChange: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content']
            }], navbar: [{
                type: ViewChild,
                args: ['navbar']
            }], inkbar: [{
                type: ViewChild,
                args: ['inkbar']
            }], prevBtn: [{
                type: ViewChild,
                args: ['prevBtn']
            }], nextBtn: [{
                type: ViewChild,
                args: ['nextBtn']
            }], tabLink: [{
                type: ViewChildren,
                args: ['tabLink']
            }], tab: [{
                type: ViewChildren,
                args: ['tab']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class TabMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TabMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: TabMenuModule, declarations: [TabMenu], imports: [CommonModule, RouterModule, SharedModule, RippleModule, TooltipModule, ChevronLeftIcon, ChevronRightIcon], exports: [TabMenu, RouterModule, SharedModule, TooltipModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TabMenuModule, imports: [CommonModule, RouterModule, SharedModule, RippleModule, TooltipModule, ChevronLeftIcon, ChevronRightIcon, RouterModule, SharedModule, TooltipModule] });
}
export { TabMenuModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TabMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, SharedModule, RippleModule, TooltipModule, ChevronLeftIcon, ChevronRightIcon],
                    exports: [TabMenu, RouterModule, SharedModule, TooltipModule],
                    declarations: [TabMenu]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90YWJtZW51L3RhYm1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFJSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsTUFBTSxFQUNOLFdBQVcsRUFHWCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUdqQixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUEwQixZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RSxPQUFPLEVBQVksYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUU1Qzs7O0dBR0c7QUFDSCxNQWtHYSxPQUFPO0lBd0d5QjtJQUF5QjtJQUF3QjtJQUErQjtJQXZHekg7OztPQUdHO0lBQ0gsSUFBYSxLQUFLLENBQUMsS0FBNkI7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFD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RSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUMvRixZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWE7O1NBR25ELGFBQWE7MkZBQWIsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDbkgsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUM3RCxZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7aUJBQzFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgY29tcHV0ZWQsXG4gICAgZWZmZWN0LFxuICAgIHNpZ25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNZW51SXRlbSwgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IENoZXZyb25MZWZ0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmxlZnQnO1xuaW1wb3J0IHsgQ2hldnJvblJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnJpZ2h0JztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuLyoqXG4gKiBUYWJNZW51IGlzIGEgbmF2aWdhdGlvbiBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBpdGVtcyBhcyB0YWIgaGVhZGVycy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsgJ3AtdGFibWVudSBwLWNvbXBvbmVudCc6IHRydWUsICdwLXRhYm1lbnUtc2Nyb2xsYWJsZSc6IHNjcm9sbGFibGUgfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXRhYm1lbnUtbmF2LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJzY3JvbGxhYmxlICYmICFiYWNrd2FyZElzRGlzYWJsZWRcIiAjcHJldkJ0biBjbGFzcz1cInAtdGFibWVudS1uYXYtcHJldiBwLXRhYm1lbnUtbmF2LWJ0biBwLWxpbmtcIiAoY2xpY2spPVwibmF2QmFja3dhcmQoKVwiIHR5cGU9XCJidXR0b25cIiByb2xlPVwibmF2aWdhdGlvblwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uTGVmdEljb24gKm5nSWY9XCIhcHJldmlvdXNJY29uVGVtcGxhdGVcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwicHJldmlvdXNJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJwLXRhYm1lbnUtbmF2LWNvbnRlbnRcIiAoc2Nyb2xsKT1cIm9uU2Nyb2xsKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHVsICNuYXZiYXIgY2xhc3M9XCJwLXRhYm1lbnUtbmF2IHAtcmVzZXRcIiByb2xlPVwibWVudWJhclwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjdGFiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZm9jdXNhYmxlSXRlbXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIml0ZW0uc3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcC1kaXNhYmxlZF09XCJkaXNhYmxlZChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF09XCJmb2N1c2VkSXRlbUluZm8oKSA9PT0gaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC10YWJtZW51aXRlbSc6IHRydWUsICdwLWRpc2FibGVkJzogZ2V0SXRlbVByb3AoaXRlbSwgJ2Rpc2FibGVkJyksICdwLWhpZ2hsaWdodCc6IGlzQWN0aXZlKGl0ZW0pLCAncC1oaWRkZW4nOiBpdGVtLnZpc2libGUgPT09IGZhbHNlIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBUb29sdGlwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cIml0ZW0udG9vbHRpcE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICN0YWJMaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIWl0ZW0ucm91dGVyTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaHJlZl09XCJnZXRJdGVtUHJvcChpdGVtLCAndXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRJdGVtUHJvcChpdGVtLCAnaWQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwiZGlzYWJsZWQoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdsYWJlbCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQoaXRlbSkgPyAtMSA6IDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cImdldEl0ZW1Qcm9wKGl0ZW0sICd0YXJnZXQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bkl0ZW0oJGV2ZW50LCBpLCBpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbk1lbnVJdGVtRm9jdXMoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWl0ZW1UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ1N0eWxlXT1cIml0ZW0uaWNvblN0eWxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cIml0ZW0uZXNjYXBlICE9PSBmYWxzZTsgZWxzZSBodG1sTGFiZWxcIj57eyBnZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKVwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJpdGVtLmJhZGdlXCIgW25nQ2xhc3NdPVwiaXRlbS5iYWRnZVN0eWxlQ2xhc3NcIj57eyBnZXRJdGVtUHJvcChpdGVtLCAnYmFkZ2UnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtLCBpbmRleDogaSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICN0YWJMaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaXRlbS5yb3V0ZXJMaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZV09XCIncC1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaXRlbS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucyB8fCB7IGV4YWN0OiBmYWxzZSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleWRvd25JdGVtKCRldmVudCwgaSwgaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25NZW51SXRlbUZvY3VzKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJpdGVtLnRhcmdldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cImdldEl0ZW1Qcm9wKGl0ZW0sICdpZCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZChpdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZChpdGVtKSA/IC0xIDogMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJpdGVtLmZyYWdtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaXRlbS5xdWVyeVBhcmFtc0hhbmRsaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ByZXNlcnZlRnJhZ21lbnRdPVwiaXRlbS5wcmVzZXJ2ZUZyYWdtZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJpdGVtLnNraXBMb2NhdGlvbkNoYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cIml0ZW0ucmVwbGFjZVVybFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJpdGVtLnN0YXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nU3R5bGVdPVwiaXRlbS5pY29uU3R5bGVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxSb3V0ZUxhYmVsXCI+e3sgZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJykgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtUHJvcChpdGVtLCAnbGFiZWwnKVwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJpdGVtLmJhZGdlXCIgW25nQ2xhc3NdPVwiaXRlbS5iYWRnZVN0eWxlQ2xhc3NcIj57eyBnZXRJdGVtUHJvcChpdGVtLCAnYmFkZ2UnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBpdGVtLCBpbmRleDogaSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAjaW5rYmFyIGNsYXNzPVwicC10YWJtZW51LWluay1iYXJcIiByb2xlPVwibm9uZVwiPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInNjcm9sbGFibGUgJiYgIWZvcndhcmRJc0Rpc2FibGVkXCIgI25leHRCdG4gY2xhc3M9XCJwLXRhYm1lbnUtbmF2LW5leHQgcC10YWJtZW51LW5hdi1idG4gcC1saW5rXCIgKGNsaWNrKT1cIm5hdkZvcndhcmQoKVwiIHR5cGU9XCJidXR0b25cIiByb2xlPVwibmF2aWdhdGlvblwiIHBSaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHRJY29uICpuZ0lmPVwiIXByZXZpb3VzSWNvblRlbXBsYXRlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm5leHRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi90YWJtZW51LmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJNZW51IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBtZW51aXRlbXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2V0IG1vZGVsKHZhbHVlOiBNZW51SXRlbVtdIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX21vZGVsID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2ZvY3VzYWJsZUl0ZW1zID0gKHRoaXMuX21vZGVsIHx8IFtdKS5yZWR1Y2UoKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgZ2V0IG1vZGVsKCk6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIGRlZmF1bHQgYWN0aXZlIG1lbnVpdGVtXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYWN0aXZlSXRlbTogTWVudUl0ZW0gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkIGRpc3BsYXlzIGJ1dHRvbnMgYXQgZWFjaCBzaWRlIG9mIHRoZSB0YWIgaGVhZGVycyB0byBzY3JvbGwgdGhlIHRhYiBsaXN0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbGFibGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBwb3B1cCBtb2RlIGVuYWJsZWQuXG4gICAgICovXG4gICAgQElucHV0KCkgcG9wdXA6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGEgc3RyaW5nIHZhbHVlIHRoYXQgbGFiZWxzIGFuIGludGVyYWN0aXZlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSWRlbnRpZmllciBvZiB0aGUgdW5kZXJseWluZyBpbnB1dCBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiBhIHRhYiBpcyBzZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge01lbnVJdGVtfSBpdGVtIC0gTWVudSBpdGVtLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBhY3RpdmVJdGVtQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWVudUl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxNZW51SXRlbT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnKSBjb250ZW50OiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ25hdmJhcicpIG5hdmJhcjogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdpbmtiYXInKSBpbmtiYXI6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgncHJldkJ0bicpIHByZXZCdG46IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnbmV4dEJ0bicpIG5leHRCdG46IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZHJlbigndGFiTGluaycpIHRhYkxpbms6IE51bGxhYmxlPFF1ZXJ5TGlzdDxFbGVtZW50UmVmPj47XG5cbiAgICBAVmlld0NoaWxkcmVuKCd0YWInKSB0YWI6IE51bGxhYmxlPFF1ZXJ5TGlzdDxFbGVtZW50UmVmPj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgaXRlbVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHByZXZpb3VzSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIG5leHRJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgdGFiQ2hhbmdlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGJhY2t3YXJkSXNEaXNhYmxlZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBmb3J3YXJkSXNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSB0aW1lcklkRm9ySW5pdGlhbEF1dG9TY3JvbGw6IGFueSA9IG51bGw7XG5cbiAgICBfZm9jdXNhYmxlSXRlbXM6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQ7XG5cbiAgICBfbW9kZWw6IE1lbnVJdGVtW10gfCB1bmRlZmluZWQ7XG5cbiAgICBmb2N1c2VkSXRlbUluZm8gPSBzaWduYWw8YW55PihudWxsKTtcblxuICAgIGdldCBmb2N1c2FibGVJdGVtcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9mb2N1c2FibGVJdGVtcyB8fCAhdGhpcy5fZm9jdXNhYmxlSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2FibGVJdGVtcyA9ICh0aGlzLm1vZGVsIHx8IFtdKS5yZWR1Y2UoKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNhYmxlSXRlbXM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ25leHRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwcmV2aW91c2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlua0JhcigpO1xuICAgICAgICAgICAgdGhpcy5pbml0QXV0b1Njcm9sbEZvckFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEJ1dHRvblN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhYkNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5rQmFyKCk7XG4gICAgICAgICAgICB0aGlzLnRhYkNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsZWFyQXV0b1Njcm9sbEhhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBpc0FjdGl2ZShpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5yb3V0ZXJMaW5rKSB7XG4gICAgICAgICAgICBjb25zdCByb3V0ZXJMaW5rID0gQXJyYXkuaXNBcnJheShpdGVtLnJvdXRlckxpbmspID8gaXRlbS5yb3V0ZXJMaW5rIDogW2l0ZW0ucm91dGVyTGlua107XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5pc0FjdGl2ZSh0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKHJvdXRlckxpbmssIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KS50b1N0cmluZygpLCBpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zPy5leGFjdCA/PyBpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zID8/IGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtID09PSB0aGlzLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgZ2V0SXRlbVByb3AoaXRlbTogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0gPyBPYmplY3RVdGlscy5nZXRJdGVtVmFsdWUoaXRlbVtuYW1lXSkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmlzaWJsZShpdGVtKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaXRlbS52aXNpYmxlID09PSAnZnVuY3Rpb24nID8gaXRlbS52aXNpYmxlKCkgOiBpdGVtLnZpc2libGUgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIGRpc2FibGVkKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBpdGVtLmRpc2FibGVkID09PSAnZnVuY3Rpb24nID8gaXRlbS5kaXNhYmxlZCgpIDogaXRlbS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBvbk1lbnVJdGVtRm9jdXMoaXRlbSkge1xuICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoaXRlbSk7XG4gICAgfVxuXG4gICAgaXRlbUNsaWNrKGV2ZW50OiBFdmVudCwgaXRlbTogTWVudUl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWl0ZW0udXJsICYmICFpdGVtLnJvdXRlckxpbmspIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gaXRlbTtcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtQ2hhbmdlLmVtaXQoaXRlbSk7XG4gICAgICAgIHRoaXMudGFiQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25LZXlkb3duSXRlbShldmVudCwgaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgbGV0IGkgPSBpbmRleDtcblxuICAgICAgICBsZXQgZm91bmRFbGVtZW50ID0ge307XG4gICAgICAgIGNvbnN0IHRhYkxpbmtzID0gdGhpcy50YWJMaW5rLnRvQXJyYXkoKTtcbiAgICAgICAgY29uc3QgdGFicyA9IHRoaXMudGFiLnRvQXJyYXkoKTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIGZvdW5kRWxlbWVudCA9IHRoaXMuZmluZE5leHRJdGVtKHRhYnMsIGkpO1xuICAgICAgICAgICAgICAgIGkgPSBmb3VuZEVsZW1lbnRbJ2knXTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICBmb3VuZEVsZW1lbnQgPSB0aGlzLmZpbmRQcmV2SXRlbSh0YWJzLCBpKTtcbiAgICAgICAgICAgICAgICBpID0gZm91bmRFbGVtZW50WydpJ107XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgZm91bmRFbGVtZW50ID0gdGhpcy5maW5kUHJldkl0ZW0odGFicywgdGhpcy5tb2RlbC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGkgPSBmb3VuZEVsZW1lbnRbJ2knXTtcblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgICAgICAgICAgIGZvdW5kRWxlbWVudCA9IHRoaXMuZmluZE5leHRJdGVtKHRhYnMsIC0xKTtcbiAgICAgICAgICAgICAgICBpID0gZm91bmRFbGVtZW50WydpJ107XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtQ2xpY2soZXZlbnQsIGl0ZW0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJLZXlEb3duKHRhYkxpbmtzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YWJMaW5rc1tpXSAmJiB0YWJMaW5rc1tpbmRleF0pIHtcbiAgICAgICAgICAgIHRhYkxpbmtzW2luZGV4XS5uYXRpdmVFbGVtZW50LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgICAgIHRhYkxpbmtzW2ldLm5hdGl2ZUVsZW1lbnQudGFiSW5kZXggPSAnMCc7XG4gICAgICAgICAgICB0YWJMaW5rc1tpXS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBvblRhYktleURvd24odGFiTGlua3MpIHtcbiAgICAgICAgdGFiTGlua3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5uYXRpdmVFbGVtZW50LnRhYkluZGV4ID0gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaXRlbS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQsICdkYXRhLXAtaGlnaGxpZ2h0JykgPyAnMCcgOiAnLTEnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmaW5kTmV4dEl0ZW0oaXRlbXMsIGluZGV4KSB7XG4gICAgICAgIGxldCBpID0gaW5kZXggKyAxO1xuXG4gICAgICAgIGlmIChpID49IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbmV4dEl0ZW06IGl0ZW1zW2l0ZW1zLmxlbmd0aF0sIGk6IGl0ZW1zLmxlbmd0aCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5leHRJdGVtID0gaXRlbXNbaV07XG5cbiAgICAgICAgaWYgKG5leHRJdGVtKSByZXR1cm4gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUobmV4dEl0ZW0ubmF0aXZlRWxlbWVudCwgJ2RhdGEtcC1kaXNhYmxlZCcpID8gdGhpcy5maW5kTmV4dEl0ZW0oaXRlbXMsIGkpIDogeyBuZXh0SXRlbTogbmV4dEl0ZW0ubmF0aXZlRWxlbWVudCwgaSB9O1xuICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShpdGVtcywgaW5kZXgpIHtcbiAgICAgICAgbGV0IGkgPSBpbmRleCAtIDE7XG5cbiAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBwcmV2SXRlbTogaXRlbXNbMF0sIGk6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcmV2SXRlbSA9IGl0ZW1zW2ldO1xuXG4gICAgICAgIGlmIChwcmV2SXRlbSkgcmV0dXJuIERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKHByZXZJdGVtLm5hdGl2ZUVsZW1lbnQsICdkYXRhLXAtZGlzYWJsZWQnKSA/IHRoaXMuZmluZFByZXZJdGVtKGl0ZW1zLCBpKSA6IHsgcHJldkl0ZW06IHByZXZJdGVtLm5hdGl2ZUVsZW1lbnQsIGkgfTtcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB1cGRhdGVJbmtCYXIoKSB7XG4gICAgICAgIGNvbnN0IHRhYkhlYWRlciA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLm5hdmJhcj8ubmF0aXZlRWxlbWVudCwgJ2xpLnAtaGlnaGxpZ2h0Jyk7XG4gICAgICAgIGlmICh0YWJIZWFkZXIpIHtcbiAgICAgICAgICAgICh0aGlzLmlua2JhciBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aCh0YWJIZWFkZXIpICsgJ3B4JztcbiAgICAgICAgICAgICh0aGlzLmlua2JhciBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0YWJIZWFkZXIpLmxlZnQgLSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLm5hdmJhcj8ubmF0aXZlRWxlbWVudCkubGVmdCArICdweCc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRWaXNpYmxlQnV0dG9uV2lkdGhzKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMucHJldkJ0bj8ubmF0aXZlRWxlbWVudCwgdGhpcy5uZXh0QnRuPy5uYXRpdmVFbGVtZW50XS5yZWR1Y2UoKGFjYywgZWwpID0+IChlbCA/IGFjYyArIERvbUhhbmRsZXIuZ2V0V2lkdGgoZWwpIDogYWNjKSwgMCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQ/Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHsgc2Nyb2xsTGVmdCwgc2Nyb2xsV2lkdGggfSA9IGNvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aChjb250ZW50KTtcblxuICAgICAgICB0aGlzLmJhY2t3YXJkSXNEaXNhYmxlZCA9IHNjcm9sbExlZnQgPT09IDA7XG4gICAgICAgIHRoaXMuZm9yd2FyZElzRGlzYWJsZWQgPSBwYXJzZUludChzY3JvbGxMZWZ0KSA9PT0gc2Nyb2xsV2lkdGggLSB3aWR0aDtcbiAgICB9XG5cbiAgICB1cGRhdGVTY3JvbGxCYXIoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCB0YWJIZWFkZXIgPSB0aGlzLm5hdmJhcj8ubmF0aXZlRWxlbWVudC5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgaWYgKCF0YWJIZWFkZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYkhlYWRlci5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ2NlbnRlcicgfSk7XG4gICAgfVxuXG4gICAgb25TY3JvbGwoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsYWJsZSAmJiB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBuYXZCYWNrd2FyZCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudD8ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKGNvbnRlbnQpIC0gdGhpcy5nZXRWaXNpYmxlQnV0dG9uV2lkdGhzKCk7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNvbnRlbnQuc2Nyb2xsTGVmdCAtIHdpZHRoO1xuICAgICAgICBjb250ZW50LnNjcm9sbExlZnQgPSBwb3MgPD0gMCA/IDAgOiBwb3M7XG4gICAgfVxuXG4gICAgbmF2Rm9yd2FyZCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudD8ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKGNvbnRlbnQpIC0gdGhpcy5nZXRWaXNpYmxlQnV0dG9uV2lkdGhzKCk7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNvbnRlbnQuc2Nyb2xsTGVmdCArIHdpZHRoO1xuICAgICAgICBjb25zdCBsYXN0UG9zID0gY29udGVudC5zY3JvbGxXaWR0aCAtIHdpZHRoO1xuICAgICAgICBjb250ZW50LnNjcm9sbExlZnQgPSBwb3MgPj0gbGFzdFBvcyA/IGxhc3RQb3MgOiBwb3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0QXV0b1Njcm9sbEZvckFjdGl2ZUl0ZW0oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFyQXV0b1Njcm9sbEhhbmRsZXIoKTtcbiAgICAgICAgLy8gV2UgaGF2ZSB0byB3YWl0IGZvciB0aGUgcmVuZGVyaW5nIGFuZCB0aGVuIGNhbiBzY3JvbGwgdG8gZWxlbWVudC5cbiAgICAgICAgdGhpcy50aW1lcklkRm9ySW5pdGlhbEF1dG9TY3JvbGwgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSAodGhpcy5tb2RlbCBhcyBNZW51SXRlbVtdKS5maW5kSW5kZXgoKG1lbnVJdGVtKSA9PiB0aGlzLmlzQWN0aXZlKG1lbnVJdGVtKSk7XG5cbiAgICAgICAgICAgIGlmIChhY3RpdmVJdGVtICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsQmFyKGFjdGl2ZUl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyQXV0b1Njcm9sbEhhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVySWRGb3JJbml0aWFsQXV0b1Njcm9sbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJJZEZvckluaXRpYWxBdXRvU2Nyb2xsKTtcbiAgICAgICAgICAgIHRoaXMudGltZXJJZEZvckluaXRpYWxBdXRvU2Nyb2xsID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEJ1dHRvblN0YXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHdhaXQgZm9yIHRoZSByZW5kZXJpbmcgYW5kIHRoZW4gcmV0cmlldmUgdGhlIGFjdHVhbCBzaXplIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxuICAgICAgICAgICAgLy8gaW4gZnV0dXJlIGBQcm9taXNlLnJlc29sdmVgIGNhbiBiZSBjaGFuZ2VkIHRvIGBxdWV1ZU1pY3JvdGFza2AgKGlmIGllMTEgc3VwcG9ydCB3aWxsIGJlIGRyb3BwZWQpXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSwgU2hhcmVkTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIENoZXZyb25MZWZ0SWNvbiwgQ2hldnJvblJpZ2h0SWNvbl0sXG4gICAgZXhwb3J0czogW1RhYk1lbnUsIFJvdXRlck1vZHVsZSwgU2hhcmVkTW9kdWxlLCBUb29sdGlwTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUYWJNZW51XVxufSlcbmV4cG9ydCBjbGFzcyBUYWJNZW51TW9kdWxlIHt9XG4iXX0=