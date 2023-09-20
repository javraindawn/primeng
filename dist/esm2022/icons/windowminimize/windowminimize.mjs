import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
class WindowMinimizeIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: WindowMinimizeIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: WindowMinimizeIcon, isStandalone: true, selector: "WindowMinimizeIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z"
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
export { WindowMinimizeIcon };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: WindowMinimizeIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'WindowMinimizeIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93bWluaW1pemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaWNvbnMvd2luZG93bWluaW1pemUvd2luZG93bWluaW1pemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVsRCxNQXNCYSxrQkFBbUIsU0FBUSxRQUFRO0lBQzVDLE1BQU0sQ0FBUztJQUVmLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN0RCxDQUFDO3VHQUxRLGtCQUFrQjsyRkFBbEIsa0JBQWtCLHFHQWxCakI7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQ7O1NBRVEsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBdEI5QixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ25CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUljb24gfSBmcm9tICdwcmltZW5nL2Jhc2VpY29uJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnV2luZG93TWluaW1pemVJY29uJyxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIGltcG9ydHM6IFtCYXNlSWNvbl0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Qm94PVwiMCAwIDE0IDE0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJhcmlhSGlkZGVuXCIgW2F0dHIucm9sZV09XCJyb2xlXCIgW2NsYXNzXT1cImdldENsYXNzTmFtZXMoKVwiPlxuICAgICAgICAgICAgPGcgW2F0dHIuY2xpcC1wYXRoXT1cInBhdGhJZFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgICAgICBjbGlwLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk0xMS44IDBIMi4yQzEuNjE2NTIgMCAxLjA1Njk0IDAuMjMxNzg1IDAuNjQ0MzY1IDAuNjQ0MzY1QzAuMjMxNzg1IDEuMDU2OTQgMCAxLjYxNjUyIDAgMi4yVjdDMCA3LjE1OTEzIDAuMDYzMjE0IDcuMzExNzQgMC4xNzU3MzYgNy40MjQyNkMwLjI4ODI1OCA3LjUzNjc5IDAuNDQwODcgNy42IDAuNiA3LjZDMC43NTkxMyA3LjYgMC45MTE3NDIgNy41MzY3OSAxLjAyNDI2IDcuNDI0MjZDMS4xMzY3OSA3LjMxMTc0IDEuMiA3LjE1OTEzIDEuMiA3VjIuMkMxLjIgMS45MzQ3OCAxLjMwNTM2IDEuNjgwNDMgMS40OTI4OSAxLjQ5Mjg5QzEuNjgwNDMgMS4zMDUzNiAxLjkzNDc4IDEuMiAyLjIgMS4ySDExLjhDMTIuMDY1MiAxLjIgMTIuMzE5NiAxLjMwNTM2IDEyLjUwNzEgMS40OTI4OUMxMi42OTQ2IDEuNjgwNDMgMTIuOCAxLjkzNDc4IDEyLjggMi4yVjExLjhDMTIuOCAxMi4wNjUyIDEyLjY5NDYgMTIuMzE5NiAxMi41MDcxIDEyLjUwNzFDMTIuMzE5NiAxMi42OTQ2IDEyLjA2NTIgMTIuOCAxMS44IDEyLjhIN0M2Ljg0MDg3IDEyLjggNi42ODgyNiAxMi44NjMyIDYuNTc1NzQgMTIuOTc1N0M2LjQ2MzIxIDEzLjA4ODMgNi40IDEzLjI0MDkgNi40IDEzLjRDNi40IDEzLjU1OTEgNi40NjMyMSAxMy43MTE3IDYuNTc1NzQgMTMuODI0M0M2LjY4ODI2IDEzLjkzNjggNi44NDA4NyAxNCA3IDE0SDExLjhDMTIuMzgzNSAxNCAxMi45NDMxIDEzLjc2ODIgMTMuMzU1NiAxMy4zNTU2QzEzLjc2ODIgMTIuOTQzMSAxNCAxMi4zODM1IDE0IDExLjhWMi4yQzE0IDEuNjE2NTIgMTMuNzY4MiAxLjA1Njk0IDEzLjM1NTYgMC42NDQzNjVDMTIuOTQzMSAwLjIzMTc4NSAxMi4zODM1IDAgMTEuOCAwWk02LjM2OCA3Ljk1MkM2LjQ0MTM3IDcuOTgzMjYgNi41MjAyNSA3Ljk5OTU4IDYuNiA4SDkuOEM5Ljk1OTEzIDggMTAuMTExNyA3LjkzNjc4IDEwLjIyNDMgNy44MjQyNkMxMC4zMzY4IDcuNzExNzQgMTAuNCA3LjU1OTEzIDEwLjQgNy40QzEwLjQgNy4yNDA4NyAxMC4zMzY4IDcuMDg4MjYgMTAuMjI0MyA2Ljk3NTc0QzEwLjExMTcgNi44NjMyMSA5Ljk1OTEzIDYuOCA5LjggNi44SDguMDQ4TDEwLjYyNCA0LjIyNEMxMC43MyA0LjExMDI2IDEwLjc4NzcgMy45NTk4MiAxMC43ODQ5IDMuODA0MzhDMTAuNzgyMiAzLjY0ODk0IDEwLjcxOTIgMy41MDA2MyAxMC42MDkzIDMuMzkwN0MxMC40OTk0IDMuMjgwNzcgMTAuMzUxMSAzLjIxNzggMTAuMTk1NiAzLjIxNTA2QzEwLjA0MDIgMy4yMTIzMiA5Ljg4OTc0IDMuMjcwMDIgOS43NzYgMy4zNzZMNy4yIDUuOTUyVjQuMkM3LjIgNC4wNDA4NyA3LjEzNjc5IDMuODg4MjYgNy4wMjQyNiAzLjc3NTc0QzYuOTExNzQgMy42NjMyMSA2Ljc1OTEzIDMuNiA2LjYgMy42QzYuNDQwODcgMy42IDYuMjg4MjYgMy42NjMyMSA2LjE3NTc0IDMuNzc1NzRDNi4wNjMyMSAzLjg4ODI2IDYgNC4wNDA4NyA2IDQuMlY3LjRDNi4wMDA0MiA3LjQ3OTc1IDYuMDE2NzQgNy41NTg2MiA2LjA0OCA3LjYzMkM2LjA3NjU2IDcuNzA0NDIgNi4xMTk3MSA3Ljc3MDIgNi4xNzQ3NSA3LjgyNTI0QzYuMjI5OCA3Ljg4MDI5IDYuMjk1NTggNy45MjM0NCA2LjM2OCA3Ljk1MlpNMS40IDguODAwMDVIMy44QzQuMTcwNjYgOC44MDIxNSA0LjUyNTUzIDguOTUwMzIgNC43ODc2MyA5LjIxMjQyQzUuMDQ5NzMgOS40NzQ1MiA1LjE5NzkgOS44MjkzOSA1LjIgMTAuMlYxMi42QzUuMTk3OSAxMi45NzA3IDUuMDQ5NzMgMTMuMzI1NiA0Ljc4NzYzIDEzLjU4NzdDNC41MjU1MyAxMy44NDk4IDQuMTcwNjYgMTMuOTk3OSAzLjggMTRIMS40QzEuMDI5MzQgMTMuOTk3OSAwLjY3NDQ2OCAxMy44NDk4IDAuNDEyMzcxIDEzLjU4NzdDMC4xNTAyNzQgMTMuMzI1NiAwLjAwMjEwMDA4IDEyLjk3MDcgMCAxMi42VjEwLjJDMC4wMDIxMDAwOCA5LjgyOTM5IDAuMTUwMjc0IDkuNDc0NTIgMC40MTIzNzEgOS4yMTI0MkMwLjY3NDQ2OCA4Ljk1MDMyIDEuMDI5MzQgOC44MDIxNSAxLjQgOC44MDAwNVpNMy45NDE0MiAxMi43NDE1QzMuOTc4OTMgMTIuNzA0IDQgMTIuNjUzMSA0IDEyLjZWMTAuMkM0IDEwLjE0NyAzLjk3ODkzIDEwLjA5NjEgMy45NDE0MiAxMC4wNTg2QzMuOTAzOTEgMTAuMDIxMSAzLjg1MzA0IDEwIDMuOCAxMEgxLjRDMS4zNDY5NiAxMCAxLjI5NjA5IDEwLjAyMTEgMS4yNTg1OCAxMC4wNTg2QzEuMjIxMDcgMTAuMDk2MSAxLjIgMTAuMTQ3IDEuMiAxMC4yVjEyLjZDMS4yIDEyLjY1MzEgMS4yMjEwNyAxMi43MDQgMS4yNTg1OCAxMi43NDE1QzEuMjk2MDkgMTIuNzc5IDEuMzQ2OTYgMTIuOCAxLjQgMTIuOEgzLjhDMy44NTMwNCAxMi44IDMuOTAzOTEgMTIuNzc5IDMuOTQxNDIgMTIuNzQxNVpcIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgICAgPGNsaXBQYXRoIFtpZF09XCJwYXRoSWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgZmlsbD1cIndoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICA8L3N2Zz5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFdpbmRvd01pbmltaXplSWNvbiBleHRlbmRzIEJhc2VJY29uIHtcbiAgICBwYXRoSWQ6IHN0cmluZztcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBhdGhJZCA9ICd1cmwoIycgKyBVbmlxdWVDb21wb25lbnRJZCgpICsgJyknO1xuICAgIH1cbn1cbiJdfQ==