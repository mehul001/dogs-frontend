// src/app/core/store/dogs/dogs.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Dog } from '../../models/dog.model';
import * as DogsActions from './dogs.actions';

export interface DogsState {
  dogs: Dog[];
  selectedDog: Dog | null;
  loading: boolean;
  error: string | null;
}

export const initialState: DogsState = {
  dogs: [],
  selectedDog: null,
  loading: false,
  error: null
};

export const dogsReducer = createReducer(
  initialState,

  on(DogsActions.loadDogs, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DogsActions.loadDogsSuccess, (state, { dogs }) => ({
    ...state,
    dogs,
    loading: false,
    error: null
  })),

  on(DogsActions.loadDogsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(DogsActions.loadDog, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DogsActions.loadDogSuccess, (state, { dog }) => ({
    ...state,
    selectedDog: dog,
    loading: false,
    error: null
  })),

  on(DogsActions.loadDogFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(DogsActions.createDog, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DogsActions.createDogSuccess, (state, { dog }) => ({
    ...state,
    dogs: [dog, ...state.dogs],
    loading: false,
    error: null
  })),

  on(DogsActions.createDogFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(DogsActions.updateDog, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DogsActions.updateDogSuccess, (state, { dog }) => ({
    ...state,
    dogs: state.dogs.map(d => d.id === dog.id ? dog : d),
    selectedDog: state.selectedDog?.id === dog.id ? dog : state.selectedDog,
    loading: false,
    error: null
  })),

  on(DogsActions.updateDogFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(DogsActions.deleteDog, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(DogsActions.deleteDogSuccess, (state, { id }) => ({
    ...state,
    dogs: state.dogs.filter(d => d.id !== id),
    loading: false,
    error: null
  })),

  on(DogsActions.deleteDogFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(DogsActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);