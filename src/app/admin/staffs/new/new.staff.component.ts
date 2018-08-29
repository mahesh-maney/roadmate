import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { Staff, Designation } from '../../../core/entities/staff/staff.model';
import { Station } from '../../../core/entities/station/station.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StaffServices } from '../../../core/services/staff.services';
import { DesignationServices } from '../../../core/services/designation.services';
import { StationServices } from '../../../core/services/station.services';
import { DutyLocationServices } from '../../../core/services/duty.location.services';
import { DutyLocation } from '../../../core/entities/location/duty.location';
/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-new-staff',
  templateUrl: '../staff.component.html',
  styleUrls: ['../staff.component.scss']
})
export class NewStaffComponent implements OnInit {
  @Output() staffCreated: EventEmitter<Staff> = new EventEmitter<Staff>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  createmode = true;
  loading = true;
  staff: Staff = new Staff();
  designations: Designation[] = [];
  constructor(private staffService: StaffServices,
    private stationServices: StationServices,
    private designationServices: DesignationServices,
    private dutyLocationServices: DutyLocationServices,
    private _sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.designationServices.loadDesignations().subscribe(d => {
      this.designations = d;
      this.loading = false;
    });
  }
  submit() {
    console.log(this.staff);
    if (/\d/.test(this.staff.firstName) || /\d/.test(this.staff.lastName)) {
      return alert('First or Last Name can not contain numbers');
    }
    if (this.staff.mobileNumber && this.staff.mobileNumber.toString().length < 10) {
      return alert('Please enter a valid Mobile Number');
    }
    this.loading = true;
    this.staffService.create(this.staff).subscribe(
      (data) => {
        this.loading = false;
        this.staffCreated.next(data);
      },
      (err) => {
        this.errorMessage = err;
        this.error = true;
        this.loading = false;
      }
    );
  }
  compareDesignation(v1: Designation, v2: Designation) {
    return v1 && v2 && v1.id === v2.id;
  }
  designationValueChanged(val) {
    this.staff.designation = val;
    console.log(val);
  }
  closeWindow() {
    this.closed.emit('closed');
  }

  loadStations = (key: string): Observable<any[]> => {
    return this.stationServices.loadStationsByKey(key);
  }
  stationValueFormatter(data: Station) {
    return data.name + ', ' + data.city + ', ' + data.state;
  }
  stationListFormatter = (data: Station) => {
    const html = `<li class="list-group-item location">${data.name} | ${data.city} | ${data.state}</li>`;

    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  stationValueChanged(val) {
    this.staff.station = val;
    console.log(val);
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
    this.staff.dutyLocation = val;
    console.log(val);
  }
}
