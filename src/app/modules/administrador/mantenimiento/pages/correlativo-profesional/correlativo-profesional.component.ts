import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CorrelativoProfesionalService } from '../../services/correlativo-profesional.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataCoProfesional, DataListTrabajadoresCoProfes, DataOficinasCoProfesional, EditTrabajador } from '../../interfaces/correlativo-profesional.interface';
import { CorrelativoProfesionalNuevoComponent } from '../../components/correlativo-profesional-nuevo/correlativo-profesional-nuevo.component';
import { ConfirmacionDialogComponent } from '../../components/confirmacion-dialog/confirmacion-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-correlativo-profesional',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltip
  ],
  templateUrl: './correlativo-profesional.component.html',
})
export class CorrelativoProfesionalComponent implements OnInit, AfterViewInit {

  public years: number[] = [];
  public oficinasCoProfesional: DataOficinasCoProfesional[] = [];
  public listTrabajadores : DataListTrabajadoresCoProfes[] =[];
  public listaTablaCoProfesional : DataCoProfesional[] = [];
  public isFetchingData: boolean = false;
  public buttonUpdate: boolean = false;

  public myFormCoProfesional:FormGroup = this.fb.group({
      iCodOficina : [0],
      iCodTrabajador:[0],
      nNumAno: [new Date().getFullYear()]
  })

  public displayedColumns: string[] = ['oficina', 'tipo_doc', 'numero', 'eliminar',];
  public dataSource = new MatTableDataSource<DataCoProfesional>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private correlativoProfesionalService = inject(CorrelativoProfesionalService);

