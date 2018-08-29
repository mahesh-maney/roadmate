const staffs = {
  text: 'Staffs',
  link: '/users',
  icon: 'icon-notebook',
  role: ['ROLE_ADMIN', 'ROLE_USER']
};

const stations = {
  text: 'Police Stations',
  link: '/stations',
  icon: 'icon-people',
  role: 'ROLE_ADMIN'
};

const locations = {
  text: 'Duty Locations',
  link: '/duty-locations',
  icon: 'icon-doc',
  role: 'ROLE_ADMIN'
};

const devices = {
  text: 'Devices',
  link: '/devices',
  icon: 'icon-phone',
  role: 'ROLE_ADMIN'
};

const reports = {
  text: 'Reports',
  link: '/reports',
  icon: 'icon-calendar',
  role: ['ROLE_ADMIN', 'ROLE_USER']
};

const configurations = {
  text: 'Configurations',
  link: '/configurations',
  icon: 'icon-settings',
  role: 'ROLE_ADMIN'
};

export const menu = [
  staffs,
  stations,
  locations,
  devices,
  reports,
  configurations
];

