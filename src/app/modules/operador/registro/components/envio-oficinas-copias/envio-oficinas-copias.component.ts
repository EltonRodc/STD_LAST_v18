import { AfterViewInit, Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DataAuth } from '../../../../../core/interfaces/auth';
import { AuthDataService } from '../../../../../core/services/auth-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataComboIndicaciones, DataOficinasDerivadas, PostOficinaCopia } from '../../interfaces/registro-pvd.interface';
import { RegistroPvdService } from '../../services/registro-pvd.service';

@Component({
  selector: 'app-envio-oficinas-copias',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './envio-oficinas-copias.component.html',
  styles: ``
})
export class EnvioOficinasCopiasComponent implements OnInit{

  public authData!: DataAuth | null;
  public listOficinasDerivds: DataOficinasDerivadas[] = [];
  public listIndicaciones: DataComboIndicaciones[] = [];

  public myFormOficinaCopias: FormGroup = this.fb.group({
    codTramite:[0],               //Ok
    codTrabajadorRegistro: [0],   //Ok
    nFlgTipoDoc: [1],             //Ok
    codOficinaOrigen:[0],         //Ok
    codOficinaDerivar: ["",[Validators.required]],      //Ok HTML
    codTrabajadorDerivar: [0],    //Ok
    asuntoDerivar: [""],          //Ok vacio
    observacionesDerivar: ["",[Validators.required]],   //Ok HTML
    codTipoDocDerivar: [0],
    codIndicacionDerivar: [11],    // Ok HTML
    fecDerivar: [""],             //Ok
    estadoMovimiento: [1],        //Ok
    fecMovimiento: [""],          //Ok
    nFlgEnvio: [0],               // Ok html
    flgTipoMovimiento: [1],       // Ok HTML

    nombreTrabajadorDerivar:[""]
  })

  private dialogRef = inject(MatDialogRef<EnvioOficinasCopiasComponent>);
  private registroPvdService = inject(RegistroPvdService)
  private authDataService = inject(AuthDataService);


  ngOnInit(): void {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
    const milliseconds = ('00' + currentDate.getMilliseconds()).slice(-3);
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;


    this.authData = this.authDataService.getAuthData();
    if(this.authData){
      this.myFormOficinaCopias.patchValue({
        codTrabajadorRegistro:this.authData.idUsuario,
        codOficinaOrigen: this.authData.idOficina,
        fecDerivar: formattedDate,
        fecMovimiento: formattedDate
      })
    }
    this.getListComboOficinasDeriv();
    this.getListComboIndicaciones();
  }


  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any){
    this.myFormOficinaCopias.patchValue({
      codTramite : data.id_Tramite,
      codTipoDocDerivar: parseInt(data.tipo_doc, 10)
    })
  }

  onSubmit(){
    if (this.myFormOficinaCopias.invalid ) {
      this.myFormOficinaCopias.markAllAsTouched();
      return;
    }
    const {codTramite,codTrabajadorRegistro,nFlgTipoDoc,codOficinaOrigen,codOficinaDerivar,codTrabajadorDerivar,asuntoDerivar,
      observacionesDerivar,codTipoDocDerivar,codIndicacionDerivar,fecDerivar,estadoMovimiento,fecMovimiento,nFlgEnvio,flgTipoMovimiento
    } = this.myFormOficinaCopias.value;

    const formaularioEnviar:PostOficinaCopia = {
      codTramite,
      codTrabajadorRegistro,
      nFlgTipoDoc,
      codOficinaOrigen,
      codOficinaDerivar,
      codTrabajadorDerivar,
      asuntoDerivar,
      observacionesDerivar,
      codTipoDocDerivar,
      codIndicacionDerivar,
      fecDerivar,
      estadoMovimiento,
      fecMovimiento,
      nFlgEnvio,
      flgTipoMovimiento
    }

    this.registroPvdService.postOficinasDerivadas(formaularioEnviar).subscribe(
      (rpta)=>{
        this.dialogRef.close({ action: 'add' });
      }
    )
  }

  getListComboOficinasDeriv(){
    this.registroPvdService.getComboOficinasDerivadas(0,"",0).subscribe(
      (rpta)=>{

        const oficinasFiltradas = rpta.filter(oficina => {
          return oficina.estado === "1" && oficina.flagVisible && !oficina.flagVirtual;
        });
        oficinasFiltradas.sort((a, b) => a.nombreOficina.localeCompare(b.nombreOficina));
        this.listOficinasDerivds = oficinasFiltradas;

        //No tiene Responsable = COMISION DE SERVICIOS DE CONTROL ESPECIFICO OBRAS
      }
    )
  }

  mostrarResponsable(event: any) {
    const id_oficina = event.target.value;
    if(id_oficina){
      const nro_doc = this.listOficinasDerivds.find( (oficina) => oficina.idOficina == id_oficina)?.numeroDocumentoRepresentante;
      // console.log(nro_doc)
      if(nro_doc){
        this.registroPvdService.getObtenerUnRepresentante(1,10,0,"","",nro_doc).subscribe(
          (rpta)=>{
            if(rpta){
              this.myFormOficinaCopias.patchValue({
                nombreTrabajadorDerivar: rpta.nombreCompleto,
                codTrabajadorDerivar: nro_doc
              })
            }else{
              this.myFormOficinaCopias.patchValue({
                nombreTrabajadorDerivar: "",
                codTrabajadorDerivar: 0
              })
            }
          }
        )
      }else{
        this.myFormOficinaCopias.patchValue({
          nombreTrabajadorDerivar: "",
          codTrabajadorDerivar: 0
        })
      }
    }else{
      this.myFormOficinaCopias.patchValue({
        nombreTrabajadorDerivar: "",
        codTrabajadorDerivar: 0
      })
    }

  }

  getListComboIndicaciones(){
    this.registroPvdService.getComboIndicaciones().subscribe(
      (rpta)=>{
        this.listIndicaciones = rpta;
      }
    )
  }

}
