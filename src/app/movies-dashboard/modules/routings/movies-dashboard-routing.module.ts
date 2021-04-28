import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieFormComponent } from '../../movie-form/movie-form.component';
import { MoviesListComponent } from '../../movies-list/movies-list.component';

const routes: Routes = [
    { path: 'movies', component: MoviesListComponent },
    { path: 'movies/create', component: MovieFormComponent },
    { path: 'movies/:id', component: MovieFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesDashboardRoutingModule { }