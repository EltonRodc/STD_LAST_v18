import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'shared-sidenav-administrador',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './sidenav-administrador.component.html',
  styleUrl: './sidenav-administrador.component.scss'
})
export class SidenavAdministradorComponent implements OnInit{

  public mantenimientoSubMenuOpen:boolean = false;
  public isMantenimientoActive: boolean = false;

  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState(this.router.url);
    });
      this.updateActiveState(this.router.url);
  }

  private updateActiveState(currentUrl: string): void {
    this.isMantenimientoActive = currentUrl.includes('/std/administrador/mantenimiento');
    this.closeOtherSubMenus();
  }

  closeOtherSubMenus() {
    if (this.isMantenimientoActive) {
      this.mantenimientoSubMenuOpen = true;
    }
  }

  toggleMantenimientoSubMenu() {
    this.mantenimientoSubMenuOpen = !this.mantenimientoSubMenuOpen;
    if (this.mantenimientoSubMenuOpen) {
    }
  }

}
