import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { DataListaColaboradoresInternoProfesional, DataListaTrabajadoresOficina, DataTipoDocumentoProfesional } from '../../interfaces/doc-int-prof.interface';
import { DataDetalleRegistroJefe, DataListaIndicaciones, DataListaOficinasDerivadas, DataListReferencia, OrdenarArchivos } from '../../interfaces/doc-int-of.interface';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { DocIntProService } from '../../services/doc-int-pro.service';
import { DocIntOfService } from '../../services/doc-int-of.service';
import { NuevoReferenciaComponent } from '../../components/nuevo-referencia/nuevo-referencia.component';
import { ConfirmacionDialogComponent } from '../../components/confirmacion-dialog/confirmacion-dialog.component';
import { EnvioOficinasComponent } from '../../components/envio-oficinas/envio-oficinas.component';
import { NuevoComplementarioComponent } from '../../components/nuevo-complementario/nuevo-complementario.component';
import { AsignacionColaboradorComponent } from '../../components/asignacion-colaborador/asignacion-colaborador.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-int-prof',
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
    MatSnackBarModule,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltip
  ],
  templateUrl: './doc-int-prof.component.html',
  styles: ``
})
export class DocIntProfComponent implements OnInit, AfterViewInit{

  @ViewChild('stepper') private myStepper!: MatStepper;
  public isEditable = false;
  public step1Completed: boolean = false;
  public listaTipoDocumento: DataTipoDocumentoProfesional[] = [];
  public listIndicaciones: DataListaIndicaciones[] = [];
  public listaTrabajdoresOficina: DataListaTrabajadoresOficina[] =[];
  public mostrarPlazoMaximo: boolean = false;
  public checkboxState: { [key: string]: boolean } = {};

  //Paso 2
  public detalleRegistroPaso1?: DataDetalleRegistroJefe;
  public listadoReferencias:DataListReferencia[] = [];
  // public idTramiteMov: number = 0;
  public idTramiteMov: number = 1333109;
  public listDocComplem: any[] = [];
  public sumaFoliosEstado1: number = 0;

  public listaOficinaDerivadas: DataListaOficinasDerivadas[] =[];
  public listColaboradores:DataListaColaboradoresInternoProfesional[] =[];

  public myFormDocInternoProfesional:FormGroup = this.fb.group({
    usuarioCrea:[82,[Validators.required]], //Ok
    oficinaOrigen:[143,[Validators.required]],
    codTipoDoc:["",[Validators.required]],//Ok
    asunto:["",[Validators.required]],
    observaciones:[""],
    requieRerespuesta:[0],//Ok
    fecplazo:[""],//Ok
    archivoFisico:[""],
    numAnio:["2024"],
    destinos:[""],
    codIndicacionDelegado:[11,[Validators.required]],//Ok

    nroCorrelativo:[""],//Ok
  })

  public myFormValido = this.fb.group({
    valid: ['', Validators.required],
  });

  public displayedColumns: string[] = ['sel','nombres'];
  public dataSource = new MatTableDataSource<DataListaTrabajadoresOficina>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns2: string[] = ['documento','asunto','opcion'];
  public dataSource2 = new MatTableDataSource<DataListReferencia>();
  @ViewChild('paginator2', { static: true }) paginator2!: MatPaginator;

  public displayedColumns3: string[] = ['descripcion','folios','tamanio','estado','orden','opcion'];
  public dataSource3 = new MatTableDataSource<any>();
  @ViewChild('paginator3', { static: true }) paginator3!: MatPaginator;

  public displayedColumns4: string[] = ['fecha','oficina','indicacion','prioridad','tipo','opcion'];
  public dataSource4 = new MatTableDataSource<DataListaOficinasDerivadas>();
  @ViewChild('paginator4', { static: true }) paginator4!: MatPaginator;

  public displayedColumns5: string[] = ['fecha','asignado','indicacion','prioridad','tipo','opcion'];
  public dataSource5 = new MatTableDataSource<DataListaColaboradoresInternoProfesional>();
  @ViewChild('paginator5', { static: true }) paginator5!: MatPaginator;


  private docIntProService = inject(DocIntProService);
  private docIntOfService = inject(DocIntOfService);
  private _snackBar = inject(MatSnackBar);

  constructor(private fb:FormBuilder, public dialog: MatDialog, private route: Router){}

  ngOnInit(): void {
    this.listarTipoDocumentoInternoProfesional();
    this.listarIndicaciones();
    this.listaTrabOficina();

    //Paso 2
    // this.mostrarDataRegistroPaso1(1333109);
    // this.getListReferencias(1333109);
    // this.listDocComplementario(1333109);
    // this.listarOficDerivadas(1333109);
    // this.listarColaboradoresPaso2(1333109);
  }
  ngAfterViewInit(): void {

    this.paginator.pageSize = 5;
    this.dataSource.paginator = this.paginator;

    this.paginator2.pageSize = 5;
    this.dataSource2.paginator = this.paginator2;

    this.paginator3.pageSize = 5;
    this.dataSource3.paginator = this.paginator3;

    this.paginator4.pageSize = 5;
    this.dataSource4.paginator = this.paginator4;

    this.paginator5.pageSize = 5;
    this.dataSource5.paginator = this.paginator5;

  }

