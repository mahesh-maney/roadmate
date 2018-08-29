import './vendor.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AdminAppModule } from './app/admin.app.module';
import { environment } from './environments/environment.prod';

if (environment.production) {
    enableProdMode();
}

let p = platformBrowserDynamic().bootstrapModule(AdminAppModule);
p.then(() => { (<any>window).appBootstrap && (<any>window).appBootstrap(); })
// .catch(err => console.error(err));
