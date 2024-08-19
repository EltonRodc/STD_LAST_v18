import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { EntradasGeneralesService } from '../../services/entradas-generales.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DataAuth } from '../../../../../core/interfaces/auth';
import { AuthDataService } from '../../../../../core/services/auth-data.service';
import { MatCardModule } from '@angular/material/card';
import { DataListadoComboTipoDocumento } from '../../../../jefe/consulta/interfaces/consulta';
import { ConsultaService } from '../../../../jefe/consulta/services/consulta-interno-oficina.service';
import { RegistroPvdService } from '../../../registro/services/registro-pvd.service';
import { DataComboTemas, DataDocumentoRegistrado, DataOficinasDerivadas } from '../../../registro/interfaces/registro-pvd.interface';
import { DataConsultaBandejaEnlace, DataOficinasRcc, DataRegistrador } from '../../interfaces/entradas-generales.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

//Excel
import * as ExcelJS from 'exceljs';
//PDF
import pdfMake from '../../../../../core/pdf/pdfmake-config';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-entradas-generales',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinner,
    MatPaginator,
    DatePipe,
    MatTooltipModule,
    RouterLink,
    MatMenuModule
  ],
  templateUrl: './entradas-generales.component.html',
  styles: ``
})
export class EntradasGeneralesComponent implements OnInit, AfterViewInit{

  public authData!: DataAuth | null;
  public comboListadoTpoDcmto:DataListadoComboTipoDocumento[]=[];
  public comboOficinasPVD : DataOficinasDerivadas[] = [];
  public comboRegistradores: DataRegistrador[] = [];
  public listComboTemas: DataComboTemas[] = [];
  public consultaBndjEnlace:DataConsultaBandejaEnlace[] =[];
  public isFetchingData: boolean = false;
  public infoRegistroOficinas: DataDocumentoRegistrado[] = [];
  public comboOfinasRcss: DataOficinasRcc[] = [];

  public codigo_trabajador_registro: number = 0;

  public myFormBandejaEnlace:FormGroup =this.fb.group({
    FechaInicio: [""],                        //14 input
    FechaFin: [""],                           //15 input
    Codificacion: [""],                       //Primer input
    Referencia: [""],                         // Quinto input
    Asunto: [""],                             //Segundo input
    CodigoTupa: [0],
    CodigoTipoDocumento: [0],                 //Tercer Input
    CodigoRegistrador: [0],                   // 10 input
    Nombre: [""],                              // Institución 6 INPUT
    Remitente: [""],                          // Institución 7 INPUT
    CodigoOficinaOrigen: [0],                 // Octavo input
    CodigoOficinaDestino: [0],                // Nueve Input
    NumeroDocumento: [""],                    // Cuarto Input
    CodigoTema: [0],                          //11 input
    CUI: [""],                                // 12 INPUT
    Campo: [""],
    Orden: [""],
    NumContrato: [""],                        //13 input
    HoraIni: [""],                            //14 input
    HoraFin: [""],                            //15 input
    CodigoTipoRegistroDoc: [1],               // 16 input
  })

