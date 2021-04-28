import { createAction } from '@ngrx/store';
import { MovieCreateBindingModel } from '../../models/binding-models/movie-create-binding-model';
import { MovieUpdateBindingModel } from '../../models/binding-models/movie-update-binding-model';

export const addMovie = createAction(
  '[Movie] Add Movie',
  (movie: MovieCreateBindingModel) => ({movie})
);

export const updateMovie = createAction(
  '[Movie] Update Movie',
  (movie: MovieUpdateBindingModel, movieId: number) => ({movie, movieId})
);

export const removeMovie = createAction(
  '[Movie] Remove Movie',
  (movieId: number) => ({movieId})
);