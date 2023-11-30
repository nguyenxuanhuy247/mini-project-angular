export declare type VtsTheme = 'default' | 'dark';
export declare type VtsThemeItem = {
    theme: VtsTheme;
    url: string;
};
export declare type VtsThemeConfig = {
    themes: VtsThemeItem[];
    defaultTheme: VtsTheme;
};
