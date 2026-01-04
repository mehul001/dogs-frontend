import { Routes } from '@angular/router';
import { DogsListComponent } from './shared/ui/dog-card/dog-card.component';

export const routes: Routes = [
  {
    path: '',
    component: DogsListComponent,
    title: 'Dogs List'
  },
  {
    path: 'dogs',
    component: DogsListComponent,
    title: 'Dogs List'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
