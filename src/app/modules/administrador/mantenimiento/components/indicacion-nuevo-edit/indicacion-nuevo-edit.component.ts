import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostAddIndicaciones } from '../../interfaces/indicaciones.interface';
import { IndicacionesService } from '../../services/indicaciones.service';

@Component({
    selector: 'app-indicacion-nuevo-edit',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatDialogModule],
    templateUrl: './indicacion-nuevo-edit.component.html'
})

export class IndicacionNuevoEditComponent {

    public valor_formulario: boolean = false;
    public id_indicacion:number = 0;

    public myFormNewIndicacion:FormGroup = this.fb.group({
        CodIndicacion: [""],
        indicacion: [""],
    })

    private indicacionesService = inject(IndicacionesService);

    private dialogRef = inject(MatDialogRef<IndicacionNuevoEditComponent>);
    constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id_indicacion = data.id;
    }

    ngOnInit(): void {
    }

    // getdetalleIndicacionEdit(){
    //   if(this.id_indicacion){
    //     this.mantenimientoService.getDetalleIndicacion(this.id_indicacion).subscribe(
    //       (rpta)=>{
    //         this.myFormNewIndicacion.patchValue({
    //           CodIndicacion: rpta.iCodIndicacion,
    //           indicacion: rpta.cIndicacion
    //         })
    //       }
    //     )
    //   }
    // }

    onSubmit() {
      if (this.myFormNewIndicacion.invalid) {
        this.myFormNewIndicacion.markAllAsTouched();
        this.valor_formulario = false;
        return;
        }

        const { indicacion,} = this.myFormNewIndicacion.value;

        if (this.id_indicacion === 0) {

            const formularioNewIndicacion: PostAddIndicaciones = {
                indicacion: indicacion,
            }
            this.indicacionesService.postIndicaciones(formularioNewIndicacion).subscribe(
                ()=>{
                  this.dialogRef.close({ action: 'add' });
                }
            )
        }
        // else{
        //   const formularioActualizarEnviar: any = {
        //     codMensajeria: codMensajeria,
        //     contenido: contenido,
        //     codTrabajadorDestino: codTrabajadorDestino,
        //     codOficinaDestino: codOficinaDestino,
        //     estadoMensaje: estadoMensaje,
        //     codTrabajadorRegistro: codTrabajadorRegistro,
        //     nivel: nivel,
        //     prioridad: prioridad
        // };

        // this.mantenimientoService.updateMensajeria(formularioActualizarEnviar).subscribe(
        //   () => {
        //     console.log(formularioActualizarEnviar)
        //     this.dialogRef.close({ action: 'update' });
        //   }
        // );
        // }
    }
}
