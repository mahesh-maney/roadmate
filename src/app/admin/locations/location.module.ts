/**
 * Created by Jerry Kurian on 28-05-2017.
 */
import {Component, EventEmitter, NgModule, OnInit, Output} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import {DateUtil} from '../../shared/util/date.util';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {AdminSharedModule} from '../admin.shared.module';
import {ListLocationComponent} from './list/list.location.component';
import {DutyLocationServices} from '../../core/services/duty.location.services';
import {NewLocationComponent} from './new/new.location.component';
import {EditLocationComponent} from './edit/edit.location.component';

const routes: Routes = [
  {
    path: '',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    component: ListLocationComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    Ng2Bs3ModalModule,
    AdminSharedModule
  ],
  providers: [
    DateUtil,
    DutyLocationServices
  ],
  declarations: [
    ListLocationComponent,
    NewLocationComponent,
    EditLocationComponent
  ],
  exports: [
    RouterModule
  ]
})
export class LocationModule {
}
