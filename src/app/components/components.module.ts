import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { EmptyNodeDirective } from './tree/tree-node/empty-node.directive';
import { TreeComponent } from './tree/tree.component';
import { TreeNodeComponent } from './tree/tree-node/tree-node.component';
import { TreeService } from './tree/tree.service';

@NgModule({
  declarations: [
    TreeComponent,
    TreeNodeComponent,
    EmptyNodeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [TreeComponent],
  providers: [TreeService]
})
export class ComponentsModule { }