import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { MovieFormComponent } from './movie-form.component';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';

describe('MovieFormComponent', () => {
  let component: MovieFormComponent;
  let fixture: ComponentFixture<MovieFormComponent>;
  let store: MockStore;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  const initialState = {};
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieFormComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: FormBuilder, useValue: formBuilder },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: 'create'}
          }
        },
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormComponent);
    component = fixture.componentInstance;
    component.movieForm = formBuilder.group({
      title: new FormControl('', [Validators.required]),
      director: new FormControl('', [Validators.required]),
      distributor: new FormControl('', [Validators.required]),
      imdb_rating: new FormControl('', [Validators.required]),
      imdb_votes: new FormControl('', [Validators.required])
    });
    fixture.detectChanges();

    debugElement = fixture.debugElement.query(By.css('form'));
    htmlElement = debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit method', (() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    htmlElement = fixture.debugElement.query(By.css('button')).nativeElement;
    htmlElement.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

  it('form should be invalid', (() => {
    component.movieForm.controls['title'].setValue('');
    component.movieForm.controls['director'].setValue('');
    component.movieForm.controls['distributor'].setValue('');
    component.movieForm.controls['imdb_rating'].setValue('');
    component.movieForm.controls['imdb_votes'].setValue('');
    expect(component.movieForm.valid).toBeFalsy();
  }));

  it('form should be valid', (() => {
    component.movieForm.controls['title'].setValue('Four Weddings and a Funeral');
    component.movieForm.controls['director'].setValue('Mike Newell');
    component.movieForm.controls['distributor'].setValue('Gramercy');
    component.movieForm.controls['imdb_rating'].setValue('7.1');
    component.movieForm.controls['imdb_votes'].setValue('39003');
    expect(component.movieForm.valid).toBeTruthy();
  }));
});
