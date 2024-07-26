import { AfterViewInit, Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DocSalidaOfService } from '../../services/doc-salida-of.service';
import { DataInstitucion } from '../../interfaces/doc-sal-of.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';

@Component({
  selector: 'app-sel-institucion',
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
  templateUrl: './sel-institucion.component.html',
})
export class SelInstitucionComponent implements OnInit, AfterViewInit{

  public instituciones: DataInstitucion[] = [];

  public myFormInstitucion: FormGroup = this.fb.group({
    cNombre:[""],
    cSiglaRemitente: [""],
    nNumDocumento: [""],
  })

  ngOnInit(): void {
    this.listInstitucion();
  }
  ngAfterViewInit() {
    this.paginator.pageSize = 5;
    this.dataSource.paginator = this.paginator;
  }
  public displayedColumns: string[] = ['nombre','documento','ubicacion','sel'];
  public dataSource = new MatTableDataSource<DataInstitucion>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialogRef = inject(MatDialogRef<SelInstitucionComponent>);
  private docSalidaOfService = inject(DocSalidaOfService)
  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){
  }

  listInstitucion(){
    const { cNombre, cSiglaRemitente, nNumDocumento } = this.myFormInstitucion.value;
    this.docSalidaOfService.getInstitucion(cNombre,cSiglaRemitente,nNumDocumento).subscribe(
      (rpta)=>{
        this.instituciones = rpta;
        this.dataSource.data = this.instituciones;
        // console.log(this.instituciones)
      }
    )
  }

  agregarInstitucion(cod:number){
    this.docSalidaOfService.getSelInstitucion(cod).subscribe(
      (rpta)=>{
        const codigo = cod;
        const nombre = rpta.cNombre;
        const departamento = rpta.cDepartamento;
        const direccion = rpta.cDireccion.trim();
        const ubicacion = `${rpta.cNomDepartamento.trim()} - ${rpta.cNomProvincia.trim()} - ${rpta.cNomDistrito.trim()}`

        const param_provincia = rpta.cProvincia;
        const param_distrito = rpta.cDistrito;

        this.dialogRef.close({ codigo, nombre, departamento, direccion, ubicacion,param_provincia, param_distrito });
      }
    )
  }

}
