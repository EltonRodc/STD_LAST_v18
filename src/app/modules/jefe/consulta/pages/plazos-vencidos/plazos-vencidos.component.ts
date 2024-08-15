import { Component, inject, ViewChild } from '@angular/core';
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
import { DataCmbTpoDcmto, DataComboOfcnOrigen, DataListadoComboTemas, DataListadoPlazoVencidos, FormularioPlazoVencidos } from '../../interfaces/consulta';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';


@Component({
  selector: 'app-plazos-vencidos',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [ReactiveFormsModule,MatIconModule, MatButtonModule, MatPaginator,MatTableModule,MatProgressSpinnerModule, MatCardModule, MatDatepickerModule, NgxMaterialTimepickerModule, DatePipe, MatTooltipModule],
  templateUrl: './plazos-vencidos.component.html',
})
export class PlazosVencidosComponent {

  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;
  public lisPlzoVencido: DataListadoPlazoVencidos[] =[];
  public comboListadoTema:DataListadoComboTemas[]=[];
  public comboListadoOficina:DataComboOfcnOrigen[]=[];
  public comboListadoTpoDcmto:DataCmbTpoDcmto[]=[];

  public myFormConsultaPlazoVencidos:FormGroup = this.fb.group({
    fechaInicio : [""],
    fechaFin : [""],
    horaInicio:[""],
    horaFin:[""],
    Codificacion : [""],
    NroDocumento : [""],
    Asunto : [""],
    CodTupa : [0],
    CodTipoDoc : [0],
    CodOficinario : [0],
    CodOficinaDes : [0],
    CodTrabajadoresponsable : [0],
    CodTema : [0],
    InicioPagina : [0],
    SizePagina : [100],
  })

  public displayedColumns: string[] = ['N_tramite','Tipo','Fecha','DiasProgra','DiasEjecutados','Estado','Resultado','Asunto','Acciones'];
  public dataSource = new MatTableDataSource<DataListadoPlazoVencidos>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private consultaService = inject(ConsultaService)



  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private matPaginatorIntl: MatPaginatorIntl,
    
  ){};

  ngOnInit(): void {

    this.getListadoComboTema();
    this.getListadoComboOficina();
    this.getListadoComboTpoDcmto();

    this.myFormConsultaPlazoVencidos.patchValue({
      fechaInicio: moment().toDate(),
      fechaFin: moment().toDate(),
      horaInicio:"00:00",
      horaFin: "23:59",
      // CodOficinaLogin:143
    })

    this.onSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {

    this.isFetchingData = true;
    // console.log(this.myFormConsultaInternoOficina.value)
    const {fechaInicio,fechaFin,horaInicio,horaFin,Codificacion,NroDocumento,Asunto,CodTupa,CodTipoDoc,CodOficinario,CodOficinaDes,CodTrabajadoresponsable,CodTema,InicioPagina,SizePagina} = this.myFormConsultaPlazoVencidos.value;

    const fechaInicioStr = moment(fechaInicio).format('YYYY-MM-DD');
    const fechaFinStr = moment(fechaFin).format('YYYY-MM-DD');
    const fDesde = `${fechaInicioStr}T${horaInicio}:00.000`;
    const fHasta = `${fechaFinStr}T${horaFin}:00.000`;
    const codificacion = Codificacion;
    const nroDoc = NroDocumento;
    const asunt = Asunto ;

    const formularioEnviar:FormularioPlazoVencidos = {
      fDesde: fDesde,
      fHasta: fHasta,
      Codificacion:codificacion,
      NroDocumento:nroDoc,
      Asunto: asunt,
      CodTupa: parseInt(CodTupa),
      CodTipoDoc: parseInt(CodTipoDoc),
      CodOficinario: CodOficinario,
      CodOficinaDes: parseInt(CodOficinaDes),
      CodTrabajadoresponsable: parseInt(CodTrabajadoresponsable),
      CodTema: parseInt(CodTema),
      InicioPagina: InicioPagina,
      SizePagina: SizePagina,
    }

    console.log(formularioEnviar)
    this.consultaService.getConsultaPlazoVencidos(formularioEnviar).subscribe(
      (rpta)=>{
        this.lisPlzoVencido = rpta;
        this.dataSource.data = this.lisPlzoVencido;
        this.isFetchingData = false;
        console.log(this.lisPlzoVencido)
      }
    )
  }

  getListadoComboTema(){
    this.consultaService.getListadoComboTemas().subscribe(
      (rpta)=>{
        this.comboListadoTema = rpta;
      }
    )
  }

  getListadoComboOficina(){
    this.consultaService.getListadoComboOfcnOrigen().subscribe(
      (rpta)=>{
        this.comboListadoOficina = rpta;
      }
    )
  }

  getListadoComboTpoDcmto(){
    this.consultaService.getListadoCbmbTpoDcmto().subscribe(
      (rpta)=>{
        this.comboListadoTpoDcmto = rpta;
      }
    )
  }

  reset(){
    this.myFormConsultaPlazoVencidos.patchValue({
      fechaInicio:moment().toDate(),
      fechaFin:moment().toDate(),
      horaInicio:"00:00",
      horaFin:"23:59",
      Codificacion : "",
      NroDocumento : "",
      Asunto : "",
      CodTupa : 0,
      CodTipoDoc : 0,
      CodOficinario : 0,
      CodOficinaDes : 0,
      CodTrabajadoresponsable : 0,
      CodTema : 0,
      InicioPagina : 0,
      SizePagina : 100,
   })
    this.onSearch();
  }

}
