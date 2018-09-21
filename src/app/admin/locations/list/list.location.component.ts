import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DutyLocation } from '../../../core/entities/location/duty.location';
import { DutyLocationServices } from '../../../core/services/duty.location.services';
import { environment } from '../../../../environments/environment.prod';
/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-list-location',
  templateUrl: './list.location.component.html'
})
export class ListLocationComponent implements OnInit {
  loading = false;
  error = false;
  locations: DutyLocation[];
  locationToBeDeleted: DutyLocation;
  locationToBeUpdated: DutyLocation;
  @ViewChild('confirm')
  confirmForm: ModalComponent;
  @ViewChild('updateLocation')
  updateLocationForm: ModalComponent;
  isSuccess = false;
  isFailure = false;
  updateMode = false;
  createMode = false;
  empty = true;
  searchText = '';
  @ViewChild('newLocation')
  newLocationForm: ModalComponent;
  searchPlaceholderLabel = environment.location_listPage_search;
  locationLabel = environment.location_listPage_location;
  addressLabel = environment.location_listPage_address;
  cityLabel = environment.location_listPage_city;
  addLocationNameLabel = environment.addLocation_placeholder_locationName;
  addLocationAddressLabel = environment.addLocation_placeholder_locationAddress;
  addLocationMobileNuberLabel = environment.addLocation_placeholder_mobileNumber;
  addAddressLabel = environment.addLocation_placeholder_address;
  addCityLabel = environment.addLocation_placeholder_city;
  addStateLabel = environment.addLocation_placeholder_state;
  refreshButtonLabel = environment.location_listPage_refreshbutton;
  noLocRegMsg = environment.location_listPage_noLocationRegMsg;
  updateButtonLabel = environment.location_listPage_updateButton;
  addDutyLocationButtonLabel = environment.location_listPage_addDutyLocation_button;
  addDutyLocationSuccessMsg = environment.location_listPage_addDutyLocation_successMsg;
  addDutyLocationErrorMsg = environment.location_listPage_addDutyLocation_errorMsg;
  addDutyLocationUpdated = environment.location_listPage_addDutyLocation_LocationUpdated;
  addDutyLocationUpdateFailed = environment.location_listPage_addDutyLocation_LocationUpdateFailed;
  constructor(private locationService: DutyLocationServices) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.locationService.loadDutyLocationsByKey(this.searchText).subscribe(
      (data) => {
        this.empty = true;
        this.locations = data;
        if (this.locations.length > 0) {
          this.empty = false;
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  update(location) {
    this.updateMode = true;
    this.locationToBeUpdated = location;
    this.updateLocationForm.open('lg');
  }
  locationUpdated() {
    this.isSuccess = true;
    this.fadeTheMessage();
    this.updateLocationForm.close();
  }
  locationUpdateClosed() {
    this.updateLocationForm.close();
  }
  locationCreateClosed() {
    this.newLocationForm.close();
  }
  delete(location) {
    this.resetMessages();
    this.locationToBeDeleted = location;
    this.confirmForm.open();
  }
  proceedDelete() {

  }
  search() {
    this.load();
  }
  cancelDelete() {
    this.confirmForm.close();
  }
  createLocation() {
    this.createMode = true;
    this.newLocationForm.open('lg');
  }
  locationCreated() {
    this.load();
    this.createMode = false;
    this.isSuccess = true;
    this.fadeTheMessage();
    this.newLocationForm.close();
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
}
