import { Component, inject, ViewChild } from '@angular/core';
import { DataComboTpoDcmto, DataListadoComboTipoDocumento, DataListadoControlCargos, FormularioControlCargos } from '../../interfaces/consulta';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConsultaService } from '../../services/consulta-interno-oficina.service';
import moment from 'moment';

@Component({
  selector: 'app-control-cargos',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: { parse: { dateInput: 'DD/MM/YYYY' }, display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMM YYYY' } } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
   ],
   imports: [ReactiveFormsModule,MatIconModule, MatButtonModule, MatPaginator,MatTableModule,MatProgressSpinnerModule, MatCardModule, MatDatepickerModule, NgxMaterialTimepickerModule, DatePipe, MatTooltipModule],
  templateUrl: './control-cargos.component.html',
  styles: ``
})
export class ControlCargosComponent  {

  public isFetchingData: boolean = false;
  public lisCntrCargo: DataListadoControlCargos[] =[];
  public comboListadoTipoDcmto:DataComboTpoDcmto[]=[];

  public myFormControlCargos:FormGroup = this.fb.group({
      fechaInicio : [""],
      fechaFin : [""],
      horaInicio:[""],
      horaFin:[""],
      ChxfRespuesta: [0],
      fEntrega : [0],
      Codificacion : [""],
      Nombre : [""],
      Idireccion : [""],
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
      Columna : ["Fecha"],
      Idir : [""],
  })

  public displayedColumns: string[] = ['Fecha', 'Ofi_Origen', 'Documento' , 'Destinatario', 'Direccion', 'Fcha_aceptacion', 'Entrega', 'Estado'];
    public dataSource = new MatTableDataSource<DataListadoControlCargos>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private consultaService = inject(ConsultaService)

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

    this.getListadoComboTpoDcmto();

    this.myFormControlCargos.patchValue({
      fechaInicio: moment().toDate(),
      fechaFin: moment().toDate(),
      horaInicio:"00:00",
      horaFin: "23:59",
      CodOficinaLogin:143
    })

    this.onSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  onSearch() {
    this.isFetchingData = true;
    // console.log(this.myFormConsultaInternoOficina.value)
    const {fechaInicio,fechaFin,horaInicio,horaFin,ChxfRespuesta,fEntrega,Codificacion,Nombre,Idireccion,CodTipoDoc,NumGuiaservicio,FlgUrgente ,CodTrabajadorEnvio,FlgLocal,FlgNacional,FlgInternacional,CodOficina,FlgEstado,CodDepartamento,CodProvincia,CodDistrito,Columna,Idir} = this.myFormControlCargos.value;

    const fechaInicioStr = moment(fechaInicio).format('YYYY-MM-DD');
    const fechaFinStr = moment(fechaFin).format('YYYY-MM-DD');
    const fDesde = `${fechaInicioStr}T${horaInicio}`;
    const fHasta = `${fechaFinStr}T${horaFin}`;
    const cCodificacion = Codificacion ? Codificacion : "%%";
    const cNombre = Nombre ? Nombre : "%%";
    const cDireccion = Idireccion ? Idireccion : "%%";
    const cNumGuiaservicio = NumGuiaservicio ? NumGuiaservicio : "%%";
    const cDepartamento = CodDepartamento ? CodDepartamento : "%%";
    const cProvincia = CodProvincia ? CodProvincia : "%%";
    const cDistrito = CodDistrito ? CodDistrito : "%%";
    const cColumna  = Columna  ? Columna  : "%%";
    const cIdir  = Idir  ? Idir  : "%%";

    const formularioEnviar:FormularioControlCargos = {
      fDesde: fDesde,
      fHasta: fHasta,
      ChxfRespuesta: parseInt(ChxfRespuesta),
      fEntrega: parseInt(fEntrega),
      Codificacion: cCodificacion,
      Nombre: cNombre,
      Idireccion: cDireccion,
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
    }

    // console.log(formularioEnviar)
    this.consultaService.getConsultaControlCargos(formularioEnviar).subscribe(
      (rpta)=>{
        this.lisCntrCargo = rpta;
        this.dataSource.data = this.lisCntrCargo;
        this.isFetchingData = false;
        var arrayICodTramite = this.lisCntrCargo.map(function(objeto) {
          return objeto.iCodTramite;
        });
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

}