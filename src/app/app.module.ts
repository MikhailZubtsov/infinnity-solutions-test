import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileTreeComponent } from './file-tree/file-tree.component';
import { FileTreeService } from './file-tree/file-tree.service';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    FileTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [FileTreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
