import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
class TimesCircleIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TimesCircleIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: TimesCircleIcon, isStandalone: true, selector: "TimesCircleIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z"
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
export { TimesCircleIcon };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: TimesCircleIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'TimesCircleIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNjaXJjbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaWNvbnMvdGltZXNjaXJjbGUvdGltZXNjaXJjbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVsRCxNQXNCYSxlQUFnQixTQUFRLFFBQVE7SUFDekMsTUFBTSxDQUFTO0lBRWYsUUFBUTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLGlCQUFpQixFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ3RELENBQUM7dUdBTFEsZUFBZTsyRkFBZixlQUFlLGtHQWxCZDs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVDs7U0FFUSxlQUFlOzJGQUFmLGVBQWU7a0JBdEIzQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ25CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUljb24gfSBmcm9tICdwcmltZW5nL2Jhc2VpY29uJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnVGltZXNDaXJjbGVJY29uJyxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIGltcG9ydHM6IFtCYXNlSWNvbl0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Qm94PVwiMCAwIDE0IDE0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJhcmlhSGlkZGVuXCIgW2F0dHIucm9sZV09XCJyb2xlXCIgW2NsYXNzXT1cImdldENsYXNzTmFtZXMoKVwiPlxuICAgICAgICAgICAgPGcgW2F0dHIuY2xpcC1wYXRoXT1cInBhdGhJZFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgICAgICBjbGlwLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk03IDE0QzUuNjE1NTMgMTQgNC4yNjIxNSAxMy41ODk1IDMuMTExMDEgMTIuODIwM0MxLjk1OTg3IDEyLjA1MTEgMS4wNjI2NiAxMC45NTc5IDAuNTMyODQ2IDkuNjc4NzlDMC4wMDMwMzI5NiA4LjM5OTcgLTAuMTM1NTkgNi45OTIyNCAwLjEzNDUwNiA1LjYzNDM3QzAuNDA0NjAzIDQuMjc2NSAxLjA3MTI5IDMuMDI5MjIgMi4wNTAyNiAyLjA1MDI2QzMuMDI5MjIgMS4wNzEyOSA0LjI3NjUgMC40MDQ2MDMgNS42MzQzNyAwLjEzNDUwNkM2Ljk5MjI0IC0wLjEzNTU5IDguMzk5NyAwLjAwMzAzMjk2IDkuNjc4NzkgMC41MzI4NDZDMTAuOTU3OSAxLjA2MjY2IDEyLjA1MTEgMS45NTk4NyAxMi44MjAzIDMuMTExMDFDMTMuNTg5NSA0LjI2MjE1IDE0IDUuNjE1NTMgMTQgN0MxNCA4Ljg1NjUyIDEzLjI2MjUgMTAuNjM3IDExLjk0OTcgMTEuOTQ5N0MxMC42MzcgMTMuMjYyNSA4Ljg1NjUyIDE0IDcgMTRaTTcgMS4xNjY2N0M1Ljg0NjI4IDEuMTY2NjcgNC43MTg0NiAxLjUwODc5IDMuNzU5MTggMi4xNDk3NkMyLjc5OTg5IDIuNzkwNzQgMi4wNTIyMiAzLjcwMTc4IDEuNjEwNzEgNC43Njc2OEMxLjE2OTE5IDUuODMzNTggMS4wNTM2NyA3LjAwNjQ3IDEuMjc4NzYgOC4xMzgwM0MxLjUwMzg0IDkuMjY5NTggMi4wNTk0MSAxMC4zMDkgMi44NzUyMSAxMS4xMjQ4QzMuNjkxMDIgMTEuOTQwNiA0LjczMDQyIDEyLjQ5NjIgNS44NjE5OCAxMi43MjEyQzYuOTkzNTMgMTIuOTQ2MyA4LjE2NjQyIDEyLjgzMDggOS4yMzIzMiAxMi4zODkzQzEwLjI5ODIgMTEuOTQ3OCAxMS4yMDkzIDExLjIwMDEgMTEuODUwMiAxMC4yNDA4QzEyLjQ5MTIgOS4yODE1NCAxMi44MzMzIDguMTUzNzMgMTIuODMzMyA3QzEyLjgzMzMgNS40NTI5MSAxMi4yMTg4IDMuOTY5MTggMTEuMTI0OCAyLjg3NTIxQzEwLjAzMDggMS43ODEyNSA4LjU0NzEgMS4xNjY2NyA3IDEuMTY2NjdaTTQuNjY2NjIgOS45MTY2OEM0LjU4OTk4IDkuOTE3MDQgNC41MTQwNCA5LjkwMjA5IDQuNDQzMjUgOS44NzI3MUM0LjM3MjQ2IDkuODQzMzMgNC4zMDgyNiA5LjgwMDEgNC4yNTQ0IDkuNzQ1NTdDNC4xNDUxNiA5LjYzNjIgNC4wODM4IDkuNDg3OTMgNC4wODM4IDkuMzMzMzVDNC4wODM4IDkuMTc4NzYgNC4xNDUxNiA5LjAzMDUgNC4yNTQ0IDguOTIxMTNMNi4xNzU1MyA3TDQuMjU0NDMgNS4wNzg5MUM0LjE1MTM5IDQuOTY4MzIgNC4wOTUyOSA0LjgyMjA3IDQuMDk3OTYgNC42NzA5NEM0LjEwMDYzIDQuNTE5ODIgNC4xNjE4NSA0LjM3NTYzIDQuMjY4NzIgNC4yNjg3NkM0LjM3NTYgNC4xNjE4OCA0LjUxOTc5IDQuMTAwNjYgNC42NzA5MSA0LjA5Nzk5QzQuODIyMDQgNC4wOTUzMiA0Ljk2ODI5IDQuMTUxNDIgNS4wNzg4NyA0LjI1NDQ2TDYuOTk5OTcgNi4xNzU1Nkw4LjkyMTA2IDQuMjU0NDZDOS4wMzE2NCA0LjE1MTQyIDkuMTc3OSA0LjA5NTMyIDkuMzI5MDMgNC4wOTc5OUM5LjQ4MDE1IDQuMTAwNjYgOS42MjQzNCA0LjE2MTg4IDkuNzMxMjEgNC4yNjg3NkM5LjgzODA5IDQuMzc1NjMgOS44OTkzMSA0LjUxOTgyIDkuOTAxOTggNC42NzA5NEM5LjkwNDY0IDQuODIyMDcgOS44NDg1NSA0Ljk2ODMyIDkuNzQ1NTEgNS4wNzg5MUw3LjgyNDQxIDdMOS43NDU1NCA4LjkyMTEzQzkuODU0NzggOS4wMzA1IDkuOTE2MTQgOS4xNzg3NiA5LjkxNjE0IDkuMzMzMzVDOS45MTYxNCA5LjQ4NzkzIDkuODU0NzggOS42MzYyIDkuNzQ1NTQgOS43NDU1N0M5LjY5MTY4IDkuODAwMSA5LjYyNzQ4IDkuODQzMzMgOS41NTY2OSA5Ljg3MjcxQzkuNDg1OSA5LjkwMjA5IDkuNDA5OTYgOS45MTcwNCA5LjMzMzMyIDkuOTE2NjhDOS4yNTY2OCA5LjkxNzA0IDkuMTgwNzMgOS45MDIwOSA5LjEwOTk1IDkuODcyNzFDOS4wMzkxNiA5Ljg0MzMzIDguOTc0OTUgOS44MDAxIDguOTIxMSA5Ljc0NTU3TDYuOTk5OTcgNy44MjQ0NEw1LjA3ODg0IDkuNzQ1NTdDNS4wMjQ5OSA5LjgwMDEgNC45NjA3OCA5Ljg0MzMzIDQuODg5OTkgOS44NzI3MUM0LjgxOTIxIDkuOTAyMDkgNC43NDMyNiA5LjkxNzA0IDQuNjY2NjIgOS45MTY2OFpcIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgICAgPGNsaXBQYXRoIFtpZF09XCJwYXRoSWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgZmlsbD1cIndoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICA8L3N2Zz5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVzQ2lyY2xlSWNvbiBleHRlbmRzIEJhc2VJY29uIHtcbiAgICBwYXRoSWQ6IHN0cmluZztcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBhdGhJZCA9ICd1cmwoIycgKyBVbmlxdWVDb21wb25lbnRJZCgpICsgJyknO1xuICAgIH1cbn1cbiJdfQ==