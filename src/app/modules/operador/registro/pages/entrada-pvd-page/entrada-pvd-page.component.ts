import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistroPvdService } from '../../services/registro-pvd.service';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { DataComboIndicaciones, DataComboTemas, DataComboTipoDocumental, DataDocumentoRegistrado, DataOficinaDetalle, DataOficinasCopias, DataOficinasDerivadas, RegistroPVD } from '../../interfaces/registro-pvd.interface';
import { AuthDataService } from '../../../../../core/services/auth-data.service';
import { DataAuth } from '../../../../../core/interfaces/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { SelInstitucionComponent } from '../../components/sel-institucion/sel-institucion.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { DataListReferencia, OrdenarArchivos } from '../../../../jefe/registro/interfaces/doc-int-of.interface';
import { DocIntOfService } from '../../../../jefe/registro/services/doc-int-of.service';
import {MatTableModule} from '@angular/material/table';
import { NuevoReferenciaComponent } from '../../../../jefe/registro/components/nuevo-referencia/nuevo-referencia.component';
import { ConfirmacionDialogComponent } from '../../../../jefe/registro/components/confirmacion-dialog/confirmacion-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NuevoComplementarioComponent } from '../../../../jefe/registro/components/nuevo-complementario/nuevo-complementario.component';
import { forkJoin } from 'rxjs';
import { EnvioOficinasCopiasComponent } from '../../components/envio-oficinas-copias/envio-oficinas-copias.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DatosPrincipales } from '../../../../../core/interfaces/perfiles.interface';
import { PerfilesService } from '../../../../../core/services/perfiles.service';

@Component({
  selector: 'app-entrada-pvd-page',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatTableModule,
    MatPaginator,
    DatePipe
  ],
  templateUrl: './entrada-pvd-page.component.html',
})
export class EntradaPvdPageComponent implements OnInit{

  public datosPrincipales: DatosPrincipales | null = null;
  @ViewChild('stepper') private myStepper!: MatStepper;
  public year = new Date().getFullYear();
  public authData!: DataAuth | null;
  public listComboTemas: DataComboTemas[] = [];
  public listTipoDocumental: DataComboTipoDocumental[] =[];
  public listIndicaciones: DataComboIndicaciones[] = [];
  public listOficinasDerivds: DataOficinasDerivadas[] = [];
  public isEditable = false;

  public id_tram: number = 1334167;
  // Paso 2
  // Datos del Documento
  public detalleRegistroPasoUno: DataDocumentoRegistrado;
  // Referencias
  public displayedColumns: string[] = ['documento','asunto','opcion'];
  public dataSource = new MatTableDataSource<DataListReferencia>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public listadoReferencias:DataListReferencia[] = [];
  // Doc complementarios
  public displayedColumns2: string[] = ['descripcion','folios','tamanio','estado','orden','opcion'];
  public dataSource2 = new MatTableDataSource<any>();
  @ViewChild('paginator2', { static: true }) paginator2!: MatPaginator;
  public listDocComplem: any[] = [];
  public sumaFoliosEstado1: number = 0;
  // Derivar a mas oficinas
  public displayedColumns3: string[] = ['nro','oficina','indicacion','envio_inmed','tipo','observaciones'];
  public dataSource3 = new MatTableDataSource<DataOficinasCopias>();
  @ViewChild('paginator3', { static: true }) paginator3!: MatPaginator;
  public listaOficinasCopias: DataOficinasCopias[] = []
  public listanombresOficinasMostrar: any[] = [];


  public varConfidencialidad: any;

  //Para pasar el Stepper 2
  public myFormValido = this.fb.group({
    valid: ['', Validators.required],
  });

