import { Component, EventEmitter, Output } from '@angular/core';
import { Station } from '../../../core/entities/station/station.model';
import { StationServices } from '../../../core/services/station.services';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-new-station',
  templateUrl: '../station.component.html',
  styleUrls: ['../station.component.scss']
})
export class NewStationComponent {
  @Output() stationCreated: EventEmitter<Station> = new EventEmitter<Station>();
  @Output() closed: EventEmitter<string> = new EventEmitter();
  errorMessage = '';
  error = false;
  createmode = true;
  loading = false;
  station: Station = new Station();
  states: string[] = ['Karnataka', 'Maharashtra'];

  constructor(private stationServices: StationServices) {
  }

  getCities() {
    switch (this.station.state) {
      case 'Karnataka':
        return ['Bangalore'];
      case 'Maharashtra':
        return ['Nagpur'];
      default:
        return [];
    }
  }

  submit() {
    console.log(this.station);
    if (this.station.pincode !== Math.floor(this.station.pincode)) {
      return alert('Please enter a valid Pincode');
    }
    this.loading = true;
    this.stationServices.create(this.station).subscribe(
      (data) => {
        this.loading = false;
        this.stationCreated.next(data);
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
