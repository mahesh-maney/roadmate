import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Staff, Designation } from '../../../core/entities/staff/staff.model';
import { Station } from '../../../core/entities/station/station.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StaffServices } from '../../../core/services/staff.services';
import { DesignationServices } from '../../../core/services/designation.services';
import { StationServices } from '../../../core/services/station.services';
import { DutyLocationServices } from '../../../core/services/duty.location.services';

import { isUndefined } from 'util';
import { DutyLocation } from '../../../core/entities/location/duty.location';
/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-edit-staff',
  templateUrl: '../staff.component.html',
  styleUrls: ['../staff.component.scss']
})
export class EditStaffComponent
  implements OnInit, OnChanges {
  @Input() staff: Staff;
  @Output() staffUpdated: EventEmitter<Staff> = new EventEmitter<Staff>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  updatemode = true;
  loading = false;
  designations: Designation[] = [];

  constructor(private staffService: StaffServices,
    private stationServices: StationServices,
    private designationServices: DesignationServices,
    private dutyLocationServices: DutyLocationServices,
    private _sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.error = false;
    this.designationServices.loadDesignations().subscribe(d => {
      this.designations = d;
      this.loading = false;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.staff != undefined && changes['staff']) {
      if (isUndefined(this.staff.dutyLocation) || this.staff.dutyLocation === null) {
        this.staff.dutyLocation = new DutyLocation();
      }
      this.staff.dutyLocation.toString = () => this.dutyLocationValueFormatter(this.staff.dutyLocation);

      if (isUndefined(this.staff.station) ||
        this.staff.station === null) {
        this.staff.station = new Station();
      }
      this.staff.station.toString = () => this.stationValueFormatter(this.staff.station);
    }
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
    this.staffService.edit(this.staff).subscribe(
      (data) => { this.loading = false; this.staffUpdated.emit(data); },
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
  deisgnationValueChanged(val) {
    this.staff.designation = val;
    console.log(val);
  }

  closeWindow() {
    this.error = false;
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
