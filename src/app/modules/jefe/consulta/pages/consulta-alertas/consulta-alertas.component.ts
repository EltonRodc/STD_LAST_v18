import { Component } from '@angular/core';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-alertas',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinner,
    MatPaginator,
    DatePipe,
    MatTooltipModule,
    RouterLink,
    MatTooltipModule
  ],
  templateUrl: './consulta-alertas.component.html',
  styles: ``
})
export class ConsultaAlertasComponent {

}
