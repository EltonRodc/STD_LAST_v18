import { AfterViewInit, Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { DataInstitucion } from '../../../../jefe/registro/interfaces/doc-sal-of.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DocSalidaOfService } from '../../../../jefe/registro/services/doc-salida-of.service';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sel-institucion',
  standalone: true,
  providers:[
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './sel-institucion.component.html',
  styles: ``
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
  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){}

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
        const codigo_rem = rpta.iCodRemitente;
        const nomb_rem = rpta.cNombre;
        this.dialogRef.close({ codigo_rem, nomb_rem});
      }
    )
  }

}
