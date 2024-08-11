import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DataListadoComboTipoDocumento, DataListadoDocSalida, FormularioDocumentoSalida } from '../../interfaces/consulta';
import moment from 'moment';
import { ConsultaService } from '../../services/consulta-interno-oficina.service';

@Component({
  selector: 'app-salida-oficina',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: { parse: { dateInput: 'DD/MM/YYYY' }, display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMM YYYY' } } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
   ],
  imports: [ReactiveFormsModule,MatIconModule, MatButtonModule, MatPaginator,MatTableModule,MatProgressSpinnerModule, MatCardModule, MatDatepickerModule, NgxMaterialTimepickerModule, DatePipe, MatTooltipModule],
  templateUrl: './salida-oficina.component.html',
  styles: ``
})
export class SalidaOficinaComponent implements OnInit {

  public comboListadoTpoDcmto:DataListadoComboTipoDocumento[]=[];
  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;
  public lisDocSalida: DataListadoDocSalida[] =[];


  public myFormConsultaSalidaOficina:FormGroup = this.fb.group({
    fechaInicio : [""],
    fechaFin : [""],
    horaInicio:[""],
    horaFin:[""],
    RespuestasI : [false],
    RespuestaNO : [false],
    Codificacion : [""],
    Asunto : [""],
    Observaciones : [""],
    CodTipoDoc : [0],
    cNombre : [""],
    Respuesta : [0],
    RegistroPersonal : [0],
    RegistroSolicitado : [0],
    CodOficinaLogin : [143],
    Columna : ["Fecha"],
    Idir : ["DES"],
    NTramite : [""],
    Referencia : [""],
  })

  public displayedColumns: string[] = ['Tramite', 'Tipo', 'Asunto' , 'Direccion' , 'Destino' , 'Requiere', 'Archivos' ,'Opciones'];
  public dataSource = new MatTableDataSource<DataListadoDocSalida>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private consultaService = inject(ConsultaService)

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private matPaginatorIntl: MatPaginatorIntl,
  ){

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

    this.myFormConsultaSalidaOficina.patchValue({
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

  onSearch(){

    this.isFetchingData = true;
    const {fechaInicio,fechaFin,horaInicio,horaFin,RespuestasI,RespuestaNO,Codificacion,Asunto,Observaciones,CodTipoDoc,cNombre,Respuesta,RegistroPersonal,RegistroSolicitado,CodOficinaLogin,Columna,Idir,NTramite,Referencia} = this.myFormConsultaSalidaOficina.value;

    const fechaInicioStr = moment(fechaInicio).format('YYYY-MM-DD');
    const fechaFinStr = moment(fechaFin).format('YYYY-MM-DD');
    const fDesde = `${fechaInicioStr}T${horaInicio}:00.000`;
    const fHasta = `${fechaFinStr}T${horaFin}:00.000`;
    const siNumber = RespuestasI ? 1 : 0;
    const noNumber = RespuestaNO ? 1 : 0;
    const codificacion = Codificacion;
    const asunt = Asunto; 
    const observac = Observaciones;
    const nom = cNombre;
    const cColumna  = Columna 
    const cIdir  = Idir 
    const tramite = NTramite;
    const ref = Referencia;

    const formularioEnviar:FormularioDocumentoSalida = {
      fDesde: fDesde,
      fHasta: fHasta,
      RespuestasI: siNumber,
      RespuestaNO: noNumber,
      Codificacion:codificacion,
      Asunto:asunt,
      Observaciones: observac,
      CodTipoDoc: parseInt(CodTipoDoc),
      cNombre: nom,
      Respuesta: parseInt(Respuesta),
      RegistroPersonal: parseInt(RegistroPersonal),
      RegistroSolicitado: parseInt(RegistroSolicitado),
      CodOficinaLogin: CodOficinaLogin,
      NTramite: tramite,
      Columna: cColumna,
      Idir: cIdir,
      Referencia: ref,
    }

      // console.log(formularioEnviar)
    this.consultaService.getConsultaSalidaOficina(formularioEnviar).subscribe(
      (rpta)=>{
        this.lisDocSalida = rpta;
        this.dataSource.data = this.lisDocSalida;
        this.isFetchingData = false;
        // console.log(this.lisDocSalida)
        // console.log(this.dataSource.data)
      }
    )

  }

  getListadoComboTpoDcmto(){
    this.consultaService.getListadoComboTipoDocumento().subscribe(
      (rpta)=>{
        this.comboListadoTpoDcmto = rpta;
      }
    )
  }

  reset(){
    this.myFormConsultaSalidaOficina.patchValue({
      fechaInicio:moment().toDate(),
      fechaFin:moment().toDate(),
      horaInicio:"00:00",
      horaFin:"23:59",
      RespuestasI:false,
      RespuestaNO:false,
      Codificacion : "",
      Asunto : "",
      Observaciones : "",
      CodTipoDoc : 0,
      cNombre : "",
      Respuesta : 0,
      RegistroPersonal : 0,
      RegistroSolicitado : 0,
      CodOficinaLogin : 143,
      Columna : "Fecha",
      Idir : "DES",
      NTramite : "",
      Referencia : "",
    })
    this.onSearch();
  }

}
