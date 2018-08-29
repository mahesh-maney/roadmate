/**
 * Created by Jerry Kurian on 28-05-2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AdminSharedModule } from '../admin.shared.module';

import { ListDeviceComponent } from './list/list.device.component';
import { NewDeviceComponent } from './new/new.device.component';
import { EditDeviceComponent } from './edit/edit.device.component';

import { DeviceServices } from '../../core/services/device.services';

const routes: Routes = [
  {
    path: '',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    component: ListDeviceComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    Ng2Bs3ModalModule,
    AdminSharedModule
  ],
  declarations: [
    ListDeviceComponent,
    NewDeviceComponent,
    EditDeviceComponent
  ],
  providers: [
    DeviceServices
  ],
  exports: [
    RouterModule
  ]
})
export class DeviceModule {
}
