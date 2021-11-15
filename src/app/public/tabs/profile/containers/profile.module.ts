import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { UserDataComponent } from '../components/user-data/user-data.component';

import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { ProviderProfileComponent } from '../components/provider-profile/provider-profile.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule],
  declarations: [
    ProfilePage,
    UserDataComponent,
    EditProfileComponent,
    ProviderProfileComponent,
  ],
})
export class ProfilePageModule {}
