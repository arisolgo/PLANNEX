import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./public/tabs/home/containers/home.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./public/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'providers',
    loadChildren: () =>
      import('./public/providers/containers/providers.module').then(
        (m) => m.ProvidersPageModule
      ),
  },
  {
    path: 'listing',
    loadChildren: () =>
      import('./public/listing/containers/listing.module').then(
        (m) => m.ListingPageModule
      ),
  },
  {
    path: 'business-detail',
    loadChildren: () =>
      import('./public/business-detail/containers/business-detail.module').then(
        (m) => m.BusinessDetailPageModule
      ),
  },
  {
    path: 'scheduler',
    loadChildren: () =>
      import('./core/shared/pages/scheduler/containers/scheduler.module').then(
        (m) => m.SchedulerPageModule
      ),
  },
  {
    path: 'appointment-confirmation',
    loadChildren: () =>
      import(
        './public/appointment-confirmation/containers/appointment-confirmation.module'
      ).then((m) => m.AppointmentConfirmationPageModule),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./public/calendar/calendar.module').then(
        (m) => m.CalendarPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./public/login/containers/login.module').then(
        (m) => m.LoginPageModule
      ),
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./public/register/containers/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