  public myFormRegistroPVD:FormGroup = this.fb.group({
    idUsuario: [0,[Validators.required]],               // Ok
    idOficinaUsuario: [0,[Validators.required]],        // Ok
    fechaDocumento: ["",[Validators.required]],         // Ok
    parteDiario: [""],                                  // Ok
    codigoRemitente: ["",[Validators.required]],        // Ok
    remite: [""],                                       // Ok
    codigoTipoDocumento: ["",[Validators.required]],    // Ok
    numeroDocumento: ["",[Validators.required]],        //Asignado pero falta validar si es correcto
    asunto: ["",[Validators.required]],                 //Ok
    observaciones: [""],                                // Ok
    archivoFisico: [""],                                // Ok
    codigoOficinaDerivar: ["",[Validators.required]],
    codigoIndicacion: [11,[Validators.required]],       // Ok
    prioridadDerivar: ["Media",[Validators.required]],  // Ok
    numeroContrato: [""],                               // Ok
    codigoBarra: ["",[Validators.required]],            // Ok
    password: ["",[Validators.required]],               // Ok
    clave: ["",[Validators.required]],                  // Ok
    periodo: ["",[Validators.required]],                // Ok
    flagEnvio: [0,[Validators.required]],               // Ok
    presentacion: [1,[Validators.required]],            // Ok
    distribucion: [1,[Validators.required]],            // Ok
    confidencialidad: [1,[Validators.required]],        // Ok
    codigoTema: ["",[Validators.required]],             //Combo Tema  Ok
    fechaPlazo: [""],                                   // Ok
    tramo: [""],                                        // Ok
    cui: [""],                                          // Ok
    cod_tpo_rgtro_dcmto: [1,[Validators.required]],     // Ok
    numOrdenServicio: [""],                             // Ok

    nombreInstitucion: ["",[Validators.required]],      // Ok
    nombreResponsbl: [""]
  })

