import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import {AdminRoutesModule} from './admin/admin.routes.module';
import {RouterModule} from '@angular/router';
import {approutes} from './app.routes';
import {PaginationConfig} from './blocks/config/uib-pagination.config';
import {customHttpProvider} from './blocks/interceptor/http.provider';
import {LocalStorageService} from 'ng2-webstorage';
import {EventManager} from 'ng-jhipster';
import {UserRouteAccessService} from './shared/auth/user-route-access-service';
import {AccountService} from './shared/auth/account.service';
import {SessionStorageService} from 'ng2-webstorage';
import {LoginModalService} from './shared/login/login-modal.service';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserAnimationsModule, // required for ng2-tag-input
    CoreModule,
    LayoutModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(approutes),
    AdminRoutesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [
    customHttpProvider(),
    PaginationConfig,
    UserRouteAccessService,
    LocalStorageService,
    EventManager,
    AccountService,
    SessionStorageService,
    LoginModalService
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AdminAppModule { }
