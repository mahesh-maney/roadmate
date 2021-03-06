import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        InfiniteScrollModule
    ],
    exports: [
        FormsModule,
        CommonModule,
        NgbModule,
        InfiniteScrollModule
    ]
})
export class AohSharedLibsModule {}