  ngOnInit(): void {
    this.authData = this.authDataService.getAuthData();
    if(this.authData){
      this.myFormBandejaEnlace.patchValue({
        CodigoRegistrador:this.authData.idUsuario,
        FechaInicio: moment().toDate(),
        FechaFin: moment().toDate(),
        HoraIni:"00:00",
        HoraFin:"23:59",
      })
    }
    this.getListadoComboTpoDcmto();
    this.getOficinas();
    this.getListRegistradores();
    this.getlistComboTemas();
    this.getListComboOficnsRcc();
    this.onConsulta();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public displayedColumns: string[] = ['n_tramite', 'documento','remitente','fecha_registro','oficina_derivada','asunto', 'acciones'];
  // public displayedColumns: string[] = ['prueba'];

  public dataSource = new MatTableDataSource<DataConsultaBandejaEnlace>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private authDataService = inject(AuthDataService);
  private entradasGeneralesService = inject(EntradasGeneralesService);
  private registroPvdService = inject(RegistroPvdService)
  private consultaService = inject(ConsultaService);
  private router = inject(Router);
  constructor(private fb: FormBuilder,public dialog: MatDialog){}


  onConsulta(){
    this.isFetchingData = true;
    this.codigo_trabajador_registro = this.myFormBandejaEnlace.get('CodigoRegistrador').value;
    const {FechaInicio,FechaFin,Codificacion,Referencia,Asunto,CodigoTupa,CodigoTipoDocumento,CodigoRegistrador,
      Nombre,Remitente,CodigoOficinaOrigen,CodigoOficinaDestino,NumeroDocumento,CodigoTema,
      CUI,Campo,Orden,NumContrato,HoraIni,HoraFin,CodigoTipoRegistroDoc} = this.myFormBandejaEnlace.value;

    this.entradasGeneralesService.getConsultaBandejaEnlace( this.formatFecha(FechaInicio),this.formatFecha(FechaFin),Codificacion,Referencia,Asunto,
      CodigoTupa,CodigoTipoDocumento,CodigoRegistrador,Nombre,Remitente,CodigoOficinaOrigen,CodigoOficinaDestino,
      NumeroDocumento,CodigoTema,CUI,Campo,Orden,NumContrato,HoraIni,HoraFin,CodigoTipoRegistroDoc).subscribe(
      (rpta)=>{
        // console.log(rpta)
        this.consultaBndjEnlace = rpta;
        this.dataSource.data = this.consultaBndjEnlace;
        this.isFetchingData = false;
      }
    )
  }

  getListadoComboTpoDcmto(){
    this.consultaService.getListadoComboTipoDocumento().subscribe(
      (rpta)=>{
        this.comboListadoTpoDcmto = rpta;
      }
    )
  }

  getOficinas(){
    this.registroPvdService.getComboOficinasDerivadas(0,"",0).subscribe(
      (rpta) => {
        this.comboOficinasPVD = rpta.sort((a, b) => (a.nombreOficina > b.nombreOficina) ? 1 : -1);
      }
    );
  }

  getListRegistradores(){
    this.entradasGeneralesService.getComboRegistrador().subscribe(
      (rpta)=>{
        this.comboRegistradores = rpta;
      }
    )
  }

  getlistComboTemas(){
    this.registroPvdService.getComboTemas().subscribe(
      (rpta)=>{
        this.listComboTemas = rpta;
      }
    )
  }

  getListComboOficnsRcc(){
    this.entradasGeneralesService.getComboOficinasRcc().subscribe(
      (rpta)=>{
        this.comboOfinasRcss = rpta;
      }
    )
  }

  private formatFecha(date: Date | null): string {
    return date ? moment(date).format('DD/MM/YYYY') : '';
  }

  reset(){
    this.myFormBandejaEnlace.patchValue({
      CodigoRegistrador: this.authData ? this.authData.idUsuario : 0,
      FechaInicio: moment().toDate(),
      FechaFin: moment().toDate(),
      HoraIni: "00:00",
      HoraFin: "23:59",
      CodigoTipoRegistroDoc: 1,
      Codificacion: "",
      Referencia: "",
      Asunto: "",
      CodigoTupa: 0,
      Nombre: "",
      Remitente: "",
      CodigoOficinaOrigen: 0,
      CodigoOficinaDestino: 0,
      CodigoTipoDocumento:0,
      NumeroDocumento: "",
      CodigoTema: 0,
      CUI: "",
      Campo: "",
      Orden: "",
      NumContrato: "",
    })
    this.onConsulta();
  }

  redirectDetalle(cod_tramite:number){
    const url = this.router.serializeUrl(this.router.createUrlTree([`/std/registro-detalle/${cod_tramite}`]));
    window.open(url, '_blank');
  }

  reporte_excel(){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('consultaEntradaGeneral_L');

    // Combinación de celdas y agregación de datos
    worksheet.mergeCells('A1:H2');
    worksheet.getCell('A1').value = 'REPORTE - ENTRADAS GENERALES (L)';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('A3:F3');
    worksheet.getCell('A3').value = 'MESA DE PARTES - SEDE CENTRAL';

    worksheet.mergeCells('G3:H3');
    worksheet.getCell('G3').value = `STD, ${new Date().toLocaleDateString()}`;
    worksheet.getCell('G3').alignment = { vertical: 'middle', horizontal: 'right' };

    worksheet.mergeCells('A4:H4');
    worksheet.getCell('A4').value = 'GENERADO POR : SONIA DIAZ GARCIA';

    worksheet.mergeCells('A5:H5');

    const headers = [
      'Nº Trámite', 'Nº Parte Diario', 'Registrado por', 'Tipo Documento', 'Nº Documento', 'Institución',
      'Atención a', 'Registrado el', 'Asunto', 'Derivado el','Oficina Derivar','Oficina Actual','Copia a Oficina',
      'Estado','Doc. de Respuesta','Fecha','Oficina',
    ];

    worksheet.insertRow(6, headers);

    // const columnWidths = [15, 18, 18, 20, 18, 30, 30, 30, 30, 30, 30, 30, 30, 30, 20, 10, 10];
    // columnWidths.forEach((width, index) => {
    //   worksheet.getColumn(index + 1).width = width;
    // });

    if (this.consultaBndjEnlace && this.consultaBndjEnlace.length > 0){
      this.consultaBndjEnlace.forEach(data => {

        const fechaRegistro = data.fFecRegistro
        ? moment(data.fFecRegistro).format('DD/MM/YYYY HH:mm')
        : 'Sin Registro';

        const row =[
          data.cCodificacion.trim(),
          data.cParteDiario.trim(),
          data.registradorApellidos.trim() + ' ' + data.registradorNombres.trim(),
          data.cDescTipoDoc.trim(),
          data.cNroDocumento.trim(),                                   //Numero de Documento
          data.remitente.trim(),                                       //Institucion
          data.cNomRemite.trim(),                                      //Atencion a
          fechaRegistro.trim(),
          data.cAsunto.trim(),
          fechaRegistro.trim(),                                        //Fecha de Derivo
          data.oficDerivo.trim(),                                      //Oficina Derivo
          '',
          '',
          '',
          '',
          '',
          '',
        ]
        const newRow = worksheet.addRow(row);
        newRow.eachCell((cell) => {
          cell.font = { size: 10 };  // Ajusta el tamaño de la fuente
        });

      })
    }
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength + 2; // Ajusta el ancho con un pequeño margen
    });

