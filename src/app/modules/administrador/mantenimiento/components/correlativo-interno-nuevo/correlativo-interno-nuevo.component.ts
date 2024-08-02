import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { DataOficinaCoInterno, DataTipoDocCoInterno } from '../../interfaces/correlativo-interno.interface';
import { CorrelativoInternoService } from '../../services/correlativo-interno.service';
@Component({
    selector: 'app-correlativo-interno-nuevo',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatDialogModule],
    templateUrl: './correlativo-interno-nuevo.component.html',
})
export class CorrelativoInternoNuevoComponent {

    public oficinasCoInterno: DataOficinaCoInterno[] = [];
    public years: number[] = [];
    public tipoDocumental: DataTipoDocCoInterno[] = [];

    public myFormNewCoInterno:FormGroup = this.fb.group({
        codTipoDoc: ["",[Validators.required]],
        codOficina: ["",[Validators.required]],
        numAño: [new Date().getFullYear(),[Validators.required]],
    })

    private correlativoInternoService = inject(CorrelativoInternoService);

    private dialogRef = inject(MatDialogRef<CorrelativoInternoNuevoComponent>);
    constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.getOficinasCoInterno();
        this.generateYearArray();
    }

    onSubmit(){
        if (this.myFormNewCoInterno.invalid ) {
            this.myFormNewCoInterno.markAllAsTouched();
            return;
        }
        this.correlativoInternoService.postNeCoInterno(this.myFormNewCoInterno.value).subscribe(
            (rpta)=>{
                this.dialogRef.close({ action: 'add' });
            }
        )

    }

    getOficinasCoInterno(){
        this.correlativoInternoService.getListOficinasCoInterno()
            .subscribe(
            (rpta:DataOficinaCoInterno[])=>{
                this.oficinasCoInterno = rpta;
            },
            (error) => {
                console.error('Error al obtener las oficinas coInterno', error);

            }

            )
    }

    generateYearArray(): void {
        const currentYear = new Date().getFullYear();
        const futureYear = currentYear + 5;
        for (let i = currentYear; i <= futureYear; i++) {
          this.years.push(i);
        }
    }

    filtrarTipoDocCoProfesional(event:any): void {
        const codOficina = parseInt(event.target.value, 10);
    //    console.log(codOficina)
        const numAño = this.myFormNewCoInterno.get('numAño')?.value;
        if(codOficina ){
            this.correlativoInternoService.getListTipoDocInterno(codOficina).subscribe(
                (rpta: DataTipoDocCoInterno[]) => {
                    this.tipoDocumental = rpta;
                    // console.log(this.tipoDocumental)
                    const primerCodigoTrabajador = this.tipoDocumental[0].cCodTipoDoc;

                    if (this.tipoDocumental.length > 0) {
                        this.myFormNewCoInterno.patchValue({
                            codTipoDoc: primerCodigoTrabajador,
                        });
                    }

                }
            )
        }else{
            this.tipoDocumental = [];
            this.myFormNewCoInterno.get('codTipoDoc')?.setValue('');
        }
    }

    // filtrarTrabCoProfesionalTrabaj(event:any): void {
    //     const codTrabajador = parseInt(event.target.value, 10);
    //     const codOficina = parseInt(this.myFormNewCoInterno.get('codOficina')?.value , 10);
    //     const anioActual = this.myFormNewCoInterno.get('numAnio')?.value;
    //     this.correlativoInternoService.getListTipoDocInterno(codOficina).subscribe(
    //         (rpta: DataTipoDocCoInterno[]) => {
    //             this.tipoDocumental = rpta;
    //             this.myFormNewCoInterno.get('codTipoDoc')?.setValue('');
    //           },
    //     )
    // }

    // filtrarTipoDocCoProfesionalAnio(event:any): void {
    //     const anioActual = parseInt(event.target.value, 10);
    //     const codOficina = parseInt(this.myFormNewCoInterno.get('codOficina')?.value , 10);
    //     const codTipoDoc = parseInt(this.myFormNewCoInterno.get('codTipoDoc')?.value , 10);
    //     this.correlativoInternoService.getListTipoDocInterno(codOficina).subscribe(
    //         (rpta: DataTipoDocCoInterno[]) => {
    //             this.tipoDocumental = rpta;
    //             this.myFormNewCoInterno.get('codTipoDoc')?.setValue('');
    //           },
    //     )
    // }

}