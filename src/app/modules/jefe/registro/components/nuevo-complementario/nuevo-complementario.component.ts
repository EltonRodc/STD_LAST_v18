import { AfterViewInit, Component, ElementRef, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { DocIntOfService } from '../../services/doc-int-of.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nuevo-complementario',
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
  templateUrl: './nuevo-complementario.component.html',
  styles: ``
})
export class NuevoComplementarioComponent implements OnInit, AfterViewInit{

  public idTramiteMov : number = 0;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInput2') fileInput2!: ElementRef;
  public selectedTabIndex: number = 0;

  public myFormDocumentoComplemetarioArchivo1: FormGroup = this.fb.group({
    archivo:[,[Validators.required]],
    codTramite: [""],
    tipoArchivo: [1],
    descripcion: ["",[Validators.required]],
    flgEditar: ["N"],
    folios: [1,[Validators.required]],
    codUsuario: [82],
  })

  public myFormDocumentoComplemetarioArchivo4: FormGroup = this.fb.group({
    archivo:[,[Validators.required]],
    codTramite: [""],
    tipoArchivo: [4],
    descripcion: ["",[Validators.required]],
    flgEditar: ["N"],
    folios: [1,[Validators.required]],
    codUsuario: [82],
  })
  public myFormDocumentoComplementario: FormGroup = this.fb.group({
    codTramite: [""],
    tipoArchivo: [3],
    descripcion: ["",[Validators.required]],
    flgEditar: ["N"],
    folios: [1,[Validators.required]],
    codUsuario: [82],
    rutaExterna: ["",[Validators.required]],
  })


  private dialogRef = inject(MatDialogRef<NuevoComplementarioComponent>);
  private docIntOfService = inject(DocIntOfService);
  private _snackBar = inject(MatSnackBar);

  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){
    this.idTramiteMov = data.id_Tramite;
  }
  ngOnInit(): void {
    this.myFormDocumentoComplementario.patchValue({
      codTramite:this.idTramiteMov
    })
  }

  ngAfterViewInit(): void {

  }

  onFileSelected1(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      // console.log(file)
      this.myFormDocumentoComplemetarioArchivo1.patchValue({
        archivo: file,
      });
      // console.log(this.myFormDocumentoComplemetarioArchivo1.get('archivo')?.value)
    }
  }

  onFileSelected2(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.myFormDocumentoComplemetarioArchivo4.patchValue({
        archivo: file,
      });
    }
  }

  addDocComplementarioEnlace(){
    if (this.myFormDocumentoComplementario.invalid) {
      this.myFormDocumentoComplementario.markAllAsTouched();
      return;
    }
    console.log(this.myFormDocumentoComplementario.value)
    this.docIntOfService.cargaEnlaceTramite(this.myFormDocumentoComplementario.value).subscribe(
      response => {
        this.dialogRef.close({ action: 'add' });
        this._snackBar.open('Registrado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });


        this.myFormDocumentoComplementario.reset({
          descripcion: '',
          folios: 1,
          rutaExterna: '',
          flgEditar: 'N',
          codUsuario:82, //Actualizar
          codTramite:this.idTramiteMov.toString(),
          tipoArchivo:3,
        });
      },
      error => {
        console.error('Error al enviar datos:', error);
        // console.log(this.myFormDocumentoComplementario.value)
      }
    );
  }
  resetFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  addDoComplementarioArchivo1() {
    if (this.myFormDocumentoComplemetarioArchivo1.invalid) {
      this.myFormDocumentoComplemetarioArchivo1.markAllAsTouched();
      return;
    }
    const formData = new FormData();

    formData.append('archivo', this.myFormDocumentoComplemetarioArchivo1.get('archivo')!.value);
    formData.append('codTramite', this.idTramiteMov.toString());
    formData.append('tipoArchivo', "1");
    formData.append('descripcion', this.myFormDocumentoComplemetarioArchivo1.get('descripcion')!.value);
    formData.append('flgEditar', "N");
    formData.append('folios', this.myFormDocumentoComplemetarioArchivo1.get('folios')?.value);
    formData.append('codUsuario', this.myFormDocumentoComplemetarioArchivo1.get('codUsuario')!.value);

    this.docIntOfService.cargaArchivoTramite(formData).subscribe(
      response => {
        // console.log(this.myFormDocumentoComplemetarioArchivo1.get('archivo')?.value)
        // console.log(this.idTramiteMov)
        // console.log(this.myFormDocumentoComplemetarioArchivo1.get('tipoArchivo')?.value)
        // console.log(this.myFormDocumentoComplemetarioArchivo1.get('descripcion')?.value)
        // console.log(this.myFormDocumentoComplemetarioArchivo1.get('flgEditar')?.value)
        // console.log(this.myFormDocumentoComplemetarioArchivo1.get('folios')?.value)
        // console.log(this.myFormDocumentoComplemetarioArchivo1.get('codUsuario')?.value)
        this.dialogRef.close({ action: 'add' });

        this._snackBar.open('Registrado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        this.myFormDocumentoComplemetarioArchivo1.reset({
          descripcion: '',
          codTramite:this.idTramiteMov.toString(),
          folios: 1,
          tipoArchivo:1,
          flgEditar:'N',
          codUsuario:82, //Actualizar
          archivo:'',
        });
        this.resetFileInput();
      },
      error => {
        console.error('Error al enviar datos:', error);
        console.log(formData)
      }
    );
  }
  resetFileInput2() {
    if (this.fileInput2) {
      this.fileInput2.nativeElement.value = '';
    }
  }
  addDoComplementarioArchivo4(){
    if (this.myFormDocumentoComplemetarioArchivo4.invalid) {
      this.myFormDocumentoComplemetarioArchivo4.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    formData.append('archivo', this.myFormDocumentoComplemetarioArchivo4.get('archivo')!.value);
    formData.append('codTramite', this.idTramiteMov.toString());
    formData.append('tipoArchivo', "4");
    formData.append('descripcion', this.myFormDocumentoComplemetarioArchivo4.get('descripcion')!.value);
    formData.append('flgEditar', "N");
    formData.append('folios', this.myFormDocumentoComplemetarioArchivo4.get('folios')!.value);
    formData.append('codUsuario', this.myFormDocumentoComplemetarioArchivo4.get('codUsuario')!.value);

    this.docIntOfService.cargaArchivoTramite(formData).subscribe(
      response => {
        this.dialogRef.close({ action: 'add' });
        this._snackBar.open('Registrado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });

        // this.listDocComplementario(this.idTramiteMov);
        this.dialogRef.getState()

        this.myFormDocumentoComplemetarioArchivo4.reset({
          descripcion: '',
          codTramite:this.idTramiteMov.toString(),
          folios: 1,
          tipoArchivo:4,
          flgEditar:'N',
          codUsuario:82, //Actualizar
          archivo:'',
        });
        this.resetFileInput2();
      },
      error => {
        console.error('Error al enviar datos:', error);
      }
    );
  }


}
