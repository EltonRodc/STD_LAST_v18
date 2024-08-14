import { AfterViewInit, Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RegistroPvdService } from '../../services/registro-pvd.service';
import { ListaContratos } from '../../interfaces/registro-pvd.interface';

@Component({
  selector: 'app-search-contratos',
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
  templateUrl: './search-contratos.component.html',
  styles: ``
})
export class SearchContratosComponent implements OnInit, AfterViewInit{

  public listContrts : ListaContratos[] = []
  public filtroForm: FormGroup;

  ngOnInit(): void {
    this.getListadoContratos();
    this.dataSource.filterPredicate = (data: ListaContratos, filter: string) => {
      const filterValues = JSON.parse(filter);
      const nombreCortoMatch = data.nombreCorto.toLowerCase().includes(filterValues.nombreCorto);
      const paqueteMatch = data.paquete.toLowerCase().includes(filterValues.paquete);
      return nombreCortoMatch && paqueteMatch;
    };
  }
  ngAfterViewInit() {
    this.paginator.pageSize = 5;
    this.dataSource.paginator = this.paginator;
  }

  public displayedColumns: string[] = ['tipo','nombre_corto','cui','numero','paquete','grupo','region','sel'];
  public dataSource = new MatTableDataSource<ListaContratos>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private dialogRef = inject(MatDialogRef<SearchContratosComponent>);
  private registroPvdService = inject(RegistroPvdService)
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filtroForm = this.fb.group({
      nombreCorto: [''],
      paquete: ['']
    });
  }
  getListadoContratos(){
    this.registroPvdService.listContratos().subscribe(
      (rpta)=>{
        this.listContrts = rpta;
        this.dataSource.data = this.listContrts;
        this.filtrarContratos();
      }
    );
  }

  agregarContrato(cui:string,nro_contr:string){
    const cui_parametro = cui;
    const nro_contr_parametro = nro_contr;
    this.dialogRef.close({ cui_parametro, nro_contr_parametro});
  }

  filtrarContratos() {
    const nombreCorto = this.filtroForm.get('nombreCorto')?.value.toLowerCase() || '';
    const paquete = this.filtroForm.get('paquete')?.value.toLowerCase() || '';

    this.dataSource.filterPredicate = (data: ListaContratos, filter: string) => {
      const dataStr = data.nombreCorto.toLowerCase() + data.paquete.toLowerCase();
      return dataStr.includes(filter);
    };

    this.dataSource.filter = nombreCorto + paquete;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
