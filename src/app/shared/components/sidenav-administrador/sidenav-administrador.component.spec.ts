import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAdministradorComponent } from './sidenav-administrador.component';

describe('SidenavAdministradorComponent', () => {
  let component: SidenavAdministradorComponent;
  let fixture: ComponentFixture<SidenavAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
