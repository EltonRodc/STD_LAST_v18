import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocIntProService } from '../../services/doc-int-pro.service';
import { DataComboColaborador, DataListaColaboradoresInternoProfesional } from '../../interfaces/doc-int-prof.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DataListaIndicaciones } from '../../interfaces/doc-int-of.interface';
import { DocIntOfService } from '../../services/doc-int-of.service';

@Component({
  selector: 'app-asignacion-colaborador',
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
  templateUrl: './asignacion-colaborador.component.html',
  styles: ``
})
export class AsignacionColaboradorComponent implements OnInit{

  public idTramiteMov : number = 0;
  public listColaboradores:DataListaColaboradoresInternoProfesional[] =[];
  public listComboColaborador: DataComboColaborador[] =[];
  public listIndicaciones: DataListaIndicaciones[] = [];


  public myFormColaboradorDerivado: FormGroup = this.fb.group({
    codTramite:[0],
    codTrabajador:[0],
    codTrabajadorDestino:[""],
    codIndicacionMov:[11],
    prioridad:["Media"],
    codPerfil:[0],
    codTipoMovimiento:[1],
    verificaDuplicado:[0],
    verificaEnviado:[0],
    editar:[0],
  })

  private dialogRef = inject(MatDialogRef<AsignacionColaboradorComponent>);
  private docIntProService = inject(DocIntProService);
  private docIntOfService = inject(DocIntOfService);
  private _snackBar = inject(MatSnackBar);
  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){
    this.idTramiteMov = data.id_Tramite;
  }

  ngOnInit(): void {
    this.listarComboColaborador();
    this.listarIndicaciones();
  }

  listarComboColaborador(){
    this.docIntProService.listarTrabajadorColaborador(143).subscribe(
      (rpta)=>{
        this.listComboColaborador = rpta;
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


  addColaborador(){
    if (this.myFormColaboradorDerivado.invalid ) {
      this.myFormColaboradorDerivado.markAllAsTouched();
      return;
    }
    const {
      codTramite,
      codTrabajador,
      codTrabajadorDestino,
      codIndicacionMov,
      prioridad,
      codPerfil,
      codTipoMovimiento,
      verificaDuplicado,
      verificaEnviado,
      editar
    } = this.myFormColaboradorDerivado.value;

    const formularioColaboradorEnviar = {
      codTramite: this.idTramiteMov,
      codTrabajador:codTrabajador,
      codTrabajadorDestino:parseInt(codTrabajadorDestino),
      codIndicacionMov:parseInt(codIndicacionMov),
      prioridad:prioridad,
      codPerfil:codPerfil,
      codTipoMovimiento:codTipoMovimiento,
      verificaDuplicado:verificaDuplicado,
      verificaEnviado:verificaEnviado,
      editar:editar,
    }

    // console.log(this.myFormColaboradorDerivado.value)
    this.docIntProService.agregarColaborador(formularioColaboradorEnviar).subscribe(
      (rpta)=>{
        this._snackBar.open('Colaborador asignado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.dialogRef.close({ action: 'add' });
      }
    )
  }

}
