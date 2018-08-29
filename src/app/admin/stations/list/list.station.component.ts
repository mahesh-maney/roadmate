import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { isUndefined } from 'util';

import { Station } from '../../../core/entities/station/station.model';
import { StationServices } from '../../../core/services/station.services';

/**
 * Created by Jerry Kurian on 30-05-2017.
 */
@Component({
  selector: 'app-list-station',
  templateUrl: './list.station.component.html'
})
export class ListStationComponent implements OnInit {
  loading = false;
  error = false;
  stations: Station[];
  stationToBeDeleted: Station;
  stationToBeUpdated: Station;
  @ViewChild('confirm')
  confirmForm: ModalComponent;
  @ViewChild('updateStation')
  updateStationForm: ModalComponent;
  isSuccess = false;
  isFailure = false;
  updateMode = false;
  createMode = false;
  empty = true;
  searchText = '';
  @ViewChild('newStation')
  newStationForm: ModalComponent;

  constructor(private stationService: StationServices) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.stationService.loadStationsByKey(this.searchText).subscribe(
      (data) => {
        this.empty = true;
        this.stations = data;
        if (this.stations.length > 0) {
          this.empty = false;
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }

  update(station) {
    this.updateMode = true;
    this.stationToBeUpdated = station;
    this.updateStationForm.open('lg');
  }
  stationUpdated() {
    this.isSuccess = true;
    this.fadeTheMessage();
    this.updateStationForm.close();
  }
  stationUpdateClosed() {
    this.updateStationForm.close();
  }
  stationCreateClosed() {
    this.newStationForm.close();
  }
  delete(station) {
    this.resetMessages();
    this.stationToBeDeleted = station;
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
  createStation() {
    this.createMode = true;
    this.newStationForm.open('lg');
  }
  stationCreated() {
    this.load();
    this.createMode = false;
    this.isSuccess = true;
    this.fadeTheMessage();
    this.newStationForm.close();
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
