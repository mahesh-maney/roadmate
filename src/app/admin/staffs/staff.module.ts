/**
 * Created by Jerry Kurian on 28-05-2017.
 */
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffServices } from '../../core/services/staff.services';
import { DutyLocationServices } from '../../core/services/duty.location.services';
import { StationServices } from '../../core/services/station.services';
import { DesignationServices } from '../../core/services/designation.services';
import { SharedModule } from '../../shared/shared.module';
import { DateUtil } from '../../shared/util/date.util';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AdminSharedModule } from '../admin.shared.module';
import { ListStaffComponent } from './list/list.staff.component';
import { FilterStaffPipe } from './list/filter.staff';
import { NewStaffComponent } from './new/new.staff.component';
import { EditStaffComponent } from './edit/edit.staff.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import {DutyAssignmentServices} from '../../core/services/duty.assignment.services';
import {AssignmentComponent} from '../assignment/assignment.component';

const routes: Routes = [
  {
    path: '',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    component: ListStaffComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    Ng2Bs3ModalModule,
    AdminSharedModule,
    NguiAutoCompleteModule
  ],
  providers: [
    StaffServices,
    DutyLocationServices,
    StationServices,
    DesignationServices,
    DutyAssignmentServices,
    DateUtil
  ],
  declarations: [
    ListStaffComponent,
    NewStaffComponent,
    FilterStaffPipe,
    AssignmentComponent
  ],
  exports: [
    RouterModule,
    NewStaffComponent
  ]
})

export class StaffModule {
}


