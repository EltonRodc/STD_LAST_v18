import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavOperadorComponent } from './sidenav-operador.component';

describe('SidenavOperadorComponent', () => {
  let component: SidenavOperadorComponent;
  let fixture: ComponentFixture<SidenavOperadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavOperadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
