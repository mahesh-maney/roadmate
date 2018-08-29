import { LayoutComponent } from '../layout/layout.component';
import { UserRouteAccessService } from '../shared/auth/user-route-access-service';
import { Routes } from '@angular/router';

export const adminuserroutes = [
  {
    path: '', component: LayoutComponent,
    loadChildren: './staffs/staff.module#StaffModule'
  },
];

export const stationroutes = [
  {
    path: '', component: LayoutComponent,
    loadChildren: './stations/station.module#StationModule'
  },
];

export const locationroutes = [
  {
    path: '', component: LayoutComponent,
    loadChildren: './locations/location.module#LocationModule'
  },
];

export const deviceroutes = [
  {
    path: '', component: LayoutComponent,
    loadChildren: './devices/device.module#DeviceModule'
  },
];

export const reportroutes = [
  {
    path: '', component: LayoutComponent,
    loadChildren: './reports/report.module#ReportModule'
  },
];

export const configurationroutes = [
  {
    path: '', component: LayoutComponent,
    loadChildren: './configurations/configuration.module#ConfigurationModule'
  },
];

export const adminroutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    data: {
      authorities: ['ROLE_ADMIN', 'ROLE_USER']
    },
    canActivate: [UserRouteAccessService],
    children: adminuserroutes
  },
  {
    path: 'stations',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [UserRouteAccessService],
    children: stationroutes
  },
  {
    path: 'duty-locations',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [UserRouteAccessService],
    children: locationroutes
  },
  {
    path: 'devices',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [UserRouteAccessService],
    children: deviceroutes
  },
  {
    path: 'reports',
    data: {
      authorities: ['ROLE_ADMIN', 'ROLE_USER']
    },
    canActivate: [UserRouteAccessService],
    children: reportroutes
  },
  {
    path: 'configurations',
    data: {
      authorities: ['ROLE_ADMIN']
    },
    canActivate: [UserRouteAccessService],
    children: configurationroutes
  }
];
