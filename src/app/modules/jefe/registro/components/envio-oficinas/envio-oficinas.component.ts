import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DocIntOfService } from '../../services/doc-int-of.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DataListaIndicaciones, DataListaOficinasPaso1 } from '../../interfaces/doc-int-of.interface';

@Component({
  selector: 'app-envio-oficinas',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './envio-oficinas.component.html',
  styles: ``
})
export class EnvioOficinasComponent implements OnInit{

  public idTramiteMov : number = 0;
  public copias:boolean = false;
  public listOficinas: DataListaOficinasPaso1[] = [];
  public listIndicaciones: DataListaIndicaciones[] = [];

  public myFormOficinaDerivada: FormGroup = this.fb.group({
    codTramite:[0],
    codTrabajador: [82],//Ok
    codOficinaOrigen: [143],//Por mientras
    codOficinaDestino: ["",[Validators.required]],//Oficina Derivada
    codIndicacionMov: [11],//Indicacion
    prioridad: ["Media"],//PRioridad
    codPerfil: [0],
    codTipoMovimiento: [4], //Varia depende si es Copia Origina (1)
    verificaDuplicado: [0],
    verificaEnviado: [0],
    editar: [0],
  })



  private dialogRef = inject(MatDialogRef<EnvioOficinasComponent>);
  private docIntOfService = inject(DocIntOfService);
  private _snackBar = inject(MatSnackBar);

  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){
    this.idTramiteMov = data.id_Tramite;
    this.copias = data.solo_copias
    this.myFormOficinaDerivada.patchValue({
      codTramite:this.idTramiteMov
    })
  }

  ngOnInit(): void {
    this.getListadoOficinas();
    this.listarIndicaciones();
  }

  agregarOficina(){
    if (this.myFormOficinaDerivada.invalid ) {
      this.myFormOficinaDerivada.markAllAsTouched();
      return;
    }
    const {
      codTramite,
      codTrabajador,
      codOficinaOrigen,
      codOficinaDestino,
      codIndicacionMov,
      prioridad,
      codPerfil,
      codTipoMovimiento,
      verificaDuplicado,
      verificaEnviado,
      editar } = this.myFormOficinaDerivada.value;

      const formularioOficinaEnviar = {
        codTramite:codTramite,
        codTrabajador:codTrabajador,
        codOficinaOrigen:codOficinaOrigen,
        codOficinaDestino: parseInt(codOficinaDestino),
        codIndicacionMov:codIndicacionMov,
        prioridad:prioridad,
        codPerfil:codPerfil,
        codTipoMovimiento:codTipoMovimiento,
        verificaDuplicado:verificaDuplicado,
        verificaEnviado:verificaEnviado,
        editar:editar,
      }
      // console.log(formularioOficinaEnviar)
      this.docIntOfService.addOficinaDerivada(formularioOficinaEnviar).subscribe(
        (rpta)=>{
          this._snackBar.open('Registro Agregado', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.dialogRef.close({ action: 'add' });
          this.myFormOficinaDerivada.patchValue({
            codOficinaDestino : "",
            codIndicacionMov: 11,
            prioridad:"Media",
            codTipoMovimiento: 1
          })
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

  listarIndicaciones(){
    this.docIntOfService.getListIndicaciones().subscribe(
      (rpta:DataListaIndicaciones[])=>{
        this.listIndicaciones = rpta;
      }
    )
  }



}
