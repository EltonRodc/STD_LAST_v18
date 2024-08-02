import { DatePipe, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideDateAdapter } from '../../../../../core/providers/date-adapter.provider';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { DataBandejaComboOficinaDestino, DataBandejaComboTipoDocumento, DataBandejaExcelDerivados, DataBandejaTablaDerivados } from '../../interfaces/bandeja-derivados.interface';
import { BandejaDerivadosService } from '../../services/bandeja-derivados.service';
import moment from 'moment';
import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-derivados',
  standalone: true,
  providers: [
    provideDateAdapter(),
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatPaginator,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    DatePipe,
    MatTooltipModule,
    UpperCasePipe
  ],
  templateUrl: './derivados.component.html',
  styles: ``
})
export class DerivadosComponent implements OnInit, AfterViewInit{

  public isFetchingData: boolean = false;
  public listadoTablaDeribados: DataBandejaTablaDerivados[] = [];
  public listadoExcelDerivados: DataBandejaExcelDerivados[] = [];
  public comboListadoTpoDcmto:DataBandejaComboTipoDocumento[]=[];
  public comboListadoOficDest:DataBandejaComboOficinaDestino[]=[];

  public myFormBandejaDerivados:FormGroup = this.fb.group({
    Entrada : [0],  //Ok
    Interno : [0],  //Ok
    Salida:[0],     //Ok
    // fechaDesde:[moment().subtract(7, 'days').toDate()],
    fechaDesde: [moment().subtract(2, 'years').toDate()],
    fechaHasta:[moment().toDate()], //Ok
    horaInicio:["00:00"], //Ok
    horaFin:["23:59"],  //Ok
    Codificacion:[""],  //Ok
    Asunto:[""],  // api no bota data correcta
    CodOficinaLogin:[143],  //Ok
    CodTipoDoc : [0], //Ok
    CodTema : [0],
    CodOficinaDes : [0],
    Aceptado : [0], //Ok
    SAceptado : [0],  //Ok
    Columna : [""],
    Idir:[""]
  })

  public displayedColumns: string[] = ['tramite', 'doc_origen', 'asunto_tupa' , 'derivado_con' , 'derivado_a' ,'adjuntos','acciones'];
  public dataSource = new MatTableDataSource<DataBandejaTablaDerivados>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private bandejaDerivadosService = inject(BandejaDerivadosService)
  constructor(
    private fb: FormBuilder
  ){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getListadoComboTpoDcmto();
    this.getListadoOficinaDestino();
    this.onSearch();
  }

  onSearch(){
    this.isFetchingData = true;
    const {Entrada,Interno,Salida,fechaDesde,fechaHasta,horaInicio,horaFin,Codificacion,Asunto,CodOficinaLogin,CodTipoDoc,
      CodTema,CodOficinaDes,Aceptado,SAceptado,Columna,Idir
    } = this.myFormBandejaDerivados.value;

    const p1 = Entrada ? 1 : 0;
    const p2 = Interno ? 1 : 0;
    const p3 = Salida ? 1 : 0;
    const p4 = moment(fechaDesde).format('YYYY-MM-DD') + 'T' + horaInicio + ':00.000';
    const p5 = moment(fechaHasta).format('YYYY-MM-DD') + 'T' + horaFin + ':00.000';
    const p6 = Codificacion ? Codificacion : "%%";
    const p7 = Asunto ? Asunto : "%%";
    const p8 = CodOficinaLogin;
    const p9 = CodTipoDoc;
    const p10 = CodTema;
    const p11 = CodOficinaDes;
    const p12 = Aceptado ? 1 : 0;
    const p13 = SAceptado ? 1 : 0;
    const p14 = Columna ? Columna : "Codigo";
    const p15 = Idir ? Idir : "%%";


    this.bandejaDerivadosService.getListadoTablaDerivados(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15).subscribe(
        (rpta)=>{
          this.listadoTablaDeribados = rpta;
          this.dataSource.data = this.listadoTablaDeribados;
          this.isFetchingData = false;
          // console.log(this.listadoTablaDeribados)
        }
    )

    this.bandejaDerivadosService.getListadoExcel(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15).subscribe(
      (rpta)=>{
        // console.log(rpta)
        this.listadoExcelDerivados = rpta;
      }
    )
  }

