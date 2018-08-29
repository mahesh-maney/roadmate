import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from '../core/pages/pages.module';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { menu } from './admin.menu';
import { adminroutes } from './admin.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(adminroutes),
    PagesModule,
    NguiDatetimePickerModule
  ],
  providers: [
    MenuService
  ],
  declarations: [
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutesModule {
  constructor(public menuService: MenuService, tr: TranslatorService) {
    menuService.addMenu(menu);
  }
}
