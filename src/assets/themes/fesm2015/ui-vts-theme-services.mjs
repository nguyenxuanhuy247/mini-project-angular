import * as i0 from '@angular/core';
import { Injectable, InjectionToken, Inject, APP_INITIALIZER, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

class VtsThemeStorageService {
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

const VTS_THEME_CONFIG = new InjectionToken('Config for theme switcher');

const THEME_KEY = 'vts-theme';
class VtsThemeService {
    constructor(config, document, storage) {
        this.config = config;
        this.document = document;
        this.storage = storage;
        this.theme$ = new BehaviorSubject(null);
        this.allTheme$ = new BehaviorSubject([]);
        this._theme = null;
        this._allTheme = [];
        this.init();
    }
    set theme(value) {
        this._theme = value;
        this.theme$.next(this._theme);
    }
    get theme() {
        return this._theme;
    }
    set allTheme(value) {
        this._allTheme = value;
        this.allTheme$.next(this._allTheme);
    }
    get allTheme() {
        return this._allTheme;
    }
    ngOnDestroy() {
        this.theme$.complete();
        this.allTheme$.complete();
    }
    setTheme(theme) {
        if (this.allTheme.filter(i => i.theme === theme).length) {
            this._theme = theme;
            this.loadTheme();
        }
        else {
            throw new Error(`Unable to find theme ${theme}!`);
        }
    }
    loadTheme() {
        var _a, _b;
        if (!this.document)
            return;
        const url = (_b = (_a = this._allTheme.filter(i => i.theme === this._theme)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
        if (!url)
            throw new Error(`Unable to find theme ${this._theme}!`);
        const script = this.document.createElement('link');
        script.type = 'text/css';
        script.rel = 'stylesheet';
        script.id = `vts-theme-${this._theme}`;
        script.href = `${url}`;
        script.onload = () => {
            // Emit new theme loaded
            this.theme = this._theme;
            this.storage.setObject(THEME_KEY, this._theme);
            this.document.body.setAttribute('vts-theme', this._theme);
            this._allTheme.map(i => i.theme).filter(i => i !== this._theme).forEach((i) => {
                const dom = this.document.getElementById(`vts-theme-${i}`);
                if (dom)
                    dom.remove();
            });
        };
        this.document.body.append(script);
    }
    init() {
        const valid = [];
        const themes = this.config.themes.filter(i => {
            if (valid.includes(i.theme))
                return false;
            if (!!i.url) {
                valid.push(i.theme);
                return true;
            }
            return false;
        });
        if (!themes.length)
            throw new Error("No theme provided or invalid data was provided!");
        this.allTheme = themes;
        const cache = this.storage.getObject(THEME_KEY);
        this._theme = themes.some(i => i.theme === cache) ? cache : (this.config.defaultTheme || themes[0].theme);
        this.loadTheme();
    }
}
VtsThemeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeService, deps: [{ token: VTS_THEME_CONFIG }, { token: DOCUMENT }, { token: VtsThemeStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
VtsThemeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: VtsThemeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [VTS_THEME_CONFIG]
                    }] }, { type: Document, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: VtsThemeStorageService }];
    } });

class VtsThemeModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { THEME_KEY, VTS_THEME_CONFIG, VtsThemeModule, VtsThemeService, VtsThemeStorageService };
//# sourceMappingURL=ui-vts-theme-services.mjs.map
