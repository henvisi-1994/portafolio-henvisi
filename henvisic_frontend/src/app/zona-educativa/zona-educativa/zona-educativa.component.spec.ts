import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaEducativaComponent } from './zona-educativa.component';

describe('ZonaEducativaComponent', () => {
  let component: ZonaEducativaComponent;
  let fixture: ComponentFixture<ZonaEducativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonaEducativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonaEducativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
