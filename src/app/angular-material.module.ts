import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDividerModule,
  MatBadgeModule
} from '@angular/material';

import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [
    MatBadgeModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule
  ]
})
export class AngularMaterialModule {}
