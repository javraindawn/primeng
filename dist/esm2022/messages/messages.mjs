import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Optional, Output, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { CheckIcon } from 'primeng/icons/check';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesIcon } from 'primeng/icons/times';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { RippleModule } from 'primeng/ripple';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/ripple";
/**
 * Messages is used to display alerts inline.
 * @group Components
 */
class Messages {
    messageService;
    el;
    cd;
    /**
     * An array of messages to display.
     * @group Props
     */
    set value(messages) {
        this.messages = messages;
        this.startMessageLifes(this.messages);
    }
    /**
     * Defines if message box can be closed by the click icon.
     * @group Props
     */
    closable = true;
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
     * Whether displaying services messages are enabled.
     * @group Props
     */
    enableService = true;
    /**
     * Id to match the key of the message to enable scoping in service based messaging.
     * @group Props
     */
    key;
    /**
     * Whether displaying messages would be escaped or not.
     * @group Props
     */
    escape = true;
    /**
     * Severity level of the message.
     * @group Props
     */
    severity;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    showTransitionOptions = '300ms ease-out';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    hideTransitionOptions = '200ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * This function is executed when the value changes.
     * @param {Message[]} value - messages value.
     * @group Emits
     */
    valueChange = new EventEmitter();
    templates;
    messages;
    messageSubscription;
    clearSubscription;
    timerSubscriptions = [];
    contentTemplate;
    constructor(messageService, el, cd) {
        this.messageService = messageService;
        this.el = el;
        this.cd = cd;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
        if (this.messageService && this.enableService && !this.contentTemplate) {
            this.messageSubscription = this.messageService.messageObserver.subscribe((messages) => {
                if (messages) {
                    if (!Array.isArray(messages)) {
                        messages = [messages];
                    }
                    const filteredMessages = messages.filter((m) => this.key === m.key);
                    this.messages = this.messages ? [...this.messages, ...filteredMessages] : [...filteredMessages];
                    this.startMessageLifes(filteredMessages);
                    this.cd.markForCheck();
                }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe((key) => {
                if (key) {
                    if (this.key === key) {
                        this.messages = null;
                    }
                }
                else {
                    this.messages = null;
                }
                this.cd.markForCheck();
            });
        }
    }
    hasMessages() {
        let parentEl = this.el.nativeElement.parentElement;
        if (parentEl && parentEl.offsetParent) {
            return this.contentTemplate != null || (this.messages && this.messages.length > 0);
        }
        return false;
    }
    clear() {
        this.messages = [];
        this.valueChange.emit(this.messages);
    }
    removeMessage(i) {
        this.messages = this.messages?.filter((msg, index) => index !== i);
        this.valueChange.emit(this.messages);
    }
    get icon() {
        const severity = this.severity || (this.hasMessages() ? this.messages[0].severity : null);
        if (this.hasMessages()) {
            switch (severity) {
                case 'success':
                    return 'pi-check';
                case 'info':
                    return 'pi-info-circle';
                case 'error':
                    return 'pi-times';
                case 'warn':
                    return 'pi-exclamation-triangle';
                default:
                    return 'pi-info-circle';
            }
        }
        return null;
    }
    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
        this.timerSubscriptions?.forEach((subscription) => subscription.unsubscribe());
    }
    startMessageLifes(messages) {
        messages?.forEach((message) => message.life && this.startMessageLife(message));
    }
    startMessageLife(message) {
        const timerSubsctiption = timer(message.life).subscribe(() => {
            this.messages = this.messages?.filter((msgEl) => msgEl !== message);
            this.timerSubscriptions = this.timerSubscriptions?.filter((timerEl) => timerEl !== timerSubsctiption);
            this.valueChange.emit(this.messages);
            this.cd.markForCheck();
        });
        this.timerSubscriptions.push(timerSubsctiption);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Messages, deps: [{ token: i1.MessageService, optional: true }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Messages, selector: "p-messages", inputs: { value: "value", closable: "closable", style: "style", styleClass: "styleClass", enableService: "enableService", key: "key", escape: "escape", severity: "severity", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { valueChange: "valueChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div class="p-messages p-component" role="alert" [ngStyle]="style" [class]="styleClass" [attr.aria-atomic]="true" [attr.aria-live]="'assertive'" [attr.data-pc-name]="'message'">
            <ng-container *ngIf="!contentTemplate; else staticMessage">
                <div
                    *ngFor="let msg of messages; let i = index"
                    [class]="'p-message p-message-' + msg.severity"
                    role="alert"
                    [@messageAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                >
                    <div class="p-message-wrapper" [attr.data-pc-section]="'wrapper'">
                        <span *ngIf="msg.icon" [class]="'p-message-icon pi ' + msg.icon" [attr.data-pc-section]="'icon'"> </span>
                        <span class="p-message-icon" *ngIf="!msg.icon">
                            <ng-container>
                                <CheckIcon *ngIf="msg.severity === 'success'" [attr.data-pc-section]="'icon'" />
                                <InfoCircleIcon *ngIf="msg.severity === 'info'" [attr.data-pc-section]="'icon'" />
                                <TimesCircleIcon *ngIf="msg.severity === 'error'" [attr.data-pc-section]="'icon'" />
                                <ExclamationTriangleIcon *ngIf="msg.severity === 'warn'" [attr.data-pc-section]="'icon'" />
                            </ng-container>
                        </span>
                        <ng-container *ngIf="!escape; else escapeOut">
                            <span *ngIf="msg.summary" class="p-message-summary" [innerHTML]="msg.summary" [attr.data-pc-section]="'summary'"></span>
                            <span *ngIf="msg.detail" class="p-message-detail" [innerHTML]="msg.detail" [attr.data-pc-section]="'detail'"></span>
                        </ng-container>
                        <ng-template #escapeOut>
                            <span *ngIf="msg.summary" class="p-message-summary" [attr.data-pc-section]="'summary'">{{ msg.summary }}</span>
                            <span *ngIf="msg.detail" class="p-message-detail" [attr.data-pc-section]="'detail'">{{ msg.detail }}</span>
                        </ng-template>
                        <button class="p-message-close p-link" (click)="removeMessage(i)" *ngIf="closable" type="button" pRipple [attr.aria-label]="'Close'" [attr.data-pc-section]="'closebutton'">
                            <TimesIcon [styleClass]="'p-message-close-icon'" [attr.data-pc-section]="'closeicon'" />
                        </button>
                    </div>
                </div>
            </ng-container>
            <ng-template #staticMessage>
                <div [ngClass]="'p-message p-message-' + severity" role="alert">
                    <div class="p-message-wrapper">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </div>
                </div>
            </ng-template>
        </div>
    `, isInline: true, styles: [".p-message-wrapper{display:flex;align-items:center}.p-message-close{display:flex;align-items:center;justify-content:center}.p-message-close.p-link{margin-left:auto;overflow:hidden;position:relative}.p-messages .p-message.ng-animating{overflow:hidden}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(function () { return i2.NgClass; }), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgForOf; }), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgIf; }), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgTemplateOutlet; }), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(function () { return i2.NgStyle; }), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(function () { return i3.Ripple; }), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(function () { return CheckIcon; }), selector: "CheckIcon" }, { kind: "component", type: i0.forwardRef(function () { return InfoCircleIcon; }), selector: "InfoCircleIcon" }, { kind: "component", type: i0.forwardRef(function () { return TimesCircleIcon; }), selector: "TimesCircleIcon" }, { kind: "component", type: i0.forwardRef(function () { return ExclamationTriangleIcon; }), selector: "ExclamationTriangleIcon" }, { kind: "component", type: i0.forwardRef(function () { return TimesIcon; }), selector: "TimesIcon" }], animations: [
            trigger('messageAnimation', [
                transition(':enter', [style({ opacity: 0, transform: 'translateY(-25%)' }), animate('{{showTransitionParams}}')]),
                transition(':leave', [animate('{{hideTransitionParams}}', style({ height: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, opacity: 0 }))])
            ])
        ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Messages };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Messages, decorators: [{
            type: Component,
            args: [{ selector: 'p-messages', template: `
        <div class="p-messages p-component" role="alert" [ngStyle]="style" [class]="styleClass" [attr.aria-atomic]="true" [attr.aria-live]="'assertive'" [attr.data-pc-name]="'message'">
            <ng-container *ngIf="!contentTemplate; else staticMessage">
                <div
                    *ngFor="let msg of messages; let i = index"
                    [class]="'p-message p-message-' + msg.severity"
                    role="alert"
                    [@messageAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
                >
                    <div class="p-message-wrapper" [attr.data-pc-section]="'wrapper'">
                        <span *ngIf="msg.icon" [class]="'p-message-icon pi ' + msg.icon" [attr.data-pc-section]="'icon'"> </span>
                        <span class="p-message-icon" *ngIf="!msg.icon">
                            <ng-container>
                                <CheckIcon *ngIf="msg.severity === 'success'" [attr.data-pc-section]="'icon'" />
                                <InfoCircleIcon *ngIf="msg.severity === 'info'" [attr.data-pc-section]="'icon'" />
                                <TimesCircleIcon *ngIf="msg.severity === 'error'" [attr.data-pc-section]="'icon'" />
                                <ExclamationTriangleIcon *ngIf="msg.severity === 'warn'" [attr.data-pc-section]="'icon'" />
                            </ng-container>
                        </span>
                        <ng-container *ngIf="!escape; else escapeOut">
                            <span *ngIf="msg.summary" class="p-message-summary" [innerHTML]="msg.summary" [attr.data-pc-section]="'summary'"></span>
                            <span *ngIf="msg.detail" class="p-message-detail" [innerHTML]="msg.detail" [attr.data-pc-section]="'detail'"></span>
                        </ng-container>
                        <ng-template #escapeOut>
                            <span *ngIf="msg.summary" class="p-message-summary" [attr.data-pc-section]="'summary'">{{ msg.summary }}</span>
                            <span *ngIf="msg.detail" class="p-message-detail" [attr.data-pc-section]="'detail'">{{ msg.detail }}</span>
                        </ng-template>
                        <button class="p-message-close p-link" (click)="removeMessage(i)" *ngIf="closable" type="button" pRipple [attr.aria-label]="'Close'" [attr.data-pc-section]="'closebutton'">
                            <TimesIcon [styleClass]="'p-message-close-icon'" [attr.data-pc-section]="'closeicon'" />
                        </button>
                    </div>
                </div>
            </ng-container>
            <ng-template #staticMessage>
                <div [ngClass]="'p-message p-message-' + severity" role="alert">
                    <div class="p-message-wrapper">
                        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                    </div>
                </div>
            </ng-template>
        </div>
    `, animations: [
                        trigger('messageAnimation', [
                            transition(':enter', [style({ opacity: 0, transform: 'translateY(-25%)' }), animate('{{showTransitionParams}}')]),
                            transition(':leave', [animate('{{hideTransitionParams}}', style({ height: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, opacity: 0 }))])
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-message-wrapper{display:flex;align-items:center}.p-message-close{display:flex;align-items:center;justify-content:center}.p-message-close.p-link{margin-left:auto;overflow:hidden;position:relative}.p-messages .p-message.ng-animating{overflow:hidden}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MessageService, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { value: [{
                type: Input
            }], closable: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], enableService: [{
                type: Input
            }], key: [{
                type: Input
            }], escape: [{
                type: Input
            }], severity: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
class MessagesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MessagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: MessagesModule, declarations: [Messages], imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon], exports: [Messages] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MessagesModule, imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon] });
}
export { MessagesModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: MessagesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RippleModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, TimesIcon],
                    exports: [Messages],
                    declarations: [Messages]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvbWVzc2FnZXMvbWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQW9CLHVCQUF1QixFQUFxQixTQUFTLEVBQUUsZUFBZSxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFhLFFBQVEsRUFBRSxNQUFNLEVBQTBCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVPLE9BQU8sRUFBMkIsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFnQixLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBQzNDOzs7R0FHRztBQUNILE1BeURhLFFBQVE7SUF5RWM7SUFBdUM7SUFBdUI7SUF4RTdGOzs7T0FHRztJQUNILElBQWEsS0FBSyxDQUFDLFFBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENB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LFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsU0FBUzs7U0FJM0csY0FBYzsyRkFBZCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxDQUFDO29CQUNySCxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ25CLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nTW9kdWxlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZXNzYWdlLCBNZXNzYWdlU2VydmljZSwgUHJpbWVUZW1wbGF0ZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENoZWNrSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hlY2snO1xuaW1wb3J0IHsgRXhjbGFtYXRpb25UcmlhbmdsZUljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2V4Y2xhbWF0aW9udHJpYW5nbGUnO1xuaW1wb3J0IHsgSW5mb0NpcmNsZUljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2luZm9jaXJjbGUnO1xuaW1wb3J0IHsgVGltZXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy90aW1lcyc7XG5pbXBvcnQgeyBUaW1lc0NpcmNsZUljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RpbWVzY2lyY2xlJztcbmltcG9ydCB7IFJpcHBsZU1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcmlwcGxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGltZXIgfSBmcm9tICdyeGpzJztcbi8qKlxuICogTWVzc2FnZXMgaXMgdXNlZCB0byBkaXNwbGF5IGFsZXJ0cyBpbmxpbmUuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVzc2FnZXMnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLW1lc3NhZ2VzIHAtY29tcG9uZW50XCIgcm9sZT1cImFsZXJ0XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFthdHRyLmFyaWEtYXRvbWljXT1cInRydWVcIiBbYXR0ci5hcmlhLWxpdmVdPVwiJ2Fzc2VydGl2ZSdcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ21lc3NhZ2UnXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWNvbnRlbnRUZW1wbGF0ZTsgZWxzZSBzdGF0aWNNZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgbXNnIG9mIG1lc3NhZ2VzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cIidwLW1lc3NhZ2UgcC1tZXNzYWdlLScgKyBtc2cuc2V2ZXJpdHlcIlxuICAgICAgICAgICAgICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICAgICAgICAgICAgICBbQG1lc3NhZ2VBbmltYXRpb25dPVwieyB2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHsgc2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9ucyB9IH1cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtbWVzc2FnZS13cmFwcGVyXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid3cmFwcGVyJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtc2cuaWNvblwiIFtjbGFzc109XCIncC1tZXNzYWdlLWljb24gcGkgJyArIG1zZy5pY29uXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpY29uJ1wiPiA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtbWVzc2FnZS1pY29uXCIgKm5nSWY9XCIhbXNnLmljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tJY29uICpuZ0lmPVwibXNnLnNldmVyaXR5ID09PSAnc3VjY2VzcydcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2ljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEluZm9DaXJjbGVJY29uICpuZ0lmPVwibXNnLnNldmVyaXR5ID09PSAnaW5mbydcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2ljb24nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzQ2lyY2xlSWNvbiAqbmdJZj1cIm1zZy5zZXZlcml0eSA9PT0gJ2Vycm9yJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RXhjbGFtYXRpb25UcmlhbmdsZUljb24gKm5nSWY9XCJtc2cuc2V2ZXJpdHkgPT09ICd3YXJuJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFlc2NhcGU7IGVsc2UgZXNjYXBlT3V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtc2cuc3VtbWFyeVwiIGNsYXNzPVwicC1tZXNzYWdlLXN1bW1hcnlcIiBbaW5uZXJIVE1MXT1cIm1zZy5zdW1tYXJ5XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdW1tYXJ5J1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1zZy5kZXRhaWxcIiBjbGFzcz1cInAtbWVzc2FnZS1kZXRhaWxcIiBbaW5uZXJIVE1MXT1cIm1zZy5kZXRhaWxcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2RldGFpbCdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZXNjYXBlT3V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibXNnLnN1bW1hcnlcIiBjbGFzcz1cInAtbWVzc2FnZS1zdW1tYXJ5XCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidzdW1tYXJ5J1wiPnt7IG1zZy5zdW1tYXJ5IH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibXNnLmRldGFpbFwiIGNsYXNzPVwicC1tZXNzYWdlLWRldGFpbFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInZGV0YWlsJ1wiPnt7IG1zZy5kZXRhaWwgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInAtbWVzc2FnZS1jbG9zZSBwLWxpbmtcIiAoY2xpY2spPVwicmVtb3ZlTWVzc2FnZShpKVwiICpuZ0lmPVwiY2xvc2FibGVcIiB0eXBlPVwiYnV0dG9uXCIgcFJpcHBsZSBbYXR0ci5hcmlhLWxhYmVsXT1cIidDbG9zZSdcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2Nsb3NlYnV0dG9uJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUaW1lc0ljb24gW3N0eWxlQ2xhc3NdPVwiJ3AtbWVzc2FnZS1jbG9zZS1pY29uJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2xvc2VpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjc3RhdGljTWVzc2FnZT5cbiAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIidwLW1lc3NhZ2UgcC1tZXNzYWdlLScgKyBzZXZlcml0eVwiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1tZXNzYWdlLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignbWVzc2FnZUFuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTI1JSknIH0pLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKV0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW2FuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScsIHN0eWxlKHsgaGVpZ2h0OiAwLCBtYXJnaW5Ub3A6IDAsIG1hcmdpbkJvdHRvbTogMCwgbWFyZ2luTGVmdDogMCwgbWFyZ2luUmlnaHQ6IDAsIG9wYWNpdHk6IDAgfSkpXSlcbiAgICAgICAgXSlcbiAgICBdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZXMuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBtZXNzYWdlcyB0byBkaXNwbGF5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNldCB2YWx1ZShtZXNzYWdlczogTWVzc2FnZVtdKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcztcbiAgICAgICAgdGhpcy5zdGFydE1lc3NhZ2VMaWZlcyh0aGlzLm1lc3NhZ2VzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBtZXNzYWdlIGJveCBjYW4gYmUgY2xvc2VkIGJ5IHRoZSBjbGljayBpY29uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGRpc3BsYXlpbmcgc2VydmljZXMgbWVzc2FnZXMgYXJlIGVuYWJsZWQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZW5hYmxlU2VydmljZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogSWQgdG8gbWF0Y2ggdGhlIGtleSBvZiB0aGUgbWVzc2FnZSB0byBlbmFibGUgc2NvcGluZyBpbiBzZXJ2aWNlIGJhc2VkIG1lc3NhZ2luZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBrZXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGRpc3BsYXlpbmcgbWVzc2FnZXMgd291bGQgYmUgZXNjYXBlZCBvciBub3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBTZXZlcml0eSBsZXZlbCBvZiB0aGUgbWVzc2FnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZXZlcml0eTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgc2hvdyBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMzAwbXMgZWFzZS1vdXQnO1xuICAgIC8qKlxuICAgICAqIFRyYW5zaXRpb24gb3B0aW9ucyBvZiB0aGUgaGlkZSBhbmltYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMjAwbXMgY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpJztcbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtNZXNzYWdlW119IHZhbHVlIC0gbWVzc2FnZXMgdmFsdWUuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWVzc2FnZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWVzc2FnZVtdPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIG1lc3NhZ2VzOiBNZXNzYWdlW10gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgbWVzc2FnZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgY2xlYXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIHRpbWVyU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHB1YmxpYyBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXM/LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTZXJ2aWNlICYmIHRoaXMuZW5hYmxlU2VydmljZSAmJiAhdGhpcy5jb250ZW50VGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbiA9IHRoaXMubWVzc2FnZVNlcnZpY2UubWVzc2FnZU9ic2VydmVyLnN1YnNjcmliZSgobWVzc2FnZXM6IE1lc3NhZ2UgfCBNZXNzYWdlW10pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2VzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMgPSBbbWVzc2FnZXNdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRNZXNzYWdlcyA9IG1lc3NhZ2VzLmZpbHRlcigobSkgPT4gdGhpcy5rZXkgPT09IG0ua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHRoaXMubWVzc2FnZXMgPyBbLi4udGhpcy5tZXNzYWdlcywgLi4uZmlsdGVyZWRNZXNzYWdlc10gOiBbLi4uZmlsdGVyZWRNZXNzYWdlc107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNZXNzYWdlTGlmZXMoZmlsdGVyZWRNZXNzYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb24gPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmNsZWFyT2JzZXJ2ZXIuc3Vic2NyaWJlKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc01lc3NhZ2VzKCkge1xuICAgICAgICBsZXQgcGFyZW50RWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKHBhcmVudEVsICYmIHBhcmVudEVsLm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudFRlbXBsYXRlICE9IG51bGwgfHwgKHRoaXMubWVzc2FnZXMgJiYgdGhpcy5tZXNzYWdlcy5sZW5ndGggPiAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5tZXNzYWdlcyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTWVzc2FnZShpOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHRoaXMubWVzc2FnZXM/LmZpbHRlcigobXNnLCBpbmRleCkgPT4gaW5kZXggIT09IGkpO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5tZXNzYWdlcyk7XG4gICAgfVxuXG4gICAgZ2V0IGljb24oKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGNvbnN0IHNldmVyaXR5ID0gdGhpcy5zZXZlcml0eSB8fCAodGhpcy5oYXNNZXNzYWdlcygpID8gdGhpcy5tZXNzYWdlcyFbMF0uc2V2ZXJpdHkgOiBudWxsKTtcblxuICAgICAgICBpZiAodGhpcy5oYXNNZXNzYWdlcygpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHNldmVyaXR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGktY2hlY2snO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGktaW5mby1jaXJjbGUnO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpLXRpbWVzJztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGktaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2xlYXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGltZXJTdWJzY3JpcHRpb25zPy5mb3JFYWNoKChzdWJzY3JpcHRpb24pID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0TWVzc2FnZUxpZmVzKG1lc3NhZ2VzOiBNZXNzYWdlW10pOiB2b2lkIHtcbiAgICAgICAgbWVzc2FnZXM/LmZvckVhY2goKG1lc3NhZ2UpID0+IG1lc3NhZ2UubGlmZSAmJiB0aGlzLnN0YXJ0TWVzc2FnZUxpZmUobWVzc2FnZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhcnRNZXNzYWdlTGlmZShtZXNzYWdlOiBNZXNzYWdlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRpbWVyU3Vic2N0aXB0aW9uID0gdGltZXIobWVzc2FnZS5saWZlISkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSB0aGlzLm1lc3NhZ2VzPy5maWx0ZXIoKG1zZ0VsKSA9PiBtc2dFbCAhPT0gbWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9ucyA9IHRoaXMudGltZXJTdWJzY3JpcHRpb25zPy5maWx0ZXIoKHRpbWVyRWwpID0+IHRpbWVyRWwgIT09IHRpbWVyU3Vic2N0aXB0aW9uKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLm1lc3NhZ2VzKTtcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRpbWVyU3Vic2NyaXB0aW9ucy5wdXNoKHRpbWVyU3Vic2N0aXB0aW9uKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmlwcGxlTW9kdWxlLCBDaGVja0ljb24sIEluZm9DaXJjbGVJY29uLCBUaW1lc0NpcmNsZUljb24sIEV4Y2xhbWF0aW9uVHJpYW5nbGVJY29uLCBUaW1lc0ljb25dLFxuICAgIGV4cG9ydHM6IFtNZXNzYWdlc10sXG4gICAgZGVjbGFyYXRpb25zOiBbTWVzc2FnZXNdXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzTW9kdWxlIHt9XG4iXX0=