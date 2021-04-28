import { Action, createReducer, on } from '@ngrx/store';
import * as MovieActions from '../action/movie.actions';
import { MovieViewModel } from '../../models/view-models/movie-view-model';
import { MovieCreateBindingModel } from '../../models/binding-models/movie-create-binding-model';
import { MovieUpdateBindingModel } from '../../models/binding-models/movie-update-binding-model';


export const movieFeatureKey = 'movie';

export interface MoviesState {
  movies: MovieViewModel[];
}

export const initialState: MoviesState = {
  movies: [
    {
      "id": 1,
      "title": "Following",
      "director": "Christopher Nolan",
      "distributor": "Zeitgeist",
      "imdb_rating": 7.7,
      "imdb_votes": 15133
    },
    {
      "id": 2,
      "title": "12 Angry Men",
      "director": "Sidney Lumet",
      "distributor": "United Artists",
      "imdb_rating": 8.9,
      "imdb_votes": 119101
    },
    {
      "id": 3,
      "title": "Twelve Monkeys",
      "director": "Terry Gilliam",
      "distributor": "Universal",
      "imdb_rating": 8.1,
      "imdb_votes": 169858
    },
  ]
};

export const movieReducer = createReducer(
  initialState,
  on(MovieActions.addMovie,
    (state: MoviesState, {movie}) => 
      ({...state,
        movies: [...state.movies, bindingToViewModelParser(movie, state.movies.length + 1)]
      })),
  on(MovieActions.updateMovie,
    (state: MoviesState, {movie, movieId}) => {
      let movies = [...state.movies];

      let movieIndex = movies.findIndex(movie => movie.id === movieId);

      if(movieIndex > -1) {
        movies[movieIndex] = bindingToViewModelParser(movie, movieId);
      }

      return {...state,
        movies: movies
      }
    }),
  on(MovieActions.removeMovie,
    (state: MoviesState, {movieId})=> 
    ({...state,
      movies: [...state.movies.filter(m => m.id !== movieId)]
    })),
);

function bindingToViewModelParser(movie: MovieCreateBindingModel | MovieUpdateBindingModel, movieId: number): MovieViewModel {
  let movieViewModel = new MovieViewModel();

  movieViewModel.id = movieId;
  movieViewModel.title = movie.title;
  movieViewModel.director = movie.director;
  movieViewModel.distributor = movie.distributor;
  movieViewModel.imdb_rating = movie.imdb_rating;
  movieViewModel.imdb_votes = movie.imdb_votes;

  return movieViewModel;
}

export function reducer(state: MoviesState | undefined, action: Action): any {
  return movieReducer(state, action);
}