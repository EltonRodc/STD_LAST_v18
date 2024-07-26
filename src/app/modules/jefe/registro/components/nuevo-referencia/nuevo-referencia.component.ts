import { AfterViewInit, Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DocIntOfService } from '../../services/doc-int-of.service';
import { DataListPopupReferencia } from '../../interfaces/doc-int-of.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';

@Component({
  selector: 'app-nuevo-referencia',
  standalone: true,
  providers:[{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './nuevo-referencia.component.html',
  styles: ``
})
export class NuevoReferenciaComponent implements OnInit,AfterViewInit{

  public idTramiteMov : number = 0;
  public listadoPopuMostrar: DataListPopupReferencia[] = [];

  public myFormPopupReferencia: FormGroup = this.fb.group({
    textoBuscar:[""],
    tipoBuscar: [4],
    grupoBuscar: [2],
    codOficinaLogin: [0],
  })

  public myFormAddReferencia = this.fb.group({
    codTramite: [0],
    codTramiteReferido: [0],
    archivar: [true],
    codMovimientoReferido: [0]
  });

  public displayedColumns: string[] = ['opcion','tramite','documento','asunto','remitente'];
  public dataSource = new MatTableDataSource<DataListPopupReferencia>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialogRef = inject(MatDialogRef<NuevoReferenciaComponent>);
  private docIntOfService = inject(DocIntOfService);

  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){
    this.idTramiteMov = data.id_Tramite;
  }



  ngOnInit(): void {
    this.listPopupReferen();
  }
  ngAfterViewInit() {
    this.paginator.pageSize = 5;
    this.dataSource.paginator = this.paginator;
  }

  listPopupReferen() {
    // Obtener los valores del formulario
    const formValues = this.myFormPopupReferencia.getRawValue();

    // Verificar si textoBuscar está vacío y asignar "%%" si es así
    if (!formValues.textoBuscar.trim()) {
      formValues.textoBuscar = "%%";
    }

    // Llamar al servicio
    this.docIntOfService.listPoputReferencias(
      formValues.textoBuscar,
      formValues.tipoBuscar,
      formValues.grupoBuscar,
      formValues.codOficinaLogin,
    ).subscribe(
      (rpta: DataListPopupReferencia[]) => {
        this.listadoPopuMostrar = rpta;
        this.dataSource.data = this.listadoPopuMostrar;
        // Restablecer los valores por defecto después de la suscripción
        this.myFormPopupReferencia.reset({
          textoBuscar: "",
          tipoBuscar: 4,
          grupoBuscar: 2,
          codOficinaLogin: 0,
        });
      }
    );
  }

  agregarRef(tramiteCOD:number){
    this.myFormAddReferencia.patchValue({
      codTramite: this.idTramiteMov,
      codTramiteReferido: tramiteCOD
    })
    // console.log(this.myFormAddReferencia.value)
    this.docIntOfService.addReferencias(this.myFormAddReferencia.value)
      .subscribe(
        (rpta)=>{
          this.dialogRef.close({ action: 'add' });
        }
      )
  }
}
