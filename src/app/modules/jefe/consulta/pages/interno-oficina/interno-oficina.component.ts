import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { DataListCoInterno, DataOficinaCoInterno } from '../../interfaces/consulta-interno-oficina.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DataListadoComboOficina, DataListadoComboTemas, DataListadoComboTipoDocumento, DataResultadoOficinaInterno, FormularioInternoOficina } from '../../interfaces/consulta';
import { ConsultaService } from '../../services/consulta-interno-oficina.service';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PerfilesService } from '../../../../../core/services/perfiles.service';
import { DatosPrincipales } from '../../../../../core/interfaces/perfiles.interface';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';

@Component({
  selector: 'app-interno-oficina',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [ReactiveFormsModule,MatIconModule, MatButtonModule, MatPaginator,MatTableModule,MatProgressSpinnerModule, MatCardModule, MatDatepickerModule, NgxMaterialTimepickerModule, DatePipe, MatTooltipModule],
  templateUrl: './interno-oficina.component.html',
  styles: ``
})
export class InternoOficinaComponent{

  public datosPrincipales: DatosPrincipales | null = null;
  public dataDocAdjutnos:any[] = []
  public comboListadoTpoDcmto:DataListadoComboTipoDocumento[]=[];
  public comboListadoDestino:DataListadoComboOficina[]=[];
  public comboListadoTema:DataListadoComboTemas[]=[];
  public varaible_length: number = 0;
  public variable_pageSize: number = 0;
  public isFetchingData: boolean = false;
  public lisDocOficina: DataResultadoOficinaInterno[] =[];
  public idOficinaParametro:number =0;

  public myFormConsultaInternoOficina:FormGroup = this.fb.group({
    fechaInicio : [""],
    fechaFin : [""],
    horaInicio:[""],
    horaFin:[""],
    si : [false],
    no : [false],
    nTramite : [""],
    cCodificacion : [""],
    asunto : [""],
    observaciones : [""],
    codTipoDoc : [0],
    codOficina : [0],
    codOficinaLogin : [0],
    codTema : [0],
    regini : [0],
    size : [100],
  })

  public displayedColumns: string[] = ['N_tramite', 'Tipo', 'Asunto' , 'Oficina' , 'Adjunto' ,'Opciones'];
  public dataSource = new MatTableDataSource<DataResultadoOficinaInterno>();
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
    this.getListadoComboDestino();
    this.getListadoComboTema();

    this.myFormConsultaInternoOficina.patchValue({
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
    // console.log(this.myFormConsultaInternoOficina.value)
    const {fechaInicio,fechaFin,horaInicio,horaFin, si,no,nTramite,cCodificacion,asunto,observaciones,codTipoDoc,codOficina,codOficinaLogin, codTema, regini, size} = this.myFormConsultaInternoOficina.value;

    const fechaInicioStr = moment(fechaInicio).format('YYYY-MM-DD');
    const fechaFinStr = moment(fechaFin).format('YYYY-MM-DD');
    const fDesde = `${fechaInicioStr}T${horaInicio}`;
    const fHasta = `${fechaFinStr}T${horaFin}`;
    const siNumber = si ? 1 : 0;
    const noNumber = no ? 1 : 0;
    const tramite = nTramite ? nTramite : "%%";
    const codificacion = cCodificacion ? cCodificacion : "%%";
    const asunt = asunto ? asunto : "%%";
    const observac = observaciones ? observaciones : "%%";

    const formularioEnviar:FormularioInternoOficina = {
      fDesde: fDesde,
      fHasta: fHasta,
      SI: siNumber,
      NO: noNumber,
      nTramite: tramite,
      cCodificacion:codificacion,
      Asunto:asunt,
      Observaciones: observac,
      CodTipoDoc: parseInt(codTipoDoc),
      CodOficina: parseInt(codOficina),
      CodOficinaLogin: codOficinaLogin,
      CodTema: parseInt(codTema),
      Regini: regini,
      Size: size,
    }

    // console.log(formularioEnviar)
    this.consultaService.getConsultaInternoOficina(formularioEnviar).subscribe(
      (rpta)=>{
        this.lisDocOficina = rpta;
        this.dataSource.data = this.lisDocOficina;
        this.isFetchingData = false;
        var arrayICodTramite = this.lisDocOficina.map(function(objeto) {
          return objeto.iCodTramite;
        });

        forkJoin(arrayICodTramite.map(codTramite => this.consultaService.getDocumentosAdjuntos(codTramite))).subscribe(
          (rpta)=>{
            this.dataDocAdjutnos = rpta;
            // console.log(this.dataDocAdjutnos)
          }
        )

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

  getListadoComboDestino(){
    this.consultaService.getListadoComboOficinas().subscribe(
      (rpta)=>{
        this.comboListadoDestino = rpta;
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



  reset(){
    this.myFormConsultaInternoOficina.patchValue({
      fechaInicio:moment().toDate(),
      fechaFin:moment().toDate(),
      horaInicio:"00:00",
      horaFin:"23:59",
      si:false,
      no:false,
      nTramite:"",
      cCodificacion:"",
      asunto:"",
      observaciones:"",
      codTipoDoc:0,
      codOficina:0,
      codOficinaLogin:143,
      codTema:0,
      regini:0,
      size:100
    })
    this.onSearch();
  }

}
