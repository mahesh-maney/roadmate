import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EditStaffComponent } from './staffs/edit/edit.staff.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

@NgModule({
    imports: [
      SharedModule,
	    Ng2Bs3ModalModule,
	    NguiAutoCompleteModule,
	    NguiDatetimePickerModule,
   ],
    providers: [
    ],
    declarations: [
    	EditStaffComponent
    ],
    exports: [
      Ng2Bs3ModalModule,
    	NguiAutoCompleteModule,
    	NguiDatetimePickerModule,
    	EditStaffComponent
    ]
})
export class AdminSharedModule {
}
