import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { UserDataComponent } from '../components/user-data/user-data.component';

import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { ProviderProfileComponent } from '../components/provider-profile/provider-profile.component';
import { EditAvailabilityComponent } from '../components/edit-availability/edit-availability.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule],
  declarations: [
    ProfilePage,
    UserDataComponent,
    EditProfileComponent,
    ProviderProfileComponent,
    EditAvailabilityComponent,
  ],
  providers: [DatePipe],
})
export class ProfilePageModule {}
