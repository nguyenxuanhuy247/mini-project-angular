import { OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VtsThemeStorageService } from './theme-storage.service';
import { VtsTheme, VtsThemeConfig, VtsThemeItem } from './types';
import * as i0 from "@angular/core";
export declare const THEME_KEY = "vts-theme";
export declare class VtsThemeService implements OnDestroy {
    private config;
    private document;
    private storage;
    readonly theme$: BehaviorSubject<VtsTheme | null>;
    readonly allTheme$: BehaviorSubject<VtsThemeItem[]>;
    private _theme;
    set theme(value: VtsTheme | null);
    get theme(): VtsTheme | null;
    private _allTheme;
    set allTheme(value: VtsThemeItem[]);
    get allTheme(): VtsThemeItem[];
    constructor(config: VtsThemeConfig, document: Document, storage: VtsThemeStorageService);
    ngOnDestroy(): void;
    setTheme(theme: VtsTheme): void;
    loadTheme(): void;
    init(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VtsThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VtsThemeService>;
}
