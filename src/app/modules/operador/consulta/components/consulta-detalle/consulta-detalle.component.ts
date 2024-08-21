import { AfterViewInit, Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RegistroDetalleService } from '../../../../../shared/services/registro-detalle.service';
import { DataAdjuntos, DataDetalleGeneral, DataDetalleSeguimiento, DataRemitente } from '../../../../../shared/interfaces/registro-detalle.interface';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { getSpanishPaginatorIntl } from '../../../../../core/providers/custom-paginator-intl';
import { MatButtonModule } from '@angular/material/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-consulta-detalle',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    MatDialogModule,
    MatCardModule,
    UpperCasePipe,
    DatePipe,
    MatPaginator,
    MatTooltip,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './consulta-detalle.component.html',
  styleUrl: './consulta-detalle.component.scss'
})
export class ConsultaDetalleComponent implements OnInit,AfterViewInit {

  public tram_dtos_generales?: DataDetalleGeneral;
  public dataRemitente? : DataRemitente;
  public dataSeguimiento? : DataDetalleSeguimiento[] = [];
  public isFetchingData: boolean = false;
  public docAjuntos: DataAdjuntos[] = [];

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private dialogRef = inject(MatDialogRef<ConsultaDetalleComponent>);
  private registroDetalleService = inject(RegistroDetalleService)

  public displayedColumns: string[] = ['n', 'documento', 'asunto', 'origen', 'destino', 'estado', 'adjuntos',];
  public dataSource = new MatTableDataSource<DataDetalleSeguimiento>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    // console.log(data.cod_tramite)
    this.getDetalle1(data.cod_tramite)
    this.getDetalleSeguimiento(data.cod_tramite)
  }

  getDetalle1(cod){
    this.registroDetalleService.getDetalleGeeneral(cod).subscribe(
      (rpta) => {
        const remitente = rpta.iCodRemitente;
        this.tram_dtos_generales = rpta;
        if(remitente){
          this.registroDetalleService.getDetalleRemitente(remitente).subscribe(
            (rpta_rem)=>{
              this.dataRemitente = rpta_rem.data[0]
            }
          )
        }
      }
    )
  }

  getDetalleSeguimiento(cod){
    this.isFetchingData = true;
    this.registroDetalleService.getDetalleSeguimiento(cod).subscribe(
      (rpta_seg)=>{
        this.dataSeguimiento = rpta_seg
        this.dataSource.data = this.dataSeguimiento;
        this.isFetchingData = false;
        // console.log(this.dataSource.data)
      }
    )
  }

  imprimirAdjunto(name: string){
    console.log(name)
    const nombreArchivo = name.trim();
    console.log(nombreArchivo)
    window.open(`http://10.4.0.30:8085/Archivos/RegistroConDocumento/${nombreArchivo}`, "_blank");
  }

  redirectoLink(name:string){
    window.open(name, "_blank")
  }

  download_pdf(){
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    const title = 'SISTEMA DE INFORMACION DE TRAMITE DOCUMENTARIO';
    const titleFontSize = 14;
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getStringUnitWidth(title) * titleFontSize / doc.internal.scaleFactor;
    const textOffset = (pageWidth - textWidth) / 2;

    // Agregar título al documento
    doc.setFontSize(titleFontSize);
    doc.text(title, textOffset, 40);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedTime = currentDate.toLocaleTimeString('es-ES', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });

    const dateAndTime = `${formattedDate}, ${formattedTime}`;
    const dateAndTimeFontSize = 8;
    const dateAndTimeWidth = doc.getStringUnitWidth(dateAndTime) * dateAndTimeFontSize / doc.internal.scaleFactor;
    const dateAndTimeOffset = pageWidth - dateAndTimeWidth - 15;

    doc.setFontSize(dateAndTimeFontSize);
    doc.text(dateAndTime, dateAndTimeOffset, 30);

    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 80; // Ajusta la posición vertical según la altura del título
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`detalle`);
    });

  }

}
