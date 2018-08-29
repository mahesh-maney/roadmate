import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Report } from '../../../core/entities/report/report.model';
import { Staff, Designation } from '../../../core/entities/staff/staff.model';
import { ReportData } from '../../../core/entities/report/report.data.model';
import { DutyLocation } from '../../../core/entities/location/duty.location';
import { DutyLocationServices } from '../../../core/services/duty.location.services';
import { ReportServices } from '../../../core/services/report.services';
import { StaffServices } from '../../../core/services/staff.services';
import { Observable } from 'rxjs';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as moment from 'moment';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-list-report',
  templateUrl: './list.report.component.html'
})
export class ListReportComponent {

  loading = false;
  isFailure = false;
  empty = false;
  loaded = false;
  @Output() closed: EventEmitter<string> = new EventEmitter();
  @Input() reportData : ReportData;
  @Input() reports: Report[];
  @Input() dutyLocation: DutyLocation;
  @Input() date: Date = moment().hours(0).startOf('hour').toDate();
  staffToBeUpdated: Staff;
  @ViewChild('updateStaff')
  updateStaff: ModalComponent;

  constructor(private reportServices: ReportServices,
    private dutyLocationServices: DutyLocationServices,
    private staffService: StaffServices,
    private _sanitizer: DomSanitizer
  ) {
  }

  loadStaff(staffId){
    this.loading = true;
    this.staffService.loadStaffById(staffId
    ).subscribe(
      (data) => {
        this.staffToBeUpdated = data;
        this.loading = false;
        this.loaded = true;
        this.updateStaff.open('lg');
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  staffUpdated(){
    this.updateStaff.close();
  }
  staffClosed(){
    this.updateStaff.close();
  }
  closeWindow(){
    this.closed.emit('closed');
  }
}