  agregarDocumento(){
    if (this.myFormDocInternoProfesional.invalid ) {
      this.myFormDocInternoProfesional.markAllAsTouched();
      return;
    }

    if(this.myFormDocInternoProfesional.get('fecplazo')?.value !== ''){
      const fechaPlazoMaximo: Date = this.myFormDocInternoProfesional.get('fecplazo')!.value;
      const fechaHoraFormateada = fechaPlazoMaximo.toISOString();
      this.myFormDocInternoProfesional.get('fecplazo')?.setValue(fechaHoraFormateada)
    };

    const {usuarioCrea, oficinaOrigen, codTipoDoc,asunto, observaciones, requieRerespuesta, fecplazo, archivoFisico , numAnio, destinos,codIndicacionDelegado } = this.myFormDocInternoProfesional.value

    const formularioEnviar = {
      usuarioCrea:usuarioCrea,
      oficinaOrigen:oficinaOrigen,
      codTipoDoc:parseInt(codTipoDoc),
      asunto:asunto,
      observaciones:observaciones,
      requieRerespuesta:parseInt(requieRerespuesta),
      fecplazo:fecplazo,
      archivoFisico:archivoFisico,
      numAnio:numAnio,
      destinos:destinos,
      codIndicacionDelegado:parseInt(codIndicacionDelegado),
    }


    this.docIntProService.agregarDocumentoInternoProfesional(formularioEnviar).subscribe(
      (rpta)=>{
        const idTramite = rpta.data[0].id_Tramite;
        this.idTramiteMov = idTramite
        this.mostrarDataRegistroPaso1(idTramite);
        this.getListReferencias(idTramite);
        this.listDocComplementario(idTramite);
        this.listarOficDerivadas(idTramite);
        this.listarColaboradoresPaso2(idTramite);

        this._snackBar.open('Creado exitosamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        this.myFormValido.get('valid')?.setValue("true");
        this.step1Completed = true;
        this.myStepper.next();
      }
    )
  }

  resetFecha(){

  }

  listarTipoDocumentoInternoProfesional(){
    this.docIntProService.getListTipoDocumentoInternoProfesional(143,2024).subscribe(
      (rpta)=>{
        this.listaTipoDocumento = rpta;
      }
    )
  }

  mostrarNroDocumento(event:any){
    const nroDocumento = event.target.value;
    if(nroDocumento){
      this.docIntOfService.getNroCorrelativo(nroDocumento, 143,"2024",82, 1).subscribe(
        (rpta)=>{
          this.myFormDocInternoProfesional.get('nroCorrelativo')?.setValue(rpta)
        }
      )
    }else{
      this.myFormDocInternoProfesional.get('nroCorrelativo')?.setValue('')
    }
  }

  listarIndicaciones(){
    this.docIntOfService.getListIndicaciones().subscribe(
      (rpta:DataListaIndicaciones[])=>{
        this.listIndicaciones = rpta;
      }
    )
  }

  respuesta(event:any){
    const respuesta = event.target.value;
    if(respuesta == 1){
      this.mostrarPlazoMaximo = true
    }else{
      this.mostrarPlazoMaximo = false
    }
  }

  listaTrabOficina(){
    this.docIntProService.getListIntegrantesOficinas(143).subscribe(
      (rpta)=>{
        this.listaTrabajdoresOficina = rpta;
        this.dataSource.data = this.listaTrabajdoresOficina;
      }
    )
  }

  onChangeCheckbox(event: any) {
    this.checkboxState[event.target.value] = event.target.checked;
    this.actualizarDestinos();
  }

  actualizarDestinos() {
    const destinos = Object.keys(this.checkboxState)
      .filter(key => this.checkboxState[key])
      .join(',');
    this.myFormDocInternoProfesional.get('destinos')?.setValue(destinos);
  }

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
          this.dataSource2.data = this.listadoReferencias;
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
          this.dataSource3.data = this.listDocComplem;

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
    const solo_copias:boolean = true;
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
        this.dataSource4.data = this.listaOficinaDerivadas;

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

  listarColaboradoresPaso2(codTramite:number){
    this.docIntProService.getListarColaboradores(codTramite).subscribe(
      (rpta)=>{
        this.listColaboradores = rpta;
        this.dataSource5.data = this.listColaboradores;
      }
    )
  }

  newAsignacioncolaborador(){
    const id_Tramite = this.idTramiteMov;
    const dialogRef = this.dialog.open(AsignacionColaboradorComponent, {
      disableClose:true,
      minWidth:900,
      data:{id_Tramite}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listarColaboradoresPaso2(id_Tramite)
      }
    })
  }

  deleteColaborador(cod:number){
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      data: "¿Está seguro de eliminar Colaborador"
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.docIntProService.deleteColaborador(cod,82,0).subscribe(
          ()=>{
            this._snackBar.open('Se eliminó registro', 'Cerrar', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'end',
            });
            this.listarColaboradoresPaso2(this.idTramiteMov);
          }
        )
      }
    })
  }

  redirectoLink(){
    // this.myStepper.reset();
    this.route.navigateByUrl(`std/jefe/consulta/doc-int-of`)
    this._snackBar.open('Documento enviado', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

}
