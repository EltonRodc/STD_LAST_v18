import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { AuthDataService } from '../core/services/auth-data.service';
import { DataAuth } from '../core/interfaces/auth';
import { LayoutService } from './layout.service';
import { DataPerfiles } from './layout.interface';
import { SidenavOperadorComponent } from '../shared/components/sidenav-operador/sidenav-operador.component';
import { SidenavAdministradorComponent } from '../shared/components/sidenav-administrador/sidenav-administrador.component';
import { SidenavJefeComponent } from '../shared/components/sidenav-jefe/sidenav-jefe.component';

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
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

  public authData!: DataAuth;
  public listPerfiles: DataPerfiles[] = [];
  public userName:string = "";
  public nomOficina:string = "";
  public isOperador: boolean = false;
  public isAdministrador: boolean = false;
  public isJefe: boolean = false;

  private authDataService = inject(AuthDataService);
  private layoutService = inject(LayoutService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.checkUrlForComponent();
    if (this.authDataService.isAuthenticated()) {
      this.authData = this.authDataService.getAuthData();
      const idUser = this.authData.idUsuario;
      this.userName = this.authData.nomUsuario;
      this.nomOficina = this.authData.nomOficina;
      this.layoutService.getPerfiles(idUser).subscribe(
        (rpta)=> {
          this.listPerfiles = rpta;
        }
      )
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
    const currentUrl = this.router.url; // Obtiene la URL actual
    if (currentUrl.includes('/std/operador/')) {
      this.isOperador = true;
      this.isAdministrador = false;
      this.isJefe = false;
    } else if (currentUrl.includes('/std/administrador/')) {
      this.isOperador = false;
      this.isAdministrador = true;
      this.isJefe = false;
    } else if (currentUrl.includes('/std/jefe/')) {
      this.isOperador = false;
      this.isAdministrador = false;
      this.isJefe = true;
    }
  }
}
