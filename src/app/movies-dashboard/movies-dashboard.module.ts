import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { movieFeatureKey, reducer } from './store/reducer/movie.reducer';

import { MoviesDashboardRoutingModule } from './modules/routings/movies-dashboard-routing.module';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

@NgModule({
    declarations: [
        MoviesListComponent,
        MovieFormComponent
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature(movieFeatureKey, reducer),
        MoviesDashboardRoutingModule,
        ReactiveFormsModule,
    ],
    exports: [
        MoviesListComponent,
        MovieFormComponent
    ]
})
export class MoviesDashboardModule {

}