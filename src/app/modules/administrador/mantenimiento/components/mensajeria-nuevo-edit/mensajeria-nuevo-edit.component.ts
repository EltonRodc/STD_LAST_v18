import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataListOfcnaDestino, PostAddMensajeria } from '../../interfaces/mensajeria.interface';
import { MensajeriaService } from '../../services/mensajeria.service';

@Component({
    selector: 'app-mensajeria-nuevo-edit',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatDialogModule],
    templateUrl: './mensajeria-nuevo-edit.component.html'
})

export class MensajeriaNuevoEditComponent {

    public comboOfcnaDestino:DataListOfcnaDestino[] =[];
    public valor_formulario: boolean = false;
    public id_mensajeria:number = 0;

    public myFormNewMensajeria:FormGroup = this.fb.group({
        codMensajeria: [""],
        contenido: ["",[Validators.required]],
        codTrabajadorDestino : [0],
        codOficinaDestino : [0],
        estadoMensaje : ["",[Validators.required]],
        codTrabajadorRegistro : [82],
        nivel : ["",[Validators.required]],
        prioridad : ["",[Validators.required]],
    })

    private mensajeriaService = inject(MensajeriaService);
    private dialogRef = inject(MatDialogRef<MensajeriaNuevoEditComponent>);
    constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id_mensajeria = data.id;
      // console.log(this.id_mensajeria)
    }

    ngOnInit(): void {
      this.getdetalleMensajeriaEdit();
      this.getListadoOficinaDestino();
    }

    getdetalleMensajeriaEdit(){
      if(this.id_mensajeria){
        this.mensajeriaService.getDetalleMensajeria(this.id_mensajeria).subscribe(
          (rpta)=>{
            this.myFormNewMensajeria.patchValue({
                codMensajeria: rpta.iCodMensajeria,
                contenido: rpta.cContenido,
                codTrabajadorDestino: rpta.iCodTrabajadorDestino,
                codOficinaDestino: rpta.iCodOficinaDestino,
                estadoMensaje: rpta.nEstadoMensaje,
                codTrabajadorRegistro: rpta.iCodTrabajadorRegistro,
                nivel: rpta.nNivel,
                prioridad: rpta.nPrioridad
            })
          }
        )
      }
    }

    getListadoOficinaDestino(){
        this.mensajeriaService.getListOficinaDestino().subscribe(
          (rpta)=>{
            this.comboOfcnaDestino = rpta;
          }
        )
    }

    onSubmit() {
      if (this.myFormNewMensajeria.invalid) {
        this.myFormNewMensajeria.markAllAsTouched();
        this.valor_formulario = false;
        return;
        }

        const { codMensajeria, contenido, codTrabajadorDestino, codOficinaDestino, estadoMensaje, codTrabajadorRegistro, nivel, prioridad,} = this.myFormNewMensajeria.value;

        if (this.id_mensajeria === 0) {

            const formularioNewMensajeria: PostAddMensajeria = {
                contenido: contenido,
                codTrabajadorDestino: codTrabajadorDestino,
                codOficinaDestino: codOficinaDestino,
                estadoMensaje: estadoMensaje,
                codTrabajadorRegistro: codTrabajadorRegistro,
                nivel: nivel,
                prioridad: prioridad
            }
            // console.log(formularioNewMensajeria)
            this.mensajeriaService.postMensajeria(formularioNewMensajeria).subscribe(
                ()=>{
                  this.dialogRef.close({ action: 'add' });
                }
            )
        }else{
          const formularioActualizarEnviar: any = {
            codMensajeria: codMensajeria,
            contenido: contenido,
            codTrabajadorDestino: codTrabajadorDestino,
            codOficinaDestino: codOficinaDestino,
            estadoMensaje: estadoMensaje,
            codTrabajadorRegistro: codTrabajadorRegistro,
            nivel: nivel,
            prioridad: prioridad
        };

        this.mensajeriaService.updateMensajeria(formularioActualizarEnviar).subscribe(
          () => {
            console.log(formularioActualizarEnviar)
            this.dialogRef.close({ action: 'update' });
          }
        );
        }
    }

}