  getListadoComboTpoDcmto(){
    this.bandejaDerivadosService.getListadoTipoDocumento().subscribe(
      (rpta)=>{
        this.comboListadoTpoDcmto = rpta;
      }
    )
  }

  getListadoOficinaDestino(){
    this.bandejaDerivadosService.getListadoOficinaDestino().subscribe(
      (rpta)=>{
        this.comboListadoOficDest = rpta;
        console.log(this.comboListadoOficDest)
      }
    )
  }

  reset(){
    this.myFormBandejaDerivados.patchValue({
      Entrada:0,
      Interno:0,
      Salida:0,
      fechaDesde:moment().subtract(7, 'days').toDate(),
      fechaHasta:moment().toDate(),
      horaInicio:'00:00',
      horaFin: '23:59',
      Codificacion: '',
      Asunto: '',
      CodOficinaLogin: 143,
      CodTipoDoc:0,
      CodTema:0,
      CodOficinaDes:0,
      Aceptado:0,
      SAceptado:0,
      Columna:'',
      Idir:'',
    })
    this.onSearch();
  }


  reporte_excel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ReporteDerivados');

    // Combinación de celdas y agregación de datos
    worksheet.mergeCells('A1:H2');
    worksheet.getCell('A1').value = 'Reporte Derivados';
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('A3:F3');
    worksheet.getCell('A3').value = 'PRUEBA';

    worksheet.mergeCells('G3:H3');
    worksheet.getCell('G3').value = `STD, ${new Date().toLocaleDateString()}`;
    worksheet.getCell('G3').alignment = { vertical: 'middle', horizontal: 'right' };

    // Agregar cabeceras en la fila 4
    const headers = [
      'Dia', 'Mes', 'Año', 'Tipo', 'Trámite', 'Tipo Documento',
      'Nro Documento', 'Oficina Destino', 'Responsable', 'Asignado',
      'Trab. Archivado', 'Asunto', 'Nombre/Razon Social', 'Documento',
      'Derivado', 'Recepcion', 'Archivado', 'Estado', 'Asignado fin'
    ];

    worksheet.insertRow(4, headers);

    // Ajustar el ancho de las columnas
    const columnWidths = [6, 6, 8, 15, 15, 20, 30, 40, 20, 15, 20, 20, 25, 15, 15, 15, 15, 15, 15];
    columnWidths.forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width;
    });

      // Mapeo de nFlgTipoDoc a texto
    const tipoDocMap: { [key: number]: string } = {
      1: 'Entrada',
      2: 'Interno',
      3: 'Salida',
      4: 'Jefatura'
    };

      // Función para obtener el nombre de oficina a partir del código
      // const getNombreOficina = (codigo: number) => {
      //   const oficina = this.comboListadoOficDest.find(o => o.iCodOficina === codigo);
      //   return oficina ? oficina.cNomOficina : 'Desconocido';
      // };


    if (this.listadoExcelDerivados && this.listadoExcelDerivados.length > 0) {
      this.listadoExcelDerivados.forEach(data => {
        const row = [
          moment(data.fFecDocumento).format('DD'),          //Ok
          moment(data.fFecDocumento).format('MM'),          //Ok
          moment(data.fFecDocumento).format('YYYY'),        //Ok
          tipoDocMap[data.nFlgTipoDoc] || 'Desconocido',    //Ok
          '-----',
          data.documento,                                   //Ok
          data.cCodificacion,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
          data.cPrioridadDerivar,
        ];

        worksheet.addRow(row);
      });
    }

    // Estilos básicos
    worksheet.getRow(1).font = { bold: true, size: 16 };
    worksheet.getRow(3).font = { size: 12 };
    worksheet.getRow(4).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D8D8D8' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Generar el archivo Excel y descargarlo
    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte_derivados.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });

    console.log("Reporte de Excel generado y descargado");
  }


}
