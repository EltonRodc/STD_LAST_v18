import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DataComboOfcnOrigen, DataListadoComboTemas, DataListadoComboTipoDocumento, DataListadoDocInternoGeneral, FormularioDocInternoGeneral } from '../../interfaces/consulta';
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
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';

@Component({
  selector: 'app-interno-generales',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
   imports: [ReactiveFormsModule,MatIconModule, MatButtonModule, MatPaginator,MatTableModule,MatProgressSpinnerModule, MatCardModule, MatDatepickerModule, NgxMaterialTimepickerModule, DatePipe, MatTooltipModule],
   templateUrl: './interno-generales.component.html',
  styles: ``
})
export class InternoGeneralesComponent implements OnInit {

  public comboListadoTpoDcmto:DataListadoComboTipoDocumento[]=[];
  public comboListadoTema:DataListadoComboTemas[]=[];
  public comboListadoOficina:DataComboOfcnOrigen[]=[];
  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;
  public lisDocGeneral: DataListadoDocInternoGeneral[] =[];

  // public myFormConsultaInternoGeneral:FormGroup = this.fb.group({
  //   fechaInicio : ["2024-02-20"],
  //   fechaFin : ["2024-07-29"],
  //   horaInicio:["11:52"],
  //   horaFin:["11:52"],
  //   SI : [""],
  //   NO : [""],
  //   Codificacion : [""],
  //   NroDocumento : [""],
  //   Asunto : [""],
  //   Observaciones : [""],
  //   CodTipoDoc : [19],
  //   CodOficinaori : [0],
  //   CodOficinaDes : [0],
  //   CodTema : [0],
  //   Gerencia : [0],
  //   ParteDiario : [""],
  //   CUI : [""],
  //   Regini : [0],
  //   Size : [100],
  // })

  public myFormConsultaInternoGeneral:FormGroup = this.fb.group({
    fechaInicio : [""],
    fechaFin : [""],
    horaInicio:[""],
    horaFin:[""],
    SI : [""],
    NO : [""],
    Codificacion : [""],
    NroDocumento : [""],
    Asunto : [""],
    Observaciones : [""],
    CodTipoDoc : [0],
    CodOficinaori : [0],
    CodOficinaDes : [0],
    CodTema : [0],
    Gerencia : [0],
    ParteDiario : [""],
    CUI : [""],
    Regini : [0],
    Size : [100],
  })

  public displayedColumns: string[] = ['N_tramite','Ofi_origen','Documento' ,'Asunto' , 'Ofi_Destino' ,'Opciones'];
  public dataSource = new MatTableDataSource<DataListadoDocInternoGeneral>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private consultaService = inject(ConsultaService)

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private matPaginatorIntl: MatPaginatorIntl,
    
  ){};

  ngOnInit(): void {

    this.getListadoComboTpoDcmto();
    this.getListadoComboTema();
    this.getListadoComboOficina();

    this.myFormConsultaInternoGeneral.patchValue({
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
    const {fechaInicio,fechaFin,horaInicio,horaFin,SI,NO,Codificacion,NroDocumento,Asunto,Observaciones,CodTipoDoc,CodOficinaori,CodOficinaDes,CodTema,Gerencia,ParteDiario,CUI,Regini,Size} = this.myFormConsultaInternoGeneral.value;

    const fechaInicioStr = moment(fechaInicio).format('YYYY-MM-DD');
    const fechaFinStr = moment(fechaFin).format('YYYY-MM-DD');
    const fDesde = `${fechaInicioStr}T${horaInicio}:00.000`;
    const fHasta = `${fechaFinStr}T${horaFin}:00.000`;
    const siNumber = SI 
    const noNumber = NO 
    const codificacion = Codificacion 
    const nroDcmto = NroDocumento 
    const asunt = Asunto
    const observac = Observaciones
    const parteDiario = ParteDiario
    const cui = CUI
    const regini = Regini
    const size = Size

    const formularioEnviar:FormularioDocInternoGeneral = {
      fDesde: fDesde,
      fHasta: fHasta,
      SI: siNumber,
      NO: noNumber,
      Codificacion:codificacion,
      NroDocumento: nroDcmto,
      Asunto:asunt,
      Observaciones: observac,
      CodTipoDoc: parseInt(CodTipoDoc),
      CodOficinaori: parseInt(CodOficinaori),
      CodOficinaDes: CodOficinaDes,
      CodTema: parseInt(CodTema),
      Gerencia: parseInt(Gerencia),
      ParteDiario: parteDiario,
      CUI: cui,
      Regini: regini,
      Size: size,
    }

    // console.log(formularioEnviar)
    this.consultaService.getConsultaInternoGeneral(formularioEnviar).subscribe(
      (rpta)=>{
        this.lisDocGeneral = rpta;
        this.dataSource.data = this.lisDocGeneral;
        this.isFetchingData = false;
        // console.log(this.lisDocGeneral)
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

  reset(){
    this.myFormConsultaInternoGeneral.patchValue({
      fechaInicio:moment().toDate(),
      fechaFin:moment().toDate(),
      horaInicio:"00:00",
      horaFin:"23:59",
      SI : "",
      NO : "",
      Codificacion : "",
      NroDocumento : "",
      Asunto : "",
      Observaciones : "",
      CodTipoDoc : 0,
      CodOficinaori : 0,
      CodOficinaDes : 0,
      CodTema : 0,
      Gerencia : 0,
      ParteDiario : "",
      CUI : "",
      Regini : 0,
      Size : 100,
    })
    this.onSearch();
  }
}
