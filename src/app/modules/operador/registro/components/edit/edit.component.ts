import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { EditRegistroService } from '../../../consulta/services/edit-registro.service';
import { DataEditRegistro, PostCui, PostDatosRegistro, PostEnviaDoc, PostFechaMaximo, PostTema } from '../../../consulta/interfaces/edit.interface';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { DataComboIndicaciones, DataComboTemas, DataComboTipoDocumental, DataOficinasDerivadas } from '../../interfaces/registro-pvd.interface';
import { RegistroPvdService } from '../../services/registro-pvd.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataAuth } from '../../../../../core/interfaces/auth';
import { AuthDataService } from '../../../../../core/services/auth-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { SelInstitucionComponent } from '../sel-institucion/sel-institucion.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { EntradasGeneralesService } from '../../../consulta/services/entradas-generales.service';
import { DataOficinasRcc } from '../../../consulta/interfaces/entradas-generales.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataListReferencia, OrdenarArchivos } from '../../../../jefe/registro/interfaces/doc-int-of.interface';
import { DocIntOfService } from '../../../../jefe/registro/services/doc-int-of.service';
import { ConfirmacionDialogComponent } from '../../../../jefe/registro/components/confirmacion-dialog/confirmacion-dialog.component';
import { NuevoReferenciaComponent } from '../../../../jefe/registro/components/nuevo-referencia/nuevo-referencia.component';
import { NuevoComplementarioComponent } from '../../../../jefe/registro/components/nuevo-complementario/nuevo-complementario.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    MatCardModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltip,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit{

  @Input() cod_tramite!: number;
  public detalle_edit?: DataEditRegistro;
  public listTipoDocumental: DataComboTipoDocumental[] =[];
  public listComboTemas: DataComboTemas[] = [];
  public listIndicaciones:DataComboIndicaciones[]=[]
  public listOficinasPvd: DataOficinasDerivadas[] = [];
  public listOficinasRcc: DataOficinasRcc[] = [];
  public tipo_oficina: number  = 0;

  public authData!: DataAuth | null;
  public cod_user:number = 0;

  public dataTipoDoc:FormControl = new FormControl("");
  public dataNroDocumento: FormControl = new FormControl("");
  public dataCodInstitucion: FormControl = new FormControl("");
  public dataNomInstitucion: FormControl = new FormControl("");
  public dataRemite: FormControl = new FormControl("");
  public dataAsunto: FormControl = new FormControl("");
  public dataObservaciones: FormControl = new FormControl("");
  public dataParteDiario: FormControl = new FormControl("");
  public dataPlazoMaximo: FormControl = new FormControl("");
  public dataTema: FormControl = new FormControl("");
  public dataCui: FormControl = new FormControl("");
  public dataPresentacion: FormControl = new FormControl("");
  public dataArchivoFisico: FormControl = new FormControl("");
  public dataIndicacion: FormControl = new FormControl("");
  public dataOficina: FormControl = new FormControl("");
  public dataResponsableOficina: FormControl = new FormControl("");
  public dataFlagEnvio: FormControl = new FormControl("");

  public listadoReferencias:DataListReferencia[] = [];
  public listDocComplem: any[] = [];
  public sumaFoliosEstado1: number = 0;

  ngOnInit(): void {
    this.authData = this.authDataService.getAuthData();
    this.cod_user = this.authData.idUsuario;
    this.getListComboTipoDocumental();
    this.getlistComboTemas();
    this.getListComboIndicaciones();
    this.getListReferencias(this.cod_tramite)
    this.listDocComplementario(this.cod_tramite)
    if(this.cod_tramite){
      this.getDetllRegistro();
    }
  }


  private authDataService = inject(AuthDataService)
  private registroPvdService = inject(RegistroPvdService)
  private editRegistroService = inject(EditRegistroService)
  private entradasGeneralesService = inject(EntradasGeneralesService)
  private docIntOfService = inject(DocIntOfService)
  private _snackBar = inject(MatSnackBar);
  constructor(public dialog: MatDialog){}

  public displayedColumns2: string[] = ['documento','asunto','opcion'];
  public dataSource2 = new MatTableDataSource<DataListReferencia>();
  @ViewChild('paginator2', { static: true }) paginator2!: MatPaginator;

  public displayedColumns3: string[] = ['descripcion','folios','tamanio','estado','orden','opcion'];
  public dataSource3 = new MatTableDataSource<any>();
  @ViewChild('paginator3', { static: true }) paginator3!: MatPaginator;

  getDetllRegistro(){
    this.editRegistroService.getDetalleEdit(this.cod_tramite).subscribe(
      (rpta)=>{
        this.detalle_edit = rpta;

        this.dataTipoDoc.setValue(rpta.cCodTipoDoc)
        this.dataNroDocumento.setValue(rpta.cNroDocumento)

        this.dataCodInstitucion.setValue(rpta.iCodRemitente)
        this.dataNomInstitucion.setValue(rpta.cNombre)
        this.dataRemite.setValue(rpta.cNomRemite)

        this.dataAsunto.setValue(rpta.cAsunto)

        this.dataObservaciones.setValue(rpta.cObservaciones)

        this.dataParteDiario.setValue(rpta.cParteDiario)

        const fechaPlazoFinal = new Date(rpta.fechaPlazoFinal);
        if (fechaPlazoFinal.getTime() === new Date('1900-01-01T00:00:00').getTime()) {
          this.dataPlazoMaximo.setValue('');
        } else {
          this.dataPlazoMaximo.setValue(fechaPlazoFinal);
        }

        this.dataTema.setValue(rpta.iCodTema)

        this.dataCui.setValue(rpta.codCUI)

        this.dataPresentacion.setValue(rpta.nTipoPresentacion)
        this.dataArchivoFisico.setValue(rpta.archivO_FISICO)

        this.dataIndicacion.setValue(rpta.iCodIndicacion)

        if(rpta.cod_tpo_rgtro_dcmto === 1){
          this.getListComboOficinasPVD(rpta.iCodOficinaDerivar)
          this.tipo_oficina = 1
          this.dataOficina.setValue(rpta.iCodOficinaDerivar)
        }else if(rpta.cod_tpo_rgtro_dcmto === 2){
          this.getListComboOficnsRcc(rpta.iCodOficinaDerivar)
          this.tipo_oficina = 2
          this.dataOficina.setValue(rpta.iCodOficinaDerivar)
        }

        this.dataFlagEnvio.setValue(rpta.nFlgEnvio)
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

  getlistComboTemas(){
    this.registroPvdService.getComboTemas().subscribe(
      (rpta)=>{
        this.listComboTemas = rpta;
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

  getListComboOficinasPVD(cod:number){
    this.registroPvdService.getComboOficinasDerivadas(0,"",0).subscribe(
      (rpta)=>{
        const oficinasFiltradas = rpta.filter(oficina => {
          return oficina.estado === "1" && oficina.flagVisible && !oficina.flagVirtual;
        });
        oficinasFiltradas.sort((a, b) => a.nombreOficina.localeCompare(b.nombreOficina));
        this.listOficinasPvd = oficinasFiltradas;

        if(cod){
          const nro_doc = this.listOficinasPvd.find( (of) => of.idOficina == cod)?.numeroDocumentoRepresentante;
          if(nro_doc){
            this.registroPvdService.getObtenerUnRepresentante(1,10,0,"","",nro_doc).subscribe(
              (rpta)=>{
                if(rpta){
                  this.dataResponsableOficina.setValue(rpta.nombreCompleto)
                }else{
                  this.dataResponsableOficina.setValue('')
                }
              }
            )
          }else{
            this.dataResponsableOficina.setValue('')
          }
        }else{this.dataResponsableOficina.setValue('')}

      }
    )
  }

  getListComboOficnsRcc(cod:number){
    this.entradasGeneralesService.getComboOficinasRcc().subscribe(
      (rpta)=>{
        this.listOficinasRcc = rpta
        if(cod){
          const nomTrabajador = this.listOficinasRcc.find((oficina) => oficina.iCodOficina == cod)?.cNombresTrabajador;
          const apeTrabajador = this.listOficinasRcc.find((oficina) => oficina.iCodOficina == cod)?.cApellidosTrabajador;
          this.dataResponsableOficina.setValue(`${nomTrabajador } ${ apeTrabajador}`)
        }else{
          this.dataResponsableOficina.setValue('')
        }
      }
    )
  }

  selectOficinaRcc(event:any){
    const cod = event.target.value;
    if(cod){
      const nomTrabajador = this.listOficinasRcc.find((oficina) => oficina.iCodOficina == cod)?.cNombresTrabajador;
      const apeTrabajador = this.listOficinasRcc.find((oficina) => oficina.iCodOficina == cod)?.cApellidosTrabajador;
      this.dataResponsableOficina.setValue(`${nomTrabajador } ${ apeTrabajador}`)
    }else{
      this.dataResponsableOficina.setValue('')
    }
  }

  selectOficinaPvd(event:any){
    const cod = event.target.value;
    if(cod){
      const nro_doc = this.listOficinasPvd.find( (of) => of.idOficina == cod)?.numeroDocumentoRepresentante;
      if(nro_doc){
        this.registroPvdService.getObtenerUnRepresentante(1,10,0,"","",nro_doc).subscribe(
          (rpta)=>{
            if(rpta){
              this.dataResponsableOficina.setValue(rpta.nombreCompleto)
            }else{
              this.dataResponsableOficina.setValue('')
            }
          }
        )
      }else{
        this.dataResponsableOficina.setValue('')
      }
    }else{this.dataResponsableOficina.setValue('')}
  }



  updateRegistro(opc:number){
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}T${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    const opcion_update = opc;
    const formularioEnviar:PostDatosRegistro = {
      codUsuario:this.cod_user,
      opcion:opcion_update,
      codTramite: this.cod_tramite,
      codTipoDocumental: this.dataTipoDoc.value,
      numDocumento: this.dataNroDocumento.value,
      fechaDocumento:formattedDate,
      asunto:this.dataAsunto.value,
      observaciones:this.dataObservaciones.value,
      codRemitente: this.dataCodInstitucion.value,
      nomRemite: this.dataRemite.value,
      parteDiario:this.dataParteDiario.value,
      presentacion: this.dataPresentacion.value,
      archivoFisico: this.dataArchivoFisico.value,
      flgRequiereRespuesta:0,
      fechaPlazo:this.dataPlazoMaximo.value ? this.dataPlazoMaximo.value : '1900-01-01T00:00:00',
    }

    this.editRegistroService.postDetalleEdit(formularioEnviar).subscribe(
      (rpta)=>{
        this._snackBar.open('Se actualizó registro', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    )
  }

  updateFechaMaximo(){
    const formularioEnviar:PostFechaMaximo = {
      fechaPlazoFinal:      this.dataPlazoMaximo.value ? this.dataPlazoMaximo.value : '1900-01-01T00:00:00',
      codTramite:           this.cod_tramite,
      codUsuario:           this.authData.idUsuario.toString()
    }
    this.editRegistroService.postFechaPlazoMaximoEdit(formularioEnviar).subscribe(
      (rpta)=>{
        this._snackBar.open('Se actualizó registro', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    )
  }

  updateTema(){
    const formularioEnviar:PostTema = {
      codTema:     parseInt(this.dataTema.value,10),
      codTramite:  this.cod_tramite,
    }

    this.editRegistroService.postTemaEdit(formularioEnviar).subscribe(
      (rpta)=>{
        this._snackBar.open('Se actualizó registro', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    )
  }

  updateCui(){
    const formularioEnviar:PostCui = {
      codCUI:  this.dataCui.value,
      codTramite: this.cod_tramite,
    }

    this.editRegistroService.postCuiEdit(formularioEnviar).subscribe(
      (rpta)=>{
        this._snackBar.open('Se actualizó registro', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    )

  }

  enviar_doc(){
    const formularioEnviar:PostEnviaDoc ={
      codTramite:this.cod_tramite,
      flgEnvio:1
    }
    this.editRegistroService.postEnviarDoc(formularioEnviar).subscribe(
      (rpta)=>{
        this._snackBar.open('Se envió documento', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        this.detalle_edit.nFlgEnvio = 1;
      }
    )
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

        this.dataCodInstitucion.setValue(cod)
        this.dataNomInstitucion.setValue(nomb)

      }
    })
  }

  resetFecha(){
    this.dataPlazoMaximo.setValue('')
  }

  newReferencia(){
    const id_Tramite = this.cod_tramite;
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

  getListReferencias( cod: number) {
    this.docIntOfService.listReferencia(cod)
      .subscribe(
        (rpta:DataListReferencia[]) => {
          this.listadoReferencias = rpta;
          this.dataSource2.data = this.listadoReferencias;
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
            this.getListReferencias(this.cod_tramite);
          }
        )
      }
    })
  }


  newDocComplementario(){
    const id_Tramite = this.cod_tramite;
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
          iCodTramite: this.cod_tramite,
          iCodDigital: iCodDigital,
          nEstadoDigital: nEstadoDigital,
          norden: nOrden,
        });
      });
      // console.log(dataToUpdate);
      this.docIntOfService.ordenarArchivosComplementarios(dataToUpdate)
      .subscribe(
        () => {
          this.listDocComplementario(this.cod_tramite);
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
            this.listDocComplementario(this.cod_tramite);
          }
        )
      }
    })
  }


}
