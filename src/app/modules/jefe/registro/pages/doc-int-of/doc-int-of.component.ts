import moment from 'moment';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { DataDetalleRegistroJefe, DataListaIndicaciones, DataListaOficinasDerivadas, DataListaOficinasPaso1, DataListReferencia, DataResponsableOficina, DataTemasJefe, DataTipoDocumentalJefe, OrdenarArchivos } from '../../interfaces/doc-int-of.interface';
import { DocIntOfService } from '../../services/doc-int-of.service';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { MatIconModule } from '@angular/material/icon';
import { NuevoReferenciaComponent } from '../../components/nuevo-referencia/nuevo-referencia.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from '../../components/confirmacion-dialog/confirmacion-dialog.component';
import { MatTooltip } from '@angular/material/tooltip';
import { NuevoComplementarioComponent } from '../../components/nuevo-complementario/nuevo-complementario.component';
import { EnvioOficinasComponent } from '../../components/envio-oficinas/envio-oficinas.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-int-of',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSnackBarModule,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltip
  ],
  templateUrl: './doc-int-of.component.html',
  styles: ``
})
export class DocIntOfComponent implements OnInit, AfterViewInit{

  @ViewChild('stepper') private myStepper!: MatStepper;
  public step1Completed: boolean = false;
  public listTemas: DataTemasJefe[] = [];
  public listTipoDocumental: DataTipoDocumentalJefe[] = [];
  public listOficinas: DataListaOficinasPaso1[] = [];
  public listaTrabajadorResponsable: DataResponsableOficina[] = [];
  public listIndicaciones: DataListaIndicaciones[] = [];
  public isEditable = false;

  //Paso 2
  public detalleRegistroPaso1?: DataDetalleRegistroJefe;
  public listadoReferencias:DataListReferencia[] = [];
  // public idTramiteMov: number = 1333089;
  public idTramiteMov: number = 0;
  public listDocComplem: any[] = [];
  public sumaFoliosEstado1: number = 0;

  public listaOficinaDerivadas: DataListaOficinasDerivadas[] =[];
  public parteDiario: string = '';

  public displayedColumns: string[] = ['documento','asunto','opcion'];
  public dataSource = new MatTableDataSource<DataListReferencia>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns2: string[] = ['descripcion','folios','tamanio','estado','orden','opcion'];
  public dataSource2 = new MatTableDataSource<any>();
  @ViewChild('paginator2', { static: true }) paginator2!: MatPaginator;

  public displayedColumns3: string[] = ['fecha','oficina','indicacion','prioridad','tipo','opcion'];
  public dataSource3 = new MatTableDataSource<DataListaOficinasDerivadas>();
  @ViewChild('paginator3', { static: true }) paginator3!: MatPaginator;

  ngOnInit(): void {
    this.myFormDocumentoInterno.patchValue({
      numAnio:"2024",
      codTrabajadorRegistro: 82,
      codOficinaRegistro: 143,
      // codOficinaDeriv:      10,        //OTI
      // codTrabajadorDerivar: 378,       //Tantas Elias
    })
    this.getListadoTemas();
    this.getListadoTipoDocumental();
    this.getListadoOficinas();
    this.listarIndicaciones();

    //Paso 2
    // this.mostrarDataRegistroPaso1(1333089);
    // this.getListReferencias(1333089);
    // this.listDocComplementario(1333089);
    // this.listarOficDerivadas(1333089);
  }

  ngAfterViewInit() {
    this.paginator.pageSize = 5;
    this.dataSource.paginator = this.paginator;

    this.paginator2.pageSize = 5;
    this.dataSource2.paginator = this.paginator2;

    this.paginator3.pageSize = 5;
    this.dataSource3.paginator = this.paginator3;
  }
  public myFormDocumentoInterno:FormGroup = this.fb.group({
    numAnio: ["", [Validators.required]],                     //Ok  Interno
    codTrabajadorRegistro: [0 ,[Validators.required]],        //Ok  Interno
    codOficinaRegistro  : [0,[Validators.required]],          //Ok  Interno
    codTipoDoc  : ["",[Validators.required]],                 //OK  HTML
    asunto  : ["",[Validators.required]],                     //OK  HTML
    observaciones  : [""],                                    //OK  HTML
    archivoFisico  : [""],                                    //OK  HTML
    tipoDerivacion  : [1,[Validators.required]],              //OK  HTML
    codOficinaDeriv  : ["",[Validators.required]],            //Ok  HTML
    codTrabajadorDerivar  : ["",[Validators.required]],       //Ok  HTML
    codIndicacionDeriv  : [11,[Validators.required]],
    prioridad  : ["Media",[Validators.required]],
    confidencialidad  : [1,[Validators.required]],
    parteDiario  : [""],
    codTema  : ["", [Validators.required]],
    fechaPlazoMaximo  : [""],
    cui: [""],

    nroCorrelativo:[""]
  })

