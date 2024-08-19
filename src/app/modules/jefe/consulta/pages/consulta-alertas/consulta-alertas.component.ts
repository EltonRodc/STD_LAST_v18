import { Component, inject, ViewChild } from '@angular/core';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ConsultaService } from '../../services/consulta-interno-oficina.service';
import { DataCmbResponsable, DataCmbTpoDcmto, DataCmbTupa, DataComboOfcnOrigen, DataListadoAlertas, FormularioAlertas } from '../../interfaces/consulta';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta-alertas',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinner,
    MatPaginator,
    DatePipe,
    MatTooltipModule,
    RouterLink,
    MatTooltipModule
  ],
  templateUrl: './consulta-alertas.component.html',
  styles: ``
})
export class ConsultaAlertasComponent {

  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;
  public lisAlertas: DataListadoAlertas[] =[];
  public comboListadoOficina:DataComboOfcnOrigen[]=[];
  public comboListadoTpoDcmto:DataCmbTpoDcmto[]=[];
  public comboListadoResponsable:DataCmbResponsable[]=[];
  public comboListadoTupa:DataCmbTupa[]=[];

  public myFormConsultaAlertas:FormGroup = this.fb.group({
    fechaInicio : [""],
    fechaFin : [""],
    horaInicio:[""],
    horaFin:[""],
    Codificacion : [""],
    NroDocumento : [""],
    Asunto : [""],
    CodTupa : [0],
    CodTipoDoc : [0],
    CodOficinaOri : [0],
    CodOficinaDes : [0],
    CodTrabajadoresponsable : [0],
    Columna : [""],
    Idir : [""],
  })

  public displayedColumns: string[] = ['tramite','Tipo','DiasProgra','DiasEjecutados','Estado','Resultado','Asunto'];
  public dataSource = new MatTableDataSource<DataListadoAlertas>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private consultaService = inject(ConsultaService)

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private matPaginatorIntl: MatPaginatorIntl,
    
  ){};

  ngOnInit(): void {

    this.getListadoComboOficina();
    this.getListadoCmbTpoDcmto();
    this.getListadoCmbResponsable();
    this.getListadoComboTupa();

    this.myFormConsultaAlertas.patchValue({
      fechaInicio: moment().toDate(),
      fechaFin: moment().toDate(),
      horaInicio:"00:00",
      horaFin: "23:59",
    })

    this.onSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {

    this.isFetchingData = true;
    // console.log(this.myFormConsultaInternoOficina.value)
    const {fechaInicio,fechaFin,horaInicio,horaFin,Codificacion,NroDocumento,Asunto,CodTupa,CodTipoDoc,CodOficinaOri,CodOficinaDes,CodTrabajadoresponsable,Columna,Idir} = this.myFormConsultaAlertas.value;

    const fechaInicioStr = moment(fechaInicio).format('YYYY-MM-DD');
    const fechaFinStr = moment(fechaFin).format('YYYY-MM-DD');
    const fDesde = `${fechaInicioStr}T${horaInicio}:00.000`;
    const fHasta = `${fechaFinStr}T${horaFin}:00.000`;
    const codificacion = Codificacion;
    const nroDoc = NroDocumento;
    const asunt = Asunto ;
    const columna = Columna ;
    const idir = Idir ;

    const formularioEnviar:FormularioAlertas = {
      fDesde: fDesde,
      fHasta: fHasta,
      Codificacion:codificacion,
      NroDocumento:nroDoc,
      Asunto: asunt,
      CodTupa: parseInt(CodTupa),
      CodTipoDoc: parseInt(CodTipoDoc),
      CodOficinaOri: parseInt(CodOficinaOri),
      CodOficinaDes: parseInt(CodOficinaDes),
      CodTrabajadoresponsable: parseInt(CodTrabajadoresponsable),
      Columna: columna,
      Idir: idir,
    }

    // console.log(formularioEnviar)
    this.consultaService.getConsultaAlertas(formularioEnviar).subscribe(
      (rpta)=>{
        this.lisAlertas = rpta;
        this.dataSource.data = this.lisAlertas;
        this.isFetchingData = false;
        // console.log(this.lisAlertas)
      }
    )
  }

  reset(){
    this.myFormConsultaAlertas.patchValue({
      fechaInicio:moment().toDate(),
      fechaFin:moment().toDate(),
      horaInicio:"00:00",
      horaFin:"23:59",
      Codificacion : "",
      NroDocumento : "",
      Asunto : "",
      CodTupa : 0,
      CodTipoDoc : 0,
      CodOficinaOri : 0,
      CodOficinaDes : 0,
      CodTrabajadoresponsable : 0,
      Columna : "",
      Idir : "",
   })
    this.onSearch();
  }

  getListadoComboOficina(){
    this.consultaService.getListadoComboOfcnOrigen().subscribe(
      (rpta)=>{
        this.comboListadoOficina = rpta;
      }
    )
  }

  getListadoCmbTpoDcmto(){
    this.consultaService.getListadoCmbDcmto().subscribe(
      (rpta)=>{
        this.comboListadoTpoDcmto = rpta;
      }
    )
  }

  getListadoCmbResponsable(){
    this.consultaService.getListadoCmbResponsable().subscribe(
      (rpta)=>{
        this.comboListadoResponsable = rpta;
      }
    )
  }

  getListadoComboTupa(){
    this.consultaService.getListadoCmbTupa().subscribe(
      (rpta)=>{
        this.comboListadoTupa = rpta;
      }
    )
  }


}
