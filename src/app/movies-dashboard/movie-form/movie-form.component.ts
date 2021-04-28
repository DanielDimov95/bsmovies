import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';

import { addMovie, updateMovie } from '../store/action/movie.actions';
import { MoviesState } from '../store/reducer/movie.reducer';
import { selectMovieById } from '../store/selector/movie.selectors';

import { MovieViewModel } from '../models/view-models/movie-view-model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  movieId: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private store: Store<MoviesState>, private location: Location) {
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params.id;
    if (this.movieId) {
      this.store.select(selectMovieById, parseInt(this.movieId)).subscribe((movie) => {
        this.movieForm = this.generateMovieForm(movie);
      });
    }
    else {
      this.movieForm = this.generateMovieForm();
    }
  }

  onSubmit(): void {
    if(this.movieForm.valid) {
      if (this.movieId) {
        this.store.dispatch(updateMovie(this.movieForm.value, parseInt(this.movieId)));
      }
      else {
        this.store.dispatch(addMovie(this.movieForm.value));
      }

      this.location.back();
    } 
    else {
      this.movieForm.markAllAsTouched();
    }
  }

  private generateMovieForm(movie?: MovieViewModel): FormGroup {
    return this.formBuilder.group({
      title: new FormControl(movie ? movie.title : '', [Validators.required]),
      director: new FormControl(movie ? movie.director : '', [Validators.required]),
      distributor: new FormControl(movie ? movie.distributor : '', [Validators.required]),
      imdb_rating: new FormControl(movie ? movie.imdb_rating : '', [Validators.required]),
      imdb_votes: new FormControl(movie ? movie.imdb_votes : '', [Validators.required])
    });
  }
}
