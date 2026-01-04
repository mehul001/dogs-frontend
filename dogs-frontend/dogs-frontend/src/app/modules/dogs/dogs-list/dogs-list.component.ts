import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { DogsToolbarComponent } from '../../../shared/ui/dogs-toolbar.component';
import { Dog, DogFilter, DogStatus, LeavingReason } from '../../../core/models/dog.model';
import { AppState } from '../../../core/store/app.state';
import * as DogsActions from '../../../core/store/dogs/dogs.actions';
import * as DogsSelectors from '../../../core/store/dogs/dogs.selectors';

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    MessageModule,
    PaginatorModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    DogsToolbarComponent
  ],
  providers: [MessageService, ConfirmationService],
})
export class DogsListComponent implements OnInit {

  dogs$: Observable<Dog[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  statusCounts$: Observable<any>;

  showDialog = false;
  dialogMode: 'view' | 'edit' = 'view';
  selectedDog!: Dog;
  editDogId!: string;

  editForm!: FormGroup;

  genders: ('Male'|'Female')[] = ['Male','Female'];
  statuses: DogStatus[] = ['In Training','In Service','Retired','Left'];
  leavingReasons: LeavingReason[] = ['Transferred','Retired (Put Down)','KIA','Rejected','Retired (Re-housed)','Died'];

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.dogs$ = this.store.select(DogsSelectors.selectAllDogs);
    this.loading$ = this.store.select(DogsSelectors.selectLoading);
    this.error$ = this.store.select(DogsSelectors.selectError);
    this.statusCounts$ = this.store.select(DogsSelectors.selectStatusCounts);
  }

  ngOnInit(): void {
    this.store.dispatch(DogsActions.loadDogs());

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      breed: ['', Validators.required],
      badgeId: ['', Validators.required],
      gender: ['', Validators.required],
      currentStatus: ['', Validators.required],
      kennellingCharacteristic: [''],
      leavingReason: ['']
    });
  }

  clearError() {
    this.store.dispatch(DogsActions.clearError());
  }

  onFilterChange(_: DogFilter) {}
  
  onIncludeDeletedChange(_: boolean) {}
}
