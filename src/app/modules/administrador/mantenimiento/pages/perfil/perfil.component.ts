import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataListPerfil } from '../../interfaces/perfil.interface';
import { PerfilService } from '../../services/perfil.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacionDialogComponent } from '../../components/confirmacion-dialog/confirmacion-dialog.component';
import { PerfilNuevoEditComponent } from '../../components/perfil-nuevo-edit/perfil-nuevo-edit.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-perfil',
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
  templateUrl: './perfil.component.html',

})
export class PerfilComponent  implements OnInit {

  public listPrfil: DataListPerfil[] =[];
  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;

  public myFormPerfil: FormGroup = this.fb.group({
      Perfil: [""],
  })

  public displayedColumns: string[] = ['descripcion', 'opciones'];
  public dataSource = new MatTableDataSource<DataListPerfil>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private perfilService = inject(PerfilService)

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
    const { Perfil} = this.myFormPerfil.value;
    const nomb = Perfil;

    this.perfilService.getListPerfil(nomb).subscribe(
      (rpta) => {
        this.listPrfil = rpta;
        this.dataSource.data = this.listPrfil;
        this.isFetchingData = false;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newPerfil(id: number) {

    const dialogRef = this.dialog.open(PerfilNuevoEditComponent, {
      data: { id },
      minWidth:600
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

  deletePerfil(codPerfil:number){
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      data: "¿Está seguro de eliminar este Perfil?"
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.perfilService.deletePerfil(codPerfil).subscribe(
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
