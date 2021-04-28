import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovie from '../reducer/movie.reducer';

export const selectMoviesState = createFeatureSelector<fromMovie.MoviesState>(
    fromMovie.movieFeatureKey,
);

export const selectMovies = createSelector(
    selectMoviesState,
    (state: fromMovie.MoviesState) => state.movies
);

export const selectMovieById = createSelector(
    selectMoviesState,
    (state: fromMovie.MoviesState, movieId: number) => state.movies.find(m => m.id === movieId)
);