import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
class SearchMinusIcon extends BaseIcon {
    pathId;
    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: SearchMinusIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: SearchMinusIcon, isStandalone: true, selector: "SearchMinusIcon", usesInheritance: true, ngImport: i0, template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.0208 12.0411C4.83005 12.0411 3.66604 11.688 2.67596 11.0265C1.68589 10.3649 0.914216 9.42464 0.458534 8.32452C0.00285271 7.22441 -0.116374 6.01388 0.11593 4.84601C0.348235 3.67813 0.921637 2.60537 1.76363 1.76338C2.60562 0.921393 3.67838 0.34799 4.84625 0.115686C6.01412 -0.116618 7.22466 0.00260857 8.32477 0.45829C9.42488 0.913972 10.3652 1.68564 11.0267 2.67572C11.6883 3.66579 12.0414 4.8298 12.0414 6.02056C12.0395 7.41563 11.5542 8.76029 10.6783 9.8305L13.8244 12.9765C13.9367 13.089 13.9997 13.2414 13.9997 13.4003C13.9997 13.5592 13.9367 13.7116 13.8244 13.8241C13.769 13.8801 13.703 13.9245 13.6302 13.9548C13.5575 13.985 13.4794 14.0003 13.4006 14C13.3218 14.0003 13.2437 13.985 13.171 13.9548C13.0982 13.9245 13.0322 13.8801 12.9768 13.8241L9.83082 10.678C8.76059 11.5539 7.4159 12.0393 6.0208 12.0411ZM6.0208 1.20731C5.07199 1.20731 4.14449 1.48867 3.35559 2.0158C2.56669 2.54292 1.95181 3.29215 1.58872 4.16874C1.22562 5.04532 1.13062 6.00989 1.31572 6.94046C1.50083 7.87104 1.95772 8.72583 2.62863 9.39674C3.29954 10.0676 4.15433 10.5245 5.0849 10.7096C6.01548 10.8947 6.98005 10.7997 7.85663 10.4367C8.73322 10.0736 9.48244 9.45868 10.0096 8.66978C10.5367 7.88088 10.8181 6.95337 10.8181 6.00457C10.8181 4.73226 10.3126 3.51206 9.41297 2.6124C8.51331 1.71274 7.29311 1.20731 6.0208 1.20731ZM4.00591 6.60422H8.00362C8.16266 6.60422 8.31518 6.54104 8.42764 6.42859C8.5401 6.31613 8.60328 6.1636 8.60328 6.00456C8.60328 5.84553 8.5401 5.693 8.42764 5.58054C8.31518 5.46809 8.16266 5.40491 8.00362 5.40491H4.00591C3.84687 5.40491 3.69434 5.46809 3.58189 5.58054C3.46943 5.693 3.40625 5.84553 3.40625 6.00456C3.40625 6.1636 3.46943 6.31613 3.58189 6.42859C3.69434 6.54104 3.84687 6.60422 4.00591 6.60422Z"
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
export { SearchMinusIcon };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: SearchMinusIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'SearchMinusIcon',
                    standalone: true,
                    imports: [BaseIcon],
                    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.0208 12.0411C4.83005 12.0411 3.66604 11.688 2.67596 11.0265C1.68589 10.3649 0.914216 9.42464 0.458534 8.32452C0.00285271 7.22441 -0.116374 6.01388 0.11593 4.84601C0.348235 3.67813 0.921637 2.60537 1.76363 1.76338C2.60562 0.921393 3.67838 0.34799 4.84625 0.115686C6.01412 -0.116618 7.22466 0.00260857 8.32477 0.45829C9.42488 0.913972 10.3652 1.68564 11.0267 2.67572C11.6883 3.66579 12.0414 4.8298 12.0414 6.02056C12.0395 7.41563 11.5542 8.76029 10.6783 9.8305L13.8244 12.9765C13.9367 13.089 13.9997 13.2414 13.9997 13.4003C13.9997 13.5592 13.9367 13.7116 13.8244 13.8241C13.769 13.8801 13.703 13.9245 13.6302 13.9548C13.5575 13.985 13.4794 14.0003 13.4006 14C13.3218 14.0003 13.2437 13.985 13.171 13.9548C13.0982 13.9245 13.0322 13.8801 12.9768 13.8241L9.83082 10.678C8.76059 11.5539 7.4159 12.0393 6.0208 12.0411ZM6.0208 1.20731C5.07199 1.20731 4.14449 1.48867 3.35559 2.0158C2.56669 2.54292 1.95181 3.29215 1.58872 4.16874C1.22562 5.04532 1.13062 6.00989 1.31572 6.94046C1.50083 7.87104 1.95772 8.72583 2.62863 9.39674C3.29954 10.0676 4.15433 10.5245 5.0849 10.7096C6.01548 10.8947 6.98005 10.7997 7.85663 10.4367C8.73322 10.0736 9.48244 9.45868 10.0096 8.66978C10.5367 7.88088 10.8181 6.95337 10.8181 6.00457C10.8181 4.73226 10.3126 3.51206 9.41297 2.6124C8.51331 1.71274 7.29311 1.20731 6.0208 1.20731ZM4.00591 6.60422H8.00362C8.16266 6.60422 8.31518 6.54104 8.42764 6.42859C8.5401 6.31613 8.60328 6.1636 8.60328 6.00456C8.60328 5.84553 8.5401 5.693 8.42764 5.58054C8.31518 5.46809 8.16266 5.40491 8.00362 5.40491H4.00591C3.84687 5.40491 3.69434 5.46809 3.58189 5.58054C3.46943 5.693 3.40625 5.84553 3.40625 6.00456C3.40625 6.1636 3.46943 6.31613 3.58189 6.42859C3.69434 6.54104 3.84687 6.60422 4.00591 6.60422Z"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNobWludXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvaWNvbnMvc2VhcmNobWludXMvc2VhcmNobWludXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUVsRCxNQXNCYSxlQUFnQixTQUFRLFFBQVE7SUFDekMsTUFBTSxDQUFTO0lBRWYsUUFBUTtRQUNKLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLGlCQUFpQixFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ3RELENBQUM7dUdBTFEsZUFBZTsyRkFBZixlQUFlLGtHQWxCZDs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVDs7U0FFUSxlQUFlOzJGQUFmLGVBQWU7a0JBdEIzQixTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0JBQ25CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVDtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUljb24gfSBmcm9tICdwcmltZW5nL2Jhc2VpY29uJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnU2VhcmNoTWludXNJY29uJyxcbiAgICBzdGFuZGFsb25lOiB0cnVlLFxuICAgIGltcG9ydHM6IFtCYXNlSWNvbl0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjE0XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Qm94PVwiMCAwIDE0IDE0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJhcmlhSGlkZGVuXCIgW2F0dHIucm9sZV09XCJyb2xlXCIgW2NsYXNzXT1cImdldENsYXNzTmFtZXMoKVwiPlxuICAgICAgICAgICAgPGcgW2F0dHIuY2xpcC1wYXRoXT1cInBhdGhJZFwiPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgIGZpbGwtcnVsZT1cImV2ZW5vZGRcIlxuICAgICAgICAgICAgICAgICAgICBjbGlwLXJ1bGU9XCJldmVub2RkXCJcbiAgICAgICAgICAgICAgICAgICAgZD1cIk02LjAyMDggMTIuMDQxMUM0LjgzMDA1IDEyLjA0MTEgMy42NjYwNCAxMS42ODggMi42NzU5NiAxMS4wMjY1QzEuNjg1ODkgMTAuMzY0OSAwLjkxNDIxNiA5LjQyNDY0IDAuNDU4NTM0IDguMzI0NTJDMC4wMDI4NTI3MSA3LjIyNDQxIC0wLjExNjM3NCA2LjAxMzg4IDAuMTE1OTMgNC44NDYwMUMwLjM0ODIzNSAzLjY3ODEzIDAuOTIxNjM3IDIuNjA1MzcgMS43NjM2MyAxLjc2MzM4QzIuNjA1NjIgMC45MjEzOTMgMy42NzgzOCAwLjM0Nzk5IDQuODQ2MjUgMC4xMTU2ODZDNi4wMTQxMiAtMC4xMTY2MTggNy4yMjQ2NiAwLjAwMjYwODU3IDguMzI0NzcgMC40NTgyOUM5LjQyNDg4IDAuOTEzOTcyIDEwLjM2NTIgMS42ODU2NCAxMS4wMjY3IDIuNjc1NzJDMTEuNjg4MyAzLjY2NTc5IDEyLjA0MTQgNC44Mjk4IDEyLjA0MTQgNi4wMjA1NkMxMi4wMzk1IDcuNDE1NjMgMTEuNTU0MiA4Ljc2MDI5IDEwLjY3ODMgOS44MzA1TDEzLjgyNDQgMTIuOTc2NUMxMy45MzY3IDEzLjA4OSAxMy45OTk3IDEzLjI0MTQgMTMuOTk5NyAxMy40MDAzQzEzLjk5OTcgMTMuNTU5MiAxMy45MzY3IDEzLjcxMTYgMTMuODI0NCAxMy44MjQxQzEzLjc2OSAxMy44ODAxIDEzLjcwMyAxMy45MjQ1IDEzLjYzMDIgMTMuOTU0OEMxMy41NTc1IDEzLjk4NSAxMy40Nzk0IDE0LjAwMDMgMTMuNDAwNiAxNEMxMy4zMjE4IDE0LjAwMDMgMTMuMjQzNyAxMy45ODUgMTMuMTcxIDEzLjk1NDhDMTMuMDk4MiAxMy45MjQ1IDEzLjAzMjIgMTMuODgwMSAxMi45NzY4IDEzLjgyNDFMOS44MzA4MiAxMC42NzhDOC43NjA1OSAxMS41NTM5IDcuNDE1OSAxMi4wMzkzIDYuMDIwOCAxMi4wNDExWk02LjAyMDggMS4yMDczMUM1LjA3MTk5IDEuMjA3MzEgNC4xNDQ0OSAxLjQ4ODY3IDMuMzU1NTkgMi4wMTU4QzIuNTY2NjkgMi41NDI5MiAxLjk1MTgxIDMuMjkyMTUgMS41ODg3MiA0LjE2ODc0QzEuMjI1NjIgNS4wNDUzMiAxLjEzMDYyIDYuMDA5ODkgMS4zMTU3MiA2Ljk0MDQ2QzEuNTAwODMgNy44NzEwNCAxLjk1NzcyIDguNzI1ODMgMi42Mjg2MyA5LjM5Njc0QzMuMjk5NTQgMTAuMDY3NiA0LjE1NDMzIDEwLjUyNDUgNS4wODQ5IDEwLjcwOTZDNi4wMTU0OCAxMC44OTQ3IDYuOTgwMDUgMTAuNzk5NyA3Ljg1NjYzIDEwLjQzNjdDOC43MzMyMiAxMC4wNzM2IDkuNDgyNDQgOS40NTg2OCAxMC4wMDk2IDguNjY5NzhDMTAuNTM2NyA3Ljg4MDg4IDEwLjgxODEgNi45NTMzNyAxMC44MTgxIDYuMDA0NTdDMTAuODE4MSA0LjczMjI2IDEwLjMxMjYgMy41MTIwNiA5LjQxMjk3IDIuNjEyNEM4LjUxMzMxIDEuNzEyNzQgNy4yOTMxMSAxLjIwNzMxIDYuMDIwOCAxLjIwNzMxWk00LjAwNTkxIDYuNjA0MjJIOC4wMDM2MkM4LjE2MjY2IDYuNjA0MjIgOC4zMTUxOCA2LjU0MTA0IDguNDI3NjQgNi40Mjg1OUM4LjU0MDEgNi4zMTYxMyA4LjYwMzI4IDYuMTYzNiA4LjYwMzI4IDYuMDA0NTZDOC42MDMyOCA1Ljg0NTUzIDguNTQwMSA1LjY5MyA4LjQyNzY0IDUuNTgwNTRDOC4zMTUxOCA1LjQ2ODA5IDguMTYyNjYgNS40MDQ5MSA4LjAwMzYyIDUuNDA0OTFINC4wMDU5MUMzLjg0Njg3IDUuNDA0OTEgMy42OTQzNCA1LjQ2ODA5IDMuNTgxODkgNS41ODA1NEMzLjQ2OTQzIDUuNjkzIDMuNDA2MjUgNS44NDU1MyAzLjQwNjI1IDYuMDA0NTZDMy40MDYyNSA2LjE2MzYgMy40Njk0MyA2LjMxNjEzIDMuNTgxODkgNi40Mjg1OUMzLjY5NDM0IDYuNTQxMDQgMy44NDY4NyA2LjYwNDIyIDQuMDA1OTEgNi42MDQyMlpcIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgICAgPGNsaXBQYXRoIFtpZF09XCJwYXRoSWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIxNFwiIGhlaWdodD1cIjE0XCIgZmlsbD1cIndoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxuICAgICAgICAgICAgPC9kZWZzPlxuICAgICAgICA8L3N2Zz5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaE1pbnVzSWNvbiBleHRlbmRzIEJhc2VJY29uIHtcbiAgICBwYXRoSWQ6IHN0cmluZztcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnBhdGhJZCA9ICd1cmwoIycgKyBVbmlxdWVDb21wb25lbnRJZCgpICsgJyknO1xuICAgIH1cbn1cbiJdfQ==