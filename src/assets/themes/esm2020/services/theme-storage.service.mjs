import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class VtsThemeStorageService {
    setBool(key, value) {
        localStorage.setItem(key, String(value));
    }
    getBool(key) {
        return localStorage.getItem(key) === 'true';
    }
    setObject(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    getObject(key) {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
    }
}
VtsThemeStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeStorageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
VtsThemeStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeStorageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeStorageService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3RoZW1lLXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQyxNQUFNLE9BQU8sc0JBQXNCO0lBQ2pDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsS0FBYztRQUNqQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVc7UUFDakIsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE1BQU0sQ0FBQztJQUM5QyxDQUFDO0lBRUQsU0FBUyxDQUFJLEdBQVcsRUFBRSxLQUFRO1FBQ2hDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsU0FBUyxDQUFJLEdBQVc7UUFDdEIsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNuQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0lBQ2pDLENBQUM7O21IQWhCVSxzQkFBc0I7dUhBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQURsQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVnRzVGhlbWVTdG9yYWdlU2VydmljZSB7XG4gIHNldEJvb2woa2V5OiBzdHJpbmcsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBTdHJpbmcodmFsdWUpKTtcbiAgfVxuXG4gIGdldEJvb2woa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gJ3RydWUnO1xuICB9XG5cbiAgc2V0T2JqZWN0PFQ+KGtleTogc3RyaW5nLCB2YWx1ZTogVCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG4gIGdldE9iamVjdDxUPihrZXk6IHN0cmluZyk6IFQge1xuICAgIGNvbnN0IHYgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpXG4gICAgcmV0dXJuIHYgPyBKU09OLnBhcnNlKHYpIDogbnVsbFxuICB9XG59XG4iXX0=