import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';
import { PerfilesService } from '../../services/perfiles.service';
import { DatosPrincipales } from '../../interfaces/perfiles.interface';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private login = inject(AuthService);
  private authDataService = inject(AuthDataService);
  private perfilesService = inject(PerfilesService);

  public perfiles = [
    { perfil: "Administrador", ruta: "administrador" },
    { perfil: "Asistente", ruta: "asistente" },
    { perfil: "Colaborador", ruta: "colaborador" },
    { perfil: "Consulta General", ruta: "consulta-general" },
    { perfil: "Gestor de Calidad", ruta: "gestor-calidad" },
    { perfil: "Gestor de Mensajería", ruta: "gestor-mensajeria" },
    { perfil: "Jefe", ruta: "jefe" },
    { perfil: "Operador", ruta: "operador" },
  ]

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const uniqueCode = params['unique_code'];
      const sistemaId = params['id_sistemas'];

      if (uniqueCode && sistemaId) {
        this.login.authLogin(uniqueCode, parseInt(sistemaId))
          .subscribe({
            next: (data) => {
              // console.log('Datos de autenticación recibidos:', data);
              this.authDataService.setAuthData(data);
              const id_user_recuperado = data.idUsuario;
              const id_oficina_recuperado = data.idOficina;
              const perfil_user_recuperado = data.nomPerfil.trim();

              this.perfilesService.getPerfiles(id_user_recuperado).subscribe(
                (rpta_perfiles) => {

                  const perfilEncontrado = rpta_perfiles.find(p =>
                    p.codOficina === id_oficina_recuperado &&
                    p.cDescPerfil === perfil_user_recuperado
                  );

                  if (perfilEncontrado) {
                    this.perfilesService.getInfoOficina(perfilEncontrado.codOficina, "", 0).subscribe(
                      (rpta_info_of) => {
                        if (rpta_info_of) {
                          this.perfilesService.getRepresentante(1, 10, 0, "", "", rpta_info_of.numeroDocumentoRepresentante).subscribe(
                            (rpta_representante) => {
                              // Almacenar los datos en el localStorage
                              const datosPrincipales: DatosPrincipales = {
                                user: data.nomUsuario,
                                id_oficina: perfilEncontrado.codOficina,
                                oficina: perfilEncontrado.nomOficina,
                                jefe: rpta_representante.nombreCompleto
                              };

                              this.perfilesService.setDatosPrincipales(datosPrincipales);

                              // console.log('Datos principales almacenados:', datosPrincipales);

                              // Redirigir al perfil correspondiente
                              const rutaPerfil = this.perfiles.find(p => p.perfil === perfil_user_recuperado)?.ruta;

                              if (rutaPerfil) {
                                this.router.navigate([`/std/${rutaPerfil}`]);
                              } else {
                                console.error('Ruta no encontrada para el perfil:', perfil_user_recuperado);
                              }
                            }
                          );
                        }
                      }
                    );
                  } else {
                    console.error('Perfil no encontrado en los datos recuperados');
                  }
                },
                error => {
                  console.error('Error al obtener perfiles:', error);
                }
              );
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




// import { Component, inject, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthDataService } from '../../services/auth-data.service';
// import { PerfilesService } from '../../services/perfiles.service';

// @Component({
//   selector: 'app-sign-in',
//   standalone: true,
//   imports: [],
//   templateUrl: './sign-in.component.html',
//   styleUrl: './sign-in.component.scss'
// })
// export class SignInComponent implements OnInit{

//   private route = inject(ActivatedRoute);
//   private router = inject(Router);
//   private login = inject(AuthService);
//   private authDataService = inject(AuthDataService);
//   private perfilesService = inject(PerfilesService);

//   public perfiles = [
//     { perfil:"Administrador", ruta:"administrador"},
//     { perfil:"Asistente", ruta:"asistente"},
//     { perfil:"Colaborador", ruta:"colaborador"},
//     { perfil:"Consulta General", ruta:"consulta-general"},
//     { perfil:"Gestor de Calidad", ruta:"gestor-calidad"},
//     { perfil:"Gestor de Mensajería", ruta:"gestor-mensajeria"},
//     { perfil:"Jefe", ruta:"jefe"},
//     { perfil:"Operador", ruta:"operador"},
//   ]

//   ngOnInit(): void {

//     this.route.queryParams.subscribe(params => {
//       const uniqueCode = params['unique_code'];
//       const sistemaId = params['id_sistemas'];

//       if (uniqueCode && sistemaId) {
//         this.login.authLogin(uniqueCode, parseInt(sistemaId))
//           .subscribe({
//             next: (data) => {
//               console.log('Datos de autenticación recibidos:', data);
//               this.authDataService.setAuthData(data);
//               const id_user_recuperado = data.idUsuario;
//               const id_oficina_recuperado = data.idOficina;
//               const perfil_user_recuperado = data.nomPerfil.trim();
//               const perfilEncontrado = this.perfiles.find(p => p.perfil === perfil_user_recuperado);

//               this.perfilesService.getPerfiles(id_user_recuperado).subscribe(
//                 (rpta)=>{
//                   console.log(rpta)
//                 }
//               )

//               if (perfilEncontrado) {
//                 this.router.navigate([`/std/${perfilEncontrado.ruta}`]);
//               } else {
//                 console.error('Perfil no encontrado:', perfil_user_recuperado);
//               }

//             },
//             error: (error) => {
//               console.error('Error al autenticar:', error);
//             }
//           });
//       } else {
//         console.error('Faltan parámetros en la URL');
//       }
//     });

//   }

// }