    //Estilos
    worksheet.getRow(1).font = { bold: true, size: 16 };
    worksheet.getRow(3).font = { size: 12 };
    worksheet.getRow(4).font = { size: 12 };

    worksheet.getRow(6).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D8D8D8' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    //Descargar
    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ConsultaEntradaGeneral_L.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });

  }


  async reporte_pdf() {
    const base64Image = await this.convertFileToBase64('/images/logopdf.png');
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

    const documentDefinition: any = {
      pageOrientation: 'landscape',
      content: [
        {
          columns: [
            {
              image: base64Image,
              width: 180
            },
            {
              text: formattedDate,
              alignment: 'right', fontSize: 10,bold: true,
            }
          ]
        },
        {
          text: ' ',
        },
        {
          text: 'Lista de Documentos por Enviar por Oficinas',
          alignment: 'center', fontSize: 12,bold: true,
        },
        {
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 1,
            // widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            widths: ['15%', '15%', '20%', '15%', '20%', '15%'],
            body: [
              // Cabeceras de la tabla
              [
                { text: 'Nº Trámite',style: 'tableHeader'},
                { text: 'Nº Documento', style: 'tableHeader' },
                { text: 'Institución', style: 'tableHeader' },
                { text: 'Fecha Derivo', style: 'tableHeader' },
                { text: 'Oficina Derivo', style: 'tableHeader' },
                { text: 'Adjunto', style: 'tableHeader' }
              ],
            ]
          },
          layout: {
            hLineColor: function() { return '#d0d0d0'; },
            vLineColor: function() { return '#d0d0d0'; }
          }
        }
      ],
      styles: {
        tableHeader: {
          fillColor: '#D3D3D3',
          bold: true,
          fontSize: 10,
          alignment: 'center',
        },
        tableContent : {
          fontSize: 9,
          margin: [0, 2, 0, 0],
        },
      },
      footer: function(currentPage, pageCount, pageSize) {
        return [
          {
            columns: [
              {
                text: 'SONIA DIAZ GARCIA',
                alignment: 'left',
                fontSize: 10
              },
              {
                text: `Página ${currentPage} de ${pageCount}`,
                alignment: 'right',
                fontSize: 10
              }
            ],
            margin: [40, 0]
          }
        ];
      },
    }

    const formatDate = (date: Date) => {
      return date ? moment(date).format('DD-MM-YYYY HH:mm') : '';
    };

    this.consultaBndjEnlace.forEach((data, index) => {
      documentDefinition.content[3].table.body.push([
        { text: data.cCodificacion ,style: 'tableContent'},
        { text: data.cNroDocumento ,style: 'tableContent'},
        { text: data.remitente ,style: 'tableContent'},
        { text: formatDate(data.fFecRegistro) ,style: 'tableContent'},
        { text: data.oficDerivo ,style: 'tableContent'},
        { text: data.archivo_Fisico ,style: 'tableContent'},
      ])
    })


    pdfMake.createPdf(documentDefinition).open();
  }

  convertFileToBase64(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', filePath);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

}
