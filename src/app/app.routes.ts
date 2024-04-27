import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.page').then( m => m.SearchPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.page').then( m => m.NotificationsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-animal',
    loadComponent: () => import('./add-animal/add-animal.page').then( m => m.AddAnimalPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
  },
  {
    path: 'registered-animals',
    loadComponent: () => import('./registered-animals/registered-animals.page').then( m => m.RegisterAnimalsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'profile-data',
    loadComponent: () => import('./profile-data/profile-data.page').then( m => m.ProfileDataPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'adopted-animals',
    loadComponent: () => import('./adopted-animals/adopted-animals.page').then( m => m.AdoptedAnimalsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    loadComponent: () => import('./report/report.page').then( m => m.ReportPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'registered-animals-details/:id',
    loadComponent: () => import('./registered-animal-details/registered-animal-details.page').then( m => m.RegisteredAnimalsDetailsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./recover-password/recover-password.page').then( m => m.RecoverPasswordPage)
  },
  {
    path: 'link-sended',
    loadComponent: () => import('./link-sended/link-sended.page').then( m => m.LinkSendedPage)
  },
];
