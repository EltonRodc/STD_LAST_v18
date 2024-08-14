import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { EntradasGeneralesService } from '../../services/entradas-generales.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataAuth } from '../../../../../core/interfaces/auth';
import { AuthDataService } from '../../../../../core/services/auth-data.service';
import { MatCardModule } from '@angular/material/card';
import { DataListadoComboTipoDocumento } from '../../../../jefe/consulta/interfaces/consulta';
import { ConsultaService } from '../../../../jefe/consulta/services/consulta-interno-oficina.service';
import { RegistroPvdService } from '../../../registro/services/registro-pvd.service';
import { DataComboTemas, DataDocumentoRegistrado, DataOficinasDerivadas } from '../../../registro/interfaces/registro-pvd.interface';
import { DataConsultaBandejaEnlace, DataOficinasRcc, DataRegistrador } from '../../interfaces/entradas-generales.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-entradas-generales',
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
    MatTooltipModule
  ],
  templateUrl: './entradas-generales.component.html',
  styles: ``
})
export class EntradasGeneralesComponent implements OnInit, AfterViewInit{

  public authData!: DataAuth | null;
  public comboListadoTpoDcmto:DataListadoComboTipoDocumento[]=[];
  public comboOficinasPVD : DataOficinasDerivadas[] = [];
  public comboRegistradores: DataRegistrador[] = [];
  public listComboTemas: DataComboTemas[] = [];
  public consultaBndjEnlace:DataConsultaBandejaEnlace[] =[];
  public isFetchingData: boolean = false;
  public infoRegistroOficinas: DataDocumentoRegistrado[] = [];
  public comboOfinasRcss: DataOficinasRcc[] = [];

  public myFormBandejaEnlace:FormGroup =this.fb.group({
    FechaInicio: [""],                        //14 input
    FechaFin: [""],                           //15 input
    Codificacion: [""],                       //Primer input
    Referencia: [""],                         // Quinto input
    Asunto: [""],                             //Segundo input
    CodigoTupa: [0],
    CodigoTipoDocumento: [0],                 //Tercer Input
    CodigoRegistrador: [0],                   // 10 input
    Nombre: [""],                             // Institución 6 INPUT
    Remitente: [""],                          // Institución 7 INPUT
    CodigoOficinaOrigen: [0],                 // Octavo input
    CodigoOficinaDestino: [0],                // Nueve Input
    NumeroDocumento: [""],                    // Cuarto Input
    CodigoTema: [0],                          //11 input
    CUI: [""],                                // 12 INPUT
    Campo: [""],
    Orden: [""],
    NumContrato: [""],                        //13 input
    HoraIni: [""],                            //14 input
    HoraFin: [""],                            //15 input
    CodigoTipoRegistroDoc: [1],               // 16 input
  })

  ngOnInit(): void {
    this.authData = this.authDataService.getAuthData();
    if(this.authData){
      this.myFormBandejaEnlace.patchValue({
        CodigoRegistrador:this.authData.idUsuario,
        FechaInicio: moment().toDate(),
        FechaFin: moment().toDate(),
        HoraIni:"00:00",
        HoraFin:"23:59",
      })
    }
    this.getListadoComboTpoDcmto();
    this.getOficinas();
    this.getListRegistradores();
    this.getlistComboTemas();
    this.getListComboOficnsRcc();
    this.onConsulta();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public displayedColumns: string[] = ['n_tramite', 'documento','remitente','fecha_registro','oficina_derivada','asunto', 'acciones'];
  public dataSource = new MatTableDataSource<DataConsultaBandejaEnlace>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private authDataService = inject(AuthDataService);
  private entradasGeneralesService = inject(EntradasGeneralesService);
  private registroPvdService = inject(RegistroPvdService)
  private consultaService = inject(ConsultaService);
  private router = inject(Router);
  constructor(private fb: FormBuilder,public dialog: MatDialog){}


  onConsulta(){
    this.isFetchingData = true;
    const {FechaInicio,FechaFin,Codificacion,Referencia,Asunto,CodigoTupa,CodigoTipoDocumento,CodigoRegistrador,
      Nombre,Remitente,CodigoOficinaOrigen,CodigoOficinaDestino,NumeroDocumento,CodigoTema,
      CUI,Campo,Orden,NumContrato,HoraIni,HoraFin,CodigoTipoRegistroDoc} = this.myFormBandejaEnlace.value;

    this.entradasGeneralesService.getConsultaBandejaEnlace( this.formatFecha(FechaInicio),this.formatFecha(FechaFin),Codificacion,Referencia,Asunto,
      CodigoTupa,CodigoTipoDocumento,CodigoRegistrador,Nombre,Remitente,CodigoOficinaOrigen,CodigoOficinaDestino,
      NumeroDocumento,CodigoTema,CUI,Campo,Orden,NumContrato,HoraIni,HoraFin,CodigoTipoRegistroDoc).subscribe(
      (rpta)=>{
        // console.log(rpta)
        this.consultaBndjEnlace = rpta;

        var arrayICodTramite = this.consultaBndjEnlace.map(function(objeto) {
          return objeto.iCodTramite;
        });
        forkJoin(arrayICodTramite.map(idTramite => this.registroPvdService.getDetalleSegundoPaso(idTramite))).subscribe(
          (respuestas) => {
            this.infoRegistroOficinas = respuestas;
          },
        );
        this.dataSource.data = this.consultaBndjEnlace;
        this.isFetchingData = false;
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

  getOficinas(){
    this.registroPvdService.getComboOficinasDerivadas(0,"",0).subscribe(
      (rpta) => {
        this.comboOficinasPVD = rpta.sort((a, b) => (a.nombreOficina > b.nombreOficina) ? 1 : -1);
      }
    );
  }

  getListRegistradores(){
    this.entradasGeneralesService.getComboRegistrador().subscribe(
      (rpta)=>{
        this.comboRegistradores = rpta;
      }
    )
  }

  getlistComboTemas(){
    this.registroPvdService.getComboTemas().subscribe(
      (rpta)=>{
        this.listComboTemas = rpta;
      }
    )
  }

  getListComboOficnsRcc(){
    this.entradasGeneralesService.getComboOficinasRcc().subscribe(
      (rpta)=>{
        this.comboOfinasRcss = rpta;
      }
    )
  }

  private formatFecha(date: Date | null): string {
    return date ? moment(date).format('DD/MM/YYYY') : '';
  }

  reset(){
    this.myFormBandejaEnlace.patchValue({
      CodigoRegistrador: this.authData ? this.authData.idUsuario : 0,
      FechaInicio: moment().toDate(),
      FechaFin: moment().toDate(),
      HoraIni: "00:00",
      HoraFin: "23:59",
      CodigoTipoRegistroDoc: 1,
      Codificacion: "",
      Referencia: "",
      Asunto: "",
      CodigoTupa: 0,
      Nombre: "",
      Remitente: "",
      CodigoOficinaOrigen: 0,
      CodigoOficinaDestino: 0,
      CodigoTipoDocumento:0,
      NumeroDocumento: "",
      CodigoTema: 0,
      CUI: "",
      Campo: "",
      Orden: "",
      NumContrato: "",
    })
    this.onConsulta();
  }

  redirectDetalle(cod_tramite:number){
    const url = this.router.serializeUrl(this.router.createUrlTree([`/std/registro-detalle/${cod_tramite}`]));
    window.open(url, '_blank');
  }


}
