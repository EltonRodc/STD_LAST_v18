import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CorrelativoInternoService } from '../../services/correlativo-interno.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataListCoInterno, DataOficinaCoInterno } from '../../interfaces/correlativo-interno.interface';

@Component({
  selector: 'app-correlativo-interno',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './correlativo-interno.component.html',
})
export class CorrelativoInternoComponent implements OnInit, AfterViewInit{
  public years: number[] = [];
  public oficinasCoInterno: DataOficinaCoInterno[] = [];
  public listaCoInterno : DataListCoInterno [] = [];
  public isFetchingData: boolean = false;
  public buttonUpdate: boolean = false;

  public myFormCoInterno:FormGroup = this.fb.group({
      CodOficina : [0],
      NumAño: [new Date().getFullYear()]
  })

  public displayedColumns: string[] = ['tipo_doc', 'numero', 'eliminar',];
  public dataSource = new MatTableDataSource<DataListCoInterno>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private correlativoInternoService = inject(CorrelativoInternoService)

  constructor(
      private fb: FormBuilder,
      public dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private matPaginatorIntl: MatPaginatorIntl,
  ) {

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

  ngOnInit():void {
      this.getOficinaCoInterno();
      this.generateYearArray();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  generateYearArray(): void {
      const currentYear = new Date().getFullYear();
      const futureYear = currentYear + 5;
      for (let i = 2018; i <= futureYear; i++) {
        this.years.push(i);
      }
  }

  getOficinaCoInterno(){
      this.correlativoInternoService.getListOficinasCoInterno()
        .subscribe(
          (rpta:DataOficinaCoInterno[])=>{
            this.oficinasCoInterno = rpta;
          },
          (error) => {
            console.error('Error al obtener las oficinas coInterno', error);
        }

        )
  }

  onSearch(event:any) : void {
    this.isFetchingData = true;
    // const CodOficina = 82
    const CodOficina = parseInt(event.target.value, 10);
    const { NumAño} = this.myFormCoInterno.value;

    this.correlativoInternoService.getCorrelativoInterno(CodOficina,NumAño).subscribe(
      (rpta) => {
        this.listaCoInterno = rpta;
        this.dataSource.data = this.listaCoInterno;
        this.isFetchingData = false;
        // console.log(this.listaCoInterno);
      }
    )
  }

  listarCoInternoAnio(event:any){
    this.isFetchingData = true;
    const anio = parseInt(event.target.value, 10);
    const CodOficina = parseInt(this.myFormCoInterno.get('iCodOficina')?.value , 10);
    this.correlativoInternoService.getCorrelativoInterno(CodOficina, anio ).subscribe(
      (rpta)=>{
        this.listaCoInterno = rpta;
        this.dataSource.data = this.listaCoInterno;
        this.buttonUpdate = this.dataSource.data.length >0;
        this.isFetchingData = false;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