  constructor(private fb:FormBuilder,private matPaginatorIntl: MatPaginatorIntl,private _snackBar: MatSnackBar,public dialog: MatDialog) {
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
      this.getOficinasCoProfes();
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

  getOficinasCoProfes(){
      this.correlativoProfesionalService.getListOficinasCoProfesional()
        .subscribe(
          (rpta:DataOficinasCoProfesional[])=>{
            this.oficinasCoProfesional = rpta;
          },
          (error) => {
            console.error('Error al obtener las oficinas coProfesional', error);
        }

        )
  }

  filtrarTrabCoProfesional(event:any): void {
      this.isFetchingData = true;
      const codOficina = parseInt(event.target.value, 10);
      if(codOficina ){
        this.correlativoProfesionalService.getListTrabjCoProfesional(codOficina)
        .subscribe(
        (rpta: DataListTrabajadoresCoProfes[]) => {
          this.listTrabajadores = rpta;
          const primerCodigoTrabajador = this.listTrabajadores[0].iCodTrabajador;
          if (this.listTrabajadores.length > 0) {
            this.myFormCoProfesional.patchValue({
              iCodTrabajador: primerCodigoTrabajador,
            });
          }

          this.correlativoProfesionalService.getCorrelativoProfesional(codOficina,primerCodigoTrabajador, this.myFormCoProfesional.get('nNumAno')?.value ).subscribe(
            (rpta)=>{
              this.listaTablaCoProfesional = rpta;
              this.dataSource.data = this.listaTablaCoProfesional;
              this.buttonUpdate = this.dataSource.data.length >0;
              this.isFetchingData = false;
            }
          )
        }
        );
      }else{
        this.listTrabajadores = [];
        this.myFormCoProfesional.get('iCodTrabajador')?.setValue(0);
        this.correlativoProfesionalService.getCorrelativoProfesional(0,0, this.myFormCoProfesional.get('nNumAno')?.value ).subscribe(
          (rpta)=>{
            this.listaTablaCoProfesional = rpta;
            this.dataSource.data = this.listaTablaCoProfesional;
            this.buttonUpdate = this.dataSource.data.length >0;
            this.isFetchingData = false;
          }
        )
      }

  }


  listarCoProfesional(event:any){
    this.isFetchingData = true;
    const codigoTrabajador = parseInt(event.target.value, 10)
    const codigoOficina = parseInt(this.myFormCoProfesional.get('iCodOficina')?.value , 10);
    const anio = parseInt(this.myFormCoProfesional.get('nNumAno')?.value , 10)
    this.correlativoProfesionalService.getCorrelativoProfesional(codigoOficina,codigoTrabajador, anio ).subscribe(
      (rpta)=>{
        this.listaTablaCoProfesional = rpta;
        this.dataSource.data = this.listaTablaCoProfesional;
        this.buttonUpdate = this.dataSource.data.length >0;
        this.isFetchingData = false;
      }
    )
  }
  listarCoProfesionalAnio(event:any){
    this.isFetchingData = true;
    const anio = parseInt(event.target.value, 10);
    const codigoOficina = parseInt(this.myFormCoProfesional.get('iCodOficina')?.value , 10);
    const codigoTrabajador = parseInt(this.myFormCoProfesional.get('iCodTrabajador')?.value , 10);
    this.correlativoProfesionalService.getCorrelativoProfesional(codigoOficina,codigoTrabajador, anio ).subscribe(
      (rpta)=>{
        this.listaTablaCoProfesional = rpta;
        this.dataSource.data = this.listaTablaCoProfesional;
        this.buttonUpdate = this.dataSource.data.length >0;
        this.isFetchingData = false;
      }
    )
  }

  editarRegistro(){
    const dataToUpdate:EditTrabajador[] = [];
     this.listaTablaCoProfesional.forEach(item => {
      const { nCorrelativo, cCodTipoDoc, iCodTrabajador, nNumAno } = item;
      dataToUpdate.push({
        correlativo: nCorrelativo,
        codTipoDoc: cCodTipoDoc,
        codTrabajador: iCodTrabajador,
        numAnio: nNumAno,
      });

      this.correlativoProfesionalService.editarCorrelativos(dataToUpdate)
      .subscribe(
        response => {
          this._snackBar.open('Los datos se han actualizado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: "end",
            verticalPosition: "top",
          });
          this.correlativoProfesionalService.getCorrelativoProfesional(this.myFormCoProfesional.value.iCodOficina,this.myFormCoProfesional.value.iCodTrabajador, this.myFormCoProfesional.value.nNumAno ).subscribe(
            (rpta)=>{
              this.listaTablaCoProfesional = rpta;
              this.dataSource.data = this.listaTablaCoProfesional;
              this.buttonUpdate = this.dataSource.data.length >0;
              this.isFetchingData = false;
            }
          )
        },
        error => {
          console.error('Error al actualizar los datos:', error);
        }
      );
    });
  }

  newCoProfesional(){
    const dialogRef = this.dialog.open(CorrelativoProfesionalNuevoComponent, {
      minWidth:600,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const message = result.action === 'add' ? 'Se agregó con éxito' : 'Se actualizó con éxito';
        this._snackBar.open(message, 'Cerrar', {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
        });
        this.correlativoProfesionalService.getCorrelativoProfesional(this.myFormCoProfesional.value.iCodOficina,this.myFormCoProfesional.value.iCodTrabajador, this.myFormCoProfesional.value.nNumAno ).subscribe(
          (rpta)=>{
            this.listaTablaCoProfesional = rpta;
            this.dataSource.data = this.listaTablaCoProfesional;
            this.buttonUpdate = this.dataSource.data.length >0;
            this.isFetchingData = false;
          }
        )
      }
    });
  }

  deleteTrabaCoProfesional(id: number): void {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent,{
      data: "¿Está seguro de eliminar este Correlativo Profesional?"
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.correlativoProfesionalService.deleteCorrelativo(id).subscribe(
          response => {
            this._snackBar.open('Se eliminó registro', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
            });
            this.listaTablaCoProfesional = this.listaTablaCoProfesional.filter(item => item.iCodCorrelTrabajador !== id);
            this.dataSource.data = this.listaTablaCoProfesional;
          },
          error => {
            console.error('Error al eliminar la referencia:', error);
          }
        );
      }
    })

  }

}
