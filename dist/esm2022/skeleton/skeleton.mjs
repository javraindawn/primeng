import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Skeleton is a placeholder to display instead of the actual content.
 * @group Components
 */
class Skeleton {
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Shape of the element.
     * @group Props
     */
    shape = 'rectangle';
    /**
     * Type of the animation.
     * @gruop Props
     */
    animation = 'wave';
    /**
     * Border radius of the element, defaults to value from theme.
     * @group Props
     */
    borderRadius;
    /**
     * Size of the Circle or Square.
     * @group Props
     */
    size;
    /**
     * Width of the element.
     * @group Props
     */
    width = '100%';
    /**
     * Height of the element.
     * @group Props
     */
    height = '1rem';
    containerClass() {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape === 'circle',
            'p-skeleton-none': this.animation === 'none'
        };
    }
    containerStyle() {
        if (this.size)
            return { ...this.style, width: this.size, height: this.size, borderRadius: this.borderRadius };
        else
            return { ...this.style, width: this.width, height: this.height, borderRadius: this.borderRadius };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Skeleton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.0", type: Skeleton, selector: "p-skeleton", inputs: { styleClass: "styleClass", style: "style", shape: "shape", animation: "animation", borderRadius: "borderRadius", size: "size", width: "width", height: "height" }, host: { classAttribute: "p-element" }, ngImport: i0, template: ` <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()" [attr.data-pc-name]="'skeleton'" [attr.aria-hidden]="true" [attr.data-pc-section]="'root'"></div> `, isInline: true, styles: [".p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:\"\";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translate(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translate(-100%)}to{transform:translate(100%)}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
export { Skeleton };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: Skeleton, decorators: [{
            type: Component,
            args: [{ selector: 'p-skeleton', template: ` <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()" [attr.data-pc-name]="'skeleton'" [attr.aria-hidden]="true" [attr.data-pc-section]="'root'"></div> `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: [".p-skeleton{position:relative;overflow:hidden}.p-skeleton:after{content:\"\";animation:p-skeleton-animation 1.2s infinite;height:100%;left:0;position:absolute;right:0;top:0;transform:translate(-100%);z-index:1}.p-skeleton.p-skeleton-circle{border-radius:50%}.p-skeleton-none:after{animation:none}@keyframes p-skeleton-animation{0%{transform:translate(-100%)}to{transform:translate(100%)}}\n"] }]
        }], propDecorators: { styleClass: [{
                type: Input
            }], style: [{
                type: Input
            }], shape: [{
                type: Input
            }], animation: [{
                type: Input
            }], borderRadius: [{
                type: Input
            }], size: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
class SkeletonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: SkeletonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.0", ngImport: i0, type: SkeletonModule, declarations: [Skeleton], imports: [CommonModule], exports: [Skeleton] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: SkeletonModule, imports: [CommonModule] });
}
export { SkeletonModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.0", ngImport: i0, type: SkeletonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [Skeleton],
                    declarations: [Skeleton]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2tlbGV0b24vc2tlbGV0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBQ3ZHOzs7R0FHRztBQUNILE1BVWEsUUFBUTtJQUNqQjs7O09BR0c7SUFDTSxVQUFVLENBQXFCO0lBQ3hDOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sS0FBSyxHQUFXLFdBQVcsQ0FBQztJQUNyQzs7O09BR0c7SUFDTSxTQUFTLEdBQVcsTUFBTSxDQUFDO0lBQ3BDOzs7T0FHRztJQUNNLFlBQVksQ0FBcUI7SUFDMUM7OztPQUdHO0lBQ00sSUFBSSxDQUFxQjtJQUNsQzs7O09BR0c7SUFDTSxLQUFLLEdBQVcsTUFBTSxDQUFDO0lBQ2hDOzs7T0FHRztJQUNNLE1BQU0sR0FBVyxNQUFNLENBQUM7SUFFakMsY0FBYztRQUNWLE9BQU87WUFDSCx3QkFBd0IsRUFBRSxJQUFJO1lBQzlCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtZQUM1QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU07U0FDL0MsQ0FBQztJQUNOLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7WUFDekcsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNHLENBQUM7dUdBckRRLFFBQVE7MkZBQVIsUUFBUSxxUUFSUCx5TEFBeUw7O1NBUTFMLFFBQVE7MkZBQVIsUUFBUTtrQkFWcEIsU0FBUzsrQkFDSSxZQUFZLFlBQ1oseUxBQXlMLG1CQUNsTCx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBRS9CO3dCQUNGLEtBQUssRUFBRSxXQUFXO3FCQUNyQjs4QkFPUSxVQUFVO3NCQUFsQixLQUFLO2dCQUtHLEtBQUs7c0JBQWIsS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFLRyxZQUFZO3NCQUFwQixLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csTUFBTTtzQkFBZCxLQUFLOztBQWdCVixNQUthLGNBQWM7dUdBQWQsY0FBYzt3R0FBZCxjQUFjLGlCQTdEZCxRQUFRLGFBeURQLFlBQVksYUF6RGIsUUFBUTt3R0E2RFIsY0FBYyxZQUpiLFlBQVk7O1NBSWIsY0FBYzsyRkFBZCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBOZ01vZHVsZSwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuICogU2tlbGV0b24gaXMgYSBwbGFjZWhvbGRlciB0byBkaXNwbGF5IGluc3RlYWQgb2YgdGhlIGFjdHVhbCBjb250ZW50LlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXNrZWxldG9uJyxcbiAgICB0ZW1wbGF0ZTogYCA8ZGl2IFtuZ0NsYXNzXT1cImNvbnRhaW5lckNsYXNzKClcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cImNvbnRhaW5lclN0eWxlKClcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3NrZWxldG9uJ1wiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3Jvb3QnXCI+PC9kaXY+IGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9za2VsZXRvbi5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2tlbGV0b24ge1xuICAgIC8qKlxuICAgICAqIENsYXNzIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJbmxpbmUgc3R5bGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU2hhcGUgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hhcGU6IHN0cmluZyA9ICdyZWN0YW5nbGUnO1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgdGhlIGFuaW1hdGlvbi5cbiAgICAgKiBAZ3J1b3AgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhbmltYXRpb246IHN0cmluZyA9ICd3YXZlJztcbiAgICAvKipcbiAgICAgKiBCb3JkZXIgcmFkaXVzIG9mIHRoZSBlbGVtZW50LCBkZWZhdWx0cyB0byB2YWx1ZSBmcm9tIHRoZW1lLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGJvcmRlclJhZGl1czogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFNpemUgb2YgdGhlIENpcmNsZSBvciBTcXVhcmUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2l6ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdpZHRoIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmcgPSAnMTAwJSc7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nID0gJzFyZW0nO1xuXG4gICAgY29udGFpbmVyQ2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncC1za2VsZXRvbiBwLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgICAgICAncC1za2VsZXRvbi1jaXJjbGUnOiB0aGlzLnNoYXBlID09PSAnY2lyY2xlJyxcbiAgICAgICAgICAgICdwLXNrZWxldG9uLW5vbmUnOiB0aGlzLmFuaW1hdGlvbiA9PT0gJ25vbmUnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29udGFpbmVyU3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNpemUpIHJldHVybiB7IC4uLnRoaXMuc3R5bGUsIHdpZHRoOiB0aGlzLnNpemUsIGhlaWdodDogdGhpcy5zaXplLCBib3JkZXJSYWRpdXM6IHRoaXMuYm9yZGVyUmFkaXVzIH07XG4gICAgICAgIGVsc2UgcmV0dXJuIHsgLi4udGhpcy5zdHlsZSwgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHQsIGJvcmRlclJhZGl1czogdGhpcy5ib3JkZXJSYWRpdXMgfTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NrZWxldG9uXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTa2VsZXRvbl1cbn0pXG5leHBvcnQgY2xhc3MgU2tlbGV0b25Nb2R1bGUge31cbiJdfQ==