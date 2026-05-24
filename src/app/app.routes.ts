import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'add-vehiculo',
    loadComponent: () => import('./pages/add-vehiculo/add-vehiculo.page').then( m => m.AddVehiculoPage)
  },
  {
    path: 'add-revision',
    loadComponent: () => import('./pages/add-revision/add-revision.page').then( m => m.AddRevisionPage)
  },
  {
    path: 'add-alert',
    loadComponent: () => import('./pages/add-alert/add-alert.page').then( m => m.AddAlertPage)
  },
];
