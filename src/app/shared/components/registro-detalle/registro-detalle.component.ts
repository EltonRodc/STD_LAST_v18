import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registro-detalle',
  standalone: true,
  imports: [],
  templateUrl: './registro-detalle.component.html',
  styles: ``
})
export class RegistroDetalleComponent {
  @Input() cod_tramite!: number;
}
