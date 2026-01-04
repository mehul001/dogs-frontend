import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DogsState } from './dogs.reducer';

export const selectDogsState = createFeatureSelector<DogsState>('dogs');

export const selectAllDogs = createSelector(
  selectDogsState,
  (state) => state.dogs
);

export const selectSelectedDog = createSelector(
  selectDogsState,
  (state) => state.selectedDog
);

export const selectLoading = createSelector(
  selectDogsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectDogsState,
  (state) => state.error
);

export const selectDogsInService = createSelector(
  selectAllDogs,
  (dogs) => dogs.filter(dog => dog.currentStatus === 'In Service')
);

export const selectDogsInTraining = createSelector(
  selectAllDogs,
  (dogs) => dogs.filter(dog => dog.currentStatus === 'In Training')
);

export const selectDogsRetired = createSelector(
  selectAllDogs,
  (dogs) => dogs.filter(dog => dog.currentStatus === 'Retired')
);

export const selectDogsLeft = createSelector(
  selectAllDogs,
  (dogs) => dogs.filter(dog => dog.currentStatus === 'Left')
);

export const selectStatusCounts = createSelector(
  selectDogsInService,
  selectDogsInTraining,
  selectDogsRetired,
  selectDogsLeft,
  (inService, inTraining, retired, left) => ({
    inService: inService.length,
    inTraining: inTraining.length,
    retired: retired.length,
    left: left.length
  })
);