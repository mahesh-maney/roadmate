import { NgModule, Sanitizer } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';
import { AlertService } from 'ng-jhipster';
import {
    AohSharedLibsModule
} from './';

export function alertServiceProvider(sanitizer: Sanitizer, translateService: TranslateService) {
    // set below to true to make alerts look like toast
    const isToast = false;
    return new AlertService(sanitizer, isToast, translateService);
}

@NgModule({
    imports: [
        AohSharedLibsModule
    ],
    declarations: [
    ],
    providers: [
        Title
    ],
    exports: [
        AohSharedLibsModule,
    ]
})
export class AohSharedCommonModule {}
