import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TotalPendientesService } from '../../services/total-pendientes.service';
import { DataOficinasCoIntenos } from '../../interfaces/total-pendientes.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-total-pendientes',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatTableModule,MatProgressSpinner,MatPaginator,FormsModule],
  templateUrl: './total-pendientes.component.html',
  styles: ``
})
export class TotalPendientesComponent implements OnInit,AfterViewInit {

  public isFetchingData: boolean = false;
  public dataOfici: DataOficinasCoIntenos[] = [];
  public iCodOficinaList: number[] = [];
  public pendientesPorOficina: number[] = [];
  public searchValue: string = ''; // Valor para el filtro

  ngOnInit(): void {
    this.getOficinas()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private totalPendientesService = inject(TotalPendientesService)

  public displayedColumns: string[] = ['oficina', 'pendientes',];
  public dataSource = new MatTableDataSource<DataOficinasCoIntenos>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource.filterPredicate = (data: DataOficinasCoIntenos, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      return data.cNomOficina.toLowerCase().includes(transformedFilter);
    };
  }

  getOficinas() {
    this.isFetchingData = true;
    this.totalPendientesService.getOfiCoInterno().subscribe((rpta) => {
      this.dataOfici = rpta;
      this.dataSource.data = this.dataOfici;
      this.iCodOficinaList = this.dataOfici.map(oficina => oficina.iCodOficina);
      this.isFetchingData = false;
      this.getPendientesForAllOficinas();
    });
  }


  getPendientesForAllOficinas() {
    this.pendientesPorOficina = []; // Resetear el arreglo

    this.iCodOficinaList.forEach((iCodOficina, index) => {
      this.totalPendientesService.getTotaPendientes('', '', 0, 0, 0, 0, '', '', 0, 0, 0, 0, 0, 0, 0, iCodOficina, 'Fecha', 'DESC', 0)
        .subscribe((rpta_pendientes) => {
          const pendientesCount = rpta_pendientes ? rpta_pendientes.length : 0; // Maneja el caso de null o undefined
          this.pendientesPorOficina[index] = pendientesCount; // Guarda la cantidad de pendientes en el arreglo
          // console.log(`Oficina ${iCodOficina}: ${pendientesCount} pendientes`);
        },
        (error) => {
          console.error(`Error obteniendo pendientes para oficina ${iCodOficina}`, error);
          this.pendientesPorOficina[index] = 0; // Manejo de error: establece 0 pendientes si hay un error
        });
    });
  }

  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

}
