import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { UserblockService } from './sidebar/userblock/userblock.service';

import { SharedModule } from '../shared/shared.module';
import {ErrorComponent} from './error/error.component';
import { ChangePasswordComponent } from './header/changepassword/changepassword.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule({
    imports: [
        SharedModule,
        Ng2Bs3ModalModule
    ],
    providers: [
        UserblockService
    ],
    declarations: [
      LayoutComponent,
      SidebarComponent,
      UserblockComponent,
      HeaderComponent,
      NavsearchComponent,
      OffsidebarComponent,
      ErrorComponent,
      ChangePasswordComponent
    ],
    exports: [
      LayoutComponent,
      SidebarComponent,
      UserblockComponent,
      HeaderComponent,
      NavsearchComponent,
      OffsidebarComponent,
      ErrorComponent,
      ChangePasswordComponent
    ]
})
export class LayoutModule { }
