import { Component, inject, ViewChild } from '@angular/core';
import { DataComboDepartamento, DataComboDistritos, DataComboOfcnOrigen, DataComboProvincias, DataComboTpoDcmto, DataListadoControlCargosOfi, FormularioControlCargosOfi } from '../../interfaces/consulta';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ConsultaService } from '../../services/consulta-interno-oficina.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PerfilesService } from '../../../../../core/services/perfiles.service';
import { DatosPrincipales } from '../../../../../core/interfaces/perfiles.interface';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';

@Component({
  selector: 'app-control-cargos-oficina',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
   imports: [ReactiveFormsModule,MatIconModule, MatButtonModule, MatPaginator,MatTableModule,MatProgressSpinnerModule, MatCardModule, MatDatepickerModule, NgxMaterialTimepickerModule, DatePipe, MatTooltipModule],
  templateUrl: './control-cargos-oficina.component.html',
  styles: ``
})
export class ControlCargosOficinaComponent {

  public datosPrincipales: DatosPrincipales | null = null;
  public isFetchingData: boolean = false;
  public lisCntrCargoOfi: DataListadoControlCargosOfi[] =[];
  public comboListadoTipoDcmto:DataComboTpoDcmto[]=[];
  public comboListadoOficnOrigen:DataComboOfcnOrigen[]=[];
  public comboListadoDepartamento:DataComboDepartamento[]=[];
  public comboListadoProvincias:DataComboProvincias[]=[];
  public comboListadoDistritos:DataComboDistritos[]=[];

  public myFormControlCargosOfi:FormGroup = this.fb.group({
    fechaInicio : [""],
    fechaFin : [""],
    horaInicio:[""],
    horaFin:[""],
    ChxfRespuesta: [0],
    fEntrega : [0],
    Codificacion : [""],
    Nombre : [""],
    Direccion : [""],
    CodTipoDoc : [0],
    NumGuiaservicio : [""],
    FlgUrgente : [0],
    CodTrabajadorEnvio : [0],
    FlgLocal : [0],
    FlgNacional : [0],
    FlgInternacional : [0],
    CodOficina : [0],
    FlgEstado : [0],
    CodDepartamento : [""],
    CodProvincia : [""],
    CodDistrito : [""],
    Columna : [""],
    Idir : [""],
    CodOficinaLogin : [0],
  })
  
