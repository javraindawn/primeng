import { Injectable, Inject } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Dynamic Dialog component methods.
 * @group Service
 */
class DialogService {
    componentFactoryResolver;
    appRef;
    injector;
    document;
    dialogComponentRefMap = new Map();
    constructor(componentFactoryResolver, appRef, injector, document) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.document = document;
    }
    /**
     * Displays the dialog using the dynamic dialog object options.
     * @param {*} componentType - Dynamic component for content template.
     * @param {DynamicDialogConfig} config - DynamicDialog object.
     * @returns {DynamicDialogRef} DynamicDialog instance.
     * @group Method
     */
    open(componentType, config) {
        const dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;
        return dialogRef;
    }
    appendDialogComponentToBody(config) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);
        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);
        const sub = dialogRef.onClose.subscribe(() => {
            this.dialogComponentRefMap.get(dialogRef).instance.close();
        });
        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        if (!config.appendTo || config.appendTo === 'body') {
            this.document.body.appendChild(domElem);
        }
        else {
            DomHandler.appendChild(domElem, config.appendTo);
        }
        this.dialogComponentRefMap.set(dialogRef, componentRef);
        return dialogRef;
    }
    removeDialogComponentFromBody(dialogRef) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }
        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(dialogRef);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: DialogService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: DialogService });
}
export { DialogService };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9keW5hbWljZGlhbG9nL2RpYWxvZ3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBMkYsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUMzQzs7O0dBR0c7QUFDSCxNQUNhLGFBQWE7SUFHRjtJQUE0RDtJQUFnQztJQUE4QztJQUY5SixxQkFBcUIsR0FBZ0UsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUUvRixZQUFvQix3QkFBa0QsRUFBVSxNQUFzQixFQUFVLFFBQWtCLEVBQTRCLFFBQWtCO1FBQTVKLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBNEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7SUFDcEw7Ozs7OztPQU1HO0lBQ0ksSUFBSSxDQUFDLGFBQXdCLEVBQUUsTUFBMkI7UUFDN0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLGFBQWEsQ0FBQztRQUV0RixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU8sMkJBQTJCLENBQUMsTUFBMkI7UUFDM0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMxQixHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXJDLE1BQU0sU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXJDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNsRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdkcsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTVGLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5QyxNQUFNLE9BQU8sR0FBSSxZQUFZLENBQUMsUUFBaUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixDQUFDO1FBQzVGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0gsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFeEQsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLDZCQUE2QixDQUFDLFNBQTJCO1FBQzdELElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzFELE9BQU87U0FDVjtRQUVELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7dUdBOURRLGFBQWEsZ0hBR3NILFFBQVE7MkdBSDNJLGFBQWE7O1NBQWIsYUFBYTsyRkFBYixhQUFhO2tCQUR6QixVQUFVOzswQkFJOEgsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBBcHBsaWNhdGlvblJlZiwgSW5qZWN0b3IsIFR5cGUsIEVtYmVkZGVkVmlld1JlZiwgQ29tcG9uZW50UmVmLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljZGlhbG9nJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dJbmplY3RvciB9IGZyb20gJy4vZHluYW1pY2RpYWxvZy1pbmplY3Rvcic7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nQ29uZmlnIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLWNvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nUmVmIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLXJlZic7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG4vKipcbiAqIER5bmFtaWMgRGlhbG9nIGNvbXBvbmVudCBtZXRob2RzLlxuICogQGdyb3VwIFNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xuICAgIGRpYWxvZ0NvbXBvbmVudFJlZk1hcDogTWFwPER5bmFtaWNEaWFsb2dSZWYsIENvbXBvbmVudFJlZjxEeW5hbWljRGlhbG9nQ29tcG9uZW50Pj4gPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCkge31cbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyB0aGUgZGlhbG9nIHVzaW5nIHRoZSBkeW5hbWljIGRpYWxvZyBvYmplY3Qgb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0geyp9IGNvbXBvbmVudFR5cGUgLSBEeW5hbWljIGNvbXBvbmVudCBmb3IgY29udGVudCB0ZW1wbGF0ZS5cbiAgICAgKiBAcGFyYW0ge0R5bmFtaWNEaWFsb2dDb25maWd9IGNvbmZpZyAtIER5bmFtaWNEaWFsb2cgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtEeW5hbWljRGlhbG9nUmVmfSBEeW5hbWljRGlhbG9nIGluc3RhbmNlLlxuICAgICAqIEBncm91cCBNZXRob2RcbiAgICAgKi9cbiAgICBwdWJsaWMgb3Blbihjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sIGNvbmZpZzogRHluYW1pY0RpYWxvZ0NvbmZpZyk6IER5bmFtaWNEaWFsb2dSZWYge1xuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmFwcGVuZERpYWxvZ0NvbXBvbmVudFRvQm9keShjb25maWcpO1xuXG4gICAgICAgIHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmTWFwLmdldChkaWFsb2dSZWYpLmluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9IGNvbXBvbmVudFR5cGU7XG5cbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGVuZERpYWxvZ0NvbXBvbmVudFRvQm9keShjb25maWc6IER5bmFtaWNEaWFsb2dDb25maWcpIHtcbiAgICAgICAgY29uc3QgbWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgbWFwLnNldChEeW5hbWljRGlhbG9nQ29uZmlnLCBjb25maWcpO1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IG5ldyBEeW5hbWljRGlhbG9nUmVmKCk7XG4gICAgICAgIG1hcC5zZXQoRHluYW1pY0RpYWxvZ1JlZiwgZGlhbG9nUmVmKTtcblxuICAgICAgICBjb25zdCBzdWIgPSBkaWFsb2dSZWYub25DbG9zZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dDb21wb25lbnRSZWZNYXAuZ2V0KGRpYWxvZ1JlZikuaW5zdGFuY2UuY2xvc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZGVzdHJveVN1YiA9IGRpYWxvZ1JlZi5vbkRlc3Ryb3kuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRGlhbG9nQ29tcG9uZW50RnJvbUJvZHkoZGlhbG9nUmVmKTtcbiAgICAgICAgICAgIGRlc3Ryb3lTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRHluYW1pY0RpYWxvZ0NvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEeW5hbWljRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3RvciwgbWFwKSk7XG5cbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGlmICghY29uZmlnLmFwcGVuZFRvIHx8IGNvbmZpZy5hcHBlbmRUbyA9PT0gJ2JvZHknKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKGRvbUVsZW0sIGNvbmZpZy5hcHBlbmRUbyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcC5zZXQoZGlhbG9nUmVmLCBjb21wb25lbnRSZWYpO1xuXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVEaWFsb2dDb21wb25lbnRGcm9tQm9keShkaWFsb2dSZWY6IER5bmFtaWNEaWFsb2dSZWYpIHtcbiAgICAgICAgaWYgKCFkaWFsb2dSZWYgfHwgIXRoaXMuZGlhbG9nQ29tcG9uZW50UmVmTWFwLmhhcyhkaWFsb2dSZWYpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkaWFsb2dDb21wb25lbnRSZWYgPSB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcC5nZXQoZGlhbG9nUmVmKTtcbiAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyhkaWFsb2dDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICBkaWFsb2dDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZk1hcC5kZWxldGUoZGlhbG9nUmVmKTtcbiAgICB9XG59XG4iXX0=