  private perfilesService = inject(PerfilesService);
  private authDataService = inject(AuthDataService);
  private registroPvdService = inject(RegistroPvdService);
  private docIntOfService = inject(DocIntOfService)
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);
  constructor(private fb: FormBuilder,public dialog: MatDialog){}

  ngOnInit(): void {
    this.datosPrincipales = this.perfilesService.getDatosPrincipales();
    this.authData = this.authDataService.getAuthData();
    if(this.authData && this.datosPrincipales){
      this.myFormRegistroPVD.patchValue({
        idUsuario : this.authData.idUsuario,
        idOficinaUsuario: this.datosPrincipales.id_oficina,
        fechaDocumento: moment().toDate(),
        codigoBarra: "1145652810",
        password: Math.random().toString(36).slice(-8),
        clave: Math.random().toString(36).slice(-8).toUpperCase(),
        periodo: this.year.toString()
      })
    }
    this.getListComboTipoDocumental();
    this.getlistComboTemas();
    this.getListComboIndicaciones();
    this.getListComboOficinasDeriv();
    // console.log(this.myFormRegistroPVD.value)
    // this.getDetalleDocumentoRegistrado(1334167);
    // this.getListReferencias(1334167);
    // this.listDocComplementario(1334167);
    // this.listOficinasDrivadas(1334167);
  }

  onSubmitDocumento(){

    if (this.myFormRegistroPVD.invalid ) {
      this.myFormRegistroPVD.markAllAsTouched();
      return;
    }
    // console.log(this.myFormRegistroPVD.value);
    const {idUsuario,idOficinaUsuario,fechaDocumento,parteDiario,codigoRemitente,remite,codigoTipoDocumento,numeroDocumento,
      asunto,observaciones,archivoFisico,codigoOficinaDerivar, codigoIndicacion,prioridadDerivar,numeroContrato,codigoBarra,password,clave,periodo,flagEnvio,
      presentacion,distribucion,confidencialidad,codigoTema,fechaPlazo,tramo,cui,cod_tpo_rgtro_dcmto,numOrdenServicio,nombreInstitucion
    } = this.myFormRegistroPVD.value;

    const formaularioEnviar:RegistroPVD = {
      idUsuario,
      idOficinaUsuario,
      fechaDocumento : this.formatFecha(fechaDocumento),
      parteDiario,
      codigoRemitente,
      remite,
      codigoTipoDocumento,
      numeroDocumento,
      asunto,
      observaciones,
      archivoFisico,
      codigoOficinaDerivar,
      codigoIndicacion,
      prioridadDerivar,
      numeroContrato,
      codigoBarra,
      password,
      clave,
      periodo,
      flagEnvio,
      presentacion,
      distribucion,
      confidencialidad,
      codigoTema,
      fechaPlazo: fechaPlazo ? this.formatFecha(fechaPlazo) : "01/01/1900",
      tramo,
      cui,
      cod_tpo_rgtro_dcmto,
      numOrdenServicio
    }
    // console.log(formaularioEnviar)
    this.registroPvdService.registroPVD(formaularioEnviar).subscribe(
      (rpta)=>{
        this.id_tram = rpta.id_Tramite;
        this.myFormValido.get('valid')?.setValue("true");
        this.getDetalleDocumentoRegistrado(this.id_tram);
        this.getListReferencias(this.id_tram);
        this.listDocComplementario(this.id_tram);
        this.listOficinasDrivadas(this.id_tram);
        this.varConfidencialidad = formaularioEnviar.confidencialidad;
        this.myStepper.next();
      }
    )
  }

  private formatFecha(date: Date | null): string {
    return date ? moment(date).format('DD/MM/YYYY') : '';
  }

  resetFecha(){
    this.myFormRegistroPVD.get('fechaPlazo').setValue('')
  }

  getlistComboTemas(){
    this.registroPvdService.getComboTemas().subscribe(
      (rpta)=>{
        this.listComboTemas = rpta;
      }
    )
  }

  getListComboTipoDocumental(){
    this.registroPvdService.getComboTipoDocumental().subscribe(
      (rpta)=>{
        this.listTipoDocumental = rpta;
      }
    )
  }

  getListComboIndicaciones(){
    this.registroPvdService.getComboIndicaciones().subscribe(
      (rpta)=>{
        this.listIndicaciones = rpta;
      }
    )
  }

  getListComboOficinasDeriv(){
    this.registroPvdService.getComboOficinasDerivadas(0,"",0).subscribe(
      (rpta)=>{

        const oficinasFiltradas = rpta.filter(oficina => {
          return oficina.estado === "1" && oficina.flagVisible && !oficina.flagVirtual;
        });
        oficinasFiltradas.sort((a, b) => a.nombreOficina.localeCompare(b.nombreOficina));
        this.listOficinasDerivds = oficinasFiltradas;

        //No tiene Responsable = COMISION DE SERVICIOS DE CONTROL ESPECIFICO OBRAS
      }
    )
  }
  responsableMostrar(event:any){
    const id_oficina = event.target.value;
    if(id_oficina){
      const nro_doc = this.listOficinasDerivds.find( (oficina) => oficina.idOficina == id_oficina)?.numeroDocumentoRepresentante;
      // console.log(nro_doc)
      if(nro_doc){
        this.registroPvdService.getObtenerUnRepresentante(1,10,0,"","",nro_doc).subscribe(
          (rpta)=>{
            if(rpta){
              this.myFormRegistroPVD.patchValue({
                nombreResponsbl: rpta.nombreCompleto,
              })
            }else{
              this.myFormRegistroPVD.patchValue({
                nombreResponsbl: "",
              })
            }
          }
        )
      }else{
        this.myFormRegistroPVD.patchValue({
          nombreResponsbl: "",
        })
      }
    }else{
      this.myFormRegistroPVD.patchValue({
        nombreResponsbl: "",
      })
    }
  }

  selInstitucion(){
    const dialogRef = this.dialog.open(SelInstitucionComponent, {
      disableClose:true,
      minWidth:900,
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const cod = result.codigo_rem;
        const nomb = result.nomb_rem;
        this.myFormRegistroPVD.patchValue({
          nombreInstitucion: nomb,
          codigoRemitente: cod
        })
      }
    })
  }

  //Paso 2
  getDetalleDocumentoRegistrado(cod:number){
    this.registroPvdService.getDetalleSegundoPaso(cod).subscribe(
      (rpta)=>{
        this.detalleRegistroPasoUno = rpta;
      }
    )
  }
  //Referencias
  getListReferencias( idTramite: number) {
    this.docIntOfService.listReferencia(idTramite)
      .subscribe(
        (rpta:DataListReferencia[]) => {
          this.listadoReferencias = rpta;
          this.dataSource.data = this.listadoReferencias;
        }
      )
  }
  deleteReferencia(cod:number){
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      data: "¿Está seguro de eliminar Referencia"
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.docIntOfService.eliminarReferencia(cod).subscribe(
          ()=>{
            this._snackBar.open('Se eliminó registro', 'Cerrar', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
            });
            this.getListReferencias(this.id_tram);
          }
        )
      }
    })
  }
  newReferencia(){
    const id_Tramite = this.id_tram;
    const dialogRef = this.dialog.open(NuevoReferenciaComponent, {
      disableClose:true,
      minWidth:900,
      data:{id_Tramite}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getListReferencias(id_Tramite)
      }
    })
  }

  //Doc complementarios

  newDocComplementario(){
    const id_Tramite = this.id_tram;
    const dialogRef = this.dialog.open(NuevoComplementarioComponent, {
      disableClose:true,
      minWidth:900,
      data:{id_Tramite}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listDocComplementario(id_Tramite)
      }
    })
  }
  listDocComplementario(idTramite: any) {
    this.docIntOfService.listDocComplementarios(idTramite)
      .subscribe(
        (rpta) => {
          this.listDocComplem = rpta.data;
          this.dataSource2.data = this.listDocComplem;

          this.sumaFoliosEstado1 = this.listDocComplem.reduce((total, item) => {
            if (item.nEstadoDigital === 1) {
              return total + item.nFoliosDigital;
            } else {
              return total;
            }
          }, 0);
        }
      );
  }
  ordenarDocComp() {
    if (this.listDocComplem.length > 0) {
      const dataToUpdate: OrdenarArchivos[] = [];
      this.listDocComplem.forEach(item => {
        const { iCodDigital, nEstadoDigital, nOrden } = item;
        dataToUpdate.push({
          iCodTramite: this.id_tram,
          iCodDigital: iCodDigital,
          nEstadoDigital: nEstadoDigital,
          norden: nOrden,
        });
      });
      // console.log(dataToUpdate);
      this.docIntOfService.ordenarArchivosComplementarios(dataToUpdate)
      .subscribe(
        () => {
          this.listDocComplementario(this.id_tram);
          this._snackBar.open('Orden actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      )
    }

  }
  deleteDocComplementario(cod:number){
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      data: "¿Está seguro de eliminar Documento Complementario"
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.docIntOfService.eliminarDocumentoComplementario(cod,82).subscribe(
          ()=>{
            this._snackBar.open('Se eliminó registro', 'Cerrar', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
            });
            this.listDocComplementario(this.id_tram);
          }
        )
      }
    })
  }

  // Oficinas Derivadas
  listOficinasDrivadas(idTramite: number){
    this.registroPvdService.getOficinasDerivadas(idTramite).subscribe(
      (rpta)=>{
        this.listaOficinasCopias = rpta;
        const codigosOficinasDerivar = this.listaOficinasCopias.map(oficina => oficina.codOficinaDerivar);
        const requests = codigosOficinasDerivar.map(codOficina => this.registroPvdService.getOficinaMostrarDetalle(codOficina));
        forkJoin(requests).subscribe(
          (respuestas: DataOficinaDetalle[]) => {
            const nombresOficinas = respuestas.map(respuesta => respuesta.cNomOficina);
            this.listanombresOficinasMostrar = nombresOficinas;
          }
        );
        this.dataSource3.data = this.listaOficinasCopias;
      }
    )
  }

  newOficinaDrvidadas(){
    const tipo_doc = this.myFormRegistroPVD.get('codigoTipoDocumento').value ? this.myFormRegistroPVD.get('codigoTipoDocumento').value : 19;
    const id_Tramite = this.id_tram;
    const dialogRef = this.dialog.open(EnvioOficinasCopiasComponent, {
      disableClose:true,
      minWidth:600,
      data:{id_Tramite,tipo_doc}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listOficinasDrivadas(id_Tramite)
      }
    })
  }

  enviarDocumento(){
    const tieneDocumentosEstado1 = this.listDocComplem.some(doc => doc.nEstadoDigital === 1);
    const varConfidencialidadNum = parseInt(this.varConfidencialidad, 10);

    const condicion1 = varConfidencialidadNum === 1 && tieneDocumentosEstado1;
    const condicion2 = varConfidencialidadNum === 2;

    if (condicion1 || condicion2) {
      this.registroPvdService.enviarDocumentoPVD(this.id_tram,0).subscribe(
        (rpta)=>{
          this._snackBar.open('Registro enviado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.router.navigate(['/std/operador/consulta/entradas-generales']);
        }
      )
    }else{
      this._snackBar.open('Ingrese Documento Complementario Activo', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

}