  public displayedColumns: string[] = ['Fecha', 'Ofi_Origen','Documento','Asunto','Destinatario', 'Direccion', 'Fcha_aceptacion', 'Entrega', 'Estado', 'Acciones'];
  public dataSource = new MatTableDataSource<DataListadoControlCargosOfi>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private consultaService = inject(ConsultaService)
  private perfilesService = inject(PerfilesService);

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private matPaginatorIntl: MatPaginatorIntl,
    
  ){};

  ngOnInit(): void {
    this.datosPrincipales = this.perfilesService.getDatosPrincipales();
    this.getListadoComboTpoDcmto();
    this.getListadoComboOfcnOrigen();
    this.getListadoComboDepartamento();

    this.myFormControlCargosOfi.patchValue({
      fechaInicio: moment().toDate(),
      fechaFin: moment().toDate(),
      horaInicio:"00:00",
      horaFin: "23:59",
      CodOficinaLogin: this.datosPrincipales.id_oficina,
    })

    this.onSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {
    this.isFetchingData = true;
    const {fechaInicio,fechaFin,horaInicio,horaFin,ChxfRespuesta,fEntrega,Codificacion,Nombre,Direccion,CodTipoDoc,NumGuiaservicio,FlgUrgente ,CodTrabajadorEnvio,FlgLocal,FlgNacional,FlgInternacional,CodOficina,FlgEstado,CodDepartamento,CodProvincia,CodDistrito,Columna,Idir,CodOficinaLogin} = this.myFormControlCargosOfi.value;

    const fechaInicioStr = moment(fechaInicio).format('YYYY-MM-DD');
    const fechaFinStr = moment(fechaFin).format('YYYY-MM-DD');
    const fDesde = `${fechaInicioStr}T${horaInicio}:00.000`;
    const fHasta = `${fechaFinStr}T${horaFin}:00.000`;
    const cCodificacion = Codificacion 
    const cNombre = Nombre 
    const cDireccion = Direccion 
    const cNumGuiaservicio = NumGuiaservicio
    const cDepartamento = CodDepartamento 
    const cProvincia = CodProvincia
    const cDistrito = CodDistrito
    const cColumna  = Columna 
    const cIdir  = Idir 

    const formularioEnviar:FormularioControlCargosOfi = {
      fDesde: fDesde,
      fHasta: fHasta,
      ChxfRespuesta: parseInt(ChxfRespuesta),
      fEntrega: parseInt(fEntrega),
      Codificacion: cCodificacion,
      Nombre: cNombre,
      Direccion: cDireccion,
      CodTipoDoc: parseInt(CodTipoDoc),
      NumGuiaservicio:cNumGuiaservicio,
      FlgUrgente: parseInt(FlgUrgente),
      CodTrabajadorEnvio: parseInt(CodTrabajadorEnvio),
      FlgLocal: parseInt(FlgLocal),
      FlgNacional: parseInt(FlgNacional),
      FlgInternacional: parseInt(FlgInternacional),
      CodOficina: parseInt(CodOficina),
      FlgEstado: parseInt(FlgEstado),
      CodDepartamento:cDepartamento,
      CodProvincia:cProvincia,
      CodDistrito: cDistrito,
      Columna:cColumna,
      Idir: cIdir,
      CodOficinaLogin: CodOficinaLogin,
    }

    console.log(formularioEnviar)
    this.consultaService.getConsultaControlCargosOfi(formularioEnviar).subscribe(
      (rpta)=>{
        this.lisCntrCargoOfi = rpta;
        this.dataSource.data = this.lisCntrCargoOfi;
        this.isFetchingData = false;
        console.log(rpta)
        console.log(this.lisCntrCargoOfi)
      }
    )
  }

  
  getListadoComboTpoDcmto(){
    this.consultaService.getListadoComboTpoDcmto().subscribe(
      (rpta)=>{
        this.comboListadoTipoDcmto = rpta;
      }
    )
  }

  getListadoComboOfcnOrigen(){
    this.consultaService.getListadoComboOfcnOrigen().subscribe(
      (rpta)=>{
        this.comboListadoOficnOrigen = rpta;
      }
    )
  }

  getListadoComboDepartamento(){
    this.consultaService.getListadoComboDepartamento().subscribe(
      (rpta)=>{
        this.comboListadoDepartamento = rpta;
      }
    )
  }

  getListadoComboProvincias(event:any){
  
    const codProvincia=event.target.value
    // console.log(codProvincia)
    if(codProvincia){
      this.consultaService.getListadoComboProvincias(codProvincia).subscribe(
        (rpta)=>{
          this.comboListadoProvincias = rpta;
        }
      )
    } 
  }

  getListadoComboDistritos(event:any){

    const codDistrito=event.target.value
    //  console.log(codDistrito)
    this.consultaService.getListadoComboDistritos(codDistrito).subscribe(
      (rpta)=>{
        this.comboListadoDistritos = rpta;
      }
    )
  }

  reset(){
    this.myFormControlCargosOfi.patchValue({
      fechaInicio:moment().toDate(),
      fechaFin:moment().toDate(),
      horaInicio:"00:00",
      horaFin:"23:59",
      ChxfRespuesta: 0,
      fEntrega : 0,
      Codificacion : "",
      Nombre : "",
      Idireccion : "",
      CodTipoDoc : 0,
      NumGuiaservicio : "",
      FlgUrgente : 0,
      CodTrabajadorEnvio : 0,
      FlgLocal : 0,
      FlgNacional : 0,
      FlgInternacional : 0,
      CodOficina : 0,
      FlgEstado :0,
      CodDepartamento : "",
      CodProvincia : "",
      CodDistrito : "",
      Columna : "Fecha",
      Idir : "",
      CodOficinaLogin: 143,
    })
    this.onSearch();
  }

}
