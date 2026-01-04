// src/app/core/store/dogs/dogs.actions.ts
import { createAction, props } from '@ngrx/store';
import { Dog, DogFilter } from '../../models/dog.model';

// Load Dogs
export const loadDogs = createAction(
  '[Dogs] Load Dogs'
);

export const loadDogsSuccess = createAction(
  '[Dogs] Load Dogs Success',
  props<{ dogs: Dog[]; total: number }>()
);

export const loadDogsFailure = createAction(
  '[Dogs] Load Dogs Failure',
  props<{ error: string }>()
);

// Get Single Dog
export const loadDog = createAction(
  '[Dogs] Load Dog',
  props<{ id: string }>()
);

export const loadDogSuccess = createAction(
  '[Dogs] Load Dog Success',
  props<{ dog: Dog }>()
);

export const loadDogFailure = createAction(
  '[Dogs] Load Dog Failure',
  props<{ error: string }>()
);

// Create Dog
export const createDog = createAction(
  '[Dogs] Create Dog',
  props<{ dog: Omit<Dog, 'id' | 'createdAt' | 'updatedAt'> }>()
);

export const createDogSuccess = createAction(
  '[Dogs] Create Dog Success',
  props<{ dog: Dog }>()
);

export const createDogFailure = createAction(
  '[Dogs] Create Dog Failure',
  props<{ error: string }>()
);

// Update Dog
export const updateDog = createAction(
  '[Dogs] Update Dog',
  props<{ id: string; dog: Partial<Dog> }>()
);

export const updateDogSuccess = createAction(
  '[Dogs] Update Dog Success',
  props<{ dog: Dog }>()
);

export const updateDogFailure = createAction(
  '[Dogs] Update Dog Failure',
  props<{ error: string }>()
);

// Delete Dog
export const deleteDog = createAction(
  '[Dogs] Delete Dog',
  props<{ id: string }>()
);

export const deleteDogSuccess = createAction(
  '[Dogs] Delete Dog Success',
  props<{ id: string }>()
);

export const deleteDogFailure = createAction(
  '[Dogs] Delete Dog Failure',
  props<{ error: string }>()
);

// Clear Error
export const clearError = createAction(
  '[Dogs] Clear Error'
);