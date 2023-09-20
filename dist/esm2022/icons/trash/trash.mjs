import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
class TrashIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TrashIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: TrashIcon, isStandalone: true, selector: "TrashIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.44802 13.9955H10.552C10.8056 14.0129 11.06 13.9797 11.3006 13.898C11.5412 13.8163 11.7632 13.6877 11.9537 13.5196C12.1442 13.3515 12.2995 13.1473 12.4104 12.9188C12.5213 12.6903 12.5858 12.442 12.6 12.1884V4.36041H13.4C13.5591 4.36041 13.7117 4.29722 13.8243 4.18476C13.9368 4.07229 14 3.91976 14 3.76071C14 3.60166 13.9368 3.44912 13.8243 3.33666C13.7117 3.22419 13.5591 3.16101 13.4 3.16101H12.0537C12.0203 3.1557 11.9863 3.15299 11.952 3.15299C11.9178 3.15299 11.8838 3.1557 11.8503 3.16101H11.2285C11.2421 3.10893 11.2487 3.05513 11.248 3.00106V1.80966C11.2171 1.30262 10.9871 0.828306 10.608 0.48989C10.229 0.151475 9.73159 -0.0236625 9.22402 0.00257442H4.77602C4.27251 -0.0171866 3.78126 0.160868 3.40746 0.498617C3.03365 0.836366 2.807 1.30697 2.77602 1.80966V3.00106C2.77602 3.0556 2.78346 3.10936 2.79776 3.16101H0.6C0.521207 3.16101 0.443185 3.17652 0.37039 3.20666C0.297595 3.2368 0.231451 3.28097 0.175736 3.33666C0.120021 3.39235 0.0758251 3.45846 0.0456722 3.53121C0.0155194 3.60397 0 3.68196 0 3.76071C0 3.83946 0.0155194 3.91744 0.0456722 3.9902C0.0758251 4.06296 0.120021 4.12907 0.175736 4.18476C0.231451 4.24045 0.297595 4.28462 0.37039 4.31476C0.443185 4.3449 0.521207 4.36041 0.6 4.36041H1.40002V12.1884C1.41426 12.442 1.47871 12.6903 1.58965 12.9188C1.7006 13.1473 1.85582 13.3515 2.04633 13.5196C2.23683 13.6877 2.45882 13.8163 2.69944 13.898C2.94005 13.9797 3.1945 14.0129 3.44802 13.9955ZM2.60002 4.36041H11.304V12.1884C11.304 12.5163 10.952 12.7961 10.504 12.7961H3.40002C2.97602 12.7961 2.60002 12.5163 2.60002 12.1884V4.36041ZM3.95429 3.16101C3.96859 3.10936 3.97602 3.0556 3.97602 3.00106V1.80966C3.97602 1.48183 4.33602 1.20197 4.77602 1.20197H9.24802C9.66403 1.20197 10.048 1.48183 10.048 1.80966V3.00106C10.0473 3.05515 10.054 3.10896 10.0678 3.16101H3.95429ZM5.57571 10.997C5.41731 10.995 5.26597 10.9311 5.15395 10.8191C5.04193 10.7071 4.97808 10.5558 4.97601 10.3973V6.77517C4.97601 6.61612 5.0392 6.46359 5.15166 6.35112C5.26413 6.23866 5.41666 6.17548 5.57571 6.17548C5.73476 6.17548 5.8873 6.23866 5.99976 6.35112C6.11223 6.46359 6.17541 6.61612 6.17541 6.77517V10.3894C6.17647 10.4688 6.16174 10.5476 6.13208 10.6213C6.10241 10.695 6.05841 10.762 6.00261 10.8186C5.94682 10.8751 5.88035 10.92 5.80707 10.9506C5.73378 10.9813 5.65514 10.9971 5.57571 10.997ZM7.99968 10.8214C8.11215 10.9339 8.26468 10.997 8.42373 10.997C8.58351 10.9949 8.73604 10.93 8.84828 10.8163C8.96052 10.7025 9.02345 10.5491 9.02343 10.3894V6.77517C9.02343 6.61612 8.96025 6.46359 8.84778 6.35112C8.73532 6.23866 8.58278 6.17548 8.42373 6.17548C8.26468 6.17548 8.11215 6.23866 7.99968 6.35112C7.88722 6.46359 7.82404 6.61612 7.82404 6.77517V10.3973C7.82404 10.5564 7.88722 10.7089 7.99968 10.8214Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `, isInline: true });
}
export { TrashIcon };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TrashIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'TrashIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.44802 13.9955H10.552C10.8056 14.0129 11.06 13.9797 11.3006 13.898C11.5412 13.8163 11.7632 13.6877 11.9537 13.5196C12.1442 13.3515 12.2995 13.1473 12.4104 12.9188C12.5213 12.6903 12.5858 12.442 12.6 12.1884V4.36041H13.4C13.5591 4.36041 13.7117 4.29722 13.8243 4.18476C13.9368 4.07229 14 3.91976 14 3.76071C14 3.60166 13.9368 3.44912 13.8243 3.33666C13.7117 3.22419 13.5591 3.16101 13.4 3.16101H12.0537C12.0203 3.1557 11.9863 3.15299 11.952 3.15299C11.9178 3.15299 11.8838 3.1557 11.8503 3.16101H11.2285C11.2421 3.10893 11.2487 3.05513 11.248 3.00106V1.80966C11.2171 1.30262 10.9871 0.828306 10.608 0.48989C10.229 0.151475 9.73159 -0.0236625 9.22402 0.00257442H4.77602C4.27251 -0.0171866 3.78126 0.160868 3.40746 0.498617C3.03365 0.836366 2.807 1.30697 2.77602 1.80966V3.00106C2.77602 3.0556 2.78346 3.10936 2.79776 3.16101H0.6C0.521207 3.16101 0.443185 3.17652 0.37039 3.20666C0.297595 3.2368 0.231451 3.28097 0.175736 3.33666C0.120021 3.39235 0.0758251 3.45846 0.0456722 3.53121C0.0155194 3.60397 0 3.68196 0 3.76071C0 3.83946 0.0155194 3.91744 0.0456722 3.9902C0.0758251 4.06296 0.120021 4.12907 0.175736 4.18476C0.231451 4.24045 0.297595 4.28462 0.37039 4.31476C0.443185 4.3449 0.521207 4.36041 0.6 4.36041H1.40002V12.1884C1.41426 12.442 1.47871 12.6903 1.58965 12.9188C1.7006 13.1473 1.85582 13.3515 2.04633 13.5196C2.23683 13.6877 2.45882 13.8163 2.69944 13.898C2.94005 13.9797 3.1945 14.0129 3.44802 13.9955ZM2.60002 4.36041H11.304V12.1884C11.304 12.5163 10.952 12.7961 10.504 12.7961H3.40002C2.97602 12.7961 2.60002 12.5163 2.60002 12.1884V4.36041ZM3.95429 3.16101C3.96859 3.10936 3.97602 3.0556 3.97602 3.00106V1.80966C3.97602 1.48183 4.33602 1.20197 4.77602 1.20197H9.24802C9.66403 1.20197 10.048 1.48183 10.048 1.80966V3.00106C10.0473 3.05515 10.054 3.10896 10.0678 3.16101H3.95429ZM5.57571 10.997C5.41731 10.995 5.26597 10.9311 5.15395 10.8191C5.04193 10.7071 4.97808 10.5558 4.97601 10.3973V6.77517C4.97601 6.61612 5.0392 6.46359 5.15166 6.35112C5.26413 6.23866 5.41666 6.17548 5.57571 6.17548C5.73476 6.17548 5.8873 6.23866 5.99976 6.35112C6.11223 6.46359 6.17541 6.61612 6.17541 6.77517V10.3894C6.17647 10.4688 6.16174 10.5476 6.13208 10.6213C6.10241 10.695 6.05841 10.762 6.00261 10.8186C5.94682 10.8751 5.88035 10.92 5.80707 10.9506C5.73378 10.9813 5.65514 10.9971 5.57571 10.997ZM7.99968 10.8214C8.11215 10.9339 8.26468 10.997 8.42373 10.997C8.58351 10.9949 8.73604 10.93 8.84828 10.8163C8.96052 10.7025 9.02345 10.5491 9.02343 10.3894V6.77517C9.02343 6.61612 8.96025 6.46359 8.84778 6.35112C8.73532 6.23866 8.58278 6.17548 8.42373 6.17548C8.26468 6.17548 8.11215 6.23866 7.99968 6.35112C7.88722 6.46359 7.82404 6.61612 7.82404 6.77517V10.3973C7.82404 10.5564 7.88722 10.7089 7.99968 10.8214Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaWNvbnMvdHJhc2gvdHJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVsRCxNQXNCYSxTQUFVLFNBQVEsUUFBUTtJQUNuQyxNQUFNLENBQVM7SUFFZixRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsaUJBQWlCLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDdEQsQ0FBQzt1R0FMUSxTQUFTOzJGQUFULFNBQVMsNEZBbEJSOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JUOztTQUVRLFNBQVM7MkZBQVQsU0FBUztrQkF0QnJCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ25CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUljb24gfSBmcm9tICdwcmltZW5nL2Jhc2VpY29uJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnVHJhc2hJY29uJyxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIGltcG9ydHM6IFtCYXNlSWNvbl0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Qm94PVwiMCAwIDE0IDE0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJhcmlhSGlkZGVuXCIgW2F0dHIucm9sZV09XCJyb2xlXCIgW2NsYXNzXT1cImdldENsYXNzTmFtZXMoKVwiPlxuICAgICAgICAgICAgPGcgW2F0dHIuY2xpcC1wYXRoXT1cInBhdGhJZFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgICAgICBjbGlwLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk0zLjQ0ODAyIDEzLjk5NTVIMTAuNTUyQzEwLjgwNTYgMTQuMDEyOSAxMS4wNiAxMy45Nzk3IDExLjMwMDYgMTMuODk4QzExLjU0MTIgMTMuODE2MyAxMS43NjMyIDEzLjY4NzcgMTEuOTUzNyAxMy41MTk2QzEyLjE0NDIgMTMuMzUxNSAxMi4yOTk1IDEzLjE0NzMgMTIuNDEwNCAxMi45MTg4QzEyLjUyMTMgMTIuNjkwMyAxMi41ODU4IDEyLjQ0MiAxMi42IDEyLjE4ODRWNC4zNjA0MUgxMy40QzEzLjU1OTEgNC4zNjA0MSAxMy43MTE3IDQuMjk3MjIgMTMuODI0MyA0LjE4NDc2QzEzLjkzNjggNC4wNzIyOSAxNCAzLjkxOTc2IDE0IDMuNzYwNzFDMTQgMy42MDE2NiAxMy45MzY4IDMuNDQ5MTIgMTMuODI0MyAzLjMzNjY2QzEzLjcxMTcgMy4yMjQxOSAxMy41NTkxIDMuMTYxMDEgMTMuNCAzLjE2MTAxSDEyLjA1MzdDMTIuMDIwMyAzLjE1NTcgMTEuOTg2MyAzLjE1Mjk5IDExLjk1MiAzLjE1Mjk5QzExLjkxNzggMy4xNTI5OSAxMS44ODM4IDMuMTU1NyAxMS44NTAzIDMuMTYxMDFIMTEuMjI4NUMxMS4yNDIxIDMuMTA4OTMgMTEuMjQ4NyAzLjA1NTEzIDExLjI0OCAzLjAwMTA2VjEuODA5NjZDMTEuMjE3MSAxLjMwMjYyIDEwLjk4NzEgMC44MjgzMDYgMTAuNjA4IDAuNDg5ODlDMTAuMjI5IDAuMTUxNDc1IDkuNzMxNTkgLTAuMDIzNjYyNSA5LjIyNDAyIDAuMDAyNTc0NDJINC43NzYwMkM0LjI3MjUxIC0wLjAxNzE4NjYgMy43ODEyNiAwLjE2MDg2OCAzLjQwNzQ2IDAuNDk4NjE3QzMuMDMzNjUgMC44MzYzNjYgMi44MDcgMS4zMDY5NyAyLjc3NjAyIDEuODA5NjZWMy4wMDEwNkMyLjc3NjAyIDMuMDU1NiAyLjc4MzQ2IDMuMTA5MzYgMi43OTc3NiAzLjE2MTAxSDAuNkMwLjUyMTIwNyAzLjE2MTAxIDAuNDQzMTg1IDMuMTc2NTIgMC4zNzAzOSAzLjIwNjY2QzAuMjk3NTk1IDMuMjM2OCAwLjIzMTQ1MSAzLjI4MDk3IDAuMTc1NzM2IDMuMzM2NjZDMC4xMjAwMjEgMy4zOTIzNSAwLjA3NTgyNTEgMy40NTg0NiAwLjA0NTY3MjIgMy41MzEyMUMwLjAxNTUxOTQgMy42MDM5NyAwIDMuNjgxOTYgMCAzLjc2MDcxQzAgMy44Mzk0NiAwLjAxNTUxOTQgMy45MTc0NCAwLjA0NTY3MjIgMy45OTAyQzAuMDc1ODI1MSA0LjA2Mjk2IDAuMTIwMDIxIDQuMTI5MDcgMC4xNzU3MzYgNC4xODQ3NkMwLjIzMTQ1MSA0LjI0MDQ1IDAuMjk3NTk1IDQuMjg0NjIgMC4zNzAzOSA0LjMxNDc2QzAuNDQzMTg1IDQuMzQ0OSAwLjUyMTIwNyA0LjM2MDQxIDAuNiA0LjM2MDQxSDEuNDAwMDJWMTIuMTg4NEMxLjQxNDI2IDEyLjQ0MiAxLjQ3ODcxIDEyLjY5MDMgMS41ODk2NSAxMi45MTg4QzEuNzAwNiAxMy4xNDczIDEuODU1ODIgMTMuMzUxNSAyLjA0NjMzIDEzLjUxOTZDMi4yMzY4MyAxMy42ODc3IDIuNDU4ODIgMTMuODE2MyAyLjY5OTQ0IDEzLjg5OEMyLjk0MDA1IDEzLjk3OTcgMy4xOTQ1IDE0LjAxMjkgMy40NDgwMiAxMy45OTU1Wk0yLjYwMDAyIDQuMzYwNDFIMTEuMzA0VjEyLjE4ODRDMTEuMzA0IDEyLjUxNjMgMTAuOTUyIDEyLjc5NjEgMTAuNTA0IDEyLjc5NjFIMy40MDAwMkMyLjk3NjAyIDEyLjc5NjEgMi42MDAwMiAxMi41MTYzIDIuNjAwMDIgMTIuMTg4NFY0LjM2MDQxWk0zLjk1NDI5IDMuMTYxMDFDMy45Njg1OSAzLjEwOTM2IDMuOTc2MDIgMy4wNTU2IDMuOTc2MDIgMy4wMDEwNlYxLjgwOTY2QzMuOTc2MDIgMS40ODE4MyA0LjMzNjAyIDEuMjAxOTcgNC43NzYwMiAxLjIwMTk3SDkuMjQ4MDJDOS42NjQwMyAxLjIwMTk3IDEwLjA0OCAxLjQ4MTgzIDEwLjA0OCAxLjgwOTY2VjMuMDAxMDZDMTAuMDQ3MyAzLjA1NTE1IDEwLjA1NCAzLjEwODk2IDEwLjA2NzggMy4xNjEwMUgzLjk1NDI5Wk01LjU3NTcxIDEwLjk5N0M1LjQxNzMxIDEwLjk5NSA1LjI2NTk3IDEwLjkzMTEgNS4xNTM5NSAxMC44MTkxQzUuMDQxOTMgMTAuNzA3MSA0Ljk3ODA4IDEwLjU1NTggNC45NzYwMSAxMC4zOTczVjYuNzc1MTdDNC45NzYwMSA2LjYxNjEyIDUuMDM5MiA2LjQ2MzU5IDUuMTUxNjYgNi4zNTExMkM1LjI2NDEzIDYuMjM4NjYgNS40MTY2NiA2LjE3NTQ4IDUuNTc1NzEgNi4xNzU0OEM1LjczNDc2IDYuMTc1NDggNS44ODczIDYuMjM4NjYgNS45OTk3NiA2LjM1MTEyQzYuMTEyMjMgNi40NjM1OSA2LjE3NTQxIDYuNjE2MTIgNi4xNzU0MSA2Ljc3NTE3VjEwLjM4OTRDNi4xNzY0NyAxMC40Njg4IDYuMTYxNzQgMTAuNTQ3NiA2LjEzMjA4IDEwLjYyMTNDNi4xMDI0MSAxMC42OTUgNi4wNTg0MSAxMC43NjIgNi4wMDI2MSAxMC44MTg2QzUuOTQ2ODIgMTAuODc1MSA1Ljg4MDM1IDEwLjkyIDUuODA3MDcgMTAuOTUwNkM1LjczMzc4IDEwLjk4MTMgNS42NTUxNCAxMC45OTcxIDUuNTc1NzEgMTAuOTk3Wk03Ljk5OTY4IDEwLjgyMTRDOC4xMTIxNSAxMC45MzM5IDguMjY0NjggMTAuOTk3IDguNDIzNzMgMTAuOTk3QzguNTgzNTEgMTAuOTk0OSA4LjczNjA0IDEwLjkzIDguODQ4MjggMTAuODE2M0M4Ljk2MDUyIDEwLjcwMjUgOS4wMjM0NSAxMC41NDkxIDkuMDIzNDMgMTAuMzg5NFY2Ljc3NTE3QzkuMDIzNDMgNi42MTYxMiA4Ljk2MDI1IDYuNDYzNTkgOC44NDc3OCA2LjM1MTEyQzguNzM1MzIgNi4yMzg2NiA4LjU4Mjc4IDYuMTc1NDggOC40MjM3MyA2LjE3NTQ4QzguMjY0NjggNi4xNzU0OCA4LjExMjE1IDYuMjM4NjYgNy45OTk2OCA2LjM1MTEyQzcuODg3MjIgNi40NjM1OSA3LjgyNDA0IDYuNjE2MTIgNy44MjQwNCA2Ljc3NTE3VjEwLjM5NzNDNy44MjQwNCAxMC41NTY0IDcuODg3MjIgMTAuNzA4OSA3Ljk5OTY4IDEwLjgyMTRaXCJcbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgICAgIDxjbGlwUGF0aCBbaWRdPVwicGF0aElkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIGZpbGw9XCJ3aGl0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cbiAgICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgPC9zdmc+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmFzaEljb24gZXh0ZW5kcyBCYXNlSWNvbiB7XG4gICAgcGF0aElkOiBzdHJpbmc7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wYXRoSWQgPSAndXJsKCMnICsgVW5pcXVlQ29tcG9uZW50SWQoKSArICcpJztcbiAgICB9XG59XG4iXX0=