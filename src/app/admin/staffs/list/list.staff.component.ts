import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Staff, Designation } from '../../../core/entities/staff/staff.model';
import { StaffServices } from '../../../core/services/staff.services';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { isUndefined } from 'util';
import { DutyLocation } from '../../../core/entities/location/duty.location';
import { DutyLocationServices } from '../../../core/services/duty.location.services';
import { StationServices } from '../../../core/services/station.services';
import { Observable } from 'rxjs';
import { Station } from '../../../core/entities/station/station.model';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-list-staff',
  templateUrl: './list.staff.component.html'
})
export class ListStaffComponent implements OnInit {
  loading = false;
  error = false;
  staffs: Staff[];
  designations: Designation[];
  staffToBeDeleted: Staff;
  staffToBeUpdated: Staff = new Staff();
  @ViewChild('confirm')
  confirmForm: ModalComponent;
  @ViewChild('updateStaff')
  updateStaffForm: ModalComponent;
  @ViewChild('updateLocationForm')
  updateLocationForm: ModalComponent;
  isSuccess = false;
  isFailure = false;
  updateMode = false;
  createMode = false;
  totalItems = 0;
  pageSize = 10;
  empty = true;
  currentPage = 1;
  searchText = '';
  @ViewChild('newStaff')
  newStaffForm: ModalComponent;
  station: Station;
  dutyLocation: DutyLocation;
  constructor(private staffService: StaffServices,
    private stationServices: StationServices,
    private dutyLocationServices: DutyLocationServices,
    private _sanitizer: DomSanitizer
  ) {
  }
  ngOnInit() {
    this.load(this.currentPage);
  }
  load(page: number) {
    this.currentPage = page;
    this.loading = true;
    this.staffService.loadAllStaffsPaged(this.searchText, this.station, this.dutyLocation,
      page, this.pageSize).subscribe(
        (data) => {
          this.empty = true;
          this.totalItems = data.totalElements;
          this.staffs = data.content.map(s => {
            if (isUndefined(s.designation) || s.designation === null) {
              s.designation = new Designation();
            }
            return s;
          });
          if (this.staffs.length > 0) {
            this.empty = false;
          }
          this.loading = false;
        },
        (err) => {
          this.loading = false;
        }
      );
  }

  update(staff) {
    this.updateMode = true;
    if (staff.designation === null) {
      staff.designation = new Designation();
    }
    if (staff.dutyLocation === null) {
      staff.dutyLocation = new DutyLocation();
    }

    this.staffToBeUpdated = staff;
    this.updateStaffForm.open('lg');
  }
  staffUpdated() {
    this.isSuccess = true;
    this.fadeTheMessage();
    this.updateStaffForm.close();
  }
  staffUpdateClosed() {
    this.updateStaffForm.close();
  }
  staffCreateClosed() {
    this.newStaffForm.close();
  }
  updateLocation(staff){
    this.updateMode = true;    
    this.staffToBeUpdated = staff;
    this.updateLocationForm.open('lg');
  }
  assignmentCreated(){
    this.isSuccess = true;
    this.fadeTheMessage();
    this.updateLocationForm.close();
  }
  assignmentClosed(){this.updateLocationForm.close();}  
  delete(staff) {
    this.resetMessages();
    this.staffToBeDeleted = staff;
    this.confirmForm.open();
  }
  proceedDelete() {
    this.staffService.delete(this.staffToBeDeleted).subscribe(
      () => {
        this.load(this.currentPage);
        this.confirmForm.close();
        this.isSuccess = true;
        this.fadeTheMessage();
      },
      (err) => {
        this.confirmForm.close();
        this.isFailure = true;
        this.fadeTheMessage();
      }
    );
  }
  search() {
    this.totalItems = 0;
    this.load(1);
  }
  cancelDelete() {
    this.confirmForm.close();
  }
  createStaff() {
    this.createMode = true;
    this.newStaffForm.open('lg');
  }
  staffCreated() {
    this.load(this.currentPage);
    this.createMode = false;
    this.isSuccess = true;
    this.fadeTheMessage();
    this.newStaffForm.close();
  }
  resetMessages() {
    this.isSuccess = false;
    this.isFailure = false;
  }
  fadeTheMessage() {
    setTimeout(function () {
      this.resetMessages();
    }.bind(this), 10000);
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
    this.station = val;
    this.search();
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
    this.dutyLocation = val;
    this.search();
  }
}
