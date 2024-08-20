import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-total-pendientes',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatTableModule,MatProgressSpinner,MatPaginator],
  templateUrl: './total-pendientes.component.html',
  styles: ``
})
export class TotalPendientesComponent implements OnInit,AfterViewInit {

  public isFetchingData: boolean = false;

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public displayedColumns: string[] = ['oficina', 'pendientes',];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


}
