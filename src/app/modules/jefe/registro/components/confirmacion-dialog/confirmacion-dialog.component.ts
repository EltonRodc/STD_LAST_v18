import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-confirmacion-dialog',
  standalone: true,
  imports: [MatButtonModule,MatIcon],
  templateUrl: './confirmacion-dialog.component.html',
  styles: ``
})
export class ConfirmacionDialogComponent {

  public mensaje:string ="";
  private dialogRef = inject(MatDialogRef<ConfirmacionDialogComponent>);

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mensaje = data;
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
