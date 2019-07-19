import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatButtonToggleModule,MatFormFieldModule,MatInputModule, MatListModule, MatSnackBarModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

import { ProfileService } from './services/profileSvc.service';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    ProfileListComponent,
    ProfileFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule, MatButtonToggleModule, MatFormFieldModule,MatInputModule, MatListModule,MatSnackBarModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
