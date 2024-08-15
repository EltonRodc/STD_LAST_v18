import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataAuth } from '../../../../../core/interfaces/auth';
import { AuthDataService } from '../../../../../core/services/auth-data.service';
import { MatCardModule } from '@angular/material/card';
import { DataListadoComboTipoDocumento } from '../../../../jefe/consulta/interfaces/consulta';
import { ConsultaService } from '../../../../jefe/consulta/services/consulta-interno-oficina.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-entradas-generales',
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
  templateUrl: './entradas-generales.component.html',
  styles: ``
})
export class EntradasGeneralesComponent {

}
