import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { RegistroDetalleService } from '../../services/registro-detalle.service';
import { DataDetalleGeneral, DataDetalleSeguimiento, DataRemitente } from '../../interfaces/registro-detalle.interface';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-registro-detalle',
  standalone: true,
  imports: [UpperCasePipe,DatePipe,MatCardModule,MatTableModule,MatProgressSpinnerModule,MatPaginator,MatTooltip],
  templateUrl: './registro-detalle.component.html',
  styles: ``
})
export class RegistroDetalleComponent implements OnInit,AfterViewInit{


  @Input() cod_tramite!: number;
  public tram_dtos_generales?: DataDetalleGeneral;
  public dataRemitente? : DataRemitente;
  public dataSeguimiento? : DataDetalleSeguimiento[] = [];
  public isFetchingData: boolean = false;

  private registroDetalleService = inject(RegistroDetalleService)

  public displayedColumns: string[] = ['n', 'documento', 'asunto', 'origen', 'destino', 'estado', 'adjuntos',];
  public dataSource = new MatTableDataSource<DataDetalleSeguimiento>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private matPaginatorIntl: MatPaginatorIntl){
    this.matPaginatorIntl.itemsPerPageLabel = 'Registros por página:';
    this.matPaginatorIntl.nextPageLabel = 'Siguiente';
    this.matPaginatorIntl.previousPageLabel = 'Anterior';
    this.matPaginatorIntl.firstPageLabel = 'Primera página';
    this.matPaginatorIntl.lastPageLabel = 'Última página';
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {

      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);

      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;

    };
  }

  ngOnInit(): void {
    this.getDetalle1(this.cod_tramite);
    this.getDetalleSeguimiento(this.cod_tramite)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDetalle1(cod){
    this.registroDetalleService.getDetalleGeeneral(cod).subscribe(
      (rpta) => {
        const remitente = rpta.iCodRemitente;
        this.tram_dtos_generales = rpta;
        if(remitente){
          this.registroDetalleService.getDetalleRemitente(remitente).subscribe(
            (rpta_rem)=>{
              this.dataRemitente = rpta_rem.data[0]
            }
          )
        }
      }
    )
  }

  getDetalleSeguimiento(cod){
    this.isFetchingData = true;
    this.registroDetalleService.getDetalleSeguimiento(cod).subscribe(
      (rpta_seg)=>{
        this.dataSeguimiento = rpta_seg
        this.dataSource.data = this.dataSeguimiento;
        this.isFetchingData = false;
        // console.log(this.dataSource.data)
      }
    )
  }

}
