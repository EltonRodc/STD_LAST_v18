import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-entrada-pvd-page',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './entrada-pvd-page.component.html',
  styleUrl: './entrada-pvd-page.component.scss'
})
export class EntradaPvdPageComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
