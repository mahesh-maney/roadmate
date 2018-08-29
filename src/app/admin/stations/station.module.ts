/**
 * Created by Jerry Kurian on 28-05-2017.
 */
import {Component, EventEmitter, NgModule, OnInit, Output} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import {DateUtil} from '../../shared/util/date.util';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {AdminSharedModule} from '../admin.shared.module';
import {ListStationComponent} from './list/list.station.component';
import {StationServices} from '../../core/services/station.services';
import { NewStationComponent } from './new/new.station.component';
import { EditStationComponent } from './edit/edit.station.component';

const routes: Routes = [
  {
    path: '',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    component: ListStationComponent
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
    StationServices
  ],
  declarations: [
    ListStationComponent,
    NewStationComponent,
    EditStationComponent
  ],
  exports: [
    RouterModule,
    NewStationComponent,
    EditStationComponent
  ]
})
export class StationModule {
}
