/**
 * Created by Jerry Kurian on 28-05-2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AdminSharedModule } from '../admin.shared.module';
import { ListReportComponent } from './list/list.report.component';
import { ReportSummaryComponent } from './list/report.summary.component';
import { ReportServices } from '../../core/services/report.services';
import { DutyLocationServices } from '../../core/services/duty.location.services';
import { StaffServices } from '../../core/services/staff.services';
import { StationServices } from '../../core/services/station.services';
import { DesignationServices } from '../../core/services/designation.services';

const routes: Routes = [
  {
    path: '',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    component: ReportSummaryComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    AdminSharedModule
  ],
  declarations: [
    ListReportComponent,
    ReportSummaryComponent,
  ],
  providers: [
    ReportServices,
    DutyLocationServices,
    StaffServices,
    StationServices,
    DesignationServices
  ],
  exports: [
    RouterModule
  ]
})
export class ReportModule {
}
