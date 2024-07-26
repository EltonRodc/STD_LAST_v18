import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaRccPageComponent } from './entrada-rcc-page.component';

describe('EntradaRccPageComponent', () => {
  let component: EntradaRccPageComponent;
  let fixture: ComponentFixture<EntradaRccPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaRccPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaRccPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
