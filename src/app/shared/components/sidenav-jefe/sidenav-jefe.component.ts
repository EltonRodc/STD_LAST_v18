import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'shared-sidenav-jefe',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './sidenav-jefe.component.html',
  styleUrl: './sidenav-jefe.component.scss'
})
export class SidenavJefeComponent implements OnInit {

  public registroSubMenuOpen:boolean = false;
  public isRegistroActive: boolean = false;

  public consultaSubMenuOpen:boolean = false;
  public isConsultaActive: boolean = false;

  public bandejaSubMenuOpen:boolean = false;
  public isBandejaActive: boolean = false;

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
    this.isRegistroActive = currentUrl.includes('/std/jefe/registro');
    this.isBandejaActive = currentUrl.includes('/std/jefe/bandeja');
    this.isConsultaActive = currentUrl.includes('/std/jefe/consulta');
    this.closeOtherSubMenus();
  }

  closeOtherSubMenus() {
    if (this.isRegistroActive) {
      this.registroSubMenuOpen = true;
      this.consultaSubMenuOpen = false;
      this.bandejaSubMenuOpen = false;
    }else if(this.isConsultaActive){
      this.registroSubMenuOpen = false;
      this.consultaSubMenuOpen = true;
      this.bandejaSubMenuOpen = false;
    }else if(this.isBandejaActive){
      this.registroSubMenuOpen = false;
      this.consultaSubMenuOpen = false;
      this.bandejaSubMenuOpen = true;
    }
  }

  toggleRegistroSubMenu() {
    this.registroSubMenuOpen = !this.registroSubMenuOpen;
    if (this.registroSubMenuOpen) {
      this.consultaSubMenuOpen = false;
      this.bandejaSubMenuOpen = false;
    }
  }

  toggleConsultaSubMenu() {
    this.consultaSubMenuOpen = !this.consultaSubMenuOpen;
    if (this.consultaSubMenuOpen) {
      this.registroSubMenuOpen = false;
      this.bandejaSubMenuOpen = false;
    }
  }

  toggleBandejaSubMenu() {
    this.bandejaSubMenuOpen = !this.bandejaSubMenuOpen;
    if (this.bandejaSubMenuOpen) {
      this.registroSubMenuOpen = false;
      this.consultaSubMenuOpen = false;
    }
  }

}
