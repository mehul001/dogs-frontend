import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { DogFilter } from '../../core/models/dog.model';

@Component({
  selector: 'app-dogs-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToggleButtonModule,
    TagModule,
    ToolbarModule,
    TooltipModule
  ],
  template: `
    <div class="toolbar-container">
      <p-toolbar styleClass="custom-toolbar">
        <ng-template pTemplate="left">
          <div class="header-section">
            <h2 class="header-title">Dogs Management</h2>
          </div>
        </ng-template>
        
        <ng-template pTemplate="right">
          <div class="toolbar-actions">
            <!-- Compact Search Filters -->
            <div class="filters-group">
              <span class="p-input-icon-left search-input">
                <input 
                  type="text" 
                  pInputText 
                  placeholder="Search by name..." 
                  [(ngModel)]="nameFilter"
                  (input)="onFilterChange()"
                  class="compact-input"
                />
              </span>
              <span class="p-input-icon-left search-input">
                <input 
                  type="text" 
                  pInputText 
                  placeholder="Breed..." 
                  [(ngModel)]="breedFilter"
                  (input)="onFilterChange()"
                  class="compact-input"
                />
              </span>
              <span class="p-input-icon-left search-input">
                <input 
                  type="text" 
                  pInputText 
                  placeholder="Supplier..." 
                  [(ngModel)]="supplierFilter"
                  (input)="onFilterChange()"
                  class="compact-input"
                />
              </span>
            </div>

            <!-- Divider -->
            <div class="toolbar-divider"></div>

            <!-- Quick Actions -->
            <div class="quick-actions">
              <p-button 
                [icon]="includeDeleted ? 'pi pi-eye' : 'pi pi-eye-slash'"
                [severity]="includeDeleted ? 'info' : 'secondary'"
                [outlined]="!includeDeleted"
                size="small"
                (onClick)="toggleIncludeDeleted()"
                pTooltip="{{includeDeleted ? 'Showing deleted dogs' : 'Hide deleted dogs'}}"
                tooltipPosition="bottom"
              ></p-button>

              <p-button 
                icon="pi pi-filter-slash" 
                size="small"
                severity="secondary"
                [outlined]="true"
                (onClick)="clearFilters()"
                [disabled]="!hasActiveFilters()"
                pTooltip="Clear all filters"
                tooltipPosition="bottom"
              ></p-button>

              <p-button 
                *ngIf="showLiveControls"
                [icon]="isLiveMode ? 'pi pi-pause' : 'pi pi-play'"
                [severity]="isLiveMode ? 'danger' : 'success'"
                [outlined]="!isLiveMode"
                size="small"
                (onClick)="onToggleLive.emit()"
                pTooltip="{{isLiveMode ? 'Stop live updates' : 'Start live updates'}}"
                tooltipPosition="bottom"
              ></p-button>
            </div>
          </div>
        </ng-template>
      </p-toolbar>

      <div class="status-bar" *ngIf="showStatusCounts && statusCounts">
        <div class="status-item">
          <i class="pi pi-check-circle status-icon success"></i>
          <span class="status-label">In Service</span>
          <span class="status-count success">{{ statusCounts.inService || 0 }}</span>
        </div>
        <div class="status-item">
          <i class="pi pi-clock status-icon info"></i>
          <span class="status-label">In Training</span>
          <span class="status-count info">{{ statusCounts.inTraining || 0 }}</span>
        </div>
        <div class="status-item">
          <i class="pi pi-moon status-icon warning"></i>
          <span class="status-label">Retired</span>
          <span class="status-count warning">{{ statusCounts.retired || 0 }}</span>
        </div>
        <div class="status-item">
          <i class="pi pi-sign-out status-icon danger"></i>
          <span class="status-label">Left</span>
          <span class="status-count danger">{{ statusCounts.left || 0 }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toolbar-container {
      margin-bottom: 1rem;
    }

    :host ::ng-deep .custom-toolbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      padding: 0.75rem 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-icon {
      font-size: 1.5rem;
      color: #ffffff;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .header-title {
      margin: 0;
      color: #ffffff;
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .filters-group {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .search-input {
      position: relative;
      color: black;
    }

    .search-input i {
      color: #9ca3af;
    }

    .compact-input {
      width: 140px;
      padding: 0.5rem 0.5rem 0.5rem 0.5rem;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      background: rgba(255, 255, 255, 0.95);
      transition: all 0.2s;
    }

    .compact-input:focus {
      width: 180px;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .compact-input::placeholder {
      color: #9ca3af;
      font-size: 0.875rem;
    }

    .toolbar-divider {
      width: 1px;
      height: 32px;
      background: rgba(255, 255, 255, 0.3);
    }

    .quick-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    /* Status Bar */
    .status-bar {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      padding: 1rem 1.5rem;
      background: #ffffff;
      border-radius: 8px;
      margin-top: 0.75rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      background: #f9fafb;
      transition: all 0.2s;
    }

    .status-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .status-icon {
      font-size: 1.25rem;
    }

    .status-icon.success { color: #10b981; }
    .status-icon.info { color: #3b82f6; }
    .status-icon.warning { color: #f59e0b; }
    .status-icon.danger { color: #ef4444; }

    .status-label {
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 500;
    }

    .status-count {
      font-size: 1.125rem;
      font-weight: 700;
      min-width: 30px;
      text-align: center;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
    }

    .status-count.success { 
      color: #10b981; 
      background: rgba(16, 185, 129, 0.1);
    }
    .status-count.info { 
      color: #3b82f6; 
      background: rgba(59, 130, 246, 0.1);
    }
    .status-count.warning { 
      color: #f59e0b; 
      background: rgba(245, 158, 11, 0.1);
    }
    .status-count.danger { 
      color: #ef4444; 
      background: rgba(239, 68, 68, 0.1);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .toolbar-actions {
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .compact-input {
        width: 120px;
      }

      .compact-input:focus {
        width: 160px;
      }
    }

    @media (max-width: 768px) {
      :host ::ng-deep .custom-toolbar {
        padding: 1rem;
      }

      .header-title {
        font-size: 1.25rem;
      }

      .toolbar-actions {
        flex-direction: column;
        width: 100%;
        align-items: stretch;
      }

      .filters-group {
        flex-direction: column;
        width: 100%;
      }

      .compact-input {
        width: 100%;
      }

      .compact-input:focus {
        width: 100%;
      }

      .quick-actions {
        justify-content: center;
      }

      .toolbar-divider {
        width: 100%;
        height: 1px;
      }

      .status-bar {
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .status-item {
        flex: 1 1 calc(50% - 0.375rem);
        min-width: 140px;
      }
    }

    @media (max-width: 480px) {
      .header-section {
        gap: 0.5rem;
      }

      .header-icon {
        font-size: 1.25rem;
      }

      .header-title {
        font-size: 1.125rem;
      }

      .status-item {
        flex: 1 1 100%;
      }
    }
  `]
})
export class DogsToolbarComponent {
  @Output() filterChange = new EventEmitter<DogFilter>();
  @Output() includeDeletedChange = new EventEmitter<boolean>();
  @Output() onToggleLive = new EventEmitter<void>();

