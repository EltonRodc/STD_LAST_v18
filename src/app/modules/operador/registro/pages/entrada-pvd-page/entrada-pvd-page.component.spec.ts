import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaPvdPageComponent } from './entrada-pvd-page.component';

describe('EntradaPvdPageComponent', () => {
  let component: EntradaPvdPageComponent;
  let fixture: ComponentFixture<EntradaPvdPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaPvdPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaPvdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
