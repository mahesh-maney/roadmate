import {DutyLocation} from '../location/duty.location';
import {Station} from '../station/station.model';

export class Staff {
  buckleId: string;
  designation: Designation;
  dutyLocation: DutyLocation;
  firstName: string;
  id: number;
  lastName: string;
  lastScanTime: string;
  mobileNumber: string;
  scanStatus: number;
  station: Station;
}
export class Designation {
  description: string;
  id: number;
}