import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostAddIndicaciones, PostEditIndicaciones } from '../../interfaces/indicaciones.interface';
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
        indicacion: ["",[Validators.required]],
    })

    private indicacionesService = inject(IndicacionesService);

    private dialogRef = inject(MatDialogRef<IndicacionNuevoEditComponent>);
    constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id_indicacion = data.id;
      if(this.id_indicacion){
        this.myFormNewIndicacion.patchValue({
          CodIndicacion: this.id_indicacion
        })
      }
    }

    ngOnInit(): void {
      this.getdetalleIndicacionEdit()
    }

    getdetalleIndicacionEdit(){
      if(this.id_indicacion){
        this.indicacionesService.getDetalleIndicacion(this.id_indicacion).subscribe(
          (rpta)=>{
            this.myFormNewIndicacion.patchValue({
              CodIndicacion: rpta[0].iCodIndicacion,
              indicacion: rpta[0].cIndicacion.trim(),
            })
          }
        )
      }
    }

    onSubmit() {

      if (this.myFormNewIndicacion.invalid) {
        this.myFormNewIndicacion.markAllAsTouched();
        this.valor_formulario = false;
        return;
        }

        const { CodIndicacion,indicacion} = this.myFormNewIndicacion.value;

        if (this.id_indicacion === 0) {

            const formularioNewIndicacion: PostAddIndicaciones = {
              indicacion: indicacion,
            }
            this.indicacionesService.postIndicaciones(formularioNewIndicacion).subscribe(
                ()=>{
                  this.dialogRef.close({ action: 'add' });
                }
            )
        }else{
          this.indicacionesService.editarIndicaciones(CodIndicacion,indicacion).subscribe(
            (rpta)=>{
              this.dialogRef.close({ action: 'update' });
            }
          )
        }
    }
}
