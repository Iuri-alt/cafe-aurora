import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
  { path: '', component: Inicio, title: 'Café Aurora — café especial por assinatura' },
  {
    path: 'privacidade',
    loadComponent: () => import('./pages/privacidade/privacidade').then((m) => m.Privacidade),
    title: 'Política de privacidade — Café Aurora',
  },
  { path: '**', redirectTo: '' },
];
