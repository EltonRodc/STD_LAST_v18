import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilService } from '../../services/perfil.service';
import { PostAddPerfil } from '../../interfaces/perfil.interface';

@Component({
    selector: 'app-perfil-nuevo-edit',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatDialogModule],
    templateUrl: './perfil-nuevo-edit.component.html'
})

export class PerfilNuevoEditComponent {

    public valor_formulario: boolean = false;
    public id_prfil:number = 0;

    public myFormNewPerfil:FormGroup = this.fb.group({
      perfil: [""],
    })

    private perfilService = inject(PerfilService)

    private dialogRef = inject(MatDialogRef<PerfilNuevoEditComponent>);
    constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.id_prfil = data.id;
    }

    ngOnInit(): void {
      // this.getdetallePerfilEdit();
    }

    // getdetallePerfilEdit(){
    //   if(this.id_prfil){
    //     this.mantenimientoService.getDetallePerfil(this.id_prfil).subscribe(
    //       (rpta)=>{
    //         this.myFormNewPerfil.patchValue({
    //             iCodPerfil: rpta.iCodPerfil,
    //             perfil: rpta.cDescPerfil
    //         })
    //       }
    //     )
    //   }
    // }

    onSubmit() {
      if (this.myFormNewPerfil.invalid) {
        this.myFormNewPerfil.markAllAsTouched();
        this.valor_formulario = false;
        return;
        }

        const { perfil,} = this.myFormNewPerfil.value;

        if (this.id_prfil === 0) {

            const formularioNewIndicacion: PostAddPerfil = {
              perfil: perfil,
            }
            this.perfilService.postPerfil(formularioNewIndicacion).subscribe(
                ()=>{
                  this.dialogRef.close({ action: 'add' });
                }
            )
        }
        // else{
        //   const formularioActualizarEnviar: any = {
        //     iCodPerfil: iCodPerfil,
        //     perfil: perfil
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