  public myFormValido = this.fb.group({
    valid: ['', Validators.required],
  });


  private docIntOfService = inject(DocIntOfService);
  private _snackBar = inject(MatSnackBar);

  constructor(private fb:FormBuilder, public dialog: MatDialog, private route: Router){}


  agregarDocumento(){
    if (this.myFormDocumentoInterno.invalid) {
      this.myFormDocumentoInterno.markAllAsTouched();
      return;
    }

    const {numAnio,codTrabajadorRegistro,codOficinaRegistro,codTipoDoc,asunto,observaciones,archivoFisico,tipoDerivacion,
      codOficinaDeriv,codTrabajadorDerivar,codIndicacionDeriv,prioridad,confidencialidad,parteDiario,codTema,fechaPlazoMaximo,cui,nroCorrelativo
    } = this.myFormDocumentoInterno.value;


    const formulariEnviar = {
      numAnio:numAnio,
      codTrabajadorRegistro:codTrabajadorRegistro,
      codOficinaRegistro: codOficinaRegistro,
      codTipoDoc: parseInt(codTipoDoc),
      asunto: asunto,
      observaciones: observaciones,
      archivoFisico: archivoFisico,
      tipoDerivacion: parseInt(tipoDerivacion),
      codOficinaDeriv: parseInt(codOficinaDeriv),
      codTrabajadorDerivar: parseInt(codTrabajadorDerivar),
      codIndicacionDeriv: parseInt(codIndicacionDeriv),
      prioridad: prioridad,
      confidencialidad: parseInt(confidencialidad),
      parteDiario: parteDiario,
      codTema: parseInt(codTema),
      fechaPlazoMaximo: fechaPlazoMaximo ? moment(fechaPlazoMaximo).format('DD/MM/YYYY') : '',
      cui: cui
    }

    this.docIntOfService.postRegIntAgregarDocumento(formulariEnviar).subscribe(
      (rpta)=>{
        const idTramite = rpta.data[0].id_Tramite;
        if(idTramite === 0){
          this._snackBar.open('El documento o asunto con el mismo tipo documental ya existe. Verifique.', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }else{
          this.idTramiteMov = idTramite
          this.mostrarDataRegistroPaso1(this.idTramiteMov);
          this.getListReferencias(this.idTramiteMov);
          this.listDocComplementario(this.idTramiteMov);
          this.listarOficDerivadas(this.idTramiteMov);
          this._snackBar.open('Documento Agregado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });

          this.myFormValido.get('valid')?.setValue("true");
          this.step1Completed = true;
          this.myStepper.next();
        }
      }
    )
  }

  getListadoTemas():void{
    this.docIntOfService.getTemas("").subscribe(
      (rpta)=> {
        this.listTemas = rpta;
      }
    )
  }

  getListadoTipoDocumental():void{
    this.docIntOfService.getTipoDocumental(143,2024).subscribe(
      (rpta)=>{
        this.listTipoDocumental = rpta;
      }
    )
  }

  getListadoOficinas():void{
    this.docIntOfService.getListOficinasPaso1(143).subscribe(
      (rpta)=>{
        this.listOficinas = rpta;
      }
    )
  }

  verificarTipo(event:any){
    this.myFormDocumentoInterno.patchValue({
      codOficinaDeriv:"",
      codTrabajadorDerivar: ""
    })

  }

  selectOficina(event:any):void{
    const cod_oficina = event.target.value;
    if(this.myFormDocumentoInterno.get('tipoDerivacion')?.value == 1){
      this.docIntOfService.getListaResponsableOficina(cod_oficina).subscribe(
        (rpta)=>{
          this.listaTrabajadorResponsable = rpta;
          if(this.listaTrabajadorResponsable.length > 0){
            this.myFormDocumentoInterno.patchValue({
              codTrabajadorDerivar: this.listaTrabajadorResponsable[0].iCodTrabajador
            })
          }else{
            this.myFormDocumentoInterno.patchValue({
              codTrabajadorDerivar: ""
            })
          }
        }
      )
    }else{
      this.docIntOfService.getListaTrabajadores(cod_oficina).subscribe(
        (rpta)=>{
          this.listaTrabajadorResponsable = rpta;
          if(this.listaTrabajadorResponsable.length>0){
            this.myFormDocumentoInterno.patchValue({
              codTrabajadorDerivar: this.listaTrabajadorResponsable[0].iCodTrabajador
            })
          }else{
            this.myFormDocumentoInterno.patchValue({
              codTrabajadorDerivar: ""
            })
          }
        }
      )
    }
  }

  listarIndicaciones(){
    this.docIntOfService.getListIndicaciones().subscribe(
      (rpta:DataListaIndicaciones[])=>{
        this.listIndicaciones = rpta;
      }
    )
  }

  resetFecha(){
    this.myFormDocumentoInterno.get('fechaPlazoMaximo')?.setValue('')
  }

  seleccionarTipoDocumento(event: any){
    const selectedValue: string = event.target.value;
    this.valueNroCorrelativo(selectedValue)
  }
  valueNroCorrelativo(idTipoDocumento:any){
    if(idTipoDocumento){
      this.docIntOfService.getNroCorrelativo(idTipoDocumento,143,"2024",82,0).subscribe(
        (rpta)=>{
          this.myFormDocumentoInterno.get('nroCorrelativo')?.setValue(rpta)
        }
      )
    }else{
      this.myFormDocumentoInterno.get('nroCorrelativo')?.setValue('')
    }
  }

  // Paso 2

  mostrarDataRegistroPaso1(idTramite:number){
    this.docIntOfService.getListarDetalleDocumentoRegistrado(idTramite).subscribe(
      (rpta)=>{
        this.detalleRegistroPaso1 = rpta
      }
    )
  }

  getListReferencias( idTramite: number) {
    this.docIntOfService.listReferencia(idTramite)
      .subscribe(
        (rpta:DataListReferencia[]) => {
          this.listadoReferencias = rpta;
          this.dataSource.data = this.listadoReferencias;
        }
      )
  }

  newReferencia(){
    const id_Tramite = this.idTramiteMov;
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
            this.getListReferencias(this.idTramiteMov);
          }
        )
      }
    })
  }

  newDocComplementario(){
    const id_Tramite = this.idTramiteMov;
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
          iCodTramite: this.idTramiteMov,
          iCodDigital: iCodDigital,
          nEstadoDigital: nEstadoDigital,
          norden: nOrden,
        });
      });
      // console.log(dataToUpdate);
      this.docIntOfService.ordenarArchivosComplementarios(dataToUpdate)
      .subscribe(
        () => {
          this.listDocComplementario(this.idTramiteMov);
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
            this.listDocComplementario(this.idTramiteMov);
          }
        )
      }
    })
  }

  newOficina():void{
    const id_Tramite = this.idTramiteMov;
    const solo_copias:boolean = false;
    const dialogRef = this.dialog.open(EnvioOficinasComponent, {
      disableClose:true,
      minWidth:900,
      data:{id_Tramite,solo_copias}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarOficDerivadas(id_Tramite)
      }
    })
  }

  listarOficDerivadas(codTramite:number){
    this.docIntOfService.listEnvioOficinas(codTramite).subscribe(
      (rpta)=> {
        this.listaOficinaDerivadas = rpta;
        this.dataSource3.data = this.listaOficinaDerivadas;

      }
    )
  }

  deleteOficina(cod:number){
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      data: "¿Está seguro de eliminar Oficina"
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.docIntOfService.eliminarOficina(cod,82).subscribe(
          ()=>{
            this._snackBar.open('Se eliminó registro', 'Cerrar', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
            });
            this.listarOficDerivadas(this.idTramiteMov);
          }
        )
      }
    })
  }


  registrarDocumento(){

    const tieneDocumentosEstado1 = this.listDocComplem.some(doc => doc.nEstadoDigital === 1);
    if(tieneDocumentosEstado1){
      this.docIntOfService.updateDocumentoInterno(this.parteDiario,this.idTramiteMov).subscribe(
        (rpta)=>{
          this._snackBar.open('Registro enviado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.route.navigateByUrl(`std/jefe/consulta/doc-int-of`)
        }
      )
    }else{
      this._snackBar.open('Ingrese Documento Complementario Activo', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }

  }


}