  @Input() showStatusCounts = false;
  @Input() showLiveControls = false;
  @Input() isLiveMode = false;
  @Input() statusCounts: { inService: number; inTraining: number; retired: number; left: number } | null = null;

  nameFilter = '';
  breedFilter = '';
  supplierFilter = '';
  includeDeleted = false;

  onFilterChange(): void {
    const filter: DogFilter = {};
    
    if (this.nameFilter.trim()) {
      filter.name = this.nameFilter.trim();
    }
    if (this.breedFilter.trim()) {
      filter.breed = this.breedFilter.trim();
    }
    if (this.supplierFilter.trim()) {
      filter.supplier = this.supplierFilter.trim();
    }

    this.filterChange.emit(filter);
  }

  toggleIncludeDeleted(): void {
    this.includeDeleted = !this.includeDeleted;
    this.includeDeletedChange.emit(this.includeDeleted);
  }

  hasActiveFilters(): boolean {
    return !!(this.nameFilter || this.breedFilter || this.supplierFilter || this.includeDeleted);
  }

  clearFilters(): void {
    this.nameFilter = '';
    this.breedFilter = '';
    this.supplierFilter = '';
    this.includeDeleted = false;
    
    this.filterChange.emit({});
    this.includeDeletedChange.emit(false);
  }
}