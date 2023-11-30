import { APP_INITIALIZER, NgModule } from '@angular/core';
import { VtsThemeStorageService } from './theme-storage.service';
import { VtsThemeService } from './theme.service';
import { VTS_THEME_CONFIG } from './tokens';
import * as i0 from "@angular/core";
export class VtsThemeModule {
    static forRoot(config) {
        return {
            ngModule: VtsThemeModule,
            providers: [
                {
                    provide: VTS_THEME_CONFIG,
                    useValue: config
                },
                VtsThemeStorageService,
                VtsThemeService,
                {
                    provide: APP_INITIALIZER,
                    useFactory: (_service) => () => { },
                    deps: [VtsThemeService],
                    multi: true
                }
            ]
        };
    }
}
VtsThemeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VtsThemeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeModule });
VtsThemeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3RoZW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUFJNUMsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFzQjtRQUNuQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjtnQkFDRCxzQkFBc0I7Z0JBQ3RCLGVBQWU7Z0JBQ2Y7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFVBQVUsRUFBRSxDQUFDLFFBQXlCLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFFLENBQUM7b0JBQ25ELElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDdkIsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzsyR0FuQlUsY0FBYzs0R0FBZCxjQUFjOzRHQUFkLGNBQWM7MkZBQWQsY0FBYztrQkFEMUIsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVnRzVGhlbWVTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vdGhlbWUtc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZ0c1RoZW1lU2VydmljZSB9IGZyb20gJy4vdGhlbWUuc2VydmljZSc7XG5pbXBvcnQgeyBWVFNfVEhFTUVfQ09ORklHIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgVnRzVGhlbWVDb25maWcgfSBmcm9tICcuL3R5cGVzJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIFZ0c1RoZW1lTW9kdWxlIHsgXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogVnRzVGhlbWVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFZ0c1RoZW1lTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBWdHNUaGVtZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVlRTX1RIRU1FX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXG4gICAgICAgIH0sXG4gICAgICAgIFZ0c1RoZW1lU3RvcmFnZVNlcnZpY2UsXG4gICAgICAgIFZ0c1RoZW1lU2VydmljZSxcbiAgICAgICAgeyBcbiAgICAgICAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsIFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IChfc2VydmljZTogVnRzVGhlbWVTZXJ2aWNlKSA9PiAoKSA9PiB7fSwgXG4gICAgICAgICAgZGVwczogW1Z0c1RoZW1lU2VydmljZV0sIFxuICAgICAgICAgIG11bHRpOiB0cnVlIFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19