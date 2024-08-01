import { Component, inject, ViewChild } from '@angular/core';
import { IndicacionesService } from '../../services/indicaciones.service';
import { DataListIndicaciones } from '../../interfaces/indicaciones.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IndicacionNuevoEditComponent } from '../../components/indicacion-nuevo-edit/indicacion-nuevo-edit.component';
import { ConfirmacionDialogComponent } from '../../components/confirmacion-dialog/confirmacion-dialog.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-indicaciones',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './indicaciones.component.html',
})
export class IndicacionesComponent {

  public lisIndicacion: DataListIndicaciones[] =[];
  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;

  public myFormIndicacion: FormGroup = this.fb.group({
      Indicacion: [""],
  })

  public displayedColumns: string[] = ['descripcion', 'opciones'];
  public dataSource = new MatTableDataSource<DataListIndicaciones>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private indicacionesService = inject(IndicacionesService);


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

  ngOnInit(): void {
    this.onSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {
    this.isFetchingData = true;
    const { Indicacion} = this.myFormIndicacion.value;
    const nomb = Indicacion;

    this.indicacionesService.getListIndicaciones(nomb).subscribe(
      (rpta) => {
        this.lisIndicacion = rpta;
        this.dataSource.data = this.lisIndicacion;
        this.isFetchingData = false;
        // console.log(this.lisIndicacion);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newIndicacion(id: number) {
    const dialogRef = this.dialog.open(IndicacionNuevoEditComponent, {
      minWidth:600,
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const message = result.action === 'add' ? 'Se agregó con éxito' : 'Se actualizó con éxito';
        this._snackBar.open(message, 'Cerrar', {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
        });
        this.onSearch();
      }
    });
  }

  deleteIndicacion(codIndicacion:number){
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      data: "¿Está seguro de eliminar esta Indicacion ?"
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.indicacionesService.deleteIndicaciones(codIndicacion).subscribe(
          ()=>{
            this._snackBar.open('Se eliminó registro', 'Cerrar', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
            });
            this.onSearch();
          }
        )
      }
    })
  }

}
