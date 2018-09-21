import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { environment } from '../../../../environments/environment.prod';
import { Device } from '../../../core/entities/device/device.model';
import { DeviceServices } from '../../../core/services/device.services';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-list-device',
  templateUrl: './list.device.component.html'
})
export class ListDeviceComponent implements OnInit {
  loading = false;
  error = false;
  devices: Device[];
  deviceToBeDeleted: Device;
  deviceToBeUpdated: Device;
  @ViewChild('confirm')
  confirmForm: ModalComponent;
  @ViewChild('updateDevice')
  updateDeviceForm: ModalComponent;
  isSuccess = false;
  isFailure = false;
  updateMode = false;
  createMode = false;
  empty = true;
  searchText = '';
  @ViewChild('newDevice')
  newDeviceForm: ModalComponent;
  searchLabel = environment.device_listPage_search;
  isActiveLabel = environment.device_listPage_isActive;
  staffNameLabel = environment.device_listPage_staffName;
  imeiLabel = environment.device_listPage_imei;
  addButtonLabel = environment.addDevice_groupName;
  updateButtonLabel = environment.addDevice_updatebutton;
  refreshbuttonLabel = environment.addDevice_refreshbutton;
  addDeviceSuccessMsg = environment.device_listPage_successMsg;
  addDeviceErrorMsg = environment.device_listPage_errorMsg;
  addDeviceUpdated = environment.device_listPage_deviceUpdated;
  addDeviceUpdateFailed = environment.device_listPage_deviceUpdateFailed;
  addDeviceNoDeviceRegMsg = environment.device_listPage_noDeviceRegMsg;
  constructor(private deviceService: DeviceServices) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.deviceService.loadDevicesByKey(this.searchText).subscribe(
      (data) => {
        this.empty = true;
        this.devices = data;
        if (this.devices.length > 0) {
          this.empty = false;
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  update(device) {
    this.updateMode = true;
    this.deviceToBeUpdated = device;
    this.updateDeviceForm.open('lg');
  }
  deviceUpdated() {
    this.isSuccess = true;
    this.fadeTheMessage();
    this.updateDeviceForm.close();
  }
  deviceUpdateClosed() {
    this.updateDeviceForm.close();
  }
  deviceCreateClosed() {
    this.newDeviceForm.close();
  }
  delete(device) {
    this.resetMessages();
    this.deviceToBeDeleted = device;
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
  createDevice() {
    this.createMode = true;
    this.newDeviceForm.open('lg');
  }
  deviceCreated() {
    this.load();
    this.createMode = false;
    this.isSuccess = true;
    this.fadeTheMessage();
    this.newDeviceForm.close();
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
  onUpdateStatus(event, device) {
    device.status = (event.target.checked ? 1 : 0);
    this.loading = true;
    this.deviceService.edit(device).subscribe(
      (data) => { this.loading = false; },
      (err) => {
        this.error = true;
        this.loading = false;
      }
    );
  }
}
