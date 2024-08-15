import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthDataService } from '../core/services/auth-data.service';
import { DataAuth } from '../core/interfaces/auth';
import { LayoutService } from './layout.service';
import { DataPerfiles } from './layout.interface';
import { SidenavOperadorComponent } from '../shared/components/sidenav-operador/sidenav-operador.component';
import { SidenavAdministradorComponent } from '../shared/components/sidenav-administrador/sidenav-administrador.component';
import { SidenavJefeComponent } from '../shared/components/sidenav-jefe/sidenav-jefe.component';
import { DatosPrincipales } from '../core/interfaces/perfiles.interface';
import { PerfilesService } from '../core/services/perfiles.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    SidenavOperadorComponent,
    SidenavAdministradorComponent,
    SidenavJefeComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public datosPrincipales: DatosPrincipales | null = null;
  public authData!: DataAuth;
  public listPerfiles: DataPerfiles[] = [];
  public userName: string = "";
  public nomOficina: string = "";
  public isOperador: boolean = false;
  public isAdministrador: boolean = false;
  public isJefe: boolean = false;

  private cdr = inject(ChangeDetectorRef);
  private perfilesService = inject(PerfilesService);
  private authDataService = inject(AuthDataService);
  private layoutService = inject(LayoutService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public currentRole: string = "Jefe";

  ngOnInit(): void {
    this.datosPrincipales = this.perfilesService.getDatosPrincipales();
    this.checkUrlForComponent();

    // Suscribirse a los eventos de navegación para actualizar el componente
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkUrlForComponent();
      }
    });

    if (this.authDataService.isAuthenticated()) {
      this.authData = this.authDataService.getAuthData();
      const idUser = this.authData.idUsuario;
      this.userName = this.authData.nomUsuario;
      this.nomOficina = this.authData.nomOficina;
      this.layoutService.getPerfiles(idUser).subscribe(
        (rpta) => {
          this.listPerfiles = rpta;
        }
      );
    } else {
      console.log('No hay datos de autenticación.');
    }
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  checkUrlForComponent(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/std/operador/')) {
      this.isOperador = true;
      this.isAdministrador = false;
      this.isJefe = false;
      this.currentRole = "Operador";
    } else if (currentUrl.includes('/std/administrador/')) {
      this.isOperador = false;
      this.isAdministrador = true;
      this.isJefe = false;
      this.currentRole = "Administrador";

    } else if (currentUrl.includes('/std/jefe/')) {
      this.isOperador = false;
      this.isAdministrador = false;
      this.isJefe = true;
      this.currentRole = "Jefe";

    }
  }

  navigateToProfile(profile: DataPerfiles): void {
    const url = `/std/${profile.cDescPerfil.toLowerCase()}`;
    this.router.navigate([url]).then(() => {
      this.checkUrlForComponent();
    });

    this.perfilesService.getInfoOficina(profile.codOficina, "", 0).subscribe(
      (rpta_info_of) => {
        if (rpta_info_of) {
          this.perfilesService.getRepresentante(1, 10, 0, "", "", rpta_info_of.numeroDocumentoRepresentante).subscribe(
            (rpta_representante) => {
              const datosPrincipales: DatosPrincipales = {
                user: this.authDataService.getAuthData().nomUsuario,
                id_oficina: profile.codOficina,
                oficina: profile.nomOficina,
                jefe: rpta_representante.nombreCompleto
              };

              // console.log(datosPrincipales);
              this.perfilesService.setDatosPrincipales(datosPrincipales);
              this.datosPrincipales = datosPrincipales;
              this.cdr.markForCheck();
              // console.log('Datos principales actualizados:', datosPrincipales);
              this.cdr.detectChanges();
            },
            error => {
              console.error('Error al obtener el representante:', error);
            }
          );
        }
      },
      error => {
        console.error('Error al obtener la información de la oficina:', error);
      }
    );
  }



}
