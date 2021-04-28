import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieViewModel } from '../models/view-models/movie-view-model';
import { removeMovie } from '../store/action/movie.actions';
import { MoviesState } from '../store/reducer/movie.reducer';
import { selectMovies } from '../store/selector/movie.selectors';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies$: Observable<MovieViewModel[]>;

  constructor(private store: Store<MoviesState>) { 
    this.movies$ = this.store.pipe(select(selectMovies))
  }

  ngOnInit(): void {
  }

  onDeleteButtonClicked(movieId: number): void {
    this.store.dispatch(removeMovie(movieId));
  }

}