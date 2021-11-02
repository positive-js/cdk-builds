import { ListKeyManager } from './list-key-manager';
export class FocusKeyManager extends ListKeyManager {
    constructor() {
        super(...arguments);
        this.origin = 'program';
    }
    /**
     * Sets the focus origin that will be passed in to the items for any subsequent `focus` calls.
     * @param origin Focus origin to be used when focusing items.
     */
    setFocusOrigin(origin) {
        this.origin = origin;
        return this;
    }
    getFocusOrigin() {
        return this.origin;
    }
    setActiveItem(item) {
        super.setActiveItem(item);
        if (this.activeItem) {
            this.activeItem.focus(this.origin);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMta2V5LW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jZGsvYTExeS9rZXktbWFuYWdlci9mb2N1cy1rZXktbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsY0FBYyxFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBYTFFLE1BQU0sT0FBTyxlQUFtQixTQUFRLGNBQW9DO0lBQTVFOztRQUNZLFdBQU0sR0FBZ0IsU0FBUyxDQUFDO0lBNkI1QyxDQUFDO0lBM0JHOzs7T0FHRztJQUNILGNBQWMsQ0FBQyxNQUFtQjtRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBUUQsYUFBYSxDQUFDLElBQVM7UUFDbkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNPcmlnaW4gfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5cbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyLCBMaXN0S2V5TWFuYWdlck9wdGlvbiB9IGZyb20gJy4vbGlzdC1rZXktbWFuYWdlcic7XG5cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBpbnRlcmZhY2UgZm9yIGZvY3VzYWJsZSBpdGVtcyAodXNlZCBieSB0aGUgRm9jdXNLZXlNYW5hZ2VyKS5cbiAqIEVhY2ggaXRlbSBtdXN0IGtub3cgaG93IHRvIGZvY3VzIGl0c2VsZiwgd2hldGhlciBvciBub3QgaXQgaXMgY3VycmVudGx5IGRpc2FibGVkXG4gKiBhbmQgYmUgYWJsZSB0byBzdXBwbHkgaXQncyBsYWJlbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJRm9jdXNhYmxlT3B0aW9uIGV4dGVuZHMgTGlzdEtleU1hbmFnZXJPcHRpb24ge1xuICAgIC8vIEZvY3VzZXMgdGhlIGBGb2N1c2FibGVPcHRpb25gLiAqL1xuICAgIGZvY3VzKG9yaWdpbj86IEZvY3VzT3JpZ2luKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIEZvY3VzS2V5TWFuYWdlcjxUPiBleHRlbmRzIExpc3RLZXlNYW5hZ2VyPElGb2N1c2FibGVPcHRpb24gJiBUPiB7XG4gICAgcHJpdmF0ZSBvcmlnaW46IEZvY3VzT3JpZ2luID0gJ3Byb2dyYW0nO1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZm9jdXMgb3JpZ2luIHRoYXQgd2lsbCBiZSBwYXNzZWQgaW4gdG8gdGhlIGl0ZW1zIGZvciBhbnkgc3Vic2VxdWVudCBgZm9jdXNgIGNhbGxzLlxuICAgICAqIEBwYXJhbSBvcmlnaW4gRm9jdXMgb3JpZ2luIHRvIGJlIHVzZWQgd2hlbiBmb2N1c2luZyBpdGVtcy5cbiAgICAgKi9cbiAgICBzZXRGb2N1c09yaWdpbihvcmlnaW46IEZvY3VzT3JpZ2luKTogdGhpcyB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldEZvY3VzT3JpZ2luKCk6IEZvY3VzT3JpZ2luIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JpZ2luO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGFjdGl2ZSBpdGVtIG9yIGluZGV4IHRvIHRoZSBpdGVtIHRoYXQgaXMgc3BlY2lmaWVkIGFuZCBmb2N1c2VzIGl0LlxuICAgICAqIEBwYXJhbSBpdGVtIEl0ZW0gdG8gYmUgc2V0IGFzIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBzZXRBY3RpdmVJdGVtKGl0ZW06IG51bWJlciB8IFQpOiB2b2lkO1xuXG4gICAgc2V0QWN0aXZlSXRlbShpdGVtOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2V0QWN0aXZlSXRlbShpdGVtKTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0uZm9jdXModGhpcy5vcmlnaW4pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19