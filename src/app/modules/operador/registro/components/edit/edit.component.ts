import { Component, inject, Input, OnInit } from '@angular/core';
import { EditRegistroService } from '../../../consulta/services/edit-registro.service';
import { DataEditRegistro, PostDatosRegistro, PostEnviaDoc } from '../../../consulta/interfaces/edit.interface';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { DataComboTipoDocumental } from '../../interfaces/registro-pvd.interface';
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

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatCardModule,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltip
  ],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit{

  @Input() cod_tramite!: number;
  public detalle_edit?: DataEditRegistro;
  public listTipoDocumental: DataComboTipoDocumental[] =[];

  public authData!: DataAuth | null;
  public cod_user:number = 0;

  public dataTipoDoc:FormControl = new FormControl("");
  public dataNroDocumento: FormControl = new FormControl("");
  public dataCodInstitucion: FormControl = new FormControl("");
  public dataNomInstitucion: FormControl = new FormControl("");
  public dataRemite: FormControl = new FormControl("");
  public dataAsunto: FormControl = new FormControl("");
  public dataObservaciones: FormControl = new FormControl("");

  ngOnInit(): void {
    this.authData = this.authDataService.getAuthData();
    this.cod_user = this.authData.idUsuario;
    this.getListComboTipoDocumental();
    if(this.cod_tramite){
      this.getDetllRegistro();
    }
  }

  private authDataService = inject(AuthDataService)
  private registroPvdService = inject(RegistroPvdService)
  private editRegistroService = inject(EditRegistroService)
  private _snackBar = inject(MatSnackBar);
  constructor(public dialog: MatDialog){}

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

  updateRegistro(opc:number){
    const opcion_update = opc;
    const formularioEnviar:PostDatosRegistro = {
      codUsuario:this.cod_user,
      opcion:opcion_update,
      codTramite: this.cod_tramite,
      codTipoDocumental: this.dataTipoDoc.value,
      numDocumento: this.dataNroDocumento.value,
      fechaDocumento:"2024-08-15T10:38:36.347Z",
      asunto:this.dataAsunto.value,
      observaciones:this.dataObservaciones.value,
      codRemitente: this.dataCodInstitucion.value,
      nomRemite: this.dataRemite.value,
      parteDiario:"",
      presentacion:0,
      archivoFisico:"",
      flgRequiereRespuesta:0,
      fechaPlazo:"2024-08-15T10:38:36.347Z"
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

}
