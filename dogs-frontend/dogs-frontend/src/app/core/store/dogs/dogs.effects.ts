// src/app/core/store/dogs/dogs.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as DogsActions from './dogs.actions';
import { Dog, DogsResponse } from '../../models/dog.model';
import { ApiConfigService } from '../../services/api-config.service';

@Injectable()
export class DogsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = this.apiConfig.getDogsUrl();
  }

  loadDogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DogsActions.loadDogs),
      switchMap(() => {
        return this.http.get<DogsResponse>(`${this.baseUrl}/`).pipe(
          map(response => 
            DogsActions.loadDogsSuccess({ 
              dogs: response.data || [], 
              total: response.total || 0 
            })
          ),
          catchError(error =>
            of(DogsActions.loadDogsFailure({ 
              error: error.message || 'Failed to load dogs' 
            }))
          )
        );
      })
    );
  });

  loadDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DogsActions.loadDog),
      exhaustMap(action =>
        this.http.get<Dog>(`${this.baseUrl}/${action.id}/`).pipe(
          map(dog => DogsActions.loadDogSuccess({ dog })),
          catchError(error =>
            of(DogsActions.loadDogFailure({ 
              error: error.message || 'Failed to load dog' 
            }))
          )
        )
      )
    );
  });

  createDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DogsActions.createDog),
      exhaustMap(action =>
        this.http.post<Dog>(`${this.baseUrl}/`, action.dog).pipe(
          map(dog => DogsActions.createDogSuccess({ dog })),
          catchError(error =>
            of(DogsActions.createDogFailure({ 
              error: error.message || 'Failed to create dog' 
            }))
          )
        )
      )
    );
  });

  updateDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DogsActions.updateDog),
      exhaustMap(action =>
        this.http.put<Dog>(`${this.baseUrl}/${action.id}/`, action.dog).pipe(
          map(dog => DogsActions.updateDogSuccess({ dog })),
          catchError(error =>
            of(DogsActions.updateDogFailure({ 
              error: error.message || 'Failed to update dog' 
            }))
          )
        )
      )
    );
  });

  deleteDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DogsActions.deleteDog),
      exhaustMap(action =>
        this.http.delete<void>(`${this.baseUrl}/${action.id}/`).pipe(
          map(() => DogsActions.deleteDogSuccess({ id: action.id })),
          catchError(error =>
            of(DogsActions.deleteDogFailure({ 
              error: error.message || 'Failed to delete dog' 
            }))
          )
        )
      )
    );
  });
}