import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { DataListTipoDocumentalCoProfes, DataListTrabajadoresCoProfes, DataOficinasCoProfesional } from '../../interfaces/correlativo-profesional.interface';
import { CorrelativoProfesionalService } from '../../services/correlativo-profesional.service';

@Component({
    selector: 'app-correlativo-profesional-nuevo',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatDialogModule],
    templateUrl: './correlativo-profesional-nuevo.component.html',
})
export class CorrelativoProfesionalNuevoComponent implements OnInit {

    public oficinasCoProfesional: DataOficinasCoProfesional[] = [];
    public listTrabajadores : DataListTrabajadoresCoProfes[] =[];
    public years: number[] = [];
    public tipoDocumental: DataListTipoDocumentalCoProfes[] = [];

    public myFormNewCoProfesional:FormGroup = this.fb.group({
        codOficina: ["",[Validators.required]],
        codTrabajador: ["",[Validators.required]],
        codTipoDoc  : ["",[Validators.required]],
        numAnio: [new Date().getFullYear(),[Validators.required]],
      })

      private correlativoProfesionalService = inject(CorrelativoProfesionalService);

    private dialogRef = inject(MatDialogRef<CorrelativoProfesionalNuevoComponent>);
    constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.getOficinasCoProfes();
        this.generateYearArray();
    }

    onSubmit(){
        if (this.myFormNewCoProfesional.invalid ) {
            this.myFormNewCoProfesional.markAllAsTouched();
            return;
        }
        this.correlativoProfesionalService.postTrabajadorNuevo(this.myFormNewCoProfesional.value).subscribe(
            (rpta)=>{
                this.dialogRef.close({ action: 'add' });
            }
        )

    }

    getOficinasCoProfes(){
        this.correlativoProfesionalService.getListOficinasCoProfesional()
            .subscribe(
            (rpta:DataOficinasCoProfesional[])=>{
                this.oficinasCoProfesional = rpta;
            },
            (error) => {
                console.error('Error al obtener las oficinas coProfesional', error);

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

    filtrarTrabCoProfesional(event:any): void {
        const codOficina = parseInt(event.target.value, 10);
        const anioActual = this.myFormNewCoProfesional.get('numAnio')?.value;
        if(codOficina ){
            this.correlativoProfesionalService.getListTrabjCoProfesional(codOficina).subscribe(
                (rpta: DataListTrabajadoresCoProfes[]) => {
                    this.listTrabajadores = rpta;
                    const primerCodigoTrabajador = this.listTrabajadores[0].iCodTrabajador;

                    if (this.listTrabajadores.length > 0) {
                        this.myFormNewCoProfesional.patchValue({
                            codTrabajador: primerCodigoTrabajador,
                            codTipoDoc: '',
                        });
                    }

                    if(rpta.length > 0){
                        this.correlativoProfesionalService.getListTipoDocumental(codOficina,primerCodigoTrabajador,anioActual).subscribe(
                            (rpta: DataListTipoDocumentalCoProfes[]) => {
                                this.tipoDocumental = rpta;
                              },
                        )
                    }
                }
            )
        }else{
            this.listTrabajadores = [];
            this.myFormNewCoProfesional.get('codTrabajador')?.setValue('');
            this.tipoDocumental = [];
            this.myFormNewCoProfesional.get('codTipoDoc')?.setValue('');
        }
    }

    filtrarTrabCoProfesionalTrabaj(event:any): void {
        const codTrabajador = parseInt(event.target.value, 10);
        const codOficina = parseInt(this.myFormNewCoProfesional.get('codOficina')?.value , 10);
        const anioActual = this.myFormNewCoProfesional.get('numAnio')?.value;
        this.correlativoProfesionalService.getListTipoDocumental(codOficina,codTrabajador,anioActual).subscribe(
            (rpta: DataListTipoDocumentalCoProfes[]) => {
                this.tipoDocumental = rpta;
                this.myFormNewCoProfesional.get('codTipoDoc')?.setValue('');
              },
        )
    }

    filtrarTrabCoProfesionalAnio(event:any): void {
        const anioActual = parseInt(event.target.value, 10);
        const codOficina = parseInt(this.myFormNewCoProfesional.get('codOficina')?.value , 10);
        const codTrabajador = parseInt(this.myFormNewCoProfesional.get('codTrabajador')?.value , 10);
        this.correlativoProfesionalService.getListTipoDocumental(codOficina,codTrabajador,anioActual).subscribe(
            (rpta: DataListTipoDocumentalCoProfes[]) => {
                this.tipoDocumental = rpta;
                this.myFormNewCoProfesional.get('codTipoDoc')?.setValue('');
              },
        )
    }
}
