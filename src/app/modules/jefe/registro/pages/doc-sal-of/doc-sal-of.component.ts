import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { DocSalidaOfService } from '../../services/doc-salida-of.service';
import { DataDepartamento, DataDetallePaso2RegistroSalida, DataDistrito, DataPaises, DataProvincia, DataTipoDocumento } from '../../interfaces/doc-sal-of.interface';
import { MatDialog } from '@angular/material/dialog';
import { SelInstitucionComponent } from '../../components/sel-institucion/sel-institucion.component';
import { NuevoReferenciaComponent } from '../../components/nuevo-referencia/nuevo-referencia.component';
import { DocIntOfService } from '../../services/doc-int-of.service';
import { DataListReferencia, OrdenarArchivos } from '../../interfaces/doc-int-of.interface';
import { ConfirmacionDialogComponent } from '../../components/confirmacion-dialog/confirmacion-dialog.component';
import { NuevoComplementarioComponent } from '../../components/nuevo-complementario/nuevo-complementario.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-sal-of',
  standalone: true,
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
  templateUrl: './doc-sal-of.component.html',
  styles: ``
})
export class DocSalOfComponent implements OnInit{

  @ViewChild('stepper') private myStepper!: MatStepper;
  public step1Completed: boolean = false;
  public idTramiteMov: number = 0;
  public isEditable = false;
  public listTipoDocumento: DataTipoDocumento[] = [];
  public listaPaisesSalida: DataPaises[] =[];
  public listaDepartamentos: DataDepartamento[] =[];
  public listaProvincias: DataProvincia[] =[];
  public listaDistritos: DataDistrito[] = [];

  public detallePaso2?:DataDetallePaso2RegistroSalida;
  public listadoReferencias:DataListReferencia[] = [];
  public listDocComplem: any[] = [];
  public sumaFoliosEstado1: number = 0;
  // public myFormDocumentoSalida:FormGroup = this.fb.group({
  //   numAnio: ["", [Validators.required]],
  //   codUsuario: [82 ,[Validators.required]],
  //   codOficinaOrigen  : [143,[Validators.required]],
  //   codTipoDoc  : ["",[Validators.required]],
  //   asunto  : ["",[Validators.required]],
  //   observaciones  : [""],
  //   flgRpta: [0,[Validators.required]],
  //   codRemitente  : ["",[Validators.required]],
  //   archivoFisico  : [""],
  //   nomRemite  : ["",[Validators.required]],
  //   remitenteDireccion  : [""],
  //   remitenteDepartamento  : [""],
  //   remitenteProvincia  : [""],
  //   remitenteDistrito  : [""],

  //   nroCorrelativo:[""]
  // })

  public myFormDocumentoSalida:FormGroup = this.fb.group({
    numAnio:["2024",[Validators.required]],
    codUsuario:[82,[Validators.required]],
    codOficinaOrigen:[143,[Validators.required]],
    codTipoDoc:["",[Validators.required]],
    asunto:["",[Validators.required]],
    observaciones:[""],
    flgRpta:[0],
    codRemitente:["",[Validators.required]],
    nomRemite:["",[Validators.required]],
    archivoFisico:[""],
    remitenteDireccion:[""],
    remitenteDepartamento:[""],
    remitenteProvincia:[""],
    remitenteDistrito:[""],

    ubicacionPredeterminada:[""],
    nomInstitucion:[""],
    paisProcedencia: ["PE"],
    nroCorrelativo:[""],
  })

  public myFormValido = this.fb.group({
    valid: ['', Validators.required],
  });

  private docIntOfService = inject(DocIntOfService);
  private _snackBar = inject(MatSnackBar);
  private docSalidaOfService = inject(DocSalidaOfService)
  constructor(private fb:FormBuilder, public dialog: MatDialog,private route: Router){}

  public displayedColumns2: string[] = ['documento','asunto','opcion'];
  public dataSource2 = new MatTableDataSource<DataListReferencia>();
  @ViewChild('paginator2', { static: true }) paginator2!: MatPaginator;

  public displayedColumns3: string[] = ['descripcion','folios','tamanio','estado','orden','opcion'];
  public dataSource3 = new MatTableDataSource<any>();
  @ViewChild('paginator3', { static: true }) paginator3!: MatPaginator;


