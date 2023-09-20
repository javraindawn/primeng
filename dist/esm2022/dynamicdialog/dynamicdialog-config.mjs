/**
 * Dialogs can be created dynamically with any component as the content using a DialogService.
 * @group Interface
 */
export class DynamicDialogConfig {
    /**
     * An object to pass to the component loaded inside the Dialog.
     */
    data;
    /**
     * Header text of the dialog.
     */
    header;
    /**
     * Identifies the element (or elements) that labels the element it is applied to.
     */
    ariaLabelledBy;
    /**
     * Footer text of the dialog.
     */
    footer;
    /**
     * Width of the dialog.
     */
    width;
    /**
     * Height of the dialog.
     */
    height;
    /**
     * Specifies if pressing escape key should hide the dialog.
     */
    closeOnEscape;
    /**
     * Base zIndex value to use in layering.
     */
    baseZIndex;
    /**
     * Whether to automatically manage layering.
     */
    autoZIndex;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     */
    dismissableMask;
    /**
     * Inline style of the component.
     */
    rtl;
    /**
     * Inline style of the comopnent.
     */
    style;
    /**
     * Inline style of the content.
     */
    contentStyle;
    /**
     * Style class of the component.
     */
    styleClass;
    /**
     * Transition options of the animation.
     */
    transitionOptions;
    /**
     * Adds a close icon to the header to hide the dialog.
     */
    closable;
    /**
     * Whether to show the header or not.
     */
    showHeader;
    /**
     * Defines if background should be blocked when dialog is displayed.
     */
    modal;
    /**
     * Style class of the mask.
     */
    maskStyleClass;
    /**
     * Enables resizing of the content.
     */
    resizable;
    /**
     * Enables dragging to change the position using header.
     */
    draggable;
    /**
     * Keeps dialog in the viewport.
     */
    keepInViewport;
    /**
     * Minimum value for the left coordinate of dialog in dragging.
     */
    minX;
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     */
    minY;
    /**
     * Whether the dialog can be displayed full screen.
     */
    maximizable;
    /**
     * Name of the maximize icon.
     */
    maximizeIcon;
    /**
     * Name of the minimize icon.
     */
    minimizeIcon;
    /**
     * Position of the dialog, options are "center", "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left" or "bottom-right".
     */
    position;
    /**
     * Defines a string that labels the close button for accessibility.
     */
    closeAriaLabel;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     */
    appendTo;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY2RpYWxvZy1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZHluYW1pY2RpYWxvZy9keW5hbWljZGlhbG9nLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzVCOztPQUVHO0lBQ0gsSUFBSSxDQUFLO0lBQ1Q7O09BRUc7SUFDSCxNQUFNLENBQVU7SUFDaEI7O09BRUc7SUFDSCxjQUFjLENBQVU7SUFDeEI7O09BRUc7SUFDSCxNQUFNLENBQVU7SUFDaEI7O09BRUc7SUFDSCxLQUFLLENBQVU7SUFDZjs7T0FFRztJQUNILE1BQU0sQ0FBVTtJQUNoQjs7T0FFRztJQUNILGFBQWEsQ0FBVztJQUN4Qjs7T0FFRztJQUNILFVBQVUsQ0FBVTtJQUNwQjs7T0FFRztJQUNILFVBQVUsQ0FBVztJQUNyQjs7T0FFRztJQUNILGVBQWUsQ0FBVztJQUMxQjs7T0FFRztJQUNILEdBQUcsQ0FBVztJQUNkOztPQUVHO0lBQ0gsS0FBSyxDQUErQztJQUNwRDs7T0FFRztJQUNILFlBQVksQ0FBK0M7SUFDM0Q7O09BRUc7SUFDSCxVQUFVLENBQVU7SUFDcEI7O09BRUc7SUFDSCxpQkFBaUIsQ0FBVTtJQUMzQjs7T0FFRztJQUNILFFBQVEsQ0FBVztJQUNuQjs7T0FFRztJQUNILFVBQVUsQ0FBVztJQUNyQjs7T0FFRztJQUNILEtBQUssQ0FBVztJQUNoQjs7T0FFRztJQUNILGNBQWMsQ0FBVTtJQUN4Qjs7T0FFRztJQUNILFNBQVMsQ0FBVztJQUNwQjs7T0FFRztJQUNILFNBQVMsQ0FBVztJQUNwQjs7T0FFRztJQUNILGNBQWMsQ0FBVztJQUN6Qjs7T0FFRztJQUNILElBQUksQ0FBVTtJQUNkOztPQUVHO0lBQ0gsSUFBSSxDQUFVO0lBQ2Q7O09BRUc7SUFDSCxXQUFXLENBQVc7SUFDdEI7O09BRUc7SUFDSCxZQUFZLENBQVU7SUFDdEI7O09BRUc7SUFDSCxZQUFZLENBQVU7SUFDdEI7O09BRUc7SUFDSCxRQUFRLENBQVU7SUFDbEI7O09BRUc7SUFDSCxjQUFjLENBQVU7SUFDeEI7O09BRUc7SUFDSCxRQUFRLENBQU87Q0FDbEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERpYWxvZ3MgY2FuIGJlIGNyZWF0ZWQgZHluYW1pY2FsbHkgd2l0aCBhbnkgY29tcG9uZW50IGFzIHRoZSBjb250ZW50IHVzaW5nIGEgRGlhbG9nU2VydmljZS5cbiAqIEBncm91cCBJbnRlcmZhY2VcbiAqL1xuZXhwb3J0IGNsYXNzIER5bmFtaWNEaWFsb2dDb25maWc8VCA9IGFueT4ge1xuICAgIC8qKlxuICAgICAqIEFuIG9iamVjdCB0byBwYXNzIHRvIHRoZSBjb21wb25lbnQgbG9hZGVkIGluc2lkZSB0aGUgRGlhbG9nLlxuICAgICAqL1xuICAgIGRhdGE/OiBUO1xuICAgIC8qKlxuICAgICAqIEhlYWRlciB0ZXh0IG9mIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgaGVhZGVyPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIElkZW50aWZpZXMgdGhlIGVsZW1lbnQgKG9yIGVsZW1lbnRzKSB0aGF0IGxhYmVscyB0aGUgZWxlbWVudCBpdCBpcyBhcHBsaWVkIHRvLlxuICAgICAqL1xuICAgIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEZvb3RlciB0ZXh0IG9mIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgZm9vdGVyPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFdpZHRoIG9mIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgd2lkdGg/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgaGVpZ2h0Pzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyBpZiBwcmVzc2luZyBlc2NhcGUga2V5IHNob3VsZCBoaWRlIHRoZSBkaWFsb2cuXG4gICAgICovXG4gICAgY2xvc2VPbkVzY2FwZT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQmFzZSB6SW5kZXggdmFsdWUgdG8gdXNlIGluIGxheWVyaW5nLlxuICAgICAqL1xuICAgIGJhc2VaSW5kZXg/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG1hbmFnZSBsYXllcmluZy5cbiAgICAgKi9cbiAgICBhdXRvWkluZGV4PzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgaWYgY2xpY2tpbmcgdGhlIG1vZGFsIGJhY2tncm91bmQgc2hvdWxkIGhpZGUgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICBkaXNtaXNzYWJsZU1hc2s/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHJ0bD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21vcG5lbnQuXG4gICAgICovXG4gICAgc3R5bGU/OiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29udGVudC5cbiAgICAgKi9cbiAgICBjb250ZW50U3R5bGU/OiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgc3R5bGVDbGFzcz86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUcmFuc2l0aW9uIG9wdGlvbnMgb2YgdGhlIGFuaW1hdGlvbi5cbiAgICAgKi9cbiAgICB0cmFuc2l0aW9uT3B0aW9ucz86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBBZGRzIGEgY2xvc2UgaWNvbiB0byB0aGUgaGVhZGVyIHRvIGhpZGUgdGhlIGRpYWxvZy5cbiAgICAgKi9cbiAgICBjbG9zYWJsZT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBoZWFkZXIgb3Igbm90LlxuICAgICAqL1xuICAgIHNob3dIZWFkZXI/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgYmFja2dyb3VuZCBzaG91bGQgYmUgYmxvY2tlZCB3aGVuIGRpYWxvZyBpcyBkaXNwbGF5ZWQuXG4gICAgICovXG4gICAgbW9kYWw/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBtYXNrLlxuICAgICAqL1xuICAgIG1hc2tTdHlsZUNsYXNzPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgcmVzaXppbmcgb2YgdGhlIGNvbnRlbnQuXG4gICAgICovXG4gICAgcmVzaXphYmxlPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIGRyYWdnaW5nIHRvIGNoYW5nZSB0aGUgcG9zaXRpb24gdXNpbmcgaGVhZGVyLlxuICAgICAqL1xuICAgIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogS2VlcHMgZGlhbG9nIGluIHRoZSB2aWV3cG9ydC5cbiAgICAgKi9cbiAgICBrZWVwSW5WaWV3cG9ydD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogTWluaW11bSB2YWx1ZSBmb3IgdGhlIGxlZnQgY29vcmRpbmF0ZSBvZiBkaWFsb2cgaW4gZHJhZ2dpbmcuXG4gICAgICovXG4gICAgbWluWD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBNaW5pbXVtIHZhbHVlIGZvciB0aGUgdG9wIGNvb3JkaW5hdGUgb2YgZGlhbG9nIGluIGRyYWdnaW5nLlxuICAgICAqL1xuICAgIG1pblk/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGlhbG9nIGNhbiBiZSBkaXNwbGF5ZWQgZnVsbCBzY3JlZW4uXG4gICAgICovXG4gICAgbWF4aW1pemFibGU/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIG1heGltaXplIGljb24uXG4gICAgICovXG4gICAgbWF4aW1pemVJY29uPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIG1pbmltaXplIGljb24uXG4gICAgICovXG4gICAgbWluaW1pemVJY29uPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBkaWFsb2csIG9wdGlvbnMgYXJlIFwiY2VudGVyXCIsIFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b20tbGVmdFwiIG9yIFwiYm90dG9tLXJpZ2h0XCIuXG4gICAgICovXG4gICAgcG9zaXRpb24/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIHN0cmluZyB0aGF0IGxhYmVscyB0aGUgY2xvc2UgYnV0dG9uIGZvciBhY2Nlc3NpYmlsaXR5LlxuICAgICAqL1xuICAgIGNsb3NlQXJpYUxhYmVsPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRhcmdldCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgb3ZlcmxheSwgdmFsaWQgdmFsdWVzIGFyZSBcImJvZHlcIiBvciBhIGxvY2FsIG5nLXRlbXBsYXRlIHZhcmlhYmxlIG9mIGFub3RoZXIgZWxlbWVudCAobm90ZTogdXNlIGJpbmRpbmcgd2l0aCBicmFja2V0cyBmb3IgdGVtcGxhdGUgdmFyaWFibGVzLCBlLmcuIFthcHBlbmRUb109XCJteWRpdlwiIGZvciBhIGRpdiBlbGVtZW50IGhhdmluZyAjbXlkaXYgYXMgdmFyaWFibGUgbmFtZSkuXG4gICAgICovXG4gICAgYXBwZW5kVG8/OiBhbnk7XG59XG4iXX0=