import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
class RefreshIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: RefreshIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: RefreshIcon, isStandalone: true, selector: "RefreshIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.77051 5.96336C6.84324 5.99355 6.92127 6.00891 7.00002 6.00854C7.07877 6.00891 7.1568 5.99355 7.22953 5.96336C7.30226 5.93317 7.36823 5.88876 7.42357 5.83273L9.82101 3.43529C9.93325 3.32291 9.99629 3.17058 9.99629 3.01175C9.99629 2.85292 9.93325 2.70058 9.82101 2.5882L7.42357 0.190763C7.3687 0.131876 7.30253 0.0846451 7.22901 0.0518865C7.15549 0.019128 7.07612 0.00151319 6.99564 9.32772e-05C6.91517 -0.00132663 6.83523 0.0134773 6.7606 0.0436218C6.68597 0.0737664 6.61817 0.118634 6.56126 0.175548C6.50435 0.232462 6.45948 0.300257 6.42933 0.374888C6.39919 0.449519 6.38439 0.529456 6.38581 0.609933C6.38722 0.690409 6.40484 0.769775 6.4376 0.843296C6.47036 0.916817 6.51759 0.982986 6.57647 1.03786L7.95103 2.41241H6.99998C5.46337 2.41241 3.98969 3.02283 2.90314 4.10938C1.81659 5.19593 1.20618 6.66961 1.20618 8.20622C1.20618 9.74283 1.81659 11.2165 2.90314 12.3031C3.98969 13.3896 5.46337 14 6.99998 14C8.53595 13.9979 10.0084 13.3868 11.0945 12.3007C12.1806 11.2146 12.7917 9.74218 12.7938 8.20622C12.7938 8.04726 12.7306 7.89481 12.6182 7.78241C12.5058 7.67001 12.3534 7.60686 12.1944 7.60686C12.0355 7.60686 11.883 7.67001 11.7706 7.78241C11.6582 7.89481 11.5951 8.04726 11.5951 8.20622C11.5951 9.11504 11.3256 10.0035 10.8207 10.7591C10.3157 11.5148 9.59809 12.1037 8.75845 12.4515C7.9188 12.7993 6.99489 12.8903 6.10353 12.713C5.21217 12.5357 4.3934 12.0981 3.75077 11.4554C3.10813 10.8128 2.67049 9.99404 2.49319 9.10268C2.31589 8.21132 2.40688 7.2874 2.75468 6.44776C3.10247 5.60811 3.69143 4.89046 4.44709 4.38554C5.20275 3.88063 6.09116 3.61113 6.99998 3.61113H7.95098L6.57647 4.98564C6.46423 5.09802 6.40119 5.25035 6.40119 5.40918C6.40119 5.56801 6.46423 5.72035 6.57647 5.83273C6.63181 5.88876 6.69778 5.93317 6.77051 5.96336Z"
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
export { RefreshIcon };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: RefreshIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'RefreshIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.77051 5.96336C6.84324 5.99355 6.92127 6.00891 7.00002 6.00854C7.07877 6.00891 7.1568 5.99355 7.22953 5.96336C7.30226 5.93317 7.36823 5.88876 7.42357 5.83273L9.82101 3.43529C9.93325 3.32291 9.99629 3.17058 9.99629 3.01175C9.99629 2.85292 9.93325 2.70058 9.82101 2.5882L7.42357 0.190763C7.3687 0.131876 7.30253 0.0846451 7.22901 0.0518865C7.15549 0.019128 7.07612 0.00151319 6.99564 9.32772e-05C6.91517 -0.00132663 6.83523 0.0134773 6.7606 0.0436218C6.68597 0.0737664 6.61817 0.118634 6.56126 0.175548C6.50435 0.232462 6.45948 0.300257 6.42933 0.374888C6.39919 0.449519 6.38439 0.529456 6.38581 0.609933C6.38722 0.690409 6.40484 0.769775 6.4376 0.843296C6.47036 0.916817 6.51759 0.982986 6.57647 1.03786L7.95103 2.41241H6.99998C5.46337 2.41241 3.98969 3.02283 2.90314 4.10938C1.81659 5.19593 1.20618 6.66961 1.20618 8.20622C1.20618 9.74283 1.81659 11.2165 2.90314 12.3031C3.98969 13.3896 5.46337 14 6.99998 14C8.53595 13.9979 10.0084 13.3868 11.0945 12.3007C12.1806 11.2146 12.7917 9.74218 12.7938 8.20622C12.7938 8.04726 12.7306 7.89481 12.6182 7.78241C12.5058 7.67001 12.3534 7.60686 12.1944 7.60686C12.0355 7.60686 11.883 7.67001 11.7706 7.78241C11.6582 7.89481 11.5951 8.04726 11.5951 8.20622C11.5951 9.11504 11.3256 10.0035 10.8207 10.7591C10.3157 11.5148 9.59809 12.1037 8.75845 12.4515C7.9188 12.7993 6.99489 12.8903 6.10353 12.713C5.21217 12.5357 4.3934 12.0981 3.75077 11.4554C3.10813 10.8128 2.67049 9.99404 2.49319 9.10268C2.31589 8.21132 2.40688 7.2874 2.75468 6.44776C3.10247 5.60811 3.69143 4.89046 4.44709 4.38554C5.20275 3.88063 6.09116 3.61113 6.99998 3.61113H7.95098L6.57647 4.98564C6.46423 5.09802 6.40119 5.25035 6.40119 5.40918C6.40119 5.56801 6.46423 5.72035 6.57647 5.83273C6.63181 5.88876 6.69778 5.93317 6.77051 5.96336Z"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmcmVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9pY29ucy9yZWZyZXNoL3JlZnJlc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVsRCxNQXNCYSxXQUFZLFNBQVEsUUFBUTtJQUNyQyxNQUFNLENBQVM7SUFFZixRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsaUJBQWlCLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDdEQsQ0FBQzt1R0FMUSxXQUFXOzJGQUFYLFdBQVcsOEZBbEJWOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JUOztTQUVRLFdBQVc7MkZBQVgsV0FBVztrQkF0QnZCLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ25CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUljb24gfSBmcm9tICdwcmltZW5nL2Jhc2VpY29uJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnUmVmcmVzaEljb24nLFxuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgaW1wb3J0czogW0Jhc2VJY29uXSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIHZpZXdCb3g9XCIwIDAgMTQgMTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmFyaWEtaGlkZGVuXT1cImFyaWFIaWRkZW5cIiBbYXR0ci5yb2xlXT1cInJvbGVcIiBbY2xhc3NdPVwiZ2V0Q2xhc3NOYW1lcygpXCI+XG4gICAgICAgICAgICA8ZyBbYXR0ci5jbGlwLXBhdGhdPVwicGF0aElkXCI+XG4gICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgZmlsbC1ydWxlPVwiZXZlbm9kZFwiXG4gICAgICAgICAgICAgICAgICAgIGNsaXAtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgICAgICBkPVwiTTYuNzcwNTEgNS45NjMzNkM2Ljg0MzI0IDUuOTkzNTUgNi45MjEyNyA2LjAwODkxIDcuMDAwMDIgNi4wMDg1NEM3LjA3ODc3IDYuMDA4OTEgNy4xNTY4IDUuOTkzNTUgNy4yMjk1MyA1Ljk2MzM2QzcuMzAyMjYgNS45MzMxNyA3LjM2ODIzIDUuODg4NzYgNy40MjM1NyA1LjgzMjczTDkuODIxMDEgMy40MzUyOUM5LjkzMzI1IDMuMzIyOTEgOS45OTYyOSAzLjE3MDU4IDkuOTk2MjkgMy4wMTE3NUM5Ljk5NjI5IDIuODUyOTIgOS45MzMyNSAyLjcwMDU4IDkuODIxMDEgMi41ODgyTDcuNDIzNTcgMC4xOTA3NjNDNy4zNjg3IDAuMTMxODc2IDcuMzAyNTMgMC4wODQ2NDUxIDcuMjI5MDEgMC4wNTE4ODY1QzcuMTU1NDkgMC4wMTkxMjggNy4wNzYxMiAwLjAwMTUxMzE5IDYuOTk1NjQgOS4zMjc3MmUtMDVDNi45MTUxNyAtMC4wMDEzMjY2MyA2LjgzNTIzIDAuMDEzNDc3MyA2Ljc2MDYgMC4wNDM2MjE4QzYuNjg1OTcgMC4wNzM3NjY0IDYuNjE4MTcgMC4xMTg2MzQgNi41NjEyNiAwLjE3NTU0OEM2LjUwNDM1IDAuMjMyNDYyIDYuNDU5NDggMC4zMDAyNTcgNi40MjkzMyAwLjM3NDg4OEM2LjM5OTE5IDAuNDQ5NTE5IDYuMzg0MzkgMC41Mjk0NTYgNi4zODU4MSAwLjYwOTkzM0M2LjM4NzIyIDAuNjkwNDA5IDYuNDA0ODQgMC43Njk3NzUgNi40Mzc2IDAuODQzMjk2QzYuNDcwMzYgMC45MTY4MTcgNi41MTc1OSAwLjk4Mjk4NiA2LjU3NjQ3IDEuMDM3ODZMNy45NTEwMyAyLjQxMjQxSDYuOTk5OThDNS40NjMzNyAyLjQxMjQxIDMuOTg5NjkgMy4wMjI4MyAyLjkwMzE0IDQuMTA5MzhDMS44MTY1OSA1LjE5NTkzIDEuMjA2MTggNi42Njk2MSAxLjIwNjE4IDguMjA2MjJDMS4yMDYxOCA5Ljc0MjgzIDEuODE2NTkgMTEuMjE2NSAyLjkwMzE0IDEyLjMwMzFDMy45ODk2OSAxMy4zODk2IDUuNDYzMzcgMTQgNi45OTk5OCAxNEM4LjUzNTk1IDEzLjk5NzkgMTAuMDA4NCAxMy4zODY4IDExLjA5NDUgMTIuMzAwN0MxMi4xODA2IDExLjIxNDYgMTIuNzkxNyA5Ljc0MjE4IDEyLjc5MzggOC4yMDYyMkMxMi43OTM4IDguMDQ3MjYgMTIuNzMwNiA3Ljg5NDgxIDEyLjYxODIgNy43ODI0MUMxMi41MDU4IDcuNjcwMDEgMTIuMzUzNCA3LjYwNjg2IDEyLjE5NDQgNy42MDY4NkMxMi4wMzU1IDcuNjA2ODYgMTEuODgzIDcuNjcwMDEgMTEuNzcwNiA3Ljc4MjQxQzExLjY1ODIgNy44OTQ4MSAxMS41OTUxIDguMDQ3MjYgMTEuNTk1MSA4LjIwNjIyQzExLjU5NTEgOS4xMTUwNCAxMS4zMjU2IDEwLjAwMzUgMTAuODIwNyAxMC43NTkxQzEwLjMxNTcgMTEuNTE0OCA5LjU5ODA5IDEyLjEwMzcgOC43NTg0NSAxMi40NTE1QzcuOTE4OCAxMi43OTkzIDYuOTk0ODkgMTIuODkwMyA2LjEwMzUzIDEyLjcxM0M1LjIxMjE3IDEyLjUzNTcgNC4zOTM0IDEyLjA5ODEgMy43NTA3NyAxMS40NTU0QzMuMTA4MTMgMTAuODEyOCAyLjY3MDQ5IDkuOTk0MDQgMi40OTMxOSA5LjEwMjY4QzIuMzE1ODkgOC4yMTEzMiAyLjQwNjg4IDcuMjg3NCAyLjc1NDY4IDYuNDQ3NzZDMy4xMDI0NyA1LjYwODExIDMuNjkxNDMgNC44OTA0NiA0LjQ0NzA5IDQuMzg1NTRDNS4yMDI3NSAzLjg4MDYzIDYuMDkxMTYgMy42MTExMyA2Ljk5OTk4IDMuNjExMTNINy45NTA5OEw2LjU3NjQ3IDQuOTg1NjRDNi40NjQyMyA1LjA5ODAyIDYuNDAxMTkgNS4yNTAzNSA2LjQwMTE5IDUuNDA5MThDNi40MDExOSA1LjU2ODAxIDYuNDY0MjMgNS43MjAzNSA2LjU3NjQ3IDUuODMyNzNDNi42MzE4MSA1Ljg4ODc2IDYuNjk3NzggNS45MzMxNyA2Ljc3MDUxIDUuOTYzMzZaXCJcbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgICAgIDxjbGlwUGF0aCBbaWRdPVwicGF0aElkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMTRcIiBoZWlnaHQ9XCIxNFwiIGZpbGw9XCJ3aGl0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cbiAgICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgPC9zdmc+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBSZWZyZXNoSWNvbiBleHRlbmRzIEJhc2VJY29uIHtcbiAgICBwYXRoSWQ6IHN0cmluZztcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBhdGhJZCA9ICd1cmwoIycgKyBVbmlxdWVDb21wb25lbnRJZCgpICsgJyknO1xuICAgIH1cbn1cbiJdfQ==