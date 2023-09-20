import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AngleDownIcon } from 'primeng/icons/angledown';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ObjectUtils, UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/tooltip";
import * as i5 from "primeng/api";
class MegaMenuSub {
    el;
    megaMenu;
    id;
    items;
    menuId;
    ariaLabel;
    ariaLabelledBy;
    level = 0;
    focusedItemId;
    disabled = false;
    orientation;
    activeItem;
    submenu;
    tabindex = 0;
    root = false;
    itemClick = new EventEmitter();
    itemMouseEnter = new EventEmitter();
    menuFocus = new EventEmitter();
    menuBlur = new EventEmitter();
    menuKeydown = new EventEmitter();
    menubarViewChild;
    constructor(el, megaMenu) {
        this.el = el;
        this.megaMenu = megaMenu;
    }
    onItemClick(event, processedItem) {
        this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
        this.itemClick.emit({ originalEvent: event, processedItem, isFocus: true });
    }
    getItemProp(processedItem, name, params = null) {
        return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
    }
    getItemId(processedItem) {
        return `${this.menuId}_${processedItem.key}`;
    }
    getSubListId(processedItem) {
        return `${this.getItemId(processedItem)}_list`;
    }
    getItemClass(processedItem) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem': true,
            'p-menuitem-active p-highlight': this.isItemActive(processedItem),
            'p-focus': this.isItemFocused(processedItem),
            'p-disabled': this.isItemDisabled(processedItem)
        };
    }
    getItemLabel(processedItem) {
        return this.getItemProp(processedItem, 'label');
    }
    getSeparatorItemClass(processedItem) {
        return {
            ...this.getItemProp(processedItem, 'class'),
            'p-menuitem-separator': true
        };
    }
    getColumnClass(processedItem) {
        let length = this.isItemGroup(processedItem) ? processedItem.items.length : 0;
        let columnClass;
        switch (length) {
            case 2:
                columnClass = 'p-megamenu-col-6';
                break;
            case 3:
                columnClass = 'p-megamenu-col-4';
                break;
            case 4:
                columnClass = 'p-megamenu-col-3';
                break;
            case 6:
                columnClass = 'p-megamenu-col-2';
                break;
            default:
                columnClass = 'p-megamenu-col-12';
                break;
        }
        return columnClass;
    }
    getSubmenuHeaderClass(processedItem) {
        return {
            'p-megamenu-submenu-header p-submenu-header': true,
            'p-disabled': this.isItemDisabled(processedItem),
            ...this.getItemProp(processedItem, 'class')
        };
    }
    isItemVisible(processedItem) {
        return this.getItemProp(processedItem, 'visible') !== false;
    }
    isItemActive(processedItem) {
        return ObjectUtils.isNotEmpty(this.activeItem) ? this.activeItem.key === processedItem.key : false;
    }
    isItemDisabled(processedItem) {
        return this.getItemProp(processedItem, 'disabled');
    }
    isItemFocused(processedItem) {
        return this.focusedItemId === this.getItemId(processedItem);
    }
    isItemGroup(processedItem) {
        return ObjectUtils.isNotEmpty(processedItem.items);
    }
    getAriaSetSize() {
        return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
    }
    getAriaPosInset(index) {
        return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
    }
    onItemMouseEnter(param) {
        const { event, processedItem } = param;
        this.itemMouseEnter.emit({ originalEvent: event, processedItem });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MegaMenuSub, deps: [{ token: i0.ElementRef }, { token: MegaMenu }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: MegaMenuSub, selector: "p-megaMenuSub", inputs: { id: "id", items: "items", menuId: "menuId", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", level: "level", focusedItemId: "focusedItemId", disabled: "disabled", orientation: "orientation", activeItem: "activeItem", submenu: "submenu", tabindex: "tabindex", root: "root" }, outputs: { itemClick: "itemClick", itemMouseEnter: "itemMouseEnter", menuFocus: "menuFocus", menuBlur: "menuBlur", menuKeydown: "menuKeydown" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "menubarViewChild", first: true, predicate: ["menubar"], descendants: true, static: true }], ngImport: i0, template: `
        <ul
            #menubar
            [ngClass]="{ 'p-megamenu-root-list': root, 'p-submenu-list p-megamenu-submenu': !root }"
            [attr.role]="root ? 'menubar' : 'menu'"
            [id]="id"
            [attr.aria-orientation]="orientation"
            [tabindex]="tabindex"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="root ? 'root' : 'submenu'"
            (keydown)="menuKeydown.emit($event)"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
        >
            <li *ngIf="submenu" [ngClass]="getSubmenuHeaderClass(submenu)" [style]="getItemProp(submenu, 'style')" role="presentation">{{ getItemLabel(submenu) }}</li>
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [id]="getItemId(processedItem)"
                    [attr.data-pc-section]="'menuitem'"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" [attr.data-pc-section]="'content'" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({$event, processedItem})">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            [attr.aria-hidden]="true"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.data-pc-section]="'action'"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [attr.tabindex]="-1"
                            pRipple
                        >
                            <span
                                *ngIf="getItemProp(processedItem, 'icon')"
                                class="p-menuitem-icon"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            >
                            </span>
                            <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                            </ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                    <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                    <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="getItemProp(processedItem, 'routerLink')"
                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.tabindex]="-1"
                            [attr.aria-hidden]="true"
                            [attr.data-pc-section]="'action'"
                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [fragment]="getItemProp(processedItem, 'fragment')"
                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                            [state]="getItemProp(processedItem, 'state')"
                            pRipple
                        >
                            <span
                                class="p-menuitem-icon"
                                *ngIf="getItemProp(processedItem, 'icon')"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            ></span>
                            <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel">{{ getItemLabel(processedItem) }}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                    <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                    <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                    </div>
                    <div *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)" class="p-megamenu-panel" [attr.data-pc-section]="'panel'">
                        <div class="p-megamenu-grid" [attr.data-pc-section]="'grid'">
                            <div *ngFor="let col of processedItem.items" [ngClass]="getColumnClass(processedItem)">
                                <p-megaMenuSub
                                    *ngFor="let submenu of col"
                                    [id]="getSubListId(submenu)"
                                    [submenu]="submenu"
                                    [items]="submenu.items"
                                    [menuId]="menuId"
                                    [focusedItemId]="focusedItemId"
                                    [level]="level + 1"
                                    [root]="false"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                >
                                </p-megaMenuSub>
                            </div>
                        </div>
                    </div>
                </li>
            </ng-template>
        </ul>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i1.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i1.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.RouterLink; }), selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.RouterLinkActive; }), selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Ripple; }), selector: "[pRipple]" }, { kind: "directive", type: i0.forwardRef(function () { return i4.Tooltip; }), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "component", type: i0.forwardRef(function () { return AngleDownIcon; }), selector: "AngleDownIcon" }, { kind: "component", type: i0.forwardRef(function () { return AngleRightIcon; }), selector: "AngleRightIcon" }, { kind: "component", type: i0.forwardRef(function () { return MegaMenuSub; }), selector: "p-megaMenuSub", inputs: ["id", "items", "menuId", "ariaLabel", "ariaLabelledBy", "level", "focusedItemId", "disabled", "orientation", "activeItem", "submenu", "tabindex", "root"], outputs: ["itemClick", "itemMouseEnter", "menuFocus", "menuBlur", "menuKeydown"] }], encapsulation: i0.ViewEncapsulation.None });
}
export { MegaMenuSub };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MegaMenuSub, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-megaMenuSub',
                    template: `
        <ul
            #menubar
            [ngClass]="{ 'p-megamenu-root-list': root, 'p-submenu-list p-megamenu-submenu': !root }"
            [attr.role]="root ? 'menubar' : 'menu'"
            [id]="id"
            [attr.aria-orientation]="orientation"
            [tabindex]="tabindex"
            [attr.aria-activedescendant]="focusedItemId"
            [attr.data-pc-section]="root ? 'root' : 'submenu'"
            (keydown)="menuKeydown.emit($event)"
            (focus)="menuFocus.emit($event)"
            (blur)="menuBlur.emit($event)"
        >
            <li *ngIf="submenu" [ngClass]="getSubmenuHeaderClass(submenu)" [style]="getItemProp(submenu, 'style')" role="presentation">{{ getItemLabel(submenu) }}</li>
            <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
                <li
                    *ngIf="isItemVisible(processedItem) && getItemProp(processedItem, 'separator')"
                    [id]="getItemId(processedItem)"
                    [style]="getItemProp(processedItem, 'style')"
                    [ngClass]="getSeparatorItemClass(processedItem)"
                    role="separator"
                    [attr.data-pc-section]="'separator'"
                ></li>
                <li
                    #listItem
                    *ngIf="isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')"
                    role="menuitem"
                    [id]="getItemId(processedItem)"
                    [attr.data-pc-section]="'menuitem'"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-level]="level + 1"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset(index)"
                    [ngStyle]="getItemProp(processedItem, 'style')"
                    [ngClass]="getItemClass(processedItem)"
                    [class]="getItemProp(processedItem, 'styleClass')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                >
                    <div class="p-menuitem-content" [attr.data-pc-section]="'content'" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({$event, processedItem})">
                        <a
                            *ngIf="!getItemProp(processedItem, 'routerLink')"
                            [attr.href]="getItemProp(processedItem, 'url')"
                            [attr.aria-hidden]="true"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.data-pc-section]="'action'"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [attr.tabindex]="-1"
                            pRipple
                        >
                            <span
                                *ngIf="getItemProp(processedItem, 'icon')"
                                class="p-menuitem-icon"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            >
                            </span>
                            <span *ngIf="getItemProp(processedItem, 'escape'); else htmlLabel" class="p-menuitem-text" [attr.data-pc-section]="'label'">
                                {{ getItemLabel(processedItem) }}
                            </span>
                            <ng-template #htmlLabel>
                                <span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span>
                            </ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>

                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                    <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                    <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                        <a
                            *ngIf="getItemProp(processedItem, 'routerLink')"
                            [routerLink]="getItemProp(processedItem, 'routerLink')"
                            [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                            [attr.tabindex]="-1"
                            [attr.aria-hidden]="true"
                            [attr.data-pc-section]="'action'"
                            [queryParams]="getItemProp(processedItem, 'queryParams')"
                            [routerLinkActive]="'p-menuitem-link-active'"
                            [routerLinkActiveOptions]="getItemProp(processedItem, 'routerLinkActiveOptions') || { exact: false }"
                            [target]="getItemProp(processedItem, 'target')"
                            [ngClass]="{ 'p-menuitem-link': true, 'p-disabled': getItemProp(processedItem, 'disabled') }"
                            [fragment]="getItemProp(processedItem, 'fragment')"
                            [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                            [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                            [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                            [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                            [state]="getItemProp(processedItem, 'state')"
                            pRipple
                        >
                            <span
                                class="p-menuitem-icon"
                                *ngIf="getItemProp(processedItem, 'icon')"
                                [ngClass]="getItemProp(processedItem, 'icon')"
                                [ngStyle]="getItemProp(processedItem, 'iconStyle')"
                                [attr.data-pc-section]="'icon'"
                                [attr.aria-hidden]="true"
                                [attr.tabindex]="-1"
                            ></span>
                            <span class="p-menuitem-text" *ngIf="getItemProp(processedItem, 'escape'); else htmlRouteLabel">{{ getItemLabel(processedItem) }}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="getItemLabel(processedItem)" [attr.data-pc-section]="'label'"></span></ng-template>
                            <span class="p-menuitem-badge" *ngIf="getItemProp(processedItem, 'badge')" [ngClass]="getItemProp(processedItem, 'badgeStyleClass')">{{ getItemProp(processedItem, 'badge') }}</span>
                            <ng-container *ngIf="isItemGroup(processedItem)">
                                <ng-container *ngIf="!megaMenu.submenuIconTemplate">
                                    <AngleDownIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'horizontal'" [attr.aria-hidden]="true" />
                                    <AngleRightIcon [styleClass]="'p-submenu-icon'" [attr.data-pc-section]="'submenuicon'" *ngIf="orientation === 'vertical'" [attr.aria-hidden]="true" />
                                </ng-container>
                                <ng-template *ngTemplateOutlet="megaMenu.submenuIconTemplate" [attr.data-pc-section]="'submenuicon'" [attr.aria-hidden]="true"></ng-template>
                            </ng-container>
                        </a>
                    </div>
                    <div *ngIf="isItemVisible(processedItem) && isItemGroup(processedItem)" class="p-megamenu-panel" [attr.data-pc-section]="'panel'">
                        <div class="p-megamenu-grid" [attr.data-pc-section]="'grid'">
                            <div *ngFor="let col of processedItem.items" [ngClass]="getColumnClass(processedItem)">
                                <p-megaMenuSub
                                    *ngFor="let submenu of col"
                                    [id]="getSubListId(submenu)"
                                    [submenu]="submenu"
                                    [items]="submenu.items"
                                    [menuId]="menuId"
                                    [focusedItemId]="focusedItemId"
                                    [level]="level + 1"
                                    [root]="false"
                                    (itemClick)="itemClick.emit($event)"
                                    (itemMouseEnter)="onItemMouseEnter($event)"
                                >
                                </p-megaMenuSub>
                            </div>
                        </div>
                    </div>
                </li>
            </ng-template>
        </ul>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: MegaMenu }]; }, propDecorators: { id: [{
                type: Input
            }], items: [{
                type: Input
            }], menuId: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], level: [{
                type: Input
            }], focusedItemId: [{
                type: Input
            }], disabled: [{
                type: Input
            }], orientation: [{
                type: Input
            }], activeItem: [{
                type: Input
            }], submenu: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], root: [{
                type: Input
            }], itemClick: [{
                type: Output
            }], itemMouseEnter: [{
                type: Output
            }], menuFocus: [{
                type: Output
            }], menuBlur: [{
                type: Output
            }], menuKeydown: [{
                type: Output
            }], menubarViewChild: [{
                type: ViewChild,
                args: ['menubar', { static: true }]
            }] } });
/**
 * MegaMenu is navigation component that displays submenus together.
 * @group Components
 */
class MegaMenu {
    document;
    platformId;
    el;
    renderer;
    config;
    cd;
    /**
     * An array of menuitems.
     * @group Props
     */
    set model(value) {
        this._model = value;
        this._processedItems = this.createProcessedItems(this._model || []);
    }
    get model() {
        return this._model;
    }
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
     * Defines the orientation.
     * @group Props
     */
    orientation = 'horizontal';
    /**
     * Current id state as a string.
     * @group Props
     */
    id;
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
     * When present, it specifies that the component should be disabled.
     * @group Props
     */
    disabled = false;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    templates;
    menubutton;
    rootmenu;
    startTemplate;
    endTemplate;
    menuIconTemplate;
    submenuIconTemplate;
    outsideClickListener;
    resizeListener;
    dirty = false;
    focused = false;
    activeItem = signal(null);
    focusedItemInfo = signal({ index: -1, level: 0, parentKey: '' });
    searchValue = '';
    searchTimeout;
    _processedItems;
    _model;
    get visibleItems() {
        const processedItem = ObjectUtils.isNotEmpty(this.activeItem()) ? this.activeItem() : null;
        return processedItem && processedItem.key === this.focusedItemInfo().parentKey
            ? processedItem.items.reduce((items, col) => {
                col.forEach((submenu) => {
                    submenu.items.forEach((a) => {
                        items.push(a);
                    });
                });
                return items;
            }, [])
            : this.processedItems;
    }
    get processedItems() {
        if (!this._processedItems || !this._processedItems.length) {
            this._processedItems = this.createProcessedItems(this.model || []);
        }
        return this._processedItems;
    }
    get focusedItemId() {
        return ObjectUtils.isNotEmpty(this.focusedItemInfo().key) ? `${this.id}_${this.focusedItemInfo().key}` : null;
    }
    constructor(document, platformId, el, renderer, config, cd) {
        this.document = document;
        this.platformId = platformId;
        this.el = el;
        this.renderer = renderer;
        this.config = config;
        this.cd = cd;
        effect(() => {
            const activeItem = this.activeItem();
            if (ObjectUtils.isNotEmpty(activeItem)) {
                this.bindOutsideClickListener();
                this.bindResizeListener();
            }
            else {
                this.unbindOutsideClickListener();
                this.unbindResizeListener();
            }
        });
    }
    ngOnInit() {
        this.id = this.id || UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'start':
                    this.startTemplate = item.template;
                    break;
                case 'end':
                    this.endTemplate = item.template;
                    break;
                case 'menuicon':
                    this.menuIconTemplate = item.template;
                    break;
                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
            }
        });
    }
    createProcessedItems(items, level = 0, parent = {}, parentKey = '', columnIndex) {
        const processedItems = [];
        items &&
            items.forEach((item, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + (columnIndex !== undefined ? columnIndex + '_' : '') + index;
                const newItem = {
                    item,
                    index,
                    level,
                    key,
                    parent,
                    parentKey,
                    columnIndex: columnIndex !== undefined ? columnIndex : parent.columnIndex !== undefined ? parent.columnIndex : index
                };
                newItem['items'] =
                    level === 0 && item.items && item.items.length > 0 ? item.items.map((_items, _index) => this.createProcessedItems(_items, level + 1, newItem, key, _index)) : this.createProcessedItems(item.items, level + 1, newItem, key);
                processedItems.push(newItem);
            });
        return processedItems;
    }
    getItemProp(item, name) {
        return item ? ObjectUtils.getItemValue(item[name]) : undefined;
    }
    onItemClick(event) {
        const { originalEvent, processedItem } = event;
        const grouped = this.isProcessedItemGroup(processedItem);
        const root = ObjectUtils.isEmpty(processedItem.parent);
        const selected = this.isSelected(processedItem);
        if (selected) {
            const { index, key, parentKey } = processedItem;
            this.activeItem.set(null);
            this.focusedItemInfo.set({ index, key, parentKey });
            this.dirty = !root;
            DomHandler.focus(this.rootmenu.menubarViewChild.nativeElement);
        }
        else {
            if (grouped) {
                this.onItemChange(event);
            }
            else {
                const rootProcessedItem = root ? processedItem : this.activeItem();
                this.hide(originalEvent);
                this.changeFocusedItemInfo(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);
                DomHandler.focus(this.rootmenu.menubarViewChild.nativeElement);
            }
        }
    }
    onItemMouseEnter(event) {
        if (!DomHandler.isTouchDevice()) {
            if (this.dirty) {
                this.onItemChange(event);
            }
        }
    }
    scrollInView(index = -1) {
        const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
        const element = DomHandler.findSingle(this.rootmenu.el.nativeElement, `li[id="${id}"]`);
        if (element) {
            element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
        }
    }
    onItemChange(event) {
        const { processedItem, isFocus } = event;
        if (ObjectUtils.isEmpty(processedItem))
            return;
        const { index, key, parentKey, items } = processedItem;
        const grouped = ObjectUtils.isNotEmpty(items);
        if (grouped) {
            this.activeItem.set(processedItem);
        }
        this.focusedItemInfo.set({ index, key, parentKey });
        grouped && (this.dirty = true);
        isFocus && DomHandler.focus(this.rootmenu.menubarViewChild.nativeElement);
    }
    hide(event, isFocus) {
        this.activeItem.set(null);
        this.focusedItemInfo.set({ index: -1, key: '', parentKey: '' });
        isFocus && DomHandler.focus(this.rootmenu.menubarViewChild.nativeElement);
        this.dirty = false;
    }
    onMenuFocus(event) {
        this.focused = true;
        if (this.focusedItemInfo().index === -1) {
            const index = this.findFirstFocusedItemIndex();
            const processedItem = this.findVisibleItem(index);
            this.focusedItemInfo.set({ index, key: processedItem.key, parentKey: processedItem.parentKey });
        }
    }
    onMenuBlur(event) {
        this.focused = false;
        this.focusedItemInfo.set({ index: -1, level: 0, parentKey: '' });
        this.searchValue = '';
        this.dirty = false;
    }
    onKeyDown(event) {
        const metaKey = event.metaKey || event.ctrlKey;
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;
            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;
            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'Space':
                this.onSpaceKey(event);
                break;
            case 'Enter':
                this.onEnterKey(event);
                break;
            case 'Escape':
                this.onEscapeKey(event);
                break;
            case 'Tab':
                this.onTabKey(event);
                break;
            case 'PageDown':
            case 'PageUp':
            case 'Backspace':
            case 'ShiftLeft':
            case 'ShiftRight':
                //NOOP
                break;
            default:
                if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                    this.searchItems(event, event.key);
                }
                break;
        }
    }
    findFirstFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
    }
    findFirstItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidItem(processedItem));
    }
    findSelectedItemIndex() {
        return this.visibleItems.findIndex((processedItem) => this.isValidSelectedItem(processedItem));
    }
    isProcessedItemGroup(processedItem) {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }
    isSelected(processedItem) {
        return ObjectUtils.isNotEmpty(this.activeItem()) ? this.activeItem().key === processedItem.key : false;
    }
    isValidSelectedItem(processedItem) {
        return this.isValidItem(processedItem) && this.isSelected(processedItem);
    }
    isValidItem(processedItem) {
        return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
    }
    isItemDisabled(item) {
        return this.getItemProp(item, 'disabled');
    }
    isItemSeparator(item) {
        return this.getItemProp(item, 'separator');
    }
    isItemMatched(processedItem) {
        return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
    }
    isProccessedItemGroup(processedItem) {
        return processedItem && ObjectUtils.isNotEmpty(processedItem.items);
    }
    searchItems(event, char) {
        this.searchValue = (this.searchValue || '') + char;
        let itemIndex = -1;
        let matched = false;
        if (this.focusedItemInfo().index !== -1) {
            itemIndex = this.visibleItems.slice(this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem));
            itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo().index;
        }
        else {
            itemIndex = this.visibleItems.findIndex((processedItem) => this.isItemMatched(processedItem));
        }
        if (itemIndex !== -1) {
            matched = true;
        }
        if (itemIndex === -1 && this.focusedItemInfo().index === -1) {
            itemIndex = this.findFirstFocusedItemIndex();
        }
        if (itemIndex !== -1) {
            this.changeFocusedItemInfo(event, itemIndex);
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.searchValue = '';
            this.searchTimeout = null;
        }, 500);
        return matched;
    }
    getProccessedItemLabel(processedItem) {
        return processedItem ? this.getItemLabel(processedItem.item) : undefined;
    }
    getItemLabel(item) {
        return this.getItemProp(item, 'label');
    }
    changeFocusedItemInfo(event, index) {
        const processedItem = this.findVisibleItem(index);
        this.focusedItemInfo.mutate((value) => {
            value.index = index;
            value.key = ObjectUtils.isNotEmpty(processedItem) ? processedItem.key : '';
        });
        this.scrollInView();
    }
    onArrowDownKey(event) {
        if (this.orientation === 'horizontal') {
            if (ObjectUtils.isNotEmpty(this.activeItem()) && this.activeItem().key === this.focusedItemInfo().key) {
                this.focusedItemInfo.set({ index: -1, key: '', parentKey: this.activeItem().key });
            }
            else {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);
                if (grouped) {
                    this.onItemChange({ originalEvent: event, processedItem });
                    this.focusedItemInfo.set({ index: -1, key: processedItem.key, parentKey: processedItem.parentKey });
                    this.searchValue = '';
                }
            }
        }
        const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
        this.changeFocusedItemInfo(event, itemIndex);
        event.preventDefault();
    }
    onArrowRightKey(event) {
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);
        if (grouped) {
            if (this.orientation === 'vertical') {
                if (ObjectUtils.isNotEmpty(this.activeItem()) && this.activeItem().key === processedItem.key) {
                    this.focusedItemInfo.set({ index: -1, key: '', parentKey: this.activeItem().key });
                }
                else {
                    const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                    const grouped = this.isProccessedItemGroup(processedItem);
                    if (grouped) {
                        this.onItemChange({ originalEvent: event, processedItem });
                        this.focusedItemInfo.set({ index: -1, key: processedItem.key, parentKey: processedItem.parentKey });
                        this.searchValue = '';
                    }
                }
            }
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
            this.changeFocusedItemInfo(event, itemIndex);
        }
        else {
            const columnIndex = processedItem.columnIndex + 1;
            const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);
            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }
        event.preventDefault();
    }
    onArrowUpKey(event) {
        if (event.altKey && this.orientation === 'horizontal') {
            if (this.focusedItemInfo().index !== -1) {
                const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
                const grouped = this.isProccessedItemGroup(processedItem);
                if (!grouped && ObjectUtils.isNotEmpty(this.activeItem)) {
                    if (this.focusedItemInfo().index === 0) {
                        this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, parentKey: this.activeItem().parentKey });
                        this.activeItem.set(null);
                    }
                    else {
                        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
                    }
                }
            }
            event.preventDefault();
        }
        else {
            const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
            this.changeFocusedItemInfo(event, itemIndex);
            event.preventDefault();
        }
    }
    onArrowLeftKey(event) {
        const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
        const grouped = this.isProccessedItemGroup(processedItem);
        if (grouped) {
            if (this.orientation === 'horizontal') {
                const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
                this.changeFocusedItemInfo(event, itemIndex);
            }
        }
        else {
            if (this.orientation === 'vertical' && ObjectUtils.isNotEmpty(this.activeItem())) {
                if (processedItem.columnIndex === 0) {
                    this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key, parentKey: this.activeItem().parentKey });
                    this.activeItem.set(null);
                }
            }
            const columnIndex = processedItem.columnIndex - 1;
            const itemIndex = this.visibleItems.findIndex((item) => item.columnIndex === columnIndex);
            itemIndex !== -1 && this.changeFocusedItemInfo(event, itemIndex);
        }
        event.preventDefault();
    }
    onHomeKey(event) {
        this.changeFocusedItemInfo(event, this.findFirstItemIndex());
        event.preventDefault();
    }
    onEndKey(event) {
        this.changeFocusedItemInfo(event, this.findLastItemIndex());
        event.preventDefault();
    }
    onSpaceKey(event) {
        this.onEnterKey(event);
    }
    onEscapeKey(event) {
        if (ObjectUtils.isNotEmpty(this.activeItem())) {
            this.focusedItemInfo.set({ index: this.activeItem().index, key: this.activeItem().key });
            this.activeItem.set(null);
        }
        event.preventDefault();
    }
    onTabKey(event) {
        if (this.focusedItemInfo().index !== -1) {
            const processedItem = this.findVisibleItem(this.focusedItemInfo().index);
            const grouped = this.isProccessedItemGroup(processedItem);
            !grouped && this.onItemChange({ originalEvent: event, processedItem });
        }
        this.hide();
    }
    onEnterKey(event) {
        if (this.focusedItemInfo().index !== -1) {
            const element = DomHandler.findSingle(this.rootmenu.el.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
            const anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
            anchorElement ? anchorElement.click() : element && element.click();
            const processedItem = this.visibleItems[this.focusedItemInfo().index];
            const grouped = this.isProccessedItemGroup(processedItem);
            !grouped && this.changeFocusedItemInfo(event, this.findFirstFocusedItemIndex());
        }
        event.preventDefault();
    }
    findVisibleItem(index) {
        return ObjectUtils.isNotEmpty(this.visibleItems) ? this.visibleItems[index] : null;
    }
    findLastFocusedItemIndex() {
        const selectedIndex = this.findSelectedItemIndex();
        return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
    }
    findLastItemIndex() {
        return ObjectUtils.findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
    }
    findPrevItemIndex(index) {
        const matchedItemIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;
        return matchedItemIndex > -1 ? matchedItemIndex : index;
    }
    findNextItemIndex(index) {
        const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;
        return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
    }
    bindResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.resizeListener) {
                this.resizeListener = this.renderer.listen(this.document.defaultView, 'resize', (event) => {
                    this.hide(event, true);
                });
            }
        }
    }
    bindOutsideClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.outsideClickListener) {
                this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                    const isOutsideContainer = this.rootmenu.el.nativeElement !== event.target && !this.rootmenu.el.nativeElement.contains(event.target);
                    if (isOutsideContainer) {
                        this.hide();
                    }
                });
            }
        }
    }
    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }
    unbindResizeListener() {
        if (this.resizeListener) {
            this.resizeListener();
            this.resizeListener = null;
        }
    }
    ngOnDestroy() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MegaMenu, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i5.PrimeNGConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: MegaMenu, selector: "p-megaMenu", inputs: { model: "model", style: "style", styleClass: "styleClass", orientation: "orientation", id: "id", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", disabled: "disabled", tabindex: "tabindex" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "menubutton", first: true, predicate: ["menubutton"], descendants: true }, { propertyName: "rootmenu", first: true, predicate: ["rootmenu"], descendants: true }], ngImport: i0, template: `
        <div
            [ngClass]="{ 'p-megamenu p-component': true, 'p-megamenu-horizontal': orientation == 'horizontal', 'p-megamenu-vertical': orientation == 'vertical' }"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'megamenu'"
            [id]="id"
        >
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <p-megaMenuSub
                #rootmenu
                [items]="processedItems"
                [id]="id + '_list'"
                [menuId]="id"
                [root]="true"
                [orientation]="orientation"
                [ariaLabel]="ariaLabel"
                [disabled]="disabled"
                [tabindex]="!disabled ? tabindex : -1"
                [activeItem]="activeItem()"
                [level]="0"
                [ariaLabelledBy]="ariaLabelledBy"
                [focusedItemId]="focused ? focusedItemId : undefined"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-megaMenuSub>
            <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-megamenu-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: [".p-megamenu-root-list{margin:0;padding:0;list-style:none}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{margin:0;padding:0;list-style:none}.p-megamenu-horizontal{align-items:center}.p-megamenu-horizontal .p-megamenu-root-list{display:flex;align-items:center;flex-wrap:wrap}.p-megamenu-horizontal .p-megamenu-end{margin-left:auto;align-self:center}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-submenu-icon:not(svg){margin-left:auto}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-icon-wrapper{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: MegaMenuSub, selector: "p-megaMenuSub", inputs: ["id", "items", "menuId", "ariaLabel", "ariaLabelledBy", "level", "focusedItemId", "disabled", "orientation", "activeItem", "submenu", "tabindex", "root"], outputs: ["itemClick", "itemMouseEnter", "menuFocus", "menuBlur", "menuKeydown"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { MegaMenu };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MegaMenu, decorators: [{
            type: Component,
            args: [{ selector: 'p-megaMenu', template: `
        <div
            [ngClass]="{ 'p-megamenu p-component': true, 'p-megamenu-horizontal': orientation == 'horizontal', 'p-megamenu-vertical': orientation == 'vertical' }"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.data-pc-section]="'root'"
            [attr.data-pc-name]="'megamenu'"
            [id]="id"
        >
            <div class="p-megamenu-start" *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </div>
            <p-megaMenuSub
                #rootmenu
                [items]="processedItems"
                [id]="id + '_list'"
                [menuId]="id"
                [root]="true"
                [orientation]="orientation"
                [ariaLabel]="ariaLabel"
                [disabled]="disabled"
                [tabindex]="!disabled ? tabindex : -1"
                [activeItem]="activeItem()"
                [level]="0"
                [ariaLabelledBy]="ariaLabelledBy"
                [focusedItemId]="focused ? focusedItemId : undefined"
                (itemClick)="onItemClick($event)"
                (menuFocus)="onMenuFocus($event)"
                (menuBlur)="onMenuBlur($event)"
                (menuKeydown)="onKeyDown($event)"
                (itemMouseEnter)="onItemMouseEnter($event)"
            ></p-megaMenuSub>
            <div class="p-megamenu-end" *ngIf="endTemplate; else legacy">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </div>
            <ng-template #legacy>
                <div class="p-megamenu-end">
                    <ng-content></ng-content>
                </div>
            </ng-template>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-megamenu-root-list{margin:0;padding:0;list-style:none}.p-megamenu-root-list>.p-menuitem{position:relative}.p-megamenu .p-menuitem-link{cursor:pointer;display:flex;align-items:center;text-decoration:none;overflow:hidden;position:relative}.p-megamenu .p-menuitem-text{line-height:1}.p-megamenu-panel{display:none;position:absolute;width:auto;z-index:1}.p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{display:block}.p-megamenu-submenu{margin:0;padding:0;list-style:none}.p-megamenu-horizontal{align-items:center}.p-megamenu-horizontal .p-megamenu-root-list{display:flex;align-items:center;flex-wrap:wrap}.p-megamenu-horizontal .p-megamenu-end{margin-left:auto;align-self:center}.p-megamenu-vertical .p-megamenu-root-list{flex-direction:column}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem-active>.p-megamenu-panel{left:100%;top:0}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-submenu-icon:not(svg){margin-left:auto}.p-megamenu-vertical .p-megamenu-root-list>.p-menuitem>.p-menuitem-content>.p-menuitem-link>.p-icon-wrapper{margin-left:auto}.p-megamenu-grid{display:flex}.p-megamenu-col-2,.p-megamenu-col-3,.p-megamenu-col-4,.p-megamenu-col-6,.p-megamenu-col-12{flex:0 0 auto;padding:.5rem}.p-megamenu-col-2{width:16.6667%}.p-megamenu-col-3{width:25%}.p-megamenu-col-4{width:33.3333%}.p-megamenu-col-6{width:50%}.p-megamenu-col-12{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i5.PrimeNGConfig }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { model: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], orientation: [{
                type: Input
            }], id: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], disabled: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], menubutton: [{
                type: ViewChild,
                args: ['menubutton']
            }], rootmenu: [{
                type: ViewChild,
                args: ['rootmenu']
            }] } });
class MegaMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MegaMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: MegaMenuModule, declarations: [MegaMenu, MegaMenuSub], imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon], exports: [MegaMenu, RouterModule, TooltipModule, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MegaMenuModule, imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon, RouterModule, TooltipModule, SharedModule] });
}
export { MegaMenuModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MegaMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, RippleModule, TooltipModule, SharedModule, AngleDownIcon, AngleRightIcon],
                    exports: [MegaMenu, RouterModule, TooltipModule, SharedModule],
                    declarations: [MegaMenu, MegaMenuSub]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvbWVnYW1lbnUvbWVnYW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBRUgsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUdSLE1BQU0sRUFDTixXQUFXLEVBSVgsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEVBQ04sTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXlDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDakcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQUUvRCxNQTJKYSxXQUFXO0lBdUNEO0lBQXVCO0lBdENqQyxFQUFFLENBQXFCO0lBRXZCLEtBQUssQ0FBb0I7SUFFekIsTUFBTSxDQUFxQjtJQUUzQixTQUFTLENBQXFCO0lBRTlCLGNBQWMsQ0FBcUI7SUFFbkMsS0FBSyxHQUFXLENBQUMsQ0FBQztJQUVsQixhQUFhLENBQXFCO0lBRWxDLFFB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LEtBQUs7Z0JBS0csUUFBUTtzQkFBaEIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUUwQixTQUFTO3NCQUF4QyxlQUFlO3VCQUFDLGFBQWE7Z0JBRUwsVUFBVTtzQkFBbEMsU0FBUzt1QkFBQyxZQUFZO2dCQUVBLFFBQVE7c0JBQTlCLFNBQVM7dUJBQUMsVUFBVTs7QUFxbEJ6QixNQUthLGNBQWM7dUdBQWQsY0FBYzt3R0FBZCxjQUFjLGlCQW5wQmQsUUFBUSxFQTVNUixXQUFXLGFBMjFCVixZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLGFBL29CckcsUUFBUSxFQWdwQkcsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZO3dHQUdwRCxjQUFjLFlBSmIsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUMxRixZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVk7O1NBR3BELGNBQWM7MkZBQWQsY0FBYztrQkFMMUIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUM7b0JBQy9HLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDOUQsWUFBWSxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQztpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgZWZmZWN0LFxuICAgIHNpZ25hbFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNZWdhTWVudUl0ZW0sIE1lbnVJdGVtLCBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgQW5nbGVEb3duSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvYW5nbGVkb3duJztcbmltcG9ydCB7IEFuZ2xlUmlnaHRJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hbmdsZXJpZ2h0JztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IE9iamVjdFV0aWxzLCBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVnYU1lbnVTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bFxuICAgICAgICAgICAgI21lbnViYXJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtbWVnYW1lbnUtcm9vdC1saXN0Jzogcm9vdCwgJ3Atc3VibWVudS1saXN0IHAtbWVnYW1lbnUtc3VibWVudSc6ICFyb290IH1cIlxuICAgICAgICAgICAgW2F0dHIucm9sZV09XCJyb290ID8gJ21lbnViYXInIDogJ21lbnUnXCJcbiAgICAgICAgICAgIFtpZF09XCJpZFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLW9yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiZm9jdXNlZEl0ZW1JZFwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwicm9vdCA/ICdyb290JyA6ICdzdWJtZW51J1wiXG4gICAgICAgICAgICAoa2V5ZG93bik9XCJtZW51S2V5ZG93bi5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGZvY3VzKT1cIm1lbnVGb2N1cy5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGJsdXIpPVwibWVudUJsdXIuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwic3VibWVudVwiIFtuZ0NsYXNzXT1cImdldFN1Ym1lbnVIZWFkZXJDbGFzcyhzdWJtZW51KVwiIFtzdHlsZV09XCJnZXRJdGVtUHJvcChzdWJtZW51LCAnc3R5bGUnKVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj57eyBnZXRJdGVtTGFiZWwoc3VibWVudSkgfX08L2xpPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1wcm9jZXNzZWRJdGVtIFtuZ0Zvck9mXT1cIml0ZW1zXCIgbGV0LWluZGV4PVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmIGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzZXBhcmF0b3InKVwiXG4gICAgICAgICAgICAgICAgICAgIFtpZF09XCJnZXRJdGVtSWQocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3N0eWxlJylcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRTZXBhcmF0b3JJdGVtQ2xhc3MocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwic2VwYXJhdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzZXBhcmF0b3InXCJcbiAgICAgICAgICAgICAgICA+PC9saT5cbiAgICAgICAgICAgICAgICA8bGlcbiAgICAgICAgICAgICAgICAgICAgI2xpc3RJdGVtXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaXNJdGVtVmlzaWJsZShwcm9jZXNzZWRJdGVtKSAmJiAhZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NlcGFyYXRvcicpXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cImdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbWVudWl0ZW0nXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWhpZ2hsaWdodF09XCJpc0l0ZW1BY3RpdmUocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXAtZm9jdXNlZF09XCJpc0l0ZW1Gb2N1c2VkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cImlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pIHx8IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSkgJiYgIWdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0bycpID8gJ21lbnUnIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKSA/IGlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGV2ZWxdPVwibGV2ZWwgKyAxXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZXRzaXplXT1cImdldEFyaWFTZXRTaXplKClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXBvc2luc2V0XT1cImdldEFyaWFQb3NJbnNldChpbmRleClcIlxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImdldEl0ZW1DbGFzcyhwcm9jZXNzZWRJdGVtKVwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3R5bGVDbGFzcycpXCJcbiAgICAgICAgICAgICAgICAgICAgcFRvb2x0aXBcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd0b29sdGlwT3B0aW9ucycpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1lbnVpdGVtLWNvbnRlbnRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NvbnRlbnQnXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgcHJvY2Vzc2VkSXRlbSlcIiAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKHskZXZlbnQsIHByb2Nlc3NlZEl0ZW19KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cIiFnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAncm91dGVyTGluaycpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5ocmVmXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd1cmwnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uaWRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2F1dG9tYXRpb25JZCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2FjdGlvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLW1lbnVpdGVtLWxpbmsnOiB0cnVlLCAncC1kaXNhYmxlZCc6IGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cIi0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLW1lbnVpdGVtLWljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb25TdHlsZScpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpY29uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdlc2NhcGUnKTsgZWxzZSBodG1sTGFiZWxcIiBjbGFzcz1cInAtbWVudWl0ZW0tdGV4dFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbGFiZWwnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxMYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiBbaW5uZXJIVE1MXT1cImdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbGFiZWwnXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLWJhZGdlXCIgKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2UnKVwiIFtuZ0NsYXNzXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdiYWRnZVN0eWxlQ2xhc3MnKVwiPnt7IGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdiYWRnZScpIH19PC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbWVnYU1lbnUuc3VibWVudUljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuZ2xlRG93bkljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVSaWdodEljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc3VibWVudS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgKm5nSWY9XCJvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibWVnYU1lbnUuc3VibWVudUljb25UZW1wbGF0ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInc3VibWVudWljb24nXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3JvdXRlckxpbmsnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1hdXRvbWF0aW9uaWRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2F1dG9tYXRpb25JZCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCItMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidhY3Rpb24nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3F1ZXJ5UGFyYW1zJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIidwLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucycpIHx8IHsgZXhhY3Q6IGZhbHNlIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0YXJnZXRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3RhcmdldCcpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLW1lbnVpdGVtLWxpbmsnOiB0cnVlLCAncC1kaXNhYmxlZCc6IGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdkaXNhYmxlZCcpIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZnJhZ21lbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3F1ZXJ5UGFyYW1zSGFuZGxpbmcnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ByZXNlcnZlRnJhZ21lbnRdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3ByZXNlcnZlRnJhZ21lbnQnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc2tpcExvY2F0aW9uQ2hhbmdlJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdyZXBsYWNlVXJsJylcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnc3RhdGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1pY29uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnaWNvbicpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2ljb24nKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdpY29uU3R5bGUnKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLW1lbnVpdGVtLXRleHRcIiAqbmdJZj1cImdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdlc2NhcGUnKTsgZWxzZSBodG1sUm91dGVMYWJlbFwiPnt7IGdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS10ZXh0XCIgW2lubmVySFRNTF09XCJnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbSlcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2xhYmVsJ1wiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1tZW51aXRlbS1iYWRnZVwiICpuZ0lmPVwiZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2JhZGdlJylcIiBbbmdDbGFzc109XCJnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2VTdHlsZUNsYXNzJylcIj57eyBnZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnYmFkZ2UnKSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtZWdhTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QW5nbGVEb3duSWNvbiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiAqbmdJZj1cIm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbmdsZVJpZ2h0SWNvbiBbc3R5bGVDbGFzc109XCIncC1zdWJtZW51LWljb24nXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiAqbmdJZj1cIm9yaWVudGF0aW9uID09PSAndmVydGljYWwnXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtZWdhTWVudS5zdWJtZW51SWNvblRlbXBsYXRlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdWJtZW51aWNvbidcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmIGlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pXCIgY2xhc3M9XCJwLW1lZ2FtZW51LXBhbmVsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidwYW5lbCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLW1lZ2FtZW51LWdyaWRcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2dyaWQnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY29sIG9mIHByb2Nlc3NlZEl0ZW0uaXRlbXNcIiBbbmdDbGFzc109XCJnZXRDb2x1bW5DbGFzcyhwcm9jZXNzZWRJdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1tZWdhTWVudVN1YlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHN1Ym1lbnUgb2YgY29sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpZF09XCJnZXRTdWJMaXN0SWQoc3VibWVudSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1Ym1lbnVdPVwic3VibWVudVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXRlbXNdPVwic3VibWVudS5pdGVtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWVudUlkXT1cIm1lbnVJZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9jdXNlZEl0ZW1JZF09XCJmb2N1c2VkSXRlbUlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Jvb3RdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGl0ZW1DbGljayk9XCJpdGVtQ2xpY2suZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpdGVtTW91c2VFbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcC1tZWdhTWVudVN1Yj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC91bD5cbiAgICBgLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51U3ViIHtcbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgaXRlbXM6IGFueVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbWVudUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBsZXZlbDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIGZvY3VzZWRJdGVtSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgYWN0aXZlSXRlbTogYW55O1xuXG4gICAgQElucHV0KCkgc3VibWVudTogYW55O1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSByb290OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgaXRlbUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBpdGVtTW91c2VFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgbWVudUZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBtZW51Qmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgbWVudUtleWRvd246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbWVudWJhcicsIHsgc3RhdGljOiB0cnVlIH0pIG1lbnViYXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBtZWdhTWVudTogTWVnYU1lbnUpIHt9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudDogYW55LCBwcm9jZXNzZWRJdGVtOiBhbnkpIHtcbiAgICAgICAgdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnY29tbWFuZCcsIHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGl0ZW06IHByb2Nlc3NlZEl0ZW0uaXRlbSB9KTtcbiAgICAgICAgdGhpcy5pdGVtQ2xpY2suZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtLCBpc0ZvY3VzOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIGdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW06IGFueSwgbmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSB8IG51bGwgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtICYmIHByb2Nlc3NlZEl0ZW0uaXRlbSA/IE9iamVjdFV0aWxzLmdldEl0ZW1WYWx1ZShwcm9jZXNzZWRJdGVtLml0ZW1bbmFtZV0sIHBhcmFtcykgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUlkKHByb2Nlc3NlZEl0ZW06IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm1lbnVJZH1fJHtwcm9jZXNzZWRJdGVtLmtleX1gO1xuICAgIH1cblxuICAgIGdldFN1Ykxpc3RJZChwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKX1fbGlzdGA7XG4gICAgfVxuXG4gICAgZ2V0SXRlbUNsYXNzKHByb2Nlc3NlZEl0ZW06IGFueSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnY2xhc3MnKSxcbiAgICAgICAgICAgICdwLW1lbnVpdGVtJzogdHJ1ZSxcbiAgICAgICAgICAgICdwLW1lbnVpdGVtLWFjdGl2ZSBwLWhpZ2hsaWdodCc6IHRoaXMuaXNJdGVtQWN0aXZlKHByb2Nlc3NlZEl0ZW0pLFxuICAgICAgICAgICAgJ3AtZm9jdXMnOiB0aGlzLmlzSXRlbUZvY3VzZWQocHJvY2Vzc2VkSXRlbSksXG4gICAgICAgICAgICAncC1kaXNhYmxlZCc6IHRoaXMuaXNJdGVtRGlzYWJsZWQocHJvY2Vzc2VkSXRlbSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRJdGVtTGFiZWwocHJvY2Vzc2VkSXRlbTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ2xhYmVsJyk7XG4gICAgfVxuXG4gICAgZ2V0U2VwYXJhdG9ySXRlbUNsYXNzKHByb2Nlc3NlZEl0ZW06IGFueSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnY2xhc3MnKSxcbiAgICAgICAgICAgICdwLW1lbnVpdGVtLXNlcGFyYXRvcic6IHRydWVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRDb2x1bW5DbGFzcyhwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIGxldCBsZW5ndGggPSB0aGlzLmlzSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pID8gcHJvY2Vzc2VkSXRlbS5pdGVtcy5sZW5ndGggOiAwO1xuICAgICAgICBsZXQgY29sdW1uQ2xhc3M7XG5cbiAgICAgICAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcyA9ICdwLW1lZ2FtZW51LWNvbC02JztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzID0gJ3AtbWVnYW1lbnUtY29sLTQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgY29sdW1uQ2xhc3MgPSAncC1tZWdhbWVudS1jb2wtMyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcyA9ICdwLW1lZ2FtZW51LWNvbC0yJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcyA9ICdwLW1lZ2FtZW51LWNvbC0xMic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sdW1uQ2xhc3M7XG4gICAgfVxuXG4gICAgZ2V0U3VibWVudUhlYWRlckNsYXNzKHByb2Nlc3NlZEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLW1lZ2FtZW51LXN1Ym1lbnUtaGVhZGVyIHAtc3VibWVudS1oZWFkZXInOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGlzYWJsZWQnOiB0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0pLFxuICAgICAgICAgICAgLi4udGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnY2xhc3MnKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlzSXRlbVZpc2libGUocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICd2aXNpYmxlJykgIT09IGZhbHNlO1xuICAgIH1cblxuICAgIGlzSXRlbUFjdGl2ZShwcm9jZXNzZWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuYWN0aXZlSXRlbSkgPyB0aGlzLmFjdGl2ZUl0ZW0ua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSA6IGZhbHNlO1xuICAgIH1cblxuICAgIGlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJdGVtUHJvcChwcm9jZXNzZWRJdGVtLCAnZGlzYWJsZWQnKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1Gb2N1c2VkKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mb2N1c2VkSXRlbUlkID09PSB0aGlzLmdldEl0ZW1JZChwcm9jZXNzZWRJdGVtKTtcbiAgICB9XG5cbiAgICBpc0l0ZW1Hcm91cChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkocHJvY2Vzc2VkSXRlbS5pdGVtcyk7XG4gICAgfVxuXG4gICAgZ2V0QXJpYVNldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcigocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmICF0aGlzLmdldEl0ZW1Qcm9wKHByb2Nlc3NlZEl0ZW0sICdzZXBhcmF0b3InKSkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldEFyaWFQb3NJbnNldChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBpbmRleCAtIHRoaXMuaXRlbXMuc2xpY2UoMCwgaW5kZXgpLmZpbHRlcigocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1WaXNpYmxlKHByb2Nlc3NlZEl0ZW0pICYmIHRoaXMuZ2V0SXRlbVByb3AocHJvY2Vzc2VkSXRlbSwgJ3NlcGFyYXRvcicpKS5sZW5ndGggKyAxO1xuICAgIH1cblxuICAgIG9uSXRlbU1vdXNlRW50ZXIocGFyYW06IGFueSkge1xuICAgICAgICBjb25zdCB7IGV2ZW50LCBwcm9jZXNzZWRJdGVtIH0gPSBwYXJhbTtcbiAgICAgICAgdGhpcy5pdGVtTW91c2VFbnRlci5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSk7XG4gICAgfVxufVxuLyoqXG4gKiBNZWdhTWVudSBpcyBuYXZpZ2F0aW9uIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIHN1Ym1lbnVzIHRvZ2V0aGVyLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1lZ2FNZW51JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLW1lZ2FtZW51IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtbWVnYW1lbnUtaG9yaXpvbnRhbCc6IG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJywgJ3AtbWVnYW1lbnUtdmVydGljYWwnOiBvcmllbnRhdGlvbiA9PSAndmVydGljYWwnIH1cIlxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIlxuICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ21lZ2FtZW51J1wiXG4gICAgICAgICAgICBbaWRdPVwiaWRcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZWdhbWVudS1zdGFydFwiICpuZ0lmPVwic3RhcnRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzdGFydFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwLW1lZ2FNZW51U3ViXG4gICAgICAgICAgICAgICAgI3Jvb3RtZW51XG4gICAgICAgICAgICAgICAgW2l0ZW1zXT1cInByb2Nlc3NlZEl0ZW1zXCJcbiAgICAgICAgICAgICAgICBbaWRdPVwiaWQgKyAnX2xpc3QnXCJcbiAgICAgICAgICAgICAgICBbbWVudUlkXT1cImlkXCJcbiAgICAgICAgICAgICAgICBbcm9vdF09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBbb3JpZW50YXRpb25dPVwib3JpZW50YXRpb25cIlxuICAgICAgICAgICAgICAgIFthcmlhTGFiZWxdPVwiYXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFt0YWJpbmRleF09XCIhZGlzYWJsZWQgPyB0YWJpbmRleCA6IC0xXCJcbiAgICAgICAgICAgICAgICBbYWN0aXZlSXRlbV09XCJhY3RpdmVJdGVtKClcIlxuICAgICAgICAgICAgICAgIFtsZXZlbF09XCIwXCJcbiAgICAgICAgICAgICAgICBbYXJpYUxhYmVsbGVkQnldPVwiYXJpYUxhYmVsbGVkQnlcIlxuICAgICAgICAgICAgICAgIFtmb2N1c2VkSXRlbUlkXT1cImZvY3VzZWQgPyBmb2N1c2VkSXRlbUlkIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAoaXRlbUNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChtZW51Rm9jdXMpPVwib25NZW51Rm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG1lbnVCbHVyKT1cIm9uTWVudUJsdXIoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKG1lbnVLZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoaXRlbU1vdXNlRW50ZXIpPVwib25JdGVtTW91c2VFbnRlcigkZXZlbnQpXCJcbiAgICAgICAgICAgID48L3AtbWVnYU1lbnVTdWI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZWdhbWVudS1lbmRcIiAqbmdJZj1cImVuZFRlbXBsYXRlOyBlbHNlIGxlZ2FjeVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJlbmRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2xlZ2FjeT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZWdhbWVudS1lbmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL21lZ2FtZW51LmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBNZWdhTWVudSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBtZW51aXRlbXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2V0IG1vZGVsKHZhbHVlOiBNZWdhTWVudUl0ZW1bXSB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9tb2RlbCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9wcm9jZXNzZWRJdGVtcyA9IHRoaXMuY3JlYXRlUHJvY2Vzc2VkSXRlbXModGhpcy5fbW9kZWwgfHwgW10pO1xuICAgIH1cbiAgICBnZXQgbW9kZWwoKTogTWVnYU1lbnVJdGVtW10gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDbGFzcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgb3JpZW50YXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgfCBzdHJpbmcgPSAnaG9yaXpvbnRhbCc7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBpZCBzdGF0ZSBhcyBhIHN0cmluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgYSBzdHJpbmcgdmFsdWUgdGhhdCBsYWJlbHMgYW4gaW50ZXJhY3RpdmUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSB1bmRlcmx5aW5nIGlucHV0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHByZXNlbnQsIGl0IHNwZWNpZmllcyB0aGF0IHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGRpc2FibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGFiYmluZyBvcmRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4gfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdtZW51YnV0dG9uJykgbWVudWJ1dHRvbjogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ3Jvb3RtZW51Jykgcm9vdG1lbnU6IE1lZ2FNZW51U3ViIHwgdW5kZWZpbmVkO1xuXG4gICAgc3RhcnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGVuZFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgbWVudUljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHN1Ym1lbnVJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBvdXRzaWRlQ2xpY2tMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgcmVzaXplTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRpcnR5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBhY3RpdmVJdGVtID0gc2lnbmFsPGFueT4obnVsbCk7XG5cbiAgICBmb2N1c2VkSXRlbUluZm8gPSBzaWduYWw8YW55Pih7IGluZGV4OiAtMSwgbGV2ZWw6IDAsIHBhcmVudEtleTogJycgfSk7XG5cbiAgICBzZWFyY2hWYWx1ZTogc3RyaW5nID0gJyc7XG5cbiAgICBzZWFyY2hUaW1lb3V0OiBhbnk7XG5cbiAgICBfcHJvY2Vzc2VkSXRlbXM6IGFueVtdO1xuXG4gICAgX21vZGVsOiBNZWdhTWVudUl0ZW1bXSB8IHVuZGVmaW5lZDtcblxuICAgIGdldCB2aXNpYmxlSXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuYWN0aXZlSXRlbSgpKSA/IHRoaXMuYWN0aXZlSXRlbSgpIDogbnVsbDtcblxuICAgICAgICByZXR1cm4gcHJvY2Vzc2VkSXRlbSAmJiBwcm9jZXNzZWRJdGVtLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5wYXJlbnRLZXlcbiAgICAgICAgICAgID8gcHJvY2Vzc2VkSXRlbS5pdGVtcy5yZWR1Y2UoKGl0ZW1zLCBjb2wpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbC5mb3JFYWNoKChzdWJtZW51KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc3VibWVudS5pdGVtcy5mb3JFYWNoKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goYSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICAgICAgICB9LCBbXSlcbiAgICAgICAgICAgIDogdGhpcy5wcm9jZXNzZWRJdGVtcztcbiAgICB9XG5cbiAgICBnZXQgcHJvY2Vzc2VkSXRlbXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcHJvY2Vzc2VkSXRlbXMgfHwgIXRoaXMuX3Byb2Nlc3NlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc2VkSXRlbXMgPSB0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKHRoaXMubW9kZWwgfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9jZXNzZWRJdGVtcztcbiAgICB9XG5cbiAgICBnZXQgZm9jdXNlZEl0ZW1JZCgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5rZXkpID8gYCR7dGhpcy5pZH1fJHt0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmtleX1gIDogbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgZWZmZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLmFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KGFjdGl2ZUl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kT3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ21lbnVpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzdWJtZW51aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWVudUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVQcm9jZXNzZWRJdGVtcyhpdGVtcywgbGV2ZWwgPSAwLCBwYXJlbnQgPSB7fSwgcGFyZW50S2V5ID0gJycsIGNvbHVtbkluZGV4Pykge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtcyA9IFtdO1xuXG4gICAgICAgIGl0ZW1zICYmXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IChwYXJlbnRLZXkgIT09ICcnID8gcGFyZW50S2V5ICsgJ18nIDogJycpICsgKGNvbHVtbkluZGV4ICE9PSB1bmRlZmluZWQgPyBjb2x1bW5JbmRleCArICdfJyA6ICcnKSArIGluZGV4O1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBsZXZlbCxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEtleSxcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uSW5kZXg6IGNvbHVtbkluZGV4ICE9PSB1bmRlZmluZWQgPyBjb2x1bW5JbmRleCA6ICg8YW55PnBhcmVudCkuY29sdW1uSW5kZXggIT09IHVuZGVmaW5lZCA/ICg8YW55PnBhcmVudCkuY29sdW1uSW5kZXggOiBpbmRleFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBuZXdJdGVtWydpdGVtcyddID1cbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPT09IDAgJiYgaXRlbS5pdGVtcyAmJiBpdGVtLml0ZW1zLmxlbmd0aCA+IDAgPyBpdGVtLml0ZW1zLm1hcCgoX2l0ZW1zLCBfaW5kZXgpID0+IHRoaXMuY3JlYXRlUHJvY2Vzc2VkSXRlbXMoX2l0ZW1zLCBsZXZlbCArIDEsIG5ld0l0ZW0sIGtleSwgX2luZGV4KSkgOiB0aGlzLmNyZWF0ZVByb2Nlc3NlZEl0ZW1zKGl0ZW0uaXRlbXMsIGxldmVsICsgMSwgbmV3SXRlbSwga2V5KTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRJdGVtcy5wdXNoKG5ld0l0ZW0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW1zO1xuICAgIH1cblxuICAgIGdldEl0ZW1Qcm9wKGl0ZW06IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBpdGVtID8gT2JqZWN0VXRpbHMuZ2V0SXRlbVZhbHVlKGl0ZW1bbmFtZV0pIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyBvcmlnaW5hbEV2ZW50LCBwcm9jZXNzZWRJdGVtIH0gPSBldmVudDtcbiAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBPYmplY3RVdGlscy5pc0VtcHR5KHByb2Nlc3NlZEl0ZW0ucGFyZW50KTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCB7IGluZGV4LCBrZXksIHBhcmVudEtleSB9ID0gcHJvY2Vzc2VkSXRlbTtcblxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4LCBrZXksIHBhcmVudEtleSB9KTtcblxuICAgICAgICAgICAgdGhpcy5kaXJ0eSA9ICFyb290O1xuICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Lm1lbnViYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2hhbmdlKGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm9vdFByb2Nlc3NlZEl0ZW0gPSByb290ID8gcHJvY2Vzc2VkSXRlbSA6IHRoaXMuYWN0aXZlSXRlbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZShvcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhvcmlnaW5hbEV2ZW50LCByb290UHJvY2Vzc2VkSXRlbSA/IHJvb3RQcm9jZXNzZWRJdGVtLmluZGV4IDogLTEpO1xuXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Lm1lbnViYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1Nb3VzZUVudGVyKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCFEb21IYW5kbGVyLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZShldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxJblZpZXcoaW5kZXg6IG51bWJlciA9IC0xKSB7XG4gICAgICAgIGNvbnN0IGlkID0gaW5kZXggIT09IC0xID8gYCR7dGhpcy5pZH1fJHtpbmRleH1gIDogdGhpcy5mb2N1c2VkSXRlbUlkO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMucm9vdG1lbnUuZWwubmF0aXZlRWxlbWVudCwgYGxpW2lkPVwiJHtpZH1cIl1gKTtcblxuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyAmJiBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnc3RhcnQnIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgeyBwcm9jZXNzZWRJdGVtLCBpc0ZvY3VzIH0gPSBldmVudDtcblxuICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNFbXB0eShwcm9jZXNzZWRJdGVtKSkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHsgaW5kZXgsIGtleSwgcGFyZW50S2V5LCBpdGVtcyB9ID0gcHJvY2Vzc2VkSXRlbTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZCA9IE9iamVjdFV0aWxzLmlzTm90RW1wdHkoaXRlbXMpO1xuXG4gICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uc2V0KHByb2Nlc3NlZEl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4LCBrZXksIHBhcmVudEtleSB9KTtcblxuICAgICAgICBncm91cGVkICYmICh0aGlzLmRpcnR5ID0gdHJ1ZSk7XG4gICAgICAgIGlzRm9jdXMgJiYgRG9tSGFuZGxlci5mb2N1cyh0aGlzLnJvb3RtZW51Lm1lbnViYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgaGlkZShldmVudD8sIGlzRm9jdXM/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbS5zZXQobnVsbCk7XG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4OiAtMSwga2V5OiAnJywgcGFyZW50S2V5OiAnJyB9KTtcblxuICAgICAgICBpc0ZvY3VzICYmIERvbUhhbmRsZXIuZm9jdXModGhpcy5yb290bWVudS5tZW51YmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25NZW51Rm9jdXMoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCk7XG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0oaW5kZXgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleCwga2V5OiBwcm9jZXNzZWRJdGVtLmtleSwgcGFyZW50S2V5OiBwcm9jZXNzZWRJdGVtLnBhcmVudEtleSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTWVudUJsdXIoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IC0xLCBsZXZlbDogMCwgcGFyZW50S2V5OiAnJyB9KTtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG1ldGFLZXkgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXk7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd0Rvd25LZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dVcEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93TGVmdEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25BcnJvd1JpZ2h0S2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblNwYWNlS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVzY2FwZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYktleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxuICAgICAgICAgICAgY2FzZSAnU2hpZnRMZWZ0JzpcbiAgICAgICAgICAgIGNhc2UgJ1NoaWZ0UmlnaHQnOlxuICAgICAgICAgICAgICAgIC8vTk9PUFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghbWV0YUtleSAmJiBPYmplY3RVdGlscy5pc1ByaW50YWJsZUNoYXJhY3RlcihldmVudC5rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSXRlbXMoZXZlbnQsIGV2ZW50LmtleSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gdGhpcy5maW5kU2VsZWN0ZWRJdGVtSW5kZXgoKTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJbmRleCA8IDAgPyB0aGlzLmZpbmRGaXJzdEl0ZW1JbmRleCgpIDogc2VsZWN0ZWRJbmRleDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RJdGVtSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVJdGVtcy5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpO1xuICAgIH1cblxuICAgIGZpbmRTZWxlY3RlZEl0ZW1JbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZUl0ZW1zLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkU2VsZWN0ZWRJdGVtKHByb2Nlc3NlZEl0ZW0pKTtcbiAgICB9XG5cbiAgICBpc1Byb2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtLml0ZW1zKTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0oKSkgPyB0aGlzLmFjdGl2ZUl0ZW0oKS5rZXkgPT09IHByb2Nlc3NlZEl0ZW0ua2V5IDogZmFsc2U7XG4gICAgfVxuXG4gICAgaXNWYWxpZFNlbGVjdGVkSXRlbShwcm9jZXNzZWRJdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkgJiYgdGhpcy5pc1NlbGVjdGVkKHByb2Nlc3NlZEl0ZW0pO1xuICAgIH1cblxuICAgIGlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW06IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFwcm9jZXNzZWRJdGVtICYmICF0aGlzLmlzSXRlbURpc2FibGVkKHByb2Nlc3NlZEl0ZW0uaXRlbSkgJiYgIXRoaXMuaXNJdGVtU2VwYXJhdG9yKHByb2Nlc3NlZEl0ZW0uaXRlbSk7XG4gICAgfVxuXG4gICAgaXNJdGVtRGlzYWJsZWQoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEl0ZW1Qcm9wKGl0ZW0sICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlzSXRlbVNlcGFyYXRvcihpdGVtOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AoaXRlbSwgJ3NlcGFyYXRvcicpO1xuICAgIH1cblxuICAgIGlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pICYmIHRoaXMuZ2V0UHJvY2Nlc3NlZEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtKS50b0xvY2FsZUxvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgodGhpcy5zZWFyY2hWYWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICBpc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBwcm9jZXNzZWRJdGVtICYmIE9iamVjdFV0aWxzLmlzTm90RW1wdHkocHJvY2Vzc2VkSXRlbS5pdGVtcyk7XG4gICAgfVxuXG4gICAgc2VhcmNoSXRlbXMoZXZlbnQ6IGFueSwgY2hhcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAodGhpcy5zZWFyY2hWYWx1ZSB8fCAnJykgKyBjaGFyO1xuXG4gICAgICAgIGxldCBpdGVtSW5kZXggPSAtMTtcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGl0ZW1JbmRleCA9IHRoaXMudmlzaWJsZUl0ZW1zLnNsaWNlKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpLmZpbmRJbmRleCgocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc0l0ZW1NYXRjaGVkKHByb2Nlc3NlZEl0ZW0pKTtcbiAgICAgICAgICAgIGl0ZW1JbmRleCA9IGl0ZW1JbmRleCA9PT0gLTEgPyB0aGlzLnZpc2libGVJdGVtcy5zbGljZSgwLCB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KS5maW5kSW5kZXgoKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNJdGVtTWF0Y2hlZChwcm9jZXNzZWRJdGVtKSkgOiBpdGVtSW5kZXggKyB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbUluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzSXRlbU1hdGNoZWQocHJvY2Vzc2VkSXRlbSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1JbmRleCA9PT0gLTEgJiYgdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGl0ZW1JbmRleCA9IHRoaXMuZmluZEZpcnN0Rm9jdXNlZEl0ZW1JbmRleCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VhcmNoVGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVGltZW91dCA9IG51bGw7XG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfVxuXG4gICAgZ2V0UHJvY2Nlc3NlZEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3NlZEl0ZW0gPyB0aGlzLmdldEl0ZW1MYWJlbChwcm9jZXNzZWRJdGVtLml0ZW0pIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldEl0ZW1MYWJlbChpdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbVByb3AoaXRlbSwgJ2xhYmVsJyk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpbmRleCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0oaW5kZXgpO1xuICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5tdXRhdGUoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZS5pbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgdmFsdWUua2V5ID0gT2JqZWN0VXRpbHMuaXNOb3RFbXB0eShwcm9jZXNzZWRJdGVtKSA/IHByb2Nlc3NlZEl0ZW0ua2V5IDogJyc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsSW5WaWV3KCk7XG4gICAgfVxuXG4gICAgb25BcnJvd0Rvd25LZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKCkpICYmIHRoaXMuYWN0aXZlSXRlbSgpLmtleSA9PT0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5rZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogLTEsIGtleTogJycsIHBhcmVudEtleTogdGhpcy5hY3RpdmVJdGVtKCkua2V5IH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0odGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkl0ZW1DaGFuZ2UoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgcHJvY2Vzc2VkSXRlbSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IC0xLCBrZXk6IHByb2Nlc3NlZEl0ZW0ua2V5LCBwYXJlbnRLZXk6IHByb2Nlc3NlZEl0ZW0ucGFyZW50S2V5IH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEgPyB0aGlzLmZpbmROZXh0SXRlbUluZGV4KHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpIDogdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uQXJyb3dSaWdodEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0odGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCk7XG4gICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKTtcblxuICAgICAgICBpZiAoZ3JvdXBlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0oKSkgJiYgdGhpcy5hY3RpdmVJdGVtKCkua2V5ID09PSBwcm9jZXNzZWRJdGVtLmtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogLTEsIGtleTogJycsIHBhcmVudEtleTogdGhpcy5hY3RpdmVJdGVtKCkua2V5IH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSB0aGlzLmZpbmRWaXNpYmxlSXRlbSh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNoYW5nZSh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9jZXNzZWRJdGVtIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkSXRlbUluZm8uc2V0KHsgaW5kZXg6IC0xLCBrZXk6IHByb2Nlc3NlZEl0ZW0ua2V5LCBwYXJlbnRLZXk6IHByb2Nlc3NlZEl0ZW0ucGFyZW50S2V5IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ICE9PSAtMSA/IHRoaXMuZmluZE5leHRJdGVtSW5kZXgodGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCkgOiB0aGlzLmZpbmRGaXJzdEZvY3VzZWRJdGVtSW5kZXgoKTtcblxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbUluZm8oZXZlbnQsIGl0ZW1JbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHByb2Nlc3NlZEl0ZW0uY29sdW1uSW5kZXggKyAxO1xuICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy52aXNpYmxlSXRlbXMuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmNvbHVtbkluZGV4ID09PSBjb2x1bW5JbmRleCk7XG5cbiAgICAgICAgICAgIGl0ZW1JbmRleCAhPT0gLTEgJiYgdGhpcy5jaGFuZ2VGb2N1c2VkSXRlbUluZm8oZXZlbnQsIGl0ZW1JbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uQXJyb3dVcEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5ICYmIHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMuZmluZFZpc2libGVJdGVtKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwZWQgPSB0aGlzLmlzUHJvY2Nlc3NlZEl0ZW1Hcm91cChwcm9jZXNzZWRJdGVtKTtcblxuICAgICAgICAgICAgICAgIGlmICghZ3JvdXBlZCAmJiBPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuYWN0aXZlSXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEl0ZW1JbmZvLnNldCh7IGluZGV4OiB0aGlzLmFjdGl2ZUl0ZW0oKS5pbmRleCwga2V5OiB0aGlzLmFjdGl2ZUl0ZW0oKS5rZXksIHBhcmVudEtleTogdGhpcy5hY3RpdmVJdGVtKCkucGFyZW50S2V5IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCB0aGlzLmZpbmRGaXJzdEl0ZW1JbmRleCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xID8gdGhpcy5maW5kUHJldkl0ZW1JbmRleCh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KSA6IHRoaXMuZmluZExhc3RGb2N1c2VkSXRlbUluZGV4KCk7XG5cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQXJyb3dMZWZ0S2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEl0ZW0gPSB0aGlzLmZpbmRWaXNpYmxlSXRlbSh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4KTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgIGlmIChncm91cGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCAhPT0gLTEgPyB0aGlzLmZpbmRQcmV2SXRlbUluZGV4KHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXgpIDogdGhpcy5maW5kTGFzdEZvY3VzZWRJdGVtSW5kZXgoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCBpdGVtSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmFjdGl2ZUl0ZW0oKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2VkSXRlbS5jb2x1bW5JbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogdGhpcy5hY3RpdmVJdGVtKCkuaW5kZXgsIGtleTogdGhpcy5hY3RpdmVJdGVtKCkua2V5LCBwYXJlbnRLZXk6IHRoaXMuYWN0aXZlSXRlbSgpLnBhcmVudEtleSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gcHJvY2Vzc2VkSXRlbS5jb2x1bW5JbmRleCAtIDE7XG4gICAgICAgICAgICBjb25zdCBpdGVtSW5kZXggPSB0aGlzLnZpc2libGVJdGVtcy5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uY29sdW1uSW5kZXggPT09IGNvbHVtbkluZGV4KTtcblxuICAgICAgICAgICAgaXRlbUluZGV4ICE9PSAtMSAmJiB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgaXRlbUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Ib21lS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZEl0ZW1JbmZvKGV2ZW50LCB0aGlzLmZpbmRGaXJzdEl0ZW1JbmRleCgpKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkVuZEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgdGhpcy5maW5kTGFzdEl0ZW1JbmRleCgpKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblNwYWNlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG4gICAgfVxuXG4gICAgb25Fc2NhcGVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy5hY3RpdmVJdGVtKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRJdGVtSW5mby5zZXQoeyBpbmRleDogdGhpcy5hY3RpdmVJdGVtKCkuaW5kZXgsIGtleTogdGhpcy5hY3RpdmVJdGVtKCkua2V5IH0pO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtLnNldChudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzZWRJdGVtID0gdGhpcy5maW5kVmlzaWJsZUl0ZW0odGhpcy5mb2N1c2VkSXRlbUluZm8oKS5pbmRleCk7XG4gICAgICAgICAgICBjb25zdCBncm91cGVkID0gdGhpcy5pc1Byb2NjZXNzZWRJdGVtR3JvdXAocHJvY2Vzc2VkSXRlbSk7XG5cbiAgICAgICAgICAgICFncm91cGVkICYmIHRoaXMub25JdGVtQ2hhbmdlKHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHByb2Nlc3NlZEl0ZW0gfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBvbkVudGVyS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWRJdGVtSW5mbygpLmluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnJvb3RtZW51LmVsLm5hdGl2ZUVsZW1lbnQsIGBsaVtpZD1cIiR7YCR7dGhpcy5mb2N1c2VkSXRlbUlkfWB9XCJdYCk7XG4gICAgICAgICAgICBjb25zdCBhbmNob3JFbGVtZW50ID0gZWxlbWVudCAmJiBEb21IYW5kbGVyLmZpbmRTaW5nbGUoZWxlbWVudCwgJ2FbZGF0YS1wYy1zZWN0aW9uPVwiYWN0aW9uXCJdJyk7XG5cbiAgICAgICAgICAgIGFuY2hvckVsZW1lbnQgPyBhbmNob3JFbGVtZW50LmNsaWNrKCkgOiBlbGVtZW50ICYmIGVsZW1lbnQuY2xpY2soKTtcblxuICAgICAgICAgICAgY29uc3QgcHJvY2Vzc2VkSXRlbSA9IHRoaXMudmlzaWJsZUl0ZW1zW3RoaXMuZm9jdXNlZEl0ZW1JbmZvKCkuaW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgZ3JvdXBlZCA9IHRoaXMuaXNQcm9jY2Vzc2VkSXRlbUdyb3VwKHByb2Nlc3NlZEl0ZW0pO1xuXG4gICAgICAgICAgICAhZ3JvdXBlZCAmJiB0aGlzLmNoYW5nZUZvY3VzZWRJdGVtSW5mbyhldmVudCwgdGhpcy5maW5kRmlyc3RGb2N1c2VkSXRlbUluZGV4KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBmaW5kVmlzaWJsZUl0ZW0oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkodGhpcy52aXNpYmxlSXRlbXMpID8gdGhpcy52aXNpYmxlSXRlbXNbaW5kZXhdIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kTGFzdEZvY3VzZWRJdGVtSW5kZXgoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSB0aGlzLmZpbmRTZWxlY3RlZEl0ZW1JbmRleCgpO1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJbmRleCA8IDAgPyB0aGlzLmZpbmRMYXN0SXRlbUluZGV4KCkgOiBzZWxlY3RlZEluZGV4O1xuICAgIH1cblxuICAgIGZpbmRMYXN0SXRlbUluZGV4KCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuZmluZExhc3RJbmRleCh0aGlzLnZpc2libGVJdGVtcywgKHByb2Nlc3NlZEl0ZW0pID0+IHRoaXMuaXNWYWxpZEl0ZW0ocHJvY2Vzc2VkSXRlbSkpO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbUluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlZEl0ZW1JbmRleCA9IGluZGV4ID4gMCA/IE9iamVjdFV0aWxzLmZpbmRMYXN0SW5kZXgodGhpcy52aXNpYmxlSXRlbXMuc2xpY2UoMCwgaW5kZXgpLCAocHJvY2Vzc2VkSXRlbSkgPT4gdGhpcy5pc1ZhbGlkSXRlbShwcm9jZXNzZWRJdGVtKSkgOiAtMTtcblxuICAgICAgICByZXR1cm4gbWF0Y2hlZEl0ZW1JbmRleCA+IC0xID8gbWF0Y2hlZEl0ZW1JbmRleCA6IGluZGV4O1xuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbUluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlZEl0ZW1JbmRleCA9IGluZGV4IDwgdGhpcy52aXNpYmxlSXRlbXMubGVuZ3RoIC0gMSA/IHRoaXMudmlzaWJsZUl0ZW1zLnNsaWNlKGluZGV4ICsgMSkuZmluZEluZGV4KChwcm9jZXNzZWRJdGVtKSA9PiB0aGlzLmlzVmFsaWRJdGVtKHByb2Nlc3NlZEl0ZW0pKSA6IC0xO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkSXRlbUluZGV4ID4gLTEgPyBtYXRjaGVkSXRlbUluZGV4ICsgaW5kZXggKyAxIDogaW5kZXg7XG4gICAgfVxuXG4gICAgYmluZFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcsICdyZXNpemUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vdXRzaWRlQ2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNPdXRzaWRlQ29udGFpbmVyID0gdGhpcy5yb290bWVudS5lbC5uYXRpdmVFbGVtZW50ICE9PSBldmVudC50YXJnZXQgJiYgIXRoaXMucm9vdG1lbnUuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc091dHNpZGVDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRPdXRzaWRlQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMub3V0c2lkZUNsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kUmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZE91dHNpZGVDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kUmVzaXplTGlzdGVuZXIoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFRvb2x0aXBNb2R1bGUsIFNoYXJlZE1vZHVsZSwgQW5nbGVEb3duSWNvbiwgQW5nbGVSaWdodEljb25dLFxuICAgIGV4cG9ydHM6IFtNZWdhTWVudSwgUm91dGVyTW9kdWxlLCBUb29sdGlwTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW01lZ2FNZW51LCBNZWdhTWVudVN1Yl1cbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnVNb2R1bGUge31cbiJdfQ==