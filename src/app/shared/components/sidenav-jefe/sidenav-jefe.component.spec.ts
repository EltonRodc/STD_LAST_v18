import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavJefeComponent } from './sidenav-jefe.component';

describe('SidenavJefeComponent', () => {
  let component: SidenavJefeComponent;
  let fixture: ComponentFixture<SidenavJefeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavJefeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
