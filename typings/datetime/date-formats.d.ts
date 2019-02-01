import { InjectionToken } from '@angular/core';
export interface McDateFormats {
    parse: {
        dateInput: any;
    };
    display: {
        dateInput: any;
        monthYearLabel: any;
        dateA11yLabel: any;
        monthYearA11yLabel: any;
    };
}
export declare const MC_DATE_FORMATS: InjectionToken<McDateFormats>;