  ngOnInit(): void {
    this.getComboTipoDoocumento();
    this.getListaPaisesSalida();
    this.getListaDepartamentosSalida();
  }
  ngAfterViewInit(): void {
    this.paginator2.pageSize = 5;
    this.dataSource2.paginator = this.paginator2;
  }
  agregarDocumento(){
    if (this.myFormDocumentoSalida.invalid ) {
      this.myFormDocumentoSalida.markAllAsTouched();
      return;
    }

    const { numAnio, codUsuario, codOficinaOrigen, codTipoDoc, asunto, observaciones, flgRpta, codRemitente, nomRemite, archivoFisico, remitenteDireccion, remitenteDepartamento, remitenteProvincia, remitenteDistrito } = this.myFormDocumentoSalida.value;
    const formularioEnviar = {
      numAnio:numAnio,
      codUsuario:codUsuario,
      codOficinaOrigen:codOficinaOrigen,
      codTipoDoc:parseInt(codTipoDoc),
      asunto:asunto,
      observaciones:observaciones,
      flgRpta:parseInt(flgRpta),
      codRemitente:codRemitente,
      nomRemite:nomRemite,
      archivoFisico:archivoFisico,
      remitenteDireccion:remitenteDireccion,
      remitenteDepartamento:remitenteDepartamento,
      remitenteProvincia:remitenteProvincia.substring(remitenteProvincia.length - 2),
      remitenteDistrito:remitenteDistrito.substring(remitenteDistrito.length - 2),
    }
    console.log(formularioEnviar)
    this.docSalidaOfService.agregarDocumentoSalidaOficina(formularioEnviar).subscribe(
      (rpta)=>{
        this.idTramiteMov = rpta.data[0].id_Tramite;
        this._snackBar.open('Registrado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.getDetallePaso2Registro(this.idTramiteMov)
        this.getListReferencias(this.idTramiteMov)
        this.listDocComplementario(this.idTramiteMov)
        this.myFormValido.get('valid')?.setValue("true");
        this.step1Completed = true;
        this.myStepper.next();

      }
    )
  }

  getComboTipoDoocumento(){
    this.docSalidaOfService.getTipoDocumento().subscribe(
      (rpta)=>{
        this.listTipoDocumento = rpta;
      }
    )
  }

  getListaPaisesSalida(){
    this.docSalidaOfService.getPais().subscribe(
      (rpta)=>{
        this.listaPaisesSalida = rpta;
      }
    )
  }

  getListaDepartamentosSalida(){
    this.docSalidaOfService.getDepartamento().subscribe(
      (rpta)=>{
        this.listaDepartamentos = rpta;
      }
    )
  }

  getListaProvinciasSalida(codDepartamento:string, codProvincia:string){
    // 08 01
    const parametroProvincia = codDepartamento.trim() + codProvincia.trim();
    this.docSalidaOfService.getProvincia(codDepartamento).subscribe(
      (rpta)=>{
        this.listaProvincias = rpta;
        // console.log(this.listaProvincias)
        this.myFormDocumentoSalida.get('remitenteProvincia')?.setValue(parametroProvincia.trim())
        // console.log(codProvincia)
      }
    )
  }

  getListaDistritosSalida(codDepartamento:string, codProvincia:string, codDistrito:string){
    const parametroProvincia  = codDepartamento.trim() + codProvincia.trim();
    const parametroDistrito = codDepartamento.trim() + codProvincia.trim() + codDistrito.trim();

    this.docSalidaOfService.getDistrito(parametroDistrito).subscribe(
      (rpta)=>{
        this.listaDistritos = rpta;
        this.myFormDocumentoSalida.get('remitenteDistrito')?.setValue(parametroDistrito.trim())
      }
    )
  }

  seleccionarTipoDocumento(event: any) {
    const selectedValue: string = event.target.value;
    this.valueNroCorrelativo(selectedValue)
  }

  valueNroCorrelativo(idTipoDocumento:any){
    if(idTipoDocumento){
      this.docSalidaOfService.getNroCorrelativoSalida(idTipoDocumento,143,"2024",82,1).subscribe(
        (rpta)=>{
          this.myFormDocumentoSalida.get('nroCorrelativo')?.setValue(rpta.data[0].codificacion)
        }
      )
    }else{
      this.myFormDocumentoSalida.get('nroCorrelativo')?.setValue('')
    }
  }

  selInstitucion(){

    const dialogRef = this.dialog.open(SelInstitucionComponent, {
      disableClose:true,
      minWidth:900,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const depa = String(result.departamento);
        const prov = String(result.param_provincia);
        const distrito = String(result.param_distrito);
        this.getListaProvinciasSalida(depa,prov)
        this.getListaDistritosSalida(depa,prov,distrito)
        this.myFormDocumentoSalida.get('codRemitente')?.setValue(result.codigo)
        this.myFormDocumentoSalida.get('nomInstitucion')?.setValue(result.nombre)
        this.myFormDocumentoSalida.get('remitenteDepartamento')?.setValue(result.departamento)
        this.myFormDocumentoSalida.get('remitenteDireccion')?.setValue(result.direccion)
        this.myFormDocumentoSalida.get('ubicacionPredeterminada')?.setValue(result.ubicacion);
      }
    })
  }

  getDetallePaso2Registro(codTramite:number){
    this.docSalidaOfService.getListDetallePaso2(codTramite).subscribe(
      (rpta)=>{
        this.detallePaso2 = rpta;
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


  enviarDocumento(){
    this.docSalidaOfService.updateDocumentoSalida(this.idTramiteMov,'',1,0).subscribe(
      (rpta)=>{
        this._snackBar.open('Documento enviado', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        this.route.navigateByUrl(`std/jefe/consulta/doc-int-of`)
      }
    )
  }
}
