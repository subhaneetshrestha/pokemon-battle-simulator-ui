import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'battle',
    pathMatch: 'full',
  },
  {
    path: 'team-builder',
    loadComponent: () =>
      import('@features/team-builder/team-builder.component').then((c) => c.TeamBuilderComponent),
  },
  {
    path: 'battle',
    loadComponent: () => import('@features/battle/battle.component').then((c) => c.BattleComponent),
  },
];
