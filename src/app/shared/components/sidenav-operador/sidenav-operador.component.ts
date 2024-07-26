import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'shared-sidenav-operador',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './sidenav-operador.component.html',
  styleUrl: './sidenav-operador.component.scss'
})
export class SidenavOperadorComponent implements OnInit{

  public registroSubMenuOpen:boolean = false;
  public isRegistroActive: boolean = false;

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
    this.isRegistroActive = currentUrl.includes('/std/operador/registro');
    this.closeOtherSubMenus();
  }

  closeOtherSubMenus() {
    if (this.isRegistroActive) {
      this.registroSubMenuOpen = true;
    }
  }

  toggleRegistroSubMenu() {
    this.registroSubMenuOpen = !this.registroSubMenuOpen;
  }
}
