import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import {AdminHomeComponent} from './home/admin.home.component';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {Ng2BootstrapModule} from 'ngx-bootstrap';
import {NguiDatetimePickerModule} from '@ngui/datetime-picker';
import {FormsModule} from '@angular/forms';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {AdminSharedModule} from '../admin.shared.module';
import {DesignationServices} from '../../core/services/designation.services';
import {StaffServices} from '../../core/services/staff.services';
import {StationServices} from '../../core/services/station.services';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';


@NgModule({
    imports: [
      SharedModule,
      FormsModule,
      Ng2Bs3ModalModule,
      NguiAutoCompleteModule,
      Ng2BootstrapModule,
      NguiDatetimePickerModule,
      AdminSharedModule,
      BootstrapSwitchModule
    ],
    providers: [
      StaffServices,
      DesignationServices,
      StationServices
    ],
    declarations: [
      AdminHomeComponent,
    ],
    exports: [
      RouterModule
    ]
})
export class AdminDashboardModule { }
