import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {DutyLocation} from '../../core/entities/location/duty.location';
import {Staff} from '../../core/entities/staff/staff.model';
import {DutyLocationServices} from '../../core/services/duty.location.services';
import {DutyAssignmentServices} from '../../core/services/duty.assignment.services';
import {DutyAssignment} from '../../core/entities/assignment/assignment.model';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

/**
 * Created by Jerry Kurian on 21-07-2018.
 */
@Component({
  selector: 'assign-location',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  @Input() selectedStaff: Staff;
  @Output() closed: EventEmitter<string> = new EventEmitter();
  @Output() assignmentCreated: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  createmode = true;
  loading = false;
  locations: DutyLocation[];
  dutyAssignment: DutyAssignment = new DutyAssignment();
  startDate: Date = moment().hours(0).startOf('hour').toDate();
  endDate: Date = moment().hours(23).minutes(59).startOf('hour').toDate();

  constructor(private dutyLocationServices: DutyLocationServices,
      private assignmentServices: DutyAssignmentServices,
      private _sanitizer: DomSanitizer) {
  }
  
  ngOnInit() {
    this.loading = true;
    this.dutyLocationServices.loadDutyLocations().subscribe(
      (data) => {
       this.locations = data;
       this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  submit() {
    this.loading = true;
    console.log(this.dutyAssignment);
    this.dutyAssignment.startTime = moment(this.startDate).format('YYYY-MM-DD HH:mm');
    this.dutyAssignment.endTime = moment(this.endDate).format('YYYY-MM-DD HH:mm');
    this.assignmentServices.create(this.dutyAssignment).subscribe(
      (data) => {
        this.loading = false;
        this.assignmentCreated.next();
      },
      (err) => {
        this.errorMessage = err;
        this.error = true;
        this.loading = false;
      }
    );
  }

  closeWindow() {
    this.closed.emit('closed');
  }
  loadDutyLocations = (key: string): Observable<any[]> => {
    return this.dutyLocationServices.loadDutyLocationsByKey(key);
  }
  dutyLocationValueFormatter(data: DutyLocation) {
    return data.name + ', ' + data.city + ', ' + data.state;
  }
  dutyLocationListFormatter = (data: DutyLocation) => {
    const html = `<li class="list-group-item location">${data.name} | ${data.city} | ${data.state}</li>`;

    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  dutyLocationValueChanged(val) {
    this.dutyAssignment.location = val;
    console.log(val);
  }  
}
