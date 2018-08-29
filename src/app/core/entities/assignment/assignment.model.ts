import {Staff} from '../staff/staff.model';
import {DutyLocation} from '../location/duty.location';

export class DutyAssignment {
  user: Staff;
  location: DutyLocation;
  startTime: string;
  endTime: string;
}