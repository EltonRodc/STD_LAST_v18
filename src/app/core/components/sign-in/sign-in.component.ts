import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private login = inject(AuthService);
  private authDataService = inject(AuthDataService);

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const uniqueCode = params['unique_code'];
      const sistemaId = params['id_sistemas'];

      if (uniqueCode && sistemaId) {
        this.login.authLogin(uniqueCode, parseInt(sistemaId))
          .subscribe({
            next: (data) => {
              console.log('Datos de autenticación recibidos:', data);
              this.authDataService.setAuthData(data);
              this.router.navigate(['/std']);
            },
            error: (error) => {
              console.error('Error al autenticar:', error);
            }
          });
      } else {
        console.error('Faltan parámetros en la URL');
      }
    });

  }

}
