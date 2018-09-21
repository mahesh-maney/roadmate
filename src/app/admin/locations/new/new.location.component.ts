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
import { environment } from '../../../../environments/environment.prod';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-new-location',
  templateUrl: '../location.component.html',
  styleUrls: ['../location.component.scss']
})
export class NewLocationComponent {
  @Output() locationCreated: EventEmitter<DutyLocation> = new EventEmitter<DutyLocation>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  createmode = true;
  isLocationNameValid: boolean = true;
  isMobileNumberValid: boolean = true;
  locationNameErrorMsg: string;
  mobileNumberErrorMsg: string;
  loading = false;
  location: DutyLocation = new DutyLocation();
  states: string[] = ['Karnataka', 'Maharashtra'];
  addLocationHeaderLabel = environment.addLocation_groupName;
  updateLocationHeaderLabel = environment.updateLocation_groupName;
  pageMessage = environment.addLocation_pageMessage;
  locationNamePlaceholder = environment.addLocation_placeholder_locationName;
  locationAddressPlaceHolder = environment.addLocation_placeholder_locationAddress;
  mobileNumberPlaceHolderLabel = environment.addLocation_placeholder_mobileNumber;
  addressPlaceHolderLabel = environment.addLocation_placeholder_address;
  cityPlaceHolderLabel = environment.addLocation_placeholder_city;
  statePlaceHolderLabel = environment.addLocation_placeholder_state;
  addbuttonLabel = environment.addLocation_addButton;
  updateButtonlabel = environment.addLocation_updateButton;
  locationNameLabel = environment.addLocation_locationName;
  locationAddressLabel = environment.addLocation_locationAddress;
  mobileNumberLabel = environment.addLocation_mobileNumber;
  addressLabel = environment.addLocation_address;
  cityLabel = environment.addLocation_city;
  stateLabel = environment.addLocation_state;
  constructor(private locationServices: DutyLocationServices) {
  }

  getCities() {
    switch (this.location.state) {
      case 'Karnataka':
        return ['Bangalore'];
      case 'Maharashtra':
        return ['Nagpur'];
      default:
        return [];
    }
  }

  validateLocationName(nameKey) {
      let locationNameRegex = /^[a-zA-Z0-9]*$/;
      let validLocationName = nameKey.match(locationNameRegex);
      if (validLocationName == null) {
        this.isLocationNameValid = false;
        this.locationNameErrorMsg = 'Special characters not allowed.';
      } else {
        this.isLocationNameValid = true;
        this.locationNameErrorMsg = '';
      }
  }

  validateMobileNumber(mobileNumber) {
    let mobileNumberRegex = /^[0-9]*$/;
    let validMobileNumber = mobileNumber.match(mobileNumberRegex);
    if (validMobileNumber == null) {
      this.isMobileNumberValid = false;
      this.mobileNumberErrorMsg = 'Only numerals allowed.';
    } else {
      this.isMobileNumberValid = true;
      this.mobileNumberErrorMsg = '';
    }
  }

  submit() {
    this.loading = true;
    console.log(this.location);
    this.locationServices.create(this.location).subscribe(
      (data) => {
        this.loading = false;
        this.locationCreated.next(data);
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
}
