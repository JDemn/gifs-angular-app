import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports : [
    SidebarComponent
  ]
})
export class SharedModule { }
