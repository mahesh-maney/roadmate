import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Device } from '../../../core/entities/device/device.model';
import { DeviceServices } from '../../../core/services/device.services';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-edit-device',
  templateUrl: '../device.component.html',
  styleUrls: ['../device.component.scss']
})
export class EditDeviceComponent {
  @Input() device: Device;
  @Output() deviceUpdated: EventEmitter<Device> = new EventEmitter<Device>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  updatemode = true;
  loading = false;
  constructor(private deviceService: DeviceServices) {
  }
  submit() {
    console.log(this.device);
    this.loading = true;
    this.deviceService.edit(this.device).subscribe(
      (data) => { this.loading = false; this.deviceUpdated.emit(data); },
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
