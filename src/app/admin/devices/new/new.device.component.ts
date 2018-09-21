import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Device } from '../../../core/entities/device/device.model';
import { DeviceServices } from '../../../core/services/device.services';
import { environment } from '../../../../environments/environment.prod';
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
  selector: 'app-new-device',
  templateUrl: '../device.component.html',
  styleUrls: ['../device.component.scss']
})
export class NewDeviceComponent {
  @Output() deviceCreated: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  createmode = true;
  loading = false;
  imeiErrorMsg: string;
  staffNameErrorMsg: string;
  isIMEINameValid: boolean = true;
  isStaffNameValid: boolean = true;
  device: Device = new Device();
  addDeviceheaderLabel = environment.addDevice_groupName;
  updateDeviceheaderLabel = environment.updateDevice_groupName;
  pageMessage = environment.addDevice_pageMessage;

  constructor(private deviceService: DeviceServices) {
  }

  validateIMEI(imei) {
    let imeiNumberRegex = /^[0-9]*$/;
    let validIMEINumber = imei.match(imeiNumberRegex);
    if (validIMEINumber == null) {
      this.isIMEINameValid = false;
      this.imeiErrorMsg = 'Only numerals allowed.';
    } else {
      this.isIMEINameValid = true;
      this.imeiErrorMsg = '';
    }
  }

  search() {
    console.log("search implementation to be implemented");
  }

  validateStaffName(staffName) {
    let staffNameRegex = /^[a-zA-Z ]*$/;
    let validStaffName = staffName.match(staffNameRegex);
    if (validStaffName == null) {
      this.isStaffNameValid = false;
      this.staffNameErrorMsg = 'Only Aplhabets allowed.';
    } else {
      this.isStaffNameValid = true;
      this.staffNameErrorMsg = '';
    }
  }

  submit() {
    console.log(this.device);
    this.loading = true;
    this.deviceService.create(this.device).subscribe(
      (data) => {
        this.loading = false;
        this.deviceCreated.next(data);
      },
      (err) => {
        this.errorMessage = err;
        this.error = true;
        this.loading = false;
      }
    );
  }
  closeWindow() {
    this.error = false;
    this.closed.emit('closed');
  }
}
