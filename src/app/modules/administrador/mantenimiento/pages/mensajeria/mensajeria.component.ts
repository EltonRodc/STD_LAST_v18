import { Component, Inject, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MensajeriaService } from '../../services/mensajeria.service';
import { DataListMensajeria, DataListOfcnaDestino, PostAddMensajeria } from '../../interfaces/mensajeria.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MensajeriaNuevoEditComponent } from '../../components/mensajeria-nuevo-edit/mensajeria-nuevo-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mensajeria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    DatePipe
  ],
  templateUrl: './mensajeria.component.html',
})
export class MensajeriaComponent {


  public lisMensajeria: DataListMensajeria[] =[];
  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;

  public myFormMensajeria: FormGroup = this.fb.group({
      EstadoMensaje : ["1"],
  })

  public displayedColumns: string[] = ['fecha', 'contenido' , 'nivel', 'prioridad' , 'trabajador' , 'estado' ,'opciones'];
  public dataSource = new MatTableDataSource<DataListMensajeria>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private mensajeriaService = inject(MensajeriaService);

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
    const { EstadoMensaje} = this.myFormMensajeria.value;
    const nomb = EstadoMensaje;

    this.mensajeriaService.getListMensajeria(nomb).subscribe(
      (rpta) => {
        this.lisMensajeria = rpta;
        this.dataSource.data = this.lisMensajeria;
        this.isFetchingData = false;
        // console.log(this.lisMensajeria);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  newMensajeria(id: number) {
    const dialogRef = this.dialog.open(MensajeriaNuevoEditComponent, {
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

  estado(event:any) {
    const est=event.target.value;
    this.isFetchingData = true;

    this.mensajeriaService.getListMensajeria(est).subscribe(
      (rpta) => {
        this.lisMensajeria = rpta;
        this.dataSource.data = this.lisMensajeria;
        this.isFetchingData = false;
        // console.log(this.lisMensajeria);
      }
    )
  }

}
