import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "primeng/tooltip";
/**
 * Steps components is an indicator for the steps in a wizard workflow.
 * @group Components
 */
class Steps {
    router;
    route;
    cd;
    /**
     * Index of the active item.
     * @group Props
     */
    activeIndex = 0;
    /**
     * An array of menu items.
     * @group Props
     */
    model;
    /**
     * Whether the items are clickable or not.
     * @group Props
     */
    readonly = true;
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
     * Whether to apply 'router-link-active-exact' class if route exactly matches the item path.
     * @group Props
     */
    exact = true;
    /**
     * Callback to invoke when the new step is selected.
     * @param {number} number - current index.
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    listViewChild;
    constructor(router, route, cd) {
        this.router = router;
        this.route = route;
        this.cd = cd;
    }
    subscription;
    ngOnInit() {
        this.subscription = this.router.events.subscribe(() => this.cd.markForCheck());
    }
    onItemClick(event, item, i) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            return;
        }
        this.activeIndexChange.emit(i);
        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    }
    onItemKeydown(event, item, i) {
        switch (event.code) {
            case 'ArrowRight': {
                this.navigateToNextItem(event.target);
                event.preventDefault();
                break;
            }
            case 'ArrowLeft': {
                this.navigateToPrevItem(event.target);
                event.preventDefault();
                break;
            }
            case 'Home': {
                this.navigateToFirstItem(event.target);
                event.preventDefault();
                break;
            }
            case 'End': {
                this.navigateToLastItem(event.target);
                event.preventDefault();
                break;
            }
            case 'Tab':
                //no op
                break;
            case 'Enter':
            case 'Space': {
                this.onItemClick(event, item, i);
                event.preventDefault();
                break;
            }
            default:
                break;
        }
    }
    navigateToNextItem(target) {
        const nextItem = this.findNextItem(target);
        nextItem && this.setFocusToMenuitem(target, nextItem);
    }
    navigateToPrevItem(target) {
        const prevItem = this.findPrevItem(target);
        prevItem && this.setFocusToMenuitem(target, prevItem);
    }
    navigateToFirstItem(target) {
        const firstItem = this.findFirstItem();
        firstItem && this.setFocusToMenuitem(target, firstItem);
    }
    navigateToLastItem(target) {
        const lastItem = this.findLastItem();
        lastItem && this.setFocusToMenuitem(target, lastItem);
    }
    findNextItem(item) {
        const nextItem = item.parentElement.nextElementSibling;
        return nextItem ? nextItem.children[0] : null;
    }
    findPrevItem(item) {
        const prevItem = item.parentElement.previousElementSibling;
        return prevItem ? prevItem.children[0] : null;
    }
    findFirstItem() {
        const firstSibling = DomHandler.findSingle(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
        return firstSibling ? firstSibling.children[0] : null;
    }
    findLastItem() {
        const siblings = DomHandler.find(this.listViewChild.nativeElement, '[data-pc-section="menuitem"]');
        return siblings ? siblings[siblings.length - 1].children[0] : null;
    }
    setFocusToMenuitem(target, focusableItem) {
        target.tabIndex = '-1';
        focusableItem.tabIndex = '0';
        focusableItem.focus();
    }
    isClickableRouterLink(item) {
        return item.routerLink && !this.readonly && !item.disabled;
    }
    isActive(item, index) {
        if (item.routerLink) {
            let routerLink = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            return this.router.isActive(this.router.createUrlTree(routerLink, { relativeTo: this.route }).toString(), false);
        }
        return index === this.activeIndex;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Steps, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Steps, selector: "p-steps", inputs: { activeIndex: "activeIndex", model: "model", readonly: "readonly", style: "style", styleClass: "styleClass", exact: "exact" }, outputs: { activeIndexChange: "activeIndexChange" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "listViewChild", first: true, predicate: ["list"], descendants: true }], ngImport: i0, template: `
        <nav [ngClass]="{ 'p-steps p-component': true, 'p-readonly': readonly }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'steps'">
            <ul #list role="tablist" [attr.data-pc-section]="'menu'">
                <li
                    *ngFor="let item of model; let i = index"
                    class="p-steps-item"
                    #menuitem
                    [ngStyle]="item.style"
                    [class]="item.styleClass"
                    role="tab"
                    [attr.aria-selected]="i === activeIndex"
                    [attr.aria-expanded]="i === activeIndex"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i)) }"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        role="presentation"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="onItemClick($event, item, i)"
                        (keydown)="onItemKeydown($event, item, i)"
                        [target]="item.target"
                        [attr.id]="item.id"
                        [attr.tabindex]="item.disabled || readonly ? null : item.tabindex ? item.tabindex : '-1'"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [ariaCurrentWhenActive]="exact ? 'step' : undefined"
                    >
                        <span class="p-steps-number">{{ i + 1 }}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            [attr.href]="item.url"
                            class="p-menuitem-link"
                            role="presentation"
                            (click)="onItemClick($event, item, i)"
                            (keydown)="onItemKeydown($event, item, i)"
                            [target]="item.target"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) ? null : item.tabindex ? item.tabindex : '-1'"
                            [ariaCurrentWhenActive]="exact ? 'step' : undefined"
                        >
                            <span class="p-steps-number">{{ i + 1 }}</span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </nav>
    `, isInline: true, styles: [".p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i1.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "directive", type: i3.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Steps };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Steps, decorators: [{
            type: Component,
            args: [{ selector: 'p-steps', template: `
        <nav [ngClass]="{ 'p-steps p-component': true, 'p-readonly': readonly }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'steps'">
            <ul #list role="tablist" [attr.data-pc-section]="'menu'">
                <li
                    *ngFor="let item of model; let i = index"
                    class="p-steps-item"
                    #menuitem
                    [ngStyle]="item.style"
                    [class]="item.styleClass"
                    role="tab"
                    [attr.aria-selected]="i === activeIndex"
                    [attr.aria-expanded]="i === activeIndex"
                    pTooltip
                    [tooltipOptions]="item.tooltipOptions"
                    [ngClass]="{ 'p-highlight p-steps-current': isActive(item, i), 'p-disabled': item.disabled || (readonly && !isActive(item, i)) }"
                    [attr.data-pc-section]="'menuitem'"
                >
                    <a
                        *ngIf="isClickableRouterLink(item); else elseBlock"
                        [routerLink]="item.routerLink"
                        [queryParams]="item.queryParams"
                        role="presentation"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
                        class="p-menuitem-link"
                        (click)="onItemClick($event, item, i)"
                        (keydown)="onItemKeydown($event, item, i)"
                        [target]="item.target"
                        [attr.id]="item.id"
                        [attr.tabindex]="item.disabled || readonly ? null : item.tabindex ? item.tabindex : '-1'"
                        [fragment]="item.fragment"
                        [queryParamsHandling]="item.queryParamsHandling"
                        [preserveFragment]="item.preserveFragment"
                        [skipLocationChange]="item.skipLocationChange"
                        [replaceUrl]="item.replaceUrl"
                        [state]="item.state"
                        [ariaCurrentWhenActive]="exact ? 'step' : undefined"
                    >
                        <span class="p-steps-number">{{ i + 1 }}</span>
                        <span class="p-steps-title" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
                        <ng-template #htmlLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                    </a>
                    <ng-template #elseBlock>
                        <a
                            [attr.href]="item.url"
                            class="p-menuitem-link"
                            role="presentation"
                            (click)="onItemClick($event, item, i)"
                            (keydown)="onItemKeydown($event, item, i)"
                            [target]="item.target"
                            [attr.id]="item.id"
                            [attr.tabindex]="item.disabled || (i !== activeIndex && readonly) ? null : item.tabindex ? item.tabindex : '-1'"
                            [ariaCurrentWhenActive]="exact ? 'step' : undefined"
                        >
                            <span class="p-steps-number">{{ i + 1 }}</span>
                            <span class="p-steps-title" *ngIf="item.escape !== false; else htmlRouteLabel">{{ item.label }}</span>
                            <ng-template #htmlRouteLabel><span class="p-steps-title" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </nav>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-steps{position:relative}.p-steps ul{padding:0;margin:0;list-style-type:none;display:flex}.p-steps-item{position:relative;display:flex;justify-content:center;flex:1 1 auto}.p-steps-item .p-menuitem-link{display:inline-flex;flex-direction:column;align-items:center;overflow:hidden;text-decoration:none}.p-steps.p-steps-readonly .p-steps-item{cursor:auto}.p-steps-item.p-steps-current .p-menuitem-link{cursor:default}.p-steps-title{white-space:nowrap}.p-steps-number{display:flex;align-items:center;justify-content:center}.p-steps-title{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { activeIndex: [{
                type: Input
            }], model: [{
                type: Input
            }], readonly: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], exact: [{
                type: Input
            }], activeIndexChange: [{
                type: Output
            }], listViewChild: [{
                type: ViewChild,
                args: ['list', { static: false }]
            }] } });
class StepsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: StepsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: StepsModule, declarations: [Steps], imports: [CommonModule, RouterModule, TooltipModule], exports: [Steps, RouterModule, TooltipModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: StepsModule, imports: [CommonModule, RouterModule, TooltipModule, RouterModule, TooltipModule] });
}
export { StepsModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: StepsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, TooltipModule],
                    exports: [Steps, RouterModule, TooltipModule],
                    declarations: [Steps]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3RlcHMvc3RlcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBcUIsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFMLE9BQU8sRUFBMEIsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUd6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBRWhEOzs7R0FHRztBQUNILE1Bd0VhLEtBQUs7SUF3Q007SUFBd0I7SUFBK0I7SUF2QzNFOzs7T0FHRztJQUNNLFdBQVcsR0FBVyxDQUFDLENBQUM7SUFDakM7OztPQUdHO0lBQ00sS0FBSyxDQUF5QjtJQUN2Qzs7O09BR0c7SUFDTSxRQUFRLEdBQVksSUFBSSxDQUFDO0lBQ2xDOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxLQUFLLEdBQVksSUFBSSxDQUFDO0lBQy9COzs7O09BSUc7SUFDTyxpQkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUV6QyxhQUFhLENBQXVCO0lBRTFFLFlBQW9CLE1BQWMsRUFBVSxLQUFxQixFQUFVLEVBQXFCO1FBQTVFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFVLE9BQUUsR0FBRixFQUFFLENBQW1CO0lBQUcsQ0FBQztJQUVwRyxZQUFZLENBQTJCO0lBRXZDLFFBQVE7UUFDSixJQUFJ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QXhFakIsU0FBUzsrQkFDSSxTQUFTLFlBQ1Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBOERULG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBRS9CO3dCQUNGLEtBQUssRUFBRSxXQUFXO3FCQUNyQjswSkFPUSxXQUFXO3NCQUFuQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxRQUFRO3NCQUFoQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFNSSxpQkFBaUI7c0JBQTFCLE1BQU07Z0JBRStCLGFBQWE7c0JBQWxELFNBQVM7dUJBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7QUE2SXhDLE1BS2EsV0FBVzt1R0FBWCxXQUFXO3dHQUFYLFdBQVcsaUJBeExYLEtBQUssYUFvTEosWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLGFBcEwxQyxLQUFLLEVBcUxHLFlBQVksRUFBRSxhQUFhO3dHQUduQyxXQUFXLFlBSlYsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQ2xDLFlBQVksRUFBRSxhQUFhOztTQUduQyxXQUFXOzJGQUFYLFdBQVc7a0JBTHZCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQ3BELE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDO29CQUM3QyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ01vZHVsZSwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciwgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Rvb2x0aXAnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG4vKipcbiAqIFN0ZXBzIGNvbXBvbmVudHMgaXMgYW4gaW5kaWNhdG9yIGZvciB0aGUgc3RlcHMgaW4gYSB3aXphcmQgd29ya2Zsb3cuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc3RlcHMnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuYXYgW25nQ2xhc3NdPVwieyAncC1zdGVwcyBwLWNvbXBvbmVudCc6IHRydWUsICdwLXJlYWRvbmx5JzogcmVhZG9ubHkgfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3N0ZXBzJ1wiPlxuICAgICAgICAgICAgPHVsICNsaXN0IHJvbGU9XCJ0YWJsaXN0XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidtZW51J1wiPlxuICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtb2RlbDsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zdGVwcy1pdGVtXCJcbiAgICAgICAgICAgICAgICAgICAgI21lbnVpdGVtXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIml0ZW0uc3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICBbY2xhc3NdPVwiaXRlbS5zdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRhYlwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaSA9PT0gYWN0aXZlSW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImkgPT09IGFjdGl2ZUluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgcFRvb2x0aXBcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBPcHRpb25zXT1cIml0ZW0udG9vbHRpcE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCBwLXN0ZXBzLWN1cnJlbnQnOiBpc0FjdGl2ZShpdGVtLCBpKSwgJ3AtZGlzYWJsZWQnOiBpdGVtLmRpc2FibGVkIHx8IChyZWFkb25seSAmJiAhaXNBY3RpdmUoaXRlbSwgaSkpIH1cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ21lbnVpdGVtJ1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0NsaWNrYWJsZVJvdXRlckxpbmsoaXRlbSk7IGVsc2UgZWxzZUJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnlQYXJhbXNdPVwiaXRlbS5xdWVyeVBhcmFtc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIidwLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaXRlbS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucyB8fCB7IGV4YWN0OiBmYWxzZSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1tZW51aXRlbS1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIGl0ZW0sIGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSXRlbUtleWRvd24oJGV2ZW50LCBpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmlkXT1cIml0ZW0uaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCB8fCByZWFkb25seSA/IG51bGwgOiBpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICctMSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaXRlbS5xdWVyeVBhcmFtc0hhbmRsaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyZXBsYWNlVXJsXT1cIml0ZW0ucmVwbGFjZVVybFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXJpYUN1cnJlbnRXaGVuQWN0aXZlXT1cImV4YWN0ID8gJ3N0ZXAnIDogdW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXN0ZXBzLW51bWJlclwiPnt7IGkgKyAxIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXN0ZXBzLXRpdGxlXCIgKm5nSWY9XCJpdGVtLmVzY2FwZSAhPT0gZmFsc2U7IGVsc2UgaHRtbExhYmVsXCI+e3sgaXRlbS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjaHRtbExhYmVsPjxzcGFuIGNsYXNzPVwicC1zdGVwcy10aXRsZVwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5ocmVmXT1cIml0ZW0udXJsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtbWVudWl0ZW0tbGlua1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSwgaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSXRlbUtleWRvd24oJGV2ZW50LCBpdGVtLCBpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3RhcmdldF09XCJpdGVtLnRhcmdldFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5kaXNhYmxlZCB8fCAoaSAhPT0gYWN0aXZlSW5kZXggJiYgcmVhZG9ubHkpID8gbnVsbCA6IGl0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJy0xJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FyaWFDdXJyZW50V2hlbkFjdGl2ZV09XCJleGFjdCA/ICdzdGVwJyA6IHVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXN0ZXBzLW51bWJlclwiPnt7IGkgKyAxIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicC1zdGVwcy10aXRsZVwiICpuZ0lmPVwiaXRlbS5lc2NhcGUgIT09IGZhbHNlOyBlbHNlIGh0bWxSb3V0ZUxhYmVsXCI+e3sgaXRlbS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2h0bWxSb3V0ZUxhYmVsPjxzcGFuIGNsYXNzPVwicC1zdGVwcy10aXRsZVwiIFtpbm5lckhUTUxdPVwiaXRlbS5sYWJlbFwiPjwvc3Bhbj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L25hdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3RlcHMuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFN0ZXBzIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBhY3RpdmUgaXRlbS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBtZW51IGl0ZW1zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGl0ZW1zIGFyZSBjbGlja2FibGUgb3Igbm90LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGFwcGx5ICdyb3V0ZXItbGluay1hY3RpdmUtZXhhY3QnIGNsYXNzIGlmIHJvdXRlIGV4YWN0bHkgbWF0Y2hlcyB0aGUgaXRlbSBwYXRoLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGV4YWN0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiB0aGUgbmV3IHN0ZXAgaXMgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIGN1cnJlbnQgaW5kZXguXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIGFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbGlzdCcsIHsgc3RhdGljOiBmYWxzZSB9KSBsaXN0Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkLm1hcmtGb3JDaGVjaygpKTtcbiAgICB9XG5cbiAgICBvbkl0ZW1DbGljayhldmVudDogRXZlbnQsIGl0ZW06IE1lbnVJdGVtLCBpOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkgfHwgaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChpKTtcblxuICAgICAgICBpZiAoIWl0ZW0udXJsICYmICFpdGVtLnJvdXRlckxpbmspIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICAgICAgaW5kZXg6IGlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JdGVtS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaXRlbTogTWVudUl0ZW0sIGk6IG51bWJlcikge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvTmV4dEl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvUHJldkl0ZW0oZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlICdIb21lJzoge1xuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0ZpcnN0SXRlbShldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG9MYXN0SXRlbShldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgLy9ubyBvcFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG5cbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzoge1xuICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2xpY2soZXZlbnQsIGl0ZW0sIGkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvTmV4dEl0ZW0odGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IG5leHRJdGVtID0gdGhpcy5maW5kTmV4dEl0ZW0odGFyZ2V0KTtcblxuICAgICAgICBuZXh0SXRlbSAmJiB0aGlzLnNldEZvY3VzVG9NZW51aXRlbSh0YXJnZXQsIG5leHRJdGVtKTtcbiAgICB9XG4gICAgbmF2aWdhdGVUb1ByZXZJdGVtKHRhcmdldCkge1xuICAgICAgICBjb25zdCBwcmV2SXRlbSA9IHRoaXMuZmluZFByZXZJdGVtKHRhcmdldCk7XG5cbiAgICAgICAgcHJldkl0ZW0gJiYgdGhpcy5zZXRGb2N1c1RvTWVudWl0ZW0odGFyZ2V0LCBwcmV2SXRlbSk7XG4gICAgfVxuICAgIG5hdmlnYXRlVG9GaXJzdEl0ZW0odGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHRoaXMuZmluZEZpcnN0SXRlbSgpO1xuXG4gICAgICAgIGZpcnN0SXRlbSAmJiB0aGlzLnNldEZvY3VzVG9NZW51aXRlbSh0YXJnZXQsIGZpcnN0SXRlbSk7XG4gICAgfVxuICAgIG5hdmlnYXRlVG9MYXN0SXRlbSh0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW0gPSB0aGlzLmZpbmRMYXN0SXRlbSgpO1xuXG4gICAgICAgIGxhc3RJdGVtICYmIHRoaXMuc2V0Rm9jdXNUb01lbnVpdGVtKHRhcmdldCwgbGFzdEl0ZW0pO1xuICAgIH1cbiAgICBmaW5kTmV4dEl0ZW0oaXRlbSkge1xuICAgICAgICBjb25zdCBuZXh0SXRlbSA9IGl0ZW0ucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgcmV0dXJuIG5leHRJdGVtID8gbmV4dEl0ZW0uY2hpbGRyZW5bMF0gOiBudWxsO1xuICAgIH1cbiAgICBmaW5kUHJldkl0ZW0oaXRlbSkge1xuICAgICAgICBjb25zdCBwcmV2SXRlbSA9IGl0ZW0ucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIHJldHVybiBwcmV2SXRlbSA/IHByZXZJdGVtLmNoaWxkcmVuWzBdIDogbnVsbDtcbiAgICB9XG4gICAgZmluZEZpcnN0SXRlbSgpIHtcbiAgICAgICAgY29uc3QgZmlyc3RTaWJsaW5nID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cIm1lbnVpdGVtXCJdJyk7XG5cbiAgICAgICAgcmV0dXJuIGZpcnN0U2libGluZyA/IGZpcnN0U2libGluZy5jaGlsZHJlblswXSA6IG51bGw7XG4gICAgfVxuICAgIGZpbmRMYXN0SXRlbSgpIHtcbiAgICAgICAgY29uc3Qgc2libGluZ3MgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwibWVudWl0ZW1cIl0nKTtcblxuICAgICAgICByZXR1cm4gc2libGluZ3MgPyBzaWJsaW5nc1tzaWJsaW5ncy5sZW5ndGggLSAxXS5jaGlsZHJlblswXSA6IG51bGw7XG4gICAgfVxuICAgIHNldEZvY3VzVG9NZW51aXRlbSh0YXJnZXQsIGZvY3VzYWJsZUl0ZW0pIHtcbiAgICAgICAgdGFyZ2V0LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgZm9jdXNhYmxlSXRlbS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgZm9jdXNhYmxlSXRlbS5mb2N1cygpO1xuICAgIH1cblxuICAgIGlzQ2xpY2thYmxlUm91dGVyTGluayhpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbS5yb3V0ZXJMaW5rICYmICF0aGlzLnJlYWRvbmx5ICYmICFpdGVtLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGlzQWN0aXZlKGl0ZW06IE1lbnVJdGVtLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpdGVtLnJvdXRlckxpbmspIHtcbiAgICAgICAgICAgIGxldCByb3V0ZXJMaW5rID0gQXJyYXkuaXNBcnJheShpdGVtLnJvdXRlckxpbmspID8gaXRlbS5yb3V0ZXJMaW5rIDogW2l0ZW0ucm91dGVyTGlua107XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5pc0FjdGl2ZSh0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKHJvdXRlckxpbmssIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZSB9KS50b1N0cmluZygpLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXggPT09IHRoaXMuYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIFRvb2x0aXBNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTdGVwcywgUm91dGVyTW9kdWxlLCBUb29sdGlwTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTdGVwc11cbn0pXG5leHBvcnQgY2xhc3MgU3RlcHNNb2R1bGUge31cbiJdfQ==