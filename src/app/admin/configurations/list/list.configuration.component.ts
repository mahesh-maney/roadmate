import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { isUndefined } from 'util';

import { MaxDevice, Configuration } from '../../../core/entities/configuration/configuration.model';
import { ConfigurationServices } from '../../../core/services/configuration.services';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-list-configuration',
  templateUrl: './list.configuration.component.html'
})
export class ListConfigurationComponent implements OnInit {
  loading = false;
  error = false;
  configurations: Configuration[];
  maxDevice: MaxDevice;
  configurationToBeDeleted: Configuration;
  configurationToBeUpdated: Configuration;
  @ViewChild('confirm')
  confirmForm: ModalComponent;
  @ViewChild('updateConfiguration')
  updateConfigurationForm: ModalComponent;
  isSuccess = false;
  isFailure = false;
  updateMode = false;
  createMode = false;
  empty = true;
  @ViewChild('newConfiguration')
  newConfigurationForm: ModalComponent;
  constructor(private configurationService: ConfigurationServices) {
  }
  ngOnInit() {
    this.configurationService.getMaxDevices().subscribe(
      (data) => {
        data.value = Number(data.value);
        this.maxDevice = data;
      },
      (err) => {
        this.isFailure = true;
      }
    );
    this.load();
  }
  submit() {
    const maxDeviceCount = Number(this.maxDevice.value);
    if (maxDeviceCount <= 0 || maxDeviceCount !== Math.floor(maxDeviceCount)) {
      return alert('Maximum Active Devices must be a valid integer');
    }
    this.loading = true;
    this.configurationService.setMaxDevices(this.maxDevice).subscribe(
      (data) => {
        data.value = Number(data.value);
        this.maxDevice = data;
        this.loading = false;
      },
      (err) => {
        this.isFailure = true;
        this.loading = false;
      }
    );
  }
  load() {
    this.loading = true;
    this.configurationService.loadConfigurations().subscribe(
      (data) => {
        this.empty = true;
        this.configurations = data;
        if (this.configurations.length > 0) {
          this.empty = false;
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  update(configuration) {
    this.updateMode = true;
    this.configurationToBeUpdated = configuration;
    this.updateConfigurationForm.open('lg');
  }
  configurationUpdated() {
    this.isSuccess = true;
    this.fadeTheMessage();
    this.updateConfigurationForm.close();
  }
  configurationUpdateClosed() {
    this.updateConfigurationForm.close();
  }
  configurationCreateClosed() {
    this.newConfigurationForm.close();
  }
  delete(configuration) {
    this.resetMessages();
    this.configurationToBeDeleted = configuration;
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
  createConfiguration() {
    this.createMode = true;
    this.newConfigurationForm.open('lg');
  }
  configurationCreated() {
    this.load();
    this.createMode = false;
    this.isSuccess = true;
    this.fadeTheMessage();
    this.newConfigurationForm.close();
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
