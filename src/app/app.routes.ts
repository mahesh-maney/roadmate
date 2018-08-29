import { errorRoute } from './layout/error/error.route';
import { LayoutComponent } from './layout/layout.component';
import { Routes } from '@angular/router';

/* export const approutes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: errorRoute
}]; */

export const approutes: Routes = errorRoute;
