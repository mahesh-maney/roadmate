/**
 * Created by Jerry Kurian on 28-05-2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DateUtil } from '../../shared/util/date.util';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AdminSharedModule } from '../admin.shared.module';
import { ListConfigurationComponent } from './list/list.configuration.component';
import { ConfigurationServices } from '../../core/services/configuration.services';
import { NewConfigurationComponent } from './new/new.configuration.component';
import { EditConfigurationComponent } from './edit/edit.configuration.component';

const routes: Routes = [
  {
    path: '',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    component: ListConfigurationComponent
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
    ConfigurationServices
  ],
  declarations: [
    ListConfigurationComponent,
    NewConfigurationComponent,
    EditConfigurationComponent
  ],
  exports: [
    RouterModule,
    NewConfigurationComponent,
    EditConfigurationComponent
  ]
})
export class ConfigurationModule {
}
