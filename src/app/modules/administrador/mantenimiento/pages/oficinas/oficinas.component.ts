import { Component, inject, ViewChild } from '@angular/core';
import { OficinasService } from '../../services/oficinas.service';
import { DataComboTipo, DataComboUbicacion, DataListaOficina } from '../../interfaces/oficinas.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-oficinas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './oficinas.component.html',
})
export class OficinasComponent {
  public comboListadoUbicacion:DataComboUbicacion[]=[];
  public comboListadoTipo:DataComboTipo[]=[];
  public lisOficina: DataListaOficina[] =[];
  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;

  public myFormOficina: FormGroup = this.fb.group({
      NomOficina : [""],
      SiglaOficina : [""],
      CodUbicacion : [""],
      FlgEstado : [""],
      FlgVisible : [""],
      FlgEnvioColab : [""],
      Nivel : [0],
      Regini : [10],
      Size : [20],
  })

  public displayedColumns: string[] = ['Oficina', 'Ubicacion' , 'Tipo', 'Estado' , 'Propiedades' , 'Responsable' , 'Actualizado' ,'Opciones'];
  public dataSource = new MatTableDataSource<DataListaOficina>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private oficinasService = inject(OficinasService)

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
    this.getListadoComboUbicacion();
    this.getListadoComboTipo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {
    this.isFetchingData = true;
    const { NomOficina,SiglaOficina,CodUbicacion,FlgEstado,FlgVisible,FlgEnvioColab,Nivel,Regini,Size } = this.myFormOficina.value;
    const nomb = NomOficina;
    const sigla = SiglaOficina;
    const codUbi = CodUbicacion;
    const Flg1 = FlgEstado;
    const Flg2 = FlgVisible;
    const Flg3 = FlgEnvioColab;
    const nv = Nivel;
    const reg = Regini;
    const sz = Size;
    console.log(this.myFormOficina.value)
    this.oficinasService.getListOficina(nomb,sigla,codUbi,Flg1,Flg2,Flg3,nv,reg,sz).subscribe(
      (rpta) => {
        this.lisOficina = rpta;
        this.dataSource.data = this.lisOficina;
        this.isFetchingData = false;
        // console.log(this.lisMensajeria);
      }
    )
  }

  onChangeUbicacion(event:any){
    const codigoUbicacion = event.target.value;
    const { NomOficina,SiglaOficina,CodUbicacion,FlgEstado,FlgVisible,FlgEnvioColab,Nivel,Regini,Size } = this.myFormOficina.value;
    const nomb = NomOficina;
    const sigla = SiglaOficina;
    const codUbi = codigoUbicacion;
    const Flg1 = FlgEstado;
    const Flg2 = FlgVisible;
    const Flg3 = FlgEnvioColab;
    const nv = Nivel;
    const reg = Regini;
    const sz = Size;

    this.oficinasService.getListOficina(nomb,sigla,codUbi,Flg1,Flg2,Flg3,nv,reg,sz).subscribe(
      (rpta) => {
        this.lisOficina = rpta;
        this.dataSource.data = this.lisOficina;
        // console.log(this.lisMensajeria);
      }
    )
  }

  onChangeTipo(event:any){
    const codigoTipo = event.target.value;
    const { NomOficina,SiglaOficina,CodUbicacion,FlgEstado,FlgVisible,FlgEnvioColab,Nivel,Regini,Size } = this.myFormOficina.value;
    const nomb = NomOficina;
    const sigla = SiglaOficina;
    const codUbi = CodUbicacion;
    const Flg1 = FlgEstado;
    const Flg2 = FlgVisible;
    const Flg3 = FlgEnvioColab;
    const nv = codigoTipo;
    const reg = Regini;
    const sz = Size;

    this.oficinasService.getListOficina(nomb,sigla,codUbi,Flg1,Flg2,Flg3,nv,reg,sz).subscribe(
      (rpta) => {
        this.lisOficina = rpta;
        this.dataSource.data = this.lisOficina;
        this.isFetchingData = false;
        // console.log(this.lisMensajeria);
      }
    )
  }

  getListadoComboUbicacion(){
    this.oficinasService.getComboUbicacion().subscribe(
      (rpta)=>{
        this.comboListadoUbicacion = rpta;
        // console.log(this.comboListadoGrupos)
      }
    )
  }

  getListadoComboTipo(){
    this.oficinasService.getComboTipo().subscribe(
      (rpta)=>{
        this.comboListadoTipo = rpta;
        // console.log(this.comboListadoGrupos)
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(filterValue)

    const { NomOficina,SiglaOficina,CodUbicacion,FlgEstado,FlgVisible,FlgEnvioColab,Nivel,Regini,Size } = this.myFormOficina.value;
   const sigla = SiglaOficina;
    const codUbi = CodUbicacion;
    const Flg1 = FlgEstado;
    const Flg2 = FlgVisible;
    const Flg3 = FlgEnvioColab;
    const nv = Nivel;
    const reg = Regini;
    const sz = Size;

    this.oficinasService.getListOficina(filterValue,sigla,codUbi,Flg1,Flg2,Flg3,nv,reg,sz).subscribe(
      (rpta) => {
        this.lisOficina = rpta;
        this.dataSource.data = this.lisOficina;
        this.isFetchingData = false;
        // console.log(this.listUsrio);
      }
    )
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(filterValue)

    const { NomOficina,SiglaOficina,CodUbicacion,FlgEstado,FlgVisible,FlgEnvioColab,Nivel,Regini,Size } = this.myFormOficina.value;
    const nomb = NomOficina;
    const codUbi = CodUbicacion;
    const Flg1 = FlgEstado;
    const Flg2 = FlgVisible;
    const Flg3 = FlgEnvioColab;
    const nv = Nivel;
    const reg = Regini;
    const sz = Size;

    this.oficinasService.getListOficina(nomb,filterValue,codUbi,Flg1,Flg2,Flg3,nv,reg,sz).subscribe(
      (rpta) => {
        this.lisOficina = rpta;
        this.dataSource.data = this.lisOficina;
        this.isFetchingData = false;
        // console.log(this.listUsrio);
      }
    )
  }

  estado(event:any) {
    const { NomOficina,SiglaOficina,CodUbicacion,FlgEstado,FlgVisible,FlgEnvioColab,Nivel,Regini,Size } = this.myFormOficina.value;
    const est=event.target.value;
    this.isFetchingData = true;
    const nomb = NomOficina;
    const sigla = SiglaOficina;
    const codUbi = CodUbicacion;
    const Flg2 = FlgVisible;
    const Flg3 = FlgEnvioColab;
    const nv = Nivel;
    const reg = Regini;
    const sz = Size;

    this.oficinasService.getListOficina(nomb,sigla,codUbi,est,Flg2,Flg3,nv,reg,sz).subscribe(
      (rpta) => {
        this.lisOficina = rpta;
        this.dataSource.data = this.lisOficina;
        this.isFetchingData = false;
        // console.log(this.lisMensajeria);
      }
    )
  }
}
